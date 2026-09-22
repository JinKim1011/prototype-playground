export async function openInEditor(pathname: string): Promise<void> {
  await fetch("/api/open-in-editor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pathname }),
  })
}
