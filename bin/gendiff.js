#!/usr/bin/env node

import { program } from '../node_modules/commander/esm.mjs';
program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.0');
program
    .helpOption('-h, --help', 'output usage information')
    .option('-f, --format <type>', 'output format')
    .argument('filepath1')
    .argument('filepath2');

program.parse();


