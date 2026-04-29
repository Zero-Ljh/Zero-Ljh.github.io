/**
 * 个人主页内容数据
 * ================
 * 编辑此文件即可更新页面内容，无需触碰 HTML/CSS/JS。
 * 所有中英文文本统一管理。
 */

const DATA = {
  /* ===== 个人信息 ===== */
  profile: {
    name: { zh: '李军辉', en: 'Junhui Li' },
    about: [
      {
        zh: '我对 <strong>AI</strong> 有着真正的热情——每天关注 AI 新闻，自学深度学习，用 AI 生成图片，尝试 Vibe Coding，还报了课学大模型部署与微调。这个领域的变化速度让我着迷。',
        en: 'I have a genuine passion for <strong>AI</strong> — I follow AI news daily, study deep learning on my own, generate images with AI, experiment with Vibe Coding, and have enrolled in courses on LLM deployment and fine-tuning. The pace of change in this field fascinates me.'
      },
      {
        zh: '我相信<strong>持续学习</strong>的力量。自学了 Python，现在在学 C++，还搭建了一套自动化复习工作流来巩固知识。没有考试驱动，纯粹是好奇心在推着我往前走。',
        en: 'I believe in the power of <strong>continuous learning</strong>. I taught myself Python, am now learning C++, and have built an automated review workflow to reinforce what I study. No exams driving me — just pure curiosity.'
      },
      {
        zh: '我也在努力做一个<strong>全面发展</strong>的人。兴趣涉猎广泛——从文史哲政经到人工智能，什么都想了解。足球场上我是扫荡型中场，拿过新生杯二等奖；在心理协会做干事帮助同学；在百炼机器人团队学嵌入式开发。技术很重要，但人更重要。',
        en: "I also strive to be a <strong>well-rounded</strong> person. My interests span wide — from humanities, history, politics, and economics to artificial intelligence. On the football field, I'm a box-to-box midfielder and won 2nd place in the freshman cup; as an officer in the Psychological Health Association, I support fellow students; at Bailian Robotics Team, I'm learning embedded development. Tech matters, but people matter more."
      }
    ],
    highlight: {
      zh: '目前在学深度学习、大模型部署微调，用 Vibe Coding 提高效率。足球扫荡型中场，新生杯二等奖。',
      en: 'Currently studying deep learning &amp; LLM deployment/fine-tuning. Box-to-box midfielder — campus freshman cup 2nd place.'
    },
    seeking: {
      zh: '🔬 寻找 AI/机器人方向的课题组——偏好工程方向，起初希望导师手把手引导，适应后能逐步独立。如果你在招收本科生，我很想聊聊。',
      en: '🔬 Seeking an AI/Robotics research lab — prefer engineering over pure theory, and value mentorship with growing independence. If you are recruiting undergraduates, I would love to chat.'
    },
    skills: [
      { name: 'Python', level: 70 },
      { name: 'C++', level: 50 },
      { name: 'LLM / Deep Learning', level: 55 },
      { name: 'Vibe Coding', level: 65 },
      { name: 'AI 工具链', level: 60 },
      { name: 'Robotics', level: 35, label: { zh: '学习中', en: 'Learning' } }
    ],
    philosophy: {
      zh: '先思考，后行动。减少无效跑动，站好位置，学会阅读。',
      en: 'Think first, act second. Cut wasted motion — read the field, hold your position.'
    },
    mentorNote: {
      zh: '偏好工程方向。起初希望导师手把手引导，适应后逐步独立。涉猎广泛（AI·文史哲政经济），但知道要先做好自己的位置。',
      en: 'Prefer engineering over theory. Value mentorship with growing independence. Wide-ranging interests (AI, humanities, politics, economics) — but I know to master my position first.'
    },
    resumeUrl: 'assets/resume.pdf',
    githubUsername: 'Zero-Ljh'
  },

  /* ===== 快速概览（自动从数据派生） ===== */
  stats: [
    { number: 4, label: { zh: '研究方向', en: 'Research Areas' } },
    { number: 5, label: { zh: '项目', en: 'Projects' } },
    { number: 3, label: { zh: '奖项与荣誉', en: 'Awards & Honors' } },
    { number: 6, label: { zh: '兴趣领域', en: 'Interest Areas' } }
  ],

  /* ===== 当前状态 ===== */
  currentFocus: {
    zh: '正在学习 PyTorch 深度学习框架',
    en: 'Currently learning PyTorch'
  },

  /* ===== 学习里程碑 ===== */
  learningMilestones: {
    heading: { zh: '学习里程碑', en: 'Learning Milestones' },
    intro: { zh: '从零开始的成长之路', en: 'My learning journey from scratch' },
    milestones: [
      {
        date: '2025.09',
        icon: '🎓',
        title: { zh: '大学入学', en: 'University Started' },
        desc: { zh: '进入武汉科技大学人工智能科创专业，开启大学生活', en: 'Started at WUST, AI Innovation program' }
      },
      {
        date: '2025.09-10',
        icon: '🐍',
        title: { zh: '自学 Python 基础', en: 'Python Basics' },
        desc: { zh: '从零学习 Python：基础语法、数据结构、简单项目', en: 'Learned Python from scratch: syntax, data structures, mini projects' }
      },
      {
        date: '2025.10',
        icon: '⚽',
        title: { zh: '新生杯二等奖', en: 'Freshman Cup 2nd Place' },
        desc: { zh: '代表学院参加新生杯足球赛，扫荡型中场，获得二等奖', en: 'Represented the college in the freshman football cup, box-to-box midfielder, won 2nd place' }
      },
      {
        date: '2025.11',
        icon: '🤖',
        title: { zh: '加入百炼机器人团队', en: 'Joined Bailian Robotics' },
        desc: { zh: '通过选拔加入机器人团队，开始学习嵌入式系统与机器人控制', en: 'Joined the robotics team, started learning embedded systems and robot control' }
      },
      {
        date: '2025.12',
        icon: '🧠',
        title: { zh: '关注 AI 前沿', en: 'AI Frontier Exploration' },
        desc: { zh: '开始系统关注大模型进展，学习 Transformer 原理与 AI 工具链', en: 'Started following LLM developments, learning Transformer architecture and AI toolchain' }
      },
      {
        date: '2026.01-03',
        icon: '🔧',
        title: { zh: '掌握 Vibe Coding', en: 'Mastering Vibe Coding' },
        desc: { zh: '使用 Claude Code 等 AI 工具高效开发，搭建本个人主页', en: 'Learned AI-assisted development with Claude Code, built this portfolio' }
      },
      {
        date: '2026.04',
        icon: '📝',
        title: { zh: '大模型部署与微调', en: 'LLM Deployment & Fine-Tuning' },
        desc: { zh: '报名学习大模型部署微调课程，动手实践 LoRA 微调', en: 'Enrolled in LLM deployment & fine-tuning course, hands-on LoRA practice' }
      },
      {
        date: '2026.04',
        icon: '🔥',
        title: { zh: '开始学 PyTorch', en: 'Starting PyTorch' },
        desc: { zh: '开始学习 PyTorch 深度学习框架，为模型训练打基础', en: 'Beginning PyTorch deep learning framework for model training' }
      }
    ]
  },

  /* ===== 教育背景 ===== */
  education: {
    school: { zh: '武汉科技大学', en: 'Wuhan University of Science and Technology' },
    degree: { zh: '人工智能科创专业 · 本科在读', en: 'AI Innovation · Bachelor (In Progress)' },
    period: { zh: '2025年 — 2029年（预计）', en: '2025 — 2029 (Expected)' },
    courses: {
      zh: ['Python 程序设计', '数据结构与算法', '机器学习导论', '高等数学', '线性代数'],
      en: ['Python Programming', 'Data Structures & Algorithms', 'Intro to ML', 'Advanced Math', 'Linear Algebra']
    },
    description: {
      zh: '大一在读，保持好奇心和学习热情。正在自学 AI/ML 基础知识，参与机器人团队实践。',
      en: 'First-year student with curiosity and enthusiasm. Self-studying AI/ML fundamentals and participating in robotics team practice.'
    }
  },

  /* ===== 阅读记录 ===== */
  reading: [
    {
      title: { zh: '大模型部署与微调 — 学习笔记', en: 'LLM Deployment & Fine-Tuning — Study Notes' },
      meta: { zh: '2026年4月 · 课程学习', en: 'Apr 2026 · Course Study' },
      note: {
        zh: '正在学习如何本地部署开源模型（如 DeepSeek）、用 LoRA 微调、以及推理优化。这对理解大模型的实际应用很重要。',
        en: 'Learning how to deploy open-source models locally (like DeepSeek), fine-tune with LoRA, and optimize inference. Essential for understanding real-world LLM applications.'
      },
      tags: ['LLM', 'DeepSeek', '微调'],
      body: [
        { type: 'p', content: { zh: '最近报名了大模型部署与微调课程，以下是学习笔记和心得体会。', en: 'I recently enrolled in an LLM deployment and fine-tuning course. Here are my notes and insights.' } },
        { type: 'h2', content: { zh: '课程内容概览', en: 'Course Overview' } },
        { type: 'ul', items: [
          { zh: '本地部署开源模型（DeepSeek、Llama 等）', en: 'Local deployment of open-source models (DeepSeek, Llama, etc.)' },
          { zh: '使用 LoRA/QLoRA 进行参数高效微调', en: 'Parameter-efficient fine-tuning with LoRA/QLoRA' },
          { zh: '推理优化：量化、KV Cache、vLLM', en: 'Inference optimization: quantization, KV cache, vLLM' }
        ] },
        { type: 'blockquote', content: { zh: '微调不是从零训练，而是在预训练模型的基础上，用少量标注数据让模型适应特定任务。', en: 'Fine-tuning is not training from scratch — it adapts a pre-trained model to specific tasks with small labeled datasets.' } },
        { type: 'h2', content: { zh: '我的收获', en: 'My Takeaways' } },
        { type: 'ul', items: [
          { zh: '理解了 LoRA 的原理：通过低秩矩阵分解来近似权重更新', en: 'Understood LoRA: low-rank matrix decomposition to approximate weight updates' },
          { zh: '学会了用 Ollama 本地运行和测试模型', en: 'Learned to run and test models locally with Ollama' },
          { zh: '了解了模型量化对推理速度和内存的影响', en: 'Understood how quantization affects inference speed and memory' },
          { zh: '对 DeepSeek 的 MoE 架构有了更深理解', en: 'Deeper understanding of DeepSeek\'s MoE architecture' }
        ] },
        { type: 'p', content: { zh: '下一步计划：在自己机器上跑通一个完整的微调实验。', en: 'Next step: Run a complete fine-tuning experiment on my own machine.' } }
      ]
    },
    {
      title: { zh: '关注 AI 前沿动态', en: 'Following AI Frontier Developments' },
      meta: { zh: '2026年3月 · 行业观察', en: 'Mar 2026 · Industry Watch' },
      note: {
        zh: '持续关注 DeepSeek、OpenAI 等最新进展。开源模型的快速迭代让我对 AI 的未来充满期待，也促使我动手尝试。',
        en: "Keeping up with the latest from DeepSeek, OpenAI, and others. The rapid iteration of open-source models excites me about the future and motivates me to build things myself."
      },
      tags: ['AI News', 'OpenAI']
    },
    {
      title: { zh: '在读《人工智能：一种现代方法》', en: "Reading: 'Artificial Intelligence: A Modern Approach'" },
      meta: { zh: '在读 · 教材', en: 'Ongoing · Textbook' },
      readingTime: 'Ongoing',
      note: {
        zh: '逐章学习经典 AI 教材，目前在搜索算法和逻辑部分。',
        en: 'Working through the classic AI textbook chapter by chapter. Currently on search algorithms and logic.'
      },
      tags: ['学习', '基础']
    },
    {
      title: { zh: 'Vibe Coding 初体验：用 AI 写代码是什么感觉', en: 'First Impressions of Vibe Coding' },
      meta: { zh: '2026年4月 · 实践分享', en: 'Apr 2026 · Experience' },
      note: {
        zh: '从 Copilot 换到 Claude Code，最大的感受不是代码变快了，而是思考方式变了——先想清楚要什么，再让 AI 帮你实现。这和踢球一样：先阅读场上形势，再做动作。',
        en: 'Switching from Copilot to Claude Code — the biggest change isn\'t speed, it\'s mindset. Think clearly about what you want, then let AI help you build it. Just like football: read the field first, then move.'
      },
      tags: ['Vibe Coding', 'Claude Code', '思考'],
      readingTime: '3 min'
    },
    {
      title: { zh: '从文科到 AI：一个交叉学科的视角', en: 'From Humanities to AI: A Cross-Disciplinary View' },
      meta: { zh: '2026年4月 · 个人反思', en: 'Apr 2026 · Reflection' },
      note: {
        zh: '我对文史哲政经的兴趣和 AI 并不矛盾。AI 正在改变每一个领域——理解人、理解社会，才能做出真正有用的 AI。涉猎广泛不是分心，是积累。',
        en: 'My interest in humanities and AI aren\'t contradictory. AI is transforming every field — understanding people and society is key to building truly useful AI. Wide-ranging interests aren\'t distraction, they\'re investment.'
      },
      tags: ['AI', '跨学科', '思考'],
      readingTime: '2 min'
    }
  ],

  /* ===== 经历 (Tab) ===== */
  experience: {
    tabs: {
      zh: ['团队', '运动', '学习'],
      en: ['Teams', 'Sports', 'Learning']
    },
    panels: [
      {
        title: { zh: '干员 <span class="location">@ 百炼机器人团队</span>', en: 'Member <span class="location">@ Bailian Robotics Team</span>' },
        date: { zh: '2025年 — 至今', en: '2025 — Present' },
        items: {
          zh: ['参与机器人系统开发与维护工作', '学习嵌入式系统与机器人控制基础', '与团队成员协作准备竞赛'],
          en: ['Participating in robotics system development and maintenance', 'Learning embedded systems and robot control basics', 'Collaborating with team members on competition preparations']
        },
        sub: {
          title: { zh: '干事 <span class="location">@ 心理健康协会</span>', en: 'Officer <span class="location">@ Psychological Health Association</span>' },
          date: { zh: '2025年 — 至今', en: '2025 — Present' },
          items: {
            zh: ['组织校园心理健康宣传活动', '参与同伴咨询与社群建设'],
            en: ['Organizing mental health awareness activities on campus', 'Supporting peer counseling and community building']
          }
        }
      },
      {
        title: { zh: '足球队员 <span class="location">@ 院系杯</span>', en: 'Football Team Member <span class="location">@ University Cup</span>' },
        date: { zh: '2025年 — 至今', en: '2025 — Present' },
        items: {
          zh: ['新生杯足球赛二等奖 · 扫荡型中场', '代表学院参加校院系杯足球赛', '在比赛中获得奖项', '具备团队协作精神与坚韧品质'],
          en: ['Freshman Cup 2nd place · Box-to-box midfielder', 'Represented the college in the university football cup', 'Won awards in the campus tournament', 'Team player with discipline and perseverance']
        }
      },
      {
        title: { zh: '自主学习 <span class="location">@ 个人</span>', en: 'Self-Directed Learning <span class="location">@ Personal</span>' },
        date: { zh: '2025年 — 至今', en: '2025 — Present' },
        items: {
          zh: ['自学 Python 编程基础', '关注大模型前沿动态（DeepSeek、GPT、开源模型）', '在 B 站学习政经哲史类课程', '观看《百家讲坛》了解中国传统文化'],
          en: ['Python programming basics (self-taught)', 'Following cutting-edge LLM developments (DeepSeek, GPT, open-source models)', 'Watching Bilibili courses on politics, economics, philosophy, and history', "Watching 'Lecture Room' (Bai Jia Jiang Tan) for Chinese culture"]
        }
      }
    ]
  },

  /* ===== 荣誉 ===== */
  honors: [
    { num: '获奖', label: { zh: '院系杯足球赛 · 校级', en: 'Football Cup · University Level' } },
    { num: '干事', label: { zh: '心理健康协会', en: 'Psychological Health Association' } },
    { num: '干员', label: { zh: '百炼机器人团队', en: 'Bailian Robotics Team' } }
  ],

  /* ===== 研究方向 ===== */
  research: {
    heading: { zh: '研究方向', en: 'Research Interests' },
    intro: { zh: '我正在探索的方向，希望找到志同道合的导师和团队。', en: 'Areas I am exploring — looking for mentors and teammates.' },
    areas: [
      { icon: '🧠', title: { zh: '大语言模型', en: 'Large Language Models' }, desc: { zh: '模型部署、微调（LoRA/QLoRA）、推理优化', en: 'Model deployment, fine-tuning (LoRA/QLoRA), inference optimization' } },
      { icon: '🤖', title: { zh: '机器人与具身智能', en: 'Robotics & Embodied AI' }, desc: { zh: '嵌入式系统、传感器集成、真实硬件实践', en: 'Embedded systems, sensor integration, hands-on hardware' } },
      { icon: '🔧', title: { zh: 'AI 工程化', en: 'AI Engineering' }, desc: { zh: 'Vibe Coding、工具链搭建、高效开发实践', en: 'Vibe Coding, toolchain setup, efficient dev practices' } },
      { icon: '📚', title: { zh: '持续学习', en: 'Continuous Learning' }, desc: { zh: '深度学习基础、PyTorch、经典 AI 教材', en: 'Deep learning fundamentals, PyTorch, classic AI textbooks' } }
    ]
  },

  /* ===== 项目 ===== */
  projects: [
    {
      id: 'bailian-robot',
      featured: true,
      overline: { zh: '进行中', en: 'Ongoing' },
      title: { zh: '百炼机器人项目', en: 'Bailian Robotics Project' },
      desc: {
        zh: '与团队一起进行机器人开发。目前正在学习嵌入式系统基础、传感器集成和机器人控制。这是我在真实硬件上动手实践的地方。',
        en: 'Working with the team on robotics development. Currently learning the fundamentals of embedded systems, sensor integration, and robot control. This is where I am getting my hands dirty with real hardware.'
      },
      tech: ['Robotics', 'Embedded', 'Team'],
      status: { zh: '进行中', en: 'Ongoing' },
      period: { zh: '2025年 — 至今', en: '2025 — Present' },
      role: { zh: '团队干员', en: 'Team Member' },
      learnings: {
        zh: ['嵌入式编程基础', '传感器数据采集与处理', '团队协作与版本控制', '从硬件到软件的完整流程'],
        en: ['Embedded programming fundamentals', 'Sensor data acquisition and processing', 'Team collaboration and version control', 'End-to-end hardware-to-software workflow']
      },
      challenges: {
        zh: '最大的挑战是从纯软件思维切换到硬件思维——需要考虑物理限制、供电、实时性等问题。',
        en: 'The biggest challenge was switching from a pure software mindset to hardware thinking — physical constraints, power, real-time requirements all matter.'
      },
      timeline: {
        zh: '2025年9月加入 → 2025年11月完成基础培训 → 至今参与系统开发',
        en: 'Joined Sep 2025 → Completed basic training Nov 2025 → Participating in system development'
      }
    },
    {
      id: 'python-learning',
      overline: { zh: '自学', en: 'Self-Study' },
      title: { zh: 'Python 学习之旅', en: 'Python Learning Journey' },
      desc: {
        zh: '自学 Python 基础，包括数据结构、控制流、函数和入门项目。为 AI/ML 打基础。下一步：PyTorch。',
        en: 'Self-taught Python basics including data structures, control flow, functions, and introductory projects. Building a foundation for AI/ML work. Next step: PyTorch.'
      },
      tech: ['Python'],
      status: { zh: '已完成', en: 'Completed' },
      period: { zh: '2025年 — 2026年', en: '2025 — 2026' },
      role: { zh: '个人项目', en: 'Personal Project' },
      learnings: {
        zh: ['数据结构与算法基础', '函数式编程思维', '文件操作与数据处理', '简单爬虫与自动化脚本'],
        en: ['Data structures and algorithms basics', 'Functional programming mindset', 'File I/O and data processing', 'Simple web scraping and automation scripts']
      }
    }
  ],

  /* ===== 小项目 ===== */
  miniProjects: [
    {
      icon: '01',
      title: { zh: '本个人主页', en: 'This Portfolio Website' },
      desc: {
        zh: '纯手工搭建的 HTML/CSS/JS 个人主页。双语、响应式、零依赖。通过 GitHub Pages 部署。',
        en: 'Built from scratch with HTML/CSS/JS. Bilingual, responsive, zero dependencies. Deployed via GitHub Pages.'
      },
      tech: 'HTML · CSS · JS'
    },
    {
      icon: '02',
      title: { zh: 'C++ 复习工作流', en: 'C++ Review Workflow' },
      desc: {
        zh: '搭建了一套自动化复习流程，结合 AI 辅助理解和练习，提高学习效率。',
        en: 'Built an automated review workflow combining AI-assisted understanding and practice to boost learning efficiency.'
      },
      tech: 'C++ · AI 工具链'
    },
    {
      icon: '03',
      title: { zh: '机器人团队任务', en: 'Robotics Team Tasks' },
      desc: {
        zh: '在百炼机器人团队参与系统开发。随学习深入会持续更新。',
        en: 'Contributing to robotics system development at Bailian team. More details coming as I learn more.'
      },
      tech: 'Robotics · C'
    },
    {
      icon: '04',
      title: { zh: 'Python 简单爬虫', en: 'Simple Python Web Scraper' },
      desc: {
        zh: '用 Python 写了第一个爬虫程序，批量获取网页数据。虽然基本是跟着教程做的，但跑通的那一刻还是很兴奋。',
        en: 'Wrote my first web scraper in Python to batch-fetch web data. Mostly followed a tutorial, but the moment it actually worked was thrilling.'
      },
      tech: 'Python'
    }
  ],

  /* ===== Now ===== */
  now: {
    heading: { zh: '最近在做什么。', en: "What I'm focused on right now." },
    columns: [
      {
        label: { zh: '📖 在读', en: '📖 Reading' },
        items: {
          zh: ['《人工智能：一种现代方法》', 'DeepSeek V4 技术报告', '深度学习课程（B站）', '百家讲坛（历史系列）'],
          en: ['AI: A Modern Approach (textbook)', 'DeepSeek V4 technical report', 'Deep Learning course (Bilibili)', 'Baijia Lecture Room (history series)']
        }
      },
      {
        label: { zh: '🔨 在做', en: '🔨 Doing' },
        items: {
          zh: ['学 C++，搭建复习工作流', '百炼机器人团队嵌入式开发', '用 Claude Code 维护个人主页', '关注 AI 新闻，跟进前沿'],
          en: ['Learning C++, built a review workflow', 'Embedded dev with Bailian Robotics', 'Maintaining this site with Claude Code', 'Tracking AI news and frontier dev']
        }
      },
      {
        label: { zh: '🎯 下一步', en: '🎯 Next Up' },
        items: {
          zh: ['开始学 PyTorch 深度学习框架', '跑通第一个模型微调实验', '找 AI/机器人方向的课题组'],
          en: ['Start learning PyTorch', 'Run my first fine-tuning experiment', 'Find an AI/Robotics research lab']
        }
      }
    ]
  },

  /* ===== 课程笔记 ===== */
  notebook: [
    {
      date: 'Apr 2026 · 5 min',
      title: { zh: 'Python 基础：本月学习总结', en: 'Python Basics: What I Learned This Month' },
      desc: { zh: '列表、字典、循环、函数——基础构建块。每天写小代码培养手感。', en: 'Lists, dictionaries, loops, functions — the building blocks. Writing small programs every day to build muscle memory.' },
      tag: 'Python',
      readingTime: '5 min',
      concepts: [
        { zh: '列表推导式比循环更简洁高效', en: 'List comprehensions are more concise than loops' },
        { zh: '字典用于键值映射，查询速度快', en: 'Dictionaries are fast for key-value lookups' },
        { zh: '函数是代码复用的基本单元', en: 'Functions are the basic unit of code reuse' }
      ],
      body: [
        { type: 'p', content: { zh: '这个月我系统地学习了 Python 的基础知识。以下是主要学习内容和心得。', en: 'This month I systematically studied Python basics. Here are the main topics and takeaways.' } },
        { type: 'h2', content: { zh: '一、列表与列表推导式', en: '1. Lists & List Comprehensions' } },
        { type: 'p', content: { zh: '列表是 Python 中最常用的数据结构之一。列表推导式 <code>[expr for item in iterable]</code> 让代码更简洁高效。', en: 'Lists are one of the most commonly used data structures in Python. List comprehensions <code>[expr for item in iterable]</code> make code more concise.' } },
        { type: 'code', content: { zh: '# 传统方式\nsquares = []\nfor i in range(10):\n    squares.append(i ** 2)\n\n# 列表推导式（更简洁）\nsquares = [i ** 2 for i in range(10)]', en: '# Traditional way\nsquares = []\nfor i in range(10):\n    squares.append(i ** 2)\n\n# List comprehension (more concise)\nsquares = [i ** 2 for i in range(10)]' }, lang: 'python' },
        { type: 'h2', content: { zh: '二、字典与键值对', en: '2. Dictionaries' } },
        { type: 'p', content: { zh: '字典提供 O(1) 的查找速度，适合存储键值映射关系。', en: 'Dictionaries provide O(1) lookup speed, great for key-value mappings.' } },
        { type: 'code', content: { zh: 'student = {\n    "name": "李军辉",\n    "major": "AI",\n    "year": 2025\n}\nprint(student["name"])  # 李军辉', en: 'student = {\n    "name": "Junhui Li",\n    "major": "AI",\n    "year": 2025\n}\nprint(student["name"])  # Junhui Li' }, lang: 'python' },
        { type: 'h2', content: { zh: '三、函数与代码复用', en: '3. Functions & Reusability' } },
        { type: 'p', content: { zh: '函数是代码复用的基本单元。Python 支持默认参数、关键字参数和可变参数。', en: 'Functions are the basic unit of code reuse. Python supports default args, keyword args, and variable-length args.' } },
        { type: 'code', content: { zh: 'def greet(name, greeting="你好"):\n    return f"{greeting}，{name}！"\n\nprint(greet("世界"))  # 你好，世界！\nprint(greet("World", "Hello"))  # Hello, World!', en: 'def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\nprint(greet("World"))  # Hello, World!\nprint(greet("世界", "你好"))  # 你好，世界！' }, lang: 'python' },
        { type: 'h3', content: { zh: '学习心得', en: 'Key Takeaways' } },
        { type: 'ul', items: [
          { zh: '列表推导式比 for 循环更简洁，可读性更好', en: 'List comprehensions are more readable than for loops' },
          { zh: '字典的 keys() / values() / items() 方法很实用', en: 'Dictionary keys() / values() / items() methods are very useful' },
          { zh: '函数参数灵活性：默认参数、*args、**kwargs', en: 'Function parameter flexibility: defaults, *args, **kwargs' }
        ] },
        { type: 'p', content: { zh: '下个月计划学习面向对象编程和文件操作。', en: 'Next month: Object-oriented programming and file I/O.' } }
      ]
    },
    {
      date: 'Apr 2026 · 3 min',
      title: { zh: '我对大语言模型的理解', en: 'My Understanding of LLMs' },
      desc: { zh: 'Transformer 工作原理（通俗版）、训练数据的作用、以及为什么 DeepSeek 的 MoE 架构很重要。', en: "How transformers work (in simple terms), what training data does, and why DeepSeek's MoE architecture is a big deal." },
      tag: 'LLM'
    },
    {
      date: { zh: '即将更新...', en: 'Coming soon...' },
      title: { zh: '大学课程反思', en: 'University Course Reflections' },
      desc: { zh: '人工智能专业课程的学习笔记和自我学习记录。本学期会持续更新。', en: 'Notes from my AI courses and self-study sessions. Will be updated regularly throughout the semester.' },
      tag: 'Soon'
    },
    {
      date: { zh: '即将更新...', en: 'Coming soon...' },
      title: { zh: 'B 站课程笔记', en: 'Bilibili Course Takeaways' },
      desc: { zh: '课余在 B 站学习政经哲史课程的笔记整理。', en: 'Notes from politics, economics, philosophy, and history courses I watch on Bilibili in my free time.' },
      tag: 'Soon'
    },
    {
      date: 'Apr 2026 · 4 min',
      title: { zh: 'C++ 复习工作流：我是怎么搭建的', en: 'My C++ Review Workflow Setup' },
      desc: { zh: '结合 AI 工具搭建自动化复习流程——生成题目、检查答案、记录错题。不是学 C++ 最快的方法，但是最适合我的方法。', en: 'Built an automated review workflow with AI tools — generates questions, checks answers, tracks mistakes. Not the fastest way to learn C++, but the way that works best for me.' },
      tag: 'C++',
      readingTime: '4 min',
      concepts: [
        { zh: 'AI 辅助学习不等于偷懒，是提高效率', en: 'AI-assisted learning isn\'t laziness, it\'s efficiency' },
        { zh: '错题记录比刷题更重要', en: 'Error tracking matters more than volume' },
        { zh: '工具要服务方法，方法要服务目标', en: 'Tools serve methods, methods serve goals' }
      ]
    }
  ],

  /* ===== 创作 ===== */
  creative: [
    {
      genre: { zh: '古诗', en: 'Classical Poem' },
      title: { zh: '无题', en: 'Untitled' },
      excerpt: { zh: '（请将你的古诗发给我，我会放入）', en: '(Send me your poem and I will put it here)' }
    },
    {
      genre: { zh: '文章', en: 'Essay' },
      title: { zh: '（文章标题）', en: '(Title)' },
      excerpt: { zh: '（请将你的文章发给我）', en: '(Send me your article)' }
    },
    {
      genre: { zh: '现代诗', en: 'Modern Poem' },
      title: { zh: '（诗歌标题）', en: '(Title)' },
      excerpt: { zh: '（请将你的诗歌发给我）', en: '(Send me your poem)' }
    },
    {
      genre: { zh: '随笔', en: 'Prose' },
      title: { zh: '我的大一', en: 'My First Year of College' },
      date: 'Apr 2026',
      readingTime: '3 min',
      excerpt: { zh: '进入大学，就像打开一扇通往只存在于书本中的世界的大门……', en: "Starting university is like opening a door to a world you have only read about..." }
    }
  ],

  /* ===== 课余生活 ===== */
  life: [
    { icon: '⚽', label: { zh: '足球 · 院系杯', en: 'Football · University Cup' }, desc: { zh: '扫荡型中场', en: 'Box-to-box midfielder' } },
    { icon: '📚', label: { zh: '阅读 · 终身学习', en: 'Reading · Lifelong Learning' }, desc: { zh: '文史哲政经 + AI', en: 'Humanities to AI' } },
    { icon: '🤖', label: { zh: '机器人 · 动手实践', en: 'Robotics · Hands-on' }, desc: { zh: '百炼团队嵌入式', en: 'Bailian embedded dev' } },
    { icon: '🧠', label: { zh: '心理 · 同伴支持', en: 'Mental Health · Peer Support' }, desc: { zh: '心协干事', en: 'Health Association officer' } }
  ],

  /* ===== 工具箱 ===== */
  toolbox: {
    heading: { zh: '工具箱', en: 'Toolbox' },
    categories: [
      {
        label: { zh: 'AI 工具', en: 'AI Tools' },
        items: [
          { name: 'Claude Code', desc: { zh: '主力 AI 编程助手', en: 'Primary AI coding assistant' } },
          { name: 'DeepSeek', desc: { zh: '高性价比大模型', en: 'Cost-effective LLM' } },
          { name: 'GitHub Copilot', desc: { zh: '入门时的 AI 搭档', en: 'AI pair programmer when starting out' } }
        ]
      },
      {
        label: { zh: '编程语言', en: 'Languages' },
        items: [
          { name: 'Python', desc: { zh: '第一个编程语言，数据处理和脚本', en: 'First language, data processing & scripting' } },
          { name: 'C++', desc: { zh: '正在学习，理解底层', en: 'Currently learning, understanding fundamentals' } },
          { name: 'HTML/CSS/JS', desc: { zh: '搭建本网站', en: 'Built this website' } }
        ]
      },
      {
        label: { zh: '工作流', en: 'Workflow' },
        items: [
          { name: 'Vibe Coding', desc: { zh: 'AI 驱动的高效开发方式', en: 'AI-driven efficient development' } },
          { name: 'GitHub Pages', desc: { zh: '静态网站部署', en: 'Static site deployment' } },
          { name: 'VS Code', desc: { zh: '日常编辑器', en: 'Daily editor' } }
        ]
      }
    ]
  },

  /* ===== 学习资源 ===== */
  resources: {
    title: { zh: '学习资源', en: 'Resources' },
    desc: { zh: '我在 AI 学习中发现的优质资源，分享给同样在路上的你。', en: 'Quality resources I have discovered on my AI learning journey, shared with fellow learners.' },
    categories: [
      {
        icon: '📖',
        label: { zh: '课程 & 教材', en: 'Courses & Textbooks' },
        items: [
          {
            name: '动手学深度学习 (D2L)',
            url: 'https://d2l.ai/',
            desc: { zh: '李沐的深度学习课程，代码+理论结合，非常适合入门', en: "Li Mu's deep learning course — code and theory combined, ideal for beginners" }
          },
          {
            name: 'CS229 Machine Learning',
            url: 'https://cs229.stanford.edu/',
            desc: { zh: '斯坦福经典 ML 课程，Andrew Ng 主讲，理论扎实', en: "Stanford's classic ML course by Andrew Ng" }
          },
          {
            name: '《人工智能：一种现代方法》',
            url: 'https://aima.cs.berkeley.edu/',
            desc: { zh: 'AI 领域的百科全书式教材，我目前正在读', en: 'The encyclopedia of AI textbooks — I am currently reading this' }
          },
          {
            name: 'Fast.ai Practical Deep Learning',
            url: 'https://course.fast.ai/',
            desc: { zh: '自上而下的教学法，先跑起来再理解原理', en: 'Top-down approach — run first, understand later' }
          }
        ]
      },
      {
        icon: '🔧',
        label: { zh: '工具 & 框架', en: 'Tools & Frameworks' },
        items: [
          {
            name: 'PyTorch',
            url: 'https://pytorch.org/',
            desc: { zh: '我正要开始学的深度学习框架', en: 'The DL framework I am starting to learn' }
          },
          {
            name: 'Ollama',
            url: 'https://ollama.ai/',
            desc: { zh: '本地运行大模型的最简单方式', en: 'Easiest way to run LLMs locally' }
          },
          {
            name: 'Hugging Face',
            url: 'https://huggingface.co/',
            desc: { zh: '模型和数据集的 GitHub，开源模型宝库', en: 'The GitHub of models and datasets' }
          }
        ]
      },
      {
        icon: '📝',
        label: { zh: '博客 & 频道', en: 'Blogs & Channels' },
        items: [
          {
            name: "Lil'Log",
            url: 'https://lilianweng.github.io/',
            desc: { zh: '深入浅出的大模型技术博客，每篇都值得精读', en: 'In-depth LLM technical blog — every post is worth reading carefully' }
          },
          {
            name: '李沐论文精读',
            url: 'https://space.bilibili.com/1567748478',
            desc: { zh: 'B站最好的论文讲解系列，适合入门科研', en: "Best paper walkthrough series on Bilibili for research beginners" }
          },
          {
            name: '3Blue1Brown',
            url: 'https://www.youtube.com/@3blue1brown',
            desc: { zh: '最直观的数学可视化，神经网络系列必看', en: 'The most intuitive math visualization — neural networks series is a must-watch' }
          }
        ]
      },
      {
        icon: '🌐',
        label: { zh: '社区 & 平台', en: 'Communities & Platforms' },
        items: [
          {
            name: 'GitHub',
            url: 'https://github.com/',
            desc: { zh: '读开源代码是最好的学习方式', en: 'Reading open source code is the best way to learn' }
          },
          {
            name: 'Kaggle',
            url: 'https://www.kaggle.com/',
            desc: { zh: '数据集 + 竞赛 + 学习笔记，一站式平台', en: 'Datasets + competitions + learning notebooks, all in one' }
          },
          {
            name: 'arXiv',
            url: 'https://arxiv.org/',
            desc: { zh: 'AI 论文预印本，跟踪最新研究动态', en: 'AI paper preprints — track the latest research' }
          }
        ]
      }
    ]
  },

  /* ===== UI 导航文字 ===== */
  i18n: {
    nav: {
      logo: { zh: '◆ 李军辉', en: '◆ Junhui Li' },
      items: [
        { href: '#about', zh: '关于', en: 'About' },
        { href: '#reading', zh: '阅读', en: 'Reading' },
        { href: '#experience', zh: '经历', en: 'Experience' },
        { href: '#projects', zh: '项目', en: 'Projects' },
        { href: '#now', zh: '此刻', en: 'Now' }
      ],
      resumeBtn: { zh: '简历', en: 'Resume' },
      moreBtn: { zh: '更多 ▼', en: 'More ▼' },
      dropdown: [
        { href: '#notebook', zh: '📓 笔记', en: 'Notebook' },
        { href: '#blog', zh: '📝 文章', en: 'Blog' },
        { href: '#other-projects', zh: '📦 小项目', en: 'Side Builds' },
        { href: '#resume', zh: '📄 简历', en: 'Resume' },
        { href: '#archive', zh: '🗂️ 归档', en: 'Archive' },
        { href: '#resources', zh: '📚 资源', en: 'Resources' },
        { href: '#tags', zh: '🏷️ 标签', en: 'Tags' },
        { href: '#creative', zh: '✏️ 创作', en: 'Creative' },
        { href: '#life', zh: '📸 生活', en: 'Life' },
        { href: '#toolbox', zh: '🧰 工具箱', en: 'Toolbox' },
        { href: '#research', zh: '🔬 研究方向', en: 'Research' },
        { href: '#contact', zh: '💬 联系', en: 'Contact' }
      ]
    },
    photoPlaceholder: { zh: '照片待加', en: 'photo soon' }
  }
};
