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

Blockly.Blocks['player_get_card_ids'] = {
  init: function () {
    this.appendValueInput('PLAYER').setCheck('Player').appendField('角色');

    this.appendDummyInput('PROPERTY_INPUT')
      .appendField('的')
      .appendField(
        new Blockly.FieldDropdown(
          [
            ['手牌区', 'h'],
            ['装备区', 'e'],
            ['判定区', 'j'],

            ['手牌区+装备区', 'he'],
            ['手牌区+判定区', 'hj'],
            ['场上', 'ej'],
            ['区域', 'hej'],
          ],
        ),
        'FLAG'
      )
      .appendField('内所有牌');

    this.setColour(230);
    this.setTooltip('获取角色某区域(或多个区域)内的所有牌');
    this.setHelpUrl('');

    this.setOutput(true, 'Array');
  },
};

Blockly.Blocks['player_used_times'] = {
  init: function () {
    this.appendValueInput('PLAYER').setCheck('Player').appendField('角色');

    this.appendDummyInput('HISTORY_INPUT')
      .appendField('在')
      .appendField(
        new Blockly.FieldDropdown(
          [
            ['本阶段', 'HistoryPhase'],
            ['本回合', 'HistoryTurn'],
            ['本轮', 'HistoryRound'],
            ['本局游戏', 'HistoryGame'],
          ],
        ),
        'HISTORY'
      )
      .appendField('内使用')

    this.appendValueInput('NAME').setCheck('String')
      .appendField(
      new Blockly.FieldDropdown(
        [
          ['牌名', 'Card'],
          ['技能', 'Skill'],
        ],
      ),
      'TYPE');
    this.appendDummyInput()
      .appendField('的次数');

    this.setColour(230);
    this.setTooltip('获得角色在某时机使用了多少次某个牌名或技能');
    this.setHelpUrl('');

    this.setOutput(true, 'Number');
  },
};

export default [
  {
    type: 'player_has_skill',
    message0: '角色 %1 是否拥有技能 %2',
    args0: [
      { type: 'input_value', name: 'PLAYER', check: 'Player' },
      { type: 'input_value', name: 'NAME', check: 'String', align: 'RIGHT' }
    ],
    colour: 230,
    tooltip: '获得角色是否拥有某个技能',
    output: 'Boolean',
    inputsInline: true,
  },
  {
    type: 'player_has_delay',
    message0: '角色 %1 的判定区内是否有延时锦囊 %2',
    args0: [
      { type: 'input_value', name: 'PLAYER', check: 'Player' },
      { type: 'input_value', name: 'DELAY', check: 'String', align: 'RIGHT' }
    ],
    colour: 230,
    tooltip: '获得角色的判定区内是否有特定名字的延时锦囊',
    output: 'Boolean',
    inputsInline: true,
  },
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
  {
    type: 'player_get_pile',
    message0: '角色 %1 的私人牌堆 %2',
    args0: [
      { type: 'input_value', name: 'PLAYER', check: 'Player' },
      { type: 'input_value', name: 'PILE', check: 'String', align: 'RIGHT' }
    ],
    colour: 230,
    tooltip: '获得角色的私人牌堆',
    output: 'Array',
    inputsInline: true,
  },
  {
    type: 'player_distance_to',
    message0: '角色 %1 ==计算=> 角色 %2 的距离',
    args0: [
      { type: 'input_value', name: 'FROM', check: 'Player' },
      { type: 'input_value', name: 'TO', check: 'Player', align: 'RIGHT' }
    ],
    colour: 230,
    tooltip: '获得角色单向计算另一个角色的距离（如果其中一方已死亡或被移出游戏，会返回-1）',
    output: 'Number',
    inputsInline: true,
  },
  {
    type: 'player_in_attack_range',
    message0: '角色 %1 的攻击范围内是否含有角色 %2',
    args0: [
      { type: 'input_value', name: 'FROM', check: 'Player' },
      { type: 'input_value', name: 'TO', check: 'Player', align: 'RIGHT' }
    ],
    colour: 230,
    tooltip: '获得角色的攻击范围内内是否有另一名角色',
    output: 'Boolean',
    inputsInline: true,
  },
  // usedCardTimes
  // usedSkillTimes
  // hasSkill

  // 未完待续...
];
