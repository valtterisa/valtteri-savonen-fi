package main

import (
	"log"
	"net/http"
	"os"

	"github.com/valtterisa/valtteri-savonen-fi/backend/internal/site"
)

func main() {
	root := "."
	if v := os.Getenv("SITE_ROOT"); v != "" {
		root = v
	}

	srv, err := site.New(root)
	if err != nil {
		log.Fatal(err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	logger := log.New(os.Stdout, "http: ", log.LstdFlags)
	logger.Println("listening on http://localhost:" + port)
	log.Fatal(http.ListenAndServe(":"+port, site.Logging(logger, srv.Handler())))
}
