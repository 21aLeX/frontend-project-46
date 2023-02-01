import parse from "./parse.js";
import formatters from "./formatters/index.js";
import getDifference from "./getDifference.js";

// так же код коверэйдж говорит о техническом долге в два дня,
// указывая на сортировку (видимо из лодаш)
// и на то что функции длинее 25 строк, хотя строки выравнивает автоматом преттир
export default (route1, route2, nameFormatter) => {
  const [tree1, tree2] = parse(route1, route2);
  const data = getDifference(tree1, tree2);
  return formatters(data, nameFormatter);
};
