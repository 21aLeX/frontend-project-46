import { readFileSync } from 'fs';
//а то что ана из пакета импортируется? Название лучше все равно менять?
import * as getPatch from 'path';
import parse from './parse.js';
import formatters from './formatters/index.js';
import getDifference from './getDifference.js';

const getContent = (path) => readFileSync(path, 'utf8');
const getPath = (route) => getPatch.resolve(process.cwd(), '__fixtures__', route);

export default (route1, route2, nameFormatter = 'stylish') => {
  const extname1 = getPatch.extname(route1);
  const extname2 = getPatch.extname(route2);
  const path1 = getPath(route1);
  const path2 = getPath(route2);
  const data1 = parse(getContent(path1), extname1);
  const data2 = parse(getContent(path2), extname2);
  return formatters(getDifference(data1, data2), nameFormatter);
};