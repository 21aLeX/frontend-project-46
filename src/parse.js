import yaml from 'js-yaml';

export default (obj, exstension) => {
  switch (exstension) {
    case '.json':
      return JSON.parse(obj);
    case '.yml':
    case '.yaml':
      return yaml.load(obj);
  }
};
