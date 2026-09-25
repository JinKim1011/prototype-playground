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
      <TabsList>
        <TabsTrigger value="prototype">Prototype</TabsTrigger>
        <TabsTrigger value="template">Template</TabsTrigger>
        <TabsTrigger value="owner">Owner</TabsTrigger>
      </TabsList>
      <TabsContent value="prototype">
        <CreatePrototyeForm templates={templates} />
      </TabsContent>
      <TabsContent value="template">
        <CreateTemplateForm />
      </TabsContent>
    </Tabs>
  )
}
