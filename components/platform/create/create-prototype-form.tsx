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
import { OwnerEntry } from "@/types/owners"
import { OwnerCombobox } from "@/components/platform/create/owner/owner-combobox"

const initialState: CreatePrototypeState = {
  status: "idle",
}

type CreatePrototypeFormProps = {
  templates: TemplateEntry[]
  owners: OwnerEntry[]
}

export default function CreatePrototypeForm({
  templates,
  owners,
}: CreatePrototypeFormProps) {
  const [state, formAction, pending] = useActionState(
    createPrototypeAction,
    initialState
  )

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message)
    } else if (state.status === "error" && state.message) {
      toast.error(state.message)
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
          <FieldSet className="gap-1">
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

            <Field data-invalid={!!state.errors?.ownerId}>
              <OwnerCombobox
                owners={owners}
                invalid={!!state.errors?.ownerId}
                errorId="owner-error"
              />

              <FieldError id="owner-error">{state.errors?.ownerId}</FieldError>
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
              variant="secondary"
              disabled={pending}
              className="mt-1.5 w-full"
            >
              Create Prototype
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
