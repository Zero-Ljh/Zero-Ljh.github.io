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
        zh: '我对 <strong>AI</strong> 有着真正的热情——每天关注 AI 新闻，自学深度学习，用 AI 生成图片，探索 AI 开发的前沿工具，还报了课学大模型部署与微调。这个领域的变化速度让我着迷。',
        en: 'I have a genuine passion for <strong>AI</strong> — I follow AI news daily, study deep learning on my own, generate images with AI, explore cutting-edge AI development tools, and have enrolled in courses on LLM deployment and fine-tuning. The pace of change in this field fascinates me.'
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
      zh: '目前在学深度学习、大模型部署微调，用 AI 工具辅助开发。足球扫荡型中场，新生杯二等奖。',
      en: 'Currently studying deep learning &amp; LLM deployment/fine-tuning. Box-to-box midfielder — campus freshman cup 2nd place.'
    },
    seeking: {
      zh: '寻找 AI/机器人方向的课题组——偏好工程方向，起初希望导师手把手引导，适应后能逐步独立。如果你在招收本科生，我很想聊聊。',
      en: 'Seeking an AI/Robotics research lab — prefer engineering over pure theory, and value mentorship with growing independence. If you are recruiting undergraduates, I would love to chat.'
    },
    skills: [
      { name: 'Python', level: 70 },
      { name: 'C++', level: 50 },
      { name: 'LLM / Deep Learning', level: 55 },

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
    resumeUrl: 'assets/resume-en.pdf',
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
        date: '2025.08',
        icon: '01',
        title: { zh: '自学 C 语言', en: 'Self-taught C' },
        desc: { zh: '自学 C 语言', en: 'Self-taught C language' }
      },
      {
        date: '2025.09',
        icon: '02',
        title: { zh: '大学入学', en: 'University Started' },
        desc: { zh: '入学管理科学与工程类专业', en: 'Enrolled in Management Science & Engineering' }
      },
      {
        date: '2025.09',
        icon: '03',
        title: { zh: '加入心理健康协会', en: 'Joined Mental Health Association' },
        desc: { zh: '加入心理健康协会', en: 'Joined Mental Health Association' }
      },
      {
        date: '2025.10',
        icon: '04',
        title: { zh: '新生杯二等奖', en: 'Freshman Cup 2nd Place' },
        desc: { zh: '新生杯足球赛二等奖', en: 'Freshman Cup 2nd place' }
      },
      {
        date: '2026.01',
        icon: '05',
        title: { zh: '转入 AI 科创实验班', en: 'Joined AI Innovation Class' },
        desc: { zh: '参加人工智能科创实验班选拔并进入', en: 'Selected for the AI Innovation Experimental Class' }
      },
      {
        date: '2026.02',
        icon: '06',
        title: { zh: 'Python + C++ 入门', en: 'Python & C++ Basics' },
        desc: { zh: '学习 Python、C++ 课程（B 站）', en: 'Learning Python and C++ (Bilibili courses)' }
      },
      {
        date: '2026.04',
        icon: '07',
        title: { zh: '加入百炼机器人团队', en: 'Joined Bailian Robotics' },
        desc: { zh: '加入百炼机器人团队', en: 'Joined Bailian Robotics Team' }
      },
      {
        date: '持续中',
        icon: '08',
        title: { zh: 'AI 探索之旅', en: 'AI Exploration' },
        desc: { zh: '持续关注大模型前沿动态，穿插学习机器学习理论与大模型部署微调基础知识。虽然尚未实践，但理解的积累本身就有价值。', en: 'Consistently following LLM frontier developments while studying ML theory and LLM deployment/fine-tuning fundamentals along the way. Haven\'t practiced hands-on yet, but building understanding is valuable in itself.' }
      }
    ]
  },

  /* ===== 教育背景 ===== */
  education: {
    school: { zh: '武汉科技大学', en: 'Wuhan University of Science and Technology' },
    url: 'https://www.wust.edu.cn/',
    degree: { zh: '人工智能科创实验班 · 本科在读', en: 'AI Innovation Experimental Class · Bachelor' },
    period: { zh: '2025年 — 2029年（预计）', en: '2025 — 2029 (Expected)' },
    courses: {
      zh: ['Python 程序设计', '数据结构与算法', '机器学习导论', '高等数学', '线性代数'],
      en: ['Python Programming', 'Data Structures & Algorithms', 'Intro to ML', 'Advanced Math', 'Linear Algebra']
    },
    description: {
      zh: '大一在读，原管理科学与工程类，转入人工智能科创实验班。保持好奇心，正在打基础（MATLAB、线代）并探索 AI 方向。',
      en: 'First-year student. Started in Management Science &amp; Engineering, transferred into the AI Innovation Experimental Class. Currently building foundations (MATLAB, Linear Algebra) while exploring AI.'
    }
  },

  /* ===== 阅读记录 ===== */
  reading: [
    {
      title: { zh: '大模型部署与微调 — 理论学习', en: 'LLM Deployment & Fine-Tuning — Theory Study' },
      meta: { zh: '2026年4月 · 课程学习', en: 'Apr 2026 · Course Study' },
      note: {
        zh: '正在学习大模型部署和微调的理论知识——了解 LoRA 原理、推理优化、模型量化等概念。目前是理论学习阶段，还没有在本地跑过微调实验（设备配置有限），但理解原理本身就是重要的第一步。',
        en: 'Studying the theory behind LLM deployment and fine-tuning — LoRA principles, inference optimization, model quantization. Currently at the theory stage; havent run fine-tuning experiments locally yet (limited hardware), but understanding the principles is itself an important first step.'
      },
      tags: ['LLM', 'DeepSeek', '微调'],
      readingTime: '8 min',
      keyPoints: [
        { zh: 'LoRA 通过低秩矩阵分解，只需训练极少参数即可适配下游任务', en: 'LoRA uses low-rank matrix decomposition to adapt models with very few trainable parameters' },
        { zh: 'Ollama 让本地运行大模型变得极其简单，一行命令即可', en: 'Ollama makes running LLMs locally trivially easy — just one command' },
        { zh: '模型量化（INT8/INT4）大幅降低显存占用，几乎不影响效果', en: 'Model quantization (INT8/INT4) drastically reduces memory usage with minimal quality loss' },
        { zh: 'DeepSeek 的 MoE 架构让大模型推理成本大幅下降', en: "DeepSeek's MoE architecture significantly reduces LLM inference costs" }
      ],
      source: 'https://github.com/datawhalechina/self-llm',
      sourceLabel: { zh: 'Datawhale 开源教程', en: 'Datawhale Open Source Tutorial' },
      relatedReading: [1, 3],
      body: [
        { type: 'p', content: { zh: '我报名了大模型部署与微调的课程，目前正在学习理论知识。由于设备配置有限（参数量大的模型跑不动），还未进行实际微调操作，但理解这些概念本身就是为未来打基础。', en: 'I enrolled in an LLM deployment and fine-tuning course, currently studying the theory. I havent done actual fine-tuning yet due to limited hardware, but understanding these concepts is building a foundation for the future.' } },
        { type: 'h2', content: { zh: '课程内容概览', en: 'Course Overview' } },
        { type: 'ul', items: [
          { zh: '了解开源模型的本地部署流程', en: 'Understanding the workflow of local model deployment' },
          { zh: '学习 LoRA/QLoRA 参数高效微调的原理', en: 'Learning the principles of parameter-efficient fine-tuning (LoRA/QLoRA)' },
          { zh: '推理优化的概念：量化、KV Cache、vLLM', en: 'Concepts of inference optimization: quantization, KV cache, vLLM' }
        ] },
        { type: 'blockquote', content: { zh: '微调不是从零训练，而是在预训练模型的基础上，用少量标注数据让模型适应特定任务。', en: 'Fine-tuning is not training from scratch — it adapts a pre-trained model to specific tasks with small labeled datasets.' } },
        { type: 'h2', content: { zh: '我的收获', en: 'My Takeaways' } },
        { type: 'ul', items: [
          { zh: '理解了 LoRA 的原理：通过低秩矩阵分解来近似权重更新，大幅降低微调门槛', en: 'Understood LoRA: low-rank matrix decomposition approximates weight updates, dramatically lowering the fine-tuning barrier' },
          { zh: '了解了 Ollama 本地运行模型的流程', en: 'Learned about the workflow for running models locally with Ollama' },
          { zh: '明白了模型量化的作用：降低显存占用，让普通设备也能跑大模型', en: 'Understood quantization: reducing memory usage so larger models can run on consumer hardware' },
          { zh: '对 MoE 架构（如 DeepSeek）的设计思路有了概念性理解', en: 'Gained conceptual understanding of MoE architecture design (e.g., DeepSeek)' }
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
      tags: ['AI News', 'OpenAI'],
      readingTime: '4 min',
      keyPoints: [
        { zh: '开源模型（DeepSeek V4、Llama 4）正在快速缩小与闭源模型的差距', en: 'Open-source models (DeepSeek V4, Llama 4) are rapidly closing the gap with proprietary ones' },
        { zh: '多模态和 Agent 是 2026 年最重要的两个方向', en: 'Multimodal and Agent are the two most important trends of 2026' },
        { zh: '推理成本的下降让个人开发者也能用上顶级模型', en: 'Falling inference costs let individual developers access top-tier models' }
      ],
      source: 'https://news.ycombinator.com/',
      sourceLabel: { zh: 'Hacker News 科技新闻', en: 'Hacker News' },
      body: [
        { type: 'p', content: { zh: '每天花 30 分钟浏览 AI 新闻已经成了我的习惯。以下是我对近期动态的观察和思考。', en: 'Spending 30 minutes on AI news has become a daily habit. Here are my observations and thoughts on recent developments.' } },
        { type: 'h2', content: { zh: '开源 vs 闭源：差距正在缩小', en: 'Open vs Closed: The Gap is Closing' } },
        { type: 'p', content: { zh: 'DeepSeek V4 的表现令人惊叹——在多项基准上与 GPT-5 不相上下，而训练成本仅为闭源模型的几分之一。Llama 4 也在推理能力上大幅提升。开源模型的迭代速度已经超过了大多数人的预期。', en: "DeepSeek V4 is stunning — matching GPT-5 on multiple benchmarks while costing a fraction to train. Llama 4 also shows major leaps in reasoning. The iteration speed of open-source models has exceeded most people's expectations." } },
        { type: 'h2', content: { zh: 'Agent 时代即将到来', en: 'The Agent Era is Coming' } },
        { type: 'p', content: { zh: '2026 年最热的词是「Agent」。从 Claude Code 到各种自动化 Agent 框架，AI 正在从「回答问题」进化到「完成任务」。这对我作为大一学生来说既是机遇也是挑战——学会用 AI 工具本身就是在为未来做准备。', en: "The hottest word of 2026 is 'Agent.' From Claude Code to various automation frameworks, AI is evolving from 'answering questions' to 'completing tasks.' As a freshman, this is both opportunity and challenge — learning to use AI tools is itself preparation for the future." } },
        { type: 'h2', content: { zh: '我的感受', en: 'My Take' } },
        { type: 'p', content: { zh: '作为刚入门的 AI 学生，最让我兴奋的是进入门槛在持续降低。不需要 PhD 也能跑模型、做实验、构建应用。但这也意味着需要更自律——工具变强了，思考不能变弱。', en: "As a beginner AI student, what excites me most is how the barrier to entry keeps dropping. No PhD needed to run models, do experiments, build applications. But this also means more self-discipline is needed — tools got stronger, thinking shouldn't get weaker." } }
      ]
    },
    {
      title: { zh: '我的书架：最近在读什么', en: 'My Bookshelf: What I\'m Reading' },
      meta: { zh: '2026年4月 · 阅读记录', en: 'Apr 2026 · Reading Log' },
      readingTime: '3 min',
      note: {
        zh: '除了 AI 和技术书，我也读哲学、心理学。涉猎广不是分心，是把世界看得更清楚。',
        en: "Beyond AI and tech, I also read philosophy and psychology. Wide-ranging reading isn't distraction — it's how you see the world more clearly."
      },
      tags: ['阅读', '跨学科'],
      keyPoints: [
        { zh: '《白话机器学习的数学》——用通俗语言讲 ML 数学基础，适合入门', en: "'Math for ML (in plain language)' — ML math fundamentals explained simply, great for beginners" },
        { zh: '《被讨厌的勇气》——阿德勒心理学，学会不被他人评价左右', en: "'The Courage to Be Disliked' — Adlerian psychology, learning to not be controlled by others' judgment" },
        { zh: '《普林斯顿微积分读本》——从高中开始读，微积分入门经典', en: "'The Calculus Lifesaver' — started in high school, classic calculus入门" }
      ],
      body: [
        { type: 'p', content: { zh: '读书对我来说不是"打卡"，而是在好奇心驱动下自然地探索。以下是最近在读和读过的一些书。', en: "Reading for me isn't about checking boxes — it's exploring naturally, driven by curiosity. Here are some books I've been reading." } },
        { type: 'h2', content: { zh: 'AI 与数学', en: 'AI & Math' } },
        { type: 'ul', items: [
          { zh: '《白话机器学习的数学》——用最直白的语言讲回归、分类、正则化背后的数学', en: "'Math for ML in Plain Language' — regression, classification, regularization math explained in plain terms" },
          { zh: '《普林斯顿微积分读本》——高中开始啃的微积分入门书，断断续续在读', en: "'The Calculus Lifesaver' — started in high school, a friendly intro to calculus I keep coming back to" }
        ] },
        { type: 'h2', content: { zh: '人文与社科', en: 'Humanities & Social Science' } },
        { type: 'ul', items: [
          { zh: '《毛泽东选集》——理解中国近现代史和思维方式的重要窗口', en: "'Selected Works of Mao Zedong' — important lens for understanding modern Chinese history and thinking" },
          { zh: '《传习录》——王阳明心学经典，"知行合一"对我影响很大', en: "'Instructions for Practical Living' — Wang Yangming's classic on the unity of knowledge and action" }
        ] },
        { type: 'h2', content: { zh: '心理学', en: 'Psychology' } },
        { type: 'ul', items: [
          { zh: '《非暴力沟通》——学会不带评判地表达，对人际关系帮助很大', en: "'Nonviolent Communication' — learning to express without judgment, hugely helpful for relationships" },
          { zh: '《自卑与超越》——阿德勒谈自卑感的来源和超越之道', en: "'What Life Should Mean to You' — Adler on the sources of inferiority and paths to overcome it" },
          { zh: '《被讨厌的勇气》——阿德勒心理学通俗版，不被他人认可也可以自由', en: "'The Courage to Be Disliked' — Adlerian psychology for the modern reader, freedom from needing others' approval" }
        ] },
        { type: 'blockquote', content: { zh: '涉猎广泛不是分心，是把世界看得更清楚。——这也是我为人大一的真实写照。', en: "Wide-ranging reading isn't distraction — it's how you see the world more clearly. This is my honest freshman-year self." } }
      ]
    },
    {
      title: { zh: 'Vibe Coding 初体验：用 AI 写代码是什么感觉', en: 'First Impressions of Vibe Coding' },
      meta: { zh: '2026年4月 · 实践分享', en: 'Apr 2026 · Experience' },
      note: {
        zh: '从 Copilot 换到 Claude Code，最大的感受不是代码变快了，而是思考方式变了——先想清楚要什么，再让 AI 帮你实现。这和踢球一样：先阅读场上形势，再做动作。',
        en: 'Switching from Copilot to Claude Code — the biggest change isn\'t speed, it\'s mindset. Think clearly about what you want, then let AI help you build it. Just like football: read the field first, then move.'
      },
      tags: ['Vibe Coding', 'Claude Code', '思考'],
      readingTime: '3 min',
      keyPoints: [
        { zh: 'Vibe Coding 的核心不是"AI 替你写代码"，而是"先想清楚要什么，再描述给 AI"', en: "Vibe Coding's core isn't 'AI writes code for you' — it's 'think clearly about what you want, then describe it to AI'" },
        { zh: '工具从 Copilot 换到 Claude Code 后，开发效率提升了数倍', en: 'Switching from Copilot to Claude Code boosted development efficiency several times over' },
        { zh: 'AI 编程最大的改变是思维方式——从"怎么实现"变成"要做什么"', en: "The biggest change is mindset — from 'how do I implement this' to 'what do I want to achieve'" }
      ],
      body: [
        { type: 'p', content: { zh: '从 Copilot 的代码补全到 Claude Code 的对话式开发，我的编程方式发生了根本性变化。这篇文章分享我的真实体验。', en: 'From Copilot code completion to Claude Code conversational development, my approach to programming has fundamentally changed. Here is my honest experience.' } },
        { type: 'h2', content: { zh: '起点：Copilot 的代码补全', en: 'Starting Point: Copilot Code Completion' } },
        { type: 'p', content: { zh: '最开始用 Copilot 时，感觉就像有个聪明的自动补全助手。它能猜出我想写什么，省了不少打字时间。但本质上，还是我在写代码，AI 只是辅助。', en: 'When I first used Copilot, it felt like having a smart autocomplete assistant. It could guess what I wanted to write, saving typing time. But essentially, I was still writing code — AI was just helping.' } },
        { type: 'h2', content: { zh: '转折：Claude Code 的对话式开发', en: 'Turning Point: Claude Code Conversational Dev' } },
        { type: 'p', content: { zh: 'Claude Code 完全改变了游戏规则。不是补全代码，而是理解需求——我描述想要什么，它生成完整方案。这种感觉不像在编程，更像在和一个有经验的工程师讨论。', en: 'Claude Code changed the game entirely. Not code completion, but understanding requirements — I describe what I want, it generates a complete solution. This feels less like programming and more like discussing with an experienced engineer.' } },
        { type: 'blockquote', content: { zh: '这和踢球一样：先阅读场上形势，再做动作。不用每脚球都自己带——站好位置，传出去，效率更高。', en: "Just like football: read the field first, then move. You don't need to dribble every ball — hold your position, pass, and you'll be more effective." } },
        { type: 'h2', content: { zh: '学会了什么', en: 'What I Learned' } },
        { type: 'ul', items: [
          { zh: '表述需求比写代码更重要——清晰的描述 > 精湛的技艺', en: 'Describing requirements matters more than writing code — clear description > exquisite skill' },
          { zh: 'AI 会犯错，需要你来判断——保持批判性思维', en: 'AI makes mistakes, you need to judge — keep critical thinking' },
          { zh: '小批量、高频次的开发节奏最适合 AI 协作', en: 'Small batch, high frequency development rhythm works best with AI' }
        ] }
      ]
    },
    {
      title: { zh: '从文科到 AI：一个交叉学科的视角', en: 'From Humanities to AI: A Cross-Disciplinary View' },
      meta: { zh: '2026年4月 · 个人反思', en: 'Apr 2026 · Reflection' },
      note: {
        zh: '我对文史哲政经的兴趣和 AI 并不矛盾。AI 正在改变每一个领域——理解人、理解社会，才能做出真正有用的 AI。涉猎广泛不是分心，是积累。',
        en: 'My interest in humanities and AI aren\'t contradictory. AI is transforming every field — understanding people and society is key to building truly useful AI. Wide-ranging interests aren\'t distraction, they\'re investment.'
      },
      tags: ['AI', '跨学科', '思考'],
      readingTime: '2 min',
      keyPoints: [
        { zh: '理解人、理解社会，才能做出真正有用的 AI', en: 'Understanding people and society is key to building truly useful AI' },
        { zh: '涉猎广泛不是分心，是积累——不同领域的视角会在意想不到的地方交汇', en: 'Wide-ranging interests aren\'t distraction, they\'re investment — perspectives from different fields converge in unexpected places' },
        { zh: 'AI 的本质是工具，工具的价值取决于用工具的人', en: "AI's essence is a tool, and a tool's value depends on who wields it" }
      ],
      body: [
        { type: 'p', content: { zh: '有人问我：你学 AI，为什么还花时间看文史哲政经？这不是分心吗？这篇文章是我的回答。', en: "People ask me: you're studying AI, why spend time on humanities, history, politics, and economics? Isn't that distraction? Here's my answer." } },
        { type: 'h2', content: { zh: 'AI 不是孤立的技术', en: 'AI Is Not an Isolated Technology' } },
        { type: 'p', content: { zh: 'AI 正在进入每一个领域——法律、医疗、教育、金融、艺术。如果只懂技术不懂领域，就做不出真正有价值的东西。理解人和社会，才知道 AI 应该解决什么问题。', en: 'AI is entering every field — law, medicine, education, finance, art. If you only understand tech without understanding the domain, you cannot build truly valuable things. Understanding people and society tells you what problems AI should solve.' } },
        { type: 'h2', content: { zh: '交叉学科的优势', en: 'The Cross-Disciplinary Advantage' } },
        { type: 'p', content: { zh: '读历史让我理解长期趋势，哲学让我思考智能的本质，政治经济让我看到技术背后的社会力量。这些看起来和代码无关的知识，实际上在帮我建立判断力——什么值得做，什么只是炒作。', en: 'History helps me understand long-term trends, philosophy makes me think about the nature of intelligence, politics and economics show me the social forces behind technology. This knowledge that seems unrelated to code actually helps me build judgment — what\'s worth doing vs. what\'s just hype.' } },
        { type: 'blockquote', content: { zh: '最好的工程师不是最会写代码的人，而是最理解问题的人。', en: 'The best engineers aren\'t the ones who write the most code — they\'re the ones who understand problems best.' } }
      ]
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
          zh: ['加入机器人团队算法组', '学习 MATLAB 与线性代数打基础', '持续关注方向发展尚未参赛'],
          en: ['Joined the robotics team algorithm group', 'Studying MATLAB and Linear Algebra as foundation', 'Following the field, not yet competing']
        },
        sub: {
          title: { zh: '干事 <span class="location">@ 心理健康协会</span>', en: 'Officer <span class="location">@ Psychological Health Association</span>' },
          date: { zh: '2025年 — 至今', en: '2025 — Present' },
          items: {
            zh: ['组织校园心理健康宣传活动', '参与同伴咨询与社群建设', '探索 AI 工具用于心理科普短剧创作（进行中）'],
            en: ['Organizing mental health awareness activities on campus', 'Supporting peer counseling and community building', 'Exploring AI tools for mental health short video creation (ongoing)']
          }
        }
      },
      {
        title: { zh: '足球队员 <span class="location">@ 院系杯</span>', en: 'Football Team Member <span class="location">@ University Cup</span>' },
        date: { zh: '2025年 — 至今', en: '2025 — Present' },
        items: {
          zh: ['新生杯 · 管院挺进四强（创近年最佳战绩）', '对阵城建学院最后五分钟3:2逆转', '扫荡型中场，团队协作获得二等奖', '<a href="https://mp.weixin.qq.com/s/kzQ1wwQKYZMeIskCCCMrLA" target="_blank" rel="noopener" class="inline-link">微信公众号报道 →</a>'],
          en: ['Freshman Cup · Management School reached semifinals (best in years)', '3:2 comeback against Urban Construction College in final 5 minutes', 'Box-to-box midfielder, won 2nd place through teamwork', '<a href="https://mp.weixin.qq.com/s/kzQ1wwQKYZMeIskCCCMrLA" target="_blank" rel="noopener" class="inline-link">WeChat Article →</a>']
        }
      },
      {
        title: { zh: '自主学习 <span class="location">@ 个人</span>', en: 'Self-Directed Learning <span class="location">@ Personal</span>' },
        date: { zh: '2025年 — 至今', en: '2025 — Present' },
        items: {
          zh: ['自学 Python 和 C++ 编程基础', '在 B 站看 UP 主讲解大模型前沿动态', '在 B 站学习政经哲史类课程', '听王骁Alert、历史哥李易修讲世界局势', '听毛选讲解'],
          en: ['Self-taught Python and C++ programming', 'Watching Bilibili creators explain LLM frontier developments', 'Watching Bilibili courses on politics, economics, philosophy, and history', 'Listening to Wang Xiao Alert and Li Yixiu on global affairs', 'Studying Mao Zedong\'s Selected Works']
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
    heading: { zh: '兴趣探索', en: 'Exploring' },
    intro: { zh: '我正在探索的方向。起步阶段，保持好奇，希望找到志同道合的导师引导我深入。', en: 'Areas I am exploring. Early stage, staying curious — looking for mentors to guide me deeper.' },
    areas: [
      { icon: '01', title: { zh: '大语言模型', en: 'Large Language Models' }, desc: { zh: '模型部署、微调（LoRA/QLoRA）、推理优化', en: 'Model deployment, fine-tuning (LoRA/QLoRA), inference optimization' } },
      { icon: '02', title: { zh: '机器人与具身智能', en: 'Robotics & Embodied AI' }, desc: { zh: '嵌入式系统、传感器集成、真实硬件实践', en: 'Embedded systems, sensor integration, hands-on hardware' } },
      { icon: '03', title: { zh: 'AI 工具与工作流', en: 'AI Tools &amp; Workflows' }, desc: { zh: 'AI 工具链搭建、高效开发实践', en: 'AI toolchain setup, efficient dev practices' } },
      { icon: '04', title: { zh: '持续学习', en: 'Continuous Learning' }, desc: { zh: '深度学习基础、PyTorch、经典 AI 教材', en: 'Deep learning fundamentals, PyTorch, classic AI textbooks' } }
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
      },
      links: [
        { url: '#about', label: { zh: '了解团队', en: 'About Team' } }
      ]
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
      },
      challenges: {
        zh: '从零开始学编程的最大挑战不是语法，而是"编程思维"——把问题分解成可执行的步骤。刚开始连 for 循环都想不明白，但坚持写小练习后慢慢有了感觉。',
        en: "The biggest challenge learning programming from scratch wasn't syntax — it was 'computational thinking': breaking problems into executable steps. I couldn't even understand for-loops at first, but persistence with small exercises slowly built intuition."
      },
      timeline: {
        zh: '2025年10月自学基础语法 → 2025年12月完成第一个爬虫 → 2026年1月搭建自动化脚本 → 进行中：用 Python 学深度学习',
        en: 'Oct 2025 learned basic syntax → Dec 2025 completed first scraper → Jan 2026 built automation scripts → Ongoing: learning DL with Python'
      },
      links: [
        { url: 'https://github.com/Zero-Ljh', label: { zh: 'GitHub 主页', en: 'GitHub Profile' } }
      ]
    }
  ],

  /* ===== 小项目 ===== */
  miniProjects: [
    {
      icon: '01',
      title: { zh: '本个人主页', en: 'This Portfolio Website' },
      desc: {
        zh: '用 Vibe Coding 方式开发的个人主页。HTML/CSS/JS，双语、响应式、零依赖。通过 GitHub Pages 部署。',
        en: 'Built with Vibe Coding. HTML/CSS/JS, bilingual, responsive, zero dependencies. Deployed via GitHub Pages.'
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
        label: { zh: '在读', en: 'Reading' },
        items: {
          zh: ['《白话机器学习的数学》', '《普林斯顿微积分读本》', '《被讨厌的勇气》', '深度学习课程（B站）'],
          en: ['Math for Machine Learning (in plain language)', 'The Calculus Lifesaver (Princeton)', 'The Courage to Be Disliked', 'Deep Learning course (Bilibili)']
        }
      },
      {
        label: { zh: '在做', en: 'Doing' },
        items: {
          zh: ['学 C++，搭建复习工作流', '百炼机器人团队嵌入式开发', '用 Claude Code 维护个人主页', '关注 AI 新闻，跟进前沿'],
          en: ['Learning C++, built a review workflow', 'Embedded dev with Bailian Robotics', 'Maintaining this site with Claude Code', 'Tracking AI news and frontier dev']
        }
      },
      {
        label: { zh: '下一步', en: 'Next Up' },
        items: {
          zh: ['开始学 PyTorch 深度学习框架', '继续加强数学基础（线代、微积分）', '找 AI/机器人方向的课题组'],
          en: ['Start learning PyTorch', 'Strengthen math foundations (linear algebra, calculus)', 'Find an AI/Robotics research lab']
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

  /* ===== 图库 ===== */
  gallery: {
    categories: [
      { id: 'aigc', icon: '', label: { zh: 'AI 生成', en: 'AI Generated' } },
      { id: 'photo', icon: '', label: { zh: '摄影', en: 'Photography' } },
      { id: 'anime', icon: '', label: { zh: '动漫', en: 'Anime' } },
      { id: 'life', icon: '', label: { zh: '生活', en: 'Life' } }
    ],
    items: [
      { src: 'assets/gallery/01.jpeg', thumb: 'assets/gallery/01.jpeg', title: { zh: '作品 01', en: 'Work 01' }, category: 'aigc', width: 800, height: 600 },
      { src: 'assets/gallery/02.png', thumb: 'assets/gallery/02.png', title: { zh: '作品 02', en: 'Work 02' }, category: 'aigc', width: 800, height: 600 },
      { src: 'assets/gallery/03.jpeg', thumb: 'assets/gallery/03.jpeg', title: { zh: '作品 03', en: 'Work 03' }, category: 'aigc', width: 800, height: 600 },
      { src: 'assets/gallery/04.png', thumb: 'assets/gallery/04.png', title: { zh: '作品 04', en: 'Work 04' }, category: 'aigc', width: 800, height: 600 },
      { src: 'assets/gallery/05.jpeg', thumb: 'assets/gallery/05.jpeg', title: { zh: '作品 05', en: 'Work 05' }, category: 'photo', width: 800, height: 600 },
      { src: 'assets/images/football-team-1.jpg', thumb: 'assets/images/football-team-1.jpg', title: { zh: '足球赛前合照', en: 'Football Team Photo' }, category: 'life', width: 1200, height: 800 },
      { src: 'assets/images/football-team-2.jpg', thumb: 'assets/images/football-team-2.jpg', title: { zh: '足球赛前合照 2', en: 'Football Team Photo 2' }, category: 'life', width: 1200, height: 800 },
      { src: 'assets/images/psychodrama.jpg', thumb: 'assets/images/psychodrama.jpg', title: { zh: '心理情景剧幕后工作', en: 'Psychodrama Backstage' }, category: 'life', width: 1200, height: 800 }
    ]
  },

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
    { icon: 'shield', label: { zh: '足球 · 院系杯', en: 'Football · University Cup' }, desc: { zh: '扫荡型中场 · 新生杯四强', en: 'Box-to-box midfielder · Freshman Cup Semifinals' }, url: 'https://mp.weixin.qq.com/s/kzQ1wwQKYZMeIskCCCMrLA' },
    { icon: 'book-open', label: { zh: '阅读 · 终身学习', en: 'Reading · Lifelong Learning' }, desc: { zh: '文史哲政经 + AI', en: 'Humanities to AI' } },
    { icon: 'cpu', label: { zh: '机器人 · 动手实践', en: 'Robotics · Hands-on' }, desc: { zh: '百炼团队算法组', en: 'Bailian algorithm group' } },
    { icon: 'heart', label: { zh: '心理 · 同伴支持', en: 'Mental Health · Peer Support' }, desc: { zh: '心协干事 + AI 科普短剧', en: 'Health Association officer + AI short videos' } },
    { icon: 'film', label: { zh: '影视 · 好故事', en: 'Movies · Good Stories' }, desc: { zh: '《人世间》《最美的青春》《请回答1988》', en: 'The World of Man, Youth in Beauty, Reply 1988' } },
    { icon: 'music', label: { zh: '音乐 · 放松时刻', en: 'Music · Chill Time' }, desc: { zh: '听歌放松，享受节奏', en: 'Listening and enjoying the rhythm' } },
    { icon: 'radio', label: { zh: '政经 · 听世界', en: 'Politics · World Affairs' }, desc: { zh: '关注王骁Alert、历史哥李易修、毛选讲解', en: 'Following Wang Xiao Alert, Li Yixiu, Mao studies' } },
    { icon: 'camera', label: { zh: '心协 · 幕后工作', en: 'Mental Health · Backstage' }, desc: { zh: '心理情景剧大赛设备调控', en: 'Psychodrama Competition tech support' }, photo: 'assets/images/psychodrama.jpg' }
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
          { name: 'AI 工具链', desc: { zh: 'AI 辅助开发实践', en: 'AI-assisted development' } },
          { name: 'GitHub Pages', desc: { zh: '静态网站部署', en: 'Static site deployment' } },
          { name: 'VS Code', desc: { zh: '日常编辑器', en: 'Daily editor' } }
        ]
      }
    ]
  },

  /* ===== 学习资源 ===== */
  resources: {
    title: { zh: '学习资源', en: 'Resources' },
    desc: { zh: '我常看的 B 站 UP 主，类型从 AI 理论到数学到人文都有。全部免费，全部在 B 站。', en: 'Bilibili creators I follow — from AI theory to math to humanities. All free, all on Bilibili.' },
    categories: [
      {
        icon: '01',
        label: { zh: 'AI 科普与理论', en: 'AI Science & Theory' },
        items: [
          {
            name: '梗直哥',
            url: 'https://space.bilibili.com/3546608482478081',
            desc: { zh: '前中科院博导，用动画讲深度学习、强化学习、大模型原理。"让AI不再难学"', en: 'Former professor at UCAS, explains DL, RL, and LLMs with animations. "Making AI accessible."' }
          },
          {
            name: '飞天闪客',
            url: 'https://space.bilibili.com/513047275',
            desc: { zh: '0公式大白话讲AI底层逻辑，《AI百问》系列把DeepSeek V1-V4讲得明明白白', en: 'Zero formulas, plain language AI explanations. "AI 100 Questions" series makes DeepSeek V1-V4 crystal clear.' }
          },
          {
            name: '量子位',
            url: 'https://space.bilibili.com/508406257',
            desc: { zh: '前沿科技媒体，追踪AI最新突破和人形机器人进展', en: 'Frontier tech media covering AI breakthroughs and humanoid robot progress.' }
          }
        ]
      },
      {
        icon: '02',
        label: { zh: '数学与思维', en: 'Math & Mindset' },
        items: [
          {
            name: '漫土沉思录',
            url: 'https://space.bilibili.com/38765632',
            desc: { zh: '清华博士在线教线代，《无痛线代》系列帮我啃下了线性代数', en: 'Tsinghua PhD teaching linear algebra. The "Painless Linear Algebra" series helped me get through it.' }
          },
          {
            name: '3Blue1Brown（B站官方）',
            url: 'https://space.bilibili.com/88461692',
            desc: { zh: '最直观的数学可视化，神经网络系列和线性代数本质是必看经典', en: 'The most intuitive math visualization. Neural networks and essence of linear algebra series are must-watch.' }
          },
          {
            name: '毕导',
            url: 'https://space.bilibili.com/14538659',
            desc: { zh: '百大UP主，用趣味物理化学实验保持对科学的好奇心', en: 'Top Bilibili creator. Fun physics and chemistry experiments that keep curiosity alive.' }
          }
        ]
      },
      {
        icon: '03',
        label: { zh: '开发与工具', en: 'Dev & Tools' },
        items: [
          {
            name: '马克的技术工作坊',
            url: 'https://space.bilibili.com/3546721548602616',
            desc: { zh: 'Claude Code、MCP、RAG、Agent 原理与实战，Vibe Coding 必备', en: 'Claude Code, MCP, RAG, Agent principles and practice — essential for Vibe Coding.' }
          },
          {
            name: '数字游牧人',
            url: 'https://space.bilibili.com/1206720704',
            desc: { zh: '科技创业者，分享AI应用与变现，了解AI怎么落地', en: 'Tech entrepreneur sharing AI applications and how AI is being used in the real world.' }
          }
        ]
      },
      {
        icon: '04',
        label: { zh: '人文与视野', en: 'Humanities & Perspective' },
        items: [
          {
            name: '国仁全球大学堂',
            url: 'https://space.bilibili.com/406782024',
            desc: { zh: '政经深度分析，温铁军等学者讲国际格局和金融体系', en: 'In-depth political and economic analysis. Scholars like Wen Tiejun on global structures and financial systems.' }
          },
          {
            name: 'GitHub',
            url: 'https://github.com/',
            desc: { zh: '读开源代码、搭个人主页、参与团队协作都在这里', en: 'Reading open source code, hosting this site, and team collaboration.' }
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
        { href: '#blog', zh: '笔记', en: 'Notebook' },
        { href: '#archive', zh: '小项目', en: 'Side Builds' },
        { href: '#resume', zh: '简历', en: 'Resume' },
        { href: '#resources', zh: '资源', en: 'Resources' },
        { href: '#gallery', zh: '图库', en: 'Gallery' },
        { href: '#tags', zh: '标签', en: 'Tags' },
        { href: '#creative', zh: '创作', en: 'Creative' },
        { href: '#life', zh: '生活', en: 'Life' },
        { href: '#toolbox', zh: '工具箱', en: 'Toolbox' },
        { href: '#research', zh: '兴趣探索', en: 'Exploring' },
        { href: '#contact', zh: '联系', en: 'Contact' }
      ]
    },
    photoPlaceholder: { zh: '照片待加', en: 'photo soon' }
  }
};
