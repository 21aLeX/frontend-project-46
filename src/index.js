import { readFileSync } from 'fs';
import path from 'path';
import parse from './parse.js';
import getFormatter from './formatters/index.js';
import getDifference from './getDifference.js';

const getContent = (route) => readFileSync(route, 'utf8');
const getPath = (route) => path.resolve(process.cwd(), route);

export default (route1, route2, nameFormatter = 'stylish') => {
  const extname1 = path.extname(route1).slice(1);
  const extname2 = path.extname(route2).slice(1);
  const newRoute1 = getPath(route1);
  const newRoute2 = getPath(route2);
  const data1 = parse(getContent(newRoute1), extname1);
  const data2 = parse(getContent(newRoute2), extname2);
  return getFormatter(getDifference(data1, data2), nameFormatter);
};
