import { createApp } from "vue";
import App from "./App.vue";

async function run() {
	const app = createApp(App)
	app.mount("#app");
}

run().catch(error => {
	console.log("Error caught in main.ts", error)
})
