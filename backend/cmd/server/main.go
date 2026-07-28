package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/valtterisa/valtteri-savonen-fi/backend/internal/site"
)

func main() {
	handleSigTerms()

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

func handleSigTerms() {
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)
	go func() {
		<-c
		fmt.Println("received SIGTERM, exiting")
		os.Exit(0)
	}()
}
