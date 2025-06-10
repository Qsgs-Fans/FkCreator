export default {
  kind: 'category',
  name: '分支与循环',
  categorystyle: 'logic_category',
  contents: [
    {
      type: 'controls_if',
      kind: 'block'
    },
    {
      type: 'controls_repeat_ext',
      kind: 'block',
      inputs: {
        TIMES: {
          shadow: {
            type: 'math_number',
            fields: {
              NUM: 10
            }
          }
        }
      }
    },
    {
      type: 'controls_repeat',
      kind: 'block',
      enabled: false,
      fields: {
        TIMES: 10
      }
    },
    {
      type: 'controls_whileUntil',
      kind: 'block',
      fields: {
        MODE: 'WHILE'
      }
    },
    {
      type: 'controls_for',
      kind: 'block',
      fields: {
        VAR: {
          name: 'i'
        }
      },
      inputs: {
        FROM: {
          shadow: {
            type: 'math_number',
            fields: {
              NUM: 1
            }
          }
        },
        TO: {
          shadow: {
            type: 'math_number',
            fields: {
              NUM: 10
            }
          }
        },
        BY: {
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
      type: 'controls_forEach',
      kind: 'block',
      fields: {
        VAR: {
          name: 'j'
        }
      }
    },
    {
      type: 'controls_flow_statements',
      kind: 'block',
      // enabled: false,
      fields: {
        FLOW: 'BREAK'
      }
    }
  ]
};
