import gen_basic from './basic';
import gen_gameevent_hp from './gameevent_hp';
import gen_gameevent_judge from './gameevent_judge';
import gen_player from './player';
import gen_card from './card';
import gen_matcher from './matcher';

export default () => {
  gen_basic();
  gen_gameevent_hp();
  gen_gameevent_judge();
  gen_player();
  gen_card();
  gen_matcher();
};
