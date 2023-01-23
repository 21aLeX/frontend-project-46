#!/usr/bin/env node

import { program } from "../node_modules/commander/esm.mjs";
import { genDiff } from "../index.js";

program
  .name("gendiff")
  .description("Compares two configurgation files and shows a difference.")
  .version("0.0.0")
  .argument("<filepath1>")
  .argument("<filepath2>")
  .action((filepath1, filepath2) => {
    try {
      console.log(genDiff(filepath1, filepath2));
    } catch (err) {
      console.log(err);
    }
  });
program
  .helpOption("-h, --help", "output usage information")
  .option("-f, --format <type>", "output format");

program.parse();
