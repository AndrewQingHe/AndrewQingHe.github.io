---
layout: default
title: Research Blog
permalink: /blog/
---

<div class="container mt-5 pt-5">
  <div class="row">
    <div class="col-lg-8">
      <h1 class="display-4 fw-bold mb-4" id="blogTitle">Research Blog</h1>
      <p class="lead mb-5" id="blogSubtitle">Short articles on computational mathematics, machine learning, and scientific computing</p>

      {% for post in site.posts %}
      <div class="blog-post-card mb-5 fade-in">
        <div class="blog-post-header">
          <h2 class="blog-post-title">
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
          </h2>
          <div class="blog-post-meta">
            <i class="fas fa-calendar"></i> {{ post.date | date: "%B %-d, %Y" }} &nbsp;&nbsp;
            <i class="fas fa-user"></i> {{ post.author | default: site.author }}
          </div>
        </div>
        <div class="blog-post-excerpt">
          {{ post.excerpt | default: post.content | strip_html | truncatewords: 50 }}
        </div>
        <div class="blog-post-footer">
          <div class="blog-post-tags">
            {% for tag in post.tags %}
            <span class="badge bg-primary">{{ tag }}</span>
            {% endfor %}
          </div>
          <a href="{{ post.url | relative_url }}" class="read-more-btn">
            Read More <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
      {% endfor %}
    </div>

    <div class="col-lg-4">
      <!-- About Blog -->
      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title" id="aboutTitle">About This Blog</h5>
          <p class="card-text" id="aboutText">
            This blog features short articles on computational mathematics, machine learning for PDEs, stochastic methods, and scientific computing. Posts are written in Markdown for easy reading.
          </p>
          <a href="{{ '/blog_articles/template.md' | relative_url }}" class="btn btn-outline-primary btn-sm" id="templateBtn" target="_blank">
            <i class="fas fa-file-alt"></i> View Template
          </a>
        </div>
      </div>

      <!-- Recent Posts -->
      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title" id="recentPostsTitle">Recent Posts</h5>
          <div id="recent-posts-list">
            {% for post in site.posts limit:5 %}
            <div class="recent-post-item">
              <div class="recent-post-title">
                <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
              </div>
              <div class="recent-post-date">{{ post.date | date: "%b %-d, %Y" }}</div>
            </div>
            {% endfor %}
          </div>
        </div>
      </div>

      <!-- Categories -->
      <div class="card">
        <div class="card-body">
          <h5 class="card-title" id="categoriesTitle">Categories</h5>
          <div class="categories-list">
            {% assign tags = site.posts | map: 'tags' | join: ',' | split: ',' | uniq | sort %}
            {% for tag in tags %}
            <a href="{{ '/blog/tag/' | append: tag | downcase | replace: ' ', '-' | relative_url }}" class="badge bg-secondary me-1 mb-1">{{ tag }}</a>
            {% endfor %}
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
