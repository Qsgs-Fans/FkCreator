export default {
  kind: 'category',
  name: '生成结算-卡牌相关',
  colour: 'green',
  contents: [
    {
      type: 'draw_card',
      kind: 'block',
      inputs: {
        AMOUNT: {
          shadow: {
            type: 'math_number',
            fields: {
              NUM: 1
            }
          }
        }
      }
    },
    {
      type: 'throw_card',
      kind: 'block',
    },
    {
      type: 'recast_card',
      kind: 'block',
    },
  ]
};
