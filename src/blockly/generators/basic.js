import { luaGenerator, Order } from 'blockly/lua';

export default () => {
  luaGenerator.forBlock['function_start'] = function () {
    return 'local room = Fk:currentRoom()\n';
  };
  luaGenerator.forBlock['simple_return'] = function (block, generator) {
    const v = generator.valueToCode(block, 'VALUE', Order.ATOMIC) || 'nil';
    return `return ${v}\n`;
  };
};
