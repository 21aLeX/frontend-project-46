import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

const formatters = { plain, stylish, json };
export default (data, nameFormatter) => {
  if (formatters[nameFormatter]) {
    return formatters[nameFormatter](data);
  }
  throw new Error(`Unknown format - ${nameFormatter}!`);
};
