import Link from "next/link";

interface Props {
  projectTitle: string;
}

export default function BreadcrumbNav({ projectTitle }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="pt-8 md:pt-12 mb-12">
      <ol className="flex flex-wrap items-center gap-2 text-base text-white/80">
        <li>
          <Link href="/" className="hover:text-cyan-300 transition-colors">
            Home
          </Link>
        </li>
        <li className="text-white/80">/</li>
        <li>
          <Link href="/#projects" className="hover:text-cyan-300 transition-colors">
            Projects
          </Link>
        </li>
        <li className="text-white/80">/</li>
        <li className="text-white/90 truncate max-w-[200px] sm:max-w-none" title={projectTitle}>
          {projectTitle}
        </li>
      </ol>
    </nav>
  );
}
