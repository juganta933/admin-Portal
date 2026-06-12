<script>
  let { form } = $props();

  const nodes = [
    { left: 6, top: 14, size: 4, delay: 0.2 },
    { left: 15, top: 67, size: 3, delay: 1.4 },
    { left: 27, top: 28, size: 5, delay: 0.7 },
    { left: 38, top: 84, size: 4, delay: 2.1 },
    { left: 49, top: 16, size: 3, delay: 1.0 },
    { left: 62, top: 58, size: 5, delay: 1.7 },
    { left: 76, top: 25, size: 4, delay: 0.4 },
    { left: 88, top: 78, size: 3, delay: 2.3 },
    { left: 93, top: 38, size: 4, delay: 1.2 },
    { left: 10, top: 44, size: 3, delay: 2.6 },
    { left: 34, top: 52, size: 4, delay: 1.9 },
    { left: 71, top: 82, size: 3, delay: 0.9 }
  ];
</script>

<svelte:head>
  <title>Admin Login | ML Club</title>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>
<main class="relative min-h-screen overflow-hidden bg-[#010208] px-4 text-slate-200">
  <!-- Dark Animated Background -->
  <div class="pointer-events-none absolute inset-0">
    <div class="absolute inset-0 bg-[url('/auth-bg.jpg')] bg-cover bg-center opacity-[1] scale-105"></div>
    <div class="absolute inset-0 bg-[#010208]/55"></div>

    <!-- your existing animated background layers below this -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,77,0,0.08),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(0,255,209,0.06),transparent_28%),radial-gradient(circle_at_15%_85%,rgba(139,92,246,0.08),transparent_30%)]"></div>

    <div class="absolute inset-0 dark-grid opacity-70"></div>
    <div class="absolute inset-0 scan-layer opacity-[0.13]"></div>

    <div class="absolute -left-24 top-20 h-[360px] w-[360px] rounded-full bg-orange-600/[0.07] blur-[120px] floating-blob"></div>
    <div class="absolute -right-24 bottom-16 h-[420px] w-[420px] rounded-full bg-cyan-400/[0.055] blur-[140px] floating-blob delay-blob"></div>
    <div class="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.035] blur-[150px] pulse-core"></div>

    <svg
      class="absolute inset-0 h-full w-full opacity-45"
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
    >
      <path
        d="M-40 620 C180 420, 360 530, 560 300 S850 160, 1110 360 S1290 560, 1480 270"
        fill="none"
        stroke="rgba(255,77,0,0.20)"
        stroke-width="1.2"
        stroke-dasharray="6 18"
        class="signal-line"
      />

      <path
        d="M20 180 C240 80, 430 330, 620 190 S950 430, 1450 120"
        fill="none"
        stroke="rgba(0,255,209,0.15)"
        stroke-width="1.2"
        stroke-dasharray="5 16"
        class="signal-line reverse"
      />

      <path
        d="M130 850 C350 620, 540 710, 760 510 S1050 340, 1320 660"
        fill="none"
        stroke="rgba(139,92,246,0.17)"
        stroke-width="1.2"
        stroke-dasharray="7 17"
        class="signal-line slow"
      />
    </svg>

    {#each nodes as node}
      <span
        class="neural-dot absolute rounded-full bg-orange-500 shadow-[0_0_24px_rgba(255,77,0,0.9)]"
        style={`left:${node.left}%; top:${node.top}%; width:${node.size}px; height:${node.size}px; animation-delay:${node.delay}s;`}
      ></span>
    {/each}

    <div class="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(1,2,8,0.1),rgba(1,2,8,0.78),#010208)]"></div>
  </div>

  <!-- Page Content -->
  <section class="relative z-10 flex min-h-screen items-center justify-center py-10">
    <div class="w-full max-w-[460px]">
      <!-- Top mini status -->
      <div class="mb-5 flex items-center justify-center">
        <div class="status-pill group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/35 px-4 py-2 backdrop-blur-xl transition duration-500 hover:border-orange-500/30 hover:bg-orange-500/[0.06]">
          <span class="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_14px_#00FFD1]"></span>
          <span class="font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-slate-500 transition group-hover:text-cyan-200">
            Encrypted Admin Gateway
          </span>
        </div>
      </div>

      <!-- Card -->
      <div class="premium-card group relative overflow-hidden rounded-[30px] border border-white/[0.075] bg-[#040610]/90 p-[1px] shadow-[0_40px_140px_rgba(0,0,0,0.95)] backdrop-blur-2xl">
        <div class="card-shine"></div>

        <div class="relative rounded-[29px] border border-white/[0.045] bg-[linear-gradient(180deg,rgba(10,13,28,0.96),rgba(2,3,11,0.98))] px-7 py-8 sm:px-8">
          <!-- corner lines -->
          <span class="corner left-5 top-5 border-l border-t"></span>
          <span class="corner right-5 top-5 border-r border-t"></span>
          <span class="corner bottom-5 left-5 border-b border-l"></span>
          <span class="corner bottom-5 right-5 border-b border-r"></span>

          <!-- Logo -->
          <div class="flex justify-center">
            <div class="logo-wrap relative flex h-[88px] w-[88px] items-center justify-center rounded-[26px] border border-orange-500/25 bg-black/45 shadow-[0_0_60px_rgba(255,77,0,0.18)] transition duration-500 group-hover:border-orange-500/45 group-hover:shadow-[0_0_80px_rgba(255,77,0,0.28)]">
              <span class="absolute inset-[-9px] rounded-[32px] border border-orange-500/10"></span>
              <span class="absolute inset-[-18px] rounded-[38px] border border-cyan-300/[0.06]"></span>

              <img
                src="/logo.png"
                alt="ML Club Logo"
                class="relative h-14 w-14 object-contain"
              />
            </div>
          </div>

          <!-- Heading -->
          <div class="mt-7 text-center">
            <div class="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-orange-400/80">
              // Restricted Access
            </div>

            <h1 class="mt-3 text-[31px] font-extrabold leading-tight tracking-[-0.05em] text-slate-100">
              Admin Login
            </h1>

            <p class="mx-auto mt-2 max-w-[300px] text-sm leading-6 text-slate-500">
              Verify your credentials to unlock the ML Club control panel.
            </p>
          </div>

          <!-- Error -->
          {#if form?.message}
            <div class="mt-6 rounded-2xl border border-red-500/25 bg-red-500/[0.08] px-4 py-3 font-mono text-xs text-red-300 shadow-[0_0_35px_rgba(239,68,68,0.10)]">
              {form.message}
            </div>
          {/if}

          <!-- Form -->
          <form method="POST" action="?/login" class="mt-7 space-y-5">
            <div>
              <label
                for="userId"
                class="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500"
              >
                User ID
              </label>

              <div class="field-wrap group/field relative">
                <input
                  id="userId"
                  name="userId"
                  type="text"
                  placeholder="Enter your user ID"
                  class="premium-input relative w-full rounded-2xl border border-white/[0.07] bg-black/35 px-4 py-3.5 font-mono text-sm text-slate-100 outline-none transition duration-500 placeholder:text-slate-700 focus:border-orange-500/45 focus:bg-orange-500/[0.035] focus:ring-2 focus:ring-orange-500/[0.08]"
                />
              </div>
            </div>

            <div>
              <label
                for="password"
                class="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500"
              >
                Password
              </label>

              <div class="field-wrap group/field relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  class="premium-input relative w-full rounded-2xl border border-white/[0.07] bg-black/35 px-4 py-3.5 font-mono text-sm text-slate-100 outline-none transition duration-500 placeholder:text-slate-700 focus:border-cyan-300/35 focus:bg-cyan-300/[0.025] focus:ring-2 focus:ring-cyan-300/[0.07]"
                />
              </div>
            </div>

            <button
              type="submit"
              class="premium-button group/btn relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-orange-500/25 bg-[linear-gradient(180deg,rgba(255,77,0,0.18),rgba(255,77,0,0.08))] px-5 py-3.5 font-mono text-xs font-extrabold uppercase tracking-[0.17em] text-orange-200 shadow-[0_16px_50px_rgba(255,77,0,0.13)] transition duration-500 hover:-translate-y-1 hover:border-orange-500/55 hover:text-white hover:shadow-[0_26px_80px_rgba(255,77,0,0.28)] active:scale-[0.98]"
            >
              <span class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover/btn:translate-x-full"></span>
              <span class="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-cyan-300/0 opacity-0 transition duration-500 group-hover/btn:opacity-100"></span>

              <span class="relative flex items-center gap-2">
                Access Console
                <span class="transition duration-300 group-hover/btn:translate-x-1">→</span>
              </span>
            </button>
          </form>

          <!-- Bottom -->
          <div class="mt-6 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-700">
            <span class="h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_12px_#FF4D00]"></span>
            Protected route authentication
          </div>

          <p class="mt-4 text-center text-[11px] text-slate-700">
            © 2026 ML Club. Admin access only.
          </p>
        </div>
      </div>
    </div>
  </section>
</main>

<style>
  :global(body) {
    font-family: "Space Grotesk", system-ui, sans-serif;
    background: #010208;
  }

  :global(.font-mono) {
    font-family: "JetBrains Mono", monospace;
  }

  .dark-grid {
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.022) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.022) 1px, transparent 1px);
    background-size: 54px 54px;
    animation: gridShift 18s linear infinite;
  }

  @keyframes gridShift {
    from {
      background-position: 0 0;
    }

    to {
      background-position: 54px 54px;
    }
  }

  .scan-layer {
    background: repeating-linear-gradient(
      to bottom,
      transparent 0px,
      transparent 3px,
      rgba(255, 255, 255, 0.055) 4px
    );
  }

  .signal-line {
    animation: signalFlow 16s linear infinite;
  }

  .signal-line.reverse {
    animation-direction: reverse;
    animation-duration: 22s;
  }

  .signal-line.slow {
    animation-duration: 28s;
  }

  @keyframes signalFlow {
    to {
      stroke-dashoffset: -360;
    }
  }

  .neural-dot {
    animation: dotPop 3.6s ease-in-out infinite;
  }

  @keyframes dotPop {
    0%,
    100% {
      opacity: 0.18;
      transform: scale(0.8);
    }

    40% {
      opacity: 1;
      transform: scale(2.45);
    }

    70% {
      opacity: 0.38;
      transform: scale(0.95);
    }
  }

  .floating-blob {
    animation: blobFloat 8s ease-in-out infinite;
  }

  .delay-blob {
    animation-delay: 2s;
  }

  @keyframes blobFloat {
    0%,
    100% {
      transform: translate3d(0, 0, 0) scale(1);
    }

    50% {
      transform: translate3d(34px, -22px, 0) scale(1.08);
    }
  }

  .pulse-core {
    animation: corePulse 5s ease-in-out infinite;
  }

  @keyframes corePulse {
    0%,
    100% {
      opacity: 0.35;
      transform: translate(-50%, -50%) scale(1);
    }

    50% {
      opacity: 0.75;
      transform: translate(-50%, -50%) scale(1.14);
    }
  }

  .premium-card {
    animation: cardEnter 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .premium-card::before {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: 30px;
    background: linear-gradient(
      135deg,
      rgba(255, 77, 0, 0.30),
      rgba(0, 255, 209, 0.10),
      rgba(139, 92, 246, 0.20),
      rgba(255, 77, 0, 0.20)
    );
    opacity: 0.36;
    z-index: -1;
    filter: blur(22px);
    transition: opacity 0.5s ease, filter 0.5s ease;
  }

  .premium-card:hover::before {
    opacity: 0.6;
    filter: blur(28px);
  }

  .card-shine {
    position: absolute;
    inset: -100%;
    background: conic-gradient(
      from 180deg,
      transparent,
      rgba(255, 77, 0, 0.16),
      transparent,
      rgba(0, 255, 209, 0.09),
      transparent
    );
    animation: rotateAura 9s linear infinite;
    opacity: 0.55;
  }

  @keyframes rotateAura {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes cardEnter {
    from {
      opacity: 0;
      transform: translateY(34px) scale(0.95);
      filter: blur(14px);
    }

    to {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }

  .corner {
    position: absolute;
    height: 18px;
    width: 18px;
    border-color: rgba(255, 77, 0, 0.42);
    transition: all 0.45s ease;
  }

  .premium-card:hover .corner {
    height: 24px;
    width: 24px;
    border-color: rgba(0, 255, 209, 0.38);
  }

  .field-wrap::before {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: 16px;
    background: linear-gradient(
      90deg,
      rgba(255, 77, 0, 0),
      rgba(255, 77, 0, 0.22),
      rgba(0, 255, 209, 0.12),
      rgba(255, 77, 0, 0)
    );
    opacity: 0;
    filter: blur(13px);
    transition: opacity 0.45s ease;
  }

  .field-wrap:focus-within::before {
    opacity: 1;
  }

  .premium-input {
    position: relative;
    z-index: 1;
  }

  .premium-button {
    isolation: isolate;
  }

  .status-pill {
    animation: softDrop 0.85s ease both;
  }
@media (max-width: 768px), (hover: none) {
  .group:hover,
  button:hover,
  a:hover {
    transform: none !important;
  }

  .group:hover img,
  .group:hover div,
  .group:hover span {
    transform: none !important;
  }

  button:hover,
  a:hover {
    box-shadow: none !important;
  }

  .auth-card:hover,
  .login-card:hover,
  .glass-card:hover {
    transform: none !important;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45) !important;
  }

  .floating-blob,
  .pulse-core,
  .neural-dot,
  .auth-aura,
  .modal-shine,
  .scan-layer {
    display: none !important;
  }
}
  @keyframes softDrop {
    from {
      opacity: 0;
      transform: translateY(-18px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
