<script>
  import { page } from "$app/state";

  let menuOpen = $state(false);

  const currentPath = $derived(page.url.pathname);

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Members", href: "/dashboard/members" },
    { name: "Projects", href: "/dashboard/projects" },
    { name: "Blogs", href: "/dashboard/blogs" }
  ];

  function isActive(href) {
    if (href === "/dashboard") {
      return currentPath === "/dashboard";
    }

    return currentPath.startsWith(href);
  }
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="relative flex min-h-screen flex-col overflow-hidden bg-[#02030B] text-slate-100">
  <!-- Background -->
  <div class="pointer-events-none fixed inset-0 z-0">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(255,77,0,0.14),transparent_30%),radial-gradient(circle_at_86%_14%,rgba(0,255,209,0.09),transparent_28%),radial-gradient(circle_at_50%_92%,rgba(139,92,246,0.10),transparent_34%)]"></div>

    <div class="absolute inset-0 dashboard-grid opacity-50"></div>

    <svg
      class="absolute inset-0 h-full w-full opacity-30"
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
    >
      <path
        d="M40 630 C240 430, 410 560, 610 320 S900 160, 1160 360 S1320 590, 1440 280"
        fill="none"
        stroke="rgba(255,77,0,0.30)"
        stroke-width="1.5"
        stroke-dasharray="8 18"
        class="flow-line"
      />

      <path
        d="M0 240 C260 90, 430 340, 640 210 S950 430, 1420 140"
        fill="none"
        stroke="rgba(0,255,209,0.20)"
        stroke-width="1.5"
        stroke-dasharray="7 16"
        class="flow-line reverse"
      />
    </svg>

    <div class="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,3,11,0.2),rgba(2,3,11,0.78),#02030B)]"></div>
  </div>

  <!-- Navbar -->
  <nav class="sticky top-0 z-50 border-b border-white/[0.07] bg-[#02030B]/80 backdrop-blur-2xl">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
      <!-- Logo / Brand -->
      <a href="/dashboard" class="group flex items-center gap-3">
        <div class="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-orange-500/30 bg-orange-500/10 shadow-[0_0_35px_rgba(255,77,0,0.16)] transition duration-500 group-hover:rotate-6 group-hover:border-orange-500/60 group-hover:bg-orange-500/20 group-hover:shadow-[0_0_50px_rgba(255,77,0,0.30)]">
          <span class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,77,0,0.32),transparent_60%)]"></span>

          <img
            src="/logo.png"
            alt="ML Club Logo"
            class="relative h-14 w-14 object-contain"
          />
        </div>

        <div>
          <h1 class="text-base font-extrabold leading-none tracking-[-0.03em] text-white">
            Machine Learning Club
          </h1>

          <p class="mt-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-orange-400/80">
            Admin Portal
          </p>
        </div>
      </a>

      <!-- Desktop Menu -->
      <div class="hidden items-center gap-2 md:flex">
        {#each navLinks as link}
          <a
            href={link.href}
            class={`nav-link relative rounded-xl px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] transition duration-300 ${
              isActive(link.href)
                ? "border border-orange-500/35 bg-orange-500/10 text-orange-200 shadow-[0_0_28px_rgba(255,77,0,0.12)]"
                : "text-slate-400 hover:border-white/10 hover:bg-white/[0.04] hover:text-white"
            }`}
          >
            {link.name}
          </a>
        {/each}

        <a
          href="/logout"
          class="logout-btn group relative ml-2 inline-flex items-center justify-center overflow-hidden rounded-xl border border-orange-500/35 bg-orange-500/10 px-5 py-2.5 font-mono text-[11px] font-extrabold uppercase tracking-[0.13em] text-orange-200 shadow-[0_12px_35px_rgba(255,77,0,0.12)] transition duration-300 hover:-translate-y-0.5 hover:border-orange-500/70 hover:bg-orange-500 hover:text-white hover:shadow-[0_18px_55px_rgba(255,77,0,0.30)] active:scale-[0.97]"
        >
          <span class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-full"></span>
          <span class="relative">Logout</span>
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button
        onclick={() => (menuOpen = !menuOpen)}
        class="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition duration-300 hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-200 md:hidden"
        aria-label="Toggle menu"
      >
        <span class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,77,0,0.18),transparent_60%)] opacity-0 transition group-hover:opacity-100"></span>
        <span class="relative text-lg">{menuOpen ? "✕" : "☰"}</span>
      </button>
    </div>

    <!-- Mobile Menu -->
    {#if menuOpen}
      <div class="mobile-panel border-t border-white/[0.07] bg-[#02030B]/95 px-5 py-5 backdrop-blur-2xl md:hidden">
        <div class="space-y-2">
          {#each navLinks as link}
            <a
              href={link.href}
              onclick={() => (menuOpen = false)}
              class={`block rounded-xl px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.13em] transition duration-300 ${
                isActive(link.href)
                  ? "border border-orange-500/30 bg-orange-500/10 text-orange-200"
                  : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              {link.name}
            </a>
          {/each}

          <a
            href="/auth"
            class="mt-3 block rounded-xl border border-orange-500/35 bg-orange-500/10 px-4 py-3 text-center font-mono text-xs font-extrabold uppercase tracking-[0.13em] text-orange-200 transition hover:bg-orange-500 hover:text-white"
          >
            Logout
          </a>
        </div>
      </div>
    {/if}
  </nav>

  <!-- Page Content -->
  <main class="relative z-10 flex-1">
    <slot />
  </main>

  <!-- Footer -->
  <footer class="relative z-10 border-t border-white/[0.07] bg-[#02030B]/85 backdrop-blur-2xl">
    <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 md:flex-row">
      <div class="flex items-center gap-3">
        <div class="flex h-9 w-9 items-center justify-center rounded-xl border border-orange-500/25 bg-orange-500/10 shadow-[0_0_28px_rgba(255,77,0,0.12)]">
          <img src="/logo.png" alt="ML Club Logo" class="h-6 w-6 object-contain" />
        </div>

        <div>
          <p class="text-sm font-bold tracking-[-0.02em] text-slate-300">
            © 2026 ML Club
          </p>

          <p class="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-600">
            Secure admin environment
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.03] px-4 py-2">
        <span class="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#00FFD1]"></span>
        <p class="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
          Built with SvelteKit
        </p>
      </div>
    </div>
  </footer>
</div>

<style>
  :global(body) {
    font-family: "Space Grotesk", system-ui, sans-serif;
    background: #02030B;
  }

  :global(.font-mono) {
    font-family: "JetBrains Mono", monospace;
  }

  .dashboard-grid {
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.026) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.026) 1px, transparent 1px);
    background-size: 60px 60px;
    animation: gridMove 20s linear infinite;
  }

  @keyframes gridMove {
    from {
      background-position: 0 0;
    }

    to {
      background-position: 60px 60px;
    }
  }

  .flow-line {
    animation: flowMove 18s linear infinite;
  }

  .flow-line.reverse {
    animation-direction: reverse;
    animation-duration: 24s;
  }

  @keyframes flowMove {
    to {
      stroke-dashoffset: -360;
    }
  }

  .nav-link::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 12px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 77, 0, 0.16),
      transparent
    );
    opacity: 0;
    transition: opacity 0.35s ease;
  }

  .nav-link:hover::before {
    opacity: 1;
  }

  .mobile-panel {
    animation: mobileDrop 0.28s ease both;
  }

  @keyframes mobileDrop {
    from {
      opacity: 0;
      transform: translateY(-12px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>