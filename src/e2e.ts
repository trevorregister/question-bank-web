import { Page, test as base } from "@playwright/test"
import dotenv from "dotenv"
dotenv.config()

type E2EFixtures = {
  login(email: string, password: string, page?: Page): Promise<void>
  seed(data: any): Promise<void>
  logout(page?: Page): Promise<void>
}

export const test = base.extend<E2EFixtures>({
  login: async ({ page }, use) => {
    await use(async (email: string, password: string, _page: Page = page) => {
      await _page.request.post(
        "http://localhost:3000/api/users/login/email-password",
        {
          data: { email, password },
        },
      )
    })
  },
  seed: async ({ page }, use) => {
    await use(async (data: any, _page: Page = page) => {
      await _page.request.post("http://localhost:3000/api/test/seed", {
        data: data,
        headers: {
          Authorization: `Bearer ${process.env.VITE_SEED_TOKEN}`,
        },
      })
    })
  },
})

export { expect } from "@playwright/test"
