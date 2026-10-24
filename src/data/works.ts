import { SITE_GITHUB } from './site';

/*
 * 作品数据 —— 增删项目只需改本文件：
 *
 * 加项目：复制一个对象，改 id/title/tagline（编号自动生成，不用管）
 * 删项目：删掉对应对象即可，网格自动重排
 *
 * 字段说明：
 *   id         唯一标识（英文/数字，随意）——详情页路由 /work/:id 用
 *   title      作品名（中文）
 *   tagline    一句话简介（卡片上展示）
 *   tags       技术栈标签（可选，卡片与详情页展示）
 *   githubHref 仓库地址（当前统一指向个人主页，之后换成单个项目仓库）
 *   imageHref  作品图（可选）：
 *              - 本地图：放 public/images/ 下，填 '/images/xxx.png'
 *              - 外链：直接填图片 URL
 *              不填则显示灰色占位块
 *   role       你的角色（可选），如「独立开发」「前端负责人」
 *   summary    项目介绍（可选，段落用空行分隔）
 *   highlights 技术难点 / 解法（可选）：详情页按要点列出
 *   gallery    额外截图（可选）：详情页以图集展示
 *   demoHref   在线演示 / 录屏地址（可选）
 */
export interface WorkItem {
  id: string;
  title: string;
  tagline: string;
  tags?: string[];
  githubHref: string;
  imageHref?: string;
  role?: string;
  summary?: string;
  highlights?: string[];
  gallery?: string[];
  demoHref?: string;
}

const PLACEHOLDER_SUMMARY =
  '项目背景与目标：待填写——为什么要做这个项目、你负责哪一部分。\n\n' +
  '技术方案：待填写——整体架构、关键选型与取舍。\n\n' +
  '结果与反思：待填写——最终交付了什么，哪里还能做得更好。';

export const works: WorkItem[] = [
  {
    id: 'w1',
    title: '示例项目一',
    tagline: '项目简介占位：用一句话说明这个作品做了什么、解决了什么问题。',
    tags: ['AI 应用开发', 'React'],
    githubHref: SITE_GITHUB,
    role: '独立开发（待确认）',
    summary: PLACEHOLDER_SUMMARY,
    highlights: ['待填写：这个项目最难的技术点，以及你当时怎么解决的。'],
  },
  {
    id: 'w2',
    title: '示例项目二',
    tagline: '项目简介占位：突出技术栈与亮点，替换为真实描述即可。',
    tags: ['爬虫', 'Python'],
    githubHref: SITE_GITHUB,
    role: '独立开发（待确认）',
    summary: PLACEHOLDER_SUMMARY,
    highlights: ['待填写：数据抓取或清洗上遇到的坑，以及解决方式。'],
  },
  {
    id: 'w3',
    title: '示例项目三',
    tagline: '项目简介占位：交代背景、你的角色与最终成果。',
    tags: ['全栈', 'Node.js'],
    githubHref: SITE_GITHUB,
    role: '独立开发（待确认）',
    summary: PLACEHOLDER_SUMMARY,
  },
  {
    id: 'w4',
    title: '示例项目四',
    tagline: '项目简介占位：可补充数据、演示链接或上线地址。',
    tags: ['自动化', '工具'],
    githubHref: SITE_GITHUB,
    role: '独立开发（待确认）',
    summary: PLACEHOLDER_SUMMARY,
    highlights: ['待填写：这个工具解决了什么重复劳动，节省了多少时间。'],
  },
];
