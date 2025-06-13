export default {
  kind: 'category',
  name: '卡牌相关',
  colour: '#EE2488',
  contents: [
    {
      type: 'card_property_read',
      kind: 'block'
    },
    {
      type: 'get_card_by_id',
      kind: 'block',
    },
    {
      type: 'clone_card',
      kind: 'block',
      inputs: {
        NUMBER: {
          shadow: {
            type: 'math_number',
            fields: {
              NUM: 7
            }
          }
        },
        NAME: {
          shadow: {
            type: 'text',
            fields: {
              TEXT: ''
            }
          }
        },
      }
    }
  ]
};
