import { test, expect } from "../../../e2e"
import builder from "../../../db/builder"

test("existing user can login", async ({ page }) => {
  await page.goto("/login")
  await expect(page.getByText("Login")).toBeVisible()
  await page.getByLabel("Email").fill("teacher1@asdf.com")
  await page.getByLabel("Password").fill("asdf")
  await page.getByRole("button", { name: "Submit" }).click()
  await expect(
    page.getByRole("button", { name: "Create New Bank" }),
  ).toBeVisible()
})
