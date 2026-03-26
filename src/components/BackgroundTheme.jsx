import { useRef, useEffect, useState } from "react";

const STAR_COUNT = 20;
const STATIC_STAR_RATIO = 0.4;
const STATIC_COUNT = Math.round(STAR_COUNT * STATIC_STAR_RATIO);
const METEOR_COUNT = 3;
const CLOUD_COUNT = 5;
const RAIN_COUNT = 100;
const SNOW_COUNT = 50;

function randomBetween(a, b) {
    return a + Math.random() * (b - a);
}

function getTheme(hour) {
    if (hour >= 5 && hour < 8) return "dawn";
    if (hour >= 8 && hour < 18) return "day";
    if (hour >= 18 && hour < 20) return "dusk";
    return "night";
}

function getSeason(month) {
    if (month >= 2 && month <= 4) return "spring";
    if (month >= 5 && month <= 7) return "summer";
    if (month >= 8 && month <= 10) return "autumn";
    return "winter";
}

function createStar(width, height, makeStatic = false) {
    if (makeStatic) {
        return {
            x: randomBetween(0, width),
            y: randomBetween(0, 80),
            r: randomBetween(0.8, 2),
            speed: 0,
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
        y: randomBetween(-100, -10),
        length: randomBetween(80, 150),
        speed: randomBetween(2, 3),
        angle: randomBetween(Math.PI / 4, Math.PI / 3),
        opacity: randomBetween(0.7, 1),
    };
}

function createCloud(width, height) {
    return {
        x: randomBetween(-200, width),
        y: randomBetween(0, height * 0.4),
        w: randomBetween(150, 300),
        h: randomBetween(60, 120),
        speed: randomBetween(0.2, 0.8),
        opacity: randomBetween(0.1, 0.3),
    };
}

function createRain(width, height) {
    return {
        x: randomBetween(0, width),
        y: randomBetween(-20, height),
        length: randomBetween(10, 20),
        speed: randomBetween(10, 15),
    };
}

function createSnow(width, height) {
    return {
        x: randomBetween(0, width),
        y: randomBetween(-20, height),
        r: randomBetween(1, 3),
        speed: randomBetween(1, 2),
        drift: randomBetween(-0.5, 0.5),
    };
}

function getMoonPhase(date) {
    const cycle = 29.530588853;
    const knownNewMoon = new Date("2024-01-11T11:57:00Z");
    const msSince = date - knownNewMoon;
    const daysSince = msSince / (1000 * 60 * 60 * 24);
    const phase = (daysSince % cycle) / cycle; // 0 to 1
    return phase;
}

export default function BackgroundTheme() {
    const canvasRef = useRef();
    const [weather, setWeather] = useState("Clear");
    const [moonPhase, setMoonPhase] = useState(getMoonPhase(new Date()));

    useEffect(() => {
        // Fetch weather
        fetch("https://wttr.in/?format=j1")
            .then(res => res.json())
            .then(data => {
                const condition = data.current_condition[0].weatherDesc[0].value;
                setWeather(condition);
            })
            .catch(() => setWeather("Clear"));
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const hour = new Date().getHours();
        const theme = getTheme(hour);

        let stars = Array.from({ length: STAR_COUNT }, (_, i) => createStar(width, height, i < STATIC_COUNT));
        let meteors = Array.from({ length: METEOR_COUNT }, () => createMeteor(width, height));
        let clouds = Array.from({ length: CLOUD_COUNT }, () => createCloud(width, height));
        let rain = Array.from({ length: RAIN_COUNT }, () => createRain(width, height));
        let snow = Array.from({ length: SNOW_COUNT }, () => createSnow(width, height));

        function drawShinyStar(star) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.r * randomBetween(0.5, 1), 0, 2 * Math.PI);
            ctx.fillStyle = "#fffbe6";
            ctx.shadowColor = "#fff200";
            ctx.shadowBlur = randomBetween(8, 18);
            ctx.globalAlpha = randomBetween(0.3, 0.7);
            ctx.fill();
            ctx.restore();
        }

        function drawBurningMeteor(meteor) {
            const headX = meteor.x + meteor.length * 0.9 * Math.cos(meteor.angle);
            const headY = meteor.y + meteor.length * 0.9 * Math.sin(meteor.angle);
            ctx.save();
            const tailGradient = ctx.createLinearGradient(meteor.x, meteor.y, headX, headY);
            tailGradient.addColorStop(0, "rgba(255, 60, 0, 0)");
            tailGradient.addColorStop(0.5, "rgba(255, 152, 0, 0.4)");
            tailGradient.addColorStop(1, "rgba(255, 242, 0, 0.8)");
            ctx.strokeStyle = tailGradient;
            ctx.lineWidth = 2;
            ctx.lineCap = "round";
            ctx.beginPath(); ctx.moveTo(meteor.x, meteor.y); ctx.lineTo(headX, headY); ctx.stroke();
            ctx.restore();
            ctx.save();
            const headGlow = ctx.createRadialGradient(headX, headY, 0, headX, headY, 15);
            headGlow.addColorStop(0, "rgba(255, 255, 255, 0.9)");
            headGlow.addColorStop(1, "rgba(255, 60, 0, 0)");
            ctx.fillStyle = headGlow;
            ctx.beginPath(); ctx.arc(headX, headY, 15, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
        }

        function drawCloud(c) {
            ctx.save();
            ctx.globalAlpha = c.opacity;
            ctx.fillStyle = theme === "day" ? "#ffffff" : "#707070";
            ctx.beginPath();
            ctx.ellipse(c.x, c.y, c.w, c.h, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        function drawRainDrop(r) {
            ctx.save();
            ctx.strokeStyle = "rgba(174, 194, 224, 0.5)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(r.x, r.y);
            ctx.lineTo(r.x + 2, r.y + r.length);
            ctx.stroke();
            ctx.restore();
        }

        function drawSnowFlake(s) {
            ctx.save();
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        function drawMoon(ctx, x, y, radius, phase) {
            ctx.save();
            ctx.translate(x, y);

            // Base Moon
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            const moonGrad = ctx.createRadialGradient(0, 0, radius * 0.5, 0, 0, radius);
            moonGrad.addColorStop(0, "#fffbe6");
            moonGrad.addColorStop(1, "#fff2b3");
            ctx.fillStyle = moonGrad;
            ctx.shadowColor = "#fff2b3";
            ctx.shadowBlur = 20;
            ctx.fill();

            // Shadow for phase
            ctx.globalCompositeOperation = "source-atop";
            ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
            
            // Simplified shadow logic
            if (phase < 0.5) {
                // Waxing: Shadow moves from right to middle
                const shift = radius * 4 * (0.5 - phase);
                ctx.beginPath();
                ctx.arc(shift, 0, radius, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Waning: Shadow grows from left
                const shift = -radius * 4 * (phase - 0.5);
                ctx.beginPath();
                ctx.arc(shift, 0, radius, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            // 1. Background Gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            if (theme === "night") { gradient.addColorStop(0, "#010b1a"); gradient.addColorStop(1, "#000000"); }
            else if (theme === "dawn") { gradient.addColorStop(0, "#ff9a9e"); gradient.addColorStop(1, "#fad0c4"); }
            else if (theme === "day") { gradient.addColorStop(0, "#89f7fe"); gradient.addColorStop(1, "#66a6ff"); }
            else if (theme === "dusk") { gradient.addColorStop(0, "#2c3e50"); gradient.addColorStop(1, "#c471ed"); }
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // Weather/Atmospheric Overlays
            if (weather.includes("Cloudy") || weather.includes("Overcast")) {
                clouds.forEach(c => {
                    drawCloud(c);
                    c.x += c.speed;
                    if (c.x > width + 200) c.x = -200;
                });
            }

            if (weather.includes("Rain") || weather.includes("Showers")) {
                rain.forEach(r => {
                    drawRainDrop(r);
                    r.y += r.speed;
                    if (r.y > height) { r.y = -r.length; r.x = Math.random() * width; }
                });
            }

            if (weather.includes("Snow")) {
                snow.forEach(s => {
                    drawSnowFlake(s);
                    s.y += s.speed;
                    s.x += s.drift;
                    if (s.y > height) { s.y = -5; s.x = Math.random() * width; }
                });
            }



            // Standard Day/Night features
            if (theme === "night" || theme === "dawn" || theme === "dusk") {
                const starAlphaMult = theme === "night" ? 1 : theme === "dawn" ? 0.3 : 0.6;
                stars.forEach(star => {
                    ctx.save(); ctx.globalAlpha *= starAlphaMult; drawShinyStar(star); ctx.restore();
                    if (!star.isStatic) { star.y += star.speed * 0.5; if (star.y > height) Object.assign(star, createStar(width, 0, false)); }
                });

                // Draw Moon
                const moonAlpha = theme === "night" ? 1 : theme === "dawn" ? 0.4 : 0.7;
                ctx.save();
                ctx.globalAlpha = moonAlpha;
                drawMoon(ctx, width * 0.8, height * 0.15, 30, moonPhase);
                ctx.restore();
            }

            if (theme === "night" && (weather === "Clear" || weather === "Sunny")) {
                meteors.forEach(meteor => {
                    drawBurningMeteor(meteor);
                    meteor.x += meteor.speed * Math.cos(meteor.angle);
                    meteor.y += meteor.speed * Math.sin(meteor.angle);
                    if (meteor.y > height || meteor.x > width) Object.assign(meteor, createMeteor(width, 0));
                });
            }

            if (theme === "day") {
                ctx.save();
                const sunGradient = ctx.createRadialGradient(width * 0.8, height * 0.2, 0, width * 0.8, height * 0.2, 100);
                sunGradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
                sunGradient.addColorStop(1, "rgba(255, 255, 224, 0)");
                ctx.fillStyle = sunGradient;
                ctx.beginPath(); ctx.arc(width * 0.8, height * 0.2, 100, 0, Math.PI * 2); ctx.fill();
                ctx.restore();
            }

            requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => { width = window.innerWidth; height = window.innerHeight; canvas.width = width; canvas.height = height; };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [weather, moonPhase]);

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
                pointerEvents: "none"
            }}
        />
    );
}