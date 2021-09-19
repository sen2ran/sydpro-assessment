import { createApp } from "vue";

import router from "./router";
import App from "./App.vue";
import naive from "./naive";

const app = createApp(App);

app.use(router);
app.use(naive);

app.mount("#app");
