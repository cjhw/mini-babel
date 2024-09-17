import * as acorn from "acorn";

const syntaxPlugins = {
  literal: await import("./plugins/literal.js"),
  guangKeyword: await import("./plugins/guangKeyword.js"),
};

const defaultOptions = {
  plugins: [],
};

function parse(code, options) {
  const resolvedOptions = Object.assign({}, defaultOptions, options);
  const newParser = resolvedOptions.plugins.reduce((Parser, pluginName) => {
    Parser.parse;
    let plugin = syntaxPlugins[pluginName];
    return plugin ? Parser.extend(plugin) : Parser;
  }, acorn.Parser);
  return newParser.parse(code, {
    locations: true,
  });
}

export default parse;
