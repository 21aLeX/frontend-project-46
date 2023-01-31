import { genDiff } from "../src/index.js";
import { fileURLToPath } from "url";
import path from "path";
import { readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixture = (nameFile) =>
  path.join(__dirname, "..", "__fixtures__", nameFile);
const getCorrectResult = (file) =>
  readFileSync(file, "utf8").replace(/\r/g, "");
//избыточно ли делать отдельно тесты на json и yml?
//а так же на пустые "обьекты"?
test("reverse", () => {
  const result = getCorrectResult(getFixture("result.stylish.txt"));
  expect(genDiff("file1.json", getFixture("file2.yaml"))).toEqual(result);
});
test("reverse", () => {
  const result2 = getCorrectResult(getFixture("result.plain.txt"));
  expect(genDiff("file1.json", "file2.yaml", "plain")).toEqual(result2);
});
test("reverse", () => {
  const result3 = getCorrectResult(getFixture("result.json.txt"));
  expect(genDiff("file1.json", "file2.yaml", "json")).toEqual(result3);
});
test("reverse", () => {
  expect(() => {
    genDiff("file1.json", "file2.yaml", "jso");
  }).toThrow();
});
