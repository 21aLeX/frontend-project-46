import parse from "./parse.js";
import formatters from "./formatters/index.js";
import getDifference from "./getDifference.js";

export function genDiff(route1, route2, nameFormatter) {
  const [tree1, tree2] = parse(route1, route2);
  const data = getDifference(tree1, tree2);
  return formatters(data, nameFormatter);
}
