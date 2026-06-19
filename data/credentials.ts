export interface Credential {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;       // thumbnail shown on card
  previewUrl: string;  // Google Drive embed URL shown in modal
  verifyUrl?: string;
  description: string;
}

export const credentials: Credential[] = [
  {
    id: "anthropic-claude-code",
    title: "Claude Code in Action",
    issuer: "Anthropic",
    date: "2025",
    image: "https://drive.google.com/thumbnail?id=1CClFskPoqv5yCTumv6yGvz4ZLLsKMKsd&sz=w1200",
    previewUrl: "https://drive.google.com/file/d/1CClFskPoqv5yCTumv6yGvz4ZLLsKMKsd/preview",
    description:
      "Practical usage of Claude Code for software engineering workflows, agentic coding, and AI-assisted development.",
  },
  {
    id: "aws-genai-art",
    title: "Introduction to Generative AI — Art of the Possible",
    issuer: "Amazon Web Services (AWS)",
    date: "Jul 30, 2025",
    image: "https://drive.google.com/thumbnail?id=1O7c88a9ubetf09BzjgzA1s0QCkMKKj8U&sz=w1200",
    previewUrl: "https://drive.google.com/file/d/1O7c88a9ubetf09BzjgzA1s0QCkMKKj8U/preview",
    description:
      "Generative AI fundamentals, large language models, diffusion models, and AWS AI service offerings.",
  },
  {
    id: "aws-prompt",
    title: "Foundations of Prompt Engineering",
    issuer: "Amazon Web Services (AWS)",
    date: "Jul 31, 2025",
    image: "https://drive.google.com/thumbnail?id=1AgcXKC9ju791ojkCgbHczfrqJcu2qnkJ&sz=w1200",
    previewUrl: "https://drive.google.com/file/d/1AgcXKC9ju791ojkCgbHczfrqJcu2qnkJ/preview",
    description:
      "Prompt design patterns, zero/few-shot prompting, chain-of-thought reasoning, and safety considerations.",
  },
  {
    id: "aws-planning-genai",
    title: "Planning a Generative AI Project",
    issuer: "Amazon Web Services (AWS)",
    date: "Jul 30, 2025",
    image: "https://drive.google.com/thumbnail?id=1wOrigJxFaBSrcwKeeq_Jan7Cov0hPbM4&sz=w1200",
    previewUrl: "https://drive.google.com/file/d/1wOrigJxFaBSrcwKeeq_Jan7Cov0hPbM4/preview",
    description:
      "Strategies for scoping, evaluating, and planning production generative AI projects on AWS.",
  },
  {
    id: "aws-bedrock-getting-started",
    title: "Amazon Bedrock Getting Started",
    issuer: "Amazon Web Services (AWS)",
    date: "Jul 30, 2025",
    image: "https://drive.google.com/thumbnail?id=1mH7jB6fMGQiwL40BC3A29B_PzV-avHD7&sz=w1200",
    previewUrl: "https://drive.google.com/file/d/1mH7jB6fMGQiwL40BC3A29B_PzV-avHD7/preview",
    description:
      "Hands-on introduction to Amazon Bedrock — foundation models, inference APIs, and integration patterns.",
  },
  {
    id: "aws-bedrock-nova",
    title: "Exploring Amazon Nova Models using Amazon Bedrock",
    issuer: "Amazon Web Services (AWS)",
    date: "Aug 2, 2025",
    image: "https://drive.google.com/thumbnail?id=1RsrSuzD7H53ubJ-5OQ-J2Eu6-JiOf8hu&sz=w1200",
    previewUrl: "https://drive.google.com/file/d/1RsrSuzD7H53ubJ-5OQ-J2Eu6-JiOf8hu/preview",
    description:
      "Deep dive into Amazon Nova multimodal models via Bedrock, covering text, image, and video understanding.",
  },
];
