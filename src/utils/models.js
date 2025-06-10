// 基础Mod结构
export const createNewMod = () => ({
  id: `mod_${Date.now()}`,
  name: `mod_${Date.now()}`,
  internal_name: '',
  author: '',
  version: '1.0.0',
  description: '',
  packages: []
});

// 基础Package结构
export const createNewPackage = () => ({
  id: `pkg_${Date.now()}`,
  name: `pkg_${Date.now()}`,
  internal_name: '',
  description: '',
  generals: [],
  skills: []
});

// 基础General结构
export const createNewGeneral = () => ({
  id: `gen_${Date.now()}`,
  name: `gen_${Date.now()}`,
  internal_name: '',

  hp: 4,
  maxHp: 4,
  shield: 0,
  gender: "General.Male",
  kingdom: "wei",

  hidden: false,

  // TODO 后面在ui补上
  designer: "",   // 设计师
  cv: "",         // 声优
  illustrator: "",  // 画师
  title: "",      // 武将的称号
  deathAudio: "", // 阵亡台词
  winAudio: "",   // 胜利台词
  companions: [], // 珠联璧合列表
  headnote: "",   // 头注（？）某些DIY可能用得到
  endnote: "",    // 尾注，一般是实体卡引文。
  //    “孟起虽雄烈过人，亦乃黥布、彭越之徒耳；
  // 当与翼德并驱争先，犹未及美髯公之绝伦超群也。”——诸葛亮

  skills: []
});

// 基础Skill结构
export const createNewSkill = () => ({
  id: `skill_${Date.now()}`,
  name: `skill_${Date.now()}`,
  internal_name: '',
  description: '',

  tags: [],

  // TODO 后面在ui补上
  attached_equip: "",

  effects: []
});

/**
 * 创建一个新的效果对象
 */
export const createNewEffect = (effectData) => {
  const ret = {};
  ret.name = effectData.name;
  ret.description = effectData.description;
  ret.type = effectData.type;
  return ret;
};
