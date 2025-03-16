import { Locator, Page } from "@playwright/test"

export default class BanksPage {
  readonly createBankButton: Locator
  constructor(readonly page: Page) {
    this.createBankButton = this.page.getByRole("button", {
      name: "Create New Bank",
    })
  }
  getBank(bankName: string) {
    const card = this.page.getByLabel(bankName)
    const viewButton = card.getByRole("button", { name: "View" })
    const deleteButton = card.getByRole("button", { name: "Delete" })
    return {
      card,
      viewButton,
      deleteButton,
    }
  }
}
