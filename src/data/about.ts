/*
 * 关于页内容 —— 自我介绍、经历时间线、技能。
 * 全部是占位文本，替换成真实内容即可，结构不用动。
 */
export interface TimelineItem {
  year: string;
  title: string;
  desc: string;
}

export interface Skill {
  name: string;
  level: '熟练' | '了解';
}

export const INTRO: string[] = [
  '这里是自我介绍（占位）。用两到三段话介绍你的背景、专注方向与兴趣——比如如何进入开发、最享受解决哪类问题。',
  '第二段占位：补充你的经历亮点、代表性成果或合作方式偏好，让访客在进入作品页前先了解“你是谁”。',
  '第三段占位：可写一句个人信念或联系方式引导（完整联系信息在“联系”页）。',
];

export const TIMELINE: TimelineItem[] = [
  {
    year: '20XX',
    title: '开始写代码',
    desc: '待填写：第一门语言、第一个小项目、为什么开始。',
  },
  {
    year: '20XX',
    title: '转向 AI 应用与自动化',
    desc: '待填写：这一阶段做过的代表性工作、用到的技术栈。',
  },
  {
    year: '20XX – 现在',
    title: '当前专注方向',
    desc: '待填写：现在主要在做的事，以及想找什么样的机会。',
  },
];

export const SKILLS: Skill[] = [
  { name: '技能一（待填写）', level: '熟练' },
  { name: '技能二（待填写）', level: '熟练' },
  { name: '技能三（待填写）', level: '了解' },
  { name: '技能四（待填写）', level: '了解' },
];
