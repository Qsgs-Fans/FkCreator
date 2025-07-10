export default {
  kind: 'category',
  name: '武将相关',
  colour: '#EE2488',
  contents: [
    {
      type: 'general_property_read',
      kind: 'block'
    },
    {
      type: 'general_skill_list',
      kind: 'block',
      inputs: {
        LORD: {
          shadow: {
            type: 'logic_boolean',
            fields: {
              BOOL: 'TRUE'
            }
          }
        },
      }
    },
    {
      type: 'get_general_by_name',
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
      type: 'draw_n_generals',
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
      type: 'return_to_general_pile',
      kind: 'block',
    }
  ]
};
