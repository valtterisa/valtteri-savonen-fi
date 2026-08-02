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
	mux.HandleFunc("GET /tabs/{tab}", s.handleTab)
	mux.HandleFunc("GET /blog/{slug}", s.handleBlogPost)
	mux.HandleFunc("POST /api/revalidate", s.handleRevalidate)
	mux.HandleFunc("GET /{$}", s.handleIndex)
	mux.HandleFunc("GET /", s.serveStaticOrNotFound)
	return mux
}

func (s *Server) serveStaticOrNotFound(w http.ResponseWriter, r *http.Request) {
	staticRoot := filepath.Join(s.root, "static")
	rel := strings.TrimPrefix(filepath.Clean(r.URL.Path), "/")
	full := filepath.Join(staticRoot, rel)
	if !strings.HasPrefix(full, staticRoot+string(os.PathSeparator)) && full != staticRoot {
		s.handleNotFound(w, r)
		return
	}
	info, err := os.Stat(full)
	if err != nil || info.IsDir() {
		s.handleNotFound(w, r)
		return
	}
	http.ServeFile(w, r, full)
}

func (s *Server) render(w http.ResponseWriter, name string, data any) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	if err := s.html.ExecuteTemplate(w, name, data); err != nil {
		log.Printf("template %s: %v", name, err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}
}
