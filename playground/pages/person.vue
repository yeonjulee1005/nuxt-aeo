<script setup lang="ts">
const person = {
  name: 'John Doe',
  alternateName: 'johndoe',
  jobTitle: 'Software Engineer',
  url: '/profile',
  image: '/images/profile.jpg',
  description: 'Full-stack developer with expertise in web application development.',
  knowsAbout: ['JavaScript', 'TypeScript', 'Vue.js', 'Nuxt', 'Node.js'],
  sameAs: [
    'https://github.com/johndoe',
    '/social/twitter',
    'https://linkedin.com/in/johndoe',
  ],
  worksFor: {
    name: 'Example Company',
  },
}

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

useSchemaFaq({
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

<template>
  <div class="space-y-6">
    <UCard>
      <div class="flex flex-col sm:flex-row gap-6">
        <UAvatar
          v-if="person.image"
          :src="person.image"
          :alt="person.name"
          size="3xl"
        />
        <div class="flex-1 space-y-2">
          <h1 class="text-3xl font-bold">
            {{ person.name }}
          </h1>
          <p
            v-if="person.alternateName"
            class="text-lg text-primary"
          >
            {{ person.alternateName }}
          </p>
          <p
            v-if="person.jobTitle"
            class="text-xl text-gray-600 dark:text-gray-400"
          >
            {{ person.jobTitle }}
          </p>
          <p
            v-if="person.description"
            class="text-gray-600 dark:text-gray-400"
          >
            {{ person.description }}
          </p>
        </div>
      </div>
    </UCard>

    <UCard
      v-if="person.knowsAbout && person.knowsAbout.length > 0"
    >
      <template #header>
        <h2 class="text-xl font-semibold">
          Technical Stack
        </h2>
      </template>
      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="(skill, index) in person.knowsAbout"
          :key="index"
          :label="skill"
          color="neutral"
          variant="soft"
        />
      </div>
    </UCard>

    <UCard
      v-if="person.sameAs && person.sameAs.length > 0"
    >
      <template #header>
        <h2 class="text-xl font-semibold">
          Social Media
        </h2>
      </template>
      <ul class="space-y-2">
        <li
          v-for="(url, index) in person.sameAs"
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
    </UCard>
  </div>
</template>
