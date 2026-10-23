import { Link } from "react-router-dom";
import type { Project } from "@/data/projects";

const ProjectCard = ({ project, showSummary = true }: { project: Project; showSummary?: boolean }) => (
  <Link to={`/projects/${project.slug}`} className="group block h-full">
    <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-background border border-white/5">
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {project.engagement === "Voluntário" && (
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur font-body text-xs text-primary border border-primary/30">
          Voluntário
        </span>
      )}
    </div>

    <div className="mt-6 flex items-start justify-between gap-4">
      <div>
        <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="font-body text-sm text-muted-foreground mt-1">
          {project.client} · {project.role}
        </p>
        {showSummary && <p className="font-body text-sm text-muted-foreground/80 mt-3 leading-relaxed">{project.summary}</p>}
      </div>
      <span className="font-body text-sm text-muted-foreground shrink-0">{project.year}</span>
    </div>
  </Link>
);

export default ProjectCard;
