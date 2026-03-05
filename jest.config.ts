/** @jest-config-loader ts-node */
/** @jest-config-loader-options {"transpileOnly": true} */

import {Config} from 'jest'
import {createDefaultEsmPreset, pathsToModuleNameMapper} from 'ts-jest'
import * as fs from "node:fs";
import path from "node:path";

const tsconfig = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "./tsconfig.json"), "utf-8")
);

const presetConfig = createDefaultEsmPreset({
    //...options
})

export default {
    ...presetConfig,
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,

    roots: ["<rootDir>"],
    modulePaths: [tsconfig.compilerOptions.baseUrl],

    moduleNameMapper: pathsToModuleNameMapper(
        tsconfig.compilerOptions.paths,
        {prefix: "<rootDir>/"}
    )
} satisfies Config;