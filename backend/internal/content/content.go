package content

type Project struct {
	Title        string
	Description  string
	Technologies []string
	GitHubURL    string
	LiveURL      string
	Active       bool
}

type Experience struct {
	Title        string
	Company      string
	Period       string
	Description  string
	Technologies []string
}

var Projects = []Project{
	{
		Title:        "quickshops.app",
		Description:  "Your digital product store, run by chat.",
		Technologies: []string{"Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Convex", "Elysia.js"},
		LiveURL:      "https://quickshops.app",
		Active:       true,
	},
	{
		Title:        "floras.app",
		Description:  "AI website generator for Astro sites.",
		Technologies: []string{"Astro", "TypeScript", "Convex", "Box", "Cloudflare"},
		LiveURL:      "https://floras.app",
		Active:       true,
	},
	{
		Title:        "haalarikone.fi",
		Description:  "Finnish university students overall search tool.",
		Technologies: []string{"Next.js", "TypeScript", "Tailwind CSS", "Vercel"},
		LiveURL:      "https://haalarikone.fi",
		Active:       true,
	},
}

var Experiences = []Experience{
	{
		Title:        "full-stack engineer",
		Company:      "self-employed",
		Period:       "9/2024 - present",
		Description:  "building own projects and freelancing for clients.",
		Technologies: []string{"Next.js", "TypeScript", "React", "Node.js", "PostgreSQL"},
	},
	{
		Title:        "web developer",
		Company:      "ikius oy",
		Period:       "2/2023 - 9/2024",
		Description:  "Developed web applications and digital solutions for clients. Worked with modern web technologies to build scalable and maintainable applications.",
		Technologies: []string{"Next.js", "TypeScript", "React", "Node.js"},
	},
	{
		Title:       "co-founder",
		Company:     "luxmarketfin clothing & accessories llc",
		Period:      "5/2024 - present",
		Description: "Co-founded a pre-loved luxury clothing and accessories brand. Managing e-commerce operations and digital presence.",
	},
}
