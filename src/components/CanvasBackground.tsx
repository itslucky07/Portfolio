import React, { useEffect, useRef } from 'react';

export const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates configuration
    const mouse = { x: -1000, y: -1000, radius: 220 };

    // --- Particle System Configuration ---
    interface ParticleInstance {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      glowColor: string;
      pulseSpeed: number;
      pulseAngle: number;
      update: () => void;
      draw: () => void;
    }

    const particles: ParticleInstance[] = [];
    const particleCount = Math.min(60, Math.floor((width * height) / 25000));
    const connectionDistance = 150;

    class Particle implements ParticleInstance {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      glowColor: string;
      pulseSpeed: number;
      pulseAngle: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 2 + 1;
        
        const isCyan = Math.random() > 0.5;
        this.color = isCyan ? 'rgba(6, 182, 212, 0.4)' : 'rgba(168, 85, 247, 0.4)';
        this.glowColor = isCyan ? 'rgba(6, 182, 212, 0.8)' : 'rgba(168, 85, 247, 0.8)';
        this.pulseSpeed = Math.random() * 0.05 + 0.01;
        this.pulseAngle = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulseAngle += this.pulseSpeed;

        // Bounce on boundaries
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Push away from mouse
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x += Math.cos(angle) * force * 1.5;
          this.y += Math.sin(angle) * force * 1.5;
        }
      }

      draw() {
        if (!ctx) return;
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        
        // Glow brighter when closer to mouse
        const alphaGlow = dist < mouse.radius ? (1 - dist / mouse.radius) * 0.4 : 0;
        const baseRadius = this.radius + Math.sin(this.pulseAngle) * 0.5;

        ctx.beginPath();
        ctx.arc(this.x, this.y, baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        if (alphaGlow > 0) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, baseRadius * 2, 0, Math.PI * 2);
          ctx.fillStyle = this.glowColor.replace('0.8', String(alphaGlow));
          ctx.fill();
        }
      }
    }

    // --- Cyber Telemetry Matrix Code Rain ---
    interface CodeStream {
      x: number;
      y: number;
      speed: number;
      chars: string[];
      opacity: number;
      update: () => void;
      draw: () => void;
    }

    const streams: CodeStream[] = [];
    const streamCount = Math.floor(width / 35);
    const alphabet = '0123456789ABCDEF<>[]{}_+=-*#@%&'.split('');

    class Stream implements CodeStream {
      x: number;
      y: number;
      speed: number;
      chars: string[];
      opacity: number;

      constructor(x: number) {
        this.x = x;
        this.y = Math.random() * -height;
        this.speed = Math.random() * 1.2 + 0.6;
        this.opacity = Math.random() * 0.035 + 0.015;
        this.chars = [];
        this.generateChars();
      }

      generateChars() {
        const length = Math.floor(Math.random() * 8) + 4;
        this.chars = Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]);
      }

      update() {
        this.y += this.speed;
        if (this.y > height) {
          this.y = Math.random() * -150 - 50;
          this.speed = Math.random() * 1.2 + 0.6;
          this.opacity = Math.random() * 0.035 + 0.015;
          this.generateChars();
        }

        // Randomly mutate characters
        if (Math.random() < 0.04) {
          const idx = Math.floor(Math.random() * this.chars.length);
          this.chars[idx] = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
      }

      draw() {
        if (!ctx) return;
        ctx.font = '9px monospace';
        
        for (let i = 0; i < this.chars.length; i++) {
          const charY = this.y - i * 14;
          if (charY < 0 || charY > height) continue;

          // Fade characters towards the top of the stream
          const charAlpha = this.opacity * (1 - i / this.chars.length);
          ctx.fillStyle = i === 0 
            ? `rgba(6, 182, 212, ${charAlpha * 2.5})` // Bright cyan leader
            : `rgba(168, 85, 247, ${charAlpha})`;    // Sleek purple trail
            
          ctx.fillText(this.chars[i], this.x, charY);
        }
      }
    }

    // Initialize systems
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    for (let i = 0; i < streamCount; i++) {
      streams.push(new Stream(i * 35 + Math.random() * 10));
    }

    // Event handlers
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // --- Main Animation Loop ---
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw dangerous/cool custom neon spotlight grid background
      if (mouse.x > -500) {
        const bgGrad = ctx.createRadialGradient(mouse.x, mouse.y, 40, mouse.x, mouse.y, 500);
        bgGrad.addColorStop(0, 'rgba(16, 8, 32, 0.9)'); // Bold dark purple glow core
        bgGrad.addColorStop(0.5, 'rgba(4, 8, 20, 0.96)'); // Deep dark transition
        bgGrad.addColorStop(1, 'rgba(3, 7, 18, 1)'); // Flat carbon black
        ctx.fillStyle = bgGrad;
      } else {
        ctx.fillStyle = '#030712';
      }
      ctx.fillRect(0, 0, width, height);

      // 2. Draw telemetry matrix code rain
      streams.forEach((stream) => {
        stream.update();
        stream.draw();
      });

      // 3. Update & Draw Particles connection grid
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDistance) {
            // Draw connection line
            let alpha = (1 - dist / connectionDistance) * 0.12;
            
            // Boost line opacity if it crosses the mouse cursor spotlight
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;
            const mouseDist = Math.hypot(midX - mouse.x, midY - mouse.y);
            if (mouseDist < mouse.radius) {
              alpha += (1 - mouseDist / mouse.radius) * 0.18;
            }

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            grad.addColorStop(0, p1.color.replace('0.4', String(alpha)));
            grad.addColorStop(1, p2.color.replace('0.4', String(alpha)));
            ctx.strokeStyle = grad;
            ctx.lineWidth = mouseDist < mouse.radius ? 1.0 : 0.65;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
