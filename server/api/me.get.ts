import { sessionUser } from '../utils/store'

export default defineEventHandler((event) => ({ user: sessionUser(event) }))
