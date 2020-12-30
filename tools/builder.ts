const [diagnostics, emit] = await Deno.bundle(
    "./frontend/app.ts",
);

await Deno.writeTextFile("./frontend/build.app.js", emit);