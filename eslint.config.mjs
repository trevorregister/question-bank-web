import { defineConfig } from 'eslint/config'
import eslintPluginVue from 'eslint-plugin-vue'
import typescriptEslint from 'typescript-eslint'
import eslint from '@eslint/js'

export default typescriptEslint.config([
    {
        extends: [
            eslint.configs.recommended,
            ...typescriptEslint.configs.recommended,
            ...eslintPluginVue.configs['flat/recommended'

            ]
        ],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            //globals: globals.browser,
            parserOptions: {
              parser: typescriptEslint.parser,
            },
          },
        files: ["src/**/*.{ts.vue}"]
    }
])