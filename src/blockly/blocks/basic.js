export default [
  {
    type: 'function_start',
    message0: '流程开始执行',
    nextStatement: null,
    colour: 123,
    tooltip: '函数的起始点，不可删除',
    helpUrl: ''
  },
  {
    type: 'simple_return',
    message0: '返回 %1',
    args0: [
      {
        type: 'input_value',
        name: 'VALUE',
        check: null
      }
    ],
    previousStatement: null,
    style: 'logic_blocks',
    tooltip: '返回一个值',
    helpUrl: ''
  }
];
