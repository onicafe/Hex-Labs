import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import ifrnLogo from "@/assets/clients/ifrn.png";
import trf5Logo from "@/assets/clients/trf5.png";
import dioneLogo from "@/assets/clients/dione.png";
import rnLogo from "@/assets/clients/rn.png";
import spillLogo from "@/assets/clients/spillfabrikken.png";

const clients = [
    { name: "TRF5", logo: trf5Logo },
    { name: "IFRN", logo: ifrnLogo },
    { name: "Governo do RN", logo: rnLogo },
    { name: "Dione", logo: dioneLogo },
    { name: "SpillFabrikken", logo: spillLogo },
];

const TrustedBy = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section ref={ref} className="py-32 border-white/5 bg-background/50 backdrop-blur-sm overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
                        Organizações e projetos em que <span className="text-primary">atuei</span>
                    </h3>
                    <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto">
                        Inclui trabalho contratado, freelance e voluntário. Os detalhes de cada um estão nos estudos de caso.
                    </p>
                </motion.div>
            </div>

            <div className="relative flex overflow-x-hidden group mask-linear-gradient" style={{ overflowY: "hidden" }}>
                <motion.div
                    className="flex gap-24 whitespace-nowrap w-max items-center"
                    animate={{ x: ["0%", "-33.333333%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
                >
                    {[...clients, ...clients, ...clients].map((client, index) => (
                        <div
                            key={index}
                            className="inline-flex flex-shrink-0 items-center justify-center transition-all duration-300 group/item"
                        >
                            <img
                                src={client.logo}
                                alt={client.name}
                                className="h-32 w-auto object-contain opacity-50 grayscale group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-300 transform group-hover/item:scale-110"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TrustedBy;
