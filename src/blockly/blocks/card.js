import * as Blockly from 'blockly';

Blockly.Blocks['card_property_read'] = {
  init: function () {
    this.appendValueInput('CARD').setCheck('Card').appendField('卡牌');

    this.appendDummyInput('PROPERTY_INPUT')
      .appendField('的')
      .appendField(
        new Blockly.FieldDropdown(
          [
            ['点数', 'number'],
            ['花色', 'suit'],
            ['颜色', 'color'],
            ['名称', 'name'],
            ['真实名称', 'trueName'],
            ['类别', 'type'],
            ['子类别', 'sub_type'],
            ['技能标记', 'skillNames'],
            ['额外信息', 'extra_data'],

            ['是否是伤害牌', 'is_damage_card'],
            ['是否是多目标牌', 'multiple_targets'],
            ['是否是衍生牌', 'is_derived'],
            ['是否只能在响应时使用或打出', 'is_passive'],
          ],
          this.updateOutputType.bind(this)
        ),
        'PROPERTY'
      );

    this.setInputsInline(true);
    this.setColour(230);
    this.setTooltip('获取卡牌的指定属性');
    this.setHelpUrl('');

    // 设置初始的输出类型（默认是 number）
    this.setOutput(true, 'Number');
  },

  /**
   * 根据 dropdown 选择更新输出类型
   */
  updateOutputType: function (newValue) {
    const typeMap = {
      number: 'Number',
      suit: 'Number',
      color: 'Number',
      name: 'String',
      trueName: 'String',
      type: 'Number',
      sub_type: 'Number',
      skillNames: 'Array',
      extra_data: 'Array',

      is_damage_card: 'Boolean',
      multiple_targets: 'Boolean',
      is_derived: 'Boolean',
      is_passive: 'Boolean',
    };
    const outputType = typeMap[newValue] || null;
    this.setOutput(true, outputType);
  }
};

Blockly.Blocks['card_property_func'] = {
  init: function () {
    this.appendValueInput('CARD').setCheck('Card').appendField('卡牌');

    this.appendDummyInput('PROPERTY_INPUT')
      .appendField(
        new Blockly.FieldDropdown(
          [
            ['的格式化字符串', 'toLogString'],
            ['的花色字符串', 'getSuitString'],
            ['的颜色字符串', 'getColorString'],
            ['的点数字符串', 'getNumberStr'],
            ['的类别字符串', 'getTypeString'],
            ['的子类别字符串', 'getSubtypeString'],
            ['的完整点数字符串', 'getSuitCompletedString'],
            ['的ID', 'getEffectiveId'],

            ['是否是虚拟牌', 'isVirtual'],
            ['是否是普通锦囊牌', 'isCommonTrick'],
          ],
          this.updateOutputType.bind(this)
        ),
        'PROPERTY'
      );

    this.setInputsInline(true);
    this.setColour(230);
    this.setTooltip('获取卡牌的指定属性');
    this.setHelpUrl('');

    // 设置初始的输出类型（默认是 number）
    this.setOutput(true, 'String');
  },

  /**
   * 根据 dropdown 更新代码块
   */
  updateOutputType: function (newValue) {
    // 选择更新输出类型
    const valueMap = {
      getSuitString: ['|是否输出符号而非字符串', 'Boolean'],
      getSuitCompletedString: ['|是否输出符号而非字符串', 'Boolean'],
    }
    this.removeInput('VALUE', /* no error */ true);
    if (valueMap[newValue]) {
      const val = valueMap[newValue]
      this.appendValueInput('VALUE')
        .setCheck(val[1])
        .appendField(val[0]);
    }
    // 选择更新输出类型
    const typeMap = {
      toLogString: 'String',
      getSuitString: 'String',
      getColorString: 'String',
      getNumberStr: 'String',
      getTypeString: 'String',
      getSubtypeString: 'String',
      getSuitCompletedString: 'String',
      getEffectiveId: 'Number',

      isVirtual: 'Boolean',
      isCommonTrick: 'Boolean',
    };
    const outputType = typeMap[newValue] || null;
    this.setOutput(true, outputType);
  }
};

Blockly.Blocks['clone_card'] = {
  init: function () {
  
    this.appendValueInput('NAME')
        .setCheck('String')
        .appendField('一张虚拟的');

    this.appendDummyInput('PROPERTY_INPUT')
      .appendField('花色')
      .appendField(
        new Blockly.FieldDropdown(
          [
            ['无花色', 'NoSuit'],
            ['黑桃♠', 'Spade'],
            ['梅花♣', 'Club'],
            ['红桃♥', 'Heart'],
            ['方片♦', 'Diamond']
          ]
        ),
        'SUIT'
      );

    this.appendValueInput('NUMBER')
        .setCheck('Number')
        .appendField('点数');

    this.setInputsInline(false);
    this.setColour(230);
    this.setTooltip('根据牌名、花色、点数，复制一张牌');
    this.setHelpUrl('');

    // 设置初始的输出类型（默认是 number）
    this.setOutput(true, 'Card');
  }
};

Blockly.Blocks['print_card'] = {
  init: function () {
  
    this.appendValueInput('NAME')
        .setCheck('String')
        .appendField('一张额外的');

    this.appendDummyInput('PROPERTY_INPUT')
      .appendField('花色')
      .appendField(
        new Blockly.FieldDropdown(
          [
            ['无花色', 'NoSuit'],
            ['黑桃♠', 'Spade'],
            ['梅花♣', 'Club'],
            ['红桃♥', 'Heart'],
            ['方片♦', 'Diamond']
          ]
        ),
        'SUIT'
      );

    this.appendValueInput('NUMBER')
        .setCheck('Number')
        .appendField('点数');

    this.setInputsInline(false);
    this.setColour(230);
    this.setTooltip('根据牌名、花色、点数，制造一张拥有ID的额外牌');
    this.setHelpUrl('');

    // 设置初始的输出类型（默认是 number）
    this.setOutput(true, 'Card');
  }
};

Blockly.Blocks['card_add_subcards'] = {
  init: function () {

    this.appendDummyInput().appendField('为虚拟牌')
      .appendField(
        new Blockly.FieldDropdown(
          [
            ['真实', 'Subcards'],
            ['虚拟', 'FakeSubcards']
          ]
        ),
        'TYPE'
      )
      .appendField('地添加对应的实体牌');

    this.appendValueInput('CARD').setCheck('Card').appendField('虚拟牌');
      
    this.appendValueInput('IDS')
        .setCheck('Array')
        .appendField('实体牌ID组');

    this.setColour(230);
    this.setTooltip('为一张虚拟牌添加若干张对应的实体牌');
    this.setHelpUrl('');

    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

export default [
  {
    type: 'get_card_by_id',
    message0: 'ID为 %1 的卡牌',
    args0: [
      { type: 'input_value', name: 'ID', check: 'Number' },
    ],
    colour: 230,
    tooltip: '通过数字ID获取对应的卡牌',
    output: 'Card',
    inputsInline: true,
  },
  {
    type: 'card_get_mark',
    message0: '卡牌 %1 的标记 %2',
    args0: [
      { type: 'input_value', name: 'CARD', check: 'Card' },
      { type: 'input_value', name: 'MARK', check: 'String' }
    ],
    colour: 230,
    tooltip: '获得卡牌的标记值',
    output: null,
    inputsInline: true,
  },
  {
    type: 'card_match_pattern',
    message0: '卡牌 %1 匹配器 %2',
    args0: [
      { type: 'input_value', name: 'CARD', check: 'Card' },
      { type: 'input_value', name: 'PATTERN', check: 'String' },
    ],
    inputsInline: false,
    colour: 230,
    tooltip: '判断一张卡牌是否匹配某个匹配器',
    output: 'Boolean',
  },
  {
    type: 'draw_n_cards',
    message0: '从%1抽%2张牌',
    args0: [
      { type: 'field_dropdown', name: 'POSITION',
        options: [
          ["牌堆顶", "top"],
          ["牌堆底", "bottom"]
        ]
      },
      { type: 'input_value', name: 'NUMBER', check: 'Number' },
    ],
    colour: 230,
    tooltip: '从房间的牌堆抽取N张牌，返回这些牌的ID',
    output: 'Array',
  },
];
