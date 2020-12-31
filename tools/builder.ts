const [diagnostics_appJs, appJs] = await Deno.bundle(
    "./frontend/app.ts",
);
await Deno.writeTextFile("./frontend/build.app.js", appJs);

const [diagnostics_shoppingCartJs, shoppingCartJs] = await Deno.bundle(
    "./frontend/scripts/ShoppingCart.ts"
);
await Deno.writeTextFile("./frontend/scripts/ShoppingCart.js", shoppingCartJs);