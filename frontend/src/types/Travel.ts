export interface TravelData {
  _id?: string
  title: string
  description: string
  price: number
  destination: string
  img_url: string
  poi: number
  departure_date: string
  arrival_date: string
  type: "inclusive" | "backpack"
}