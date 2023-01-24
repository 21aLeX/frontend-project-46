import { genDiff } from "../src/index.js";

const result =
  "{\n\
 - follow: false\n\
   host: hexlet.io\n\
 - proxy: 123.234.53.22\n\
 - timeout: 50\n\
 + timeout: 20\n\
 + verbose: true\n\
}";
test("reverse", () => {
  expect(genDiff("file1.json", "file2.json")).toEqual(result);
  // expect(genDiff()).toEqual("Error, these are not json files");
});
