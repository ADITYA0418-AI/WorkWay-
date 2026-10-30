import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Play, CheckCircle2 } from 'lucide-react';
import { WorkWayLogo } from './WorkWayLogo';

export function WorkWayFuturisticLoader({ onComplete, durationSeconds = 9, autoDismiss = true }) {
  const canvasRef = useRef(null);
  
  // Animation Phase States
  // 0: establishing (0 - 2.5s)
  // 1: converging (2.5 - 4.5s)
  // 2: logoReveal (4.5 - 6.5s)
  // 3: textReveal (6.5 - 8.5s)
  // 4: complete (8.5s - 10s+)
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing spatial network...');
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Time tracker ref
  const startTimeRef = useRef(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Track mouse for 3D parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 40;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 40;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Canvas size
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // Color Palette: Deep Charcoal / Near-black base with Cyan, Sky Blue, Violet, Indigo particles
    const particleColors = [
      { r: 56, g: 189, b: 248 },  // Sky 400
      { r: 14, g: 165, b: 233 },  // Cyan 500
      { r: 99, g: 102, b: 241 },  // Indigo 500
      { r: 168, g: 85, b: 247 },  // Purple 500
      { r: 38, g: 198, b: 218 }   // Teal 400
    ];

    // 3D Particles
    const PARTICLE_COUNT = Math.min(100, Math.floor((width * height) / 14000));
    class Particle3D {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = (Math.random() - 0.5) * width * 1.5;
        this.y = (Math.random() - 0.5) * height * 1.5;
        this.z = initial ? Math.random() * 800 + 100 : 900; // depth
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.vz = (Math.random() - 0.5) * 0.3 - 0.1; // slow forward drift
        this.baseRadius = Math.random() * 1.8 + 1;
        this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
        this.alpha = Math.random() * 0.5 + 0.3;
        this.pulseSpeed = Math.random() * 0.015 + 0.005;
        this.pulseAngle = Math.random() * Math.PI * 2;
        
        // Original positions for convergence math
        this.origX = this.x;
        this.origY = this.y;
      }

      update(convergeFactor, time) {
        this.pulseAngle += this.pulseSpeed;

        // Slow organic drift
        this.x += this.vx + Math.sin(time * 0.0005 + this.pulseAngle) * 0.15;
        this.y += this.vy + Math.cos(time * 0.0004 + this.pulseAngle) * 0.15;
        this.z += this.vz;

        // Depth wrap
        if (this.z < 50) this.z = 900;
        if (this.z > 950) this.z = 50;

        // Converge toward center during logo reveal
        if (convergeFactor > 0) {
          const targetX = 0;
          const targetY = 0;
          this.x += (targetX - this.x) * 0.03 * convergeFactor;
          this.y += (targetY - this.y) * 0.03 * convergeFactor;
        }
      }

      getProjected(cameraX, cameraY) {
        const fov = 600;
        const scale = fov / (fov + this.z);
        const projX = width / 2 + (this.x + cameraX) * scale;
        const projY = height / 2 + (this.y + cameraY) * scale;
        const projRadius = Math.max(0.5, this.baseRadius * scale);
        const currentAlpha = Math.min(1, Math.max(0.1, (this.alpha + Math.sin(this.pulseAngle) * 0.2) * (1 - this.z / 1000)));

        return { x: projX, y: projY, scale, radius: projRadius, alpha: currentAlpha };
      }
    }

    // Translucent Geometric Polygon Fragments (Triangles)
    class PolygonFragment {
      constructor() {
        this.x = (Math.random() - 0.5) * width * 1.2;
        this.y = (Math.random() - 0.5) * height * 1.2;
        this.z = Math.random() * 600 + 200;
        this.size = Math.random() * 25 + 15;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.004;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.alpha = Math.random() * 0.12 + 0.03;
      }

      update() {
        this.rotation += this.rotSpeed;
        this.x += this.vx;
        this.y += this.vy;
      }

      draw(ctx, cameraX, cameraY) {
        const fov = 600;
        const scale = fov / (fov + this.z);
        const projX = width / 2 + (this.x + cameraX) * scale;
        const projY = height / 2 + (this.y + cameraY) * scale;
        const projSize = this.size * scale;

        ctx.save();
        ctx.translate(projX, projY);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        ctx.moveTo(0, -projSize / 2);
        ctx.lineTo(projSize / 2, projSize / 2);
        ctx.lineTo(-projSize / 2, projSize / 2);
        ctx.closePath();

        ctx.fillStyle = `rgba(56, 189, 248, ${this.alpha})`;
        ctx.strokeStyle = `rgba(14, 165, 233, ${this.alpha * 1.8})`;
        ctx.lineWidth = 0.8;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    }

    // Concentric Ripples
    let ripples = [];
    const triggerRipple = () => {
      ripples.push({
        radius: 10,
        maxRadius: Math.min(width, height) * 0.35,
        alpha: 0.8,
        speed: 3
      });
    };

    // Light Flares
    let flareTime = 0;

    const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle3D());
    const polygons = Array.from({ length: 14 }, () => new PolygonFragment());

    // Main Render Loop
    const render = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) / 1000;
      const normTime = Math.min(1, elapsed / durationSeconds);
      
      progressRef.current = Math.min(100, Math.floor(normTime * 100));
      setProgress(progressRef.current);

      // Phase transitions based on duration ratio
      if (normTime < 0.25) {
        setPhase(0);
        setStatusText('Initializing spatial network...');
      } else if (normTime < 0.45) {
        if (phase < 1) triggerRipple();
        setPhase(1);
        setStatusText('Locating nearby service nodes...');
      } else if (normTime < 0.70) {
        if (phase < 2) triggerRipple();
        setPhase(2);
        setStatusText('Optimizing service match algorithms...');
      } else if (normTime < 0.95) {
        setPhase(3);
        setStatusText('Finding the best services near you...');
      } else {
        setPhase(4);
        setStatusText('Connection ready!');
      }

      // Parallax smooth damping
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Clear with dark cinematic gradient
      ctx.clearRect(0, 0, width, height);

      // Deep Charcoal Background Gradient with subtle central glow
      const bgGradient = ctx.createRadialGradient(
        width / 2 + mouse.x * 0.5,
        height / 2 + mouse.y * 0.5,
        50,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      bgGradient.addColorStop(0, '#0a101f');
      bgGradient.addColorStop(0.5, '#040711');
      bgGradient.addColorStop(1, '#02040a');

      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw Volumetric Central Atmospheric Glow
      const centerGlow = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, 350
      );
      const glowAlpha = phase >= 2 ? 0.25 : 0.15;
      centerGlow.addColorStop(0, `rgba(56, 189, 248, ${glowAlpha})`);
      centerGlow.addColorStop(0.5, `rgba(99, 102, 241, ${glowAlpha * 0.5})`);
      centerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, width, height);

      // Convergence factor (0 to 1 during phase 1)
      const convergeFactor = phase === 1 ? Math.sin((normTime - 0.25) / 0.2 * Math.PI) : 0;

      // Project & Update Particles
      const projectedList = [];
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(convergeFactor, timestamp);
        const proj = particles[i].getProjected(mouse.x, mouse.y);
        projectedList.push({ proj, p: particles[i] });
      }

      // Draw Polygon Fragments
      for (let i = 0; i < polygons.length; i++) {
        polygons[i].update();
        polygons[i].draw(ctx, mouse.x * 0.4, mouse.y * 0.4);
      }

      // Draw Constellation Lines between close particles
      const maxDist = 140;
      for (let i = 0; i < projectedList.length; i++) {
        for (let j = i + 1; j < projectedList.length; j++) {
          const p1 = projectedList[i].proj;
          const p2 = projectedList[j].proj;
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.22 * Math.min(p1.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw Particles
      for (let i = 0; i < projectedList.length; i++) {
        const { proj, p } = projectedList[i];
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, proj.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${proj.alpha})`;
        ctx.shadowBlur = proj.radius * 4;
        ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Render Expanding Concentric Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.alpha -= 0.008;

        if (r.alpha <= 0 || r.radius > r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(width / 2, height / 2, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${r.alpha * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Render Soft Light Sweep Flare
      flareTime += 0.005;
      const flareX = (Math.sin(flareTime) * 0.5 + 0.5) * width;
      const flareGrad = ctx.createLinearGradient(flareX - 150, 0, flareX + 150, height);
      flareGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
      flareGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.03)');
      flareGrad.addColorStop(1, 'rgba(168, 85, 247, 0)');
      ctx.fillStyle = flareGrad;
      ctx.fillRect(0, 0, width, height);

      // Auto dismiss logic when complete
      if (normTime >= 1 && autoDismiss && !isFadingOut) {
        setIsFadingOut(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 800);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, [durationSeconds, autoDismiss, onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 400);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-slate-950 font-sans transition-opacity duration-700 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Centered UI Overlay Composition */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-xl mx-auto pointer-events-auto select-none">
        
        {/* WorkWay Official W-Arrow Logo Symbol */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Outer Luminous Glow Rings */}
          <div 
            className={`absolute w-44 h-44 rounded-full bg-gradient-to-r from-sky-500/30 via-blue-600/20 to-cyan-400/30 blur-2xl transition-all duration-1000 ${
              phase >= 2 ? 'scale-125 opacity-100' : 'scale-50 opacity-0'
            }`} 
          />
          
          {/* Subtle Rotating Tech Ring */}
          <div 
            className={`absolute w-32 h-32 rounded-full border border-sky-400/30 border-dashed animate-[spin_20s_linear_infinite] transition-all duration-1000 ${
              phase >= 2 ? 'scale-100 opacity-80' : 'scale-70 opacity-0'
            }`} 
          />

          {/* Official WorkWay App Icon */}
          <div 
            className={`relative transition-all duration-1000 ease-out transform ${
              phase >= 2 
                ? 'scale-100 opacity-100 translate-y-0 rotate-0' 
                : 'scale-70 opacity-0 translate-y-4 -rotate-6'
            }`}
          >
            <WorkWayLogo variant="icon" size="xl" />
          </div>
        </div>

        {/* Wordmark "WORKWAY" */}
        <h1 
          className={`font-heading text-4xl sm:text-5xl font-extrabold tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-100 to-cyan-300 transition-all duration-1000 ease-out transform ${
            phase >= 3 
              ? 'opacity-100 translate-y-0 filter-none' 
              : 'opacity-0 translate-y-6 blur-sm'
          }`}
        >
          WORKWAY
        </h1>

        {/* Tagline "Your Career. Your Journey." */}
        <p 
          className={`mt-2 text-sm sm:text-base font-semibold tracking-widest text-sky-400/90 uppercase transition-all duration-1000 delay-150 ease-out transform ${
            phase >= 3 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
        >
          Your Career. Your Journey.
        </p>

        {/* Minimal Progress Section */}
        <div 
          className={`mt-10 w-64 sm:w-72 flex flex-col items-center transition-all duration-1000 delay-300 ease-out ${
            phase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Progress Bar Track */}
          <div className="w-full h-1 bg-slate-800/80 rounded-full overflow-hidden p-[1px] border border-slate-700/40 relative shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Glowing Head Indicator */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-sky-300 shadow-[0_0_8px_#38bdf8]" />
            </div>
          </div>

          {/* Status Details & Percentage */}
          <div className="mt-3 w-full flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="truncate max-w-[200px] text-slate-400/90 font-sans tracking-wide text-[11px]">
              {statusText}
            </span>
            <span className="text-sky-400 font-semibold">{progress}%</span>
          </div>
        </div>

        {/* Skip / Enter Action */}
        <button
          onClick={handleSkip}
          className="mt-8 px-4 py-1.5 rounded-full bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-400 hover:text-white transition-all duration-200 flex items-center space-x-1.5 backdrop-blur-md group"
        >
          <span>{progress >= 100 ? 'Enter Application' : 'Skip Intro'}</span>
          <Sparkles className="w-3.5 h-3.5 text-sky-400 group-hover:rotate-12 transition-transform" />
        </button>

      </div>
    </div>
  );
}
