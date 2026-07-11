// 论文定稿后只需编辑此文件即可替换全部内容。
window.SITE_CONTENT = {
  // 用 <br> 控制断行为两行（与论文标题断行一致）。
  title:
    "PolyInterview: An LLM-based Platform for Immersive Mock Interview<br>Practice with Comprehensive Multimodal Assessment",

  // 每个按钮的 color 可选；不写则用默认蓝色。链接待定，先占位为 "#"。
  badges: [
    { icon: "📄", label: "Paper", url: "#", color: "#3b82f6", alert: "The paper is under review and will be available for download after publication." },
    { icon: "🚀", label: "Live System", url: "https://polyinterview.comp.polyu.edu.hk/login", color: "#ef4444" },
    { icon: "📺", label: "Video", url: "https://www.bilibili.com/video/BV1f7Nc67Ete/", color: "#0ea5e9" },
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
