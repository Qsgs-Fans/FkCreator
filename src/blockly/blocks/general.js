import * as Blockly from 'blockly';
// 武将牌相关

Blockly.Blocks['general_property_read'] = {
  init: function () {
    this.appendValueInput('GENERAL').setCheck('General').appendField('武将');

    this.appendDummyInput('PROPERTY_INPUT')
      .appendField('的')
      .appendField(
        new Blockly.FieldDropdown(
          [
            ['所属扩展包', 'package'],
            ['姓名', 'name'],
            ['真实姓名', 'trueName'],

            ['体力', 'hp'],
            ['体力上限', 'maxHp'],
            ['护甲', 'shield'],

            ['性别', 'gender'],
            ['势力', 'kingdom'],
            ['副势力', 'subkingdom'],
          ],
          this.updateOutputType.bind(this)
        ),
        'PROPERTY'
      );

    this.setColour(230);
    this.setTooltip('获取武将的指定属性');
    this.setHelpUrl('');

    // 设置初始的输出类型（默认是 number）
    this.setOutput(true, 'String');
  },

  /**
   * 根据 dropdown 选择更新输出类型
   */
  updateOutputType: function (newValue) {
    const typeMap = {
      'package': 'String',
      'name': 'String',
      'trueName': 'String',

      'hp': 'Number',
      'maxHp': 'Number',
      'shield': 'Number',

      'gender': 'GenderEnum',
      'kingdom': 'String',
      'subkingdom': 'String',
    };
    const outputType = typeMap[newValue] || null;
    this.setOutput(true, outputType);
  }
};

export default [
  {
    type: 'general_skill_list',
    message0: '武将 %1 上的所有技能\n包括主公技 %2',
    args0: [
      { type: 'input_value', name: 'GENERAL', check: 'General' },
      { type: 'input_value', name: 'LORD', check: 'Boolean', align: 'RIGHT' }
    ],
    colour: 230,
    tooltip: '获得武将牌上的所有技能',
    output: 'Array',
  },
  {
    type: 'get_general_by_name',
    message0: '武将 %1',
    args0: [
      { type: 'input_value', name: 'NAME', check: 'String' },
    ],
    colour: 230,
    tooltip: '通过武将名检索武将本体',
    output: 'General',
  },
  {
    type: 'draw_n_generals',
    message0: '从%1抽%2张武将牌',
    args0: [
      { type: 'field_dropdown', name: 'POSITION',
        options: [
          ["武将牌堆顶", "top"],
          ["武将牌堆底", "bottom"]
        ]
      },
      { type: 'input_value', name: 'NUMBER', check: 'Number' },
    ],
    colour: 230,
    tooltip: '从房间的武将牌堆抽取N张武将（会消耗武将牌堆）',
    output: 'Array',
  },
  {
    previousStatement: null,
    nextStatement: null,
    type: 'return_to_general_pile',
    message0: '将武将牌塞回%1\n武将名数组 %2',
    args0: [
      { type: 'field_dropdown', name: 'POSITION',
        options: [
          ["武将牌堆顶", "top"],
          ["武将牌堆底", "bottom"],
          ["武将牌堆随机位置", "bottom"]
        ]
      },
      { type: 'input_value', name: 'GENERALS', check: 'Array' },
    ],
    inputsInline: false,
    colour: 230,
    tooltip: '将若干张武将牌（基于武将牌名，请先判断是否重复）放回武将牌堆',
  },
];
