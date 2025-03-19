import BaseButton from "./BaseButton.vue"
import CardActions from "./CardActions.vue"
import CardBody from "./CardBody.vue"
import CardHeader from "./CardHeader.vue"
import CardSection from "./CardSection.vue"
import LoadingSpinner from "./LoadingSpinner.vue"
import { App } from "vue"

export default function registerGlobals(app: App) {
  app.component("CardBody", CardBody)
  app.component("CardActions", CardActions)
  app.component("CardHeader", CardHeader)
  app.component("CardSection", CardSection)
  app.component("BaseButton", BaseButton)
  app.component("LoadingSpinner", LoadingSpinner)
}
