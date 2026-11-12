import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import ProjectCover from "@/components/ProjectCover";
import { useI18n } from "@/i18n";

const badge: Record<string, [string, string]> = {
  Voluntário: ["Voluntário", "Volunteer"],
  "Projeto autoral": ["Projeto autoral", "Personal project"],
};

const ProjectCard = ({ project, showSummary = true }: { project: Project; showSummary?: boolean }) => {
  const { lp, tr } = useI18n();
  const label = project.engagement ? badge[project.engagement] : undefined;
  return (
    <Link to={lp(`/projects/${project.slug}`)} className="group block h-full">
      <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-card border border-border">
        <ProjectCover project={project} className="transition-transform duration-700 group-hover:scale-[1.04]" />
        {label && (
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/90 backdrop-blur font-mono text-xs text-foreground border border-border">
            {tr(label[0], label[1])}
          </span>
        )}
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-xs text-muted-foreground mb-2">
            {project.client}
            {project.year && ` · ${project.year}`}
          </p>
          <h3 className="font-display text-xl lg:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          {showSummary && <p className="font-body text-[15px] text-muted-foreground mt-2 leading-relaxed">{project.summary}</p>}
        </div>
        <ArrowUpRight className="w-5 h-5 shrink-0 mt-6 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </Link>
  );
};

export default ProjectCard;
