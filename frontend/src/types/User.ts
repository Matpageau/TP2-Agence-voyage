export interface UserType {
  email: string
  password: string
  username: string
  role: "user" | "manager" | "admin"
}