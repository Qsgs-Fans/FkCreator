import { luaGenerator, Order } from 'blockly/lua';

export default () => {
  luaGenerator.forBlock['predefined_card_suit_space'] = () => ['Card.Spade', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_suit_club'] = () => ['Card.Club', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_suit_heart'] = () => ['Card.Heart', Order.ATOMIC];
  luaGenerator.forBlock['predefined_card_suit_diamond'] = () => ['Card.Diamond', Order.ATOMIC];
}