import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n";

// Faixa "na imprensa": os nomes dos veículos levam às matérias; o link leva ao case.
const outlets = [
  { name: "Forbes", url: "https://www.forbes.com/sites/erikkain/2020/04/08/think-the-new-ps5-controller-is-ugly-check-it-out-in-all-these-colors-including-spider-man/" },
  { name: "Game Informer", url: "https://gameinformer.com/gamer-culture/2020/04/08/people-are-dreaming-up-different-colors-for-the-dualsense-controller" },
  { name: "Tom's Guide", url: "https://www.tomsguide.com/news/ps5-controller-dualsense-concepts" },
  { name: "Screen Rant", url: "https://screenrant.com/ps5-dualsense-custome-fan-designs/" },
  { name: "Wccftech", url: "https://wccftech.com/valorant-playstation-5-dualsense-mockup/" },
];

const Press = () => {
  const { tr, lp } = useI18n();
  return (
    <section className="border-b border-border" aria-label={tr("Na imprensa", "In the press")}>
      <div className="container mx-auto px-6 lg:px-12 py-8 flex flex-col lg:flex-row lg:items-center gap-6">
        <p className="font-mono text-xs text-muted-foreground lg:w-56 shrink-0">
          {tr("Meus conceitos de DualSense (2020) foram destacados por", "My DualSense concepts (2020) were featured by")}
        </p>
        <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 min-w-0">
          <ul className="flex flex-wrap items-baseline gap-x-6 md:gap-x-8 gap-y-2">
            {outlets.map((o) => (
              <li key={o.name}>
                <a
                  href={o.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-xl md:text-2xl font-semibold text-foreground/60 hover:text-foreground transition-colors"
                >
                  {o.name}
                </a>
              </li>
            ))}
          </ul>
          <Link
            to={lp("/projects/dualsense")}
            className="group inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground md:ml-auto shrink-0"
          >
            {tr("Ver os conceitos", "See the concepts")}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Press;
