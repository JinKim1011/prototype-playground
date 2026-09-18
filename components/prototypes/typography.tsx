import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const typographyStyles = cva("", {
  variants: {
    variant: {
      "heading-strong": "text-[1.125rem] leading-[1.3] font-bold",
      "heading": "text-[1.125rem] leading-[1.3] font-semibold",
      "body-strong": "text-[1rem] leading-[1.7] font-semibold",
      "body": "text-[1rem] leading-[1.7] font-normal",
      "caption": "text-[0.75rem] leading-[1.7] font-normal",
      "label-large": "text-[0.875rem] leading-[1.3] font-normal",
      "label": "text-[0.75rem] leading-[1.3] font-normal",
      "label-small": "text-[0.6875rem] leading-[1.3] font-normal",
    },
  },
  defaultVariants: {
    variant: "body",
  },
})

type TypographyVariantProps = VariantProps<typeof typographyStyles>

type TypographyProps<T extends ElementType = "p"> = {
  as?: T
  children?: ReactNode
  className?: string
} & TypographyVariantProps &
  Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">

export function Typography<T extends ElementType = "p">({
  as,
  variant,
  children,
  className,
  ...props
}: TypographyProps<T>) {
  const Component = as ?? "p"

  return (
    <Component
      className={cn(typographyStyles({ variant }), className)}
      {...props}
    >
      {children}
    </Component>
  )
}
