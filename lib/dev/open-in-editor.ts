export async function openInEditor(pathname: string): Promise<void> {
  const response = await fetch("/api/open-in-editor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pathname }),
  })

  if (!response.ok) {
    const result = await response.json().catch(() => null)
    throw new Error(result?.error ?? "Failed to open editor")
  }
}
