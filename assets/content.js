// 论文定稿后只需编辑此文件即可替换全部内容。
window.SITE_CONTENT = {
  title:
    "PolyInterview: An LLM-based Personalized Multi-Round Interview Simulation and Evaluation System",
  badges: [
    { icon: "📄", label: "Paper", url: "#" },
    { icon: "⭐", label: "GitHub", url: "#" },
    { icon: "🚀", label: "Online Demo", url: "#" },
    { icon: "📺", label: "Video", url: "#" },
  ],
  note:
    "[Note: The online demo runs on limited resources and may respond slowly under load. Please be patient.]",
  // teaser.src 为空时只显示 poster；定稿后填入视频地址（本地路径或外链 mp4）。
  teaser: { poster: "media/teaser-poster.svg", src: "" },
  figure: { src: "media/figure.svg", alt: "PolyInterview method overview" },
  abstract:
    "Preparing for job interviews is stressful, and access to realistic, personalized practice remains scarce. While large language models (LLMs) can hold fluent conversations, most interview tools rely on fixed question banks and generic feedback, ignoring a candidate's target role, resume, and prior answers. In this paper, we introduce PolyInterview, an LLM-based personalized and interactive interview simulation and evaluation system. PolyInterview conducts structured multi-round mock interviews that adapt questions to the candidate's background and real-time responses, spanning behavioral, technical, and role-specific stages. After each session it produces a multi-dimensional evaluation report covering communication, technical depth, and role fit, together with actionable improvement suggestions. Experiments show that PolyInterview generates more relevant questions and more consistent, well-calibrated assessments than strong LLM baselines, while remaining responsive enough for interactive use. (Placeholder abstract — replace with the final version once the paper is ready.)",
  examples: [
    { src: "media/demo-placeholder.html" },
    { src: "media/demo-placeholder.html" },
  ],
};
