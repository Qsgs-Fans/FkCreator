import { createConfigurableBlock } from './factory';

const matcherBlocks = createConfigurableBlock({
  type: 'make_matcher',
  message: '匹配满足以下格式的卡牌\n牌名%1',
  args: [
    { type: 'input_value', name: 'TRUENAME', check: 'ExpArray' }
  ],
  colour: 230,
  tooltip: '输出一个匹配器用以过滤卡牌',
  optionalFields: [
    {
      name: 'NUMBER',
      message: '点数',
      inputType: 'input_value',
      check: 'ExpArray'
    },
    {
      name: 'SUIT',
      message: '花色',
      inputType: 'input_value',
      check: 'ExpArray'
    },
    {
      name: 'AREA',
      message: '区域',
      inputType: 'input_value',
      check: 'ExpArray'
    },
    {
      name: 'NAME',
      message: '全名',
      inputType: 'input_value',
      check: 'ExpArray'
    },
    {
      name: 'TYPE',
      message: '类型',
      inputType: 'input_value',
      check: 'ExpArray'
    },
    {
      name: 'ID',
      message: 'ID',
      inputType: 'input_value',
      check: 'ExpArray'
    },
  ],
  output: 'String',
});

const ExpArrayBlock = {
  type: 'matcher_array',
  message0: '满足%1 不满足%2',
  args0: [
    { type: 'input_value', name: 'PRO', check: 'Array' },
    { type: 'input_value', name: 'CON', check: 'Array' }
  ],
  colour: 230,
  tooltip: '为匹配器制造一对满足某项而不满足某项的数组',
  output: 'ExpArray',
};

export default [...matcherBlocks, ExpArrayBlock];
