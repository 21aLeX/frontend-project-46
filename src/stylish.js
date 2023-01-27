import _ from "lodash";

const stylish = (value, replacer = " ", spacesCount = 4) => {
  const iter = (currentValue, depth) => {
    // альтернативный вариант: (typeof currentValue !== 'object' || currentValue === null)
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = depth * spacesCount;
    let currentIndentNormal = replacer.repeat(indentSize);
    let currentIndentMin = replacer.repeat(indentSize - 2);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object.entries(currentValue).map(
      ([key, val]) =>
        `${
          key.startsWith("-") || key.startsWith("+")
            ? currentIndentMin
            : currentIndentNormal
        }${key}: ${iter(val, depth + 1)}`
    );

    return ["{", ...lines, `${bracketIndent}}`].join("\n");
  };

  return iter(value, 1);
};

export default stylish;
