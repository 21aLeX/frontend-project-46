import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import * as getPatch from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = getPatch.dirname(__filename);
const getFixture = (nameFile) => getPatch.join(__dirname, '..', '__fixtures__', nameFile);
const getCorrectResult = (file) => readFileSync(file, 'utf8').replace(/\r/g, '');

test.each([
  { f1: 'file1.json', f2: 'file2.yml', r: 'result.stylish.txt', },
  { f1: 'file1.json', f2: 'file2.yaml', form: 'plain', r: 'result.plain.txt', },
  { f1: 'file1.json', f2: 'file2.yml', form: 'json', r: 'result.json.txt', },
  { f1: 'file1.yml', f2: 'file2.yaml', r: 'result.stylish.txt', },
  { f1: 'file1.json', f2: 'file2.json', form: 'plain', r: 'result.plain.txt', },
  { f1: 'file1.yml', f2: 'file2.yml', form: 'json', r: 'result.json.txt', },
])('diff($f1, $f2)', ({ f1, f2, form, r }) => {
  expect(genDiff(getFixture(f1), getFixture(f2), form)).toBe(getCorrectResult(getFixture(r)));
});
test.failing.each([
  { f1: 'file1.json', f2: 'file2.ym', r: 'result.stylish.txt', },
  { f1: 'file1.json', f2: 'file2.yaml', form: 'jso', r: 'result.json.txt', },
])('failing diff($f1, $f2)', ({ f1, f2, form, r }) => {
  expect(genDiff(getFixture(f1), getFixture(f2), form)).toBe(getCorrectResult(getFixture(r)));
});
