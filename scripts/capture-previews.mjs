import { chromium } from "playwright"
import { mkdir, readFile } from "node:fs/promises"
import path from "node:path"

const baseUrl = process.env.PREVIEW_BASE_URL ?? "http://localhost:3000"

const templates = JSON.parse(await readFile("data/templates.json", "utf8"))

const prototypes = JSON.parse(await readFile("data/prototypes.json", "utf8"))

const owners = JSON.parse(await readFile("data/owners.json", "utf8"))

const ownerById = new Map(owners.owners.map((owner) => [owner.id, owner]))

const targets = [
  ...templates.templates.map((template) => ({
    url: `/templates/${template.slug}`,
    output: `public/previews/templates/${template.slug}.png`,
    title: template.title,
  })),
  ...prototypes.entries.flatMap((prototype) => {
    const owner = ownerById.get(prototype.ownerId)

    if (!owner) {
      return []
    }

    return [
      {
        url: `/${owner.slug}/${prototype.slug}`,
        output: `public/previews/prototypes/${owner.slug}/${prototype.slug}.png`,
        title: prototype.title,
      },
    ]
  }),
]

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: {
    width: 1280,
    height: 720,
  },
  deviceScaleFactor: 1,
})

for (const target of targets) {
  const outputDirectory = path.dirname(target.output)

  await mkdir(outputDirectory, { recursive: true })

  console.log(`Capturing ${target.title}`)

  await page.goto(`${baseUrl}${target.url}`, {
    waitUntil: "networkidle",
  })

  await page.waitForTimeout(500)

  await page.screenshot({
    path: target.output,
    type: "png",
    fullPage: false,
  })
}

await browser.close()
