import parse from "./parse.js";
import _ from "lodash";
import formatters from "./formatters/index.js";

//code climate пишет о техническом долге в 2 дня, ссылается на непонятный файл
//но думаю что это изза сортировки =(
//нужно ли выносить функцию вычисления оличия в отдельный модуль?
// Хотя в первых заданиях сказано чтоб много файлов не плодили.
const getDiff = (obj1, obj2) => {
  const iter = (value1Iter, value2Iter) => {
    const keysAll = [...Object.keys(value1Iter), ...Object.keys(value2Iter)];
    const resultKey = [...new Set(keysAll)];
    const keys = _.sortBy(resultKey);
    return keys.reduce((acc, key) => {
      const value1 = value1Iter[key];
      const value2 = value2Iter[key];
      if (
        _.isObject(value1) &&
        _.isObject(value2) &&
        value1 !== null &&
        value2 !== null
      ) {
        return { ...acc, [key]: iter(value1, value2) };
      }
      if (value1 === value2) {
        return { ...acc, [key]: value1 };
      }
      const newKey1 = `- ${key}`;
      const newKey2 = `+ ${key}`;
      if (value1 === undefined) {
        return {
          ...acc,
          [newKey2]:
            !_.isObject(value2) || value2 === null
              ? value2
              : _.cloneDeep(value2),
        };
      }
      if (value2 === undefined) {
        return {
          ...acc,
          [newKey1]:
            !_.isObject(value1) || value1 === null
              ? value1
              : _.cloneDeep(value1),
        };
      }
      return {
        ...acc,
        [newKey1]:
          !_.isObject(value1) || value1 === null ? value1 : _.cloneDeep(value1),
        [newKey2]:
          !_.isObject(value2) || value2 === null ? value2 : _.cloneDeep(value2),
      };
    }, {});
  };
  return iter(obj1, obj2, 1);
};

export function genDiff(route1, route2, nameFormatter) {
  const [obj1, obj2] = parse(route1, route2);
  const data = getDiff(obj1, obj2);
  return formatters(data, nameFormatter);
}
