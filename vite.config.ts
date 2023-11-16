import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import md from 'vite-plugin-solid-markdown'

export default defineConfig({
    plugins: [
        md(),
        solid({
            extensions: ['.mdx'],
        }),
    ],
})
