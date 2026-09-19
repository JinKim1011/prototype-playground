"use client"

import { useState } from "react"
import { fortunes } from "../data/fortunes"
import { Button } from "@/components/prototypes/button"
import { Typography } from "@/components/prototypes/typography"

export function FortuneCookie() {
  const [fortune, setFortune] = useState<string | null>(null)

  function revealFortune() {
    const index = Math.floor(Math.random() * fortunes.length)
    setFortune(fortunes[index].message)
  }

  return (
    <section className="flex flex-col gap-3 border-t pt-8">
      <Typography variant="label">Ready for a tiny bit of wisdom?</Typography>

      <Button type="button" variant="outline" onClick={revealFortune}>
        Reveal my fortune
      </Button>

      {fortune && <Typography variant="label-small">{fortune}</Typography>}
    </section>
  )
}
