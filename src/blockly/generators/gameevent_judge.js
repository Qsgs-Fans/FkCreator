import { luaGenerator, Order } from 'blockly/lua';

export default () => {
  luaGenerator.forBlock['judge'] = function (block, generator) {
    const who = generator.valueToCode(block, 'WHO', Order.ATOMIC) || 'nil';
    // TODO if target is nil, error (must have target)
    const pattern = generator.valueToCode(block, 'PATTERN', Order.ATOMIC);
    const reason = generator.valueToCode(block, 'REASON', Order.ATOMIC);

    let code = `room:judge {\n  who = ${who},\n  pattern = ${pattern},\n  reason = ${reason},\n`;

    // 因为是可选input 需要写判断
    if (block.getInput('CARD')) {
      const card = generator.valueToCode(block, 'CARD', Order.ATOMIC) || 'nil';
      code += `  card = ${card},\n`;
    }
    if (block.getInput('SKIPDROP')) {
      const skipdrop = generator.valueToCode(block, 'SKIPDROP', Order.ATOMIC) || 'false';
      code += `  skipDrop = ${skipdrop},\n`;
    }

    code += '}\n';
    return code;
  };
  luaGenerator.forBlock['retrial'] = function (block, generator) {
    const card = generator.valueToCode(block, 'CARD', Order.ATOMIC) || 'nil';
    // TODO if target is nil, error (must have target)
    const player = generator.valueToCode(block, 'PLAYER', Order.ATOMIC) || 'nil';

    const data = generator.valueToCode(block, 'DATA', Order.ATOMIC) || 'nil';

    let code = `room:changeJudge{\n  card = ${card},\n  player = ${player},\n  data = ${data},\n`;

    // 因为是可选input 需要写判断
    if (block.getInput('SKILLNAME')) {
      const skillname = generator.valueToCode(block, 'SKILLNAME', Order.ATOMIC);
      code += `  skillName = ${skillname},\n`;
    }
    if (block.getInput('EXCANGE')) {
      const exchange = generator.valueToCode(block, 'EXCANGE', Order.ATOMIC) || 'false';
      code += `  exchange = ${exchange},\n`;
    }
    if (block.getInput('RESPONSE')) {
      const response = generator.valueToCode(block, 'RESPONSE', Order.ATOMIC) || 'false';
      code += `  response = ${response},\n`;
    }
    code += '}\n';

    return code;
  };
};
