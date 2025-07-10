import { luaGenerator, Order } from 'blockly/lua';

export default () => {
  luaGenerator.forBlock['card_property_read'] = function (block, generator) {
    const card = generator.valueToCode(block, 'CARD', Order.ATOMIC) || 'nil';
    const property = generator.getVariableName(block.getFieldValue('PROPERTY')) || 'nil';

    if (card == 'nil' || property == 'nil') {
      throw new Error("生成失败！必须指定一张卡牌和一个属性字段。");
    }

    return [`${card}.${property}`, Order.ATOMIC];
  };

  luaGenerator.forBlock['card_property_func'] = function (block, generator) {
    const card = generator.valueToCode(block, 'CARD', Order.ATOMIC) || 'nil';
    const property = generator.getVariableName(block.getFieldValue('PROPERTY')) || 'nil';
    const value = block.getInput('VALUE') && generator.valueToCode(block, 'VALUE', Order.ATOMIC) || '';

    if (card == 'nil' || property == 'nil') {
      throw new Error("生成失败！必须指定一张卡牌和一个属性字段。");
    }

    return [`${card}:${property}(${value})`, Order.ATOMIC];
  };

  luaGenerator.forBlock['card_match_pattern'] = function (block, generator) {
    const card = generator.valueToCode(block, 'CARD', Order.ATOMIC) || 'nil';
    const pattern = generator.valueToCode(block, 'PATTERN', Order.ATOMIC) || 'nil';

    if (card == 'nil' || pattern == 'nil') {
      throw new Error("生成失败！必须指定一张卡牌和一个匹配器。");
    }

    return [`${card}:matchPattern(${pattern})`, Order.ATOMIC];
  };

  luaGenerator.forBlock['card_get_mark'] = function (block, generator) {
    const card = generator.valueToCode(block, 'CARD', Order.ATOMIC) || 'nil';
    const mark = generator.valueToCode(block, 'MARK', Order.ATOMIC) || 'nil';

    if (card == 'nil' || mark == 'nil') {
      throw new Error("生成失败！必须指定卡牌和标记名。");
    }

    return [`${card}:getMark(${mark})`, Order.ATOMIC];
  };

  luaGenerator.forBlock['get_card_by_id'] = function (block, generator) {
    const id = generator.valueToCode(block, 'ID', Order.ATOMIC) || 'nil';

    if (id == 'nil') {
      throw new Error("生成失败！必须指定一个数字ID。");
    }

    return [`Fk:getCardById(${id})`, Order.ATOMIC];
  };

  luaGenerator.forBlock['clone_card'] = function (block, generator) {
    const name = generator.valueToCode(block, 'NAME', Order.ATOMIC) || '';
    const suit = generator.getVariableName(block.getFieldValue('SUIT')) || 'Nosuit';
    const number = generator.valueToCode(block, 'NUMBER', Order.ATOMIC) || 'nil';

    if (name == "''") {
      throw new Error("生成失败！必须指定一个牌名。");
    }

    return [`Fk:cloneCard(${name}, Card.${suit}, ${number})`, Order.ATOMIC];
  };

  luaGenerator.forBlock['print_card'] = function (block, generator) {
    const name = generator.valueToCode(block, 'NAME', Order.ATOMIC) || '';
    const suit = generator.getVariableName(block.getFieldValue('SUIT')) || 'Nosuit';
    const number = generator.valueToCode(block, 'NUMBER', Order.ATOMIC) || 'nil';

    if (name == "''") {
      throw new Error("生成失败！必须指定一个牌名。");
    }

    return [`Fk:printCard(${name}, Card.${suit}, ${number})`, Order.ATOMIC];
  };

  luaGenerator.forBlock['card_add_subcards'] = function (block, generator) {
    const card = generator.valueToCode(block, 'CARD', Order.ATOMIC) || 'nil';
    const type = generator.getVariableName(block.getFieldValue('TYPE')) || 'nil';
    const ids = generator.valueToCode(block, 'IDS', Order.ATOMIC) || 'nil';

    if (card == 'nil' || ids == 'nil') {
      throw new Error("生成失败！必须指定一个虚拟牌和ID数组。");
    }

    return `${card}:add${type}(${ids})\n`;
  };

  luaGenerator.forBlock['draw_n_cards'] = function (block, generator) {
    const pos = generator.getVariableName(block.getFieldValue('POSITION')) || 'top';
    const number = generator.valueToCode(block, 'NUMBER', Order.ATOMIC) || 'nil';

    if (number == 'nil') {
      throw new Error("生成失败！必须指定抽取数量。");
    }

    return [`room:getNCards(${number}, "${pos}")`, Order.ATOMIC];
  };
};
