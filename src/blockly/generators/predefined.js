import { luaGenerator, Order } from 'blockly/lua';

export default () => {
  luaGenerator.forBlock['predefined_card_suit_space'] = () => ['Card.Spade', Order.ATOMIC];
}