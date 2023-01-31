import parse from "./parse.js";
import _ from "lodash";
import formatters from "./formatters/index.js";

//code climate пишет о техническом долге в 2 дня, ссылается на непонятный файл
//но думаю что это изза сортировки =(
//нужно ли выносить функцию вычисления оличия в отдельный модуль?
// Хотя в первых заданиях сказано чтоб много файлов не плодили.
const getDiff = (tree1, tree2) => {
  const iter = (obj1, obj2) => {
    const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
    return keys.reduce((acc, key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];
      const newValue1 = {
        [`- ${key}`]: !_.isObject(value1) ? value1 : _.cloneDeep(value1),
      };
      const newValue2 = {
        [`+ ${key}`]: !_.isObject(value2) ? value2 : _.cloneDeep(value2),
      };
      if (_.isObject(value1) && _.isObject(value2)) {
        return { ...acc, [key]: iter(value1, value2) };
      }
      if (value1 === value2) {
        return { ...acc, [key]: value1 };
      }
      if (value1 === undefined) {
        return { ...acc, ...newValue2 };
      }
      if (value2 === undefined) {
        return { ...acc, ...newValue1 };
      }
      return { ...acc, ...newValue1, ...newValue2 };
    }, {});
  };
  return iter(tree1, tree2, 1);
};

export function genDiff(route1, route2, nameFormatter) {
  const [tree1, tree2] = parse(route1, route2);
  const data = getDiff(tree1, tree2);
  return formatters(data, nameFormatter);
}
