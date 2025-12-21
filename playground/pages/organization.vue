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

// Add FAQPage Schema for Organization Schema-related questions
useSchemaPage({
  mainEntity: [
    {
      name: 'When should I use Organization Schema?',
      acceptedAnswer: {
        text: 'Organization Schema is used on company introduction pages, organization information pages, About pages, etc. It provides structured data about the company or organization\'s name, description, logo, website URL, contact information, social media links, etc., to help search engines and AI models better understand organization information.',
      },
    },
    {
      name: 'What are the required properties?',
      acceptedAnswer: {
        text: 'The required property in Organization Schema is name. However, it is recommended to add url, description, logo, sameAs (social media links), contactPoint (contact information), etc., to provide more complete information. In particular, you can distinguish and provide contact information for customer support, sales, general inquiries, etc., through contactPoint.',
      },
    },
    {
      name: 'How do I configure contactPoint?',
      acceptedAnswer: {
        text: 'contactPoint is configured as an object of type ContactPoint and includes properties such as telephone (phone number), email, and contactType (contact type). contactType can be distinguished as "Customer Service", "Sales", "Technical Support", etc., and you can also provide multiple contacts as an array.',
      },
    },
    {
      name: 'Can I configure Organization Schema globally?',
      acceptedAnswer: {
        text: 'Yes, adding Organization Schema to the aeo.schemas array in nuxt.config.ts will automatically inject it into all pages. This is useful when setting organization information (company name, logo, default contact, etc.) that applies to the entire site.',
      },
    },
  ],
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
