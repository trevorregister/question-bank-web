import { test, expect } from "../../../e2e"
import builder from "../../../db/builder"

test("existing user can login", async ({ page, seed }) => {
  const teacher = builder.user.teacher()
  const bank = builder.bank({ owner: teacher._id })
  await seed(builder.data)
  await page.goto("/login")
  await expect(page.getByText("Login")).toBeVisible()
  await page.getByLabel("Email").fill(teacher.email)
  await page.getByLabel("Password").fill("asdf")
  await page.getByRole("button", { name: "Submit" }).click()
  await expect(
    page.getByRole("button", { name: "Create New Bank" }),
  ).toBeVisible()
  await expect(page.getByText(bank.name)).toBeVisible()
})
