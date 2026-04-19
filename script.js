// Language translations
const translations = {
  en: {
    navName: "Andrew Qing He",
    navHome: "Home",
    navResearch: "Research",
    navPublications: "Publications",
    navExperience: "Experience",
    navContact: "Contact",
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
    mlDesc: "Developing deep neural network methods for solving partial differential equations, including DeepMartNet for boundary value problems and eigenvalue computations.",
    stochasticTitle: "Stochastic Computing",
    stochasticDesc: "Employing stochastic tools including Gillespie algorithms and stochastic differential equations to model system dynamics and solve challenging computational problems.",
    geometryTitle: "Differential Geometry",
    geometryDesc: "Investigating geometric frameworks including connections and Riemannian metrics to provide insights into diverse models from mechanics to machine learning optimization.",
    biologyTitle: "Systems Biology",
    biologyDesc: "Studying emergent dynamics in biological networks, including gene regulation and neuronal systems, with experience from the iGEM competition.",
    publicationsTitle: "Publications",
    publicationsSubtitle: "Selected research papers and preprints",
    experienceTitle: "Experience & Education",
    phdTitle: "Ph.D. Candidate in Mathematics",
    phdInstitution: "Southern Methodist University, Dedman College of Humanities and Sciences",
    phdPeriod: "2020 - Present",
    phdDesc: "Conducting research in computational mathematics, focusing on deep learning methods for solving partial differential equations and developing stochastic computational algorithms.",
    researchTitle: "Research Assistant",
    researchInstitution: "Beijing International Center of Mathematical Research (BICMR)",
    researchPeriod: "China",
    researchDesc: "Contributed to research on numerical schemes for Fokker-Planck equations and structured neural networks.",
    igemTitle: "iGEM Competition Participant",
    igemInstitution: "International Genetically Engineered Machine Competition",
    igemPeriod: "2019 - Team Peking",
    igemDesc: "Participated in synthetic biology competition, gaining hands-on experience in systems biology and interdisciplinary research.",
    awardsTitle: "Awards & Recognition",
    award1Title: "Betty McKnight Speairs Graduate Student Award in Mathematics",
    award1Desc: "Recognition for teaching excellence",
    award2Title: "SMU Research and Innovation Week Award",
    award2Desc: "Winner in AI for Scientific Computing category",
    contactTitle: "Contact",
    contactSubtitle: "Get in touch for collaborations or research discussions",
    nameLabel: "Name",
    emailLabel: "Email",
    subjectLabel: "Subject",
    messageLabel: "Message",
    submitBtn: "Send Message",
    footerText: "&copy; 2024 Andrew Qing He (何清). All rights reserved."
  },
  zh: {
    navName: "何清",
    navHome: "首页",
    navResearch: "研究",
    navPublications: "发表",
    navExperience: "经历",
    navContact: "联系",
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
    contactTitle: "联系方式",
    contactSubtitle: "联系我进行合作或研究讨论",
    nameLabel: "姓名",
    emailLabel: "邮箱",
    subjectLabel: "主题",
    messageLabel: "消息",
    submitBtn: "发送消息",
    footerText: "&copy; 2024 何清 (Andrew Qing He). 版权所有。"
  }
};

// Language toggle functionality
let currentLang = 'en';
const langToggle = document.getElementById('langToggle');

function updateLanguage(lang) {
  currentLang = lang;
  const trans = translations[lang];

  // Update navigation
  document.getElementById('navName').textContent = trans.navName;
  document.getElementById('navHome').textContent = trans.navHome;
  document.getElementById('navResearch').textContent = trans.navResearch;
  document.getElementById('navPublications').textContent = trans.navPublications;
  document.getElementById('navExperience').textContent = trans.navExperience;
  document.getElementById('navContact').textContent = trans.navContact;

  // Update hero section
  document.getElementById('heroTitle').textContent = trans.heroTitle;
  document.getElementById('heroSubtitle').textContent = trans.heroSubtitle;
  document.getElementById('heroDescription').innerHTML = trans.heroDescription.replace('\n', '<br>');
  document.getElementById('researchBadge1').textContent = trans.researchBadge1;
  document.getElementById('researchBadge2').textContent = trans.researchBadge2;
  document.getElementById('researchBadge3').textContent = trans.researchBadge3;
  document.getElementById('researchBadge4').textContent = trans.researchBadge4;
  document.getElementById('researchBtn').textContent = trans.researchBtn;

  // Update research section
  document.getElementById('researchTitle').textContent = trans.researchTitle;
  document.getElementById('researchSubtitle').textContent = trans.researchSubtitle;
  document.getElementById('mlTitle').textContent = trans.mlTitle;
  document.getElementById('mlDesc').textContent = trans.mlDesc;
  document.getElementById('stochasticTitle').textContent = trans.stochasticTitle;
  document.getElementById('stochasticDesc').textContent = trans.stochasticDesc;
  document.getElementById('geometryTitle').textContent = trans.geometryTitle;
  document.getElementById('geometryDesc').textContent = trans.geometryDesc;
  document.getElementById('biologyTitle').textContent = trans.biologyTitle;
  document.getElementById('biologyDesc').textContent = trans.biologyDesc;

  // Update publications section
  document.getElementById('publicationsTitle').textContent = trans.publicationsTitle;
  document.getElementById('publicationsSubtitle').textContent = trans.publicationsSubtitle;

  // Update experience section
  document.getElementById('experienceTitle').textContent = trans.experienceTitle;
  document.getElementById('phdTitle').textContent = trans.phdTitle;
  document.getElementById('phdInstitution').textContent = trans.phdInstitution;
  document.getElementById('phdPeriod').textContent = trans.phdPeriod;
  document.getElementById('phdDesc').textContent = trans.phdDesc;
  document.getElementById('researchTitle').textContent = trans.researchTitle;
  document.getElementById('researchInstitution').textContent = trans.researchInstitution;
  document.getElementById('researchPeriod').textContent = trans.researchPeriod;
  document.getElementById('researchDesc').textContent = trans.researchDesc;
  document.getElementById('igemTitle').textContent = trans.igemTitle;
  document.getElementById('igemInstitution').textContent = trans.igemInstitution;
  document.getElementById('igemPeriod').textContent = trans.igemPeriod;
  document.getElementById('igemDesc').textContent = trans.igemDesc;

  // Update awards section
  document.getElementById('awardsTitle').textContent = trans.awardsTitle;
  document.getElementById('award1Title').textContent = trans.award1Title;
  document.getElementById('award1Desc').textContent = trans.award1Desc;
  document.getElementById('award2Title').textContent = trans.award2Title;
  document.getElementById('award2Desc').textContent = trans.award2Desc;

  // Update contact section
  document.getElementById('contactTitle').textContent = trans.contactTitle;
  document.getElementById('contactSubtitle').textContent = trans.contactSubtitle;
  document.getElementById('nameLabel').textContent = trans.nameLabel;
  document.getElementById('emailLabel').textContent = trans.emailLabel;
  document.getElementById('subjectLabel').textContent = trans.subjectLabel;
  document.getElementById('messageLabel').textContent = trans.messageLabel;
  document.getElementById('submitBtn').innerHTML = `<i class="fas fa-paper-plane me-2"></i>${trans.submitBtn}`;

  // Update footer
  document.getElementById('footerText').innerHTML = trans.footerText;

  // Update body class for font
  document.body.classList.toggle('chinese', lang === 'zh');

  // Update toggle button
  langToggle.innerHTML = `<i class="fas fa-language"></i> ${lang === 'en' ? '中文' : 'English'}`;
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Language toggle
  langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'zh' : 'en';
    updateLanguage(newLang);
  });

  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Contact form handling
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! This is a demo form - in a real implementation, this would send an email.');
    this.reset();
  });

  // Animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card, .timeline-item, .publication-item').forEach(el => {
    observer.observe(el);
  });

  // Initialize with English
  updateLanguage('en');
});