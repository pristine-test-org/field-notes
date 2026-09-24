export type Role = 'editor' | 'reader'

export interface Entry {
  id: string
  title: string
  date: string
  place: string
  lat: number
  lng: number
  weather: string
  tags: string[]
  author: string
  summary: string
  body: string[]
}

export interface SessionUser {
  email: string
  name: string
  role: Role
}
