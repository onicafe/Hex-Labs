import type { Project } from "@/data/projects";

// Image when the project has one; otherwise a typographic cover in the site palette.
const ProjectCover = ({ project, className = "" }: { project: Project; className?: string }) =>
  project.image ? (
    <img src={project.image} alt={project.title} loading="lazy" className={`w-full h-full object-cover ${className}`} />
  ) : (
    <div
      role="img"
      aria-label={project.title}
      className={`w-full h-full flex flex-col justify-end p-8 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--primary)/0.25),transparent_55%)] ${className}`}
    >
      <p className="font-body text-xs tracking-[0.3em] text-primary mb-3">{project.category.toUpperCase()}</p>
      <p className="font-display text-4xl md:text-5xl font-bold text-foreground">{project.title}</p>
      {project.tools && <p className="font-body text-sm text-muted-foreground mt-3">{project.tools.join(" · ")}</p>}
    </div>
  );

export default ProjectCover;
