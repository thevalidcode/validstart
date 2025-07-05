"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLicense = generateLicense;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
async function generateLicense(projectPath, author = "Anonymous") {
    const year = new Date().getFullYear();
    const content = `MIT License

Copyright (c) ${year} ${author}

Permission is hereby granted, free of charge, to any person obtaining a copy
...`;
    await fs_extra_1.default.writeFile(path_1.default.join(projectPath, "LICENSE"), content);
}
