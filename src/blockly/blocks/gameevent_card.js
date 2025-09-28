import { createConfigurableBlock } from './factory';
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
const throwBlocks = createConfigurableBlock({
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
const recastBlocks = createConfigurableBlock({
  type: 'recast_card',
  message: '令一名角色重铸牌\n重铸者%1 被重铸的牌%2',
  args: [
    { type: 'input_value', name: 'TARGET', check: 'Player' },
    { type: 'input_value', name: 'CARDS', check: 'Array' }
  ],
  colour: 230,
  tooltip: '重铸一名角色的任意张牌',
});

export default [...drawCardBlocks, ...throwBlocks, ...recastBlocks];
