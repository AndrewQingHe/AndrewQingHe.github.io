// Article page functionality
class ArticleManager {
  constructor() {
    this.articleId = this.getArticleIdFromUrl();
    this.blogManager = new BlogManager();
  }

  // Get article ID from URL query parameter
  getArticleIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
  }

  // Load and display the article
  async loadArticle() {
    if (!this.articleId) {
      this.showError("No article specified");
      return;
    }

    // Load articles first
    await this.blogManager.loadArticles();

    // Find the article by ID
    const article = this.blogManager.articles.find((a) => a.id === this.articleId);

    if (!article) {
      this.showError("Article not found");
      return;
    }

    this.displayArticle(article);
  }

  // Display the article content
  displayArticle(article) {
    // Update page title
    document.title = `${article.title} - Andrew Qing He - Computational Mathematics Researcher`;

    // Update article header
    document.getElementById("articleTitle").textContent = article.title;

    const dateObj = new Date(article.date);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    document.getElementById("articleDate").textContent = formattedDate;
    document.getElementById("articleAuthor").textContent = article.author;

    // Update tags
    const tagsContainer = document.getElementById("articleTags");
    if (article.tags && article.tags.length > 0) {
      const tagsHtml = article.tags.map((tag) => `<span class="badge bg-primary me-2">${tag}</span>`).join("");
      tagsContainer.innerHTML = tagsHtml;
    }

    // Parse and render markdown content
    this.renderMarkdownContent(article.content);
  }

  // Render markdown content to HTML
  renderMarkdownContent(markdownContent) {
    const articleBody = document.getElementById("articleBody");

    // Configure marked.js
    marked.setOptions({
      breaks: true,
      gfm: true,
      highlight: function (code, lang) {
        if (lang && hljs) {
          return hljs.highlight(code, { language: lang }).value;
        }
        return code;
      },
    });

    // Convert markdown to HTML
    const htmlContent = marked.parse(markdownContent);

    // Update article body
    articleBody.innerHTML = htmlContent;

    // Add syntax highlighting if available
    if (typeof hljs !== "undefined") {
      document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block);
      });
    }
  }

  // Show error message
  showError(message) {
    const articleBody = document.getElementById("articleBody");
    articleBody.innerHTML = `
      <div class="text-center py-5">
        <i class="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
        <h4>${message}</h4>
        <p class="text-muted">The article you're looking for couldn't be found.</p>
        <a href="blog.html" class="btn btn-primary mt-3">
          <i class="fas fa-arrow-left"></i> Back to Blog
        </a>
      </div>
    `;

    document.getElementById("articleTitle").textContent = "Article Not Found";
    document.getElementById("articleDate").textContent = "";
    document.getElementById("articleAuthor").textContent = "";
  }
}

// Initialize article page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const articleManager = new ArticleManager();
  articleManager.loadArticle();

  // Update language for article page
  updateArticleLanguage();
});

// Article page language translations
function updateArticleLanguage() {
  const lang = currentLang;
  const translations = {
    en: {
      navBlog: "Blog",
      backToBlog: "Back to Blog",
    },
    zh: {
      navBlog: "博客",
      backToBlog: "返回博客",
    },
  };

  const trans = translations[lang];
  if (!trans) return;

  // Update article-specific elements
  const elements = {
    navBlog: document.getElementById("navBlog"),
    backToBlog: document.querySelector(".back-to-blog"),
  };

  if (elements.navBlog && trans.navBlog) {
    elements.navBlog.textContent = trans.navBlog;
  }

  if (elements.backToBlog && trans.backToBlog) {
    elements.backToBlog.innerHTML = `<i class="fas fa-arrow-left"></i> ${trans.backToBlog}`;
  }
}

// Override the updateLanguage function to include article translations
const originalUpdateLanguage = window.updateLanguage;
window.updateLanguage = function (lang) {
  originalUpdateLanguage(lang);
  updateArticleLanguage();
};
