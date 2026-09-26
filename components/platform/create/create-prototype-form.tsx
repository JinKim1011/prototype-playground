"use client"

import { useActionState, useEffect } from "react"
import {
  createPrototypeAction,
  type CreatePrototypeState,
} from "@/app/actions/prototype"
import { toast } from "@/components/platform/ui/toaster"
import {
  Field,
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
      <form action={formAction} noValidate>
        <FieldGroup>
          <FieldSet className="gap-2">
            <FieldLegend>Details</FieldLegend>
            <Field data-invalid={!!state.errors?.title}>
              <Input
                id="title"
                name="title"
                placeholder="Title"
                required
                aria-invalid={!!state.errors?.title}
                aria-describedby={
                  state.errors?.title ? "title-error" : undefined
                }
              />
              <FieldError id="title-error">{state.errors?.title}</FieldError>
            </Field>

            <Field data-invalid={!!state.errors?.owner}>
              <Input
                id="owner"
                name="owner"
                placeholder="Enter owner"
                required
                aria-invalid={!!state.errors?.owner}
                aria-describedby={
                  state.errors?.owner ? "owner-error" : undefined
                }
              />
              <FieldError id="owner-error">{state.errors?.owner}</FieldError>
            </Field>

            <Field>
              <Textarea
                id="description"
                name="description"
                placeholder="Description (optional)"
              />
            </Field>
          </FieldSet>

          <FieldSet className="gap-2">
            <FieldLegend>Template</FieldLegend>

            <Field data-invalid={!!state.errors?.fromTemplateId}>
              <Select
                items={templateItems}
                name="fromTemplateId"
                defaultValue={templateItems[0]?.value}
                required
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
              <FieldError>{state.errors?.fromTemplateId}</FieldError>
            </Field>
          </FieldSet>

          <Field>
            <Button
              size="lg"
              type="submit"
              disabled={pending}
              className="mt-2 w-full"
            >
              Create Prototype
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
