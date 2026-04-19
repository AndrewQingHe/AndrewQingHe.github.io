// Language translations
const translations = {
  en: {
    navName: "Andrew Qing He",
    navHome: "Home",
    navResearch: "Research",
    navPublications: "Publications",
    navExperience: "Experience",
    navBlog: "Blog",
    heroTitle: "Andrew Qing He",
    heroSubtitle: "何清 (He Qing)",
    heroDescription: "Ph.D. Candidate in Computational Mathematics\nSouthern Methodist University",
    researchBadge1: "Deep Learning",
    researchBadge2: "Scientific Computing",
    researchBadge3: "Stochastic Methods",
    researchBadge4: "PDEs",
    researchBtn: "View Research",
    researchTitle: "Research Interests",
    researchSubtitle: "Developing computational methods for complex scientific problems",
    mlTitle: "Machine Learning for PDEs",
    mlDesc:
      "Developing deep neural network methods for solving partial differential equations, including DeepMartNet for boundary value problems and eigenvalue computations.",
    stochasticTitle: "Stochastic Computing",
    stochasticDesc:
      "Employing stochastic tools including Gillespie algorithms and stochastic differential equations to model system dynamics and solve challenging computational problems.",
    geometryTitle: "Differential Geometry",
    geometryDesc:
      "Investigating geometric frameworks including connections and Riemannian metrics to provide insights into diverse models from mechanics to machine learning optimization.",
    biologyTitle: "Systems Biology",
    biologyDesc:
      "Studying emergent dynamics in biological networks, including gene regulation and neuronal systems, with experience from the iGEM competition.",
    publicationsTitle: "Publications",
    publicationsSubtitle: "Selected research papers and preprints",
    experienceTitle: "Experience & Education",
    phdTitle: "Ph.D. Candidate in Mathematics",
    phdInstitution: "Southern Methodist University, Dedman College of Humanities and Sciences",
    phdPeriod: "2020 - Present",
    phdDesc:
      "Conducting research in computational mathematics, focusing on deep learning methods for solving partial differential equations and developing stochastic computational algorithms.",
    researchTitle: "Research Assistant",
    researchInstitution: "Beijing International Center of Mathematical Research (BICMR)",
    researchPeriod: "China",
    researchDesc:
      "Contributed to research on numerical schemes for Fokker-Planck equations and structured neural networks.",
    igemTitle: "iGEM Competition Participant",
    igemInstitution: "International Genetically Engineered Machine Competition",
    igemPeriod: "2019 - Team Peking",
    igemDesc:
      "Participated in synthetic biology competition, gaining hands-on experience in systems biology and interdisciplinary research.",
    awardsTitle: "Awards & Recognition",
    award1Title: "Betty McKnight Speairs Graduate Student Award in Mathematics",
    award1Desc: "Recognition for teaching excellence",
    award2Title: "SMU Research and Innovation Week Award",
    award2Desc: "Winner in AI for Scientific Computing category",
    footerText: "&copy; 2024 Andrew Qing He (何清). All rights reserved.",
  },
  zh: {
    navName: "何清",
    navHome: "首页",
    navResearch: "研究",
    navPublications: "发表",
    navExperience: "经历",
    navBlog: "博客",
    heroTitle: "何清",
    heroSubtitle: "Andrew Qing He",
    heroDescription: "计算数学博士候选人\n南卫理公会大学",
    researchBadge1: "深度学习",
    researchBadge2: "科学计算",
    researchBadge3: "随机方法",
    researchBadge4: "偏微分方程",
    researchBtn: "查看研究",
    researchTitle: "研究兴趣",
    researchSubtitle: "为复杂科学问题开发计算方法",
    mlTitle: "偏微分方程的机器学习",
    mlDesc: "开发深度神经网络方法来求解偏微分方程，包括用于边值问题和特征值计算的DeepMartNet。",
    stochasticTitle: "随机计算",
    stochasticDesc: "使用随机工具，包括Gillespie算法和随机微分方程，来建模系统动力学并解决具有挑战性的计算问题。",
    geometryTitle: "微分几何",
    geometryDesc: "研究几何框架，包括联络和黎曼度量，为从力学到机器学习优化的各种模型提供洞见。",
    biologyTitle: "系统生物学",
    biologyDesc: "研究生物网络中的涌现动力学，包括基因调控和神经系统，拥有iGEM竞赛经验。",
    publicationsTitle: "发表论文",
    publicationsSubtitle: "精选研究论文和预印本",
    experienceTitle: "经历与教育",
    phdTitle: "数学博士候选人",
    phdInstitution: "南卫理公会大学，人文与科学学院",
    phdPeriod: "2020年至今",
    phdDesc: "进行计算数学研究，专注于求解偏微分方程的深度学习方法和开发随机计算算法。",
    researchTitle: "研究助理",
    researchInstitution: "北京国际数学研究中心 (BICMR)",
    researchPeriod: "中国",
    researchDesc: "为Fokker-Planck方程和结构化神经网络的数值方案研究做出贡献。",
    igemTitle: "iGEM竞赛参与者",
    igemInstitution: "国际基因工程机器竞赛",
    igemPeriod: "2019年 - 北京队",
    igemDesc: "参与合成生物学竞赛，获得系统生物学和跨学科研究的实践经验。",
    awardsTitle: "奖项与认可",
    award1Title: "Betty McKnight Speairs数学研究生奖",
    award1Desc: "教学优秀奖",
    award2Title: "SMU研究与创新周奖",
    award2Desc: "人工智能科学计算类别获奖者",
    footerText: "&copy; 2024 何清 (Andrew Qing He). 版权所有。",
  },
};

// Language toggle functionality
let currentLang = "en";
const langToggle = document.getElementById("langToggle");

function updateLanguage(lang) {
  currentLang = lang;
  const trans = translations[lang];

  // Update navigation
  document.getElementById("navName").textContent = trans.navName;
  document.getElementById("navHome").textContent = trans.navHome;
  document.getElementById("navResearch").textContent = trans.navResearch;
  document.getElementById("navPublications").textContent = trans.navPublications;
  document.getElementById("navExperience").textContent = trans.navExperience;
  document.getElementById("navBlog").textContent = trans.navBlog;
  // Update hero section
  document.getElementById("heroTitle").textContent = trans.heroTitle;
  document.getElementById("heroSubtitle").textContent = trans.heroSubtitle;
  document.getElementById("heroDescription").innerHTML = trans.heroDescription.replace("\n", "<br>");
  document.getElementById("researchBadge1").textContent = trans.researchBadge1;
  document.getElementById("researchBadge2").textContent = trans.researchBadge2;
  document.getElementById("researchBadge3").textContent = trans.researchBadge3;
  document.getElementById("researchBadge4").textContent = trans.researchBadge4;
  document.getElementById("researchBtn").textContent = trans.researchBtn;

  // Update research section
  document.getElementById("researchTitle").textContent = trans.researchTitle;
  document.getElementById("researchSubtitle").textContent = trans.researchSubtitle;
  document.getElementById("mlTitle").textContent = trans.mlTitle;
  document.getElementById("mlDesc").textContent = trans.mlDesc;
  document.getElementById("stochasticTitle").textContent = trans.stochasticTitle;
  document.getElementById("stochasticDesc").textContent = trans.stochasticDesc;
  document.getElementById("geometryTitle").textContent = trans.geometryTitle;
  document.getElementById("geometryDesc").textContent = trans.geometryDesc;
  document.getElementById("biologyTitle").textContent = trans.biologyTitle;
  document.getElementById("biologyDesc").textContent = trans.biologyDesc;

  // Update publications section
  document.getElementById("publicationsTitle").textContent = trans.publicationsTitle;
  document.getElementById("publicationsSubtitle").textContent = trans.publicationsSubtitle;

  // Update experience section
  document.getElementById("experienceTitle").textContent = trans.experienceTitle;
  document.getElementById("phdTitle").textContent = trans.phdTitle;
  document.getElementById("phdInstitution").textContent = trans.phdInstitution;
  document.getElementById("phdPeriod").textContent = trans.phdPeriod;
  document.getElementById("phdDesc").textContent = trans.phdDesc;
  document.getElementById("researchTitle").textContent = trans.researchTitle;
  document.getElementById("researchInstitution").textContent = trans.researchInstitution;
  document.getElementById("researchPeriod").textContent = trans.researchPeriod;
  document.getElementById("researchDesc").textContent = trans.researchDesc;
  document.getElementById("igemTitle").textContent = trans.igemTitle;
  document.getElementById("igemInstitution").textContent = trans.igemInstitution;
  document.getElementById("igemPeriod").textContent = trans.igemPeriod;
  document.getElementById("igemDesc").textContent = trans.igemDesc;

  // Update awards section
  document.getElementById("awardsTitle").textContent = trans.awardsTitle;
  document.getElementById("award1Title").textContent = trans.award1Title;
  document.getElementById("award1Desc").textContent = trans.award1Desc;
  document.getElementById("award2Title").textContent = trans.award2Title;
  document.getElementById("award2Desc").textContent = trans.award2Desc;
  // Update footer
  document.getElementById("footerText").innerHTML = trans.footerText;

  // Update body class for font
  document.body.classList.toggle("chinese", lang === "zh");

  // Update toggle button
  langToggle.innerHTML = `<i class="fas fa-language"></i> ${lang === "en" ? "中文" : "English"}`;
}

// Event listeners
async function loadBlogPosts() {
  const blogPostsContainer = document.getElementById("blogPosts");
  const loadingElement = document.getElementById("blogLoading");

  try {
    // For GitHub Pages, we'll simulate loading from blog_articles directory
    // In a real implementation, you would fetch these files from the repository
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
  // In a real implementation, this would fetch the file from the repository
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

  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Animation on scroll
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

  document.querySelectorAll(".card, .timeline-item, .publication-item").forEach((el) => {
    observer.observe(el);
  });

  // Initialize with English
  updateLanguage("en");
});
