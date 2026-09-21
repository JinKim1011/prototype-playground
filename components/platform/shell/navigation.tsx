"use client"

import { usePathname, useRouter } from "next/navigation"
import { NAV_TABS } from "@/components/platform/shell/config/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/platform/ui/tabs"

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Tabs
      value={pathname}
      onValueChange={(v) => router.push(v)}
      className="relative w-full border-b-[0.5px] border-border"
    >
      <TabsList variant="line">
        {NAV_TABS.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
