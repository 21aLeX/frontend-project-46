#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configurgation files and shows a difference.')
  .version('0.0.0')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', "output format (default: 'stylish')")
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => console.log(
    genDiff(filepath1, filepath2, program.opts().format),
  ))
  .parse();
