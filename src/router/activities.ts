import ActivitiesView from "../domains/activities/views/ActivitiesView.vue"
import ActivityView from "../domains/activities/views/ActivityView.vue"
const activities = [
  {
    path: "/activities/:activityId",
    name: "activity-view",
    component: ActivityView,
  },
  {
    path: "/activities",
    name: "activities",
    component: ActivitiesView,
  },
]
export default activities
