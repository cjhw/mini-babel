import acorn from "acorn";
import { Parser as ParserType } from "acorn";

const syntaxPlugins = {
  literal: await import("./plugins/literal"),
  guangKeyword: await import("./plugins/guangKeyword"),
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

export { parse };
