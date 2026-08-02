package site

import (
	"encoding/json"
	"html/template"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/valtterisa/valtteri-savonen-fi/backend/internal/content"
	"github.com/valtterisa/valtteri-savonen-fi/backend/internal/marble"
)

type SEO struct {
	Title            string
	Description      string
	Keywords         string
	Image            string
	URL              string
	Type             string
	Canonical        string
	JSONLD           template.JS
	ArticlePublished string
	ArticleAuthor    string
}

type PageData struct {
	SEO              SEO
	ActiveTab        string
	Projects         []content.Project
	Experiences      []content.Experience
	Posts            []content.BlogPostSummary
	Post             *marble.Post
	PostHTML         template.HTML
	AuthorName       string
	AuthorImage      string
	PublishedAt      string
	PublishedDisplay string
	NotFound         bool
}

func (s *Server) normalizeTab(tab string) string {
	switch tab {
	case "experience", "blog":
		return tab
	default:
		return "projects"
	}
}

func homeSEO() SEO {
	jsonLD, _ := json.Marshal(map[string]any{
		"@context": "https://schema.org",
		"@type":    "Person",
		"name":     "Valtteri Savonen",
		"jobTitle": "Software Engineer",
		"url":      "https://valtterisavonen.fi",
		"sameAs": []string{
			"https://cal.com/valtterisa/15min",
			"https://github.com/valtterisa",
			"https://x.com/vvaltterisa",
			"https://linkedin.com/in/valtterisavonen",
		},
		"address": map[string]string{
			"@type":          "PostalAddress",
			"addressCountry": "FI",
		},
	})
	return SEO{
		Title:       "Valtteri Savonen - Software Engineer",
		Description: "Full Stack Engineer from Finland. Working for myself, looking for startup ideas, building and doing work for clients. Specializing in Next.js, TypeScript, and modern web technologies.",
		Keywords:    "Valtteri Savonen, full stack engineer, software engineer, web development, Next.js, TypeScript, Finland, floras.app",
		Image:       "https://valtterisavonen.fi/og-image.png",
		URL:         "https://valtterisavonen.fi",
		Type:        "website",
		Canonical:   "https://valtterisavonen.fi",
		JSONLD:      template.JS(jsonLD),
	}
}

func formatPublishedDisplay(raw string) string {
	if raw == "" {
		return ""
	}
	t, err := time.Parse(time.RFC3339, raw)
	if err != nil {
		t, err = time.Parse(time.RFC3339Nano, raw)
		if err != nil {
			return raw
		}
	}
	return t.Format("January 2, 2006")
}

func toSummaries(posts []marble.Post) []content.BlogPostSummary {
	out := make([]content.BlogPostSummary, 0, len(posts))
	for _, p := range posts {
		out = append(out, content.BlogPostSummary{
			Title:       p.Title,
			PublishedAt: p.PublishedAt,
			Slug:        p.Slug,
		})
	}
	return out
}

func cacheHeaders(w http.ResponseWriter) {
	w.Header().Set("Cache-Control", "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400")
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

func (s *Server) handleIndex(w http.ResponseWriter, r *http.Request) {
	tab := s.normalizeTab(r.URL.Query().Get("tab"))
	data := PageData{
		SEO:         homeSEO(),
		ActiveTab:   tab,
		Projects:    content.Projects,
		Experiences: content.Experiences,
	}
	if tab == "blog" {
		data.Posts = toSummaries(marble.ListPosts())
	}
	cacheHeaders(w)
	s.render(w, "index.html", data)
}

func (s *Server) handleTab(w http.ResponseWriter, r *http.Request) {
	tab := s.normalizeTab(r.PathValue("tab"))
	data := PageData{
		ActiveTab:   tab,
		Projects:    content.Projects,
		Experiences: content.Experiences,
	}
	tmpl := "tab-projects.html"
	switch tab {
	case "experience":
		tmpl = "tab-experience.html"
	case "blog":
		tmpl = "tab-blog.html"
		data.Posts = toSummaries(marble.ListPosts())
	}
	cacheHeaders(w)
	s.render(w, tmpl, data)
}

func (s *Server) handleBlogPost(w http.ResponseWriter, r *http.Request) {
	slug := r.PathValue("slug")
	post := marble.GetPost(slug)

	if post == nil {
		data := PageData{
			SEO: SEO{
				Title:       "Post Not Found",
				Description: "The requested blog post could not be found.",
				URL:         "https://valtterisavonen.fi/blog/" + slug,
				Type:        "website",
				Canonical:   "https://valtterisavonen.fi/blog/" + slug,
				Image:       "https://valtterisavonen.fi/og-image.png",
			},
			NotFound: true,
		}
		w.WriteHeader(http.StatusNotFound)
		s.render(w, "blog-post.html", data)
		return
	}

	authorName := "Valtteri Savonen"
	authorImage := ""
	if len(post.Authors) > 0 {
		if post.Authors[0].Name != "" {
			authorName = post.Authors[0].Name
		}
		authorImage = post.Authors[0].Image
	}

	title := strings.ToLower(post.Title)
	desc := strings.ToLower(post.Description)
	if desc == "" {
		desc = title
	}
	image := post.CoverImage
	if image == "" {
		image = "https://valtterisavonen.fi/og-image.png"
	}
	url := "https://valtterisavonen.fi/blog/" + slug

	var jsonLD template.JS
	if post.PublishedAt != "" {
		raw, _ := json.Marshal(map[string]any{
			"@context": "https://schema.org",
			"@type":    "BlogPosting",
			"headline": post.Title,
			"author": map[string]string{
				"@type": "Person",
				"name":  authorName,
				"url":   "https://valtterisavonen.fi",
			},
			"datePublished": post.PublishedAt,
			"url":           url,
			"publisher": map[string]string{
				"@type": "Person",
				"name":  "Valtteri Savonen",
			},
		})
		jsonLD = template.JS(raw)
	}

	data := PageData{
		SEO: SEO{
			Title:            title,
			Description:      desc,
			Image:            image,
			URL:              url,
			Type:             "article",
			Canonical:        url,
			JSONLD:           jsonLD,
			ArticlePublished: post.PublishedAt,
			ArticleAuthor:    authorName,
		},
		Post:             post,
		PostHTML:         template.HTML(post.Content),
		AuthorName:       authorName,
		AuthorImage:      authorImage,
		PublishedAt:      post.PublishedAt,
		PublishedDisplay: formatPublishedDisplay(post.PublishedAt),
	}
	cacheHeaders(w)
	s.render(w, "blog-post.html", data)
}

func (s *Server) handleNotFound(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusNotFound)
	s.render(w, "404.html", PageData{
		SEO: SEO{
			Title:       "Not Found",
			Description: "Page not found",
			URL:         "https://valtterisavonen.fi" + r.URL.Path,
			Type:        "website",
			Image:       "https://valtterisavonen.fi/og-image.png",
		},
	})
}

type postEventPayload struct {
	Event string `json:"event"`
	Data  struct {
		ID    string `json:"id"`
		Slug  string `json:"slug"`
		Name  string `json:"name"`
		Title string `json:"title"`
	} `json:"data"`
}

func (s *Server) handleRevalidate(w http.ResponseWriter, r *http.Request) {
	signature := r.Header.Get("x-marble-signature")
	secret := os.Getenv("MARBLE_WEBHOOK_SECRET")
	if secret == "" || signature == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Secret or signature missing"})
		return
	}

	defer r.Body.Close()
	body, err := io.ReadAll(r.Body)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid body"})
		return
	}

	if !marble.VerifySignature(secret, signature, string(body)) {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid signature"})
		return
	}

	var payload postEventPayload
	if err := json.Unmarshal(body, &payload); err != nil || payload.Event == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid payload structure"})
		return
	}

	if strings.HasPrefix(payload.Event, "post") {
		marble.InvalidatePostsList()
		if payload.Data.Slug != "" {
			marble.InvalidatePost(payload.Data.Slug)
		}
		writeJSON(w, http.StatusOK, map[string]any{
			"revalidated": true,
			"now":         time.Now().UnixMilli(),
			"message":     "Post cache invalidated",
		})
		return
	}

	writeJSON(w, http.StatusOK, map[string]any{
		"revalidated": false,
		"now":         time.Now().UnixMilli(),
		"message":     "Event ignored",
	})
}

func (s *Server) handleStaticFile(name string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, filepath.Join(s.root, "static", name))
	}
}

func (s *Server) handleCSS(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/css; charset=utf-8")
	w.Header().Set("Cache-Control", "public, max-age=86400")
	http.ServeFile(w, r, filepath.Join(s.root, "css", "output.css"))
}
