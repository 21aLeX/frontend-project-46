import _ from "lodash";
//code climate пишет о техническом долге в 2 дня, ссылается на непонятный файл
//но думаю что это изза сортировки =(
//нужно ли выносить функцию вычисления оличия в отдельный модуль?
// Хотя в первых заданиях сказано чтоб много файлов не плодили.
const getDifference = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const result = keys.map((key) => {
    if (!_.has(obj1, key)) {
      return [key, { type: "added", value: obj2[key] }];
    }
    if (!_.has(obj2, key)) {
      return [key, { type: "deleted", value: obj1[key] }];
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return [
        key,
        { type: "nested", children: getDifference(obj1[key], obj2[key]) },
      ];
    }
    if (obj1[key] !== obj2[key]) {
      return [key, { type: "changed", value1: obj1[key], value2: obj2[key] }];
    }
    return [key, { type: "unchanged", value: obj1[key] }];
  });
  return _.fromPairs(result);
};
export default getDifference;
