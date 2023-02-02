import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';
// честно, увидела в других репозиториях что получают обьект с вложенным свойством type и детей
// как делали в заданиях по модулю (tree)
// я про это совсем забыла, поэтому сделала через + - добавление к ключам
// конечно тоже работало, но было немного неудобно их оттуды вырезать, проверять..
// поэтому переделала, предыдущее решение можно посмотреть в 2х предыдущих коммитах
const formatters = { plain, stylish, json };
export default (data, nameFormatter = 'stylish') => {
  return formatters[nameFormatter]
    ? formatters[nameFormatter](data)
    : new Error(`Unknown format - ${nameFormatter}!`)
};
