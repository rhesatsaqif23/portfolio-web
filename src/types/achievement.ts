export type AchievementCategory = "hackathon" | "software development" | "photo & video" | "applied technology";

export interface Achievement {
  id: string
  title: string
  eventName: string | null
  organizer: string | null
  date: string
  description: string | null
  url: string | null
  sortOrder: number | null
  category: AchievementCategory | null
}
