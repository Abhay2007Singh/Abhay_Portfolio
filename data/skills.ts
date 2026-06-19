export interface Skill {
  name: string;
  primary?: boolean;
  url: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  description: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    description: "Primary languages across backend, scripting, and systems work",
    skills: [
      { name: "Python", primary: true, url: "https://docs.python.org/3/" },
      { name: "TypeScript", primary: true, url: "https://www.typescriptlang.org/docs/" },
      { name: "JavaScript", primary: true, url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "Java", url: "https://docs.oracle.com/en/java/" },
      { name: "C++", url: "https://en.cppreference.com/w/cpp" },
      { name: "C", url: "https://en.cppreference.com/w/c" },
      { name: "SQL", url: "https://www.postgresql.org/docs/current/sql.html" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    description: "Production systems, service layers, and async APIs",
    skills: [
      { name: "FastAPI", primary: true, url: "https://fastapi.tiangolo.com/" },
      { name: "SQLAlchemy", primary: true, url: "https://docs.sqlalchemy.org/" },
      { name: "Alembic", primary: true, url: "https://alembic.sqlalchemy.org/en/latest/" },
      { name: "Pydantic", primary: true, url: "https://docs.pydantic.dev/" },
      { name: "Celery", url: "https://docs.celeryq.dev/" },
      { name: "WebSockets", url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" },
      { name: "JWT / Auth", url: "https://jwt.io/introduction" },
      { name: "REST APIs", url: "https://restfulapi.net/" },
      { name: "Socket.IO", url: "https://socket.io/docs/v4/" },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    description: "Relational storage, caching, and state persistence",
    skills: [
      { name: "PostgreSQL", primary: true, url: "https://www.postgresql.org/docs/" },
      { name: "Redis", primary: true, url: "https://redis.io/docs/" },
      { name: "MongoDB", url: "https://www.mongodb.com/docs/" },
      { name: "SQLite", url: "https://www.sqlite.org/docs.html" },
      { name: "MySQL", url: "https://dev.mysql.com/doc/" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    description: "Interface layer — client side of the systems I build",
    skills: [
      { name: "React", primary: true, url: "https://react.dev/" },
      { name: "Tailwind CSS", primary: true, url: "https://tailwindcss.com/docs" },
      { name: "Next.js", url: "https://nextjs.org/docs" },
      { name: "Vite", url: "https://vitejs.dev/guide/" },
      { name: "React Router", url: "https://reactrouter.com/en/main" },
      { name: "Framer Motion", url: "https://www.framer.com/motion/" },
    ],
  },
  {
    id: "tools",
    label: "Tools & Infra",
    description: "Dev environment, testing, and deployment tooling",
    skills: [
      { name: "Docker", primary: true, url: "https://docs.docker.com/" },
      { name: "Git", primary: true, url: "https://git-scm.com/doc" },
      { name: "pytest", primary: true, url: "https://docs.pytest.org/" },
      { name: "Postman", url: "https://learning.postman.com/docs/" },
      { name: "Linux", url: "https://www.kernel.org/doc/html/latest/" },
      { name: "Figma", url: "https://help.figma.com/" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & Deployment",
    description: "Deployment targets and managed infrastructure",
    skills: [
      { name: "Vercel", primary: true, url: "https://vercel.com/docs" },
      { name: "Render", primary: true, url: "https://render.com/docs" },
      { name: "Supabase", url: "https://supabase.com/docs" },
      { name: "Railway", url: "https://docs.railway.app/" },
      { name: "AWS (basics)", url: "https://docs.aws.amazon.com/" },
    ],
  },
  {
    id: "ai",
    label: "AI / Application",
    description: "Applied AI and ML integration in production systems",
    skills: [
      { name: "Gemini API", primary: true, url: "https://ai.google.dev/gemini-api/docs" },
      { name: "Prompt Engineering", primary: true, url: "https://www.promptingguide.ai/" },
      { name: "LLM Output Validation", primary: true, url: "https://docs.pydantic.dev/latest/" },
      { name: "TensorFlow", url: "https://www.tensorflow.org/api_docs" },
      { name: "PyTorch", url: "https://pytorch.org/docs/" },
      { name: "MediaPipe", url: "https://ai.google.dev/edge/mediapipe/solutions/guide" },
      { name: "OpenCV", url: "https://docs.opencv.org/" },
      { name: "pdfplumber", url: "https://github.com/jsvine/pdfplumber" },
    ],
  },
];
