import { luaGenerator, Order } from 'blockly/lua';

export default () => {
  luaGenerator.forBlock['deal_damage'] = function (block, generator) {
    const target = generator.valueToCode(block, 'TARGET', Order.ATOMIC) || 'nil';
    // TODO if target is nil, error (must have target)
    const amount = generator.valueToCode(block, 'AMOUNT', Order.ATOMIC);
    let code = `room:damage {\n  to = ${target},\n  damage = ${amount},\n`;

    // 因为是可选input 需要写判断
    if (block.getInput('SOURCE')) {
      const source = generator.valueToCode(block, 'SOURCE', Order.ATOMIC) || 'nil';
      code += `  from = ${source},\n`;
    }
    if (block.getInput('DAMAGE_TYPE')) {
      const dmgtype = generator.getVariableName(block.getFieldValue('DAMAGE_TYPE')) || 'NormalDamage';
      // TODO Damage.Fire
      code += `  nature = fk.${dmgtype},\n`;
    }

    code += '}\n';
    return code;
  };
  luaGenerator.forBlock['lose_hp'] = function (block, generator) {
    const target = generator.valueToCode(block, 'TARGET', Order.ATOMIC) || 'nil';
    // TODO if target is nil, error (must have target)
    const amount = generator.valueToCode(block, 'AMOUNT', Order.ATOMIC) || 1;

    let code = `room:loseHp(${target}, ${amount})\n`;
    return code;
  };
  luaGenerator.forBlock['recover_hp'] = function (block, generator) {
    const target = generator.valueToCode(block, 'TARGET', Order.ATOMIC) || 'nil';
    // TODO if target is nil, error (must have target)
    const amount = generator.valueToCode(block, 'AMOUNT', Order.ATOMIC);
    let code = `room:recover {\n  who = ${target},\n  num = ${amount},\n`;

    // 因为是可选input 需要写判断
    if (block.getInput('SOURCE')) {
      const source = generator.valueToCode(block, 'SOURCE', Order.ATOMIC) || 'nil';
      code += `  recoverBy = ${source},\n`;
    }
    if (block.getInput('SOURCE_CARD')) {
      const source = generator.valueToCode(block, 'SOURCE_CARD', Order.ATOMIC) || 'nil';
      code += `  card = ${source},\n`;
    }

    code += '}\n';
    return code;
  };
  luaGenerator.forBlock['change_maxhp'] = function (block, generator) {
    const target = generator.valueToCode(block, 'TARGET', Order.ATOMIC) || 'nil';
    // TODO if target is nil, error (must have target)
    const amount = generator.valueToCode(block, 'AMOUNT', Order.ATOMIC) || 1;

    let code = `room:changeMaxHp(${target},${amount})\n`;
    return code;
  };
};
