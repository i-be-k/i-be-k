import { useRef, useEffect } from "react";

const STAR_COUNT = 20;
const STATIC_STAR_RATIO = 0.4; // 40% of stars are static at the top
const STATIC_COUNT = Math.round(STAR_COUNT * STATIC_STAR_RATIO);
const METEOR_COUNT = 3;

function randomBetween(a, b) {
    return a + Math.random() * (b - a);
}

function createStar(width, height, makeStatic = false) {
    if (makeStatic) {
        // Static star sits near the top, within a small vertical band
        return {
            x: randomBetween(0, width),
            y: randomBetween(0, 80), // top band
            r: randomBetween(0.8, 2),
            speed: 0, // static
            isStatic: true,
        };
    }
    return {
        x: randomBetween(0, width),
        y: randomBetween(0, height),
        r: randomBetween(0.8, 2),
        speed: randomBetween(0.1, 0.5),
        isStatic: false,
    };
}

function createMeteor(width, height) {
    return {
        x: randomBetween(0, width),
        y: randomBetween(-100, -10, height),
        length: randomBetween(80, 150),
        speed: randomBetween(2, 3),
        angle: randomBetween(Math.PI / 4, Math.PI / 3),
        opacity: randomBetween(0.7, 1),
        tailColors: ["#fff200", "#ff9800", "#ff3c00"], // yellow to orange to red
    };
}

export default function BackgroundTheme() {
    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        let stars = Array.from({ length: STAR_COUNT }, (_, i) =>
            createStar(width, height, i < STATIC_COUNT)
        );
        let meteors = Array.from({ length: METEOR_COUNT }, () => createMeteor(width, height));

        function drawShinyStar(star) {
            // Distant effect: smaller, dimmer, more blur
            ctx.save();
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.r * randomBetween(0.5, 1), 0, 2 * Math.PI);
            ctx.fillStyle = "#fffbe6";
            ctx.shadowColor = "#fff200";
            ctx.shadowBlur = randomBetween(8, 18);
            ctx.globalAlpha = randomBetween(0.3, 0.7);
            ctx.fill();
            ctx.restore();

            // Outer glow for depth
            const gradient = ctx.createRadialGradient(
                star.x, star.y, star.r,
                star.x, star.y, star.r * randomBetween(2, 5)
            );
            gradient.addColorStop(0, "rgba(255,242,0,0.5)");
            gradient.addColorStop(1, "rgba(255,255,0,0)");
            ctx.save();
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.r * randomBetween(2, 5), 0, 2 * Math.PI);
            ctx.fillStyle = gradient;
            ctx.globalAlpha = randomBetween(0.2, 0.5);
            ctx.fill();
            ctx.restore();
        }

        function drawBurningMeteor(meteor) {
            // Distant effect: thinner, dimmer, shorter tail
            for (let i = 0; i < meteor.tailColors.length; i++) {
                ctx.save();
                // Fading along the tail
                ctx.globalAlpha = meteor.opacity * (0.35 - i * 0.08);
                ctx.strokeStyle = meteor.tailColors[i];
                ctx.lineWidth = 3 - i;
                ctx.beginPath();
                ctx.moveTo(
                    meteor.x - i * 5 * Math.cos(meteor.angle),
                    meteor.y - i * 5 * Math.sin(meteor.angle)
                );
                ctx.lineTo(
                    meteor.x + meteor.length * 0.9 * Math.cos(meteor.angle),
                    meteor.y + meteor.length * 0.9 * Math.sin(meteor.angle)
                );
                ctx.stroke();
                ctx.restore();
            }
            // Head with a bright glow
            ctx.save();
            // Head glow: a small radial glow around the head position
            const headX = meteor.x + meteor.length * 0.9 * Math.cos(meteor.angle);
            const headY = meteor.y + meteor.length * 0.9 * Math.sin(meteor.angle);

            // Soft glow around head
            const headGlow = ctx.createRadialGradient(headX, headY, 0, headX, headY, 12);
            headGlow.addColorStop(0, "rgba(255, 240, 190, 0.95)");
            headGlow.addColorStop(1, "rgba(255, 180, 0, 0)");
            ctx.fillStyle = headGlow;
            ctx.beginPath();
            ctx.arc(headX, headY, 12, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Head core (bright) with small bloom
            ctx.save();
            ctx.globalAlpha = meteor.opacity;
            ctx.beginPath();
            ctx.arc(headX, headY, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = "#fffbe6";
            ctx.shadowColor = "#ff9800";
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.restore();
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            stars.forEach(star => {
                drawShinyStar(star);
                if (!star.isStatic) {
                    star.y += star.speed * randomBetween(0.3, 0.7); // slower for distant effect
                    if (star.y > height) {
                        Object.assign(star, createStar(width, 0, false));
                    }
                } else {
                    // Static stars stay at their top band; you could occasionally glow or twinkle here
                    // Optional: small twinkle
                    // star.r = Math.max(0.8, star.r + randomBetween(-0.02, 0.02));
                }
            });

            meteors.forEach(meteor => {
                drawBurningMeteor(meteor);
                meteor.x += meteor.speed * Math.cos(meteor.angle) * randomBetween(0.5, 0.8);
                meteor.y += meteor.speed * Math.sin(meteor.angle) * randomBetween(0.5, 0.8);

                if (meteor.y > height || meteor.x > width) {
                    Object.assign(meteor, createMeteor(width, 0));
                }
            });

            requestAnimationFrame(animate);
        }

        animate();

        function handleResize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: -1,
                pointerEvents: "none",
                background: "black"
            }}
        />
    );
}