package marble

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
)

const baseURL = "https://api.marblecms.com"

var httpClient = &http.Client{Timeout: 10 * time.Second}

type Author struct {
	Name  string `json:"name"`
	Image string `json:"image"`
}

type Tag struct {
	Name string `json:"name"`
	Slug string `json:"slug"`
}

type Post struct {
	ID          string   `json:"id"`
	Slug        string   `json:"slug"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Content     string   `json:"content"`
	CoverImage  string   `json:"coverImage"`
	PublishedAt string   `json:"publishedAt"`
	UpdatedAt   string   `json:"updatedAt"`
	Authors     []Author `json:"authors"`
	Tags        []Tag    `json:"tags"`
}

func apiGet(path string) ([]byte, error) {
	key := os.Getenv("MARBLE_API_KEY")
	if key == "" {
		return nil, fmt.Errorf("MARBLE_API_KEY not set")
	}

	req, err := http.NewRequest(http.MethodGet, baseURL+path, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Authorization", key)
	req.Header.Set("Accept", "application/json")

	resp, err := httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return nil, fmt.Errorf("marble api %s: %s", resp.Status, strings.TrimSpace(string(body)))
	}
	return body, nil
}

func ListPosts() []Post {
	body, err := apiGet("/v1/posts")
	if err != nil {
		log.Printf("marble ListPosts: %v", err)
		return nil
	}
	var parsed struct {
		Posts []Post `json:"posts"`
	}
	if err := json.Unmarshal(body, &parsed); err != nil {
		log.Printf("marble ListPosts: decode: %v", err)
		return nil
	}
	return parsed.Posts
}

func GetPost(slug string) *Post {
	body, err := apiGet("/v1/posts/" + slug)
	if err != nil {
		log.Printf("marble GetPost %q: %v", slug, err)
		return nil
	}
	var parsed struct {
		Post *Post `json:"post"`
	}
	if err := json.Unmarshal(body, &parsed); err != nil || parsed.Post == nil {
		log.Printf("marble GetPost %q: decode failed", slug)
		return nil
	}
	return parsed.Post
}

func VerifySignature(secret, signatureHeader, bodyText string) bool {
	expected := strings.TrimPrefix(signatureHeader, "sha256=")
	mac := hmac.New(sha256.New, []byte(secret))
	_, _ = mac.Write([]byte(bodyText))
	return expected == hex.EncodeToString(mac.Sum(nil))
}
