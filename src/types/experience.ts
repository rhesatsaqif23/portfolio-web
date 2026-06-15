export type ExpType = 'work' | 'organization' | 'volunteer' | 'education'

export interface Experience {
  id: string
  orgName: string
  role: string
  startDate: string
  endDate: string | null
  description: string[]
  type: ExpType
  imageUrl: string | null
  sortOrder: number | null
}
