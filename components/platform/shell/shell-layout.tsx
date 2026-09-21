import { Header } from "@/components/platform/shell/header"
import { Navigation } from "@/components/platform/shell/navigation"

export function ShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col px-3">
      <Header />
      <Navigation />
      <main className="w-full">{children}</main>
    </div>
  )
}
