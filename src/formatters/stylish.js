import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;
const signs = {
  added: '+ ',
  deleted: '- ',
  unchanged: '  ',
};
const getIndent = (depth) =>
  replacer.repeat(depth * spacesCount - 2);
const stylish = (value) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return currentValue;
    }
    const lines = Object.entries(currentValue).map(([key, val]) => {
      const indent = getIndent(depth);
      switch (val.type) {
        case 'added':
        case 'deleted':
        case 'unchanged':
          return `${indent}${signs[val.type]}${key}: ${iter(
            val.value,
            depth + 1,
          )}`;
        case 'nested':
          return `${indent}  ${key}: ${iter(val.children, depth + 1)}`;
        case 'changed':
          return `${indent}- ${key}: ${iter(
            val.value1,
            depth + 1,
          )}\n${indent}+ ${key}: ${iter(val.value2, depth + 1)}`;
        default:
          return `${indent}  ${key}: ${iter(val, depth + 1)}`;
      }
    });

    return [
      '{',
      ...lines,
      `${replacer.repeat((depth - 1) * spacesCount)}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

export default stylish;
