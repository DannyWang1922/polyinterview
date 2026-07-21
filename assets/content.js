// 论文定稿后只需编辑此文件即可替换全部内容。
window.SITE_CONTENT = {
  // 用 <br> 控制断行为两行（与论文标题断行一致）。
  title:
    "PolyInterview: An LLM-based Platform for Immersive Mock Interview<br>Practice with Comprehensive Multimodal Assessment",

  // 每个按钮的 color 可选；不写则用默认蓝色。链接待定，先占位为 "#"。
  // 普通徽章：{ icon, label, url, color, alert? }，icon 为 emoji 文字。
  // 多平台徽章：带 platforms 数组时，渲染为 label: 图标 图标，
  //   每个平台 { title, url, color, iconSvg } 是冒号后的品牌色内联图标（iconSvg 用 fill=currentColor）。
  badges: [
    { icon: "📄", label: "Paper", url: "https://arxiv.org/abs/2607.10310", color: "#3b82f6" },
    { icon: "🚀", label: "Live System", url: "https://polyinterview.comp.polyu.edu.hk/polyinterview/login", color: "#ef4444" },
    {
      label: "Video",
      platforms: [
        {
          title: "Bilibili",
          url: "https://www.bilibili.com/video/BV1f7Nc67Ete/",
          color: "#00aeec",
          iconSvg:
            '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.223 3.086a1.25 1.25 0 0 1 0 1.768L17.08 5.996h1.17A3.75 3.75 0 0 1 22 9.746v7.5a3.75 3.75 0 0 1-3.75 3.75H5.75A3.75 3.75 0 0 1 2 17.246v-7.5a3.75 3.75 0 0 1 3.75-3.75h1.17L5.777 4.854a1.25 1.25 0 1 1 1.768-1.768l2.652 2.652c.079.079.145.164.198.254h3.21c.053-.09.12-.175.198-.254l2.652-2.652a1.25 1.25 0 0 1 1.768 0zM5.75 8.496a1.25 1.25 0 0 0-1.25 1.25v7.5a1.25 1.25 0 0 0 1.25 1.25h12.5a1.25 1.25 0 0 0 1.25-1.25v-7.5a1.25 1.25 0 0 0-1.25-1.25zm2.5 3.75a1.25 1.25 0 0 1 1.25 1.25v1.25a1.25 1.25 0 1 1-2.5 0v-1.25a1.25 1.25 0 0 1 1.25-1.25zm7.5 0a1.25 1.25 0 0 1 1.25 1.25v1.25a1.25 1.25 0 1 1-2.5 0v-1.25a1.25 1.25 0 0 1 1.25-1.25z"/></svg>',
        },
        {
          title: "YouTube",
          url: "https://youtu.be/SjpDgyRym64",
          color: "#ff0000",
          iconSvg:
            '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
        },
      ],
    },
  ],
  note: "",

  // 主视频：已压缩至 media/teaser.mp4；未播放时显示 poster 封面。
  teaser: { poster: "media/teaser-poster.png", src: "media/teaser.mp4" },

  // 工作流总览图（论文 Figure 1）。
  workflow: {
    src: "media/workflow.png",
    alt: "PolyInterview workflow overview",
    caption:
      "PolyInterview's workflow, from personalized setup and immersive interviewing to multimodal assessment and comprehensive reporting and feedback.",
  },

  abstract:
    "Preparing for job interviews is important for securing desired positions, yet realistic practice remains difficult to access: real interviews are infrequent, expert mock coaching is costly, and self-practice offers neither adaptive dialogue nor structured assessment. Existing systems typically address only parts of this need through fixed question sequences, limited communication channels, or feedback with little supporting evidence. We present PolyInterview, an LLM-based platform for immersive mock interview practice with comprehensive multimodal assessment. PolyInterview uses the target job description and CV to generate questions tailored to the role and candidate, conducts multi-turn spoken interviews with a lip-synced digital human interviewer that asks answer-aware follow-up questions, and evaluates response content, vocal delivery, and non-verbal behavior. Four parallel evaluators produce 13 behavior-level features that are aggregated into 10 assessment aspects and two competency tracks. Guided by the KSA and STAR frameworks, the report links each score to behavioral evidence and actionable recommendations. Its current all-account snapshot contains 101 accounts, 1,564 interview sessions, 7,665 generated questions, and 1,422 five-stage question sets. Generated questions are more closely aligned with their matched job description than with cross-role job descriptions in 93.7% of sessions. An evaluation by ten experts found strong question plans and actionable feedback.",

  // 方法图（论文 Figure 2）。
  figure: {
    src: "media/pipeline.png",
    alt: "PolyInterview pipeline",
    caption:
      "PolyInterview's pipeline for personalized questioning, answer-aware follow-ups, multimodal assessment, and comprehensive feedback.",
  },

  // Examples：真实 UI 截图走查，每项 { src, caption }。
  examples: [
    {
      src: "media/ui/setup.png",
      caption:
        "Personalized setup: choose an interviewer persona, target role and JD, upload a CV, and pick the session length.",
    },
    {
      src: "media/ui/live.png",
      caption:
        "Immersive live interview with a lip-synced digital human interviewer, side-by-side video, and spoken responses.",
    },
    {
      src: "media/ui/report_overall.png",
      caption:
        "Overall assessment report: two competency-track scores, strengths, and improvement priorities.",
    },
    {
      row: [
        {
          src: "media/ui/competency.png",
          caption: "KSA-aligned profile across the 10 assessment aspects.",
        },
        {
          src: "media/ui/skills.png",
          caption:
            "Behavior-level feature profile produced by the four parallel evaluators.",
        },
      ],
    },
    {
      src: "media/ui/feedback_q.png",
      caption:
        "Per-question diagnosis with STAR-guided improvement suggestions.",
    },
  ],
};
