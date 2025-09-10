import { useRef, useEffect } from "react";

const STAR_COUNT = 20;
const METEOR_COUNT = 3;

function randomBetween(a, b) {
    return a + Math.random() * (b - a);
}

function createStar(width, height) {
    return {
        x: randomBetween(0, width),
        y: randomBetween(0, height),
        r: randomBetween(0.8, 2),
        speed: randomBetween(0.1, 0.5),
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

        let stars = Array.from({ length: STAR_COUNT }, () => createStar(width, height));
        let meteors = Array.from({ length: METEOR_COUNT }, () => createMeteor(width, height));

        function drawShinyStar(star) {
            const gradient = ctx.createRadialGradient(
                star.x, star.y, 0.1,
                star.x, star.y, star.r * 2
            );
            gradient.addColorStop(0, "white");
            gradient.addColorStop(0.5, "#aeefff");
            gradient.addColorStop(1, "rgba(255,255,255,0)");
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.r * 2, 0, 2 * Math.PI);
            ctx.fillStyle = gradient;
            ctx.globalAlpha = 0.9;
            ctx.fill();
            ctx.globalAlpha = 1;
        }

        function drawBurningMeteor(meteor) {
            // Tail
            for (let i = 0; i < meteor.tailColors.length; i++) {
                ctx.save();
                ctx.globalAlpha = meteor.opacity * (1 - i * 0.3);
                ctx.strokeStyle = meteor.tailColors[i];
                ctx.lineWidth = 6 - i * 2;
                ctx.beginPath();
                ctx.moveTo(meteor.x - i * 10 * Math.cos(meteor.angle), meteor.y - i * 10 * Math.sin(meteor.angle));
                ctx.lineTo(
                    meteor.x + meteor.length * Math.cos(meteor.angle),
                    meteor.y + meteor.length * Math.sin(meteor.angle)
                );
                ctx.stroke();
                ctx.restore();
            }
            // Head
            ctx.save();
            ctx.globalAlpha = meteor.opacity;
            ctx.beginPath();
            ctx.arc(
                meteor.x + meteor.length * Math.cos(meteor.angle),
                meteor.y + meteor.length * Math.sin(meteor.angle),
                4,
                0,
                2 * Math.PI
            );
            ctx.fillStyle = "#fff";
            ctx.shadowColor = "#ff9800";
            ctx.shadowBlur = 12;
            ctx.fill();
            ctx.restore();
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Draw stars
            stars.forEach(star => {
                drawShinyStar(star);
                star.y += star.speed;
                if (star.y > height) {
                    Object.assign(star, createStar(width, 0));
                }
            });

            // Draw meteors
            meteors.forEach(meteor => {
                drawBurningMeteor(meteor);
                meteor.x += meteor.speed * Math.cos(meteor.angle);
                meteor.y += meteor.speed * Math.sin(meteor.angle);

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
            }}
        />
    );
}