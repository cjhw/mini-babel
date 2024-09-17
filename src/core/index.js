import parser from "../parser";
import traverse from "../traverse";
import generate from "../generator";
import template from "../template";

function transformSync(code, options) {
  const ast = parser.parse(code, options.parserOpts);

  const pluginApi = {
    template,
  };
  const visitors = {};
  options.plugins &&
    options.plugins.forEach(([plugin, options]) => {
      const res = plugin(pluginApi, options);
      Object.assign(visitors, res.visitor);
    });
  options.presets &&
    options.presets.reverse().forEach(([preset, options]) => {
      const plugins = preset(pluginApi, options);
      plugins.forEach(([plugin, options]) => {
        const res = plugin(pluginApi, options);
        Object.assign(visitors, res.visitor);
      });
    });

  traverse(ast, visitors);
  return generate(ast, code, options.fileName);
}

export { transformSync };
