import { luaGenerator, Order } from 'blockly/lua';

export default () => {
  luaGenerator.forBlock['draw_card'] = function (block, generator) {
    const target = generator.valueToCode(block, 'TARGET', Order.ATOMIC) || 'nil';

    if (target == 'nil') {
      throw new Error("生成失败！必须指定一个目标。");
    }

    const amount = generator.valueToCode(block, 'AMOUNT', Order.ATOMIC) || 1;

    let code = `${target}:drawCards(${amount}, _skill_val.name)\n`;
    return code;
  };
  luaGenerator.forBlock['throw_card'] = function (block, generator) {
    const target = generator.valueToCode(block, 'TARGET', Order.ATOMIC) || 'nil';

    if (target == 'nil') {
      throw new Error("生成失败！必须指定一名有牌的角色。");
    }
    const cards = generator.valueToCode(block, 'CARDS', Order.ATOMIC) || 'nil';

    if (cards == 'nil') {
      throw new Error("生成失败！必须指定要弃置的卡牌数组。");
    }

    let code = `room:throwCard(${cards}, _skill_val.name, ${target}`;

    // 因为是可选input 需要写判断
    if (block.getInput('THROWER')) {
      const thrower = generator.valueToCode(block, 'THROWER', Order.ATOMIC) || 'nil';
      if (thrower === 'nil') {
        code += `, ${thrower}`;
      }
    }

    code += `)\n`;
    return code;
  };
  luaGenerator.forBlock['recast_card'] = function (block, generator) {
    const target = generator.valueToCode(block, 'TARGET', Order.ATOMIC) || 'nil';

    if (target == 'nil') {
      throw new Error("生成失败！必须指定一名有牌的角色。");
    }
    const cards = generator.valueToCode(block, 'CARDS', Order.ATOMIC) || 'nil';

    if (cards == 'nil') {
      throw new Error("生成失败！必须指定要弃置的卡牌数组。");
    }

    let code = `room:recastCard(${cards}, ${target}, _skill_val.name)\n`;
    return code;
  };
};
