"use client";

import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
  maxLife: number;
  color: string;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    // Random size between 1 and 3 for a subtle dust effect
    this.size = Math.random() * 2 + 1; 
    // Gentle drift
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.maxLife = Math.random() * 30 + 40;
    this.life = this.maxLife;
    // Using the Sanskriti Gold accent color
    this.color = "#D4AF37"; 
  }

  update() {
    this.x += this.speedX;
    this.y -= this.speedY; // Float upwards slightly
    this.life--;
    // Shrink as it fades
    if (this.size > 0.1) this.size -= 0.05; 
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = Math.max(0, this.life / this.maxLife);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Optional: Add a soft glow to each particle
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
  }
}

export default function SparkleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse position
    let mouse = { x: -100, y: -100 };
    
    // Mouse Event
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      // Add a few particles on every mouse move
      for (let i = 0; i < 2; i++) {
        particles.current.push(new Particle(mouse.x, mouse.y));
      }
    };

    // Touch Events for Mobile Interaction
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        for (let i = 0; i < 2; i++) {
          particles.current.push(new Particle(mouse.x, mouse.y));
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        // Spawn slightly more on initial tap
        for (let i = 0; i < 4; i++) {
          particles.current.push(new Particle(mouse.x, mouse.y));
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.current.length; i++) {
        particles.current[i].update();
        particles.current[i].draw(ctx);
        
        // Remove dead particles
        if (particles.current[i].life <= 0) {
          particles.current.splice(i, 1);
          i--;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 mix-blend-screen"
      aria-hidden="true"
    />
  );
}
