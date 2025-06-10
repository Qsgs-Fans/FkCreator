import * as Blockly from 'blockly';

Blockly.Blocks['player_property_read'] = {
  init: function () {
    this.appendValueInput('PLAYER').setCheck('Player').appendField('角色');

    this.appendDummyInput('PROPERTY_INPUT')
      .appendField('的')
      .appendField(
        new Blockly.FieldDropdown(
          [
            ['主将', 'general'],
            ['副将', 'deputyGeneral'],

            ['体力', 'hp'],
            ['体力上限', 'maxHp'],
            ['护甲', 'shield'],

            ['性别', 'gender'],
            ['势力', 'kingdom'],
            // ['阵亡状态', 'dead'],
            ['身份', 'role'],
            ['身份已展示', 'role_shown'],

            ['座位号', 'seat'],
            ['阶段', 'phase'],
            ['是否正面朝上', 'faceup'],
            ['是否横置', 'chained'],

            ['uid', 'id'],
          ],
          this.updateOutputType.bind(this)
        ),
        'PROPERTY'
      );

    this.setColour(230);
    this.setTooltip('获取角色的指定属性');
    this.setHelpUrl('');

    // 设置初始的输出类型（默认是 number）
    this.setOutput(true, 'String');
  },

  /**
   * 根据 dropdown 选择更新输出类型
   */
  updateOutputType: function (newValue) {
    const typeMap = {
      'general': 'String',
      'deputyGeneral': 'String',

      'hp': 'Number',
      'maxHp': 'Number',
      'shield': 'Number',

      'gender': 'GenderEnum',
      'kingdom': 'String',
      'role': 'Number',
      'role_shown': 'Boolean',

      'seat': 'Number',
      'phase': 'PhaseEnum',
      'faceup': 'Boolean',
      'chained': 'Boolean',

      'id': 'Number'
    };
    const outputType = typeMap[newValue] || null;
    this.setOutput(true, outputType);
  }
};

Blockly.Blocks['player_property_read_by_fn'] = {
  init: function () {
    this.appendValueInput('PLAYER').setCheck('Player').appendField('角色');

    this.appendDummyInput('PROPERTY_INPUT')
      .appendField('的')
      .appendField(
        new Blockly.FieldDropdown(
          [
            ['是否存活', 'isAlive'],
            ['是否无手牌', 'isKongcheng'],
            ['是否无牌', 'isNude'],
            ['是否区域内没有牌', 'isAllNude'],

            ['是否已受伤', 'isWounded'],
            ['已损失的体力值', 'getLostHp'],

            ['上家', 'getLastAlive'],
            ['下家', 'getNextAlive'],

            ['手牌数', 'getHandcardNum'],
            ['手牌上限', 'getMaxCards'],
            ['攻击范围', 'getAttackRange'],

            // ['所有武将技能名列表', 'getSkillNameList'],
          ],
          this.updateOutputType.bind(this)
        ),
        'PROPERTY'
      );

    this.setColour(230);
    this.setTooltip('获取角色的指定属性');
    this.setHelpUrl('');

    this.setOutput(true, 'Boolean');
  },

  /**
   * 根据 dropdown 选择更新输出类型
   */
  updateOutputType: function (newValue) {
    const typeMap = {
      'isAlive': 'Boolean',
      'isKongcheng': 'Boolean',
      'isNude': 'Boolean',
      'isAllNude': 'Boolean',

      'isWounded': 'Boolean',
      'getLostHp': 'Number',

      'getLastAlive': 'Player',
      'getNextAlive': 'Player',

      'getHandcardNum': 'Number',
      'getMaxCards': 'Number',
      'getAttackRange': 'Number',
    };
    const outputType = typeMap[newValue] || null;
    this.setOutput(true, outputType);
  }
};

export default [
  {
    type: 'player_get_mark',
    message0: '角色 %1 的标记 %2',
    args0: [
      { type: 'input_value', name: 'PLAYER', check: 'Player' },
      { type: 'input_value', name: 'MARK', check: 'String', align: 'RIGHT' }
    ],
    colour: 230,
    tooltip: '获得角色的标记值',
    output: null,
    inputsInline: true,
  },
  // getCardIds
  // hasDelayedTrick
  // getPile
  // distanceTo
  // inMyAttackRange
  // usedCardTimes
  // usedSkillTimes
  // hasSkill

  // 未完待续...
];
