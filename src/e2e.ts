import { Page, test as base } from "@playwright/test"

type E2EFixtures = {
  login(email: string, password: string, page?: Page): Promise<void>
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
})

export { expect } from "@playwright/test"
