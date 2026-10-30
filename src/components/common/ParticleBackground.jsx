import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

export function ParticleBackground({ opacity = 0.6, particleCountMultiplier = 1 }) {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Track mouse position
    const mouse = {
      x: null,
      y: null,
      radius: 150
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Canvas size setup with devicePixelRatio
    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Determine particle count based on screen size
    const calculateParticleCount = () => {
      const area = width * height;
      const baseCount = Math.floor(area / 16000); // 1 particle per 16,000 px^2 approx (~50-80 particles on normal screens)
      return Math.max(30, Math.min(100, Math.floor(baseCount * particleCountMultiplier)));
    };

    // Color palettes based on theme
    const getPalette = (dark) => {
      if (dark) {
        return [
          { r: 56, g: 189, b: 248 },  // Sky 400
          { r: 99, g: 102, b: 241 },  // Indigo 500
          { r: 14, g: 165, b: 233 },  // Cyan 500
          { r: 168, g: 85, b: 247 },  // Purple 500
          { r: 59, g: 130, b: 246 }   // Blue 500
        ];
      } else {
        return [
          { r: 2, g: 132, b: 199 },   // Sky 600
          { r: 79, g: 70, b: 229 },   // Indigo 600
          { r: 37, g: 99, b: 235 },   // Blue 600
          { r: 13, g: 148, b: 136 }   // Teal 600
        ];
      }
    };

    let palette = getPalette(isDark);

    // Particle class
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 2 + 1.2;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.color = palette[Math.floor(Math.random() * palette.length)];
        this.alpha = Math.random() * 0.4 + 0.3;
        this.baseAlpha = this.alpha;
        this.pulseSpeed = Math.random() * 0.02 + 0.005;
        this.pulseAngle = Math.random() * Math.PI * 2;
      }

      update() {
        // Move particle
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen edges softly
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
        if (this.y < -10) this.y = height + 10;
        if (this.y > height + 10) this.y = -10;

        // Subtle pulsing opacity
        this.pulseAngle += this.pulseSpeed;
        this.alpha = this.baseAlpha + Math.sin(this.pulseAngle) * 0.15;

        // Mouse interaction (gentle attraction / hover highlight)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            // Slightly pull particle toward cursor or push away
            this.x -= (dx / dist) * force * 0.8;
            this.y -= (dy / dist) * force * 0.8;
            this.alpha = Math.min(0.9, this.alpha + force * 0.3);
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha * opacity})`;
        ctx.shadowBlur = isDark ? 10 : 0;
        ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.5)`;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    // Initialize particles array
    let particleCount = calculateParticleCount();
    let particles = Array.from({ length: particleCount }, () => new Particle());

    // Re-calculate on window resize
    const updateParticlesOnResize = () => {
      particleCount = calculateParticleCount();
      if (particles.length < particleCount) {
        for (let i = particles.length; i < particleCount; i++) {
          particles.push(new Particle());
        }
      } else if (particles.length > particleCount) {
        particles.length = particleCount;
      }
    };

    window.addEventListener('resize', updateParticlesOnResize);

    // Animation Render Loop
    const maxLineDist = 130;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      // Draw connecting constellation lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxLineDist) {
            const lineAlpha = (1 - dist / maxLineDist) * 0.25 * (p1.alpha + p2.alpha) / 2 * opacity;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Line color blend
            const lineColor = isDark
              ? `rgba(56, 189, 248, ${lineAlpha})` // sky blue in dark mode
              : `rgba(2, 132, 199, ${lineAlpha * 0.7})`; // darker sky in light mode

            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw lines to mouse cursor
      if (mouse.x !== null && mouse.y !== null) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const lineAlpha = (1 - dist / mouse.radius) * 0.4 * opacity;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = isDark
              ? `rgba(168, 85, 247, ${lineAlpha})`
              : `rgba(79, 70, 229, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', updateParticlesOnResize);
    };
  }, [isDark, opacity, particleCountMultiplier]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
      aria-hidden="true"
    />
  );
}
