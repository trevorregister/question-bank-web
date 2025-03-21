import { Locator, Page } from "@playwright/test"

export default class ActivitiesPage {
  readonly createActivityButton: Locator
  constructor(readonly page: Page) {
    this.createActivityButton = this.page.getByRole("button", {
      name: "Create New Activity",
    })
  }
  getActivity(activityName: string) {
    const card = this.page.getByLabel(activityName)
    const previewButton = card.getByRole("button", { name: "Preview" })
    const deleteButton = card.getByRole("button", { name: "Delete" })
    const editButton = card.getByRole("button", { name: "Edit" })
    return {
      card,
      previewButton,
      deleteButton,
      editButton,
    }
  }
}
