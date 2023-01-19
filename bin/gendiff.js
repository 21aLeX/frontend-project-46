#!/usr/bin/env node

import { program } from '../node_modules/commander/esm.mjs';
program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.0');
program.parse();


