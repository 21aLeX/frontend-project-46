import _ from 'lodash';
const getDifference = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const result = keys.reduce((acc, key) => {
    if (!_.has(obj1, key)) {
      return { ...acc, [key]: { type: 'added', value: obj2[key] } };
    }
    if (!_.has(obj2, key)) {
      return { ...acc, [key]: { type: 'deleted', value: obj1[key] } };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return {
        ...acc, [key]:
          { type: 'nested', children: getDifference(obj1[key], obj2[key]) },
      };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return { ...acc, [key]: { type: 'changed', value1: obj1[key], value2: obj2[key] } };
    }
    return { ...acc, [key]: { type: 'unchanged', value: obj1[key] } };
  }, {});
  //почему нужно получить именно массив с объектами разной вложенности?
  // почему для этого не подойдет обьект?
  return result;
};
export default getDifference;
