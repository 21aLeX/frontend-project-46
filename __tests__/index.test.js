import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixture = (nameFile) => path.join(__dirname, '..', '__fixtures__', nameFile);
const getCorrectResult = (file) => readFileSync(file, 'utf8').replace(/\r/g, '');

test.each([
  { file1: 'file1.json', file2: 'file2.yml', result: 'result.stylish.txt' },
  {
    file1: 'file1.json', file2: 'file2.yaml', form: 'plain', result: 'result.plain.txt',
  },
  {
    file1: 'file1.json', file2: 'file2.yml', form: 'json', result: 'result.json.txt',
  },
  { file1: 'file1.yml', file2: 'file2.yaml', result: 'result.stylish.txt' },
  {
    file1: 'file1.json', file2: 'file2.json', form: 'plain', result: 'result.plain.txt',
  },
  {
    file1: 'file1.yml', file2: 'file2.yml', form: 'json', result: 'result.json.txt',
  },
])('diff($f1, $f2)', ({
  file1, file2, form, result,
}) => {
  expect(genDiff(getFixture(file1), getFixture(file2), form))
    .toBe(getCorrectResult(getFixture(result)));
});
test.each([
  { file1: 'file1.json', file2: 'file2.txt' },
  { file1: 'file1.json', file2: 'file2.yaml', form: 'jso' },
])('failing diff($f1, $f2)', ({ file1, file2, form }) => {
  expect(() => { genDiff(getFixture(file1), getFixture(file2), form); }).toThrow();
});
