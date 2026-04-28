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
    tagline: { zh: '大一学生 · 探索 AI · 动手实践', en: 'First-year · Exploring AI · Building things' },
    intro: {
      zh: '武汉科技大学大一学生，正在探索 AI 的世界——从大语言模型到机器人实践。保持好奇，每天都在学新东西。',
      en: 'A first-year student at Wuhan University of Science and Technology, exploring the world of artificial intelligence — from large language models to hands-on robotics. Curious, learning, and building every day.'
    },
    about: [
      {
        zh: '我是<strong>武汉科技大学</strong>人工智能科创专业的<strong>大一学生</strong>。我正站在探索的起点——自学了 Python 基础，带着好奇心和决心一头扎进 AI 的世界。',
        en: "I'm a <strong>first-year student</strong> at <strong>Wuhan University of Science and Technology</strong>, majoring in Artificial Intelligence Innovation. I'm at the very beginning of my journey — I've taught myself Python basics and I'm diving into the world of AI with curiosity and determination."
      },
      {
        zh: '最让我兴奋的是 AI 领域的发展速度——从 DeepSeek V4 到最新的多模态模型，我怀着真正的热情关注每一次突破。我相信最好的学习方式是动手做，而我已经开始了。',
        en: 'What excites me most is how fast the AI field is evolving — from DeepSeek V4 to the latest multimodal models, I follow every breakthrough with genuine excitement. I believe the best way to learn is by building, and I am starting to do exactly that.'
      }
    ],
    highlight: {
      zh: '目前：百炼机器人团队干员、心理健康协会干事、院系杯足球赛获奖。一直在阅读，一直在学习。',
      en: 'Currently: member of Bailian Robotics Team &amp; Psychological Health Association. Campus football cup winner. Always reading, always learning.'
    },
    skills: ['Python (自学)', 'Large Language Models', 'Robotics (学习中)', 'PyTorch (即将开始)'],
    resumeUrl: 'assets/resume.pdf',
    githubUsername: 'Zero-Ljh'
  },

  /* ===== 阅读记录 ===== */
  reading: [
    {
      title: { zh: 'DeepSeek V4 发布：对开源 AI 意味着什么', en: 'DeepSeek V4: What It Means for Open-Source AI' },
      meta: { zh: '2026年4月 · 我的思考', en: 'Apr 2026 · My take' },
      note: {
        zh: 'DeepSeek V4 证明了开源模型可以媲美闭源。MoE 架构的效率提升尤其令人印象深刻——这可能让前沿 AI 能力更加普及。',
        en: 'DeepSeek V4 shows that open-source models can rival proprietary ones. The efficiency gains in MoE architecture are particularly impressive — this could democratize access to frontier AI capabilities.'
      },
      tags: ['DeepSeek', 'LLM']
    },
    {
      title: { zh: 'GPT-5 传闻：值得期待什么', en: 'GPT-5 Rumors: What to Expect' },
      meta: { zh: '2026年3月 · 我的思考', en: 'Mar 2026 · My take' },
      note: {
        zh: 'OpenAI、DeepSeek 等之间的竞争正以前所未有的速度推动整个领域前进。作为一个大一新生，能在这样一个关键节点进入这个领域令人兴奋。',
        en: 'The race between OpenAI, DeepSeek, and others is pushing the entire field forward faster than ever. As a freshman, it is exciting to enter this field at such a pivotal moment.'
      },
      tags: ['OpenAI', 'Industry']
    },
    {
      title: { zh: '在读《人工智能：一种现代方法》', en: "Reading: 'Artificial Intelligence: A Modern Approach'" },
      meta: { zh: '在读 · 教材', en: 'Ongoing · Textbook' },
      note: {
        zh: '逐章学习经典 AI 教材，目前在搜索算法和逻辑部分。',
        en: 'Working through the classic AI textbook chapter by chapter. Currently on search algorithms and logic.'
      },
      tags: ['学习', '基础']
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
          zh: ['代表学院参加校院系杯足球赛', '在比赛中获得奖项', '具备团队协作精神与坚韧品质'],
          en: ['Represented the college in the university football cup', 'Won awards in the campus tournament', 'Team player with discipline and perseverance']
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

  /* ===== 项目 ===== */
  projects: [
    {
      id: 'bailian-robot',
      overline: { zh: '进行中', en: 'Ongoing' },
      title: { zh: '百炼机器人项目', en: 'Bailian Robotics Project' },
      desc: {
        zh: '与团队一起进行机器人开发。目前正在学习嵌入式系统基础、传感器集成和机器人控制。这是我在真实硬件上动手实践的地方。',
        en: 'Working with the team on robotics development. Currently learning the fundamentals of embedded systems, sensor integration, and robot control. This is where I am getting my hands dirty with real hardware.'
      },
      tech: ['Robotics', 'Embedded', 'Team']
    },
    {
      id: 'python-learning',
      overline: { zh: '自学', en: 'Self-Study' },
      title: { zh: 'Python 学习之旅', en: 'Python Learning Journey' },
      desc: {
        zh: '自学 Python 基础，包括数据结构、控制流、函数和入门项目。为 AI/ML 打基础。下一步：PyTorch。',
        en: 'Self-taught Python basics including data structures, control flow, functions, and introductory projects. Building a foundation for AI/ML work. Next step: PyTorch.'
      },
      tech: ['Python']
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
      title: { zh: 'Python 练习项目', en: 'Python Practice Projects' },
      desc: {
        zh: '学习过程中写的小型 Python 程序：数据分析练习、小游戏、自动脚本。',
        en: 'Small Python programs built while learning: data analysis exercises, simple games, automation scripts.'
      },
      tech: 'Python'
    },
    {
      icon: '03',
      title: { zh: '机器人团队任务', en: 'Robotics Team Tasks' },
      desc: {
        zh: '在百炼机器人团队参与系统开发。随学习深入会持续更新。',
        en: 'Contributing to robotics system development at Bailian team. More details coming as I learn more.'
      },
      tech: 'Robotics · C'
    }
  ],

  /* ===== Now ===== */
  now: {
    heading: { zh: '最近在做什么。', en: "What I'm focused on right now." },
    columns: [
      {
        label: { zh: '📖 在读', en: '📖 Reading' },
        items: {
          zh: ['《人工智能：一种现代方法》', 'DeepSeek V4 技术报告', '百家讲坛（历史系列）'],
          en: ['AI: A Modern Approach (textbook)', 'DeepSeek V4 technical report', 'Baijia Lecture Room (history series)']
        }
      },
      {
        label: { zh: '🔨 在做', en: '🔨 Doing' },
        items: {
          zh: ['深入学 Python', '百炼机器人团队任务', '搭建个人主页'],
          en: ['Python deep dive', 'Robotics team tasks', 'Building this homepage']
        }
      },
      {
        label: { zh: '🎯 下一步', en: '🎯 Next Up' },
        items: {
          zh: ['开始学 PyTorch', '尝试开源贡献', '写第一篇技术博客'],
          en: ['Start PyTorch', 'Contribute to open source', 'Write first tech blog']
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
      tag: 'Python'
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
      excerpt: { zh: '进入大学，就像打开一扇通往只存在于书本中的世界的大门……', en: "Starting university is like opening a door to a world you have only read about..." }
    }
  ],

  /* ===== 课余生活 ===== */
  life: [
    { icon: '⚽', label: { zh: '足球 · 院系杯', en: 'Football · University Cup' } },
    { icon: '📺', label: { zh: 'B 站学习', en: 'Bilibili Learning' } },
    { icon: '📚', label: { zh: '百家讲坛', en: 'Bai Jia Jiang Tan' } },
    { icon: '🤖', label: { zh: '机器人团队', en: 'Robotics Team' } },
    { icon: '🧠', label: { zh: '心理协会', en: 'Psych Association' } },
    { icon: '🌐', label: { zh: 'AI 动态', en: 'AI News' } }
  ],

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
        { href: '#other-projects', zh: '📦 小项目', en: 'Side Builds' },
        { href: '#archive', zh: '🗂️ 归档', en: 'Archive' },
        { href: '#creative', zh: '✏️ 创作', en: 'Creative' },
        { href: '#life', zh: '📸 生活', en: 'Life' },
        { href: '#contact', zh: '💬 联系', en: 'Contact' }
      ]
    },
    photoPlaceholder: { zh: '照片待加', en: 'photo soon' }
  }
};
