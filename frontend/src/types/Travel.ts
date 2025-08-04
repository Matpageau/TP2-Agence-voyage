export interface TravelData {
  _id: string
  title: string
  description: string
  price: number
  destination: string
  img_url: string
  poi_ids: string[]
  departure_date: string
  arrival_date: string
  departure_city: string
  arrival_city: string
  type: "inclusive" | "backpack"
}