import path from "path";
import yaml from "js-yaml";
import { readFileSync } from "node:fs";

const getContent = (route) => {
  const way = path.resolve(route);
  const fileContent = readFileSync(way, "utf8");
  return fileContent;
};
export default (...route) => {
  return route.map((item) => {
    const content = getContent(item);
    const exstension = path.extname(item);
      // console.log(yaml.load(content));
    switch (exstension) {
      //json, лучше перенести в дефолт?
      case ".json":
        return JSON.parse(content);
      case ".yml":
      case ".yaml":
        return yaml.load(content);
      // default:
    }
  });
};
