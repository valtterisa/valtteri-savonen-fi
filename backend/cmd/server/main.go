package main

import (
	"log"
	"net/http"
	"os"

	"github.com/valtterisa/valtteri-savonen-fi/backend/internal/site"
)

func main() {
	srv, err := site.New(site.RootFromEnv())
	if err != nil {
		log.Fatal(err)
	}

	logger := log.New(os.Stdout, "http: ", log.LstdFlags)
	handler := site.Logging(logger, srv.Handler())

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	logger.Println("listening on http://localhost:" + port)
	if err := http.ListenAndServe(":"+port, handler); err != nil {
		logger.Println("http.ListenAndServe():", err)
		os.Exit(1)
	}
}
