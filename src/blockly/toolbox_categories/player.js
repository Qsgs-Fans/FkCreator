export default {
  kind: 'category',
  name: '角色信息读取',
  colour: '#EE2488',
  contents: [
    {
      type: 'player_property_read',
      kind: 'block'
    },
    {
      type: 'player_property_read_by_fn',
      kind: 'block'
    },
    {
      type: 'player_get_card_ids',
      kind: 'block'
    },
    {
      type: 'player_used_times',
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
      type: 'player_has_skill',
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
      type: 'player_has_delay',
      kind: 'block'
    },
    {
      type: 'player_get_mark',
      kind: 'block'
    },
    {
      type: 'player_get_pile',
      kind: 'block'
    },
    {
      type: 'player_distance_to',
      kind: 'block'
    },
    {
      type: 'player_in_attack_range',
      kind: 'block'
    },
  ]
};
