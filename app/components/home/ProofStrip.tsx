import { useTranslations } from 'next-intl';
import CountUp from './CountUp';

interface Stat {
    Value: string;
    Label: string;
    LabelMobile: string;
}

const clients = ['H&W Publishing', 'Lumis', 'LA Medic', 'Start Crypto'];

const ProofStrip = () => {
    const t = useTranslations('Proof');
    const stats: Stat[] = t.raw('Stats');

    return (
        <div className="border-t border-b border-black/[0.06] dark:border-white/[0.06] bg-black/[0.015] dark:bg-white/[0.015]">

            {/* Desktop */}
            <div className="hidden lg:flex items-center justify-between px-14 py-[34px]">
                <div className="flex gap-14">
                    {stats.map((stat, index) => (
                        <div key={index}>
                            <CountUp value={stat.Value} className="font-title text-[44px] text-laranja leading-none tabular-nums" />
                            <div className="font-mono text-[11px] text-preto/55 dark:text-branco/55 tracking-[0.06em] mt-1">{stat.Label}</div>
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-6 font-title text-[17px] uppercase text-preto/35 dark:text-branco/35 tracking-[0.04em]">
                    {clients.map((client, index) => (
                        <span key={client} className="flex items-center gap-6">
                            {index > 0 && <span className="text-black/[0.12] dark:text-white/[0.12]">·</span>}
                            {client}
                        </span>
                    ))}
                </div>
            </div>

            {/* Mobile */}
            <div className="lg:hidden grid grid-cols-2 gap-px bg-black/[0.06] dark:bg-white/[0.06]">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-creme dark:bg-[#1a1a1a] px-[22px] py-5">
                        <CountUp value={stat.Value} className="font-title text-[34px] text-laranja leading-none tabular-nums" />
                        <div className="font-mono text-[10px] text-preto/50 dark:text-branco/50 mt-[3px]">{stat.LabelMobile}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProofStrip;
