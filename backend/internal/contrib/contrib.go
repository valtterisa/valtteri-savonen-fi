package contrib

import (
	"encoding/json"
	"net/http"
	"strconv"
	"sync"
	"time"
)

const apiURL = "https://github-contributions-api.jogruber.de/v4/valtterisa?y=last"

type Day struct {
	Date  string `json:"date"`
	Count int    `json:"count"`
	Level int    `json:"level"`
	Tip   string `json:"-"`
}

type Graph struct {
	Days    []Day
	Caption string
}

var (
	client   = &http.Client{Timeout: 8 * time.Second}
	mu       sync.Mutex
	cached   Graph
	cachedAt time.Time
)

func Get() Graph {
	mu.Lock()
	defer mu.Unlock()
	if cached.Days != nil && time.Since(cachedAt) < 24*time.Hour {
		return cached
	}
	days := fetch()
	if days != nil {
		cached = Graph{Days: days, Caption: caption(days)}
		cachedAt = time.Now()
	}
	return cached
}

func fetch() []Day {
	res, err := client.Get(apiURL)
	if err != nil {
		return nil
	}
	defer res.Body.Close()
	if res.StatusCode != http.StatusOK {
		return nil
	}
	var data struct {
		Contributions []Day `json:"contributions"`
	}
	if json.NewDecoder(res.Body).Decode(&data) != nil {
		return nil
	}
	for i, d := range data.Contributions {
		data.Contributions[i].Tip = tip(d)
	}
	return lastMonths(data.Contributions, 12)
}

func lastMonths(days []Day, months int) []Day {
	cutoff := time.Now().UTC().AddDate(0, -months, 0)
	for cutoff.Weekday() != time.Sunday {
		cutoff = cutoff.AddDate(0, 0, -1)
	}
	cutoffStr := cutoff.Format("2006-01-02")
	for i, d := range days {
		if d.Date >= cutoffStr {
			return days[i:]
		}
	}
	return nil
}

func caption(days []Day) string {
	total := 0
	for _, d := range days {
		total += d.Count
	}
	start, end := days[0].Date[:4], days[len(days)-1].Date[:4]
	year := start
	if end != start {
		year = start + "–" + end + " ytd"
	}
	return strconv.Itoa(total) + " contributions in " + year
}

func tip(d Day) string {
	date := d.Date
	if t, err := time.Parse("2006-01-02", d.Date); err == nil {
		date = t.Format("Jan 2, 2006")
	}
	switch d.Count {
	case 0:
		return "No contributions on " + date
	case 1:
		return "1 contribution on " + date
	default:
		return strconv.Itoa(d.Count) + " contributions on " + date
	}
}
