import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import ChatBox from "./components/icon/ChatBox";

const daiTraLinks = [
  { label: "DHTH21A", url: "https://zalo.me/g/srklfp129" },
  { label: "DHTH21B", url: "https://zalo.me/g/zxdpve593" },
  { label: "DHTH21C", url: "https://zalo.me/g/zbdjun514" },
  { label: "DHTH21D", url: "https://zalo.me/g/kssokm054" },
  { label: "DHTH21E", url: "https://zalo.me/g/vryagw074" },
  { label: "DHTH21F", url: "https://zalo.me/g/dxebwx890" },
  { label: "DHTH21G", url: "https://zalo.me/g/heqolc954" }

];

const daiTraCLCLinks = [
  { label: "DHTH21A_TCTA", url: "https://zalo.me/g/yvoozq791" },
  { label: "DHTH21B_TCTA", url: "https://zalo.me/g/wraslb289" },
  { label: "DHTH21C_TCTA", url: "https://zalo.me/g/sudqts875" },
  { label: "DHTH21D_TCTA", url: "https://zalo.me/g/xlhuqu886" },
  { label: "DHTH21E_TCTA", url: "https://zalo.me/g/lzamwb482" },
  { label: "DHTH21F_TCTA", url: "https://zalo.me/g/zwmryr119" },
  { label: "DHTH21G_TCTA", url: "https://zalo.me/g/twkrrj290" }
];

const groupTongLinks = [
  { label: "Click me", url: "https://zalo.me/g/hmboib890", description: "Sinh viên phải tham gia group này để nhận thông báo chính thức" },
];

function WhiteTechParticles() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    function createParticles() {
      const count = 80;
      particlesRef.current = [];
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.2 + 0.4,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          alpha: Math.random() * 0.6 + 0.2,
          alphaChange: (Math.random() - 0.5) * 0.01,
        });
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particlesRef.current.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > width) p.speedX = -p.speedX;
        if (p.y < 0 || p.y > height) p.speedY = -p.speedY;
        p.alpha += p.alphaChange;
        if (p.alpha <= 0.2 || p.alpha >= 0.8) p.alphaChange = -p.alphaChange;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha.toFixed(2)})`;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }

    resize();
    createParticles();
    animate();

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      id="white-tech-particles"
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("daiTra");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(false);
    const timeout = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timeout);
  }, [activeTab]);

  const activeLinks = activeTab === "clc" ? daiTraCLCLinks : daiTraLinks;

  return (
    <>
      <WhiteTechParticles />

      <header className="header">
        <img src="./logo-mini.png" alt="Logo" />
        <h1>HCYU FIT</h1>
        <p>Click your class to join the Zalo group</p>
      </header>

      <section className="group-tong-section">
        <h2 className="group-tong-title">Cộng đồng sinh viên K21</h2>
        {groupTongLinks.map(({ label, url, description }) => (
          <a
            href={url}
            className="group-tong-box"
            target="_blank"
            rel="noopener noreferrer"
            key={label}
          >
            <span>{label}</span>
            <span className="description">{description}</span>
          </a>
        ))}
      </section>

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === "daiTra" ? "active" : ""}`}
          onClick={() => setActiveTab("daiTra")}
        >
          Đại trà
        </button>
        <button
          className={`tab-btn ${activeTab === "clc" ? "active" : ""}`}
          onClick={() => setActiveTab("clc")}
        >
          Tăng cường tiếng anh
        </button>
      </div>

      <main>
        <section className="content">
          {activeLinks.map(({ label, url }) => (
            <a
              href={url}
              className={`link-box fade-in-up ${mounted ? "visible" : ""}`}
              target="_blank"
              rel="noopener noreferrer"
              key={label}
            >
              {label}
            </a>
          ))}
        </section>
      </main>
      
      <ChatBox />
    </>
  );
}
