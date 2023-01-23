import { readFileSync } from "node:fs";
import path from "path";
import _ from "lodash";

const getDiff = (obj1, obj2) => {
  const keysAll = [...Object.keys(obj1), ...Object.keys(obj2)];
  const keys = _.sortBy([...new Set(keysAll)]);
  return keys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (value1 === value2) {
      return [...acc, `   ${key}: ${value1}`];
    }
    if (value1 === undefined) {
      return [...acc, ` + ${key}: ${value2}`];
    }
    if (value2 === undefined) {
      return [...acc, ` - ${key}: ${value1}`];
    }
    return [...acc, ` - ${key}: ${value1}`, ` + ${key}: ${value2}`];
  }, []);
};
export function genDiff(route1, route2) {
  const way1 = path.resolve(route1);
  const way2 = path.resolve(route2);
  let fileContent = readFileSync(way1, "utf8");
  const obj1 = JSON.parse(fileContent);
  let fileContent2 = readFileSync(way2, "utf8");
  const obj2 = JSON.parse(fileContent2);
  if (
    route1.split(".").pop() === "json" &&
    route2.split(".").pop() === "json"
  ) {
    const result = `{\n${getDiff(obj1, obj2).join("\n")}\n}`;
    return result;
  }
  return "Error, these are not json files";
}
