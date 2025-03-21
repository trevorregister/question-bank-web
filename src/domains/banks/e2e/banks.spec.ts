import { test, expect } from "../../../e2e"
import builder from "../../../db/builder"
import BanksPage from "./BanksPage"
import { faker } from "@faker-js/faker"

test("teacher can create new bank", async ({ page, seed, login }) => {
  const teacher = builder.user.teacher()
  const bankProps = {
    name: faker.lorem.word(),
    description: faker.lorem.sentence(),
  }
  await seed(builder.data)

  const banksPage = new BanksPage(page)
  const modal = page.getByRole("dialog")

  await login(teacher.email)
  await banksPage.createBankButton.click()
  await modal.getByLabel("Name").fill(bankProps.name)
  await modal.getByLabel("Description").fill(bankProps.description)
  await modal.getByRole("button", { name: "Save" }).click()
  await expect(page.getByText("Bank created")).toBeVisible()
  await expect(page.getByText(bankProps.name)).toBeVisible()
  await expect(page.getByText(bankProps.description)).toBeVisible()
})

test("teacher can delete existing bank", async ({ page, seed, login }) => {
  const teacher = builder.user.teacher()
  const bank = builder.bank({ owner: teacher._id })
  await seed(builder.data)

  const banksPage = new BanksPage(page)

  await login(teacher.email, "asdf")
  await expect(page.getByLabel(bank.name)).toBeVisible()

  const bankCard = banksPage.getBank(bank.name)
  await bankCard.deleteButton.click()
  await page.getByRole("button", { name: "Ok" }).click()
  await expect(page.getByLabel(bank.name)).toBeHidden()
})

test("teacher can view existing bank", async ({ page, seed, login }) => {
  const teacher = builder.user.teacher()
  const bank = builder.bank({ owner: teacher._id })
  await seed(builder.data)

  const banksPage = new BanksPage(page)

  await login(teacher.email, "asdf")
  await expect(page.getByLabel(bank.name)).toBeVisible()

  const bankCard = banksPage.getBank(bank.name)
  await bankCard.viewButton.click()
  await expect(
    page.getByRole("button", { name: "Create New Question" }),
  ).toBeVisible()
})
