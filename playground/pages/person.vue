<template>
  <div class="profile-page">
    <div class="container">
      <div class="profile-header">
        <img
          v-if="person.image"
          :src="person.image"
          :alt="person.name"
          class="profile-image"
        >
        <div class="profile-info">
          <h1>{{ person.name }}</h1>
          <p
            v-if="person.alternateName"
            class="alternate-name"
          >
            {{ person.alternateName }}
          </p>
          <p
            v-if="person.jobTitle"
            class="job-title"
          >
            {{ person.jobTitle }}
          </p>
          <p
            v-if="person.description"
            class="description"
          >
            {{ person.description }}
          </p>
        </div>
      </div>

      <div
        v-if="person.knowsAbout && person.knowsAbout.length > 0"
        class="skills-section"
      >
        <h2>Technical Stack</h2>
        <ul class="skills-list">
          <li
            v-for="(skill, index) in person.knowsAbout"
            :key="index"
          >
            {{ skill }}
          </li>
        </ul>
      </div>

      <div
        v-if="person.sameAs && person.sameAs.length > 0"
        class="social-section"
      >
        <h2>Social Media</h2>
        <ul class="social-list">
          <li
            v-for="(url, index) in person.sameAs"
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
// Person data
const person = {
  name: 'John Doe',
  alternateName: 'johndoe',
  jobTitle: 'Software Engineer',
  url: 'https://example.com',
  image: 'https://example.com/profile.jpg',
  description: 'Full-stack developer with expertise in web application development.',
  knowsAbout: ['JavaScript', 'TypeScript', 'Vue.js', 'Nuxt', 'Node.js'],
  sameAs: [
    'https://github.com/johndoe',
    'https://twitter.com/johndoe',
    'https://linkedin.com/in/johndoe',
  ],
  worksFor: {
    name: 'Example Company',
  },
}

// Add Person Schema
useSchema({
  context: 'https://schema.org',
  type: 'Person',
  name: person.name,
  alternateName: person.alternateName,
  jobTitle: person.jobTitle,
  url: person.url,
  image: person.image,
  description: person.description,
  knowsAbout: person.knowsAbout,
  sameAs: person.sameAs,
  worksFor: {
    type: 'Organization',
    name: person.worksFor.name,
  },
  renderHtml: true,
  visuallyHidden: true,
})

// Add FAQPage Schema for Person Schema-related questions
useSchemaPage({
  mainEntity: [
    {
      name: 'When should I use Person Schema?',
      acceptedAnswer: {
        text: 'Person Schema is used on personal profile pages, team introduction pages, author information pages, etc. It provides structured data about a person\'s name, job title, social media links, technical stack, etc., to help AI models and search engines better understand information about that person.',
      },
    },
    {
      name: 'What is the knowsAbout property?',
      acceptedAnswer: {
        text: 'The knowsAbout property is an array representing the topics or technical stack that a person knows. For example, you can list technical stacks like ["JavaScript", "TypeScript", "Vue.js"], which helps AI models understand the person\'s areas of expertise.',
      },
    },
    {
      name: 'What is the difference between global and page-specific configuration?',
      acceptedAnswer: {
        text: 'Global configuration (aeo.schemas in nuxt.config.ts) is a schema that is automatically applied to all pages and is used for Organization or main Person information that applies to the entire site. Page-specific configuration (useSchema()) is a schema that is applied only to specific pages and is used to add unique Person information for each page.',
      },
    },
    {
      name: 'What are the required properties of Person Schema?',
      acceptedAnswer: {
        text: 'The required property in Person Schema is name. However, it is recommended to add jobTitle, description, image, url, sameAs (social media links), knowsAbout (technical stack), etc., to provide richer information. You can also include organization information through the worksFor property.',
      },
    },
  ],
})
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.profile-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #667eea;
}

.profile-info {
  flex: 1;
}

h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #1a202c;
}

.alternate-name {
  font-size: 1.1rem;
  color: #667eea;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.job-title {
  font-size: 1.2rem;
  color: #4a5568;
  margin-bottom: 1rem;
  font-weight: 500;
}

.description {
  font-size: 1rem;
  color: #718096;
  line-height: 1.6;
  margin: 0;
}

.skills-section,
.social-section {
  margin-top: 2rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2d3748;
}

.skills-list,
.social-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skills-list li {
  background: #edf2f7;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #2d3748;
}

.social-list li {
  margin-bottom: 0.5rem;
}

.social-list a {
  color: #2563eb;
  text-decoration: none;
  transition: color 0.2s;
}

.social-list a:hover {
  color: #1d4ed8;
  text-decoration: underline;
}
</style>
