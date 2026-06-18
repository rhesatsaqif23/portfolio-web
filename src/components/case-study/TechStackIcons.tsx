import ImageWithFallback from "../common/ImageWithFallback";

interface SkillInfo {
  name: string;
  iconUrl: string | null;
}

interface Props {
  skills: SkillInfo[];
}

const STORAGE = "https://ipkrjpftddtxwzmylxtf.supabase.co/storage/v1/object/public";

function storageUrl(path: string) {
  if (path.startsWith("http") || path.startsWith("/")) return path;
  return `${STORAGE}/${path}`;
}

export default function TechStackIcons({ skills }: Props) {
  if (skills.length === 0) return null;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
      {skills.map((skill) => (
        <div
          key={skill.name}
          className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-white/10 bg-slate-950/60 backdrop-blur-xl p-4 transition-all duration-300 hover:border-cyan-400/50"
        >
          <div className="relative h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 shrink-0">
            <ImageWithFallback
              src={skill.iconUrl ? storageUrl(skill.iconUrl) : "/images/fallback-icon.png"}
              alt={skill.name}
              fill
              sizes="56px"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <span className="text-xs md:text-sm font-semibold text-white/80 group-hover:text-white transition-colors text-center">
            {skill.name}
          </span>
        </div>
      ))}
    </div>
  );
}
