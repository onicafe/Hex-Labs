import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import ProjectCover from "@/components/ProjectCover";

const ProjectCard = ({ project, showSummary = true }: { project: Project; showSummary?: boolean }) => (
  <Link to={`/projects/${project.slug}`} className="group block h-full">
    <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-card border border-border">
      <ProjectCover project={project} className="transition-transform duration-700 group-hover:scale-[1.04]" />
      {project.engagement === "Voluntário" && (
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/90 backdrop-blur font-mono text-[11px] text-foreground border border-border">
          Voluntário
        </span>
      )}
    </div>

    <div className="mt-5 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="font-mono text-[11px] text-muted-foreground mb-2">
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

export default ProjectCard;
