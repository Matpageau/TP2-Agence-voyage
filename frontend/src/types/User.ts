export interface UserData {
  _id: string
  email: string
  password: string
  username: string
  role: "user" | "manager" | "admin"
  liked: string[]
  cart: {travelId: string, quantity: number}[]
  createdAt: string
}