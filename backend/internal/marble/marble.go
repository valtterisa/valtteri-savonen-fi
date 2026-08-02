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

type Category struct {
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
	Category    Category `json:"category"`
	Tags        []Tag    `json:"tags"`
}

type listResponse struct {
	Posts []Post `json:"posts"`
}

type getResponse struct {
	Post *Post `json:"post"`
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

	var parsed listResponse
	if err := json.Unmarshal(body, &parsed); err != nil {
		var posts []Post
		if err2 := json.Unmarshal(body, &posts); err2 != nil {
			log.Printf("marble ListPosts: decode: %v", err2)
			return nil
		}
		return posts
	}
	return parsed.Posts
}

func GetPost(slug string) *Post {
	body, err := apiGet("/v1/posts/" + slug)
	if err != nil {
		log.Printf("marble GetPost %q: %v", slug, err)
		return nil
	}

	var wrapped getResponse
	if err := json.Unmarshal(body, &wrapped); err == nil && wrapped.Post != nil {
		return wrapped.Post
	}

	var post Post
	if err := json.Unmarshal(body, &post); err != nil || post.Slug == "" {
		log.Printf("marble GetPost %q: decode failed or empty slug", slug)
		return nil
	}
	return &post
}

func VerifySignature(secret, signatureHeader, bodyText string) bool {
	expectedHex := strings.TrimPrefix(signatureHeader, "sha256=")
	mac := hmac.New(sha256.New, []byte(secret))
	_, _ = mac.Write([]byte(bodyText))
	return expectedHex == hex.EncodeToString(mac.Sum(nil))
}
