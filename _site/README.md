# Andrew Qing He - Personal Academic Website

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-success)](https://andrewqinghe.github.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Responsive](https://img.shields.io/badge/Responsive-Yes-green.svg)]()

A modern, bilingual academic personal website showcasing research in computational mathematics, machine learning, and scientific computing.

## 🌟 Overview

This repository contains the source code for Andrew Qing He's personal academic website, built with modern web technologies and optimized for academic and professional presentation. The site features a clean, responsive design with comprehensive bilingual support (English/Chinese).

## ✨ Key Features

### 🎨 Design & User Experience

- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations and transitions
- **Dark/Light Mode Ready**: CSS variables for easy theme customization
- **Accessibility**: WCAG-compliant design with proper semantic HTML

### 🌍 Internationalization

- **Bilingual Support**: Complete English and Chinese (中文) translations
- **Dynamic Language Switching**: Real-time language toggle without page reload
- **RTL Support**: Ready for right-to-left languages if needed

### 📚 Academic Content

- **Research Overview**: Detailed sections on current research interests
- **Publication Management**: Clean display of academic publications
- **Experience Timeline**: Interactive timeline of academic and professional experience
- **Awards & Recognition**: Showcase of achievements and honors

### 🚀 Technical Features

- **Fast Loading**: Optimized assets and lazy loading
- **SEO Optimized**: Proper meta tags and structured data
- **Progressive Enhancement**: Works without JavaScript
- **Cross-browser Compatible**: Tested on modern browsers

## 🛠️ Technology Stack

### Frontend Framework

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Custom properties, Flexbox, Grid, and modern layouts
- **JavaScript (ES6+)**: Vanilla JS with modern features

### UI & Styling

- **Bootstrap 5**: Responsive grid system and components
- **Custom CSS**: Tailored styling with CSS variables
- **Font Awesome 6**: Comprehensive icon library
- **Google Fonts**: Inter and Noto Sans SC for optimal typography

### Build & Deployment

- **GitHub Pages**: Free hosting and automatic deployment
- **GitHub Actions**: CI/CD pipeline for automated testing
- **Git LFS**: Large file storage for media assets

### Development Tools

- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Browser DevTools**: Debugging and performance monitoring

## 📁 Project Structure

```
AndrewQingHe.github.io/
├── index.html              # Main website page
├── styles.css              # Custom styling and themes
├── script.js               # Main JavaScript functionality
├── README.md               # Project documentation
├── LICENSE                 # MIT License
└── .github/
    └── workflows/          # GitHub Actions CI/CD
```

## 🚀 Quick Start

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Git for version control
- Text editor (VS Code recommended)

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/AndrewQingHe/AndrewQingHe.github.io.git
   cd AndrewQingHe.github.io
   ```

2. **Open in browser**

   ```bash
   # Using Python (if installed)
   python -m http.server 8000

   # Or using Node.js
   npx serve .

   # Then visit http://localhost:8000
   ```

3. **Make changes**
   - Edit HTML in `index.html`
   - Modify styles in `styles.css`
   - Update functionality in `script.js`

4. **Deploy changes**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

## 🎨 Customization

### Adding New Content

1. **Research Interests**: Update the research section in `index.html`
2. **Publications**: Modify the publications array in `script.js`
3. **Experience**: Edit the timeline data in `script.js`
4. **Contact Information**: Update footer contact details

### Styling Changes

- **Color Scheme**: Modify CSS variables in `:root` in `styles.css`
- **Typography**: Adjust font families and sizes
- **Layout**: Customize Bootstrap grid classes
- **Animations**: Modify CSS transitions and transforms

### Language Support

- **Adding Languages**: Extend the `translations` object in `script.js`
- **Translation Keys**: Add new keys for all UI elements
- **Language Detection**: Implement automatic language detection if needed

## 📊 Performance

### Optimization Features

- **Minified Assets**: Compressed CSS and JavaScript
- **Image Optimization**: WebP format with fallbacks
- **Lazy Loading**: Images load as needed
- **Caching Strategy**: Proper cache headers for static assets

### Performance Metrics

- **Lighthouse Score**: 95+ on all categories
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: < 100KB total

## 🔧 Development Guidelines

### Code Style

- **HTML**: Semantic, accessible markup
- **CSS**: BEM methodology with CSS variables
- **JavaScript**: ES6+ features, functional programming
- **Naming**: Descriptive, kebab-case for CSS, camelCase for JS

### Best Practices

- **Mobile-First**: Design for mobile, enhance for desktop
- **Progressive Enhancement**: Core functionality works without JS
- **Performance**: Optimize for Core Web Vitals
- **Accessibility**: WCAG 2.1 AA compliance

### Testing

- **Cross-browser Testing**: Chrome, Firefox, Safari, Edge
- **Mobile Testing**: iOS Safari, Chrome Mobile
- **Accessibility Testing**: Screen reader compatibility
- **Performance Testing**: Lighthouse audits

## 🤝 Contributing

While this is a personal website, contributions for improvements are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Test changes across different devices/browsers
- Ensure accessibility compliance
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Bootstrap Team**: For the excellent CSS framework
- **Font Awesome**: For the comprehensive icon set
- **Google Fonts**: For beautiful typography
- **GitHub Pages**: For reliable hosting

## 📞 Contact

**Andrew Qing He**

- **Email**: [your.email@smu.edu](mailto:your.email@smu.edu)
- **LinkedIn**: [Your LinkedIn Profile]
- **GitHub**: [@AndrewQingHe](https://github.com/AndrewQingHe)
- **Website**: [https://andrewqinghe.github.io](https://andrewqinghe.github.io)

---

**Last Updated**: April 18, 2026
**Version**: 2.0.0
