import { luaGenerator, Order } from 'blockly/lua';

export default () => {
  luaGenerator.forBlock['predefined_card_suit_space'] = () => ['Card.Spade', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_suit_club'] = () => ['Card.Club', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_suit_heart'] = () => ['Card.Heart', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_suit_diamond'] = () => ['Card.Diamond', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_suit_nosuit'] = () => ['Card.NoSuit', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_color_black'] = () => ['Card.Black', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_color_red'] = () => ['Card.Red', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_type_basic'] = () => ['Card.TypeBasic', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_type_trick'] = () => ['Card.TypeTrick', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_type_equip'] = () => ['Card.TypeEquip', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_subtype_none'] = () => ['Card.SubtypeNone', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_subtype_delayedtrick'] = () => ['Card.SubtypeDelayedtrick', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_subtype_weapon'] = () => ['Card.SubtypeWeapon', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_subtype_armor'] = () => ['Card.SubtypeArmor', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_subtype_defensive_ride'] = () => ['Card.SubtypeDefensiveRide', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_subtype_offensive_ride'] = () => ['Card.SubtypeOffensiveRide', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_subtype_treasure'] = () => ['Card.SubtypeTreasure', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_unknown'] = () => ['Card.Unknown', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_player_hand'] = () => ['Card.PlayerHand', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_player_equip'] = () => ['Card.PlayerEquip', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_player_judge'] = () => ['Card.PlayerJudge', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_player_special'] = () => ['Card.PlayerSpecial', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_processing'] = () => ['Card.Processing', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_draw_pile'] = () => ['Card.DrawPile', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_discard_pile'] = () => ['Card.DiscardPile', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_void'] = () => ['Card.Void', Order.ATOMIC];
}
