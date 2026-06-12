<script>
  import { onMount } from "svelte";

  const STEPS = [
    { p: 10, m: "Booting secure environment..." },
    { p: 26, m: "Initializing tensor engine..." },
    { p: 44, m: "Mounting data pipelines..." },
    { p: 62, m: "Verifying admin credentials..." },
    { p: 80, m: "Compiling neural graph..." },
    { p: 100, m: "Portal ready. Welcome, Admin." }
  ];

  let introDone = $state(false);
  let percent = $state(0);
  let introMsg = $state("Booting secure environment...");

  function handleIntroLogoError(event) {
    event.currentTarget.style.display = "none";
    event.currentTarget.parentNode.insertAdjacentHTML(
      "beforeend",
      `<svg width="50" height="50" viewBox="0 0 50 50" fill="none">
        <circle cx="25" cy="25" r="11" stroke="#FF4D00" stroke-width="2"/>
        <circle cx="25" cy="25" r="4.5" fill="#FF4D00"/>
        <circle cx="11" cy="13" r="3.5" fill="#FF7A35"/>
        <circle cx="39" cy="13" r="3.5" fill="#FF7A35"/>
        <circle cx="11" cy="37" r="3.5" fill="#00FFD1"/>
        <circle cx="39" cy="37" r="3.5" fill="#00FFD1"/>
        <line x1="14" y1="16" x2="21" y2="21" stroke="#FF4D00" stroke-width="1.2"/>
        <line x1="36" y1="16" x2="29" y2="21" stroke="#FF4D00" stroke-width="1.2"/>
        <line x1="14" y1="34" x2="21" y2="29" stroke="#00FFD1" stroke-width="1.2"/>
        <line x1="36" y1="34" x2="29" y2="29" stroke="#00FFD1" stroke-width="1.2"/>
      </svg>`
    );
  }

  function handleNavLogoError(event) {
    event.currentTarget.style.display = "none";
    event.currentTarget.parentNode.insertAdjacentHTML(
      "beforeend",
      `<svg width="26" height="26" viewBox="0 0 50 50" fill="none">
        <circle cx="25" cy="25" r="11" stroke="#FF4D00" stroke-width="2"/>
        <circle cx="25" cy="25" r="4.5" fill="#FF4D00"/>
        <circle cx="11" cy="13" r="3.5" fill="#FF7A35"/>
        <circle cx="39" cy="13" r="3.5" fill="#FF7A35"/>
        <circle cx="11" cy="37" r="3.5" fill="#00FFD1"/>
        <circle cx="39" cy="37" r="3.5" fill="#00FFD1"/>
      </svg>`
    );
  }

  onMount(() => {
    let introTimer;
    let animationFrame;
    const rowEvents = [];

    let si = 0;

    function tick() {
      if (si >= STEPS.length) return;

      const step = STEPS[si];

      percent = step.p;
      introMsg = step.m;
      si++;

      if (si < STEPS.length) {
        introTimer = setTimeout(tick, 230 + Math.random() * 110);
      } else {
        introTimer = setTimeout(() => {
          introDone = true;
        }, 520);
      }
    }

    tick();

    const cv = document.getElementById("bg-canvas");
    const cg = document.getElementById("cg");

    if (!cv) {
      return;
    }

    const cx = cv.getContext("2d");

    if (!cx) {
      return;
    }

    let W;
    let H;

    function rsz() {
      W = cv.width = window.innerWidth;
      H = cv.height = window.innerHeight;
    }

    rsz();
    window.addEventListener("resize", rsz);

    const COLS = ["255,77,0", "0,255,209", "139,92,246"];

    const nodes = Array.from({ length: 30 }, () => ({
      x: Math.random() * 1.2 * window.innerWidth - 0.1 * window.innerWidth,
      y: Math.random() * 1.2 * window.innerHeight - 0.1 * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: 1.5 + Math.random() * 2.5,
      ph: Math.random() * Math.PI * 2,
      c: Math.floor(Math.random() * 3)
    }));

    const parts = Array.from({ length: 20 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      spd: 0.35 + Math.random() * 0.7,
      ang: Math.random() * Math.PI * 2,
      sz: 1 + Math.random() * 1.5,
      al: 0.3 + Math.random() * 0.4,
      c: Math.floor(Math.random() * 3),
      trail: []
    }));

    function grid(t) {
      const o = (t * 0.28) % 64;

      cx.save();
      cx.strokeStyle = "rgba(255,255,255,0.022)";
      cx.lineWidth = 0.5;

      for (let x = -64 + o; x < W + 64; x += 64) {
        cx.beginPath();
        cx.moveTo(x, 0);
        cx.lineTo(x, H);
        cx.stroke();
      }

      for (let y = -64 + o; y < H + 64; y += 64) {
        cx.beginPath();
        cx.moveTo(0, y);
        cx.lineTo(W, y);
        cx.stroke();
      }

      cx.restore();
    }

    function drawNodes(t) {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < 170) {
            cx.beginPath();
            cx.moveTo(nodes[i].x, nodes[i].y);
            cx.lineTo(nodes[j].x, nodes[j].y);
            cx.strokeStyle = `rgba(255,255,255,${(1 - d / 170) * 0.15})`;
            cx.lineWidth = 0.5;
            cx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < -60) n.x = W + 60;
        if (n.x > W + 60) n.x = -60;
        if (n.y < -60) n.y = H + 60;
        if (n.y > H + 60) n.y = -60;

        const pulse = 0.55 + 0.45 * Math.sin(t * 0.0016 + n.ph);
        const c = COLS[n.c];

        cx.beginPath();
        cx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
        cx.fillStyle = `rgba(${c},${0.35 * pulse})`;
        cx.fill();

        cx.beginPath();
        cx.arc(n.x, n.y, n.r * 2.4 * pulse, 0, Math.PI * 2);
        cx.fillStyle = `rgba(${c},.055)`;
        cx.fill();
      });
    }

    function drawParts() {
      parts.forEach((p) => {
        p.trail.push({ x: p.x, y: p.y });

        if (p.trail.length > 14) {
          p.trail.shift();
        }

        p.x += Math.cos(p.ang) * p.spd;
        p.y += Math.sin(p.ang) * p.spd;
        p.ang += (Math.random() - 0.5) * 0.05;

        if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) {
          p.x = Math.random() * W;
          p.y = Math.random() * H;
          p.trail = [];
        }

        if (p.trail.length < 2) return;

        const c = COLS[p.c];

        for (let i = 1; i < p.trail.length; i++) {
          const pr = i / p.trail.length;

          cx.beginPath();
          cx.moveTo(p.trail[i - 1].x, p.trail[i - 1].y);
          cx.lineTo(p.trail[i].x, p.trail[i].y);
          cx.strokeStyle = `rgba(${c},${pr * p.al * 0.75})`;
          cx.lineWidth = p.sz * pr;
          cx.stroke();
        }

        cx.beginPath();
        cx.arc(p.x, p.y, p.sz, 0, Math.PI * 2);
        cx.fillStyle = `rgba(${c},${p.al})`;
        cx.fill();
      });
    }

    function blobs(t) {
      const b = [
        { x: 0.13, y: 0.16, r: 360, c: "255,77,0", a: 0.09 },
        { x: 0.87, y: 0.2, r: 300, c: "0,255,209", a: 0.07 },
        { x: 0.5, y: 0.88, r: 280, c: "139,92,246", a: 0.07 }
      ];

      b.forEach(({ x, y, r, c, a }) => {
        const drift = Math.sin(t * 0.00035) * 28;
        const g = cx.createRadialGradient(
          x * W + drift,
          y * H,
          0,
          x * W + drift,
          y * H,
          r
        );

        g.addColorStop(0, `rgba(${c},${a})`);
        g.addColorStop(1, "transparent");

        cx.fillStyle = g;
        cx.beginPath();
        cx.arc(x * W + drift, y * H, r, 0, Math.PI * 2);
        cx.fill();
      });
    }

    function scanlines() {
      for (let y = 0; y < H; y += 4) {
        cx.fillStyle = "rgba(0,0,0,0.048)";
        cx.fillRect(0, y, W, 1);
      }
    }

    function frame(t) {
      cx.clearRect(0, 0, W, H);
      cx.fillStyle = "#02030B";
      cx.fillRect(0, 0, W, H);

      blobs(t);
      grid(t);
      drawNodes(t);
      drawParts();
      scanlines();

      animationFrame = requestAnimationFrame(frame);
    }

    animationFrame = requestAnimationFrame(frame);

    function handleMouseMove(event) {
      if (!cg) return;

      cg.style.left = event.clientX + "px";
      cg.style.top = event.clientY + "px";
    }

    document.addEventListener("mousemove", handleMouseMove);

    document.querySelectorAll(".mod").forEach((m, i) => {
      m.style.opacity = "0";
      m.style.transform = "translateY(22px)";
      m.style.transition = `opacity .5s ease ${
        0.95 + i * 0.13
      }s, transform .5s ease ${0.95 + i * 0.13}s`;

      setTimeout(() => {
        m.style.opacity = "1";
        m.style.transform = "";
      }, 200);
    });

    document.querySelectorAll(".drow").forEach((r) => {
      const acc =
        getComputedStyle(r).getPropertyValue("--row-acc").trim() ||
        "rgba(255,77,0,.5)";

      const enter = () => {
        r.style.boxShadow = `inset 3px 0 0 ${acc}`;
      };

      const leave = () => {
        r.style.boxShadow = "";
      };

      r.addEventListener("mouseenter", enter);
      r.addEventListener("mouseleave", leave);

      rowEvents.push({ r, enter, leave });
    });

    return () => {
      clearTimeout(introTimer);
      window.removeEventListener("resize", rsz);
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);

      rowEvents.forEach(({ r, enter, leave }) => {
        r.removeEventListener("mouseenter", enter);
        r.removeEventListener("mouseleave", leave);
      });
    };
  });
</script>

<svelte:head>
  <title>ML Club — Admin Portal</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div id="intro" class:done={introDone}>
  <div class="i-bg"></div>
  <div class="i-grid"></div>

  <div class="i-wrap">
    <div class="i-logo">
      <div class="i-ring"></div>
      <div class="i-ring"></div>
      <div class="i-ring"></div>

      <div class="i-box">
        <img src="/logo.png" alt="ML Club" onerror={handleIntroLogoError} />
      </div>
    </div>

    <div class="i-kicker">// INITIALIZING ADMIN PORTAL</div>

    <div class="i-count" id="i-pct">
      {String(percent).padStart(3, "0")}%
    </div>

    <div class="i-track">
      <div class="i-fill" id="i-bar" style={`width:${percent}%`}></div>
    </div>

    <div class="i-msg" id="i-msg">{introMsg}</div>
  </div>
</div>

<canvas id="bg-canvas"></canvas>
<div class="cursor-glow" id="cg"></div>

<div id="page" class:show={introDone}>
  <nav>
    <div class="nb">
      <div class="nl">
        <img src="/logo.png" alt="ML Club" onerror={handleNavLogoError} />
      </div>

      <div>
        <div class="n-name">Machine Learning Club</div>
        <div class="n-sub">NIT SILCHAR</div>
      </div>
    </div>

    <div class="n-right">
      <div class="n-sys">
        <span class="n-dot"></span>
        <span>NIT SILCHAR</span>
      </div>

      <a href="/auth" class="n-btn">Admin Login &nbsp;→</a>
    </div>
  </nav>

  <main class="hero">
    <div class="hl">
      <div class="eyebrow">
        <span class="e-ping"></span>
        <span>Secure Auth </span>
        <span class="e-sep">|</span>
        <span style="color:var(--muted);">ML CLUB</span>
      </div>

      <h1 class="h1">
        <span class="h1-plain">Welcome to the</span>
        <span class="h1-grad">ML Club<br />Admin Portal</span>
      </h1>

      <p class="h-body">
        A centralized control surface for managing members, projects, and blogs of the Machine Learning Club — built on SvelteKit, secured end to end.
      </p>

      <div class="h-ctas">
        <a href="/auth" class="cta-p">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>

          Launch Admin Portal

          <svg class="arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>

        <a href="/dashboard" class="cta-g">Preview Dashboard</a>
      </div>

      <div class="chips">
       
      
        <span class="chip">Projects</span>
        <span class="chip">members</span>
        <span class="chip">blogs</span>
        <span class="chip">Admin Access</span>
      </div>

      <div class="mods">
        <div class="mod" style="--a:#FF4D00;">
          <div class="mod-icon">⬡</div>
          <div class="mod-tag">MEMBERS</div>
          <div class="mod-title">Member Records</div>
          <div class="mod-desc">Add, edit and remove members — photo, name, position, type, GitHub, LinkedIn & Facebook.</div>
          <div class="mod-status"><span class="mod-status-dot"></span>READY</div>
        </div>

        <div class="mod" style="--a:#00FFD1;">
          <div class="mod-icon">⟁</div>
          <div class="mod-tag">PROJECTS</div>
          <div class="mod-title">Project Showcase</div>
          <div class="mod-desc">Manage project details, tech stacks, repositories and live demo links.</div>
          <div class="mod-status"><span class="mod-status-dot"></span>READY</div>
        </div>

        <div class="mod" style="--a:#8B5CF6;">
          <div class="mod-icon">◈</div>
          <div class="mod-tag">BLOGS</div>
          <div class="mod-title">Blog Publishing</div>
          <div class="mod-desc">Create and publish technical posts, announcements and club updates.</div>
          <div class="mod-status"><span class="mod-status-dot"></span>READY</div>
        </div>
      </div>
    </div>

    <div class="hr">
      <div class="p-glow"></div>

      <div style="position:relative;">
        <div class="fbadge tr">
          <span class="fb-d" style="background:var(--teal);box-shadow:0 0 8px var(--teal);animation:blip 1.8s ease-in-out infinite;"></span>
          Live Dashboard
        </div>

        <div class="fbadge bl">
          <span class="fb-d" style="background:var(--org);box-shadow:0 0 8px var(--org);animation:blip 2.2s ease-in-out infinite;"></span>
          Session Active
        </div>

        <div class="fbadge mr">
          <span class="fb-d" style="background:var(--vio);box-shadow:0 0 8px var(--vio);animation:blip 1.5s ease-in-out infinite;"></span>
          Auth: Secured
        </div>

        <div class="dash">
          <div class="bk tl"></div>
          <div class="bk tr"></div>
          <div class="bk bl"></div>
          <div class="bk br"></div>

          <div class="dash-in">
            <div class="dtop">
              <div class="d-dots">
                <div class="d-dot r"></div>
                <div class="d-dot y"></div>
                <div class="d-dot g"></div>
              </div>

              <div>
                <div class="d-title">ADMIN CONSOLE</div>
                <div class="d-sub">mlclubnits.com / dashboard</div>
              </div>

              <div class="d-live"><span class="d-live-dot"></span>LIVE</div>
            </div>

            <div class="dsecs">
              <div class="dsec">
                <div class="dsh">
                  <div class="dsh-lbl" style="color:#FF4D00;">
                    <span class="dsh-dot" style="background:#FF4D00;box-shadow:0 0 5px #FF4D00;"></span>MEMBERS
                  </div>

                  <div class="dsh-add">+ ADD MEMBER</div>
                </div>

                <div class="drows">
                  <div class="drow" style="--row-acc:#FF4D00;">
                    <div class="d-av" style="background:rgba(255,77,0,.14);color:#FF4D00;border:1px solid rgba(255,77,0,.25);">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                      </svg>
                    </div>

                    <div class="d-info">
                      <div class="d-name"> ML Core Head</div>
                      <div class="d-role">GitHub / LinkedIn </div>
                    </div>

                    <div class="d-badge" style="background:rgba(255,77,0,.12);color:#FF7A40;border:1px solid rgba(255,77,0,.28);">LEAD</div>
                  </div>

                  <div class="drow" style="--row-acc:#00FFD1;">
                    <div class="d-av" style="background:rgba(0,255,209,.1);color:#00FFD1;border:1px solid rgba(0,255,209,.22);">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                      </svg>
                    </div>

                    <div class="d-info">
                      <div class="d-name">Web Developement Head</div>
                      <div class="d-role">GitHub / LinkedIn</div>
                    </div>

                    <div class="d-badge" style="background:rgba(0,255,209,.08);color:#00FFD1;border:1px solid rgba(0,255,209,.22);">LEAD</div>
                  </div>

                  <div class="drow" style="--row-acc:#8B5CF6;">
                    <div class="d-av" style="background:rgba(139,92,246,.1);color:#8B5CF6;border:1px solid rgba(139,92,246,.22);">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                      </svg>
                    </div>

                    <div class="d-info">
                      <div class="d-name">Web Developement Juinor</div>
                      <div class="d-role">GitHub / LinkedIn </div>
                    </div>

                    <div class="d-badge" style="background:rgba(139,92,246,.1);color:#8B5CF6;border:1px solid rgba(139,92,246,.22);">JUNIOR</div>
                  </div>
                </div>
              </div>

              <div class="dsec">
                <div class="dsh">
                  <div class="dsh-lbl" style="color:#00FFD1;">
                    <span class="dsh-dot" style="background:#00FFD1;box-shadow:0 0 5px #00FFD1;"></span>PROJECTS
                  </div>

                  <div class="dsh-add">+ ADD PROJECT</div>
                </div>

                <div class="drows">
                  <div class="drow" style="--row-acc:#00FFD1;">
                    <div class="d-av" style="background:rgba(0,255,209,.08);color:#00FFD1;border:1px solid rgba(0,255,209,.2);font-size:14px;">⟁</div>

                    <div class="d-info">
                      <div class="d-name">Computer Vision Project</div>
                      <div class="d-role">PyTorch · OpenCV · CUDA</div>
                    </div>

                    <div class="d-badge" style="background:rgba(40,200,64,.1);color:#28C840;border:1px solid rgba(40,200,64,.25);">LIVE</div>
                  </div>

                  <div class="drow" style="--row-acc:#8B5CF6;">
                    <div class="d-av" style="background:rgba(139,92,246,.08);color:#8B5CF6;border:1px solid rgba(139,92,246,.2);font-size:14px;">⟁</div>

                    <div class="d-info">
                      <div class="d-name">NLP Research Pipeline</div>
                      <div class="d-role">Transformers · HuggingFace</div>
                    </div>

                    <div class="d-badge" style="background:rgba(255,189,46,.1);color:#FFBD2E;border:1px solid rgba(255,189,46,.25);">WIP</div>
                  </div>
                </div>
              </div>

              <div class="dsec">
                <div class="dsh">
                  <div class="dsh-lbl" style="color:#8B5CF6;">
                    <span class="dsh-dot" style="background:#8B5CF6;box-shadow:0 0 5px #8B5CF6;"></span>BLOGS
                  </div>

                  <div class="dsh-add">+ ADD POST</div>
                </div>

                <div class="drows">
                  <div class="drow" style="--row-acc:#8B5CF6;">
                    <div class="d-av" style="background:rgba(139,92,246,.08);color:#8B5CF6;border:1px solid rgba(139,92,246,.2);font-size:14px;">◈</div>

                    <div class="d-info">
                      <div class="d-name">Understanding Transformers</div>
                      <div class="d-role">Deep Dive · Technical Post</div>
                    </div>

                    <div class="d-badge" style="background:rgba(40,200,64,.1);color:#28C840;border:1px solid rgba(40,200,64,.25);">PUB</div>
                  </div>

                  <div class="drow" style="--row-acc:#FF4D00;">
                    <div class="d-av" style="background:rgba(255,77,0,.08);color:#FF7A40;border:1px solid rgba(255,77,0,.2);font-size:14px;">◈</div>

                    <div class="d-info">
                      <div class="d-name">Club Recruitment 2025</div>
                      <div class="d-role">Announcement · Club Update</div>
                    </div>

                    <div class="d-badge" style="background:rgba(255,77,0,.12);color:#FF7A40;border:1px solid rgba(255,77,0,.25);">DRAFT</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<style>
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(:root) {
    --bg: #02030B;
    --s1: #080B18;
    --s2: #0D1020;
    --org: #FF4D00;
    --org2: #FF7A35;
    --teal: #00FFD1;
    --vio: #8B5CF6;
    --text: #E2E8F0;
    --muted: #64748B;
    --border: rgba(255,255,255,0.07);
  }

  :global(html) {
    scroll-behavior: smooth;
  }

  :global(body) {
    font-family: "Space Grotesk", system-ui, sans-serif;
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
    min-height: 100vh;
  }

  #intro {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity .7s ease, visibility .7s ease;
  }

  #intro.done {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }

  .i-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 55% 55% at 50% 50%, rgba(255,77,0,.16), transparent 70%);
  }

  .i-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
    background-size: 52px 52px;
  }

  .i-wrap {
    position: relative;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .i-logo {
    position: relative;
    width: 110px;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .i-box {
    position: relative;
    z-index: 2;
    width: 84px;
    height: 84px;
    border-radius: 22px;
    border: 1px solid rgba(255,77,0,.4);
    background: rgba(255,77,0,.09);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: iBoxPulse 2s ease-in-out infinite;
  }

  .i-box img {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }

  .i-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(255,77,0,.18);
    animation: iRing 2.6s ease-in-out infinite;
  }

  .i-ring:nth-child(1) {
    width: 108px;
    height: 108px;
    animation-delay: 0s;
  }

  .i-ring:nth-child(2) {
    width: 138px;
    height: 138px;
    animation-delay: .65s;
  }

  .i-ring:nth-child(3) {
    width: 172px;
    height: 172px;
    animation-delay: 1.3s;
  }

  @keyframes iBoxPulse {
    0%, 100% {
      box-shadow: 0 0 22px rgba(255,77,0,.3);
    }

    50% {
      box-shadow:
        0 0 55px rgba(255,77,0,.6),
        0 0 90px rgba(0,255,209,.15);
    }
  }

  @keyframes iRing {
    0%, 100% {
      opacity: .55;
      transform: scale(1);
    }

    50% {
      opacity: .08;
      transform: scale(1.1);
    }
  }

  .i-kicker {
    font-family: "JetBrains Mono", monospace;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: .28em;
    color: var(--org);
  }

  .i-count {
    font-family: "JetBrains Mono", monospace;
    font-size: 56px;
    font-weight: 700;
    letter-spacing: -.04em;
    color: var(--org);
    line-height: 1;
    text-shadow: 0 0 50px rgba(255,77,0,.55);
  }

  .i-track {
    width: 280px;
    height: 2px;
    background: rgba(255,255,255,.08);
    border-radius: 1px;
    overflow: hidden;
  }

  .i-fill {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, var(--org), var(--teal));
    border-radius: 1px;
    transition: width .22s ease;
    box-shadow: 0 0 14px rgba(255,77,0,.6);
  }

  .i-msg {
    font-family: "JetBrains Mono", monospace;
    font-size: 11px;
    color: var(--muted);
    letter-spacing: .04em;
    height: 16px;
  }

  #bg-canvas {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }

  .cursor-glow {
    position: fixed;
    z-index: 2;
    pointer-events: none;
    width: 420px;
    height: 420px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,77,0,.055), transparent 65%);
    transform: translate(-50%, -50%);
    transition: left .1s ease, top .1s ease;
    left: 50%;
    top: 50%;
  }

  #page {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    opacity: 0;
    transition: opacity .6s ease .1s;
  }

  #page.show {
    opacity: 1;
  }

  nav {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 56px;
    border-bottom: 1px solid rgba(255,255,255,.05);
    background: rgba(2,3,11,.75);
    backdrop-filter: blur(22px);
  }

  .nb {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .nl {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    border: 1px solid rgba(255,77,0,.3);
    background: rgba(255,77,0,.07);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .3s;
    cursor: pointer;
  }

  .nl:hover {
    border-color: rgba(255,77,0,.75);
    background: rgba(255,77,0,.16);
    transform: rotate(9deg) scale(1.06);
  }

  .nl img {
    width: 45px;
    height: 45px;
    object-fit: contain;
  }

  .n-name {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -.02em;
  }

  .n-sub {
    font-family: "JetBrains Mono", monospace;
    font-size: 9px;
    color: var(--org);
    letter-spacing: .1em;
    margin-top: 1px;
  }

  .n-right {
    display: flex;
    align-items: center;
    gap: 18px;
  }

  .n-sys {
    display: flex;
    align-items: center;
    gap: 7px;
    font-family: "JetBrains Mono", monospace;
    font-size: 10px;
    color: var(--teal);
    letter-spacing: .1em;
  }

  .n-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--teal);
    box-shadow: 0 0 8px var(--teal);
    animation: blip 2s ease-in-out infinite;
  }

  @keyframes blip {
    0%, 100% {
      opacity: 1;
    }

    50% {
      opacity: .25;
    }
  }

  .n-btn {
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 9px 22px;
    border-radius: 9px;
    border: 1px solid rgba(255,77,0,.38);
    background: rgba(255,77,0,.08);
    font-size: 12px;
    font-weight: 700;
    color: #FFAB80;
    text-decoration: none;
    letter-spacing: .02em;
    transition: all .25s;
  }

  .n-btn::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.1), transparent);
    transform: translateX(-100%);
    transition: transform .5s;
  }

  .n-btn:hover::before {
    transform: translateX(100%);
  }

  .n-btn:hover {
    background: rgba(255,77,0,.2);
    border-color: rgba(255,77,0,.8);
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 5px 22px rgba(255,77,0,.28);
  }

  .n-btn:active {
    transform: scale(.97);
  }

  .hero {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 52px;
    max-width: 1360px;
    margin: 0 auto;
    padding: 68px 56px 88px;
    align-items: center;
  }

  .hl {
    display: flex;
    flex-direction: column;
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 6px 14px;
    border-radius: 7px;
    border: 1px solid rgba(255,77,0,.22);
    background: rgba(255,77,0,.07);
    font-family: "JetBrains Mono", monospace;
    font-size: 9px;
    font-weight: 700;
    color: #FF7A40;
    letter-spacing: .2em;
    width: fit-content;
    margin-bottom: 26px;
    animation: up .7s ease .3s both;
  }

  .e-ping {
    position: relative;
    width: 6px;
    height: 6px;
  }

  .e-ping::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: var(--org);
    animation: ping 1.6s ease-in-out infinite;
  }

  .e-ping::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: var(--org);
  }

  @keyframes ping {
    0% {
      transform: scale(1);
      opacity: .8;
    }

    100% {
      transform: scale(2.8);
      opacity: 0;
    }
  }

  .e-sep {
    color: rgba(255,77,0,.3);
  }

  .h1 {
    font-size: clamp(40px, 5.2vw, 70px);
    font-weight: 800;
    line-height: 1.04;
    letter-spacing: -.055em;
    margin-bottom: 26px;
    animation: up .8s ease .42s both;
  }

  .h1-plain {
    display: block;
    color: var(--text);
  }

  .h1-grad {
    display: block;
    background: linear-gradient(135deg, #FF4D00 0%, #FFB04D 42%, #00FFD1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 44px rgba(255,77,0,.38));
  }

  .h-body {
    font-size: 15px;
    line-height: 1.78;
    color: #94A3B8;
    max-width: 480px;
    margin-bottom: 34px;
    animation: up .7s ease .54s both;
  }

  .h-ctas {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 32px;
    animation: up .7s ease .64s both;
  }

  .cta-p {
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    gap: 9px;
    padding: 13px 30px;
    border-radius: 11px;
    background: var(--org);
    font-size: 13px;
    font-weight: 800;
    color: #fff;
    text-decoration: none;
    letter-spacing: .01em;
    box-shadow: 0 4px 28px rgba(255,77,0,.38);
    transition: all .25s;
  }

  .cta-p::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.2), transparent);
    transform: translateX(-100%);
    transition: transform .55s;
  }

  .cta-p:hover::before {
    transform: translateX(100%);
  }

  .cta-p:hover {
    background: #FF6520;
    box-shadow: 0 8px 44px rgba(255,77,0,.58);
    transform: translateY(-2px) scale(1.01);
  }

  .cta-p:active {
    transform: scale(.97);
  }

  .cta-p .arr {
    transition: transform .2s;
  }

  .cta-p:hover .arr {
    transform: translateX(4px);
  }

  .cta-g {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 26px;
    border-radius: 11px;
    border: 1px solid rgba(0,255,209,.2);
    background: rgba(0,255,209,.04);
    font-size: 13px;
    font-weight: 700;
    color: #66FFE8;
    text-decoration: none;
    transition: all .25s;
  }

  .cta-g:hover {
    border-color: rgba(0,255,209,.5);
    background: rgba(0,255,209,.1);
    transform: translateY(-2px);
    box-shadow: 0 4px 22px rgba(0,255,209,.1);
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 38px;
    animation: up .7s ease .74s both;
  }

  .chip {
    padding: 5px 13px;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,.08);
    background: rgba(255,255,255,.03);
    font-family: "JetBrains Mono", monospace;
    font-size: 10px;
    font-weight: 500;
    color: var(--muted);
    letter-spacing: .04em;
    cursor: default;
    transition: all .2s;
  }

  .chip:hover {
    border-color: rgba(255,77,0,.4);
    color: #FFAB80;
    background: rgba(255,77,0,.07);
    transform: translateY(-1px);
  }

  .mods {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    animation: up .7s ease .84s both;
  }

  .mod {
    border-radius: 14px;
    padding: 18px 16px;
    border: 1px solid rgba(255,255,255,.07);
    background: rgba(255,255,255,.025);
    position: relative;
    overflow: hidden;
    cursor: default;
    transition: all .32s;
  }

  .mod::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--a), transparent);
    opacity: .65;
  }

  .mod::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 0%, rgba(255,255,255,.03), transparent 60%);
    pointer-events: none;
  }

  .mod:hover {
    border-color: var(--a);
    background: rgba(255,255,255,.052);
    transform: translateY(-5px) scale(1.02);
    box-shadow:
      0 16px 48px rgba(0,0,0,.55),
      0 0 0 1px var(--a),
      0 0 30px color-mix(in srgb, var(--a) 20%, transparent);
  }

  .mod-icon {
    font-size: 22px;
    margin-bottom: 12px;
    filter: drop-shadow(0 0 8px var(--a));
  }

  .mod-tag {
    font-family: "JetBrains Mono", monospace;
    font-size: 8px;
    font-weight: 700;
    letter-spacing: .18em;
    color: var(--a);
    margin-bottom: 6px;
  }

  .mod-title {
    font-size: 13px;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 6px;
    letter-spacing: -.02em;
  }

  .mod-desc {
    font-size: 11px;
    color: var(--muted);
    line-height: 1.65;
  }

  .mod-status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    margin-top: 12px;
    font-family: "JetBrains Mono", monospace;
    font-size: 8px;
    font-weight: 700;
    padding: 3px 9px;
    border-radius: 4px;
    letter-spacing: .08em;
    border: 1px solid rgba(40,200,64,.25);
    background: rgba(40,200,64,.08);
    color: #28C840;
  }

  .mod-status-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #28C840;
    box-shadow: 0 0 5px #28C840;
    animation: blip 1.8s ease-in-out infinite;
  }

  @keyframes up {
    from {
      opacity: 0;
      transform: translateY(24px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hr {
    position: relative;
    animation: ri .9s ease .5s both;
  }

  @keyframes ri {
    from {
      opacity: 0;
      transform: translateX(40px);
    }

    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .p-glow {
    position: absolute;
    inset: -50px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,77,0,.12), transparent 65%);
    pointer-events: none;
    z-index: 0;
    animation: glowPulse 4s ease-in-out infinite;
  }

  @keyframes glowPulse {
    0%, 100% {
      opacity: .8;
    }

    50% {
      opacity: 1.4;
    }
  }

  .dash {
    position: relative;
    z-index: 1;
    border-radius: 24px;
    border: 1px solid rgba(255,255,255,.1);
    background: rgba(8,11,24,.92);
    backdrop-filter: blur(22px);
    padding: 18px;
    box-shadow:
      0 32px 100px rgba(0,0,0,.7),
      inset 0 1px 0 rgba(255,255,255,.08);
    transition: all .5s cubic-bezier(.16,1,.3,1);
    transform: perspective(1100px) rotateY(-7deg) rotateX(3.5deg);
  }

  .dash:hover {
    transform: perspective(1100px) rotateY(0deg) rotateX(0deg) translateY(-7px);
    border-color: rgba(255,77,0,.38);
    box-shadow:
      0 44px 120px rgba(0,0,0,.8),
      0 0 80px rgba(255,77,0,.13),
      inset 0 1px 0 rgba(255,255,255,.1);
  }

  .bk {
    position: absolute;
    width: 18px;
    height: 18px;
  }

  .bk.tl {
    top: 11px;
    left: 11px;
    border-top: 1.5px solid rgba(255,77,0,.55);
    border-left: 1.5px solid rgba(255,77,0,.55);
  }

  .bk.tr {
    top: 11px;
    right: 11px;
    border-top: 1.5px solid rgba(255,77,0,.55);
    border-right: 1.5px solid rgba(255,77,0,.55);
  }

  .bk.bl {
    bottom: 11px;
    left: 11px;
    border-bottom: 1.5px solid rgba(255,77,0,.55);
    border-left: 1.5px solid rgba(255,77,0,.55);
  }

  .bk.br {
    bottom: 11px;
    right: 11px;
    border-bottom: 1.5px solid rgba(255,77,0,.55);
    border-right: 1.5px solid rgba(255,77,0,.55);
  }

  .dash-in {
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,.06);
    background: rgba(5,7,18,.97);
    overflow: hidden;
  }

  .dtop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 18px;
    border-bottom: 1px solid rgba(255,255,255,.06);
  }

  .d-dots {
    display: flex;
    gap: 6px;
  }

  .d-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .d-dot.r {
    background: #FF5F57;
    box-shadow: 0 0 5px rgba(255,95,87,.5);
  }

  .d-dot.y {
    background: #FFBD2E;
    box-shadow: 0 0 5px rgba(255,189,46,.5);
  }

  .d-dot.g {
    background: #28C840;
    box-shadow: 0 0 5px rgba(40,200,64,.5);
  }

  .d-title {
    font-family: "JetBrains Mono", monospace;
    font-size: 10px;
    font-weight: 700;
    color: #FF7A40;
    letter-spacing: .15em;
    text-align: center;
  }

  .d-sub {
    font-size: 10px;
    color: var(--muted);
    margin-top: 1px;
    text-align: center;
  }

  .d-live {
    display: flex;
    align-items: center;
    gap: 5px;
    font-family: "JetBrains Mono", monospace;
    font-size: 9px;
    color: var(--teal);
    padding: 4px 10px;
    border-radius: 6px;
    border: 1px solid rgba(0,255,209,.2);
    background: rgba(0,255,209,.06);
  }

  .d-live-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--teal);
    box-shadow: 0 0 6px var(--teal);
    animation: blip 1.5s ease-in-out infinite;
  }

  .dsecs {
    padding: 12px;
  }

  .dsec {
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,.07);
    background: rgba(255,255,255,.025);
    margin-bottom: 10px;
    overflow: hidden;
    transition: all .3s;
  }

  .dsec:last-child {
    margin-bottom: 0;
  }

  .dsec:hover {
    border-color: rgba(255,77,0,.28);
    background: rgba(255,255,255,.042);
  }

  .dsh {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    border-bottom: 1px solid rgba(255,255,255,.05);
  }

  .dsh-lbl {
    display: flex;
    align-items: center;
    gap: 7px;
    font-family: "JetBrains Mono", monospace;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: .12em;
  }

  .dsh-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  .dsh-add {
    font-family: "JetBrains Mono", monospace;
    font-size: 8px;
    color: var(--org);
    padding: 3px 8px;
    border-radius: 4px;
    border: 1px solid rgba(255,77,0,.25);
    letter-spacing: .06em;
    cursor: pointer;
    transition: all .2s;
  }

  .dsh-add:hover {
    background: rgba(255,77,0,.14);
    border-color: rgba(255,77,0,.6);
  }

  .drows {
    padding: 8px 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .drow {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 8px;
    background: rgba(255,255,255,.02);
    border: 1px solid transparent;
    transition: all .2s;
    cursor: default;
  }

  .drow:hover {
    background: rgba(255,255,255,.055);
    border-color: rgba(255,255,255,.08);
    transform: translateX(4px);
    box-shadow: inset 3px 0 0 var(--row-acc, rgba(255,77,0,.5));
  }

  .d-av {
    width: 30px;
    height: 30px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    flex-shrink: 0;
  }

  .d-info {
    flex: 1;
    min-width: 0;
  }

  .d-name {
    font-size: 11px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .d-role {
    font-family: "JetBrains Mono", monospace;
    font-size: 9px;
    color: var(--muted);
    margin-top: 2px;
  }

  .d-badge {
    font-family: "JetBrains Mono", monospace;
    font-size: 8px;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 4px;
    flex-shrink: 0;
    letter-spacing: .04em;
  }

  .fbadge {
    position: absolute;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 9px 14px;
    border-radius: 10px;
    font-family: "JetBrains Mono", monospace;
    font-size: 10px;
    font-weight: 700;
    border: 1px solid rgba(255,255,255,.12);
    background: rgba(8,11,24,.96);
    backdrop-filter: blur(12px);
    white-space: nowrap;
    animation: bf 4s ease-in-out infinite;
    cursor: default;
    transition: box-shadow .2s;
  }

  .fbadge:hover {
    box-shadow: 0 8px 28px rgba(0,0,0,.55);
  }

  .fbadge.tr {
    top: -20px;
    right: -12px;
    animation-delay: .3s;
  }

  .fbadge.bl {
    bottom: -20px;
    left: -12px;
    animation-delay: 1.15s;
  }

  .fbadge.mr {
    right: -22px;
    top: 44%;
    animation-delay: .75s;
    font-size: 9px;
    padding: 7px 11px;
  }

  .fb-d {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  @keyframes bf {
    0%, 100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-10px);
    }
  }

  @media (max-width: 1100px) {
    .hero {
      grid-template-columns: 1fr;
      gap: 52px;
    }

    .dash {
      transform: none !important;
      max-width: 540px;
      margin: 0 auto;
    }
  }

  @media (max-width: 768px) {
    nav {
      padding: 14px 20px;
    }

    .n-right .n-sys {
      display: none;
    }

    .hero {
      padding: 40px 20px 68px;
    }

    .mods {
      grid-template-columns: 1fr;
    }

    .h1 {
      font-size: 38px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transition: none !important;
    }
  }
</style>