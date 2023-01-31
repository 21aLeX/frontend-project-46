import _ from "lodash";

// отдельная функция для получения контента в нужном формате
const getContent = (content) => {
  if (!_.isObject(content)) {
    if (typeof content === "string") {
      return `'${content}'`;
    }
    return content;
  }
  return "[complex value]";
};
// смотрим есть ли - + в названии ключа, в зависимости от наличия по -key +key возвращаем строчку
// если свойство не менялось, передаем значение и [путь] дальше
const plain = (value) => {
  const iter = (currentValue, way) => {
    if (!_.isObject(currentValue)) {
      return null;
    }
    const path = Object.entries(currentValue).reduce((acc, [key, val]) => {
      let result = "Property ";
      if (key.startsWith("-") || key.startsWith("+")) {
        const correctKey = key.slice(1);
        const newWay = [...way, correctKey.slice(1)];
        if (
          currentValue[`-${correctKey}`] !== undefined &&
          currentValue[`+${correctKey}`] !== undefined
        ) {
          result = `${result}'${newWay.join(
            "."
          )}' was updated. From ${getContent(
            currentValue[`-${correctKey}`]
          )} to ${getContent(currentValue[`+${correctKey}`])}`;
        } else if (key.startsWith("-")) {
          result = `${result}'${newWay.join(".")}' was removed`;
        } else if (key.startsWith("+")) {
          result = `${result}'${newWay.join(
            "."
          )}' was added with value: ${getContent(currentValue[key])}`;
        }
      } else {
        result = iter(val, [...way, key]);
      }
      return [...acc, result];
    }, []);
    return _.compact(_.uniq(path)).join("\n");
  };
  return iter(value, []);
};

export default plain;
