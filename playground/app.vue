<template>
  <div class="app-container">
    <!-- 네비게이션 헤더 -->
    <header class="app-header">
      <nav class="app-nav">
        <div class="nav-content">
          <div class="nav-brand">
            <NuxtLink
              to="/"
              class="brand-link"
            >
              Nuxt AEO Module
            </NuxtLink>
          </div>
          <div class="nav-links">
            <NuxtLink
              to="/"
              class="nav-link"
              active-class="nav-link-active"
            >
              Home
            </NuxtLink>
            <NuxtLink
              to="/faq"
              class="nav-link"
              active-class="nav-link-active"
            >
              FAQ
            </NuxtLink>
          </div>
        </div>
      </nav>
    </header>

    <!-- 메인 컨텐츠 영역 -->
    <main class="app-main">
      <NuxtPage />
    </main>

    <!-- 푸터 -->
    <footer class="app-footer">
      <div class="footer-content">
        <p class="footer-text">
          Nuxt AEO Module Playground - Schema.org JSON-LD 예제
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e5e7eb;
}

.app-nav {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .app-nav {
    padding: 0 1.5rem;
  }
}

@media (min-width: 1024px) {
  .app-nav {
    padding: 0 2rem;
  }
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
}

.nav-brand {
  display: flex;
  align-items: center;
}

.brand-link {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  text-decoration: none;
  transition: color 0.2s;
}

.brand-link:hover {
  color: #374151;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #4b5563;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
  border-bottom: 2px solid transparent;
}

.nav-link:hover {
  color: #111827;
}

.nav-link-active {
  color: #111827;
  border-bottom-color: #111827;
}

.app-main {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
  flex: 1;
}

@media (min-width: 640px) {
  .app-main {
    padding: 2rem 1.5rem;
  }
}

@media (min-width: 1024px) {
  .app-main {
    padding: 2rem 2rem;
  }
}

.app-footer {
  background-color: #ffffff;
  border-top: 1px solid #e5e7eb;
  margin-top: 3rem;
}

.footer-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
}

@media (min-width: 640px) {
  .footer-content {
    padding: 1.5rem 1.5rem;
  }
}

@media (min-width: 1024px) {
  .footer-content {
    padding: 1.5rem 2rem;
  }
}

.footer-text {
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}
</style>
