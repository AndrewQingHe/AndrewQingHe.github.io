// Blog functionality
class BlogManager {
  constructor() {
    this.articles = [];
    this.articlesDirectory = "blog_articles/";
    this.articlesPerPage = 10;
  }

  // Parse metadata from markdown content
  parseMetadata(content) {
    const metadata = {};
    const lines = content.split("\n");

    for (let i = 0; i < Math.min(lines.length, 10); i++) {
      const line = lines[i].trim();
      if (line.startsWith("---")) {
        continue;
      }
      if (line.includes(":")) {
        const [key, ...valueParts] = line.split(":");
        const value = valueParts.join(":").trim();
        metadata[key.trim().toLowerCase()] = value;
      }
    }

    return metadata;
  }

  // Extract excerpt from markdown content
  extractExcerpt(content, maxLength = 200) {
    // Remove metadata section
    let contentWithoutMetadata = content;
    const metadataEnd = content.indexOf("---", 3);
    if (metadataEnd !== -1) {
      contentWithoutMetadata = content.substring(metadataEnd + 3).trim();
    }

    // Remove markdown formatting for excerpt
    let excerpt = contentWithoutMetadata
      .replace(/^#+\s+/gm, "") // Remove headers
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links, keep text
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, "") // Remove images
      .replace(/`([^`]+)`/g, "$1") // Remove inline code formatting
      .replace(/\*\*([^*]+)\*\*/g, "$1") // Remove bold
      .replace(/\*([^*]+)\*/g, "$1") // Remove italic
      .replace(/\n+/g, " ") // Replace newlines with spaces
      .trim();

    // Truncate to max length
    if (excerpt.length > maxLength) {
      excerpt = excerpt.substring(0, maxLength) + "...";
    }

    return excerpt;
  }

  // Load all articles from the blog_articles directory
  async loadArticles() {
    try {
      // Try to load actual markdown files
      // For GitHub Pages static hosting, we need to know the file names
      // In a real deployment, you might use a build process or server-side script
      // For now, we'll check for specific files and load them if they exist

      const articleFiles = [
        "welcome-to-the-blog.md",
        "introduction-to-deep-learning-for-pdes.md",
        "stochastic-methods-in-scientific-computing.md",
        "neural-pushforward-samplers-for-fokker-planck-equations.md",
        "template.md",
      ];

      const loadedArticles = [];
      let hasLocalFiles = false;

      for (const filename of articleFiles) {
        try {
          // Try to fetch the file
          const response = await fetch(`${this.articlesDirectory}${filename}`);

          if (response.ok) {
            hasLocalFiles = true;
            const content = await response.text();
            const metadata = this.parseMetadata(content);
            const excerpt = this.extractExcerpt(content);

            // Generate ID from filename
            const id = filename
              .replace(".md", "")
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-");

            loadedArticles.push({
              id,
              filename,
              title: metadata.title || filename.replace(".md", "").replace(/-/g, " "),
              date: metadata.date || new Date().toISOString().split("T")[0],
              author: metadata.author || "Andrew Qing He",
              tags: metadata.tags ? metadata.tags.split(",").map((tag) => tag.trim()) : ["Uncategorized"],
              excerpt,
              content,
            });
          }
        } catch (fileError) {
          // fetch may fail on local file system, that's okay
          console.log(`Could not load ${filename}:`, fileError);
        }
      }

      // If we loaded any articles from local files, use them
      if (hasLocalFiles && loadedArticles.length > 0) {
        // Sort by date (newest first)
        loadedArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
        this.articles = loadedArticles;
        console.log(`Loaded ${loadedArticles.length} articles from local files`);
      } else {
        // If no local files were loaded, use fallback articles
        console.log("Using fallback article data");
        this.articles = this.getFallbackArticles();
      }
    } catch (error) {
      console.log("Error loading articles:", error);
      // Fall back to fallback articles
      this.articles = this.getFallbackArticles();
    }
  }

  // Simple fallback if no articles are loaded
  getFallbackArticles() {
    return [
      {
        id: "welcome-to-the-blog",
        filename: "welcome-to-the-blog.md",
        title: "Welcome to the Research Blog",
        date: "2024-03-20",
        author: "Andrew Qing He",
        tags: ["Announcement", "Blog", "Research"],
        excerpt:
          "Welcome to my new research blog! This space will feature short articles on computational mathematics, machine learning for PDEs, stochastic methods, and scientific computing.",
        content:
          "---\ntitle: Welcome to the Research Blog\ndate: 2024-03-20\nauthor: Andrew Qing He\ntags: Announcement, Blog, Research\n---\n\n# Welcome to the Research Blog\n\nWelcome to my new research blog! This space will feature short articles on computational mathematics, machine learning for PDEs, stochastic methods, and scientific computing.",
      },
    ];
  }

  // Render blog posts to the page
  renderBlogPosts() {
    const container = document.getElementById("blog-posts-container");
    if (!container) return;

    if (this.articles.length === 0) {
      container.innerHTML = `
        <div class="text-center py-5">
          <i class="fas fa-newspaper fa-3x text-muted mb-3"></i>
          <h4>No blog posts yet</h4>
          <p class="text-muted">Check back soon for new articles!</p>
        </div>
      `;
      return;
    }

    let html = "";
    this.articles.forEach((article) => {
      const dateObj = new Date(article.date);
      const formattedDate = dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const tagsHtml = article.tags.map((tag) => `<span class="badge bg-primary">${tag}</span>`).join(" ");

      html += `
        <div class="blog-post-card fade-in">
          <div class="blog-post-header">
            <h3 class="blog-post-title">${article.title}</h3>
            <div class="blog-post-meta">
              <i class="fas fa-calendar"></i> ${formattedDate} &nbsp;&nbsp;
              <i class="fas fa-user"></i> ${article.author}
            </div>
          </div>
          <div class="blog-post-excerpt">
            <p>${article.excerpt}</p>
          </div>
          <div class="blog-post-footer">
            <div class="blog-post-tags">
              ${tagsHtml}
            </div>
            <a href="article.html?id=${article.id}" class="read-more-btn">
              Read More <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // Render recent posts in sidebar
  renderRecentPosts() {
    const container = document.getElementById("recent-posts-list");
    if (!container || this.articles.length === 0) return;

    const recentArticles = this.articles.slice(0, 5);
    let html = "";

    recentArticles.forEach((article) => {
      const dateObj = new Date(article.date);
      const formattedDate = dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      html += `
        <div class="recent-post-item">
          <div class="recent-post-title">
            <a href="article.html?id=${article.id}">${article.title}</a>
          </div>
          <div class="recent-post-date">${formattedDate}</div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // Initialize the blog
  async init() {
    await this.loadArticles();
    this.renderBlogPosts();
    this.renderRecentPosts();

    // Add animation to blog posts
    this.animateBlogPosts();
  }

  // Add animation to blog posts
  animateBlogPosts() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".blog-post-card").forEach((el) => {
      observer.observe(el);
    });
  }
}

// Initialize blog when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const blogManager = new BlogManager();
  blogManager.init();

  // Update language for blog-specific elements
  updateBlogLanguage();
});

// Blog-specific language translations
function updateBlogLanguage() {
  const lang = currentLang;
  const translations = {
    en: {
      blogTitle: "Research Blog",
      blogSubtitle: "Short articles on computational mathematics, machine learning, and scientific computing",
      loadingText: "Loading blog posts...",
      aboutTitle: "About This Blog",
      aboutText:
        "This blog features short articles on computational mathematics, machine learning for PDEs, stochastic methods, and scientific computing. Posts are written in Markdown for easy reading.",
      writeGuideBtn: "How to Write Posts",
      categoriesTitle: "Categories",
      recentPostsTitle: "Recent Posts",
      writeGuideTitle: "How to Write Posts",
      writeGuideText: "To create a new blog post:",
      writeStep1: "Create a Markdown (.md) file in the <code>blog_articles</code> directory",
      writeStep2: "Add metadata at the top (title, date, author, tags)",
      writeStep3: "Write your content using Markdown syntax",
      writeStep4: "Save the file - it will automatically appear in the blog",
      templateBtn: "View Template",
      navBlog: "Blog",
    },
    zh: {
      blogTitle: "研究博客",
      blogSubtitle: "关于计算数学、机器学习和科学计算的短文",
      loadingText: "正在加载博客文章...",
      aboutTitle: "关于本博客",
      aboutText:
        "本博客收录关于计算数学、偏微分方程的机器学习、随机方法和科学计算的短文。文章使用Markdown格式编写，便于阅读。",
      writeGuideBtn: "如何撰写文章",
      categoriesTitle: "分类",
      recentPostsTitle: "最近文章",
      writeGuideTitle: "如何撰写文章",
      writeGuideText: "创建新博客文章的步骤：",
      writeStep1: "在<code>blog_articles</code>目录中创建Markdown (.md)文件",
      writeStep2: "在顶部添加元数据（标题、日期、作者、标签）",
      writeStep3: "使用Markdown语法编写内容",
      writeStep4: "保存文件 - 它将自动出现在博客中",
      templateBtn: "查看模板",
      navBlog: "博客",
    },
  };

  const trans = translations[lang];
  if (!trans) return;

  // Update blog-specific elements
  const elements = {
    blogTitle: document.getElementById("blogTitle"),
    blogSubtitle: document.getElementById("blogSubtitle"),
    loadingText: document.getElementById("loadingText"),
    aboutTitle: document.getElementById("aboutTitle"),
    aboutText: document.getElementById("aboutText"),
    writeGuideBtn: document.getElementById("writeGuideBtn"),
    categoriesTitle: document.getElementById("categoriesTitle"),
    recentPostsTitle: document.getElementById("recentPostsTitle"),
    writeGuideTitle: document.getElementById("writeGuideTitle"),
    writeGuideText: document.getElementById("writeGuideText"),
    writeStep1: document.getElementById("writeStep1"),
    writeStep2: document.getElementById("writeStep2"),
    writeStep3: document.getElementById("writeStep3"),
    writeStep4: document.getElementById("writeStep4"),
    templateBtn: document.getElementById("templateBtn"),
    navBlog: document.getElementById("navBlog"),
  };

  for (const [id, element] of Object.entries(elements)) {
    if (element && trans[id]) {
      if (id === "writeStep1" || id === "writeStep2" || id === "writeStep3" || id === "writeStep4") {
        element.innerHTML = trans[id];
      } else {
        element.textContent = trans[id];
      }
    }
  }
}

// Override the updateLanguage function to include blog translations
const originalUpdateLanguage = window.updateLanguage;
window.updateLanguage = function (lang) {
  originalUpdateLanguage(lang);
  updateBlogLanguage();
};
