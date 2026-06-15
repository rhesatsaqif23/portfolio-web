export interface Profile {
  id: string
  fullName: string
  currentRole: string
  currentRoles: string[]
  bioShort: string | null
  bioLong: string | null
  avatarUrl: string | null
  cvUrl: string | null
  location: string | null
  email: string | null
  github: string | null
  linkedin: string | null
  instagram: string | null
}
