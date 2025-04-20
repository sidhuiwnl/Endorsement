import { $ } from "bun";
import { mkdir } from "node:fs/promises";

(async () => {
    // Clean dist directory
    await $`rm -rf dist`;
    await mkdir("dist", { recursive: true });

    // Process Tailwind CSS
    await $`bunx tailwindcss -i ./src/styles/input.css -o ./dist/styles.css --minify`;

    // Build JS/TS
    await $`bun build ./src/index.ts --outdir ./dist --format esm --target browser --external react --external react-dom --external tailwindcss`;

    // Generate types
    await $`bun x tsc --emitDeclarationOnly --declaration --outDir dist`;

    console.log("Build completed successfully!");
})().catch((err) => {
    console.error("Build failed:", err);
    process.exit(1);
});