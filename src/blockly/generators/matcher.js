import { luaGenerator, Order } from 'blockly/lua';

export default () => {
  luaGenerator.forBlock['make_matcher'] = function (block, generator) {
    let code = `Exppattern:new{\n`;
    const truename = generator.statementToCode(block, 'TRUENAME') || 'nil';
    code += `  trueName = ${truename},\n`;

    // 因为是可选input 需要写判断
    if (block.getInput('NUMBER')) {
      const number = generator.statementToCode(block, 'NUMBER') || 'nil';
      code += `  number = ${number},\n`;
    }
    if (block.getInput('SUIT')) {
      const suit = generator.statementToCode(block, 'SUIT') || 'nil';
      code += `  suit = ${suit},\n`;
    }
    if (block.getInput('AREA')) {
      const area = generator.statementToCode(block, 'AREA') || 'nil';
      code += `  area = ${area},\n`;
    }
    if (block.getInput('NAME')) {
      const name = generator.statementToCode(block, 'NAME') || 'nil';
      code += `  name = ${name},\n`;
    }
    if (block.getInput('TYPE')) {
      const type = generator.statementToCode(block, 'TYPE') || 'nil';
      code += `  type = ${type},\n`;
    }
    if (block.getInput('ID')) {
      const id = generator.statementToCode(block, 'ID') || 'nil';
      code += `  id = ${id},\n`;
    }
    code += `}`;

    return [`tostring(${code})`, Order.ATOMIC];
  };

  luaGenerator.forBlock['matcher_array'] = function (block, generator) {
    const pro = generator.valueToCode(block, 'PRO', Order.CONCATENATION) || '{}';
    const con = generator.valueToCode(block, 'CON', Order.CONCATENATION) || 'nil';

    const functionName = generator.provideFunction_(
      'create_matcher_array',
      `
local function ${generator.FUNCTION_NAME_PLACEHOLDER_}(pro, con)
  local t = {}
    for _, item in ipairs(pro) do
      table.insert(t, item)
    end
  t.neg = con
  return t
end
`,
    )

    const code = functionName + '(' + pro + ', ' + con + ')';
    return code;
  };
};