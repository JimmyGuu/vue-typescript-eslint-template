import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./routers";
import App from "./App.vue";

import "./styles/_reboot.scss";
import "./styles/_global.scss";

import { authInit } from "@/configs";

authInit();

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount("#app");
