import { readFileSync } from 'fs';
//а то что ана из пакета импортируется? Название лучше все равно менять?
import * as getPatch from 'path';
import parse from './parse.js';
import formatters from './formatters/index.js';
import getDifference from './getDifference.js';

const getContent = (route) => {
  const way = getPatch.resolve(process.cwd(), '__fixtures__', route);
  const fileContent = readFileSync(way, 'utf8');
  return fileContent;
};
export default (route1, route2, nameFormatter) => {
  const obj = [
    [getContent(route1), getPatch.extname(route1)],
    [getContent(route2), getPatch.extname(route2)],
  ];
  const [tree1, tree2] = parse(obj);
  const data = getDifference(tree1, tree2);
  return formatters(data, nameFormatter);
};
