const [diagnostics_appJs, appJs] = await Deno.bundle(
    "./frontend/app.ts",
);
await Deno.writeTextFile("./frontend/build.app.js", appJs);

const [diagnostics_productDetailJs, productDetailJs] = await Deno.bundle(
    "./frontend/scripts/ProductDetail.ts"
);
await Deno.writeTextFile("./frontend/scripts/ProductDetail.js", productDetailJs);

const [diagnostics_checkoutJs, checkoutJs] = await Deno.bundle(
    "./frontend/scripts/Checkout.ts"
);
await Deno.writeTextFile("./frontend/scripts/Checkout.js", checkoutJs);