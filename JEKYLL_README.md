# Jekyll Website Setup

Your personal website has been converted to use Jekyll, a static site generator that's perfect for blogs and GitHub Pages.

## What Changed

1. **Jekyll Structure**: Added Jekyll configuration files and directories
2. **Blog System**: Replaced the custom JavaScript blog with Jekyll's built-in blog system
3. **Markdown Content**: Converted HTML pages to Markdown with frontmatter
4. **Simplified Maintenance**: No more complex JavaScript for loading articles

## File Structure

```
AndrewQingHe.github.io/
├── _config.yml          # Jekyll configuration
├── Gemfile              # Ruby dependencies
├── index.md             # Homepage (converted from index.html)
├── blog.md              # Blog index page
├── _layouts/            # HTML templates
│   ├── default.html     # Main layout
│   └── post.html        # Blog post layout
├── _posts/              # Blog posts (Markdown files)
│   └── 2024-03-20-welcome-to-the-research-blog.md
├── _includes/           # Reusable components
├── _sass/               # Sass stylesheets
├── assets/              # Static assets
├── blog_articles/       # Original markdown articles (kept for reference)
└── _site/               # Generated site (not in git)
```

## How to Write Blog Posts

### Method 1: Using Jekyll (Recommended)

1. Create a new file in the `_posts` directory
2. Name it with the format: `YYYY-MM-DD-title.md`
3. Add frontmatter at the top:
   ```yaml
   ---
   title: "Your Article Title"
   date: YYYY-MM-DD
   author: Your Name
   tags: [Tag1, Tag2, Tag3]
   ---
   ```
4. Write your content in Markdown
5. Save the file - Jekyll will automatically rebuild the site

### Method 2: Using blog_articles Directory (Legacy)

1. Create a new `.md` file in `blog_articles/`
2. Use the template format
3. The system will work but Jekyll posts are better integrated

## Local Development

### Install Dependencies

```bash
cd AndrewQingHe.github.io
bundle install
```

### Build the Site

```bash
jekyll build
```

### Serve Locally

```bash
jekyll serve --watch
```

Then open http://127.0.0.1:4000/

## Deployment to GitHub Pages

Since you're using `AndrewQingHe.github.io` repository name, GitHub Pages will automatically:

1. Detect the Jekyll site
2. Build it automatically
3. Serve it at https://AndrewQingHe.github.io

### Manual Deployment

1. Commit all changes to git
2. Push to the `main` branch
3. GitHub Pages will automatically rebuild

## Features

### Built-in Blog

- Automatic post listing
- RSS feed at `/feed.xml`
- SEO optimization
- Tag/category support

### Responsive Design

- Uses your existing Bootstrap 5 styling
- Mobile-friendly layout
- Consistent with your original design

### Language Support

- Your existing bilingual JavaScript still works
- Navigation and UI elements support English/Chinese toggle

## Adding New Pages

1. Create a new `.md` file in the root directory
2. Add frontmatter:
   ```yaml
   ---
   layout: default
   title: Page Title
   ---
   ```
3. Write content in Markdown or HTML
4. The page will be available at `/filename/`

## Customization

### Styling

- Edit `styles.css` for custom styles
- The layout uses your existing Bootstrap 5 setup

### Layout

- Edit `_layouts/default.html` for site-wide changes
- Edit `_layouts/post.html` for blog post styling

### Configuration

- Edit `_config.yml` for site settings
- Update title, description, URL, etc.

## Troubleshooting

### Common Issues

1. **Site not building**: Run `bundle install` to install dependencies
2. **Posts not appearing**: Check filename format in `_posts/`
3. **Styles not loading**: Ensure paths use `{{ '/path.css' | relative_url }}`
4. **Local server not starting**: Check if port 4000 is available

### Getting Help

- Jekyll documentation: https://jekyllrb.com/
- GitHub Pages with Jekyll: https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll
- Markdown guide: https://www.markdownguide.org/

## Benefits Over Previous System

1. **No JavaScript loading issues**: Articles are built at compile time, not runtime
2. **Better performance**: Static HTML files instead of dynamic loading
3. **Standard format**: Uses Jekyll, the standard for GitHub Pages
4. **Easier to maintain**: Simple Markdown files instead of complex JavaScript
5. **Automatic features**: RSS feed, SEO, sitemap, etc.

## Next Steps

1. Add more blog posts to `_posts/` directory
2. Customize the design in `styles.css`
3. Update `_config.yml` with your information
4. Consider adding more pages (About, Projects, etc.)
