"use client";

import React, { useEffect, useRef, useState } from "react";

const MIN_BRANCH = 30;
const LEN = 6;
const PROB = 0.5;

export default function Plum() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateSize = () => {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        };
        updateSize(); // Initial size
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const { width, height } = size;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set proper canvas size for retina displays
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);

        let pendingTasks: Function[] = [];

        function step(x: number, y: number, rad: number) {
            const length = Math.random() * LEN;

            const nx = x + length * Math.cos(rad);
            const ny = y + length * Math.sin(rad);

            ctx!.beginPath();
            ctx!.moveTo(x, y);
            ctx!.lineTo(nx, ny);
            ctx!.stroke();

            const nRad = rad + (Math.random() - 0.5) * (Math.PI / 3); // Slightly deviate angle

            if (Math.random() < PROB || length < 2) {
                // Stop branching
                return;
            }

            pendingTasks.push(() => step(nx, ny, nRad));

            if (Math.random() < PROB) {
                // Fork
                pendingTasks.push(() => step(nx, ny, rad + (Math.random() - 0.5) * (Math.PI / 3)));
            }
        }

        let frameCount = 0;

        function start() {
            ctx!.clearRect(0, 0, width, height);
            ctx!.lineWidth = 1;
            ctx!.strokeStyle = "rgba(160, 160, 160, 0.2)"; // Muted color with low opacity
            pendingTasks = [];

            // Start from edges
            // Bottom edge
            step(Math.random() * width, height, -Math.PI / 2);
            step(Math.random() * width, height, -Math.PI / 2);

            // Top edge sometimes
            if (Math.random() < 0.3) step(Math.random() * width, 0, Math.PI / 2);
        }

        function frame() {
            const tasks = [...pendingTasks];
            pendingTasks = [];

            tasks.forEach((fn) => fn());

            // Keep removing tasks randomly to mimic organic growth speed variability? 
            // Actually the recursion logic above is synchronous deep recursion if not throttled.
            // Wait, typical plum implementation uses requestAnimationFrame to slowly draw.
        }

        // Let's reimplement a cleaner frame-based approach

        const branches: { x: number, y: number, rad: number }[] = [];

        function init() {
            ctx!.clearRect(0, 0, width, height);
            ctx!.lineWidth = 1;
            ctx!.strokeStyle = "rgba(150, 150, 150, 0.15)";

            // Start points
            const startX = Math.random() * width;
            branches.push({ x: width / 2, y: height, rad: -Math.PI / 2 }); // Center bottom
            if (Math.random() > 0.5) branches.push({ x: Math.random() * width, y: height, rad: -Math.PI / 2 });
            if (Math.random() > 0.5) branches.push({ x: 0, y: Math.random() * height, rad: 0 }); // Left
            if (Math.random() > 0.5) branches.push({ x: width, y: Math.random() * height, rad: Math.PI }); // Right
        }

        function loop() {
            if (branches.length === 0) return;

            // Process current branches
            for (let i = branches.length - 1; i >= 0; i--) {
                const b = branches[i];

                const len = Math.random() * 6 + 2;
                const nx = b.x + len * Math.cos(b.rad);
                const ny = b.y + len * Math.sin(b.rad);

                ctx!.beginPath();
                ctx!.moveTo(b.x, b.y);
                ctx!.lineTo(nx, ny);
                ctx!.stroke();

                b.x = nx;
                b.y = ny;

                // Curve
                b.rad += (Math.random() - 0.5) * 0.5;

                // Die or Branch
                if (b.x < -100 || b.x > width + 100 || b.y < -100 || b.y > height + 100 || Math.random() < 0.02) {
                    branches.splice(i, 1);
                } else if (Math.random() < 0.03) {
                    branches.push({ x: nx, y: ny, rad: b.rad + (Math.random() - 0.5) * 1 });
                }
            }

            requestAnimationFrame(loop);
        }

        init();
        loop();

        return () => {
            // cleanup
        };
    }, [width, height]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 pointer-events-none -z-10 opacity-50"
        />
    );
}
