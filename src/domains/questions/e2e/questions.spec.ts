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

test("teacher can preview question", async ({ page, seed, context, login }) => {
  const teacher = builder.user.teacher()
  const question = builder.question({ owner: teacher._id })
  const bank = builder.bank({ owner: teacher._id, questions: [question._id] })
  await seed(builder.data)

  const bankPage = new BankPage(page)
  await login(teacher.email, "asdf")
  await page.goto(`/banks/${bank._id}`)
  const existingQuestion = bankPage.getQuestion(question.prompt)
  await existingQuestion.locator.getByRole("button").click()
  const previewTabPromise = context.waitForEvent("page")
  await existingQuestion.previewButton.click()
  const previewTab = await previewTabPromise

  await previewTab.waitForLoadState()
  await expect(previewTab.getByText(question.prompt)).toBeVisible()
})

test("teacher can edit existing question", async ({ page, seed, login }) => {
  const teacher = builder.user.teacher()
  const existingVariable = builder.question.variable()
  const existingCondition = builder.question.condition()
  const question = builder.question({
    owner: teacher._id,
    variables: [existingVariable],
    conditions: [existingCondition],
  })
  const bank = builder.bank({ owner: teacher._id, questions: [question._id] })
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
  await page.goto(`/banks/${bank._id}`)

  const existingQuestion = bankPage.getQuestion(question.prompt)
  await existingQuestion.locator.getByRole("button").click()
  await existingQuestion.editor.fill(prompt)
  await existingQuestion.pointValue.fill(pointValue)
  await existingQuestion.variableButton.click()

  await existingQuestion.conditionButton.click()
  const condition = existingQuestion.conditionsTable.rowByRowNumber(2)
  await condition.expression.fill(expression)
  await condition.feedback.fill(feedback)
  await condition.isCorrect.check()

  const pendingVar = existingQuestion.variablesTable.row(variable)
  await pendingVar.min.fill(min)
  await pendingVar.max.fill(max)
  await pendingVar.step.fill(step)
  await existingQuestion.saveButton.click()

  const updatedQuestion = bankPage.getQuestion(prompt)

  await expect(page.getByText("Question saved")).toBeVisible()
  await expect(updatedQuestion.locator.getByText(prompt)).toBeVisible()
  await expect(
    updatedQuestion.locator.getByRole("spinbutton", { name: "Point Value" }),
  ).toHaveValue(pointValue)
  await expect(
    updatedQuestion.variablesTable.locator.getByRole("cell", {
      name: variable,
    }),
  ).toBeVisible()
  await expect(
    updatedQuestion.conditionsTable.locator.getByRole("cell", {
      name: expression,
    }),
  ).toBeVisible()
  await expect(
    updatedQuestion.conditionsTable.locator.getByRole("cell", {
      name: feedback,
    }),
  ).toBeVisible()
  await expect(
    updatedQuestion.variablesTable.locator.getByRole("cell", {
      name: existingVariable.label,
    }),
  ).toBeVisible()
  await expect(
    updatedQuestion.conditionsTable.locator.getByRole("cell", {
      name: existingCondition.expression,
    }),
  ).toBeVisible()
  await expect(
    updatedQuestion.conditionsTable.locator.getByRole("cell", {
      name: existingCondition.feedback,
    }),
  ).toBeVisible()
})

test("teacher can delete question", async ({ page, seed, login }) => {
  const teacher = builder.user.teacher()
  const question = builder.question({ owner: teacher._id })
  const bank = builder.bank({ owner: teacher._id, questions: [question._id] })
  await seed(builder.data)

  const bankPage = new BankPage(page)

  await login(teacher.email, "asdf")
  await page.goto(`/banks/${bank._id}`)
  const existingQuestion = bankPage.getQuestion(question.prompt)
  await existingQuestion.locator.getByRole("button").click()
  await existingQuestion.deleteButton.click()
  await expect(
    page.getByRole("heading", { name: "Are you sure?" }),
  ).toBeVisible()

  await page.getByRole("button", { name: "Ok" }).click()
  await expect(page.getByText("Question deleted")).toBeVisible()
  await expect(existingQuestion.locator).toBeHidden()
})

test("teacher can delete variable", async ({ page, seed, login }) => {
  const teacher = builder.user.teacher()
  const existingVariable = builder.question.variable()
  const question = builder.question({
    owner: teacher._id,
    variables: [existingVariable],
  })
  const bank = builder.bank({ owner: teacher._id, questions: [question._id] })
  await seed(builder.data)

  const bankPage = new BankPage(page)

  await login(teacher.email, "asdf")
  await page.goto(`/banks/${bank._id}`)
  const existingQuestion = bankPage.getQuestion(question.prompt)
  await existingQuestion.locator.getByRole("button").click()
  await existingQuestion.variablesTable
    .row(existingVariable.label)
    .deleteIcon.click()
  await expect(
    existingQuestion.variablesTable.row(existingVariable.label).row,
  ).toBeHidden()
})

test("teacher can delete condition", async ({ page, seed, login }) => {
  const teacher = builder.user.teacher()
  const existingCondition = builder.question.condition()
  const question = builder.question({
    owner: teacher._id,
    conditions: [existingCondition],
  })
  const bank = builder.bank({ owner: teacher._id, questions: [question._id] })
  await seed(builder.data)

  const bankPage = new BankPage(page)

  await login(teacher.email, "asdf")
  await page.goto(`/banks/${bank._id}`)
  const existingQuestion = bankPage.getQuestion(question.prompt)
  await existingQuestion.locator.getByRole("button").click()
  await existingQuestion.conditionsTable.rowByRowNumber(1).deleteIcon.click()
  await expect(
    existingQuestion.conditionsTable.locator.getByText(
      existingCondition.expression,
    ),
  ).toBeHidden()
})
