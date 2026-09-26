"use client"

import { useActionState, useEffect } from "react"
import {
  Field,
  FieldGroup,
  FieldLegend,
  FieldError,
  FieldSet,
} from "@/components/platform/ui/field"
import { Input } from "@/components/platform/ui/input"
import { Textarea } from "@/components/platform/ui/textarea"
import { Button } from "@/components/platform/ui/button"
import { toast } from "@/components/platform/ui/toaster"
import {
  createTemplateAction,
  type CreateTemplateState,
} from "@/app/actions/template"

const initialState: CreateTemplateState = {
  status: "idle",
}

export default function CreateTemplateForm() {
  const [state, formAction, pending] = useActionState(
    createTemplateAction,
    initialState
  )

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message)
    }
  }, [state.status, state.message])

  return (
    <div className="w-full max-w-md p-4">
      <form action={formAction} noValidate>
        <FieldGroup>
          <FieldSet className="gap-2">
            <Field>
              <FieldLegend>Details</FieldLegend>
              <Input
                id="title"
                placeholder="Enter title"
                name="title"
                required
                aria-invalid={!!state.errors?.title}
                aria-describedby={
                  state.errors?.title ? "title-error" : undefined
                }
              />
              <FieldError id="title-error">{state.errors?.title}</FieldError>
            </Field>

            <Field>
              <Textarea
                id="description"
                name="description"
                placeholder="Description (optional)"
              />
            </Field>
          </FieldSet>

          <Field>
            <Button
              size="lg"
              type="submit"
              disabled={pending}
              className="mt-1.5 w-full"
            >
              Create Template
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
