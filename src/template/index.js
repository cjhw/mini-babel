import parser from "../parser/index.js";

function template(code) {
  return parser.parse(code, {
    plugins: ["literal"],
  });
}
template.expression = function (code) {
  const node = template(code).body[0].expression;
  node.loc = null;
  return node;
};

export default template;
