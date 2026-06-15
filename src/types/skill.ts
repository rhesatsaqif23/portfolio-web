export type SkillCategory = 'mobile' | 'web' | 'frontend' | 'backend' | 'database'
  | 'devops' | 'deployment' | 'cloud' | 'design' | 'tools' | 'other'

export interface Skill {
  id: string
  name: string
  category: SkillCategory
  iconUrl: string | null
  sortOrder: number | null
}
