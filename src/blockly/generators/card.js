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
};
