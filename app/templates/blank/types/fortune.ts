export type FortuneCategory = "encouragement" | "experiment" | "reflection"

export type Fortune = {
  id: string
  message: string
  category: FortuneCategory
}
