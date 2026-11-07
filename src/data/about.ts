/*
 * 关于页内容 —— 自我介绍、经历时间线、技能。
 * 改文案只用动这个文件，页面结构不用碰。
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

/** 头像放在 public/images/ 下，路径不要带开头的 / */
export const AVATAR = 'images/avatar.jpg';

export const INTRO: string[] = [
  '我是祁玉。2024 年从 Java 后端入门，做完第一个完整的前后端分离项目——汽车美容服务预约平台。角色权限、订单状态机、支付回调这些真正麻烦的部分，都是自己一点点啃下来的。',
  '2025 年开始把重心转向 AI 应用。比起做一个什么都能聊的机器人，我更感兴趣的是把模型接进具体场景：检索自己的文档、筛职位、生成话术，并且尽量让数据留在本机。',
  '现在（2026）在做两个项目：个人知识库和 AI 求职工作台。我习惯把东西做成能真正用起来的工具，而不是停在演示阶段的 demo。',
];

export const TIMELINE: TimelineItem[] = [
  {
    year: '2024',
    title: '第一个 Java 作品',
    desc: '完成汽车美容服务预约平台（本科毕业设计）：Spring Boot + Vue 3 前后端分离，第一次完整处理三角色权限、订单状态机与支付宝回调。',
  },
  {
    year: '2025',
    title: '转向 AI 应用',
    desc: '开始把 LLM 接进自己的工具链，从本地向量检索、RAG 问答做到 Prompt 设计与调用成本控制，重心从「写接口」转向「用模型解决具体问题」。',
  },
  {
    year: '2026',
    title: '现在',
    desc: '做个人知识库与 AI 求职工作台：一个把资料留在本机的检索与问答系统，一个把采集、匹配、话术串起来的工作台。',
  },
];

export const SKILLS: Skill[] = [
  { name: 'Java / Spring Boot', level: '熟练' },
  { name: 'Vue 3', level: '熟练' },
  { name: 'Python / FastAPI', level: '熟练' },
  { name: 'MySQL / SQLite', level: '熟练' },
  { name: 'RAG 与向量检索', level: '了解' },
  { name: 'Chrome CDP / 浏览器自动化', level: '了解' },
  { name: 'TypeScript / React', level: '了解' },
  { name: 'Nginx 部署', level: '了解' },
];
