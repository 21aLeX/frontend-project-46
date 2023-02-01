import yaml from 'js-yaml';

export default (data) => data.map(([obj, exstension]) => {
  switch (exstension) {
    case '.json':
      return JSON.parse(obj);
    case '.yml':
    case '.yaml':
      return yaml.load(obj);
    default:
      throw new Error(`I don't know how to deal with files with extension ${exstension}`);
  }
});
