<script setup lang="ts">
const organization = {
  name: 'Example Company',
  url: '/',
  description: 'Example Company provides the best services.',
  logo: '/images/logo.png',
  sameAs: [
    'https://github.com/example',
    '/social/twitter',
  ],
  contactPoint: {
    telephone: '+1-555-123-4567',
    contactType: 'Customer Service',
    email: 'support@example.com',
  },
}

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

useSchemaFaq({
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

<template>
  <div class="space-y-6">
    <UCard>
      <h1 class="text-3xl font-bold mb-4">
        {{ organization.name }}
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
        {{ organization.description }}
      </p>

      <div class="space-y-4">
        <div>
          <h2 class="text-xl font-semibold mb-3">
            Company Information
          </h2>
          <ul class="space-y-2">
            <li>
              <strong>
                Website:
              </strong>
              <ULink
                :to="organization.url"
                class="ml-2 text-primary"
              >
                {{ organization.url }}
              </ULink>
            </li>
            <li
              v-if="organization.contactPoint"
            >
              <strong>
                Contact:
              </strong>
              <span class="ml-2">
                {{ organization.contactPoint.telephone }}
              </span>
            </li>
            <li
              v-if="organization.contactPoint"
            >
              <strong>Email:</strong>
              <span class="ml-2">
                {{ organization.contactPoint.email }}
              </span>
            </li>
          </ul>
        </div>

        <div
          v-if="organization.sameAs && organization.sameAs.length > 0"
        >
          <h2 class="text-xl font-semibold mb-3">
            Social Media
          </h2>
          <ul class="space-y-2">
            <li
              v-for="(url, index) in organization.sameAs"
              :key="index"
            >
              <ULink
                :to="url"
                external
                class="text-primary"
              >
                {{ url }}
              </ULink>
            </li>
          </ul>
        </div>
      </div>
    </UCard>
  </div>
</template>
