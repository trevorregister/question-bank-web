import { test, expect } from "../../../e2e"
import builder from "../../../db/builder"
import { faker } from "@faker-js/faker"
import BankPage from "../../banks/e2e/BankPage"

test("teacher can create new question", async ({ page, seed, login }) => {
  const teacher = builder.user.teacher()
  const bank = builder.bank({ owner: teacher._id })
  await seed(builder.data)

  const bankPage = new BankPage(page)
  const variable = faker.lorem.word()
  const prompt = faker.lorem
    .sentence()
    .concat(` {{${variable}}} {{${faker.lorem.word()}}}`)
  const pointValue = faker.number.int()

  await login(teacher.email, "asdf")
  await expect(page.getByText(bank.name)).toBeVisible()
  await page.goto(`/banks/${bank._id}`)
  await bankPage.createQuestionButton.click()
  const pendingQuestion = bankPage.getQuestion("Pending question")
  await pendingQuestion.locator.click()
  await pendingQuestion.editor.fill(prompt)
  await pendingQuestion.pointValue.fill(pointValue.toString())
  //await pendingQuestion.variableButton.click()
  await pendingQuestion.saveButton.click()
  await expect(page.getByText("New question created")).toBeVisible()
  await expect(bankPage.getQuestion(prompt).locator).toBeVisible()
})
