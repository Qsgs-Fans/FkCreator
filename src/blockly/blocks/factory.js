import * as Blockly from 'blockly';

/**
 * 创建一个支持可选字段配置的 Blockly 块定义（含mutator）
 * @param {Object} options 主块及mutator配置
 * @returns {Array} 含主块、mutator块的JSON定义数组（主块需要额外注册mutator）
 */
export function createConfigurableBlock({
  type,
  message,
  args,
  colour,
  tooltip,
  output,
  optionalFields = [], // [{ type: 'source', message: '来源', inputType: 'input_value', name: 'SOURCE', check: 'Player' }]
  dropdowns = {} // e.g. { DAMAGE_TYPE: [['普', 'normal'], ['火', 'fire']] }
}) {
  const blockJson = {
    type,
    message0: message,
    args0: args,
    inputsInline: false,
    // previousStatement: null,
    // nextStatement: null,
    colour,
    tooltip,
    output,
    helpUrl: ''
  };

  if (!output) {
    blockJson.previousStatement = null;
    blockJson.nextStatement = null;
  }

  const mutatorMixin = {
    mutationToDom() {
      const container = document.createElement('mutation');
      optionalFields.forEach((field) => {
        container.setAttribute(`has_${field.name}`, this[`has_${field.name}_`] ? 'true' : 'false');
      });
      return container;
    },
    domToMutation(xmlElement) {
      optionalFields.forEach((field) => {
        this[`has_${field.name}_`] = xmlElement.getAttribute(`has_${field.name.toLowerCase()}`) === 'true';
      });
      this.updateShape_();
    },
    decompose(workspace) {
      const containerBlock = workspace.newBlock(`${type}_mutator_container`);
      containerBlock.initSvg();

      let connection = containerBlock.getInput('STACK').connection;

      optionalFields.forEach((field) => {
        if (this[`has_${field.name}_`]) {
          const block = workspace.newBlock(`${type}_mutator_${field.name.toLowerCase()}`);
          block.initSvg();
          connection.connect(block.previousConnection);
          connection = block.nextConnection;
        }
      });

      return containerBlock;
    },
    compose(containerBlock) {
      optionalFields.forEach((field) => {
        this[`has_${field.name}_`] = false;
      });

      let clauseBlock = containerBlock.getInputTargetBlock('STACK');
      while (clauseBlock) {
        optionalFields.forEach((field) => {
          if (clauseBlock.type === `${type}_mutator_${field.name.toLowerCase()}`) {
            this[`has_${field.name}_`] = true;
          }
        });
        clauseBlock = clauseBlock.getNextBlock();
      }

      this.updateShape_();
    },
    updateShape_() {
      optionalFields.forEach((field) => {
        const hasField = this[`has_${field.name}_`];
        if (!hasField && this.getInput(field.name)) {
          this.removeInput(field.name);
          return;
        }
        if (hasField && !this.getInput(field.name)) {
          let input;
          if (field.inputType === 'input_value') {
            input = this.appendValueInput(field.name)
              .setCheck(field.check)
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField('\n' + field.message);
          } else if (field.inputType === 'dummy_input_dropdown') {
            input = this.appendDummyInput(field.name)
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField('\n' + field.message)
              .appendField(new Blockly.FieldDropdown(dropdowns[field.name]), field.name);
          }
          if (field.shadow) {
            const shadow = Blockly.serialization.blocks.append(field.shadow, this.workspace);
            shadow.setShadow(true);
            input.connection.connect(shadow.outputConnection);
          }
        }
      });
    }
  };
  if (optionalFields.length > 0) {
    blockJson.mutator = `${type}_mutator`;

    const containerBlock = {
      type: `${type}_mutator_container`,
      message0: '更多信息\n%1',
      args0: [{ type: 'input_statement', name: 'STACK' }],
      colour: 260,
      tooltip: '添加可选字段',
      enableContextMenu: false
    };

    const optionalFieldBlocks = optionalFields.map((field) => ({
      type: `${type}_mutator_${field.name.toLowerCase()}`,
      message0: field.message,
      previousStatement: null,
      nextStatement: null,
      colour: 260,
      tooltip: `添加${field.message}字段`,
      enableContextMenu: false
    }));

    Blockly.Extensions.registerMutator(
      `${type}_mutator`,
      mutatorMixin,
      null,
      optionalFieldBlocks.map((f) => f.type)
    );

    return [blockJson, containerBlock, ...optionalFieldBlocks];
  } else {
    return [blockJson];
  }
}
