import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import "./assets/main.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// icônes Solid de font
import {
  faPlusCircle,
  faUser,
  faPlus,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

// icônes Regular de font
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

// Add icônes à la librairie
library.add(faPlusCircle, faUser, faPlus, faStar, farStar, faTrash);

const app = createApp(App);

// déclarer FontAwesome globalement
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
