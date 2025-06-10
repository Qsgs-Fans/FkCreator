import tb_flow from '../toolbox_categories/flow';
import tb_expression from '../toolbox_categories/expression';
import tb_math from '../toolbox_categories/math';
import tb_text from '../toolbox_categories/text';
import tb_list from '../toolbox_categories/list';

import tb_card from '../toolbox_categories/card';
import tb_player from '../toolbox_categories/player';

import tb_gameflow_hp from '../toolbox_categories/gameevent_hp';
import tb_gameflow_judge from '../toolbox_categories/gameevent_judge';

export default {
  kind: 'categoryToolbox',
  contents: [
    tb_flow,
    tb_expression,
    tb_math,
    tb_text,
    tb_list,
    { kind: 'sep' },
    {
      kind: 'category',
      name: '该方法的变量',
      custom: 'METHOD_PARAMS',
      categorystyle: 'variable_category'
    },
    {
      kind: 'category',
      name: '自定义变量',
      custom: 'VARIABLE_DYNAMIC',
      categorystyle: 'variable_category'
    },
    {
      kind: 'category',
      name: '自定义函数',
      custom: 'PROCEDURE',
      categorystyle: 'procedure_category'
    },
    { kind: 'sep' },
    tb_card,
    tb_player,
    { kind: 'sep' },
    tb_gameflow_hp,
    tb_gameflow_judge
  ]
};
