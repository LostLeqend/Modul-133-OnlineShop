import {
    Application,
    Router
} from 'https://deno.land/x/oak@v6.3.1/mod.ts';
import {
    oakCors
} from "https://deno.land/x/cors/mod.ts";
import {    Product} from "../model/product.ts";

const app = new Application();
const router = new Router();

router.get('/', async function (context) {
    
    context.response.body = "JSON.stringify(tasks)";
    context.response.status = 200;
});

app.use(oakCors());
app.use(router.routes());

app.listen({
    port: 8000
});
console.log("listening to port: localhost:8000");