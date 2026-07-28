package site

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

type Server struct {
	root string
	html *template.Template
}

func New(root string) (*Server, error) {
	root, err := filepath.Abs(root)
	if err != nil {
		return nil, err
	}

	tmpl, err := template.New("").Funcs(template.FuncMap{
		"lower": strings.ToLower,
		"add":   func(a, b int) int { return a + b },
	}).ParseGlob(filepath.Join(root, "templates", "*.html"))
	if err != nil {
		return nil, fmt.Errorf("parse templates: %w", err)
	}

	return &Server{root: root, html: tmpl}, nil
}

func (s *Server) Handler() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /css/output.css", s.handleCSS)
	for _, name := range []string{
		"my-x-profile-pic.jpg",
		"og-image.png",
		"favicon.ico",
		"favicon-16x16.png",
		"favicon-32x32.png",
		"apple-touch-icon.png",
		"android-chrome-192x192.png",
		"android-chrome-512x512.png",
		"site.webmanifest",
	} {
		mux.HandleFunc("GET /"+name, s.handleStaticFile(name))
	}

	mux.HandleFunc("GET /tabs/{tab}", s.handleTab)
	mux.HandleFunc("GET /blog/{slug}", s.handleBlogPost)
	mux.HandleFunc("POST /api/revalidate", s.handleRevalidate)
	mux.HandleFunc("GET /{$}", s.handleIndex)
	mux.HandleFunc("GET /", s.handleNotFound)

	return mux
}

func (s *Server) render(w http.ResponseWriter, name string, data any) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	if err := s.html.ExecuteTemplate(w, name, data); err != nil {
		log.Printf("template %s: %v", name, err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}
}

func RootFromEnv() string {
	if root := os.Getenv("SITE_ROOT"); root != "" {
		return root
	}
	return "."
}
