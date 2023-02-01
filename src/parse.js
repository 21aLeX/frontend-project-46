import path from "path";
import yaml from "js-yaml";
import { readFileSync } from "fs";

const getContent = (route) => {
  const way = path.resolve(route);
  const fileContent = readFileSync(way, "utf8");
  return fileContent;
};
export default (...route) =>
  route.map((item) => {
    const exstension = path.extname(item);
    switch (exstension) {
      // то что по дефолту ошибку пробрасывать, тоже не сама догадалась(
      case ".json":
        return JSON.parse(getContent(item));
      case ".yml":
      case ".yaml":
        return yaml.load(getContent(item));
      default:
        throw new Error(
          `I don't know how to deal with files with extension ${exstension}`
        );
    }
  });
