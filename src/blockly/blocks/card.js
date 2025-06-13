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
            ['名称', 'name'],
            ['真实名称', 'truename']
          ],
          this.updateOutputType.bind(this)
        ),
        'PROPERTY'
      );

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
      suit: 'String',
      name: 'String'
    };
    const outputType = typeMap[newValue] || null;
    this.setOutput(true, outputType);
  }
};

Blockly.Blocks['clone_card'] = {
  init: function () {

    this.appendDummyInput('PROPERTY_INPUT')
      .appendField('一张')
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
        .setCheck('Number');
  
    this.appendValueInput('NAME')
        .setCheck('String')
        .appendField('的虚拟');

    this.setInputsInline(true);
    this.setColour(230);
    this.setTooltip('根据牌名、花色、点数，复制一张牌');
    this.setHelpUrl('');

    // 设置初始的输出类型（默认是 number）
    this.setOutput(true, 'Card');
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
  }/*,
  {
    type: 'clone_card',
    message0: '一张 %1 %2 的 %3',
    args0: [
      { type: 'input_value', name: 'SUIT', check: 'Number' },
      { type: 'input_value', name: 'NUMBER', check: 'Number' },
      { type: 'input_value', name: 'NAME', check: 'String' },
    ],
    colour: 230,
    tooltip: '根据牌名、花色、点数，复制一张牌',
    output: 'Card',
    inputsInline: true,
  }*/
];
