/* TODO 通用effect字段
  ---@class SkillSpec
  ---@field public name? string @ 技能名
  ---@field public mute? boolean @ 决定是否关闭技能配音
  ---@field public no_indicate? boolean @ 决定是否关闭技能指示线
  ---@field public anim_type? string|AnimationType @ 技能类型定义
  ---@field public global? boolean @ 决定是否是全局技能
*/

export const effectTypes = [
  {
    id: 'distance',
    name: '距离类',
    description: '用于影响角色之间计算距离',
    template: {
      methods: [
        {
          name: 'correct_func',
          description: '修改从from到to的距离计算值，返回一个数，正数表示增加距离计算，负数反之',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'TargetModSkill'
            },
            {
              name: 'from',
              message: '来源角色',
              type: 'Player'
            },
            {
              name: 'to',
              message: '目标角色',
              type: 'Player'
            }
          ],
          ret: 'number',
          blockData: null
        },
        {
          name: 'fixed_func',
          description: '将from到to的距离设为固定值，返回的数值即为新距离',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'TargetModSkill'
            },
            {
              name: 'from',
              message: '来源角色',
              type: 'Player'
            },
            {
              name: 'to',
              message: '目标角色',
              type: 'Player'
            }
          ],
          ret: 'number',
          blockData: null
        }
      ]
    }
  },
  {
    id: 'prohibit',
    name: '禁止类',
    description: '用于禁止某角色成为某卡牌目标、禁止使用打出弃置拼点',
    template: {
      methods: [
        {
          name: 'is_prohibited',
          description: '令from不能使用card指定to为目标',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ProhibitSkill'
            },
            {
              name: 'from',
              message: '来源角色',
              type: 'Player'
            },
            {
              name: 'to',
              message: '目标角色',
              type: 'Player'
            },
            {
              name: 'card',
              message: '相关卡牌',
              type: 'Card'
            }
          ],
          ret: 'bool',
          blockData: null
        },
        {
          name: 'prohibit_use',
          description: '令player不能使用card',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ProhibitSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'card',
              message: '相关卡牌',
              type: 'Card'
            }
          ],
          ret: 'bool',
          blockData: null
        },
        {
          name: 'prohibit_response',
          description: '令player不能打出card',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ProhibitSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'card',
              message: '相关卡牌',
              type: 'Card'
            }
          ],
          ret: 'bool',
          blockData: null
        },
        {
          name: 'prohibit_discard',
          description: '令player不能弃置card',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ProhibitSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'card',
              message: '相关卡牌',
              type: 'Card'
            }
          ],
          ret: 'bool',
          blockData: null
        },
        {
          name: 'prohibit_pindian',
          description: '令from不能对to拼点',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ProhibitSkill'
            },
            {
              name: 'from',
              message: '来源角色',
              type: 'Player'
            },
            {
              name: 'to',
              message: '目标角色',
              type: 'Player'
            }
          ],
          ret: 'bool',
          blockData: null
        }
      ]
    }
  },


  // ---@class AttackRangeSpec: StatusSkillSpec
  // ---@field public correct_func? fun(self: AttackRangeSkill, from: Player, to: Player): number?
  // ---@field public fixed_func? fun(self: AttackRangeSkill, player: Player): number?  @ 判定角色的锁定攻击范围初值
  // ---@field public final_func? fun(self: AttackRangeSkill, player: Player): number?  @ 判定角色的锁定攻击范围终值
  // ---@field public within_func? fun(self: AttackRangeSkill, from: Player, to: Player): any @ 判定to角色是否锁定在角色from攻击范围内
  // ---@field public without_func? fun(self: AttackRangeSkill, from: Player, to: Player): any @ 判定to角色是否锁定在角色from攻击范围外
  {
    id: 'atkrange',
    name: '攻击范围类',
    description: '用于影响某角色的攻击范围计算',
    template: {
      methods: [
        {
          name: 'correct_func',
          description: '修改from的攻击范围，返回一个数，正数表示增加攻击范围，负数反之',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'AttackRangeSkill'
            },
            {
              name: 'from',
              message: '来源角色',
              type: 'Player'
            },
            {
              name: 'to',
              message: '目标角色',
              type: 'Player'
            }
          ],
          ret: 'number',
          blockData: null
        },
        {
          name: 'fixed_func',
          description: '将from的攻击范围设为固定值，返回的数值即为新攻击范围',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'AttackRangeSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            }
          ],
          ret: 'number',
          blockData: null
        },
        {
          name: 'final_func',
          description: '判定角色的锁定攻击范围终值',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'AttackRangeSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            }
          ],
          ret: 'number',
          blockData: null
        },
        {
          name: 'within_func',
          description: '判定to角色是否锁定在角色from攻击范围内',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'AttackRangeSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'to',
              message: '目标角色',
              type: 'Player'
            }
          ],
          ret: 'any',
          blockData: null
        },
        {
          name: 'without_func',
          description: '判定to角色是否锁定在角色from攻击范围外',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'AttackRangeSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'to',
              message: '目标角色',
              type: 'Player'
            }
          ],
          ret: 'any',
          blockData: null
        }
      ]
    }
  },

  //   ---@class MaxCardsSpec: StatusSkillSpec
  // ---@field public correct_func? fun(self: MaxCardsSkill, player: Player): number? @ 修正角色的手牌上限
  // ---@field public fixed_func? fun(self: MaxCardsSkill, player: Player): number? @ 角色的手牌上限固定值
  // ---@field public exclude_from? fun(self: MaxCardsSkill, player: Player, card: Card): any @ 判定某牌是否不计入手牌上限

  {
    id: 'maxcards',
    name: '手牌上限类',
    description: '用于影响某角色的手牌上限计算',
    template: {
      methods: [
        {
          name: 'correct_func',
          description: '修正角色的手牌上限',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'MaxCardsSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            }
          ],
          ret: 'number',
          blockData: null
        },
        {
          name: 'fixed_func',
          description: '角色的手牌上限固定值',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'MaxCardsSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            }
          ],
          ret: 'number',
          blockData: null
        },
        {
          name: 'exclude_from',
          description: '判定某牌是否不计入手牌上限',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'MaxCardsSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'card',
              message: '相关卡牌',
              type: 'Card'
            }
          ],
          ret: 'any',
          blockData: null
        },
      ]
    }
  },


  //   ---@class TargetModSpec: StatusSkillSpec
  // ---@field public bypass_times? fun(self: TargetModSkill, player: Player, skill: ActiveSkill, scope: integer, card?: Card, to?: Player): any  角色使用牌是否无次数限制
  // ---@field public residue_func? fun(self: TargetModSkill, player: Player, skill: ActiveSkill, scope: integer, card?: Card, to?: Player): number? @ 角色使用牌的剩余次数
  // ---@field public fix_times_func? fun(self: TargetModSkill, player: Player, skill: ActiveSkill, scope: integer, card?: Card, to?: Player): number? @ 角色使用牌的固定次数
  // ---@field public bypass_distances? fun(self: TargetModSkill, player: Player, skill: ActiveSkill, card?: Card, to?: Player): any @ 角色使用牌是否无距离限制
  // ---@field public distance_limit_func? fun(self: TargetModSkill, player: Player, skill: ActiveSkill, card?: Card, to?: Player): number? @ 角色使用牌的距离限制
  // ---@field public extra_target_func? fun(self: TargetModSkill, player: Player, skill: ActiveSkill, card?: Card): number? @ 角色使用牌的额外目标数
  // ---@field public target_tip_func? fun(self: TargetModSkill, player: Player, to_select: Player, selected: Player[], selected_cards: integer[], card?: Card, selectable: boolean, extra_data: any): string|TargetTipDataSpec? @ 角色使用牌的目标提示

  {
    id: 'targetmod',
    name: '卡牌增强类',
    description: '用于增强卡牌（无视距离次数限制等）',
    template: {
      methods: [
        {
          name: 'bypass_times',
          description: '角色使用牌是否无次数限制',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'TargetModSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'skill',
              message: '技能',
              type: 'ActiveSkill'
            },
            {
              name: 'scope',
              message: '作用范围',
              type: 'integer'
            },
            {
              name: 'card',
              message: '相关卡牌',
              type: 'Card'
            },
            {
              name: 'to',
              message: '目标角色',
              type: 'Player'
            }
          ],
          ret: 'any',
          blockData: null
        },
        {
          name: 'residue_func',
          description: '角色使用牌的剩余次数',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'TargetModSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'skill',
              message: '技能',
              type: 'ActiveSkill'
            },
            {
              name: 'scope',
              message: '作用范围',
              type: 'integer'
            },
            {
              name: 'card',
              message: '相关卡牌',
              type: 'Card'
            },
            {
              name: 'to',
              message: '目标角色',
              type: 'Player'
            }
          ],
          ret: 'number',
          blockData: null
        },
        {
          name: 'fix_times_func',
          description: '角色使用牌的固定次数',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'TargetModSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'skill',
              message: '技能',
              type: 'ActiveSkill'
            },
            {
              name: 'scope',
              message: '作用范围',
              type: 'integer'
            },
            {
              name: 'card',
              message: '相关卡牌',
              type: 'Card'
            },
            {
              name: 'to',
              message: '目标角色',
              type: 'Player'
            }
          ],
          ret: 'number',
          blockData: null
        },
        {
          name: 'bypass_distances',
          description: '角色使用牌是否无距离限制',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'TargetModSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'skill',
              message: '技能',
              type: 'ActiveSkill'
            },
            {
              name: 'card',
              message: '相关卡牌',
              type: 'Card'
            },
            {
              name: 'to',
              message: '目标角色',
              type: 'Player'
            }
          ],
          ret: 'any',
          blockData: null
        },
        {
          name: 'distance_limit_func',
          description: '角色使用牌的距离限制',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'TargetModSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'skill',
              message: '技能',
              type: 'ActiveSkill'
            },
            {
              name: 'card',
              message: '相关卡牌',
              type: 'Card'
            },
            {
              name: 'to',
              message: '目标角色',
              type: 'Player'
            }
          ],
          ret: 'number',
          blockData: null
        },
        {
          name: 'extra_target_func',
          description: '角色使用牌的额外目标数',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'TargetModSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'skill',
              message: '技能',
              type: 'ActiveSkill'
            },
            {
              name: 'card',
              message: '相关卡牌',
              type: 'Card'
            }
          ],
          ret: 'number',
          blockData: null
        },
        {
          name: 'target_tip_func',
          description: '角色使用牌的目标提示',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'TargetModSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'to_select',
              message: '待选择的目标角色',
              type: 'Player'
            },
            {
              name: 'selected',
              message: '已选角色',
              type: 'Player[]'
            },
            {
              name: 'selected_cards',
              message: '已选卡牌',
              type: 'integer[]'
            },
            {
              name: 'card',
              message: '相关卡牌',
              type: 'Card'
            },
            {
              name: 'selectable',
              message: '是否可选',
              type: 'boolean'
            },
            {
              name: 'extra_data',
              message: '额外数据',
              type: 'any'
            }
          ],
          ret: 'string|TargetTipDataSpec',
          blockData: null
        }
      ]
    }
  },

  //   ---@class FilterSpec: StatusSkillSpec
  // ---@field public card_filter? fun(self: FilterSkill, card: Card, player: Player, isJudgeEvent: boolean?): any @ 卡牌筛选
  // ---@field public view_as? fun(self: FilterSkill, player: Player, card: Card): Card? @ 视为某牌
  // ---@field public equip_skill_filter? fun(self: FilterSkill, skill: Skill, player: Player): string? 装备技能筛选
  // ---@field public handly_cards? fun(self: FilterSkill, player: Player): integer[]? @ 视为拥有可以如手牌般使用或打出的牌
  {
    id: 'filter',
    name: '视为类',
    description: '用于将某牌视为另一牌名的牌（红颜、武神等）',
    template: {
      methods: [
        {
          name: 'card_filter',
          description: '卡牌筛选',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'FilterSkill'
            },
            {
              name: 'card',
              message: '相关卡牌',
              type: 'Card'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            }
          ],
          ret: 'any',
          blockData: null
        },
        {
          name: 'view_as',
          description: '视为某牌',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'FilterSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'card',
              message: '相关卡牌',
              type: 'Card'
            }
          ],
          ret: 'Card?',
          blockData: null
        },
        {
          name: 'equip_skill_filter',
          description: '装备技能筛选',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'FilterSkill'
            },
            {
              name: 'skill',
              message: '技能',
              type: 'Skill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            }
          ],
          ret: 'string?',
          blockData: null
        },
        {
          name: 'handly_cards',
          description: '视为拥有可以如手牌般使用或打出的牌',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'FilterSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            }
          ],
          ret: 'integer[]?',
          blockData: null
        }
      ]
    }
  },

  // ---@class InvaliditySpec: StatusSkillSpec
  // ---@field public invalidity_func? fun(self: InvaliditySkill, from: Player, skill: Skill): any @ 判定角色的技能是否无效
  // ---@field public invalidity_attackrange? fun(self: InvaliditySkill, player: Player, card: Weapon): any @ 判定武器的攻击范围是否无效
  // ---@field public recheck_invalidity? boolean @ 是否涉及其他技能的失效性

  {
    id: 'invalidity',
    name: '失效类',
    description: '用于使某角色技能在某条件下失效',
    template: {
      methods: [
        {
          name: 'invalidity_func',
          description: '判定角色的技能是否无效',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'InvaliditySkill'
            },
            {
              name: 'from',
              message: '来源角色',
              type: 'Player'
            },
            {
              name: 'skill',
              message: '技能',
              type: 'Skill'
            }
          ],
          ret: 'any',
          blockData: null
        },
        {
          name: 'invalidity_attackrange',
          description: '判定武器的攻击范围是否无效',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'InvaliditySkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'card',
              message: '武器',
              type: 'Weapon'
            }
          ],
          ret: 'any',
          blockData: null
        }
      ]
    }
  },


  //   ---@class VisibilitySpec: StatusSkillSpec
  // ---@field public card_visible? fun(self: VisibilitySkill, player: Player, card: Card): any @ 判定角色是否可以看到某牌
  // ---@field public role_visible? fun(self: VisibilitySkill, player: Player, target: Player): any @ 判定角色是否可以看到某角色的身份
  {
    id: 'visibility',
    name: '可见类',
    description: '用于控制客户端是否应该可以观看到某牌（用于明牌）',
    template: {
      methods: [
        {
          name: 'card_visible',
          description: '判定角色是否可以看到某牌',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'VisibilitySkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'card',
              message: '相关卡牌',
              type: 'Card'
            }
          ],
          ret: 'any',
          blockData: null
        },
        {
          name: 'role_visible',
          description: '判定角色是否可以看到某角色的身份',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'VisibilitySkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'target',
              message: '目标角色',
              type: 'Player'
            }
          ],
          ret: 'any',
          blockData: null
        }
      ]
    }
  },

  // ---@class ActiveSkillSpec: UsableSkillSpec
  // ---@field public can_use? fun(self: ActiveSkill, player: Player): any @ 判断主动技能否可以发动
  // ---@field public card_filter? fun(self: ActiveSkill, player: Player, to_select: integer, selected: integer[]): any @ 判断卡牌能否选择
  // ---@field public target_filter? fun(self: ActiveSkill, player: Player?, to_select: Player, selected: Player[], selected_cards: integer[]): any @ 判定目标能否选择
  // ---@field public feasible? fun(self: ActiveSkill, player: Player, selected: Player[], selected_cards: integer[], card: Card): any @ 判断卡牌和目标是否符合技能限制
  // ---@field public on_use? fun(self: ActiveSkill, room: Room, skillUseEvent: SkillUseData): any @ 使用技能时的效果
  // ---@field public prompt? string|fun(self: ActiveSkill, player: Player, selected_cards: integer[], selected_targets: Player[]): string @ 提示信息
  // ---@field public interaction? fun(self: ActiveSkill, player: Player): table? @ 选项框
  // ---@field public target_tip? fun(self: ActiveSkill, player: Player, to_select: Player, selected: Player[], selected_cards: integer[], card?: Card, selectable: boolean, extra_data: any): string|TargetTipDataSpec? @ 目标提示


  {
    id: 'active',
    name: '主动类',
    description: '用于创建主动型技能（制衡、苦肉等）',
    template: {
      methods: [
        {
          name: 'can_use',
          description: '判断主动技能否可以发动',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ActiveSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            }
          ],
          ret: 'any',
          blockData: null
        },
        {
          name: 'card_filter',
          description: '判断卡牌能否选择',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ActiveSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'to_select',
              message: '选择的卡牌数量',
              type: 'integer'
            },
            {
              name: 'selected',
              message: '已选卡牌',
              type: 'integer[]'
            }
          ],
          ret: 'any',
          blockData: null
        },
        {
          name: 'target_filter',
          description: '判定目标能否选择',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ActiveSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player?'
            },
            {
              name: 'to_select',
              message: '待选择的目标角色',
              type: 'Player'
            },
            {
              name: 'selected',
              message: '已选角色',
              type: 'Player[]'
            },
            {
              name: 'selected_cards',
              message: '已选卡牌',
              type: 'integer[]'
            }
          ],
          ret: 'any',
          blockData: null
        },
        {
          name: 'feasible',
          description: '判断卡牌和目标是否符合技能限制',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ActiveSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'selected',
              message: '已选角色',
              type: 'Player[]'
            },
            {
              name: 'selected_cards',
              message: '已选卡牌',
              type: 'integer[]'
            },
            {
              name: 'card',
              message: '相关卡牌',
              type: 'Card'
            }
          ],
          ret: 'any',
          blockData: null
        },
        {
          name: 'on_use',
          description: '使用技能时的效果',
          type: 'server',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ActiveSkill'
            },
            {
              name: 'room',
              message: '所在房间',
              type: 'Room'
            },
            {
              name: 'skillUseEvent',
              message: '技能使用事件',
              type: 'SkillUseData'
            }
          ],
          ret: 'any',
          blockData: null
        },
        {
          name: 'prompt',
          description: '提示信息',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ActiveSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'selected_cards',
              message: '已选卡牌',
              type: 'integer[]'
            },
            {
              name: 'selected_targets',
              message: '已选目标',
              type: 'Player[]'
            }
          ],
          ret: 'string',
          blockData: null
        },
        {
          name: 'interaction',
          description: '选项框',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ActiveSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            }
          ],
          ret: 'table?',
          blockData: null
        },
        {
          name: 'target_tip',
          description: '目标提示',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ActiveSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'to_select',
              message: '待选择的目标角色',
              type: 'Player'
            },
            {
              name: 'selected',
              message: '已选角色',
              type: 'Player[]'
            },
            {
              name: 'selected_cards',
              message: '已选卡牌',
              type: 'integer[]'
            },
            {
              name: 'card',
              message: '相关卡牌',
              type: 'Card?'
            },
            {
              name: 'selectable',
              message: '是否可选',
              type: 'boolean'
            },
            {
              name: 'extra_data',
              message: '额外数据',
              type: 'any'
            }
          ],
          ret: 'string|TargetTipDataSpec?',
          blockData: null
        }
      ]
    }
  },



  // ---@class CardSkillSpec: UsableSkillSpec
  // ---@field public mod_target_filter? fun(self: ActiveSkill, player: Player, to_select: Player, selected: Player[], card: Card, extra_data: any): any @ 判定目标是否合法（例如不能杀自己，火攻无手牌目标）
  // ---@field public target_filter? fun(self: CardSkill, player: Player?, to_select: Player, selected: Player[], selected_cards: integer[], card?: Card, extra_data: any): any @ 判定目标能否选择
  // ---@field public feasible? fun(self: CardSkill, player: Player, selected: Player[], selected_cards: integer[]): any @ 判断卡牌和目标是否符合技能限制
  // ---@field public can_use? fun(self: CardSkill, player: Player, card: Card, extra_data: any): any @ 判断主动技能否发动
  // ---@field public on_use? fun(self: CardSkill, room: Room, cardUseEvent: UseCardData): any @ 使用技能时的效果
  // ---@field public fix_targets? fun(self: CardSkill, player: Player, card: Card, extra_data: any): Player[]? @ 设置固定目标
  // ---@field public on_action? fun(self: CardSkill, room: Room, cardUseEvent: UseCardData, finished: boolean): any  卡牌额外效果（卡牌效果执行前或执行后生效）
  // ---@field public about_to_effect? fun(self: CardSkill, room: Room, effect: CardEffectData): boolean? @ 生效前判断，返回true则取消效果
  // ---@field public on_effect? fun(self: CardSkill, room: Room, effect: CardEffectData): any @ 卡牌效果
  // ---@field public on_nullified? fun(self: CardSkill, room: Room, effect: CardEffectData): any @ (仅用于延时锦囊)被抵消时执行内容
  // ---@field public offset_func? fun(self: CardSkill, room: Room, effect: CardEffectData): any @ 卡牌生效前，询问抵消（默认杀询问闪，锦囊询问无懈）
  // ---@field public prompt? string|fun(self: ActiveSkill, player: Player, selected_cards: integer[], selected_targets: Player[], extra_data: any): string @ 提示信息
  // ---@field public target_tip? fun(self: ActiveSkill, player: Player, to_select: Player, selected: Player[], selected_cards: integer[], card?: Card, selectable: boolean, extra_data: any): string|TargetTipDataSpec? @ 目标提示

  {
    id: 'cardskill',
    name: '卡牌类',
    description: '与主动类类似，但是针对卡牌进行特化（卡牌的效果就是通过主动技实现的）',
    template: {
      methods: [
        {
          name: 'mod_target_filter',
          description: '判定目标是否合法（例如不能杀自己，火攻无手牌目标）',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ActiveSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'to_select',
              message: '待选择的目标角色',
              type: 'Player'
            },
            {
              name: 'selected',
              message: '已选角色',
              type: 'Player[]'
            },
            {
              name: 'card',
              message: '相关卡牌',
              type: 'Card'
            },
            {
              name: 'extra_data',
              message: '额外数据',
              type: 'any'
            }
          ],
          ret: 'any',
          blockData: null
        },
        {
          name: 'target_filter',
          description: '判定目标能否选择',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'CardSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player?'
            },
            {
              name: 'to_select',
              message: '待选择的目标角色',
              type: 'Player'
            },
            {
              name: 'selected',
              message: '已选角色',
              type: 'Player[]'
            },
            {
              name: 'selected_cards',
              message: '已选卡牌',
              type: 'integer[]'
            },
            {
              name: 'card',
              message: '相关卡牌',
              type: 'Card?'
            },
            {
              name: 'extra_data',
              message: '额外数据',
              type: 'any'
            }
          ],
          ret: 'any',
          blockData: null
        },
        {
          name: 'feasible',
          description: '判断卡牌和目标是否符合技能限制',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'CardSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'selected',
              message: '已选角色',
              type: 'Player[]'
            },
            {
              name: 'selected_cards',
              message: '已选卡牌',
              type: 'integer[]'
            }
          ],
          ret: 'any',
          blockData: null
        },
        {
          name: 'can_use',
          description: '判断主动技能否发动',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'CardSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'card',
              message: '相关卡牌',
              type: 'Card'
            },
            {
              name: 'extra_data',
              message: '额外数据',
              type: 'any'
            }
          ],
          ret: 'any',
          blockData: null
        },
        {
          name: 'on_use',
          description: '使用技能时的效果',
          type: 'server',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'CardSkill'
            },
            {
              name: 'room',
              message: '所在房间',
              type: 'Room'
            },
            {
              name: 'cardUseEvent',
              message: '卡牌使用事件',
              type: 'UseCardData'
            }
          ],
          ret: 'any',
          blockData: null
        },
        {
          name: 'fix_targets',
          description: '设置固定目标',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'CardSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'card',
              message: '相关卡牌',
              type: 'Card'
            },
            {
              name: 'extra_data',
              message: '额外数据',
              type: 'any'
            }
          ],
          ret: 'Player[]?',
          blockData: null
        },
        {
          name: 'on_action',
          description: '卡牌额外效果（卡牌效果执行前或执行后生效）',
          type: 'server',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'CardSkill'
            },
            {
              name: 'room',
              message: '所在房间',
              type: 'Room'
            },
            {
              name: 'cardUseEvent',
              message: '卡牌使用事件',
              type: 'UseCardData'
            },
            {
              name: 'finished',
              message: '卡牌效果是否已执行',
              type: 'boolean'
            }
          ],
          ret: 'any',
          blockData: null
        },
        {
          name: 'about_to_effect',
          description: '生效前判断，返回true则取消效果',
          type: 'server',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'CardSkill'
            },
            {
              name: 'room',
              message: '所在房间',
              type: 'Room'
            },
            {
              name: 'effect',
              message: '效果数据',
              type: 'CardEffectData'
            }
          ],
          ret: 'boolean?',
          blockData: null
        },
        {
          name: 'on_effect',
          description: '卡牌效果',
          type: 'server',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'CardSkill'
            },
            {
              name: 'room',
              message: '所在房间',
              type: 'Room'
            },
            {
              name: 'effect',
              message: '效果数据',
              type: 'CardEffectData'
            }
          ],
          ret: 'any',
          blockData: null
        },
        {
          name: 'on_nullified',
          description: '(仅用于延时锦囊)被抵消时执行内容',
          type: 'server',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'CardSkill'
            },
            {
              name: 'room',
              message: '所在房间',
              type: 'Room'
            },
            {
              name: 'effect',
              message: '效果数据',
              type: 'CardEffectData'
            }
          ],
          ret: 'any',
          blockData: null
        },
        {
          name: 'offset_func',
          description: '卡牌生效前，询问抵消（默认杀询问闪，锦囊询问无懈）',
          type: 'server',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'CardSkill'
            },
            {
              name: 'room',
              message: '所在房间',
              type: 'Room'
            },
            {
              name: 'effect',
              message: '效果数据',
              type: 'CardEffectData'
            }
          ],
          ret: 'any',
          blockData: null
        },
        {
          name: 'prompt',
          description: '提示信息',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ActiveSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'selected_cards',
              message: '已选卡牌',
              type: 'integer[]'
            },
            {
              name: 'selected_targets',
              message: '已选目标',
              type: 'Player[]'
            },
            {
              name: 'extra_data',
              message: '额外数据',
              type: 'any'
            }
          ],
          ret: 'string',
          blockData: null
        },
        {
          name: 'target_tip',
          description: '目标提示',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ActiveSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'to_select',
              message: '待选择的目标角色',
              type: 'Player'
            },
            {
              name: 'selected',
              message: '已选角色',
              type: 'Player[]'
            },
            {
              name: 'selected_cards',
              message: '已选卡牌',
              type: 'integer[]'
            },
            {
              name: 'card',
              message: '相关卡牌',
              type: 'Card?'
            },
            {
              name: 'selectable',
              message: '是否可选',
              type: 'boolean'
            },
            {
              name: 'extra_data',
              message: '额外数据',
              type: 'any'
            }
          ],
          ret: 'string|TargetTipDataSpec?',
          blockData: null
        }
      ]
    }
  },

  // ---@class ViewAsSkillSpec: UsableSkillSpec
  // ---@field public card_filter? fun(self: ViewAsSkill, player: Player, to_select: integer, selected: integer[]): any @ 判断卡牌能否选择
  // ---@field public view_as fun(self: ViewAsSkill, player: Player, cards: integer[]): Card? @ 判断转化为什么牌
  // ---@field public enabled_at_play? fun(self: ViewAsSkill, player: Player): any @ 判断是否可以使用
  // ---@field public enabled_at_response? fun(self: ViewAsSkill, player: Player, response: boolean): any @ 判断是否可以可以响应
  // ---@field public before_use? fun(self: ViewAsSkill, player: ServerPlayer, use: UseCardDataSpec): string? @ 使用/打出前执行的内容，返回字符串则取消此次使用，返回技能名则在本次询问中禁止使用此技能
  // ---@field public after_use? fun(self: ViewAsSkill, player: ServerPlayer, use: UseCardData | RespondCardData): string? @ 使用/打出此牌后执行的内容
  // ---@field public prompt? string|fun(self: ViewAsSkill, player: Player, selected_cards: integer[], selected: Player[]): string @ 使用时的提示信息
  // ---@field public interaction? fun(self: ViewAsSkill, player: Player): table? @ 选项框
  // ---@field public enabled_at_nullification? fun(self: ViewAsSkill, player: Player, data: CardEffectData): boolean? @ 判断一张牌是否能被此技能转化无懈来响应


  {
    id: 'viewas',
    name: '转化类',
    description: '用于将一张牌当另一张牌使用打出（武圣、倾国等）',
    template: {
      methods: [
        {
          name: 'card_filter',
          description: '判断卡牌能否选择',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ViewAsSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'to_select',
              message: '待选择的卡牌',
              type: 'integer'
            },
            {
              name: 'selected',
              message: '已选卡牌',
              type: 'integer[]'
            }
          ],
          ret: 'any',
          blockData: null
        },
        {
          name: 'view_as',
          description: '判断转化成什么牌',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ViewAsSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'cards',
              message: '待转化的卡牌',
              type: 'integer[]'
            }
          ],
          ret: 'Card?',
          blockData: null
        },
        {
          name: 'enabled_at_play',
          description: '判断是否可以使用',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ViewAsSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            }
          ],
          ret: 'any',
          blockData: null
        },
        {
          name: 'enabled_at_response',
          description: '判断是否可以可以响应',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ViewAsSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'response',
              message: '是否响应',
              type: 'boolean'
            }
          ],
          ret: 'any',
          blockData: null
        },
        {
          name: 'before_use',
          description: '使用/打出前执行的内容，返回字符串则取消此次使用，返回技能名则在本次询问中禁止使用此技能',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ViewAsSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'ServerPlayer'
            },
            {
              name: 'use',
              message: '卡牌使用数据',
              type: 'UseCardDataSpec'
            }
          ],
          ret: 'string?',
          blockData: null
        },
        {
          name: 'after_use',
          description: '使用/打出此牌后执行的内容',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ViewAsSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'ServerPlayer'
            },
            {
              name: 'use',
              message: '卡牌使用数据',
              type: 'UseCardData | RespondCardData'
            }
          ],
          ret: 'string?',
          blockData: null
        },
        {
          name: 'prompt',
          description: '使用时的提示信息',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ViewAsSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'selected_cards',
              message: '已选卡牌',
              type: 'integer[]'
            },
            {
              name: 'selected',
              message: '已选角色',
              type: 'Player[]'
            }
          ],
          ret: 'string',
          blockData: null
        },
        {
          name: 'interaction',
          description: '选项框',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ViewAsSkill'
            }, {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            }],
          ret: 'table?',
          blockData: null
        },
        {
          name: 'enabled_at_nullification',
          description: '判断一张牌是否能被此技能转化无懈来响应',
          type: 'client',
          params: [
            {
              name: 'self',
              message: '本技能',
              type: 'ViewAsSkill'
            },
            {
              name: 'player',
              message: '相关角色',
              type: 'Player'
            },
            {
              name: 'data',
              message: '效果数据',
              type: 'CardEffectData'
            }
          ],
          ret: 'boolean?',
          blockData: null
        }
      ]
    }
  }
];

/**
 * 获取指定效果类型的模板
 * @param effectType
 * @returns 模板
 */
export const getTemplateByEffectType = (effectType) => {
  const effect = effectTypes.find((e) => e.id === effectType);
  if (!effect) {
    throw new Error(`Unknown effect type: ${effectType}`);
  }
  return effect.template;
};
