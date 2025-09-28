import { luaGenerator, Order } from 'blockly/lua';

export default () => {
  luaGenerator.forBlock['obtain_card'] = function (block, generator) {
    const target = generator.valueToCode(block, 'TARGET', Order.ATOMIC) || 'nil';

    if (target == 'nil') {
      throw new Error("生成失败！必须指定一名角色。");
    }
    const cards = generator.valueToCode(block, 'CARDS', Order.ATOMIC) || 'nil';

    if (cards == 'nil') {
      throw new Error("生成失败！必须指定要获得的卡牌数组。");
    }

    let code = `room:obtainCard(${target}, ${cards},\n  `;

    // 因为是可选input 需要写判断
    if (block.getInput('VISIBLE')) {
      const visible = generator.valueToCode(block, 'VISIBLE', Order.ATOMIC) || 'nil';
      code += `${visible}`;
    } else code += `nil`;
  
    if (block.getInput('REASON')) {
      const reason = generator.getVariableName(block.getFieldValue('REASON')) || 'ReasonJustMove';
      code += `, fk.${reason}`;
    } else code += `, fk.ReasonJustMove`;

    if (block.getInput('PROPOSER')) {
      const proposer = generator.valueToCode(block, 'PROPOSER', Order.ATOMIC) || 'nil';
      code += `, ${proposer}`;
    } else code += `, nil`;

    code += `, _skill_val.name)\n`;
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
      if (thrower !== 'nil') {
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
  luaGenerator.forBlock['draw_card'] = function (block, generator) {
    const target = generator.valueToCode(block, 'TARGET', Order.ATOMIC) || 'nil';

    if (target == 'nil') {
      throw new Error("生成失败！必须指定一个目标。");
    }

    const amount = generator.valueToCode(block, 'AMOUNT', Order.ATOMIC) || 1;

    let code = `${target}:drawCards(${amount}, _skill_val.name)\n`;
    return code;
  };
  luaGenerator.forBlock['show_card'] = function (block, generator) {
    const target = generator.valueToCode(block, 'TARGET', Order.ATOMIC) || 'nil';

    if (target == 'nil') {
      throw new Error("生成失败！必须指定一个目标。");
    }
    const cards = generator.valueToCode(block, 'CARDS', Order.ATOMIC) || 'nil';

    if (cards == 'nil') {
      throw new Error("生成失败！必须指定要展示的卡牌数组。");
    }

    let code = `${target}:showCards(${cards})\n`;
    return code;
  };
};
