import Spline from '@splinetool/react-spline';
import { Sparkles, Rocket } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full">
      <div className="relative h-80 md:h-[60vh] rounded-2xl overflow-hidden border bg-black/70">
        {/* 3D Scene */}
        <Spline
          scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Gradient overlays - pointer events off so Spline stays interactive */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Headline overlay */}
        <div className="absolute inset-0 flex items-end md:items-center">
          <div className="w-full p-6 md:p-10 text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur">
              <Sparkles size={16} />
              <span className="text-xs md:text-sm">Futuristic, Cyber Aesthetic</span>
            </div>
            <h2 className="mt-3 text-2xl md:text-4xl font-semibold leading-tight tracking-tight">
              Jelajahi Arsip Karya Ilmiah dalam Nuansa Cyberpunk Interaktif
            </h2>
            <p className="mt-2 md:mt-3 text-sm md:text-base text-white/80 max-w-2xl">
              Temukan, telusuri, dan unduh riset terbaru. Animasi 3D responsif menghadirkan pengalaman yang memikat.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="#papers"
                className="inline-flex items-center gap-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 transition-colors"
              >
                <Rocket size={16} /> Mulai Telusuri
              </a>
              <span className="text-xs text-white/70">Interaktif • No login</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
