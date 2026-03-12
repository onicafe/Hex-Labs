import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { supabase } from "@/lib/supabase";

import ifrnLogo from "@/assets/clients/ifrn.png";
import ufrnLogo from "@/assets/clients/ufrn.png";
import trf5Logo from "@/assets/clients/trf5.png";
import dioneLogo from "@/assets/clients/dione.png";
import intelbrasLogo from "@/assets/clients/intelbras.png";
import natalLogo from "@/assets/clients/prefeitura-natal.png";
import rnLogo from "@/assets/clients/rn.png";
import spillLogo from "@/assets/clients/spillfabrikken.png";
import pjeLogo from "@/assets/clients/pje.png";

export const clients = [
    { name: "IFRN", logo: ifrnLogo },
    { name: "UFRN", logo: ufrnLogo },
    { name: "TRF5", logo: trf5Logo },
    { name: "Dione", logo: dioneLogo },
    { name: "Intelbras", logo: intelbrasLogo },
    { name: "Natal", logo: natalLogo },
    { name: "Gov RN", logo: rnLogo },
    { name: "SpillFabrikken", logo: spillLogo },
    { name: "PJe", logo: pjeLogo },
];

const TrustedBy = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const [dbBrands, setDbBrands] = useState<any[]>([]);

    useEffect(() => {
        const fetchBrands = async () => {
            const { data } = await supabase.from('trusted_brands').select('*');
            if (data && data.length > 0) {
                setDbBrands(data);
            }
        };
        fetchBrands();
    }, []);

    const displayClients = dbBrands.length > 0 ? dbBrands.map(b => ({ name: b.name, logo: b.logo_url })) : clients;

    return (
        <section ref={ref} className="py-48 border-white/5 bg-background/50 backdrop-blur-sm overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 mb-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
                        Usam <span className="text-primary">Tecnologia</span> Hex Labs
                    </h3>
                    <p className="font-body text-lg tracking-wider text-muted-foreground uppercase opacity-70">
                        Marcas e Organizações que confiam na nossa engenharia
                    </p>
                </motion.div>
            </div>

            <div className="relative flex overflow-x-hidden group mask-linear-gradient" style={{ overflowY: "hidden" }}>
                <motion.div
                    className="flex gap-24 whitespace-nowrap w-max items-center"
                    animate={{ x: ["0%", "-33.333333%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
                >
                    {[...displayClients, ...displayClients, ...displayClients].map((client, index) => (
                        <div
                            key={index}
                            className="inline-flex flex-shrink-0 items-center justify-center transition-all duration-300 cursor-pointer group/item"
                        >
                            <img
                                src={client.logo}
                                alt={client.name}
                                className="h-40 w-auto object-contain opacity-50 grayscale group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-300 transform group-hover/item:scale-110"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TrustedBy;
