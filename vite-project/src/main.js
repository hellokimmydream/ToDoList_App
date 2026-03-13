import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "./assets/main.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPlusCircle,
  faUser,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faPlusCircle, faUser, faTrash, faPlus);

const app = createApp(App);

// declare le composant global
app.component("font-awesome-icon", FontAwesomeIcon);

// monte l'application
app.mount("#app");
