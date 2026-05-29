import React, { useEffect, useRef } from 'react';

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Resize handler
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', updateSize);
    updateSize();

    class Particle {
      x: number;
      y: number;
      z: number;
      size: number;
      speedX: number;
      speedY: number;
      speedZ: number;
      opacity: number;
      type: 'dot' | 'square' | 'triangle';
      rotation: number;
      rotationSpeed: number;

      constructor() {
        this.x = (Math.random() - 0.5) * window.innerWidth * 2;
        this.y = (Math.random() - 0.5) * window.innerHeight * 2;
        this.z = Math.random() * 2000;
        this.size = Math.random() * 4 + 1;
        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = (Math.random() - 0.5) * 1;
        this.speedZ = (Math.random() - 0.5) * 5 - 2; // Move towards camera
        this.opacity = Math.random() * 0.6 + 0.4;
        
        const types: ('dot' | 'square' | 'triangle')[] = ['dot', 'dot', 'dot', 'square', 'triangle'];
        this.type = types[Math.floor(Math.random() * types.length)];
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.z += this.speedZ;
        this.rotation += this.rotationSpeed;

        if (this.z < 1) {
          this.z = 2000;
          this.x = (Math.random() - 0.5) * window.innerWidth * 2;
          this.y = (Math.random() - 0.5) * window.innerHeight * 2;
        }
        if (this.z > 2000) {
          this.z = 1;
        }
      }

      draw(ctx: CanvasRenderingContext2D, fov: number, viewDistance: number) {
        const perspective = fov / (fov + this.z);
        const drawX = canvas.width / 2 + this.x * perspective;
        const drawY = canvas.height / 2 + this.y * perspective;
        const drawSize = Math.max(0, this.size * perspective * 2);
        
        if (drawX < 0 || drawX > canvas.width || drawY < 0 || drawY > canvas.height) {
          return;
        }

        const currentOpacity = this.opacity * (1 - this.z / viewDistance);
        if (currentOpacity <= 0) return;

        ctx.save();
        ctx.translate(drawX, drawY);
        ctx.rotate(this.rotation);
        
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.strokeStyle = `rgba(255, 255, 255, ${currentOpacity * 0.5})`;
        ctx.lineWidth = 1;

        if (this.type === 'dot') {
          ctx.beginPath();
          ctx.arc(0, 0, drawSize, 0, Math.PI * 2);
          ctx.fill();
        } else if (this.type === 'square') {
          ctx.beginPath();
          ctx.rect(-drawSize, -drawSize, drawSize * 2, drawSize * 2);
          ctx.stroke();
        } else if (this.type === 'triangle') {
          ctx.beginPath();
          ctx.moveTo(0, -drawSize * 1.5);
          ctx.lineTo(drawSize, drawSize);
          ctx.lineTo(-drawSize, drawSize);
          ctx.closePath();
          ctx.stroke();
        }

        ctx.restore();
      }
    }

    // Initialize particles
    const particleCount = window.innerWidth > 768 ? 150 : 50;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const fov = 300;
    const viewDistance = 2000;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw a subtle gradient background in case we want this canvas to provide an extra backdrop
      // or we just leave it transparent (it's transparent by clearRect)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx, fov, viewDistance);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1] pointer-events-none opacity-80 mix-blend-screen"
    />
  );
}
