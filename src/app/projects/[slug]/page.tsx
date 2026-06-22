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
  { key: "problems", color: "text-white/60", label: "Problems", num: "02" },
  { key: "solutions", color: "text-white/60", label: "Solutions", num: "03" },
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
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
      <div className="p-5 relative z-10">
        {children}
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const [project, caseStudy] = await Promise.all([
    getProjectBySlug(slug),
    getCaseStudyByProjectSlug(slug),
  ]);
  if (!project) return { title: "Project Not Found" };
  const description = caseStudy?.overview?.slice(0, 160) || project.descriptionShort ||
    `Case study of ${project.title} - a ${project.category?.toLowerCase() || "software"} project by Rhesa Tsaqif.`;
  return {
    title: `${project.title} | Rhesa Tsaqif`,
    description,
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

  const allTechSkills = project.techStacks.map((name) => {
    const found = techSkills.find((s) => s.name === name);
    return {
      name,
      iconUrl: found ? found.iconUrl : null,
    };
  });

  const STORAGE = "https://ipkrjpftddtxwzmylxtf.supabase.co/storage/v1/object/public";

  function storageUrl(path: string) {
    if (path.startsWith("http") || path.startsWith("/")) return path;
    return `${STORAGE}/${path}`;
  }

  const s = SECTION_MAP;

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 sm:px-10 md:px-20 lg:px-28">
      <div className="mx-auto max-w-6xl">
        <BreadcrumbNav projectTitle={project.title} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://rhesatsaqif.vercel.app" },
                { "@type": "ListItem", position: 2, name: "Projects", item: "https://rhesatsaqif.vercel.app/projects" },
                { "@type": "ListItem", position: 3, name: project.title, item: `https://rhesatsaqif.vercel.app/projects/${slug}` },
              ],
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": project.category === "Mobile App" ? "SoftwareApplication" : "WebApplication",
              "name": project.title,
              "description": project.descriptionShort || "",
              "applicationCategory": project.category === "Mobile App" ? "MobileApplication" : "WebApplication",
              "operatingSystem": project.category === "Mobile App" ? "Android, iOS" : "Browser",
              "url": `https://rhesatsaqif.vercel.app/projects/${slug}`,
              "image": project.thumbnailUrl ? storageUrl(project.thumbnailUrl) : undefined,
              "author": {
                "@type": "Person",
                "name": "Rhesa Tsaqif Adyatma",
                "url": "https://rhesatsaqif.vercel.app"
              }
            }),
          }}
        />

        {caseStudy ? (
          <div className="space-y-16">

            {/* ─── HERO ─── */}
            <header className="relative overflow-hidden rounded-3xl border-2 border-white/10 bg-slate-950/60 backdrop-blur-xl px-6 md:px-10 py-4 md:py-6">
              <DecorativeGrid />
              <DecorativeOrb className="-top-40 -right-40 w-80 h-80 bg-cyan-500/5" />
              <DecorativeOrb className="-bottom-40 -left-40 w-80 h-80 bg-blue-500/5" />

              {/* Decorative background text */}
              <div className="absolute -top-6 -right-4 text-[3rem] md:text-[5rem] lg:text-[7rem] font-bold text-white/[0.02] select-none pointer-events-none leading-none tracking-tight">
                {project.title.split(" ")[0]}
              </div>

              <div className="relative z-10">
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-2 md:mb-4 leading-tight">
                  {project.title}
                </h1>

                <p className="text-white/90 text-base md:text-lg leading-relaxed text-justify mb-4 md:mb-6">
                  {project.descriptionShort}
                </p>

                <div className="flex flex-row items-center gap-3 mb-4 md:mb-6 overflow-x-auto scrollbar-none pb-1">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-white/10 bg-slate-950/60 backdrop-blur-xl px-5 py-2 md:px-6 md:py-3 text-xs md:text-sm font-medium text-white transition-all duration-300 ease-out hover:border-cyan-400 hover:px-7 md:hover:px-8"
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
                      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-white/10 bg-slate-950/60 backdrop-blur-xl px-5 py-2 md:px-6 md:py-3 text-xs md:text-sm font-medium text-white transition-all duration-300 ease-out hover:border-cyan-400 hover:px-7 md:hover:px-8"
                    >
                      <span className="relative z-10 inline-flex items-center gap-2 transition-transform duration-300 group-hover:-translate-x-3">
                        <span className="text-cyan-400"><Github className="h-4 w-4" /></span>
                        View on GitHub
                      </span>
                      <ArrowRight className="absolute right-3 md:right-4 h-4 w-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-cyan-400" />
                    </a>
                  )}
                </div>

                {project.thumbnailUrl && (
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40 mb-6 md:mb-8">
                    <ImageWithFallback
                      src={storageUrl(project.thumbnailUrl)}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 1024px"
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="w-full divide-y divide-white/20">
                  {project.category && (
                    <div className="flex items-center py-2 md:py-4">
                      <div className="flex items-center gap-3 w-32 md:w-48 shrink-0">
                        {project.category === "Mobile App" ? (
                          <Smartphone className="h-5 w-5 text-white/90" />
                        ) : (
                          <Globe className="h-5 w-5 text-white/90" />
                        )}
                        <span className="text-sm md:text-base font-medium text-white/90 tracking-wide">Category</span>
                      </div>
                      <span className="text-sm md:text-base font-medium text-white">{project.category}</span>
                    </div>
                  )}
                  {caseStudy?.role && (
                    <div className="flex items-center py-4">
                      <div className="flex items-center gap-3 w-32 md:w-48 shrink-0">
                        <User className="h-5 w-5 text-white/90" />
                        <span className="text-sm md:text-base font-medium text-white/90 tracking-wide">Role</span>
                      </div>
                      <span className="text-sm md:text-base font-medium text-white">{caseStudy.role}</span>
                    </div>
                  )}
                  {caseStudy?.startDate && (
                    <div className="flex items-center py-4">
                      <div className="flex items-center gap-3 w-32 md:w-48 shrink-0">
                        <Calendar className="h-5 w-5 text-white/90" />
                        <span className="text-sm md:text-base font-medium text-white/90 tracking-wide">Timeline</span>
                      </div>
                      <span className="text-sm md:text-base font-medium text-white">
                        {new Date(caseStudy.startDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                        {caseStudy.endDate && ` – ${new Date(caseStudy.endDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </header>

            {/* ─── 01 Overview ─── */}
            {caseStudy.overview && (
              <section className="relative">
                <SectionHeading section={s.overview} />
                <Card className="p-6 md:p-8">
                  <p className="text-white/90 leading-relaxed text-justify text-sm md:text-base">{caseStudy.overview}</p>
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
                      <div className="mb-3">
                        <span className="text-3xl">{p.icon}</span>
                      </div>
                      <h3 className="text-white font-semibold text-base md:text-lg mb-1">{p.title}</h3>
                      <p className="text-white/90 text-sm md:text-base leading-relaxed text-justify">{p.description}</p>
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
                      <div className="mb-3">
                        <span className="text-3xl">{sol.icon}</span>
                      </div>
                      <h3 className="text-white font-semibold text-base md:text-lg mb-1">{sol.title}</h3>
                      <p className="text-white/90 text-sm md:text-base leading-relaxed text-justify">{sol.description}</p>
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
                      <div className="flex gap-4 items-center">
                        <CheckCircle className="h-6 w-6 md:h-7 md:w-7 text-white shrink-0" />
                        <p className="text-white/90 text-sm md:text-base leading-relaxed text-justify">{c}</p>
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
                      <p className="text-white/90 text-sm md:text-base leading-relaxed text-justify">{f.description}</p>
                    </AccentCard>
                  ))}
                </div>
              </section>
            )}

            {/* ─── 06 Tech Stack ─── */}
            {allTechSkills.length > 0 && (
              <section className="relative">
                <SectionHeading section={s.techStack} />
                <TechStackIcons skills={allTechSkills} />
              </section>
            )}

            {/* ─── 07 Gallery ─── */}
            {caseStudy.gallery.length > 0 && (
              <section className="relative">
                <SectionHeading section={s.gallery} />
                <Card className="p-4 md:p-8 lg:p-10">
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
                      <p className="text-white/90 text-sm md:text-base leading-relaxed text-justify">{r.description}</p>
                    </AccentCard>
                  ))}
                </div>
              </section>
            )}

            {/* ─── Footer Navigation Section (dense & compact) ─── */}
            <nav className="space-y-6">
              {/* Divider */}
              <div className="h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              {/* Prev / Next Project */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
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
                        <p className="text-sm md:text-mdd text-white/90 mb-1">Previous Project</p>
                        <p className="text-lg md:text-xl font-bold text-white/90 group-hover:text-white transition-colors">
                          {prevProject.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {nextProject ? (
                  <Link
                    href={`/projects/${nextProject.slug}`}
                    className="group relative overflow-hidden rounded-2xl border-2 border-white/10 bg-slate-950/60 backdrop-blur-xl px-6 py-4 md:px-8 md:py-5 transition-all duration-300 hover:border-cyan-400/30 hover:bg-slate-950/80"
                  >
                    <div className="absolute -bottom-6 -right-4 text-[4rem] md:text-[6rem] font-bold text-white/[0.015] select-none pointer-events-none leading-none">
                      {nextProject.title.split(" ")[0]}
                    </div>
                    <div className="relative z-10 flex items-center gap-4 md:gap-5">
                      <div className="flex items-center justify-center h-12 w-12 md:h-14 md:w-14 rounded-full border-2 border-white/10 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10 transition-all duration-300 shrink-0">
                        <ArrowRight className="h-6 w-6 md:h-7 md:w-7 text-white/90 group-hover:text-cyan-300 transition-colors" />
                      </div>
                      <div>
                        <p className="text-sm md:text-mdd text-white/90 mb-1">Next Project</p>
                        <p className="text-lg md:text-xl font-bold text-white/90 group-hover:text-white transition-colors">
                          {nextProject.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
              </div>

              {/* Back to Projects */}
              <div className="text-center pt-2">
                <Link
                  href="/projects"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-white/10 bg-slate-950/60 backdrop-blur-xl px-8 py-2.5 md:px-10 md:py-3 text-sm md:text-base font-medium text-white transition-all duration-300 ease-out hover:border-cyan-400 hover:px-10 md:hover:px-12"
                >
                  <span className="pointer-events-none absolute inset-0 w-[200%] -left-[150%] bg-linear-to-r from-transparent via-white/20 to-transparent animate-[shine_4s_ease-in-out_infinite]" />
                  <span className="relative z-10 inline-flex items-center gap-3 transition-transform duration-300 group-hover:-translate-x-3">
                    Back to Projects
                  </span>
                  <ChevronRight className="absolute right-6 md:right-7 h-5 w-5 md:h-6 md:w-6 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-cyan-400" />
                </Link>
              </div>
            </nav>

          </div>
        ) : (
          <div className="text-center py-28">
            <p className="text-white/80 text-lg">No case study available for this project yet.</p>
            <Link
              href="/projects"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-white/10 bg-slate-950/60 backdrop-blur-xl px-8 py-2.5 md:px-10 md:py-3 text-sm md:text-base font-medium text-white transition-all duration-300 ease-out hover:border-cyan-400 hover:px-10 md:hover:px-12 mt-6"
            >
              <span className="pointer-events-none absolute inset-0 w-[200%] -left-[150%] bg-linear-to-r from-transparent via-white/20 to-transparent animate-[shine_4s_ease-in-out_infinite]" />
              <span className="relative z-10 inline-flex items-center gap-3 transition-transform duration-300 group-hover:-translate-x-3">
                Back to Projects
              </span>
              <ChevronRight className="absolute right-6 md:right-7 h-5 w-5 md:h-6 md:w-6 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-cyan-400" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
