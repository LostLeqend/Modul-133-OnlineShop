import {Application} from "https://deno.land/x/oak@v6.4.0/mod.ts";
import {api, usableSession} from "./api.ts";
import {fileServer} from "./controller.ts";

const app = new Application();

app.use(usableSession);
app.use(api);
app.use(fileServer);

console.log("Server running on http://localhost:8000");
app.listen({port: 8000});