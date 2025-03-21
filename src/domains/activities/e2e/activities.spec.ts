import { test, expect } from "../../../e2e"
import builder from "../../../db/builder"
//import { faker } from "@faker-js/faker"
import ActivitiesPage from "./ActivitiesPage"

test("teacher can preview an activity", async ({ page, seed, login }) => {
  const teacher = builder.user.teacher()
  const activity = builder.activity({ owner: teacher._id })
  await seed(builder.data)

  const activitiesPage = new ActivitiesPage(page)

  await login(teacher.email)
  await page.getByRole("tab", { name: "Activities" }).click()
  await expect(activitiesPage.createActivityButton).toBeVisible()
  const activityCard = activitiesPage.getActivity(activity.name)
  await activityCard.previewButton.click()
  await expect(
    page.getByText(`Section 1: ${activity.sections[0].name}`),
  ).toBeVisible()
})
