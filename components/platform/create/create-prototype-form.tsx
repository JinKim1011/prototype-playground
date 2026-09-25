"use client"

import { useActionState, useEffect } from "react"
import {
  createPrototypeAction,
  type CreatePrototypeState,
} from "@/app/actions/prototype"
import { toast } from "@/components/platform/ui/toaster"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  FieldError,
} from "@/components/platform/ui/field"
import { Input } from "@/components/platform/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/platform/ui/select"
import { Button } from "@/components/platform/ui/button"
import { Textarea } from "@/components/platform/ui/textarea"
import { TemplateEntry } from "@/types/templates"

const initialState: CreatePrototypeState = {
  status: "idle",
}

type CreatePrototyeFormProps = {
  templates: TemplateEntry[]
}

export default function CreatePrototyeForm({
  templates,
}: CreatePrototyeFormProps) {
  const [state, formAction, pending] = useActionState(
    createPrototypeAction,
    initialState
  )

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message)
    }
  }, [state.status, state.message])

  const templateItems = templates.map((tempalte) => ({
    value: tempalte.id,
    label: tempalte.title,
  }))

  return (
    <div className="w-full p-4">
      <form action={formAction}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Details</FieldLegend>
            <Field>
              <Input id="title" name="title" placeholder="Title" required />
              <FieldDescription>
                Only letters and numbers, no special characters
              </FieldDescription>
            </Field>

            <Field>
              <Textarea
                id="description"
                name="description"
                placeholder="Description (optional)"
              />
            </Field>
          </FieldSet>

          <FieldSet>
            <FieldLegend>Owner</FieldLegend>
            <Field>
              <Input
                id="owner"
                name="owner"
                placeholder="Enter owner"
                required
              />
            </Field>
          </FieldSet>

          <FieldSet>
            <FieldLegend>Template</FieldLegend>
            <Field>
              <Select
                items={templateItems}
                name="fromTemplateId"
                defaultValue={templateItems[0]?.value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select template</SelectLabel>
                    {templateItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit" disabled={pending}>
              Create Prototype
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
