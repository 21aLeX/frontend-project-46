import parsers from "./parsers.js";
import _ from "lodash";

//code climate пишет о техническом долге в 2 дня, ссылается на непонятный файл
//но думаю что это изза сортировки =(
const getDiff = (obj1, obj2) => {
  const keysAll = [...Object.keys(obj1), ...Object.keys(obj2)];
  const resultKey = [...new Set(keysAll)];
  const keys = _.sortBy(resultKey);
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
  const [obj1, obj2] = parsers(route1, route2);
  const result = `{\n${getDiff(obj1, obj2).join("\n")}\n}`;
  return result;
}
