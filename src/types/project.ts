export interface Project {
  id: string
  title: string
  slug: string
  descriptionShort: string | null
  longDescription: string | null
  thumbnailUrl: string | null
  techStacks: string[]
  isFeatured: boolean
  category: string | null
  githubUrl: string | null
  liveUrl: string | null
  additionalLinks: { label: string; url: string }[] | null
  sortOrder: number | null
}
