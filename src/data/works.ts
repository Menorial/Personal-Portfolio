/*
 * 作品数据 —— 增删项目只需改本文件：
 *
 * 加项目：复制一个对象，改 id/title/tagline/githubHref（编号自动生成，不用管）
 * 删项目：删掉对应对象即可，网格自动重排
 *
 * 字段说明：
 *   id         唯一标识（英文/数字，随意）——详情页路由 /work/:id 用
 *   title      作品名（中文）
 *   tagline    一句话简介
 *   tags       技术栈标签（可选，卡片与详情页展示）——示例，替换为真实技术栈
 *   githubHref 仓库地址（如 https://github.com/你的用户名/项目名）
 *   imageHref  作品图（可选）：
 *              - 本地图：放 public/images/ 下，填 '/images/xxx.png'
 *              - 外链：直接填图片 URL
 *              不填则显示灰色占位块（卡片点标题可进详情页）
 */
export interface WorkItem {
  id: string;
  title: string;
  tagline: string;
  tags?: string[];
  githubHref: string;
  imageHref?: string;
}

export const works: WorkItem[] = [
  {
    id: 'w1',
    title: '示例项目一',
    tagline: '项目简介占位：用一句话说明这个作品做了什么、解决了什么问题。',
    tags: ['AI 应用开发', 'React'],
    githubHref: 'https://github.com/',
  },
  {
    id: 'w2',
    title: '示例项目二',
    tagline: '项目简介占位：突出技术栈与亮点，替换为真实描述即可。',
    tags: ['爬虫', 'Python'],
    githubHref: 'https://github.com/',
  },
  {
    id: 'w3',
    title: '示例项目三',
    tagline: '项目简介占位：交代背景、你的角色与最终成果。',
    tags: ['全栈', 'Node.js'],
    githubHref: 'https://github.com/',
  },
  {
    id: 'w4',
    title: '示例项目四',
    tagline: '项目简介占位：可补充数据、演示链接或上线地址。',
    tags: ['自动化', '工具'],
    githubHref: 'https://github.com/',
  },
];
