"use client";

import { useEffect, useRef } from "react";

class AmbientParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  fadeDirection: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    // Decreased particle size to half of what it was
    this.size = Math.random() * 1.25 + 0.4; 
    // Very slow upward drift
    this.speedY = Math.random() * 0.4 + 0.2; 
    // Extremely subtle left/right sway
    this.speedX = (Math.random() - 0.5) * 0.3; 
    // Start at random opacity
    this.opacity = Math.random(); 
    // Speed of the twinkle fade
    this.fadeDirection = (Math.random() * 0.02) + 0.01; 
  }

  update(canvasWidth: number, canvasHeight: number) {
    this.y -= this.speedY;
    this.x += this.speedX;

    // Twinkle effect: fade in and out gently (with higher bounds)
    this.opacity += this.fadeDirection;
    if (this.opacity >= 1.0 || this.opacity <= 0.2) {
      this.fadeDirection = -this.fadeDirection;
    }

    // If particle floats off the top, reset it to the bottom
    if (this.y < -10) {
      this.y = canvasHeight + 10;
      this.x = Math.random() * canvasWidth;
      this.opacity = 0; // Start invisible so it doesn't pop in
    }
    // Keep within horizontal bounds
    if (this.x < 0) this.x = canvasWidth;
    if (this.x > canvasWidth) this.x = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Clamp opacity between 0 and 1 to prevent errors
    ctx.globalAlpha = Math.max(0, Math.min(1, this.opacity));
    ctx.fillStyle = "#D4AF37"; // Sanskriti Gold
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Add a stronger soft ambient glow to the dust
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#D4AF37";
  }
}

export default function BackgroundSparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<AmbientParticle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const initParticles = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Decreased to 3/4 of 250 (187 particles)
      const particleCount = 187; 
      particles.current = [];

      
      for (let i = 0; i < particleCount; i++) {
        particles.current.push(new AmbientParticle(canvas.width, canvas.height));
      }
    };

    initParticles();

    // Handle screen resizing
    const handleResize = () => {
      initParticles();
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach((particle) => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      // z-0 puts it behind your content, mix-blend-screen makes it glow beautifully against the dark background. Uncapped Opacity.
      className="pointer-events-none fixed inset-0 z-0 mix-blend-screen opacity-100"
      aria-hidden="true"
    />
  );
}
