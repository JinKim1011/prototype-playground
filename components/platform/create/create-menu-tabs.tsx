import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/platform/ui/tabs"
import { TemplateEntry } from "@/types/templates"
import CreateTemplateForm from "./create-template-form"
import CreatePrototyeForm from "./create-prototype-form"

type CreateMenuProps = {
  templates: TemplateEntry[]
}

export default function CreateMenuTabs({ templates }: CreateMenuProps) {
  return (
    <Tabs>
      <div className="w-full justify-center border-b-[0.5px] border-border pt-1">
        <TabsList variant="line">
          <TabsTrigger value="prototype" className="ml-4">
            Prototype
          </TabsTrigger>
          <TabsTrigger value="template">Template</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="prototype">
        <CreatePrototyeForm templates={templates} />
      </TabsContent>
      <TabsContent value="template">
        <CreateTemplateForm />
      </TabsContent>
    </Tabs>
  )
}
