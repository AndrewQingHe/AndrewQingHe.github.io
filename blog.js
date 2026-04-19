// Language translations for blog page
const blogTranslations = {
  en: {
    navName: "Andrew Qing He",
    navHome: "Home",
    navResearch: "Research",
    navPublications: "Publications",
    navExperience: "Experience",
    navBlog: "Blog",
    blogTitle: "Blog",
    blogSubtitle: "Thoughts on computational mathematics, research, and technology",
    blogDescription:
      "Welcome to my research blog where I share insights, methodologies, and developments in computational mathematics and scientific computing.",
    footerText: "&copy; 2024 Andrew Qing He (何清). All rights reserved.",
  },
  zh: {
    navName: "何清",
    navHome: "首页",
    navResearch: "研究",
    navPublications: "发表",
    navExperience: "经历",
    navBlog: "博客",
    blogTitle: "博客",
    blogSubtitle: "关于计算数学、研究和技术的心得",
    blogDescription: "欢迎来到我的研究博客，在这里我分享计算数学和科学计算方面的见解、方法论和发展。",
    footerText: "&copy; 2024 何清 (Andrew Qing He). 版权所有。",
  },
};

// Language toggle functionality
let currentLang = "en";
const langToggle = document.getElementById("langToggle");

function updateLanguage(lang) {
  currentLang = lang;
  const trans = blogTranslations[lang];

  // Update navigation
  document.getElementById("navName").textContent = trans.navName;
  document.getElementById("navHome").textContent = trans.navHome;
  document.getElementById("navResearch").textContent = trans.navResearch;
  document.getElementById("navPublications").textContent = trans.navPublications;
  document.getElementById("navExperience").textContent = trans.navExperience;
  document.getElementById("navBlog").textContent = trans.navBlog;

  // Update blog header
  document.getElementById("blogTitle").textContent = trans.blogTitle;
  document.getElementById("blogSubtitle").textContent = trans.blogSubtitle;
  document.getElementById("blogDescription").textContent = trans.blogDescription;

  // Update footer
  document.getElementById("footerText").innerHTML = trans.footerText;

  // Update body class for font
  document.body.classList.toggle("chinese", lang === "zh");

  // Update toggle button
  langToggle.innerHTML = `<i class="fas fa-language"></i> ${lang === "en" ? "中文" : "English"}`;

  // Reload blog posts to update any language-specific content
  loadBlogPosts();
}

// Blog functionality
async function loadBlogPosts() {
  const blogPostsContainer = document.getElementById("blogPosts");

  try {
    // For GitHub Pages, we'll simulate loading from blog_articles directory
    const blogPosts = [
      {
        title: "Introduction to Neural Pushforward Samplers",
        date: "2026-04-18",
        excerpt:
          "Exploring the latest developments in neural pushforward methods for solving Fokker-Planck equations...",
        filename: "blog_articles/neural-pushforward-samplers.md",
        content: null,
      },
      {
        title: "Deep Learning Approaches to Partial Differential Equations",
        date: "2026-03-15",
        excerpt:
          "A comprehensive overview of how deep neural networks are revolutionizing partial differential equation solving...",
        filename: "blog_articles/deep-learning-pdes.md",
        content: null,
      },
    ];

    let postsHTML = "";

    if (blogPosts.length === 0) {
      postsHTML = '<div class="text-center"><p>No blog posts yet. Check back soon!</p></div>';
    } else {
      blogPosts.forEach((post) => {
        postsHTML += `
          <div class="blog-post-item mb-4 p-4 bg-white rounded shadow-sm fade-in">
            <h4 class="blog-post-title">${post.title}</h4>
            <p class="text-muted mb-2"><i class="fas fa-calendar-alt me-2"></i>${formatDate(post.date)}</p>
            <p class="blog-post-excerpt">${post.excerpt}</p>
            <a href="#" class="btn btn-outline-primary btn-sm" onclick="loadBlogPost('${post.filename}')">
              <i class="fas fa-book-open me-2"></i>Read More
            </a>
          </div>
        `;
      });
    }

    blogPostsContainer.innerHTML = postsHTML;

    // Re-render MathJax after loading content
    if (window.MathJax) {
      window.MathJax.typesetPromise().catch((err) => console.error("MathJax typesetting failed:", err));
    }
  } catch (error) {
    console.error("Error loading blog posts:", error);
    blogPostsContainer.innerHTML =
      '<div class="text-center"><p>Error loading blog posts. Please try again later.</p></div>';
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function loadBlogPost(filename) {
  // For GitHub Pages, we'll load the markdown content
  const blogPostsContainer = document.getElementById("blogPosts");

  // Sample content for demonstration
  const sampleContent = {
    "blog_articles/neural-pushforward-samplers.md": `# Introduction to Neural Pushforward Samplers

**Published:** April 18, 2026

## Overview

Neural pushforward samplers represent a cutting-edge approach to solving complex probability distribution problems, particularly in the context of Fokker-Planck equations. This technique combines the power of deep neural networks with traditional sampling methods to create more efficient and accurate distribution sampling.

## Background

The Fokker-Planck equation describes the time evolution of probability density functions in phase space. Traditional numerical methods for solving these equations often struggle with high-dimensional problems or complex boundary conditions.

## Neural Pushforward Methods

Our approach uses neural networks to learn a pushforward map that transforms a simple reference distribution (like a standard normal) into the target distribution of interest. This method offers several advantages:

- **Scalability**: Can handle high-dimensional problems effectively
- **Flexibility**: Adapts to complex geometries and boundary conditions
- **Efficiency**: Once trained, sampling is extremely fast

## Applications

This technique has applications in:
- Financial mathematics (option pricing, risk management)
- Molecular dynamics (protein folding simulations)
- Climate modeling (atmospheric flow simulations)
- Machine learning (generative modeling)

## Future Directions

We're currently extending this work to:
- Time-dependent Fokker-Planck equations
- Multi-scale problems
- Integration with existing PDE solvers

*This post will be updated as our research progresses.*`,
    "blog_articles/deep-learning-pdes.md": `# Deep Learning Approaches to Partial Differential Equations

**Published:** March 15, 2026

## The Challenge

Partial differential equations (PDEs) are fundamental to describing physical phenomena across disciplines - from fluid dynamics to quantum mechanics. However, traditional numerical methods for solving PDEs face significant challenges:

- Computational complexity grows rapidly with problem dimension
- Mesh generation for complex geometries is difficult
- Stability and convergence issues in nonlinear problems

## Deep Learning Solutions

Recent advances in deep learning have opened new avenues for PDE solution methods:

### Physics-Informed Neural Networks (PINNs)

PINNs incorporate physical laws directly into the neural network training process through:
- Residual loss terms enforcing PDE constraints
- Boundary/initial condition enforcement
- Automatic differentiation for computing derivatives

### Deep Operator Networks

These networks learn mappings between function spaces, enabling:
- Solution of parametric PDE families
- Real-time prediction for varying parameters
- Reduced computational cost for similar problems

## Our Contributions

Our research focuses on developing specialized architectures for PDE problems:

### DeepMartNet

A martingale-based neural network approach for solving boundary value problems of elliptic PDEs. Key features:
- Guaranteed convergence properties
- Efficient handling of complex boundary conditions
- Scalable to high dimensions

### Applications in Computational Mathematics

We're applying these methods to:
- Eigenvalue problems
- Time-dependent PDEs
- Coupled multi-physics systems

## Current Research Directions

- Hybrid methods combining traditional and neural approaches
- Uncertainty quantification in neural PDE solvers
- Extension to stochastic PDEs

*Stay tuned for updates on our latest results!*`,
  };

  const content = sampleContent[filename];
  if (content) {
    const htmlContent = marked.parse(content);
    blogPostsContainer.innerHTML = `
      <div class="blog-post-full mb-4 p-4 bg-white rounded shadow-sm">
        <div class="blog-post-content">${htmlContent}</div>
        <div class="mt-4">
          <a href="#" class="btn btn-outline-secondary btn-sm" onclick="loadBlogPosts()">
            <i class="fas fa-arrow-left me-2"></i>Back to Blog
          </a>
        </div>
      </div>
    `;

    // Re-render MathJax after loading new content
    if (window.MathJax) {
      window.MathJax.typesetPromise().catch((err) => console.error("MathJax typesetting failed:", err));
    }
  } else {
    alert(`Blog post "${filename}" not found.`);
  }
}

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Language toggle
  langToggle.addEventListener("click", () => {
    const newLang = currentLang === "en" ? "zh" : "en";
    updateLanguage(newLang);
  });

  // Smooth scrolling for navigation (when linking to index.html sections)
  document.querySelectorAll('a[href^="index.html#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      // Let the browser handle navigation to index.html
      return true;
    });
  });

  // Initialize with English
  updateLanguage("en");
});
