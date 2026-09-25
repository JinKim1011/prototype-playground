"use client"

import { useActionState, useEffect } from "react"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
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
      <form action={formAction}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="">Title</FieldLabel>
            <Input id="title" placeholder="Enter title" name="title" required />
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

          <Field orientation="horizontal">
            <Button type="submit" disabled={pending}>
              Create template
            </Button>
            <FieldError>
              {state.status === "error" ? state.message : undefined}
            </FieldError>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
