import _ from 'lodash';

// отдельная функция для получения контента в нужном формате
const getContent = (content) => {
  if (_.isObject(content)) {
    return '[complex value]';
  }
  return _.isString(content) ? `'${content}'` : content;
};
const plain = (value) => {
  const iter = (currentValue, way) => {
    const path = Object.entries(currentValue).flatMap(([key, val]) => {
      const newWay = [...way, key];
      const tree = newWay.join('.');
      switch (val.type) {
        case 'added':
          return `Property '${tree}' was added with value: ${getContent(
            val.value,
          )}`;
        case 'deleted':
          return `Property '${tree}' was removed`;
        case 'changed':
          return `Property '${tree}' was updated. From ${getContent(
            val.value1,
          )} to ${getContent(val.value2)}`;
        case 'nested':
          return iter(val.children, newWay);
        default:
          return [];
      }
    });
    return _.compact(_.uniq(path)).join('\n');
  };
  return iter(value, []);
};

export default plain;
