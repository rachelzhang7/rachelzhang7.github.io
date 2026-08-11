/**
 * Creative AI – taste.
 *
 * A small digital gallery, organised by medium rather than by year: music,
 * visuals, ad creative. Year is contextual metadata, not the structure – the
 * deliberate opposite of the Experiments page, where chronology leads.
 *
 * Everything here is real: real songs with real public links, real artwork,
 * real video, real articles. Nothing is generated to fill a slot, and no claim
 * is made about professional credentials, commercial deployment, client work or
 * brand partnerships. This is personal creative experimentation.
 */

export const creativeIntro = {
  eyebrow: "Creative AI · 03",
  headline: "I create to understand the medium.",
  body: [
    "Generative AI is changing the cost of making things – music, imagery, advertising, and storytelling. What interests me isn't simply that these outputs are easier to produce. It's how the role of the creator changes when the medium itself can generate, remix, interpret, and respond.",
    "I use these tools partly to make things I enjoy, and partly to understand what new products, workflows, and businesses become possible when creation becomes more programmable.",
  ],
  /** Carries more visual weight than the paragraphs above it. */
  anchor: "Making is how I study the medium.",
  hero: {
    image: "/media/creative-ai/hero-creative-powder-burst.png",
    alt: "An explosion of blue, violet, and coral powder on a black background",
    width: 1536,
    height: 1024,
  },
};

/** Three mediums, not a process. No arrows between them. */
export const mediums = [
  { name: "Music", note: "Expression" },
  { name: "Visuals", note: "Aesthetic exploration" },
  { name: "Ad Creative", note: "Applied creation" },
];

export type Track = {
  title: string;
  description: string;
  href: string;
  /** Local cover art, so the page never depends on Suno's CDN. */
  image: string;
};

export const music = {
  label: "Music · 2026",
  headline: "Turning experiences into songs.",
  intro:
    "AI gave me a way to turn memories, transitions, and things I wanted to say into music – without needing to become a musician first.",
  profile: "https://suno.com/@guavavida",
  tracks: [
    {
      title: "La Vida Es La Vida",
      description: "Mexico, friendship, and a phrase that stayed with me.",
      href: "https://suno.com/song/28179a5e-7519-48a9-8b1c-0bde5164cee1",
      image: "/media/creative-ai/track-la-vida.webp",
    },
    {
      title: "She Found Her Voice",
      description:
        "A personal story about finding confidence, independence, and a voice.",
      href: "https://suno.com/song/babc54cb-8d1c-4cd1-88f1-d761f215ba7f",
      image: "/media/creative-ai/track-she-found-her-voice.webp",
    },
    {
      title: "I Took Me Back",
      description:
        "Written after walking away from an environment where I had slowly stopped feeling like myself.",
      href: "https://suno.com/song/86f8b021-3809-41c4-afd3-e7d55949e040",
      image: "/media/creative-ai/track-i-took-me-back.webp",
    },
  ] as Track[],
};

export type Artwork = {
  title: string;
  description: string;
  image: string;
  width: number;
  height: number;
};

export const visuals = {
  label: "Visuals · 2026",
  headline: "Exploring form, color, and feeling with generative tools.",
  /** A main work with two companion pieces, arranged as a small gallery wall. */
  works: [
    {
      title: "Red Throne",
      description: "She sits at the center and dares you to look away.",
      image: "/media/creative-ai/art-red-throne.jpg",
      width: 1300,
      height: 1171,
    },
    {
      title: "Gathering",
      description: "Something is pulling them together.",
      image: "/media/creative-ai/art-gathering.jpg",
      width: 950,
      height: 1038,
    },
    {
      title: "Midnight Garden",
      description: "What grows when nobody's watching?",
      image: "/media/creative-ai/art-midnight-garden.jpg",
      width: 1050,
      height: 1142,
    },
  ] as Artwork[],
};

export const adCreative = {
  label: "Ad Creative · 2025–2026",
  headline: "What happens when generation meets a commercial brief?",
  izze: {
    title: "IZZE Video Ad",
    description:
      "Exploring how quickly a product idea could move from a static brief into motion creative.",
    /** Real asset. `preload="metadata"` keeps the 10MB off the initial load. */
    video: "/media/creative-ai/izze-water.mp4",
    tool: "RunwayML Gen-3 Alpha Turbo",
  },
  celsius: {
    title: "Celsius Image Campaign",
    description:
      "Exploring product photography, composition, and campaign variation through generative imagery.",
    /** One campaign, three frames – never three separate projects. */
    frames: [
      {
        image: "/media/creative-ai/celsius-playa-vibe.jpg",
        width: 900,
        height: 1340,
      },
      {
        image: "/media/creative-ai/celsius-dragon-fruit.jpg",
        width: 1000,
        height: 1250,
      },
      {
        image: "/media/creative-ai/celsius-watermelon.jpg",
        width: 1000,
        height: 1777,
      },
    ],
  },
};

/** A single line of breathing space between making and writing. */
export const transition = "Making things changes how I see the tools.";

export type Article = {
  topic: "Video" | "Voice";
  title: string;
  href: string;
  /** A local visual cue for the field note, never an external thumbnail. */
  image: string;
  imageAlt: string;
  /**
   * Publication year, shown as understated metadata. Left undefined where the
   * supplied source carries no date – a year is never guessed.
   */
  year?: string;
};

export const notes = {
  label: "03 · Notes from the frontier",
  headline: "Notes from the frontier.",
  intro:
    "Generative models change quickly. I write to capture what I'm seeing while the technology is still moving.",
  articles: [
    {
      topic: "Video",
      title:
        "What I Learned Building AI Videos on July 4th (And Why It Matters)",
      href: "https://www.linkedin.com/pulse/what-i-learned-building-ai-videos-july-4th-why-matters-rachel-zhang-2hqjc/",
      image: "/media/creative-ai/note-july-fourth-videos.png",
      imageAlt: "A group of friends celebrating with sparklers at dusk",
    },
    {
      topic: "Video",
      title:
        "Stop Competing with AI Video Tools. Start Directing Them (Veo vs Seedance)",
      href: "https://www.linkedin.com/pulse/stop-competing-ai-video-tools-start-directing-them-rachel-zhang-bsfuc/",
      image: "/media/creative-ai/note-stop-competing-video-tools.png",
      imageAlt: "A cinematic AI video montage of a stormy house and dancer under stage lights",
    },
    {
      topic: "Voice",
      title: "The Voice Quality Gap: Why AI Audio Still Breaks the Magic",
      href: "https://www.linkedin.com/pulse/voice-quality-gap-why-ai-audio-still-breaks-magic-rachel-zhang-cgtlc/",
      image: "/media/creative-ai/note-voice-quality.png",
      imageAlt: "A studio microphone with a vivid AI audio waveform",
    },
    {
      topic: "Voice",
      title: "My Voice AI Journey: From Frustration to Fascination",
      href: "https://www.linkedin.com/pulse/my-voice-ai-journey-from-frustration-fascination-rachel-zhang-qnifc/",
      image: "/media/creative-ai/note-voice-ai-journey.png",
      imageAlt: "An AI technology montage across personal, automotive, education, and home settings",
    },
  ] as Article[],
};

export const creativeClosing = {
  lines: ["The tools will change.", "The impulse to make things won't."],
  small: "Music · Visuals · Advertising · Whatever comes next.",
  links: [
    { label: "Suno", href: "https://suno.com/@guavavida" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rachel-zhang/" },
  ],
};
