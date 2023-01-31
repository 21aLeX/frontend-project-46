import json from "./json.js";
import plain from "./plain.js";
import stylish from "./stylish.js";

const formatters = { plain: plain, stylish: stylish, json: json };
export default (data, nameFormatter) => {
  if (
    nameFormatter !== undefined &&
    !formatters.hasOwnProperty(nameFormatter)
  ) {
    throw new Error(`Unknown format - ${nameFormatter}!`);
  }
  return formatters[nameFormatter]
    ? formatters[nameFormatter](data)
    : stylish(data);
};
