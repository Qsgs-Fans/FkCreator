import gen_basic from './basic';
import gen_gameevent_hp from './gameevent_hp';
import gen_gameevent_judge from './gameevent_judge';
import gen_player from './player'

export default () => {
  gen_basic();
  gen_gameevent_hp();
  gen_player();
  gen_gameevent_judge();
};
