import { useEffect, useMemo, useRef, useState } from 'react';
import { animate, motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { BRANDS, PRODUCTS, type BrandData, type ProductData } from './data';

type WheelResult = { visible: string[]; winner: string; finalRotation: number; duration: number };
type GeneratedResult = {
  brand: BrandData;
  product: ProductData;
  name: string;
  tagline: string;
  price: number;
  features: string[];
  stats: { label: string; value: number }[];
  review: string;
};

const VISIBLE_SEGMENTS = 20;

const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

function useSound() {
  const [enabled, setEnabled] = useState(true);
  const ctxRef = useRef<AudioContext | null>(null);
  const getCtx = () => (ctxRef.current ??= new AudioContext());
  const tick = () => {
    if (!enabled) return;
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 1800;
    gain.gain.value = 0.04;
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.015);
  };
  const chime = () => {
    if (!enabled) return;
    const ctx = getCtx();
    [800, 1000, 1200].forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = f;
      gain.gain.value = 0.05;
      osc.connect(gain).connect(ctx.destination);
      const start = ctx.currentTime + i * 0.06;
      osc.start(start);
      osc.stop(start + 0.05);
    });
  };
  return { enabled, setEnabled, tick, chime };
}

function makeWheel(source: string[], locked?: string): WheelResult {
  const winner = locked ?? pick(source);
  const visible = shuffle(source.filter((s) => s !== winner)).slice(0, VISIBLE_SEGMENTS - 1);
  const winningIndex = Math.floor(Math.random() * VISIBLE_SEGMENTS);
  visible.splice(winningIndex, 0, winner);
  const segmentAngle = 360 / VISIBLE_SEGMENTS;
  const targetAngle = winningIndex * segmentAngle + segmentAngle / 2;
  const spins = 6 + Math.floor(Math.random() * 4);
  const finalRotation = spins * 360 + (360 - targetAngle);
  return { visible, winner, finalRotation, duration: 3 + Math.random() * 2 };
}

function drawWheel(canvas: HTMLCanvasElement, items: string[], accent: string, rotation = 0, winner?: string) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const size = canvas.width;
  const r = size / 2;
  ctx.clearRect(0, 0, size, size);
  ctx.save();
  ctx.translate(r, r);
  ctx.rotate((rotation * Math.PI) / 180);
  items.forEach((item, i) => {
    const a0 = (i / items.length) * Math.PI * 2;
    const a1 = ((i + 1) / items.length) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, r - 4, a0, a1);
    ctx.fillStyle = i % 2 ? '#1f2937' : '#334155';
    if (item === winner) ctx.fillStyle = accent;
    ctx.fill();
    ctx.save();
    ctx.rotate((a0 + a1) / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.fillText(item.slice(0, 14), r - 16, 5);
    ctx.restore();
  });
  ctx.beginPath();
  ctx.arc(0, 0, r - 5, 0, Math.PI * 2);
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.restore();
}

export default function App() {
  const sound = useSound();
  const [brandWheel, setBrandWheel] = useState<WheelResult>(() => makeWheel(BRANDS.map((b) => b.name)));
  const [thingWheel, setThingWheel] = useState<WheelResult>(() => makeWheel(PRODUCTS.map((p) => p.name)));
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [history, setHistory] = useState<GeneratedResult[]>([]);
  const [spinning, setSpinning] = useState(false);
  const [lockBrand, setLockBrand] = useState(false);
  const [lockThing, setLockThing] = useState(false);
  const brandCanvasRef = useRef<HTMLCanvasElement>(null);
  const thingCanvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const confettiRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => drawWheel(brandCanvasRef.current!, brandWheel.visible, '#00d4ff', 0, brandWheel.winner), [brandWheel]);
  useEffect(() => drawWheel(thingCanvasRef.current!, thingWheel.visible, '#ff2d7b', 0, thingWheel.winner), [thingWheel]);

  const reviews = useMemo(() => [
    'I did not need this, therefore I bought two. — @fakereviewbot', 'My friends laughed until they tried it. — Verified Buyer', 'This changed the way I misunderstand products. — ★★★★★',
    'My {product} got a firmware update and now it glows. — Early Adopter', 'Lost my house deposit on this but NO REGRETS. — ★★★★★', 'A cursed masterpiece. 10/10. — Internet Stranger'
  ], []);

  const buildResult = (brandName: string, productName: string) => {
    const brand = BRANDS.find((b) => b.name === brandName)!;
    const product = PRODUCTS.find((p) => p.name === productName)!;
    const patterns = [
      `${brand.name} x ${product.name}`,
      `${brand.name} ${product.name} ${pick(['Ultra', 'Prime', 'GT', 'Signature'])}`,
      `${brand.name.split(' ')[0]} ${pick(['Celestiale', 'Hyper', 'Neo', 'Infinite'])} ${product.name}`,
      `${brand.name.startsWith('Apple') ? 'i' : ''}${product.name.replace(/\s/g, '')} ${pick(['Pro', 'Max', 'Edition'])}`
    ];
    const name = patterns[Math.floor(Math.random() * patterns.length)];
    const price = product.basePrice * brand.priceMultiplier;
    const tierFeatures: Record<string, string[]> = {
      luxury: ['Hand-finished by artisans wearing white gloves.', 'Presented in a velvet-lined carbon fiber case.', 'Each unit numbered and whispered to by experts.'],
      premium: ['Powered by an overqualified microchip.', 'Precision engineered with needless perfection.', 'Pairs with your phone for no practical reason.'],
      mainstream: ['Built for daily chaos and weekend bragging.', 'Comes in 12 personality-driven colorways.', 'Comfort tuned for all-day absurdity.'],
      budget: ['Available in family packs of 48.', 'Costs less than your streaming subscription.', 'Shockingly functional for the price.'],
      hypebeast: ['Limited drop. Sold out in 14 seconds.', 'Resale value may exceed your rent.', 'Stamped with a serialized hype code.']
    };
    const categoryFeatures: Record<string, string[]> = {
      food: ['Now with edible branding strategy.', 'Pairs best with dramatic unboxing videos.'],
      tech: ['AI-assisted mode nobody asked for.', 'Ships with three cables you cannot identify.'],
      home: ['Turns your living room into a launch event.', 'Interior designers will be confused but intrigued.'],
      hygiene: ['Clinically proven to start conversations.', 'Sanitizes itself with pure audacity.'],
      toy: ['Certified fun by highly unserious experts.', 'Designed for adults pretending it is for kids.'],
      transport: ['Wind tunnel tested for playground speeds.', 'Suspension tuned for emotional journeys.'],
      outdoor: ['Weatherproof against rain and judgment.'],
      kitchen: ['Dishwasher-safe unless vibe says otherwise.'],
      office: ['Boosts productivity by at least placebo percent.'],
      personal: ['Feels premium in ways that defy logic.'],
      random: ['Invents a new use case every Tuesday.']
    };
    const features = shuffle([...tierFeatures[brand.tier], ...(categoryFeatures[product.category] ?? []), `${brand.vibe}.`, `Engineered with ${brand.taglineStyle} energy.`]).slice(0, 5);
    return {
      brand,
      product,
      name,
      tagline: brand.taglineTemplate.replace('{product}', product.name.toLowerCase()),
      price,
      features,
      stats: [
        { label: '💰 Price Insanity', value: Math.min(100, Math.log10(Math.max(price, 1)) / 5 * 100) },
        { label: '🤯 Absurdity Level', value: 60 + Math.random() * 40 },
        { label: '🛒 Would Actually Buy', value: Math.min(95, (brand.tier === 'mainstream' ? 65 : 45) + (product.category === 'food' || product.category === 'toy' ? 25 : 0) + Math.random() * 20) },
        { label: '⭐ Predicted Hype', value: (brand.tier === 'luxury' || brand.tier === 'hypebeast' ? 75 : 45) + Math.random() * 20 }
      ],
      review: pick(reviews).replace('{product}', product.name)
    };
  };

  const confetti = (brand: BrandData) => {
    const canvas = confettiRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = Array.from({ length: 80 }, () => ({ x: canvas.width / 2, y: canvas.height / 2, vx: (Math.random() - 0.5) * 12, vy: (Math.random() - 1.3) * 12, life: 1, c: Math.random() > 0.5 ? brand.primaryColor : brand.secondaryColor }));
    const start = performance.now();
    const anim = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = (performance.now() - start) / 2000;
      if (t > 1) return;
      particles.forEach((p) => {
        p.vy += 0.15;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.01;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.c;
        ctx.fillRect(p.x, p.y, 6, 10);
      });
      requestAnimationFrame(anim);
    };
    anim();
    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 220);
  };

  const spin = async (mode: 'both' | 'brand' | 'thing') => {
    if (spinning) return;
    setSpinning(true);
    const nextBrand = mode === 'thing' && lockBrand ? brandWheel : makeWheel(BRANDS.map((b) => b.name), mode === 'thing' ? brandWheel.winner : undefined);
    const nextThing = mode === 'brand' && lockThing ? thingWheel : makeWheel(PRODUCTS.map((p) => p.name), mode === 'brand' ? thingWheel.winner : undefined);

    setBrandWheel(nextBrand);
    if (mode === 'both') await new Promise((r) => setTimeout(r, 300));
    setThingWheel(nextThing);

    const tickTimers: number[] = [];
    const scheduleTicks = (duration: number) => {
      const count = 38;
      const interval = (duration * 1000) / count;
      let i = 0;
      const id = window.setInterval(() => {
        sound.tick();
        i += 1;
        if (i > count) window.clearInterval(id);
      }, interval);
      tickTimers.push(id);
    };

    scheduleTicks(nextBrand.duration);
    if (mode === 'both') window.setTimeout(() => scheduleTicks(nextThing.duration), 300);
    else scheduleTicks(nextThing.duration);

    await Promise.all([
      animate(`.brand-wheel`, { rotate: [0, nextBrand.finalRotation] }, { duration: nextBrand.duration, ease: [0.1, 0.9, 0.2, 1] }).finished,
      animate(`.thing-wheel`, { rotate: [0, nextThing.finalRotation] }, { duration: nextThing.duration, ease: [0.1, 0.9, 0.2, 1] }).finished
    ]);
    tickTimers.forEach((t) => window.clearInterval(t));

    const built = buildResult(nextBrand.winner, nextThing.winner);
    setResult(built);
    setHistory((h) => [built, ...h].slice(0, 20));
    confetti(built.brand);
    sound.chime();
    setSpinning(false);
  };

  const share = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, { backgroundColor: null });
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `${result?.name ?? 'what-if'}.png`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 pb-12 grain relative overflow-x-hidden">
      <canvas ref={confettiRef} className="pointer-events-none fixed inset-0 z-50" />
      <button className="fixed top-4 right-4 z-30 rounded-full border border-white/20 px-3 py-2 bg-black/40" onClick={() => sound.setEnabled(!sound.enabled)}>{sound.enabled ? '🔊' : '🔇'}</button>
      <header className="text-center mt-8 mb-8">
        <h1 className="text-6xl md:text-7xl font-black tracking-tight neon">WHAT IF...?</h1>
        <p className="text-slate-300 mt-3">When brands collide with random stuff.</p>
        <p className="text-slate-400 mt-1">Spin both wheels. Discover unholy product crossovers.</p>
      </header>

      <section className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {[['THE BRAND', '#00d4ff', brandWheel, brandCanvasRef, 'brand-wheel'], ['THE THING', '#ff2d7b', thingWheel, thingCanvasRef, 'thing-wheel']] as const
          .map(([label, color, wheel, ref, cls], i) => (
          <div key={label} className="text-center">
            <h2 className="font-bold text-xl mb-4" style={{ color }}>{label}</h2>
            <div className="relative mx-auto w-[320px] h-[320px]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[14px] border-r-[14px] border-b-[24px] border-l-transparent border-r-transparent border-b-white z-20" />
              <div className={`${cls} w-full h-full rounded-full`}>
                <canvas ref={ref} width={320} height={320} className="w-full h-full" />
              </div>
            </div>
            <button disabled={spinning} onClick={() => spin(i === 0 ? 'brand' : 'thing')} className="mt-4 px-6 py-2 rounded-full bg-white/10 border border-white/20 disabled:opacity-50">Spin</button>
          </div>
        ))}
      </section>

      <div className="text-center mt-8">
        <button disabled={spinning} onClick={() => spin('both')} className="pulse px-12 py-4 rounded-full font-black text-lg bg-gradient-to-r from-cyan-400 to-pink-500 text-black disabled:opacity-50">SPIN BOTH</button>
      </div>

      {result && (
        <motion.section initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 18 }} className="max-w-4xl mx-auto mt-10">
          <div ref={cardRef} className="rounded-3xl p-6 border" style={{ borderColor: result.brand.primaryColor, background: `linear-gradient(135deg, ${result.brand.primaryColor}22, ${result.brand.secondaryColor}44)` }}>
            <div className="text-center relative overflow-hidden rounded-2xl p-8 border border-white/10">
              <div className="w-64 h-64 mx-auto rounded-full flex items-center justify-center text-[120px] relative" style={{ background: `radial-gradient(circle, ${result.brand.primaryColor}, ${result.brand.secondaryColor})` }}>{result.product.emoji}</div>
              <div className="absolute inset-0 flex items-center justify-center text-6xl font-black opacity-10 -rotate-12">{result.brand.name}</div>
              <p className="italic text-xs text-slate-300 mt-2">Artist&apos;s Imagination Required 🎨</p>
            </div>

            <h3 className="text-4xl font-black mt-6">{result.name}</h3>
            <p className="text-xl mt-2 text-slate-100">{result.tagline}</p>
            <p className="text-2xl mt-3 font-bold">
              <span className="line-through opacity-60 mr-3">${result.product.basePrice.toFixed(2)}</span>
              ${result.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              {result.price > 10000 ? ' 💀' : result.price < 1 ? ' absolute steal 🏷️' : ''}
            </p>

            <ul className="mt-4 space-y-2 list-disc pl-6">{result.features.map((f) => <li key={f}>{f}</li>)}</ul>

            <div className="mt-6 space-y-3">{result.stats.map((s, i) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm"><span>{s.label}</span><span>{Math.round(s.value)}%</span></div>
                <motion.div initial={{ width: 0 }} animate={{ width: `${s.value}%` }} transition={{ duration: 1, delay: i * 0.15 }} className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-pink-500" />
              </div>
            ))}</div>

            <blockquote className="mt-6 italic text-slate-200">“{result.review}”</blockquote>

            <div className="grid sm:grid-cols-2 gap-3 mt-6">
              <button className="btn" onClick={() => spin('both')}>🔄 Spin Again</button>
              <button className="btn" onClick={share}>📸 Share This Cursed Creation</button>
              <button className="btn" onClick={() => { setLockBrand(true); spin('thing'); }}>🔒 Keep Brand, New Thing</button>
              <button className="btn" onClick={() => { setLockThing(true); spin('brand'); }}>🔒 Keep Thing, New Brand</button>
            </div>
          </div>
        </motion.section>
      )}

      <section className="max-w-6xl mx-auto mt-10">
        <h4 className="font-bold tracking-widest text-slate-300 mb-3">HISTORY</h4>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {history.map((h, idx) => (
            <button key={`${h.name}-${idx}`} onClick={() => setResult(h)} className="min-w-52 text-left rounded-xl p-3 bg-white/5 border border-white/10">
              <div>{h.brand.emoji} + {h.product.emoji}</div>
              <div className="font-semibold truncate">{h.name}</div>
              <div className="text-sm text-slate-300">${h.price.toFixed(2)}</div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
