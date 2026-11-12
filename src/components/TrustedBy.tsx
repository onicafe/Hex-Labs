import ifrnLogo from "@/assets/clients/ifrn.webp";
import trf5Logo from "@/assets/clients/trf5.webp";
import dioneLogo from "@/assets/clients/dione.webp";
import rnLogo from "@/assets/clients/rn.webp";
import spillLogo from "@/assets/clients/spillfabrikken.webp";

const clients = [
    { name: "SpillFabrikken", logo: spillLogo },
    { name: "TRF5", logo: trf5Logo },
    { name: "Governo do RN", logo: rnLogo },
    { name: "IFRN", logo: ifrnLogo },
    { name: "Dione", logo: dioneLogo },
];

// Faixa de logotipos: todos na cor da tinta; a cor original aparece no hover.
const TrustedBy = () => (
    <section className="border-y border-border">
        <div className="container mx-auto px-6 lg:px-12 py-10 flex flex-col lg:flex-row lg:items-center gap-8">
            <p className="font-mono text-xs text-muted-foreground lg:w-56 shrink-0">
                Organizações e projetos em que atuei, incluindo trabalho voluntário
            </p>
            <ul className="flex-1 grid grid-cols-3 sm:grid-cols-5 gap-6 items-center">
                {clients.map((c) => (
                    <li key={c.name} className="flex justify-center">
                        <img
                            src={c.logo}
                            alt={c.name}
                            loading="lazy"
                            className="h-16 md:h-20 w-auto object-contain brightness-0 opacity-60 hover:brightness-100 hover:opacity-100 transition-all duration-300"
                        />
                    </li>
                ))}
            </ul>
        </div>
    </section>
);

export default TrustedBy;
