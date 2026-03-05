import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
    // Ignore les dossiers générés
    { ignores: ["dist/", "build/", "node_modules/"] },

    // On charge les recommandations standards
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.strict,

    {
        files: ["**/*.ts", "**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.node,
            }
        },
        rules: {
            // RÈGLES TYPESCRIPT
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { "argsIgnorePattern": "^_" } // ignore les variables comme _req ou _next pour Express
            ],
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-non-null-assertion": "warn",

            // RÈGLES DE QUALITÉ DE CODE
            "no-console": "off",
            "prefer-const": "error",
            "eqeqeq": "error",
        }
    }
);