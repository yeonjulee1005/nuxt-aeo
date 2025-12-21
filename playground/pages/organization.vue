<template>
  <div class="about-page">
    <div class="container">
      <h1>{{ organization.name }}</h1>
      <p class="description">
        {{ organization.description }}
      </p>

      <div class="info-section">
        <h2>Company Information</h2>
        <ul>
          <li><strong>Website:</strong> <a :href="organization.url">{{ organization.url }}</a></li>
          <li v-if="organization.contactPoint">
            <strong>Contact:</strong> {{ organization.contactPoint.telephone }}
          </li>
          <li v-if="organization.contactPoint">
            <strong>Email:</strong> {{ organization.contactPoint.email }}
          </li>
        </ul>
      </div>

      <div
        v-if="organization.sameAs && organization.sameAs.length > 0"
        class="social-section"
      >
        <h2>Social Media</h2>
        <ul>
          <li
            v-for="(url, index) in organization.sameAs"
            :key="index"
          >
            <a
              :href="url"
              target="_blank"
              rel="noopener noreferrer"
            >{{ url }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Organization data
const organization = {
  name: 'Example Company',
  url: 'https://example.com',
  description: 'Example Company provides the best services.',
  logo: 'https://example.com/logo.png',
  sameAs: [
    'https://github.com/example',
    'https://twitter.com/example',
  ],
  contactPoint: {
    telephone: '+1-555-123-4567',
    contactType: 'Customer Service',
    email: 'support@example.com',
  },
}

// Add Organization Schema
useSchema({
  context: 'https://schema.org',
  type: 'Organization',
  name: organization.name,
  url: organization.url,
  description: organization.description,
  logo: organization.logo,
  sameAs: organization.sameAs,
  contactPoint: {
    type: 'ContactPoint',
    telephone: organization.contactPoint.telephone,
    contactType: organization.contactPoint.contactType,
    email: organization.contactPoint.email,
  },
  renderHtml: true,
  visuallyHidden: true,
})
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  padding: 2rem;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 3rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.description {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.info-section,
.social-section {
  margin-top: 2rem;
}

.info-section h2,
.social-section h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

a {
  color: #2563eb;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
