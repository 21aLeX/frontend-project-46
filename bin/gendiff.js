#!/usr/bin/env node

import { program } from "../node_modules/commander/esm.mjs";
import { genDiff } from "../src/index.js";

program
  .name("gendiff")
  .description("Compares two configurgation files and shows a difference.")
  .version("0.0.0")
  .helpOption("-h, --help", "output usage information")
  //это получается, что опцию по умолчанию не нужно ставить 3 и 4 аргументом?
  .option("-f, --format [type]", "output format (default: 'stylish')")
  .argument("<filepath1>")
  .argument("<filepath2>")
  .action(function (filepath1, filepath2) {
    console.log(genDiff(filepath1, filepath2, this.opts().format));
  });
program.parse();
