import ActivitiesView from "../domains/activities/views/ActivitiesView.vue"
import ActivityView from "../domains/activities/views/ActivityView.vue"
import JoinActivityPage from "../domains/activities/pages/JoinActivityPage.vue"
const activities = [
  {
    path: "/activities/:activityId",
    name: "activity-view",
    component: ActivityView,
    props: true,
  },
  {
    path: "/activities",
    name: "activities",
    component: ActivitiesView,
  },
  {
    path: "/activities/join",
    name: "activity-join",
    component: JoinActivityPage,
  },
]
export default activities
