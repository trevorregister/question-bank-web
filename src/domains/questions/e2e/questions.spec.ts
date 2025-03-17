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
  const prompt = faker.lorem.sentence().concat(` {{${variable}}}`)
  const pointValue = faker.number.int({ min: 1, max: 100 }).toString()
  const min = faker.number.int({ min: 1, max: 10 }).toString()
  const max = faker.number.int({ min: 11, max: 20 }).toString()
  const step = faker.number.int({ min: 1, max: 10 }).toString()
  const expression = faker.lorem.word()
  const feedback = faker.lorem.sentence()

  await login(teacher.email, "asdf")
  await expect(page.getByText(bank.name)).toBeVisible()

  await page.goto(`/banks/${bank._id}`)
  await bankPage.createQuestionButton.click()
  await expect(bankPage.createQuestionButton).toBeDisabled()

  const pendingQuestion = bankPage.getQuestion("Pending question")
  await pendingQuestion.locator.click()
  await pendingQuestion.editor.fill(prompt)
  await pendingQuestion.pointValue.fill(pointValue)
  await pendingQuestion.variableButton.click()

  await pendingQuestion.conditionButton.click()
  const condition = pendingQuestion.conditionsTable.rowByRowNumber(1)
  await condition.expression.fill(expression)
  await condition.feedback.fill(feedback)
  await condition.isCorrect.check()

  const pendingVar = pendingQuestion.variablesTable.row(variable)
  await pendingVar.min.fill(min)
  await pendingVar.max.fill(max)
  await pendingVar.step.fill(step)
  await pendingQuestion.saveButton.click()

  await expect(page.getByText("New question created")).toBeVisible()
  await expect(bankPage.createQuestionButton).toBeEnabled()
})
