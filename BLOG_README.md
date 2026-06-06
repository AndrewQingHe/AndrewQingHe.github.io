# Blog System Documentation

This document explains how to use the blog system that has been added to your personal webpage.

## Overview

The blog system allows you to write and publish short articles using Markdown format. All articles are stored in the `blog_articles` directory and are automatically loaded and displayed on the blog page.

## Files Created

1. **blog.html** - The main blog homepage
2. **article.html** - Individual article viewing page
3. **blog.css** - Blog-specific styles
4. **blog.js** - Blog functionality (loading articles, rendering)
5. **article.js** - Article page functionality
6. **blog_articles/** - Directory for storing markdown articles
7. **blog_articles/template.md** - Template for new articles
8. **blog_articles/welcome-to-the-blog.md** - Sample article

## How to Write a New Blog Post

### Step 1: Create a Markdown File

Create a new `.md` file in the `blog_articles` directory. Use a descriptive filename (e.g., `my-article-title.md`).

### Step 2: Add Metadata

At the top of your file, add metadata between `---` lines:

```markdown
---
title: Your Article Title
date: YYYY-MM-DD
author: Your Name
tags: Tag1, Tag2, Tag3
---
```

### Step 3: Write Your Content

Write your article using standard Markdown syntax:

- Headers: `#`, `##`, `###`
- Lists: `-` or `1.`
- **Bold**: `**text**`
- _Italic_: `*text*`
- Code: `` `inline code` ``
- Code blocks: ` ```language ` ... ` ``` `
- Links: `[text](url)`
- Images: `![alt](image.jpg)`
- Blockquotes: `> text`

### Step 4: Save and View

Save your file. It will automatically appear on the blog page (blog.html).

## Features

### Automatic Loading

The blog system automatically:

- Loads all `.md` files from the `blog_articles` directory
- Parses metadata (title, date, author, tags)
- Generates excerpts
- Sorts articles by date (newest first)

### Responsive Design

- Mobile-friendly layout
- Clean, readable typography
- Consistent styling with your main website

### Language Support

- Blog titles and UI elements support English/Chinese toggle
- Articles themselves are not translated (content remains as written)

### Sample Articles

The system includes:

1. Three sample articles demonstrating different topics
2. A welcome article in the `blog_articles` directory
3. A template for creating new articles

## Customization

### Styling

Edit `blog.css` to change:

- Colors
- Fonts
- Layout
- Animations

### Functionality

Edit `blog.js` to modify:

- How articles are loaded
- Excerpt generation
- Sorting behavior
- Pagination (currently shows all articles)

### Adding Features

Potential enhancements:

- Search functionality
- Categories/tags filtering
- Comments system
- RSS feed
- Article images/thumbnails

## Technical Details

### Article Loading

The system tries to load actual markdown files from `blog_articles/`. If it can't load any files (e.g., on local file system without a server), it falls back to sample articles.

### URL Structure

- Blog homepage: `blog.html`
- Individual article: `article.html?id=article-id`
- Article IDs are generated from filenames (e.g., `welcome-to-the-blog.md` → `welcome-to-the-blog`)

### Dependencies

- Bootstrap 5.3.0 for layout
- Font Awesome for icons
- Marked.js for markdown parsing
- Your existing styles.css and script.js

## Testing

1. Open `index.html` - Check that "Blog" appears in navigation
2. Open `blog.html` - Verify articles load and display correctly
3. Click "Read More" on an article - Should open article page
4. Test language toggle on blog page
5. Create a new markdown file in `blog_articles` and refresh blog page

## Notes for GitHub Pages

When deploying to GitHub Pages:

- The blog system should work as-is
- Markdown files will be served statically
- No server-side processing is required
- All functionality is client-side JavaScript

## Troubleshooting

### Articles Not Appearing

- Check browser console for errors
- Ensure markdown files have correct metadata format
- Verify filenames are in the `articleFiles` array in `blog.js`

### Styling Issues

- Check that `blog.css` is loaded
- Verify Bootstrap and Font Awesome are loading
- Check for CSS conflicts with `styles.css`

### Markdown Not Rendering

- Ensure Marked.js is loaded
- Check that article content is valid markdown
- Verify the metadata section is properly formatted

## Support

For issues or questions, refer to the code comments or contact the developer who implemented this system.
