import { defineConfig } from 'tsup';

export default defineConfig({
    format: ['cjs', 'esm'],
    entry: ["src/index.ts"],
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
    clean: true,
    splitting: false,
    sourcemap: true,
    minify: true,
    target: 'es2020',
    outDir: 'lib'
});
