import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixture = (nameFile) => path.join(__dirname, '..', '__fixtures__', nameFile);
const getCorrectResult = (file) => readFileSync(file, 'utf8').replace(/\r/g, '');
// избыточно ли делать отдельно тесты на json и yml?
// а так же на пустые "обьекты"?
// так же увидела что кто то вынес результаты для сравнения в файлы, и сделала так же
// только у меня возникли проблемы с возвратом каретки,
// поэтому пришлось еще в getCorrectResult добавить реплейс
test('default stylish && get path', () => {
  const result = getCorrectResult(getFixture('result.stylish.txt'));
  expect(genDiff('file1.json', getFixture('file2.yml'))).toEqual(result);
});
test('plain', () => {
  const result2 = getCorrectResult(getFixture('result.plain.txt'));
  expect(genDiff('file1.json', 'file2.yaml', 'plain')).toEqual(result2);
});
test('json', () => {
  const result3 = getCorrectResult(getFixture('result.json.txt'));
  expect(genDiff('file1.json', 'file2.yaml', 'json')).toEqual(result3);
});
test('incorrect formatter', () => {
  expect(() => {
    genDiff('file1.json', 'file2.yaml', 'jso');
  }).toThrow();
});
test('incorrect extension', () => {
  expect(() => {
    genDiff('file1.json', 'file2.ya');
  }).toThrow();
});
