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
        heroSubtitle: "Professional Developer & Technology Enthusiast",
        heroDescription: "Passionate about creating innovative solutions and delivering exceptional user experiences through clean, efficient code.",
        contactBtn: "Get In Touch",
        aboutTitle: "About Me",
        aboutIntro: "A dedicated professional with a passion for technology and innovation.",
        personalTitle: "Personal Information",
        summaryTitle: "Professional Summary",
        experienceTitle: "Experience & Education",
        currentRole: "[Current Position/Role]",
        currentCompany: "[Company Name] | [Start Date] - Present",
        currentDesc: "Leading development initiatives and contributing to innovative projects in a dynamic team environment.",
        previousRole: "[Previous Position/Role]",
        previousCompany: "[Previous Company] | [Previous Dates]",
        previousDesc: "Developed and maintained software solutions, collaborating with cross-functional teams to deliver quality products.",
        educationTitle: "Education",
        educationDegree: "[Degree] in [Field of Study]",
        educationDesc: "[University Name] | [Graduation Year]",
        skillsTitle: "Skills & Expertise",
        programmingTitle: "Programming",
        pythonSkill: "Python",
        jsSkill: "JavaScript",
        javaSkill: "Java",
        backendTitle: "Backend Development",
        toolsTitle: "Tools & Technologies",
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
        emailLink: "Email"
    },
    zh: {
        navName: "何清",
        navHome: "首页",
        navAbout: "关于",
        navExperience: "经历",
        navSkills: "技能",
        navContact: "联系",
        heroTitle: "何清 (He Qing)",
        heroSubtitle: "专业开发者与技术爱好者",
        heroDescription: "热衷于通过简洁高效的代码创造创新解决方案，提供卓越的用户体验。",
        contactBtn: "联系我",
        aboutTitle: "关于我",
        aboutIntro: "一位对技术和创新充满热情的专业人士。",
        personalTitle: "个人信息",
        summaryTitle: "职业简介",
        experienceTitle: "工作经历与教育",
        currentRole: "[当前职位]",
        currentCompany: "[公司名称] | [开始日期] - 至今",
        currentDesc: "在动态团队环境中领导开发计划，为创新项目做出贡献。",
        previousRole: "[上一职位]",
        previousCompany: "[上一公司] | [工作日期]",
        previousDesc: "开发和维护软件解决方案，与跨职能团队合作交付优质产品。",
        educationTitle: "教育背景",
        educationDegree: "[学位] [专业]",
        educationDesc: "[大学名称] | [毕业年份]",
        skillsTitle: "技能专长",
        programmingTitle: "编程语言",
        pythonSkill: "Python",
        jsSkill: "JavaScript",
        javaSkill: "Java",
        backendTitle: "后端开发",
        toolsTitle: "工具与技术",
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
        emailLink: "邮箱"
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
    document.getElementById('navAbout').textContent = trans.navAbout;
    document.getElementById('navExperience').textContent = trans.navExperience;
    document.getElementById('navSkills').textContent = trans.navSkills;
    document.getElementById('navContact').textContent = trans.navContact;

    // Update hero section
    document.getElementById('heroTitle').textContent = trans.heroTitle;
    document.getElementById('heroSubtitle').textContent = trans.heroSubtitle;
    document.getElementById('heroDescription').textContent = trans.heroDescription;
    document.getElementById('contactBtn').textContent = trans.contactBtn;

    // Update about section
    document.getElementById('aboutTitle').textContent = trans.aboutTitle;
    document.getElementById('aboutIntro').textContent = trans.aboutIntro;
    document.getElementById('personalTitle').textContent = trans.personalTitle;
    document.getElementById('summaryTitle').textContent = trans.summaryTitle;

    // Update experience section
    document.getElementById('experienceTitle').textContent = trans.experienceTitle;
    document.getElementById('currentRole').textContent = trans.currentRole;
    document.getElementById('currentCompany').textContent = trans.currentCompany;
    document.getElementById('currentDesc').textContent = trans.currentDesc;
    document.getElementById('previousRole').textContent = trans.previousRole;
    document.getElementById('previousCompany').textContent = trans.previousCompany;
    document.getElementById('previousDesc').textContent = trans.previousDesc;
    document.getElementById('educationTitle').textContent = trans.educationTitle;
    document.getElementById('educationDegree').textContent = trans.educationDegree;
    document.getElementById('educationDesc').textContent = trans.educationDesc;

    // Update skills section
    document.getElementById('skillsTitle').textContent = trans.skillsTitle;
    document.getElementById('programmingTitle').textContent = trans.programmingTitle;
    document.getElementById('pythonSkill').textContent = trans.pythonSkill;
    document.getElementById('jsSkill').textContent = trans.jsSkill;
    document.getElementById('javaSkill').textContent = trans.javaSkill;
    document.getElementById('backendTitle').textContent = trans.backendTitle;
    document.getElementById('toolsTitle').textContent = trans.toolsTitle;

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
        // Here you would typically send the form data to a server
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

    document.querySelectorAll('.card, .timeline-item').forEach(el => {
        observer.observe(el);
    });

    // Initialize with English
    updateLanguage('en');
});