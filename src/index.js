import { readFileSync } from 'fs';
import path from 'path';
import parse from './parse.js';
import formatters from './formatters/index.js';
import getDifference from './getDifference.js';

const getContent = (route) => {
  const way = path.resolve(route);
  const fileContent = readFileSync(way, 'utf8');
  return fileContent;
};
// почему линтер не показывает ошибки, и не исправляет их?
export default (route1, route2, nameFormatter) => {
  const obj = [
    [getContent(route1), path.extname(route1)],
    [getContent(route2), path.extname(route2)],
  ];
  const [tree1, tree2] = parse(obj);
  const data = getDifference(tree1, tree2);
  return formatters(data, nameFormatter);
};
