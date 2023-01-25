import { genDiff } from "../src/index.js";
import { fileURLToPath } from "url";
import path from "path";

const result =
  "{\n\
 - follow: false\n\
   host: hexlet.io\n\
 - proxy: 123.234.53.22\n\
 - timeout: 50\n\
 + timeout: 20\n\
 + verbose: true\n\
}";
const result2 =
  "{\n\
 + host: hexlet.io\n\
 + timeout: 20\n\
 + verbose: true\n\
}";
const result3 =
  "{\n\
 - host: hexlet.io\n\
 - timeout: 20\n\
 - verbose: true\n\
}";
const result4 =
  "{\n\
\n\
}";
//избыточно ли делать отдельно тесты на json и yml?
//а так же на пустые "обьекты"?(как у меня реализованно)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const file1 = path.join(__dirname, "..", "__fixtures__", "test1.json");
test("reverse", () => {
  expect(genDiff("file1.json", "file2.json")).toEqual(result);
  expect(genDiff("file1.yml", "file2.yaml")).toEqual(result);
  expect(genDiff("file1.json", "file2.yaml")).toEqual(result);
  expect(genDiff(file1, "file2.json")).toEqual(result2);
  expect(genDiff("file2.json", file1)).toEqual(result3);
  expect(
    genDiff(path.join(__dirname, "..", "__fixtures__", "test2.json"), file1)
  ).toEqual(result4);
});
