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
  {
    id: 'job-search-workbench',
    title: 'AI 求职工作台',
    tagline:
      '通过 Chrome CDP 在你已登录的浏览器里读取职位，再用 AI 做简历匹配打分、投递话术和市场分析，全程在一个本地面板里完成。',
    tags: ['Python', 'FastAPI', 'Chrome CDP', 'ECharts', 'DeepSeek'],
    githubHref: 'https://github.com/Menorial/job-search-workbench',
    imageHref: 'images/job-search-cover.jpg',
    heroImageHref: 'images/job-search-how-it-works.jpg',
    role: '独立开发（全栈）',
    summary:
      '背景：找工作时要反复在平台上筛职位、比对简历、写打招呼话术，这些动作高度重复。' +
      '这个项目想把它做成一个本地工具——在自己已登录的浏览器里取数据，再用 AI 把「匹配 → 话术 → 市场分析」串起来。' +
      '定位是个人学习与技术实践，不提供验证码破解或指纹伪造，并内置了节流与风控即停。\n\n' +
      '技术方案：爬虫基于 Chrome DevTools Protocol 连接真实浏览器、复用登录态，支持关键词/城市/页数与详情抓取；' +
      '后端 FastAPI 提供任务与数据接口，前端用 ECharts 做可视化面板；' +
      'AI 侧接入 DeepSeek 兼容接口，简历解析成结构化 JSON 后先规则粗筛、再做 6 个维度的精评。\n\n' +
      '结果：面板里可以完成爬取、简历上传、匹配、话术生成、市场报告的完整流程，长任务有实时进度、日志和停止按钮；' +
      '数据全部落在本机 data/ 目录。项目包含 157 个 pytest 用例和 CI。',
    highlights: [
      '通过 Chrome CDP 复用已登录的浏览器上下文，不注入自动化特征；遇到风控码或连续失败会立即停止，避免越刷越糟。',
      '断点续跑：详情按条追加写入 JSONL，中断不丢数据、下次自动跳过；跨页重复职位自动合并，失败按 attempts 重试且不会被误记成「已抓取」。',
      'AI 匹配的缓存键绑定「职位 + 简历指纹」：简历没变时重跑零成本，简历一改则自动全部重评，避免复用过期分数。',
      '面板把爬取、解析、匹配、话术、报告统一成子进程任务，实时进度 + 日志流 + 随时停止，关掉页面任务仍继续。',
    ],
  },
  {
    id: 'auto-beauty-appointment',
    title: '汽车美容服务预约平台',
    tagline:
      '本科毕业设计：Spring Boot + Vue 3 的前后端分离预约系统，车主选服务与时段、商家管项目与订单、员工看排班与工单，三端共用一套前端。',
    tags: ['Java', 'Spring Boot', 'Vue 3', 'MySQL', 'JWT'],
    githubHref: 'https://github.com/Menorial/Auto-Beauty-Service-Appointment-Platform',
    imageHref: 'images/beauty-cover.jpg',
    heroImageHref: 'images/beauty-architecture.jpg',
    role: '独立开发（毕业设计）',
    summary:
      '背景：这是我本科的毕业设计，目标是给汽车美容门店做一套线上预约系统——车主挑服务项目和时段、商家维护项目与订单、' +
      '员工查看分派给自己的工单和排班。三类角色共用一套前端，按角色分流到不同界面。\n\n' +
      '技术方案：后端 Spring Boot 2.7 + Spring Security + JWT + Spring Data JPA + MySQL 8，前端 Vue 3 + Pinia + Element Plus + ECharts；' +
      '部署时用 Nginx 托管静态资源并把 /api 反向代理到后端；支付接支付宝沙箱，用 RSA2 签名并处理异步回调回写支付状态。\n\n' +
      '结果：8 张业务表、8 个业务模块，覆盖注册登录、车辆档案、时段预约、订单支付、评价互动、商家统计与员工工作台；' +
      '订单状态机与支付状态分离，预约带时段冲突检测；数据库、JWT、支付等敏感配置全部外置为环境变量，仓库里没有真实凭据。',
    highlights: [
      '三角色权限模型：users.role 区分 USER / ADMIN / EMPLOYEE，员工账号通过 employee_id 关联员工档案，请求统一经 JWT 过滤器鉴权后再分发到各业务模块。',
      '订单状态机与支付状态解耦：PENDING → CONFIRMED → IN_PROGRESS → COMPLETED，任一阶段可转 CANCELLED；支付单独维护 UNPAID / PAID / REFUNDED，避免出现「已预约未支付」的脏状态。',
      '预约时段冲突检测 + order_no 唯一索引，用户端可以按订单号或车牌检索，取消与改期都会联动订单状态。',
      '外部支付做成可降级：未配置支付宝密钥时只有支付链路不可用，其余模块照常运行；密钥、数据库口令等全部走环境变量。',
    ],
  },
];
