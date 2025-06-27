import { luaGenerator, Order } from 'blockly/lua';

export default () => {
  luaGenerator.forBlock['player_property_read'] = function (block, generator) {
    const player = generator.valueToCode(block, 'PLAYER', Order.ATOMIC) || 'nil';
    const property = generator.getVariableName(block.getFieldValue('PROPERTY')) || 'nil';

    if (player == 'nil' || property == 'nil') {
      throw new Error("生成失败！必须指定一名角色和一个属性字段。");
    }

    return [`${player}.${property}`, Order.ATOMIC];
  };

  luaGenerator.forBlock['player_property_read_by_fn'] = function (block, generator) {
    const player = generator.valueToCode(block, 'PLAYER', Order.ATOMIC) || 'nil';
    const property = generator.getVariableName(block.getFieldValue('PROPERTY')) || 'nil';

    if (player == 'nil' || property == 'nil') {
      throw new Error("生成失败！必须指定一名角色和一个属性字段。");
    }

    return [`${player}:${property}()`, Order.ATOMIC];
  };

  luaGenerator.forBlock['player_get_card_ids'] = function (block, generator) {
    const player = generator.valueToCode(block, 'PLAYER', Order.ATOMIC) || 'nil';
    const flag = generator.getVariableName(block.getFieldValue('FLAG')) || 'nil';

    if (player == 'nil' || flag == 'nil') {
      throw new Error("生成失败！必须指定一名角色和一个区域字段。");
    }

    return [`${player}:getCardIds(${flag})`, Order.ATOMIC];
  };

  luaGenerator.forBlock['player_used_times'] = function (block, generator) {
    const player = generator.valueToCode(block, 'PLAYER', Order.ATOMIC) || 'nil';
    const history = generator.getVariableName(block.getFieldValue('HISTORY')) || 'HistoryTurn';
    const type = generator.getVariableName(block.getFieldValue('TYPE')) || 'Card';
    const card = generator.valueToCode(block, 'NAME', Order.ATOMIC) || 'nil';

    if (player == 'nil' || card == 'nil') {
      throw new Error("生成失败！必须指定一名角色和一个名字。");
    }

    return [`${player}:used${type}Times(${card}, Player.${history})`, Order.ATOMIC];
  };

  luaGenerator.forBlock['player_has_skill'] = function (block, generator) {
    const player = generator.valueToCode(block, 'PLAYER', Order.ATOMIC) || 'nil';
    const name = generator.valueToCode(block, 'NAME', Order.ATOMIC) || 'nil';

    if (player == 'nil' || name == 'nil') {
      throw new Error("生成失败！必须指定角色和技能名。");
    }

    return [`${player}:hasSkill(${name})`, Order.ATOMIC];
  };

  luaGenerator.forBlock['player_has_delay'] = function (block, generator) {
    const player = generator.valueToCode(block, 'PLAYER', Order.ATOMIC) || 'nil';
    const delay = generator.valueToCode(block, 'DELAY', Order.ATOMIC) || 'nil';

    if (player == 'nil' || delay == 'nil') {
      throw new Error("生成失败！必须指定角色和延时锦囊牌名。");
    }

    return [`${player}:hasDelayedTrick(${delay})`, Order.ATOMIC];
  };

  luaGenerator.forBlock['player_get_mark'] = function (block, generator) {
    const player = generator.valueToCode(block, 'PLAYER', Order.ATOMIC) || 'nil';
    const mark = generator.valueToCode(block, 'MARK', Order.ATOMIC) || 'nil';

    if (player == 'nil' || mark == 'nil') {
      throw new Error("生成失败！必须指定角色和标记名。");
    }

    return [`${player}:getMark(${mark})`, Order.ATOMIC];
  };

  luaGenerator.forBlock['player_get_pile'] = function (block, generator) {
    const player = generator.valueToCode(block, 'PLAYER', Order.ATOMIC) || 'nil';
    const pile = generator.valueToCode(block, 'PILE', Order.ATOMIC) || 'nil';

    if (player == 'nil' || pile == 'nil') {
      throw new Error("生成失败！必须指定角色和牌堆名。");
    }

    return [`${player}:getPile(${pile})`, Order.ATOMIC];
  };

  luaGenerator.forBlock['player_distance_to'] = function (block, generator) {
    const from = generator.valueToCode(block, 'FROM', Order.ATOMIC) || 'nil';
    const to = generator.valueToCode(block, 'TO', Order.ATOMIC) || 'nil';

    if (from == 'nil' || to == 'nil') {
      throw new Error("生成失败！必须指定两个角色。");
    }

    return [`${from}:distanceTo(${to})`, Order.ATOMIC];
  };

  luaGenerator.forBlock['player_in_attack_range'] = function (block, generator) {
    const from = generator.valueToCode(block, 'FROM', Order.ATOMIC) || 'nil';
    const to = generator.valueToCode(block, 'TO', Order.ATOMIC) || 'nil';

    if (from == 'nil' || to == 'nil') {
      throw new Error("生成失败！必须指定两个角色。");
    }

    return [`${from}:inMyAttackRange(${to})`, Order.ATOMIC];
  };
};
