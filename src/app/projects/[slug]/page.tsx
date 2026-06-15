import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Github,
  Calendar,
  User,
  CheckCircle,
  Smartphone,
  Globe,
} from "lucide-react";
import { getProjectBySlug, getCaseStudyByProjectSlug, getProjectNeighbors, getSkillsByNames } from "@/src/lib/data";
import ImageWithFallback from "@/src/components/common/ImageWithFallback";
import BreadcrumbNav from "@/src/components/case-study/BreadcrumbNav";
import TechStackIcons from "@/src/components/case-study/TechStackIcons";
import GalleryCarousel from "@/src/components/case-study/GalleryCarousel";

interface Props {
  params: Promise<{ slug: string }>;
}

const SECTIONS = [
  { key: "overview", color: "text-cyan-400", label: "Overview", num: "01" },
  { key: "problems", color: "text-red-400", label: "Problems", num: "02" },
  { key: "solutions", color: "text-emerald-400", label: "Solutions", num: "03" },
  { key: "contributions", color: "text-amber-400", label: "Contributions", num: "04" },
  { key: "features", color: "text-purple-400", label: "Features", num: "05" },
  { key: "techStack", color: "text-emerald-400", label: "Tech Stack", num: "06" },
  { key: "gallery", color: "text-pink-400", label: "Gallery", num: "07" },
  { key: "results", color: "text-emerald-400", label: "Results", num: "08" },
] as const;

const SECTION_MAP = Object.fromEntries(SECTIONS.map((s) => [s.key, s])) as Record<string, (typeof SECTIONS)[number]>;

function SectionHeading({ section }: { section: (typeof SECTIONS)[number] }) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline gap-3 md:gap-4">
        <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-mono leading-none">
          {section.num}
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
          {section.label}
        </h2>
      </div>
      <div className="mt-3 h-[2px] w-full bg-gradient-to-r from-white/30 via-white/10 to-transparent" />
    </div>
  );
}

function DecorativeGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
  );
}

function DecorativeOrb({ className }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute rounded-full blur-3xl ${className}`} />
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-2xl border-2 border-white/10 bg-slate-950/60 backdrop-blur-xl overflow-hidden group transition-all duration-300 hover:border-white/20 ${className}`}>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
      {children}
    </div>
  );
}

function AccentCard({ children }: { children: React.ReactNode }) {
  return (
    <div className={`relative rounded-2xl border-2 border-white/10 bg-slate-950/60 backdrop-blur-xl overflow-hidden group transition-all duration-300 hover:border-white/20`}>
      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
      <div className="p-5 relative z-10">
        {children}
      </div>
    </div>
  );
}

function toSentenceCase(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Rhesa Tsaqif`,
    description: project.descriptionShort,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const [project, caseStudy, { prev: prevProject, next: nextProject }, techSkills] = await Promise.all([
    getProjectBySlug(slug),
    getCaseStudyByProjectSlug(slug),
    getProjectNeighbors(slug),
    (async () => {
      const p = await getProjectBySlug(slug);
      if (!p) return [];
      return getSkillsByNames(p.techStacks);
    })(),
  ]);

  if (!project) notFound();

  const STORAGE = "https://ipkrjpftddtxwzmylxtf.supabase.co/storage/v1/object/public";

  function storageUrl(path: string) {
    if (path.startsWith("http")) return path;
    return `${STORAGE}/${path}`;
  }

  const s = SECTION_MAP;

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 sm:px-10 md:px-20 lg:px-28">
      <div className="mx-auto max-w-4xl">
        <BreadcrumbNav projectTitle={project.title} />

        {caseStudy ? (
          <div className="space-y-16">

            {/* ─── HERO ─── */}
            <header className="relative overflow-hidden rounded-3xl border-2 border-white/10 bg-slate-950/60 backdrop-blur-xl p-6 md:p-10 lg:p-14">
              <DecorativeGrid />
              <DecorativeOrb className="-top-40 -right-40 w-80 h-80 bg-cyan-500/5" />
              <DecorativeOrb className="-bottom-40 -left-40 w-80 h-80 bg-blue-500/5" />

              {/* Decorative background text */}
              <div className="absolute -top-6 -right-4 text-[3rem] md:text-[5rem] lg:text-[7rem] font-bold text-white/[0.02] select-none pointer-events-none leading-none tracking-tight">
                {project.title.split(" ")[0]}
              </div>

              <div className="relative z-10">
                {project.thumbnailUrl && (
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 mb-8 shadow-2xl shadow-black/40">
                    <ImageWithFallback
                      src={storageUrl(project.thumbnailUrl)}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {project.title}
                </h1>

                <p className="text-white/80 text-base md:text-lg leading-relaxed text-justify mb-8 max-w-2xl">
                  {project.descriptionShort}
                </p>

                <div className="flex flex-wrap items-center gap-3 mb-8">
                  {project.category && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 bg-white/5">
                      {project.category === "Mobile App" ? <Smartphone className="h-4 w-4 text-white/75" /> : <Globe className="h-4 w-4 text-white/75" />}
                      {project.category}
                    </span>
                  )}
                  {caseStudy?.role && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 bg-white/5">
                      <User className="h-4 w-4 text-white/75" />
                      {toSentenceCase(caseStudy.role)}
                    </span>
                  )}
                  {caseStudy?.startDate && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 bg-white/5">
                      <Calendar className="h-4 w-4 text-white/75" />
                      {new Date(caseStudy.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                      {caseStudy.endDate && ` – ${new Date(caseStudy.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-white/10 bg-slate-950/60 backdrop-blur-xl px-5 py-1.5 md:px-6 md:py-2 text-xs md:text-sm font-medium text-white transition-all duration-300 ease-out hover:border-cyan-400 hover:px-7 md:hover:px-8"
                    >
                      <span className="relative z-10 inline-flex items-center gap-2 transition-transform duration-300 group-hover:-translate-x-3">
                        <span className="text-cyan-400"><ExternalLink className="h-4 w-4" /></span>
                        Visit Website
                      </span>
                      <ArrowRight className="absolute right-3 md:right-4 h-4 w-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-cyan-400" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-white/10 bg-slate-950/60 backdrop-blur-xl px-5 py-1.5 md:px-6 md:py-2 text-xs md:text-sm font-medium text-white transition-all duration-300 ease-out hover:border-cyan-400 hover:px-7 md:hover:px-8"
                    >
                      <span className="relative z-10 inline-flex items-center gap-2 transition-transform duration-300 group-hover:-translate-x-3">
                        <span className="text-cyan-400"><Github className="h-4 w-4" /></span>
                        View on GitHub
                      </span>
                      <ArrowRight className="absolute right-3 md:right-4 h-4 w-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-cyan-400" />
                    </a>
                  )}
                </div>
              </div>
            </header>

            {/* ─── 01 Overview ─── */}
            {caseStudy.overview && (
              <section className="relative">
                <SectionHeading section={s.overview} />
                <Card className="p-6 md:p-8">
                  <p className="text-white/80 leading-relaxed text-justify text-sm md:text-base">{caseStudy.overview}</p>
                </Card>
              </section>
            )}

            {/* ─── 02 Problems ─── */}
            {caseStudy.problems.length > 0 && (
              <section className="relative">
                <SectionHeading section={s.problems} />
                <div className="grid gap-5 md:grid-cols-2">
                  {caseStudy.problems.map((p, i) => (
                    <AccentCard key={i}>
                      <div className="flex items-start gap-3 mb-2">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-red-400/10 border border-red-400/20 text-xs font-bold text-red-400 shrink-0">
                          {i + 1}
                        </span>
                        <p className="font-semibold text-white text-sm md:text-base">{p.title}</p>
                      </div>
                      <p className="text-white/80 text-sm md:text-base leading-relaxed text-justify pl-9">{p.description}</p>
                    </AccentCard>
                  ))}
                </div>
              </section>
            )}

            {/* ─── 03 Solutions ─── */}
            {caseStudy.solutions.length > 0 && (
              <section className="relative">
                <SectionHeading section={s.solutions} />
                <div className="grid gap-5 md:grid-cols-2">
                  {caseStudy.solutions.map((sol, i) => (
                    <AccentCard key={i}>
                      <div className="flex items-start gap-3 mb-2">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-xs font-bold text-emerald-400 shrink-0">
                          {i + 1}
                        </span>
                        <p className="font-semibold text-white text-sm md:text-base">{sol.title}</p>
                      </div>
                      <p className="text-white/80 text-sm md:text-base leading-relaxed text-justify pl-9">{sol.description}</p>
                    </AccentCard>
                  ))}
                </div>
              </section>
            )}

            {/* ─── 04 Contributions ─── */}
            {caseStudy.contributions.length > 0 && (
              <section className="relative">
                <SectionHeading section={s.contributions} />
                <div className="grid gap-4 grid-cols-1">
                  {caseStudy.contributions.map((c, i) => (
                    <AccentCard key={i}>
                      <div className="flex gap-3 items-start">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-amber-400/10 border border-amber-400/20 shrink-0">
                          <CheckCircle className="h-3.5 w-3.5 text-amber-400" />
                        </div>
                        <p className="text-white/80 text-sm md:text-base leading-relaxed text-justify">{c}</p>
                      </div>
                    </AccentCard>
                  ))}
                </div>
              </section>
            )}

            {/* ─── 05 Features ─── */}
            {caseStudy.features.length > 0 && (
              <section className="relative">
                <SectionHeading section={s.features} />
                <div className="grid gap-5 md:grid-cols-2">
                  {caseStudy.features.map((f, i) => (
                    <AccentCard key={i}>
                      <div className="mb-3">
                        <span className="text-3xl">{f.icon}</span>
                      </div>
                      <h3 className="text-white font-semibold text-base md:text-lg mb-1">{f.title}</h3>
                      <p className="text-white/80 text-sm md:text-base leading-relaxed text-justify">{f.description}</p>
                    </AccentCard>
                  ))}
                </div>
              </section>
            )}

            {/* ─── 06 Tech Stack ─── */}
            {techSkills.length > 0 && (
              <section className="relative">
                <SectionHeading section={s.techStack} />
                <TechStackIcons skills={techSkills} />
              </section>
            )}

            {/* ─── 07 Gallery ─── */}
            {caseStudy.gallery.length > 0 && (
              <section className="relative">
                <SectionHeading section={s.gallery} />
                <Card className="p-4 md:p-6">
                  <GalleryCarousel items={caseStudy.gallery} />
                </Card>
              </section>
            )}

            {/* ─── 08 Results ─── */}
            {caseStudy.results.length > 0 && (
              <section className="relative">
                <SectionHeading section={s.results} />
                <div className="grid gap-5 md:grid-cols-2">
                  {caseStudy.results.map((r, i) => (
                    <AccentCard key={i}>
                      <div className="mb-3">
                        <span className="text-3xl">{r.icon}</span>
                      </div>
                      <h3 className="text-white font-semibold text-base md:text-lg mb-1">{r.title}</h3>
                      <p className="text-white/80 text-sm md:text-base leading-relaxed text-justify">{r.description}</p>
                    </AccentCard>
                  ))}
                </div>
              </section>
            )}

            {/* ─── Footer Navigation Section (dense & compact) ─── */}
            <div className="space-y-6 pt-4">
              {/* Divider */}
              <div className="h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              {/* Prev / Next Project */}
              <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {prevProject ? (
                  <Link
                    href={`/projects/${prevProject.slug}`}
                    className="group relative overflow-hidden rounded-2xl border-2 border-white/10 bg-slate-950/60 backdrop-blur-xl px-6 py-4 md:px-8 md:py-5 transition-all duration-300 hover:border-cyan-400/30 hover:bg-slate-950/80"
                  >
                    {/* Decorative background text */}
                    <div className="absolute -top-6 -right-4 text-[4rem] md:text-[6rem] font-bold text-white/[0.015] select-none pointer-events-none leading-none">
                      {prevProject.title.split(" ")[0]}
                    </div>
                    <div className="relative z-10 flex items-center gap-4 md:gap-5">
                      <div className="flex items-center justify-center h-12 w-12 md:h-14 md:w-14 rounded-full border-2 border-white/10 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10 transition-all duration-300 shrink-0">
                        <ArrowLeft className="h-6 w-6 md:h-7 md:w-7 text-white/90 group-hover:text-cyan-300 transition-colors" />
                      </div>
                      <div>
                        <p className="text-lg md:text-xl font-bold text-white/90 group-hover:text-white transition-colors">
                          {prevProject.title}
                        </p>
                        <p className="text-xs md:text-sm text-white/80 mt-0.5">Previous Project</p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {nextProject ? (
                  <Link
                    href={`/projects/${nextProject.slug}`}
                    className="group relative overflow-hidden rounded-2xl border-2 border-white/10 bg-slate-950/60 backdrop-blur-xl px-6 py-4 md:px-8 md:py-5 transition-all duration-300 hover:border-cyan-400/30 hover:bg-slate-950/80 sm:text-right"
                  >
                    <div className="absolute -bottom-6 -left-4 text-[4rem] md:text-[6rem] font-bold text-white/[0.015] select-none pointer-events-none leading-none">
                      {nextProject.title.split(" ")[0]}
                    </div>
                    <div className="relative z-10 flex items-center gap-4 md:gap-5 justify-end">
                      <div className="sm:hidden order-2">
                        <p className="text-lg md:text-xl font-bold text-white/90 group-hover:text-white transition-colors">
                          {nextProject.title}
                        </p>
                        <p className="text-xs md:text-sm text-white/80 mt-0.5">Next Project</p>
                      </div>
                      <div className="hidden sm:block">
                        <p className="text-lg md:text-xl font-bold text-white/90 group-hover:text-white transition-colors">
                          {nextProject.title}
                        </p>
                        <p className="text-xs md:text-sm text-white/80 mt-0.5">Next Project</p>
                      </div>
                      <div className="flex items-center justify-center h-12 w-12 md:h-14 md:w-14 rounded-full border-2 border-white/10 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10 transition-all duration-300 shrink-0">
                        <ArrowRight className="h-6 w-6 md:h-7 md:w-7 text-white/90 group-hover:text-cyan-300 transition-colors" />
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
              </nav>

              {/* Back to Home */}
              <div className="text-center pt-2">
                <Link
                  href="/"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-white/10 bg-slate-950/60 backdrop-blur-xl px-8 py-2.5 md:px-10 md:py-3 text-sm md:text-base font-medium text-white transition-all duration-300 ease-out hover:border-cyan-400 hover:px-10 md:hover:px-12"
                >
                  <span className="pointer-events-none absolute inset-0 w-[200%] -left-[150%] bg-linear-to-r from-transparent via-white/20 to-transparent animate-[shine_4s_ease-in-out_infinite]" />
                  <span className="relative z-10 inline-flex items-center gap-3 transition-transform duration-300 group-hover:-translate-x-3">
                    <span className="text-cyan-400"><ArrowLeft className="h-5 w-5 md:h-6 md:w-6" /></span>
                    Back to Home
                  </span>
                  <ChevronRight className="absolute right-6 md:right-7 h-5 w-5 md:h-6 md:w-6 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-cyan-400" />
                </Link>
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/80 text-lg">No case study available for this project yet.</p>
            <Link
              href="/"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-white/10 bg-slate-950/60 backdrop-blur-xl px-8 py-2.5 md:px-10 md:py-3 text-sm md:text-base font-medium text-white transition-all duration-300 ease-out hover:border-cyan-400 hover:px-10 md:hover:px-12 mt-6"
            >
              <span className="pointer-events-none absolute inset-0 w-[200%] -left-[150%] bg-linear-to-r from-transparent via-white/20 to-transparent animate-[shine_4s_ease-in-out_infinite]" />
              <span className="relative z-10 inline-flex items-center gap-3 transition-transform duration-300 group-hover:-translate-x-3">
                <span className="text-cyan-400"><ArrowLeft className="h-5 w-5 md:h-6 md:w-6" /></span>
                Back to Home
              </span>
              <ChevronRight className="absolute right-6 md:right-7 h-5 w-5 md:h-6 md:w-6 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-cyan-400" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
