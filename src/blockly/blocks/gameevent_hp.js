import { createConfigurableBlock } from './factory';

const damageBlocks = createConfigurableBlock({
  type: 'deal_damage',
  message: '对角色造成伤害\n伤害目标%1 伤害值%2',
  args: [
    { type: 'input_value', name: 'TARGET', check: 'Player' },
    { type: 'input_value', name: 'AMOUNT', check: 'Number' }
  ],
  colour: 230,
  tooltip: '造成伤害',
  optionalFields: [
    {
      name: 'SOURCE',
      message: '伤害来源',
      inputType: 'input_value',
      check: 'Player'
    },
    { name: 'DAMAGE_TYPE', message: '伤害属性', inputType: 'dummy_input_dropdown' }
  ],
  dropdowns: {
    DAMAGE_TYPE: [
      ['普', 'NormalDamage'],
      ['雷', 'ThunderDamage'],
      ['火', 'FireDamage'],
      ['冰', 'IceDamage']
    ]
  }
});

// const loseHpBlocks = createConfigurableBlock({
const loseHpBlocks = [{
  type: 'lose_hp',
  message0: '令 %1 失去 %2 点体力',
  args0: [
    { type: 'input_value', name: 'TARGET', check: 'Player' },
    { type: 'input_value', name: 'AMOUNT', check: 'Number' }
  ],
  colour: 230,
  tooltip: '失去体力',
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
}];
// });

const recoverBlocks = createConfigurableBlock({
  type: 'recover_hp',
  message: '令一名角色回复体力\n回复的角色%1 回复值%2',
  args: [
    { type: 'input_value', name: 'TARGET', check: 'Player' },
    { type: 'input_value', name: 'AMOUNT', check: 'Number' }
  ],
  colour: 230,
  tooltip: '回复体力',
  optionalFields: [
    {
      name: 'SOURCE',
      message: '回复的来源',
      inputType: 'input_value',
      check: 'Player'
    },
    { name: 'SOURCE_CARD', message: '回复来源卡牌', inputType: 'input_value', check: 'Card' }
  ]
});

const changeMaxHpBlocks = createConfigurableBlock({
  type: 'change_maxhp',
  message: '改变一名角色的体力上限\n角色%1 改变值%2',
  args: [
    { type: 'input_value', name: 'TARGET', check: 'Player' },
    { type: 'input_value', name: 'AMOUNT', check: 'Number' }
  ],
  colour: 230,
  tooltip: '改变体力上限'
});

export default [...damageBlocks, ...loseHpBlocks, ...recoverBlocks, ...changeMaxHpBlocks];
