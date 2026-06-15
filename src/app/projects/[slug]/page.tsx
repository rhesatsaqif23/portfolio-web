import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Calendar, User } from "lucide-react";
import { getProjectBySlug, getCaseStudyByProjectSlug } from "@/src/lib/data";
import Image from "next/image";

interface Props {
  params: Promise<{ slug: string }>;
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
  const [project, caseStudy] = await Promise.all([
    getProjectBySlug(slug),
    getCaseStudyByProjectSlug(slug),
  ]);

  if (!project) notFound();

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 sm:px-10 md:px-20 lg:px-28">
      <div className="mx-auto max-w-4xl">
        {/* Back link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>

        {/* Hero */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {project.title}
          </h1>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
            {project.descriptionShort}
          </p>

          {/* Role + Dates */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/70 mb-6">
            {caseStudy?.role && (
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {caseStudy.role}
              </span>
            )}
            {caseStudy?.startDate && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(caseStudy.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                {caseStudy.endDate && ` – ${new Date(caseStudy.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 border border-cyan-400/30 px-4 py-2 text-sm text-cyan-300 hover:bg-cyan-400/20 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Visit Website
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/20 px-4 py-2 text-sm text-white/80 hover:text-white hover:border-white/40 transition-colors"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            )}
          </div>
        </header>

        {caseStudy ? (
          <div className="space-y-16">
            {/* Overview */}
            {caseStudy.overview && (
              <section>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Overview</h2>
                <p className="text-white/80 leading-relaxed">{caseStudy.overview}</p>
              </section>
            )}

            {/* Problems & Solutions */}
            {caseStudy.problems.length > 0 && caseStudy.solutions.length > 0 && (
              <section>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Problems & Solutions</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-semibold text-red-400 mb-3">Problems</h3>
                    <ul className="space-y-4">
                      {caseStudy.problems.map((p, i) => (
                        <li key={i} className="border-l-2 border-red-400/30 pl-4">
                          <p className="font-medium text-white/90 text-sm">{p.title}</p>
                          <p className="text-white/70 text-sm mt-1">{p.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-400 mb-3">Solutions</h3>
                    <ul className="space-y-4">
                      {caseStudy.solutions.map((s, i) => (
                        <li key={i} className="border-l-2 border-emerald-400/30 pl-4">
                          <p className="font-medium text-white/90 text-sm">{s.title}</p>
                          <p className="text-white/70 text-sm mt-1">{s.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {/* Contributions */}
            {caseStudy.contributions.length > 0 && (
              <section>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">My Contributions</h2>
                <ul className="space-y-3">
                  {caseStudy.contributions.map((c, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <div className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span className="text-white/80">{c}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Tech Stack */}
            {caseStudy.techStacks.length > 0 && (
              <section>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Tech Stack</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {caseStudy.techStacks.map((tc, i) => (
                    <div key={i} className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
                      <h3 className="text-sm font-semibold text-cyan-300 mb-3">{tc.category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {tc.items.map((item, j) => (
                          <span key={j} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80">
                            {item.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Features */}
            {caseStudy.features.length > 0 && (
              <section>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Features</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {caseStudy.features.map((f, i) => (
                    <div key={i} className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
                      <p className="text-2xl mb-2">{f.icon}</p>
                      <h3 className="text-white font-semibold mb-1">{f.title}</h3>
                      <p className="text-white/70 text-sm">{f.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Gallery */}
            {caseStudy.gallery.length > 0 && (
              <section>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Gallery</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {caseStudy.gallery.map((g, i) => (
                    <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                      <Image
                        src={g.url}
                        alt={g.alt}
                        fill
                        className="object-cover"
                      />
                      {g.caption && (
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                          <p className="text-white text-xs">{g.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Challenges */}
            {caseStudy.challenges.length > 0 && (
              <section>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Challenges</h2>
                <div className="space-y-4">
                  {caseStudy.challenges.map((ch, i) => (
                    <div key={i} className="border-l-2 border-amber-400/30 pl-4">
                      <p className="font-medium text-white/90">{ch.title}</p>
                      <p className="text-white/70 text-sm mt-1">{ch.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Results */}
            {caseStudy.results.length > 0 && (
              <section>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Results</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {caseStudy.results.map((r, i) => (
                    <div key={i} className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
                      <p className="text-2xl mb-2">{r.icon}</p>
                      <h3 className="text-white font-semibold mb-1">{r.title}</h3>
                      <p className="text-white/70 text-sm">{r.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Future Plans */}
            {caseStudy.futurePlans.length > 0 && (
              <section>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Future Plans</h2>
                <ul className="space-y-3">
                  {caseStudy.futurePlans.map((fp, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="text-cyan-300 mt-0.5">&#8226;</span>
                      <span className="text-white/80">{fp}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Team */}
            {caseStudy.team.length > 0 && (
              <section>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Team</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {caseStudy.team.map((m, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/60 p-4">
                      {m.avatar ? (
                        <Image src={m.avatar} alt={m.name} width={40} height={40} className="rounded-full object-cover" />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 text-sm font-semibold">
                          {m.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="text-white font-medium text-sm">{m.name}</p>
                        <p className="text-white/60 text-xs">{m.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/40 text-lg">No case study available for this project yet.</p>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors mt-4 text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
