// Language translations
const translations = {
  en: {
    navName: "He Qing",
    navHome: "Home",
    navAbout: "About",
    navExperience: "Experience",
    navSkills: "Skills",
    navContact: "Contact",
    heroTitle: "何清 (He Qing)",
    heroSubtitle: "Computational Mathematician & Machine Learning Researcher",
    heroDescription:
      "Specializing in stochastic computing, uncertainty quantification, and developing deep learning methods for solving complex differential equations and scientific computing problems.",
    contactBtn: "Get In Touch",
    aboutTitle: "About Me",
    aboutIntro: "A dedicated researcher with a passion for computational mathematics and machine learning.",
    personalTitle: "Personal Information",
    summaryTitle: "Professional Summary",
    experienceTitle: "Experience & Education",
    currentRole: "Graduate Researcher",
    currentCompany: "Southern Methodist University, Dedman College of Humanities and Sciences | 2020 - 2021",
    currentDesc:
      "Conducted advanced research in computational mathematics, focusing on deep learning methods for solving partial differential equations and stochastic processes.",
    previousRole: "Research Assistant",
    previousCompany: "Beijing International Center of Mathematical Research (BICMR), China",
    previousDesc:
      "Developed numerical schemes for Fokker-Planck equations and contributed to research on structured neural networks with learning rules.",
    educationTitle: "Education",
    educationDegree: "Ph.D. in Mathematics (Computational Mathematics)",
    educationDesc: "Southern Methodist University | Expected 2026",
    skillsTitle: "Skills & Expertise",
    programmingTitle: "Programming",
    pythonSkill: "Python",
    jsSkill: "MATLAB",
    javaSkill: "C/C++",
    backendTitle: "Research Areas",
    toolsTitle: "Research Interests",
    contactTitle: "Get In Touch",
    contactSubtitle: "Let's discuss opportunities and collaborations",
    nameLabel: "Name",
    emailLabel: "Email",
    subjectLabel: "Subject",
    messageLabel: "Message",
    submitBtn: "Send Message",
    footerText: "&copy; 2024 何清 (He Qing). All rights reserved.",
    linkedinLink: "LinkedIn",
    githubLink: "GitHub",
    emailLink: "Email",
  },
  zh: {
    navName: "何清",
    navHome: "首页",
    navAbout: "关于",
    navExperience: "经历",
    navSkills: "技能",
    navContact: "联系",
    heroTitle: "何清 (He Qing)",
    heroSubtitle: "计算数学家与机器学习研究员",
    heroDescription: "专注于随机计算、不确定性量化，并开发深度学习方法来解决复杂的微分方程和科学计算问题。",
    contactBtn: "联系我",
    aboutTitle: "关于我",
    aboutIntro: "一位对计算数学和机器学习充满热情的研究人员。",
    personalTitle: "个人信息",
    summaryTitle: "职业简介",
    experienceTitle: "工作经历与教育",
    currentRole: "研究生研究员",
    currentCompany: "南卫理公会大学，人文与科学学院 | 2020 - 2021",
    currentDesc: "进行计算数学的高级研究，专注于解决偏微分方程和随机过程的深度学习方法。",
    previousRole: "研究助理",
    previousCompany: "北京国际数学研究中心 (BICMR)，中国",
    previousDesc: "为Fokker-Planck方程开发数值方案，并为具有学习规则的结构化神经网络研究做出贡献。",
    educationTitle: "教育背景",
    educationDegree: "数学博士 (计算数学)",
    educationDesc: "南卫理公会大学 | 预计2026年",
    skillsTitle: "技能专长",
    programmingTitle: "编程语言",
    pythonSkill: "Python",
    jsSkill: "MATLAB",
    javaSkill: "C/C++",
    backendTitle: "研究领域",
    toolsTitle: "研究兴趣",
    contactTitle: "联系我",
    contactSubtitle: "让我们讨论机会与合作",
    nameLabel: "姓名",
    emailLabel: "邮箱",
    subjectLabel: "主题",
    messageLabel: "消息",
    submitBtn: "发送消息",
    footerText: "&copy; 2024 何清. 版权所有。",
    linkedinLink: "领英",
    githubLink: "GitHub",
    emailLink: "邮箱",
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
  document.getElementById("navAbout").textContent = trans.navAbout;
  document.getElementById("navExperience").textContent = trans.navExperience;
  document.getElementById("navSkills").textContent = trans.navSkills;
  document.getElementById("navContact").textContent = trans.navContact;

  // Update hero section
  document.getElementById("heroTitle").textContent = trans.heroTitle;
  document.getElementById("heroSubtitle").textContent = trans.heroSubtitle;
  document.getElementById("heroDescription").textContent = trans.heroDescription;
  document.getElementById("contactBtn").textContent = trans.contactBtn;

  // Update about section
  document.getElementById("aboutTitle").textContent = trans.aboutTitle;
  document.getElementById("aboutIntro").textContent = trans.aboutIntro;
  document.getElementById("personalTitle").textContent = trans.personalTitle;
  document.getElementById("summaryTitle").textContent = trans.summaryTitle;

  // Update experience section
  document.getElementById("experienceTitle").textContent = trans.experienceTitle;
  document.getElementById("currentRole").textContent = trans.currentRole;
  document.getElementById("currentCompany").textContent = trans.currentCompany;
  document.getElementById("currentDesc").textContent = trans.currentDesc;
  document.getElementById("previousRole").textContent = trans.previousRole;
  document.getElementById("previousCompany").textContent = trans.previousCompany;
  document.getElementById("previousDesc").textContent = trans.previousDesc;
  document.getElementById("educationTitle").textContent = trans.educationTitle;
  document.getElementById("educationDegree").textContent = trans.educationDegree;
  document.getElementById("educationDesc").textContent = trans.educationDesc;

  // Update skills section
  document.getElementById("skillsTitle").textContent = trans.skillsTitle;
  document.getElementById("programmingTitle").textContent = trans.programmingTitle;
  document.getElementById("pythonSkill").textContent = trans.pythonSkill;
  document.getElementById("jsSkill").textContent = trans.jsSkill;
  document.getElementById("javaSkill").textContent = trans.javaSkill;
  document.getElementById("backendTitle").textContent = trans.backendTitle;
  document.getElementById("toolsTitle").textContent = trans.toolsTitle;

  // Update contact section
  document.getElementById("contactTitle").textContent = trans.contactTitle;
  document.getElementById("contactSubtitle").textContent = trans.contactSubtitle;
  document.getElementById("nameLabel").textContent = trans.nameLabel;
  document.getElementById("emailLabel").textContent = trans.emailLabel;
  document.getElementById("subjectLabel").textContent = trans.subjectLabel;
  document.getElementById("messageLabel").textContent = trans.messageLabel;
  document.getElementById("submitBtn").innerHTML = `<i class="fas fa-paper-plane me-2"></i>${trans.submitBtn}`;

  // Update footer
  document.getElementById("footerText").innerHTML = trans.footerText;

  // Update body class for font
  document.body.classList.toggle("chinese", lang === "zh");

  // Update toggle button
  langToggle.innerHTML = `<i class="fas fa-language"></i> ${lang === "en" ? "中文" : "English"}`;
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

  // Contact form handling
  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    // Here you would typically send the form data to a server
    alert("Thank you for your message! This is a demo form - in a real implementation, this would send an email.");
    this.reset();
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

  document.querySelectorAll(".card, .timeline-item").forEach((el) => {
    observer.observe(el);
  });

  // Initialize with English
  updateLanguage("en");
});
