import { Action } from "./actions"

export interface DialogFormData {
  // Base form data that all dialogs will extend
  content: any
}

export interface ActionDialogComponent<T extends Action, F extends DialogFormData> {
  action: T
  onSubmit: (formData: F) => void
}
