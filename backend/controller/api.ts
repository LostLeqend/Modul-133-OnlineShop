import {Router} from "https://deno.land/x/oak@v6.4.0/mod.ts";
import {Session} from "https://deno.land/x/session@1.1.0/mod.ts";
import {v4} from 'https://deno.land/std@0.82.0/uuid/mod.ts';
import {Product} from "../model/product.ts";
import {ShoppingCart} from "../model/shopping-cart.ts";

const session = new Session({framework: "oak"});
await session.init();
export const usableSession = session.use()(session);

const products: Product[] = [
    {
        "id": "001",
        "productName": "Nektarinen gelb",
        "specialOffer": 3.6,
        "normalPrice": 5.2,
        "imageName": "nektarinen.jpg",
        "description": "Herkunft: Spanien"
    },
    {
        "id": "002",
        "productName": "Rispentomaten",
        "specialOffer": 2.65,
        "normalPrice": 3.1,
        "imageName": "tomaten.jpg",
        "description": "Tomaten verfügen über einen hohen Gehalt an Vitamin C sowie Zucker und Mineralstoffen."
    },
    {
        "id": "003",
        "productName": "Kalbs-Bratwürste",
        "specialOffer": 8.25,
        "normalPrice": 16.5,
        "imageName": "kalbsbratwuerste.jpg",
        "description": "Terra Suisse Kalbs-Bratwurst 3x2 Stück"
    },
    {
        "id": "004",
        "productName": "Appenzeller Classic",
        "specialOffer": 2.7,
        "normalPrice": 3.45,
        "imageName": "appenzeller.jpg",
        "description": "Schweizer Halbhartkäse und  vollfett. aus Rohmilch"
    },
    {
        "id": "005",
        "productName": "Eier",
        "specialOffer": 4.5,
        "normalPrice": 5.4,
        "imageName": "eier.jpg",
        "description": "9 Schweizer Eier aus Frilandhaltung"
    },
    {
        "id": "006",
        "productName": "Krustenkranz",
        "specialOffer": 2,
        "normalPrice": 2.3,
        "imageName": "krustenkranz.jpg",
        "description": "Terra Suisse"
    },
    {
        "id": "007",
        "productName": "Magunm Almond",
        "specialOffer": 7.9,
        "normalPrice": 9.9,
        "imageName": "vanille_glace.jpg",
        "description": "Vanilleglace und Milchschokolade mit Mandeln"
    },
    {
        "id": "008",
        "productName": "Iced Green Tea",
        "specialOffer": 7.5,
        "normalPrice": 10.8,
        "imageName": "icedtea.jpg",
        "description": "AriZona Green Tea - Grünteegrtränk"
    },
    {
        "id": "009",
        "productName": "Senf",
        "specialOffer": 2.7,
        "normalPrice": 3.4,
        "imageName": "senf.jpg",
        "description": "Senf mild"
    },
    {
        "id": "010",
        "productName": "Olivenöl",
        "specialOffer": 14.35,
        "normalPrice": 17.95,
        "imageName": "olivenoel.jpg",
        "description": "Bertolli Olivenöl extra vergine originale"
    }
];
const carts: ShoppingCart[] = [];

const router = new Router();
router
    .get("/api/products", context => {
        context.response.body = products;
    })
    .get("/api/products/:id", async (context) => {
        context.response.body = getProduct(context.params.id!);
    })
    .get("/api/cart", async (context) => {
        const sessionId = await getSessionId(context);
        const cart = getCart(sessionId);

        let simplifiedCart: [Product, number][] = [];

        cart.productAmount.forEach((value: number, key: string) => {
            const product = getProduct(key);
            simplifiedCart.push([product, value]);
        });

        context.response.body = simplifiedCart;
    })
    .get("/api/cart/cost", async (context) => {
        const sessionId = await getSessionId(context);
        const cart = getCart(sessionId);

        let price = 0;
        cart.products.forEach(product => {
            price += product.specialOffer ?? product.normalPrice;
        });

        context.response.body = Math.round(price * 100) / 100;
    })
    .post("/api/cart/update", async (context) => {
        if (!context.request.hasBody) {
            context.response.status = 400;
            return;
        }

        const productId = JSON.parse(await context.request.body().value);
        const product = getProduct(productId);

        const sessionId = await getSessionId(context);
        const cart = getCart(sessionId);
        const productAmount = cart.productAmount.get(product.id);

        if (productAmount == undefined) {
            cart.productAmount.set(product.id, 1);
        } else {
            cart.productAmount.set(product.id, productAmount + 1);
        }
        cart.products.push(product);

        context.response.status = 200;
    })
    .delete("/api/cart/delete/:id", async (context) => {
        const sessionId = await getSessionId(context);
        const cart = getCart(sessionId);

        const product = getProduct(context.params.id!);
        const productAmount = cart.productAmount.get(product.id);

        cart.products.splice(cart.products.indexOf(product), 1);

        if (productAmount === 1) {
            cart.productAmount.delete(product.id);
        } else if (productAmount) {
            cart.productAmount.set(product.id, productAmount - 1);
        } else {
            context.response.status = 400;
        }

        context.response.status = 200;
    })
    .get("/api/cart/checkout", async (context) => {
        const sessionId = await getSessionId(context);
        const cart = getCart(sessionId);

        cart.products = [];
        cart.productAmount = new Map<string, number>();
    });

function getCart(sessionId: string): ShoppingCart {
    return carts.find(x => x.id == sessionId)!;
}

function getProduct(productId: string): Product {
    return products.find((product) => product.id == productId)!;
}

async function getSessionId(context: any): Promise<string> {
    let sessionId = await context.state.session.get(`sessionId`);

    if (!sessionId) {
        sessionId = v4.generate();
        await context.state.session.set(`sessionId`, sessionId);

        carts.push({id: sessionId, products: [], productAmount: new Map<string, number>()})
    }

    return sessionId;
}

export const api = router.routes();