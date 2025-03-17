import { Locator, Page } from "@playwright/test"

export default class BankPage {
  readonly createQuestionButton: Locator
  constructor(readonly page: Page) {
    this.createQuestionButton = this.page.getByRole("button", {
      name: "Create New Question",
    })
  }

  getQuestion(prompt: string) {
    const regex = RegExp(prompt.slice(0, 15), "i")
    const locator = this.page.getByLabel(regex)
    const editor = locator
      .getByTestId("prompt-editor")
      .locator(".q-editor__content")
    const saveButton = locator.getByRole("button", { name: "Save" })
    const deleteButton = locator.getByRole("button", { name: "Delete" })
    const pointValue = locator.getByLabel("Point Value")
    const variableButton = locator.getByRole("button", { name: "+var" })
    const conditionButton = locator.getByRole("button", { name: "+cond" })
    const variablesTable = {
      locator: locator.getByRole("table", { name: "variables" }),
      row: (label: string) => {
        const row = locator
          .getByRole("table", { name: "variables" })
          .locator("tr")
          .filter({ hasText: RegExp(label) })
        const min = row.getByLabel("Min")
        const max = row.getByLabel("Max")
        const step = row.getByLabel("Step")
        return {
          row,
          min,
          max,
          step,
        }
      },
    }
    const conditionsTable = {
      locator: locator.getByRole("table", { name: "conditions" }),
      rowByExpression: (answerExpression: string) => {
        const row = locator
          .getByRole("table", { name: "conditions" })
          .locator("tr")
          .filter({ hasText: RegExp(answerExpression, "i") })
        const expression = row.getByRole("textbox", { name: "Expression" })
        const feedback = row
          .getByTestId("feedback-editor")
          .locator(".q-editor__content")
        const isCorrect = row.getByRole("checkbox")

        return {
          row,
          expression,
          feedback,
          isCorrect,
        }
      },
      rowByRowNumber: (rowNumber: number) => {
        const row = locator
          .getByRole("table", { name: "conditions" })
          .locator("tr")
          .nth(2 - rowNumber)
        const expression = row.getByRole("textbox", { name: "Expression" })
        const feedback = row
          .getByTestId("feedback-editor")
          .locator(".q-editor__content")
        const isCorrect = row.getByRole("checkbox")
        return {
          row,
          expression,
          feedback,
          isCorrect,
        }
      },
    }

    return {
      locator,
      editor,
      saveButton,
      deleteButton,
      pointValue,
      variableButton,
      variablesTable,
      conditionsTable,
      conditionButton,
    }
  }
}
