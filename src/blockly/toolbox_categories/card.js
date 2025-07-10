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
      type: 'card_property_func',
      kind: 'block'
    },
    {
      type: 'card_match_pattern',
      kind: 'block'
    },
    {
      type: 'card_get_mark',
      kind: 'block'
    },
    {
      type: 'get_card_by_id',
      kind: 'block',
      inputs: {
        ID: {
          shadow: {
            type: 'math_number',
            fields: {
              NUM: 1
            }
          }
        },
      }
    },
    {
      type: 'clone_card',
      kind: 'block',
      inputs: {
        NAME: {
          shadow: {
            type: 'text',
            fields: {
              TEXT: ''
            }
          }
        },
      }
    },
    {
      type: 'print_card',
      kind: 'block',
      inputs: {
        NAME: {
          shadow: {
            type: 'text',
            fields: {
              TEXT: ''
            }
          }
        },
      }
    },
    {
      type: 'draw_n_cards',
      kind: 'block',
      inputs: {
        NUMBER: {
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
      type: 'card_add_subcards',
      kind: 'block'
    },
  ]
};
