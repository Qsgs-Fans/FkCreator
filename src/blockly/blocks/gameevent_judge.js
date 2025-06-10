import { createConfigurableBlock } from './factory';

const judgeBlocks = createConfigurableBlock({
  type: 'judge',
  message: '令一名角色进行一次判定\n判定对象%1 判定成功的条件%2  判定原因（技能名）%3',
  args: [
    { type: 'input_value', name: 'WHO', check: 'Player' },
    { type: 'input_value', name: 'PATTERN', check: 'String' },
    { type: 'input_value', name: 'REASON', check: 'String' }
  ],
  colour: 230,
  tooltip: '进行一次判定',
  optionalFields: [
    {
      name: 'CARD',
      message: '当前判定的卡牌',
      inputType: 'input_value',
      check: 'Card'
    },
    { name: 'SKIPDROP', message: '是否不进入弃牌堆', inputType: 'input_value', check: 'Boolean' }
  ],
});

const retrialBlocks = createConfigurableBlock({
  type: 'retrial',
  message: '更改判定结果\n新的判定牌%1  改判的发动者%2  要被改判的判定数据%3',
  args: [
    { type: 'input_value', name: 'CARD', check: 'Card' },
    { type: 'input_value', name: 'PLAYER', check: 'Player' },
    { type: 'input_value', name: 'DATA', check: 'JudgeData' }

  ],
  colour: 230,
  tooltip: '改判',
  optionalFields: [
    { name: 'SKILLNAME', message: '改判的技能名', inputType: 'input_value', check: 'String' },
    { name: 'EXCHANGE', message: '改判者是否获得原判定牌（鬼道）', inputType: 'input_value', check: 'Boolean' },
    { name: 'RESPONSE', message: '是否以打出方式改判', inputType: 'input_value', check: 'Boolean' }
  ],
});

export default [...judgeBlocks, ...retrialBlocks];
