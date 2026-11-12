import ifrnLogo from "@/assets/clients/ifrn.webp";
import trf5Logo from "@/assets/clients/trf5.webp";
import dioneLogo from "@/assets/clients/dione.webp";
import rnLogo from "@/assets/clients/rn.webp";
import spillLogo from "@/assets/clients/spillfabrikken.webp";
import { useI18n } from "@/i18n";

// Faixa de logotipos: todos na cor da tinta; a cor original aparece no hover.
const TrustedBy = () => {
  const { tr } = useI18n();
  const clients = [
    { name: "SpillFabrikken", logo: spillLogo },
    { name: "Dione Solutions", logo: dioneLogo },
    { name: "TRF5", logo: trf5Logo, volunteer: true },
    { name: tr("Governo do RN", "State of Rio Grande do Norte"), logo: rnLogo, volunteer: true },
    { name: "IFRN", logo: ifrnLogo, volunteer: true },
  ];
  return (
    <section className="border-y border-border">
      <div className="container mx-auto px-6 lg:px-12 py-8 flex flex-col lg:flex-row lg:items-center gap-6">
        <p className="font-mono text-xs text-muted-foreground lg:w-56 shrink-0">
          {tr("Organizações e projetos (inclui trabalho voluntário)", "Organizations and projects (including volunteer work)")}
        </p>
        <ul className="flex-1 grid grid-cols-3 sm:grid-cols-5 gap-6 items-end">
          {clients.map((c) => (
            <li key={c.name} className="flex flex-col items-center gap-2">
              <img
                src={c.logo}
                alt={c.name}
                loading="lazy"
                className="h-12 md:h-14 w-auto object-contain brightness-0 opacity-60 hover:brightness-100 hover:opacity-100 transition-all duration-300"
              />
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {c.volunteer ? tr("Voluntário", "Volunteer") : " "}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TrustedBy;
