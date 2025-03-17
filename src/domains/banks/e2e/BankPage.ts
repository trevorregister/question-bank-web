import { Locator, Page } from "@playwright/test"

export default class BankPage {
  readonly createQuestionButton: Locator
  constructor(readonly page: Page) {
    this.createQuestionButton = this.page.getByRole("button", {
      name: "Create New Question",
    })
  }

  getQuestion(prompt: string) {
    const locator = this.page.getByLabel(prompt)
    const editor = locator
      .getByTestId("prompt-editor")
      .locator(".q-editor__content")
    const saveButton = locator.getByRole("button", { name: "Save" })
    const deleteButton = locator.getByRole("button", { name: "Delete" })
    const pointValue = locator.getByLabel("Point Value")
    const variableButton = locator.getByRole("button", { name: "+var" })
    const variablesTable = locator.getByRole("table", { name: "variables" })
    const conditionsTable = locator.getByRole("table", { name: "conditions" })

    return {
      locator,
      editor,
      saveButton,
      deleteButton,
      pointValue,
      variableButton,
    }
  }
}
