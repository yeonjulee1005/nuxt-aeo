export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'neutral',
      gray: 'neutral',
    },
    pageHero: {
      slots: {
        title: 'text-5xl sm:text-7xl tracking-tight font-bold text-highlighted',
        description: 'text-lg sm:text-xl text-pretty tracking-tight font-medium text-muted-foreground leading-tight',
      },
    },
    pageFeature: {
      slots: {
        root: 'relative rounded-lg ring-1 ring-accented p-4',
        leadingIcon: 'size-6 shrink-0 text-primary',
        title: 'text-lg text-pretty font-semibold text-highlighted',
        description: 'text-base text-pretty text-muted',
      },
    },
  },
})
