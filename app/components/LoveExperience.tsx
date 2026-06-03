"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  Heart,
  Lock,
  Moon,
  Music,
  ShieldCheck,
  Sparkles,
  Star,
  Volume2,
  VolumeX,
} from "lucide-react";
import LoveParticles from "./LoveParticles";
import {
  bookPages,
  constellationMessages,
  finalLines,
  gardenReasons,
  heartRepairMessages,
  loveName,
  moonMessages,
} from "../data/loveContent";

type Step =
  | "intro"
  | "moon"
  | "constellation"
  | "garden"
  | "book"
  | "heart"
  | "choice"
  | "final";

const steps: Step[] = [
  "intro",
  "moon",
  "constellation",
  "garden",
  "book",
  "heart",
  "choice",
  "final",
];

export default function LoveExperience() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [step, setStep] = useState<Step>("intro");
  const [musicOn, setMusicOn] = useState(false);
  const [moonTap, setMoonTap] = useState(0);
  const [stars, setStars] = useState<number[]>([]);
  const [flowers, setFlowers] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [heartPieces, setHeartPieces] = useState<number[]>([]);
  const [choice, setChoice] = useState<"fear" | "hope" | null>(null);

  const activeIndex = steps.indexOf(step);

  const starPositions = useMemo(
    () => [
      { left: 12, top: 20 },
      { left: 72, top: 15 },
      { left: 42, top: 34 },
      { left: 18, top: 62 },
      { left: 75, top: 66 },
      { left: 52, top: 78 },
      { left: 30, top: 48 },
      { left: 62, top: 46 },
    ],
    []
  );

  async function toggleMusic() {
    if (!audioRef.current) return;

    if (musicOn) {
      audioRef.current.pause();
      setMusicOn(false);
      return;
    }

    audioRef.current.volume = 0.45;
    await audioRef.current.play();
    setMusicOn(true);
  }

  function go(nextStep: Step) {
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05020b] text-white">
      <audio ref={audioRef} src="/audio/song.mp3" loop preload="auto" />

      <LoveParticles />

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[-18%] top-[-18%] h-[30rem] w-[30rem] animate-pulse rounded-full bg-rose-500/30 blur-3xl" />
        <div className="absolute right-[-20%] top-[20%] h-[30rem] w-[30rem] animate-pulse rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[25%] h-[36rem] w-[36rem] rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>

      <button
        onClick={toggleMusic}
        className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold backdrop-blur transition hover:scale-105"
      >
        {musicOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        {musicOn ? "Música activa" : "Reproducir música"}
      </button>

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-5 py-10">
        <div className="mb-8 flex w-full max-w-md gap-2">
          {steps.map((item, index) => (
            <div
              key={item}
              className={`h-2 flex-1 rounded-full transition-all duration-700 ${
                index <= activeIndex
                  ? "bg-rose-200 shadow-[0_0_25px_rgba(254,205,211,.9)]"
                  : "bg-white/10"
              }`}
            />
          ))}
        </div>

        {step === "intro" && (
          <Screen>
            <Glow>
              <Heart className="h-12 w-12 animate-heartbeat fill-rose-200 text-rose-200" />
            </Glow>

            <p className="text-xs uppercase tracking-[0.45em] text-rose-200/70">
              Para Antonia
            </p>

            <h1 className="mt-5 text-4xl font-black sm:text-6xl">
              Esto no es una página.
              <span className="block bg-gradient-to-r from-rose-100 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">
                Es un pedacito de mi corazón.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-white/70">
              Ponte audífonos, toca reproducir música y avanza despacito.
              Esto fue hecho solo para ti.
            </p>

            <button onClick={() => go("moon")} className="love-button mt-8">
              Empezar
              <ArrowRight className="h-4 w-4" />
            </button>
          </Screen>
        )}

        {step === "moon" && (
          <Screen>
            <h2 className="text-3xl font-black sm:text-5xl">
              Toca la luna
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-white/65">
              Cada toque guarda algo que pensé mientras hacía esto.
            </p>

            <button
              onClick={() =>
                setMoonTap((prev) => Math.min(prev + 1, moonMessages.length))
              }
              className="mx-auto mt-10 flex h-48 w-48 items-center justify-center rounded-full border border-indigo-200/20 bg-indigo-200/10 shadow-[0_0_80px_rgba(199,210,254,.25)] transition hover:scale-105"
            >
              <Moon className="h-28 w-28 animate-float fill-indigo-100/20 text-indigo-100" />
            </button>

            <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-white/75">
              {moonTap === 0
                ? "Tócala despacito."
                : moonMessages[moonTap - 1]}
            </p>

            <button
              disabled={moonTap < moonMessages.length}
              onClick={() => go("constellation")}
              className="love-button mt-8 disabled:opacity-30"
            >
              Ver constelación
            </button>
          </Screen>
        )}

        {step === "constellation" && (
          <Screen>
            <Sparkles className="mx-auto mb-5 h-12 w-12 animate-float text-rose-200" />

            <h2 className="text-3xl font-black sm:text-5xl">
              Forma tu constelación
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-white/65">
              Toca cada estrella. Al completarla, aparece algo especial.
            </p>

            <div className="relative mx-auto mt-8 h-[440px] w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-2xl shadow-rose-500/10 backdrop-blur">
              <svg className="absolute inset-0 h-full w-full">
                {stars.length > 1 &&
                  stars.slice(1).map((id, index) => {
                    const prev = starPositions[stars[index]];
                    const current = starPositions[id];

                    return (
                      <line
                        key={`${id}-${index}`}
                        x1={`${prev.left}%`}
                        y1={`${prev.top}%`}
                        x2={`${current.left}%`}
                        y2={`${current.top}%`}
                        stroke="rgba(254,205,211,.6)"
                        strokeWidth="2"
                      />
                    );
                  })}
              </svg>

              {starPositions.map((pos, index) => {
                const active = stars.includes(index);

                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (!active) setStars((prev) => [...prev, index]);
                    }}
                    className="absolute transition hover:scale-150"
                    style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
                  >
                    <Star
                      className={`h-11 w-11 ${
                        active
                          ? "animate-pop fill-amber-200 text-amber-200 drop-shadow-[0_0_18px_rgba(253,224,71,.9)]"
                          : "text-white/40"
                      }`}
                    />
                  </button>
                );
              })}

              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/35 p-4 text-sm text-white/75 backdrop-blur">
                {stars.length === 0
                  ? "Empieza tocando una estrella."
                  : constellationMessages[stars.length - 1]}
              </div>

              {stars.length === starPositions.length && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="animate-glow text-5xl font-black tracking-[0.25em] text-rose-100">
                    {loveName}
                  </p>
                </div>
              )}
            </div>

            <button
              disabled={stars.length < starPositions.length}
              onClick={() => go("garden")}
              className="love-button mt-8 disabled:opacity-30"
            >
              Ir al jardín
            </button>
          </Screen>
        )}

        {step === "garden" && (
          <Screen>
            <h2 className="text-3xl font-black sm:text-5xl">
              Haz florecer el jardín
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-white/65">
              Cada flor es una razón por la que eres especial.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gardenReasons.map((reason, index) => {
                const active = flowers.includes(index);

                return (
                  <button
                    key={reason}
                    onClick={() =>
                      setFlowers((prev) =>
                        prev.includes(index) ? prev : [...prev, index]
                      )
                    }
                    className={`rounded-[2rem] border p-5 transition hover:-translate-y-2 ${
                      active
                        ? "border-rose-200/40 bg-rose-300/15 shadow-xl shadow-rose-500/20"
                        : "border-white/10 bg-white/[0.06]"
                    }`}
                  >
                    <Heart
                      className={`mx-auto mb-3 h-7 w-7 text-rose-200 ${
                        active ? "animate-heartbeat fill-rose-200" : ""
                      }`}
                    />
                    <p className="text-sm text-white/75">
                      {active ? reason : "Tócame"}
                    </p>
                  </button>
                );
              })}
            </div>

            <button
              disabled={flowers.length < gardenReasons.length}
              onClick={() => go("book")}
              className="love-button mt-8 disabled:opacity-30"
            >
              Abrir libro
            </button>
          </Screen>
        )}

        {step === "book" && (
          <Screen>
            <BookOpen className="mx-auto mb-5 h-12 w-12 animate-float text-rose-200" />

            <h2 className="text-3xl font-black sm:text-5xl">
              Un libro para ti
            </h2>

            <div className="mx-auto mt-8 max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.08] p-7 text-left shadow-2xl shadow-rose-500/20 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.3em] text-rose-200/60">
                Página {page + 1} de {bookPages.length}
              </p>

              <h3 className="mt-4 text-3xl font-black text-rose-100">
                {bookPages[page].title}
              </h3>

              <p className="mt-5 text-lg leading-8 text-white/80">
                {bookPages[page].text}
              </p>
            </div>

            <div className="mt-8 flex justify-center gap-3">
              <button
                disabled={page === 0}
                onClick={() => setPage((prev) => prev - 1)}
                className="love-button disabled:opacity-30"
              >
                Atrás
              </button>

              {page < bookPages.length - 1 ? (
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  className="love-button"
                >
                  Siguiente
                </button>
              ) : (
                <button onClick={() => go("heart")} className="love-button">
                  Continuar
                </button>
              )}
            </div>
          </Screen>
        )}

        {step === "heart" && (
          <Screen>
            <ShieldCheck className="mx-auto mb-5 h-12 w-12 animate-float text-rose-200" />

            <h2 className="text-3xl font-black sm:text-5xl">
              Reconstruye el corazón
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-white/65">
              Cada toque repara una parte. Porque nadie debería cargar sus miedos sola.
            </p>

            <div className="mx-auto mt-9 grid max-w-xs grid-cols-3 gap-3">
              {heartRepairMessages.map((message, index) => {
                const active = heartPieces.includes(index);

                return (
                  <button
                    key={message}
                    onClick={() =>
                      setHeartPieces((prev) =>
                        prev.includes(index) ? prev : [...prev, index]
                      )
                    }
                    className={`flex h-24 items-center justify-center rounded-3xl border transition hover:scale-105 ${
                      active
                        ? "border-rose-200/40 bg-rose-300/20"
                        : "border-white/10 bg-white/[0.05]"
                    }`}
                  >
                    <Heart
                      className={`h-10 w-10 text-rose-200 ${
                        active ? "animate-heartbeat fill-rose-200" : ""
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-white/75">
              {heartPieces.length === 0
                ? "Toca una parte del corazón."
                : heartRepairMessages[heartPieces.length - 1]}
            </p>

            <button
              disabled={heartPieces.length < heartRepairMessages.length}
              onClick={() => go("choice")}
              className="love-button mt-8 disabled:opacity-30"
            >
              Continuar
            </button>
          </Screen>
        )}

        {step === "choice" && (
          <Screen>
            <h2 className="text-3xl font-black sm:text-5xl">
              Elige qué voz escuchar
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-white/65">
              A veces la mente habla desde el miedo. Pero el corazón también tiene algo que decir.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <button
                onClick={() => setChoice("fear")}
                className={`rounded-[2rem] border p-7 transition hover:-translate-y-1 ${
                  choice === "fear"
                    ? "border-white/30 bg-white/10"
                    : "border-white/10 bg-white/[0.05]"
                }`}
              >
                <Lock className="mx-auto mb-4 h-8 w-8 text-white/50" />
                <p className="text-xl font-black">Miedo</p>
                <p className="mt-4 text-sm leading-6 text-white/65">
                  “Aléjate antes de sufrir. No confíes. Mejor corre.”
                </p>
              </button>

              <button
                onClick={() => setChoice("hope")}
                className={`rounded-[2rem] border p-7 transition hover:-translate-y-1 ${
                  choice === "hope"
                    ? "border-rose-200/40 bg-rose-300/15"
                    : "border-white/10 bg-white/[0.05]"
                }`}
              >
                <Heart className="mx-auto mb-4 h-8 w-8 text-rose-200" />
                <p className="text-xl font-black text-rose-100">
                  Esperanza
                </p>
                <p className="mt-4 text-sm leading-6 text-white/75">
                  “Respira. No todo termina mal. También puedes permitirte vivir algo bonito.”
                </p>
              </button>
            </div>

            {choice && (
              <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-white/75">
                {choice === "fear"
                  ? "Entiendo que el miedo exista. Pero no quiero que sea él quien decida por ti."
                  : "Eso quiero demostrarte: que conmigo puedes sentir calma, no presión."}
              </p>
            )}

            <button
              disabled={!choice}
              onClick={() => go("final")}
              className="love-button mt-8 disabled:opacity-30"
            >
              Leer el final
            </button>
          </Screen>
        )}

        {step === "final" && (
          <Screen>
            <Glow>
              <Music className="h-12 w-12 animate-heartbeat text-rose-200" />
            </Glow>

            <p className="text-xs uppercase tracking-[0.45em] text-rose-200/70">
              El final
            </p>

            <div className="mx-auto mt-8 max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.08] p-7 text-center shadow-2xl shadow-rose-500/20 backdrop-blur sm:p-10">
              {finalLines.map((line, index) => (
                <p
                  key={line}
                  className="type-line mt-6 text-xl font-semibold leading-8 text-white/85 first:mt-0"
                  style={{ animationDelay: `${index * 1.2}s` }}
                >
                  {line}
                </p>
              ))}

              <p className="mt-10 text-rose-100">
                Con cariño, alguien que de verdad quiere cuidarte.
              </p>
            </div>
          </Screen>
        )}
      </section>

      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.16); }
          50% { transform: scale(.96); }
          75% { transform: scale(1.1); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes pop {
          0% { transform: scale(.4); opacity: 0; }
          80% { transform: scale(1.25); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes enter {
          from { opacity: 0; transform: translateY(18px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes glow {
          0%, 100% { opacity: .7; text-shadow: 0 0 18px rgba(254,205,211,.6); }
          50% { opacity: 1; text-shadow: 0 0 40px rgba(254,205,211,1); }
        }

        @keyframes typeIn {
          from { opacity: 0; transform: translateY(12px); filter: blur(8px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        .animate-heartbeat {
          animation: heartbeat 1.35s infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pop {
          animation: pop .35s ease-out;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .type-line {
          opacity: 0;
          animation: typeIn .9s ease forwards;
        }

        .love-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: .5rem;
          border-radius: 9999px;
          background: white;
          padding: .9rem 1.8rem;
          color: #070411;
          font-size: .875rem;
          font-weight: 900;
          transition: .2s ease;
          box-shadow: 0 0 35px rgba(251, 113, 133, .28);
        }

        .love-button:hover {
          transform: scale(1.06);
          background: #ffe4ec;
        }

        .love-button:disabled {
          cursor: not-allowed;
          transform: none;
        }
      `}</style>
    </main>
  );
}

function Screen({ children }: { children: ReactNode }) {
  return (
    <div className="w-full animate-[enter_.55s_ease] text-center">
      {children}
    </div>
  );
}

function Glow({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-white/10 shadow-2xl shadow-rose-500/30 backdrop-blur">
      {children}
    </div>
  );
}