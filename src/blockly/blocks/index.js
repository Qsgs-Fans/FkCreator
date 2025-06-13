import basic from './basic';
import card from './card';
import player from './player';
import matcher from './matcher';
import gameevent_hp from './gameevent_hp';
import gameevent_judge from './gameevent_judge';

export default [...basic, ...card, ...player, ...matcher, ...gameevent_hp, ...gameevent_judge];
