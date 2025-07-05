"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldLibRust = scaffoldLibRust;
const execa_1 = require("execa");
const chalk_1 = __importDefault(require("chalk"));
async function scaffoldLibRust({ projectName }) {
    await (0, execa_1.execa)("cargo", ["new", "--lib", projectName], { stdio: "inherit" });
    console.log(chalk_1.default.green(`✅ Rust library '${projectName}' scaffolded using Cargo.`));
}
