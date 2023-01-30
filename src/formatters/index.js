import plain from "./plain.js";
import stylish from "./stylish.js";

const formatters = { plain: plain, stylish: stylish };
export default (nameFormatter) => {
  if (nameFormatter === undefined || formatters.hasOwnProperty(nameFormatter)) {
    return formatters[nameFormatter] ?? stylish;
  }
  throw new Error(`Unknown formatter '${nameFormatter}'.`);
};
