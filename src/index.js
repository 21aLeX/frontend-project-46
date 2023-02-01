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


// так же код коверэйдж говорит о техническом долге в два дня,
// указывая на сортировку (видимо из лодаш)
// и на то что функции длинее 25 строк, хотя строки выравнивает автоматом преттир
export default (route1, route2, nameFormatter) => {
  const obj = [[getContent(route1), path.extname(route1)], [getContent(route2), path.extname(route2)]];
  const [tree1, tree2] = parse(obj);
  const data = getDifference(tree1, tree2);
  return formatters(data, nameFormatter);
};
