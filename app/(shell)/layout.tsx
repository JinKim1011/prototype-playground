import { ShellLayout } from "@/components/platform/shell/shell-layout"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ShellLayout>{children}</ShellLayout>
}
