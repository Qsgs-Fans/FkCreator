import { luaGenerator, Order } from 'blockly/lua';

export default () => {
  luaGenerator.forBlock['get_general_by_name'] = function (block, generator) {
    const name = generator.valueToCode(block, 'NAME', Order.ATOMIC) || 'nil';

    if (name == 'nil') {
      throw new Error("生成失败！必须指定一个武将名。");
    }

    return [`Fk.generals[${name}]`, Order.ATOMIC];
  };
  luaGenerator.forBlock['general_property_read'] = function (block, generator) {
    const general = generator.valueToCode(block, 'GENERAL', Order.ATOMIC) || 'nil';
    const property = generator.getVariableName(block.getFieldValue('PROPERTY')) || 'nil';

    if (general == 'nil' || property == 'nil') {
      throw new Error("生成失败！必须指定一个武将和一个属性字段。");
    }

    return [`${general}.${property}`, Order.ATOMIC];
  };
  luaGenerator.forBlock['general_skill_list'] = function (block, generator) {
    const general = generator.valueToCode(block, 'GENERAL', Order.ATOMIC) || 'nil';
    const lord = generator.valueToCode(block, 'LORD', Order.ATOMIC) || '';

    if (general == 'nil') {
      throw new Error("生成失败！必须指定一个武将。");
    }

    return [`${general}:getSkillNameList(${lord})`, Order.ATOMIC];
  };
  luaGenerator.forBlock['draw_n_generals'] = function (block, generator) {
    const pos = generator.getVariableName(block.getFieldValue('POSITION')) || 'top';
    const number = generator.valueToCode(block, 'NUMBER', Order.ATOMIC) || 'nil';

    if (number == 'nil') {
      throw new Error("生成失败！必须指定抽取数量。");
    }

    return [`room:getNGenerals(${number}, "${pos}")`, Order.ATOMIC];
  };
  luaGenerator.forBlock['return_to_general_pile'] = function (block, generator) {
    const pos = generator.getVariableName(block.getFieldValue('POSITION')) || 'random';
    const arrays = generator.valueToCode(block, 'GENERALS', Order.ATOMIC) || 'nil';

    if (arrays == 'nil') {
      throw new Error("生成失败！必须指定武将名数组。");
    }

    return `room:returnToGeneralPile(${arrays}, "${pos}")\n`;
  };
};
