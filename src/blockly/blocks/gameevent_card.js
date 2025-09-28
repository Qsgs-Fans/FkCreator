import { createConfigurableBlock } from './factory';
const obtainCardBlocks = createConfigurableBlock({
  type: 'obtain_card',
  message: '令一名角色获得牌\n获得牌的角色%1 被获得的牌%2',
  args: [
    { type: 'input_value', name: 'TARGET', check: 'Player' },
    { type: 'input_value', name: 'CARDS', check: 'Array' }
  ],
  colour: 230,
  tooltip: '令一名角色获得牌',
  optionalFields: [
    {
      name: 'VISIBLE',
      message: '可见？',
      inputType: 'input_value',
      check: 'Boolean'
    },
    {
      name: 'PROPOSER',
      message: '移动操作者',
      inputType: 'input_value',
      check: 'Player'
    },
    { name: 'REASON', message: '移动原因', inputType: 'dummy_input_dropdown' }
  ],
  dropdowns: {
    REASON: [
      ['纯移动', 'ReasonJustMove'],
      ['摸牌', 'ReasonDraw'],
      ['交给牌', 'ReasonGive'],
      ['获得', 'ReasonPrey']
    ]
  }
});
const throwCardBlocks = createConfigurableBlock({
  type: 'throw_card',
  message: '令一名角色弃置牌\n弃置牌来源%1 被弃置的牌%2',
  args: [
    { type: 'input_value', name: 'TARGET', check: 'Player' },
    { type: 'input_value', name: 'CARDS', check: 'Array' }
  ],
  colour: 230,
  tooltip: '弃置一名角色的任意张牌',
  optionalFields: [
    {
      name: 'THROWER',
      message: '弃置者',
      inputType: 'input_value',
      check: 'Player'
    }
  ]
});
const recastCardBlocks = createConfigurableBlock({
  type: 'recast_card',
  message: '令一名角色重铸牌\n重铸者%1 被重铸的牌%2',
  args: [
    { type: 'input_value', name: 'TARGET', check: 'Player' },
    { type: 'input_value', name: 'CARDS', check: 'Array' }
  ],
  colour: 230,
  tooltip: '重铸一名角色的任意张牌',
});
const drawCardBlocks = [{
  type: 'draw_card',
  message0: '%1 摸 %2 张牌',
  args0: [
    { type: 'input_value', name: 'TARGET', check: 'Player' },
    { type: 'input_value', name: 'AMOUNT', check: 'Number' }
  ],
  colour: 230,
  tooltip: '摸任意张牌',
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
}];
const showCardBlocks = [{
  type: 'show_card',
  message0: '%1 展示 %2',
  args0: [
    { type: 'input_value', name: 'TARGET', check: 'Player' },
    { type: 'input_value', name: 'CARDS', check: 'Array' }
  ],
  colour: 230,
  tooltip: '让一名角色展示任意张牌（最好是自己的手牌）',
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
}];

export default [...obtainCardBlocks, ...throwCardBlocks, ...recastCardBlocks, ...drawCardBlocks, ...showCardBlocks];
