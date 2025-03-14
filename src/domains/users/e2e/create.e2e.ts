import { test, expect } from "../../../e2e"

test("new user can create teacher account", async ({ page }) => {
  await page.goto("/create-account")
  await expect(page.getByText("Create Account")).toBeVisible()
  await page.getByLabel("First Name").fill("asdf")
  await page.getByLabel("Last Name").fill("asdf")
  await page.getByLabel("Email").fill("play33333wright23344@asdf.com")
  await page.getByLabel("Password").fill("asdf")
  await page.getByText("Teacher").click()
  await page.getByRole("button", { name: "Submit" }).click()
  await page.goto("/login")
  await expect(page.getByText("Login")).toBeVisible()
  await page.getByLabel("Email").fill("playwright23344@asdf.com")
  await page.getByLabel("Password").fill("asdf")
  await page.getByRole("button", { name: "Submit" }).click()
  await expect(
    page.getByRole("button", { name: "Create New Bank" }),
  ).toBeVisible()
})
