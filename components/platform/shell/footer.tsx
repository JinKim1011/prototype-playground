import { buttonVariants } from "@/components/platform/ui/button"
import { ModeToggle } from "@/components/platform/ui/mode-toggle"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="flex items-center justify-between border-t-[0.5px] py-1.5">
      <Link
        href="https://github.com/JinKim1011/prototype-playground"
        className={buttonVariants({
          variant: "link",
          size: "xs",
          className: "-ml-2",
        })}
      >
        GITHUB
      </Link>
      <ModeToggle />
    </footer>
  )
}
