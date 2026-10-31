/*
 * 作品数据 —— 增删项目只需改本文件：
 *
 * 加项目：复制一个对象，改 id/title/tagline（编号自动生成，不用管）
 * 删项目：删掉对应对象即可，网格自动重排
 *
 * 字段说明：
 *   id         唯一标识（英文/数字）——详情页路由 /work/:id 用
 *   title      作品名
 *   tagline    一句话简介（卡片上展示）
 *   tags       技术栈标签（卡片与详情页展示，也用于筛选）
 *   githubHref 仓库地址
 *   imageHref  作品图（可选）：放 public/images/ 下，填 'images/xxx.png'（不要写开头的 /）
 *   role       你的角色
 *   summary    项目介绍，段落之间空一行
 *   highlights 技术难点 / 解法，详情页按要点列出
 *   gallery    额外截图（可选），详情页以图集展示
 *   demoHref   在线演示 / 录屏地址（可选）
 */
export interface WorkItem {
  id: string;
  title: string;
  tagline: string;
  tags?: string[];
  githubHref: string;
  imageHref?: string;
  /** 详情页主图（可选，不填则用 imageHref）；适合放 16:9 的截图或架构图 */
  heroImageHref?: string;
  role?: string;
  summary?: string;
  highlights?: string[];
  gallery?: string[];
  demoHref?: string;
}

export const works: WorkItem[] = [
  {
    id: 'knowledge-base',
    title: '个人知识库',
    tagline:
      '把散落在各处的 Markdown、PDF、Word 和网页剪藏收进本地 SQLite，用全文检索与语义检索找回内容，并让 AI 基于自己的文档回答问题。',
    tags: ['Python', 'FastAPI', 'Vue 3', 'SQLite', 'RAG'],
    githubHref: 'https://github.com/Menorial/knowledge-base',
    imageHref: 'images/knowledge-base-cover.png',
    role: '独立开发（全栈）',
    summary:
      '背景：资料散落在 Markdown、PDF、Word 和网页剪藏里，而商业笔记工具往往要账号、云同步和订阅，数据也不在自己手里。' +
      '这个项目想解决的就是一句话——做一个只跑在本机的知识库，数据库、原始文件、向量索引全部留在项目目录下，' +
      '只有发起 AI 对话时才会把检索到的片段发给你自己配置的模型接口。\n\n' +
      '技术方案：后端 FastAPI + SQLAlchemy，用 SQLite 同时承担文档元数据、FTS5 全文索引和 sqlite-vec 向量索引；' +
      '前端 Vue 3 + Element Plus。向量化默认走本地 BGE-small 模型，也可以用任意 OpenAI 兼容接口；' +
      '对话通过 SSE 逐字流式返回，并带引用溯源。\n\n' +
      '结果：支持 Markdown / PDF / Word / TXT / HTML 五种格式，网页剪藏会自动提取正文并把图片下载到本地；' +
      '另有双向链接与知识图谱、版本历史（保留最近 30 份）、回收站和启动时自动备份。' +
      '未配置 API Key 时，上传、解析、搜索、标签、版本、备份依然可用。',
    highlights: [
      '中文全文检索用 SQLite FTS5 的 trigram 分词器，绕开默认分词器对中文子串匹配失效的问题，再用 MATCH + LIKE 混合查询拿到高亮片段。',
      'RAG 链路：本地 BGE 向量化 → sqlite-vec 语义检索 top-k → 上下文拼装 → LLM 流式生成，回答可回链到引用原文。',
      '双版本存储：原始文件保留保真，Markdown 版本供检索和 AI 使用；解析错了还能直接在页面里手改。',
      '网页剪藏：抓取网页后做正文提取与图片本地化，一条书签脚本就能把任意页面存进知识库。',
    ],
    heroImageHref: 'images/knowledge-base-architecture.png',
  },
];
