import { test, expect } from "../../../e2e"
import { faker } from "@faker-js/faker"

test("new user can create teacher account", async ({ page }) => {
  await page.goto("/create-account")
  await expect(page.getByText("Create Account")).toBeVisible()
  await page.getByLabel("First Name").fill(faker.person.firstName())
  await page.getByLabel("Last Name").fill(faker.person.lastName())
  await page.getByLabel("Email").fill(faker.internet.email())
  await page.getByLabel("Password").fill("asdf")
  await page.getByText("Teacher").click()
  await page.getByRole("button", { name: "Submit" }).click()
  await expect(page.getByText("Personal")).toBeVisible()
  await expect(
    page.getByRole("button", { name: "Create New Bank" }),
  ).toBeVisible()
})
