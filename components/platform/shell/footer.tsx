import { buttonVariants } from "@/components/platform/ui/button"
import { ModeToggle } from "@/components/platform/ui/mode-toggle"
import Link from "next/link"
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr"

export function Footer() {
  return (
    <footer className="flex items-center justify-between border-t-[0.5px] pt-4">
      <Link
        href="https://github.com/JinKim1011/prototype-playground"
        className={buttonVariants({
          variant: "link",
          size: "sm",
          className: "-ml-2 text-muted-foreground!",
        })}
      >
        GitHub
      </Link>
      <ModeToggle />
    </footer>
  )
}
