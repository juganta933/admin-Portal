<script>
  import { onMount } from "svelte";

  let { data } = $props();

  let pageLoading = $state(true);

  onMount(() => {
    const timer = setTimeout(() => {
      pageLoading = false;
    }, 950);

    return () => clearTimeout(timer);
  });

  const stats = [
    {
      title: "Total Members",
      value: data.stats.totalMembers,
      text: "Active club members",
      tag: "MEMBERS",
      accent: "#FF4D00",
      icon: "⬡"
    },
    {
      title: "Projects",
      value: data.stats.totalProjects,
      text: "ML Club projects",
      tag: "PROJECTS",
      accent: "#00FFD1",
      icon: "⟁"
    },
    {
      title: "Blogs",
      value: data.stats.totalBlogs,
      text: "Total blog posts",
      tag: "BLOGS",
      accent: "#8B5CF6",
      icon: "◈"
    },
    {
      title: "Draft Blogs",
      value: data.stats.draftBlogs,
      text: "Blogs not published yet",
      tag: "DRAFTS",
      accent: "#FFBD2E",
      icon: "◌"
    }
  ];

  const cards = [
    {
      title: "Manage Members",
      text: "Add, edit, and delete ML Club members with role, image, and social profile details.",
      link: "/dashboard/members",
      tag: "MEMBER CONTROL",
      accent: "#FF4D00",
      icon: "⬡"
    },
    {
      title: "Manage Projects",
      text: "Maintain project showcase details, tech stacks, GitHub repositories, and live links.",
      link: "/dashboard/projects",
      tag: "PROJECT REGISTRY",
      accent: "#00FFD1",
      icon: "⟁"
    },
    {
      title: "Manage Blogs",
      text: "Create, update, publish, and organize technical blog posts and announcements.",
      link: "/dashboard/blogs",
      tag: "BLOG CMS",
      accent: "#8B5CF6",
      icon: "◈"
    }
  ];

  const nodes = [
    { left: 8, top: 20, size: 4, delay: 0.2 },
    { left: 18, top: 78, size: 5, delay: 1.3 },
    { left: 30, top: 34, size: 4, delay: 0.7 },
    { left: 42, top: 88, size: 3, delay: 2.1 },
    { left: 52, top: 16, size: 5, delay: 1.1 },
    { left: 64, top: 62, size: 4, delay: 1.8 },
    { left: 76, top: 28, size: 5, delay: 0.4 },
    { left: 90, top: 72, size: 4, delay: 2.5 },
    { left: 12, top: 50, size: 3, delay: 1.7 },
    { left: 86, top: 42, size: 3, delay: 0.9 }
  ];
</script>

<svelte:head>
  <title>Dashboard | ML Club Admin</title>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

{#if pageLoading}
  <div class="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#010208] px-5 text-white">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,77,0,0.14),transparent_34%),radial-gradient(circle_at_70%_70%,rgba(0,255,209,0.08),transparent_30%)]"></div>
    <div class="absolute inset-0 loading-grid opacity-40"></div>

    <div class="relative w-full max-w-sm text-center">
      <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[26px] border border-orange-500/30 bg-orange-500/10 shadow-[0_0_70px_rgba(255,77,0,0.24)] sm:h-24 sm:w-24">
        <img src="/logo.png" alt="ML Club Logo" class="h-12 w-12 object-contain sm:h-16 sm:w-16" />
      </div>

      <p class="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-orange-300">
        Entering
      </p>

      <h1 class="mt-3 text-3xl font-extrabold tracking-[-0.06em] text-white sm:text-4xl">
        Admin Dashboard
      </h1>

      <div class="mx-auto mt-6 h-1.5 w-full max-w-64 overflow-hidden rounded-full bg-white/10">
        <div class="loading-bar h-full rounded-full bg-gradient-to-r from-orange-500 via-orange-300 to-cyan-300"></div>
      </div>

      <p class="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600">
        Syncing dashboard records...
      </p>
    </div>
  </div>
{/if}

<section
  class={`relative min-h-screen overflow-hidden bg-[#02030B] px-4 py-8 text-slate-100 transition duration-700 sm:px-5 sm:py-10 ${
    pageLoading ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
  }`}
>
  <!-- Animated Background -->
  <div class="pointer-events-none absolute inset-0">
    <div class="dashboard-bg absolute inset-0 scale-105 bg-[url('/dashboard-bg.jpg')] bg-cover bg-center opacity-[1]"></div>
    <div class="absolute inset-0 bg-[#02030B]/62"></div>

    <div class="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(255,77,0,0.16),transparent_30%),radial-gradient(circle_at_84%_20%,rgba(0,255,209,0.10),transparent_28%),radial-gradient(circle_at_52%_94%,rgba(139,92,246,0.12),transparent_36%)]"></div>

    <div class="absolute inset-0 dashboard-grid opacity-50"></div>
    <div class="absolute inset-0 scan-layer opacity-[0.10]"></div>

    <div class="floating-blob absolute left-[-180px] top-20 h-[320px] w-[320px] rounded-full bg-orange-600/[0.08] blur-[120px] sm:left-[-140px] sm:h-[420px] sm:w-[420px] sm:blur-[135px]"></div>
    <div class="floating-blob delay-blob absolute bottom-10 right-[-190px] h-[340px] w-[340px] rounded-full bg-cyan-400/[0.06] blur-[125px] sm:right-[-160px] sm:h-[460px] sm:w-[460px] sm:blur-[150px]"></div>
    <div class="pulse-core absolute left-1/2 top-[45%] h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.04] blur-[130px] sm:h-[520px] sm:w-[520px] sm:blur-[150px]"></div>

    {#each nodes as node}
      <span
        class="neural-dot absolute rounded-full bg-orange-500 shadow-[0_0_28px_rgba(255,77,0,0.9)]"
        style={`left:${node.left}%; top:${node.top}%; width:${node.size}px; height:${node.size}px; animation-delay:${node.delay}s;`}
      ></span>
    {/each}

    <div class="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,3,11,0.10),rgba(2,3,11,0.75),#02030B)]"></div>
  </div>

  <div class="relative z-10 mx-auto max-w-7xl">
    <!-- Header -->
    <div class="dashboard-enter">
      <div class="inline-flex max-w-full items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-3 py-2 shadow-[0_0_35px_rgba(255,77,0,0.12)] backdrop-blur-xl sm:px-4">
        <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500 shadow-[0_0_14px_#FF4D00]"></span>

        <span class="font-mono text-[9px] font-bold uppercase tracking-[0.20em] text-orange-300 sm:text-[10px] sm:tracking-[0.24em]">
          Admin Dashboard
        </span>
      </div>

      <div class="mt-6 grid items-end gap-6 lg:grid-cols-[1fr_auto]">
        <div>
          <h1 class="max-w-4xl text-[38px] font-extrabold leading-[1.04] tracking-[-0.055em] text-white sm:text-[48px] md:text-[64px]">
            Manage
            <span class="bg-gradient-to-r from-[#FF4D00] via-[#FFB04D] to-[#00FFD1] bg-clip-text text-transparent drop-shadow-[0_0_34px_rgba(255,77,0,0.30)]">
              ML Club
            </span>
            Website
          </h1>

          <p class="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-[15px] sm:leading-8">
            A secure command center for controlling members, projects, blogs, and publishing operations of the Machine Learning Club.
          </p>
        </div>

        <div class="rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:px-5 lg:block">
          <div class="flex items-center gap-3">
            <div class="h-2 w-2 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_14px_#00FFD1]"></div>

            <div>
              <p class="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-200">
                System Online
              </p>

              <p class="mt-1 text-xs text-slate-500">
                Database synced successfully
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
      {#each stats as stat, index}
        <div
          class="stat-card group relative overflow-hidden rounded-[24px] border border-white/[0.075] bg-[#070A16]/80 p-[1px] shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-white/15 hover:shadow-[0_34px_110px_rgba(0,0,0,0.75)]"
          style={`--accent:${stat.accent}; animation-delay:${0.12 + index * 0.08}s;`}
        >
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--accent)_18%,transparent),transparent_45%)] opacity-70"></div>
          <div class="card-border"></div>

          <div class="relative rounded-[23px] bg-[linear-gradient(180deg,rgba(10,13,28,0.94),rgba(3,5,13,0.96))] p-5 sm:p-6">
            <div class="flex items-center justify-between gap-4">
              <div class="rounded-xl border border-white/[0.08] bg-black/35 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500 transition group-hover:text-[var(--accent)]">
                {stat.tag}
              </div>

              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-lg text-[var(--accent)] shadow-[0_0_28px_color-mix(in_srgb,var(--accent)_22%,transparent)] transition duration-500 group-hover:rotate-6 group-hover:scale-110">
                {stat.icon}
              </div>
            </div>

            <h2 class="mt-6 text-[38px] font-extrabold leading-none tracking-[-0.06em] text-white sm:mt-7 sm:text-[44px]">
              {stat.value}
            </h2>

            <p class="mt-3 text-sm font-semibold text-slate-300">
              {stat.title}
            </p>

            <p class="mt-2 text-xs leading-6 text-slate-500">
              {stat.text}
            </p>
          </div>
        </div>
      {/each}
    </div>

    <!-- Action Cards -->
    <div class="mt-12 grid gap-5 md:grid-cols-3 lg:gap-6">
      {#each cards as card, index}
        <div
          class="action-card group relative overflow-hidden rounded-[28px] border border-white/[0.075] bg-[#070A16]/85 p-[1px] shadow-[0_28px_95px_rgba(0,0,0,0.60)] backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-white/15 hover:shadow-[0_40px_130px_rgba(0,0,0,0.80)]"
          style={`--accent:${card.accent}; animation-delay:${0.28 + index * 0.1}s;`}
        >
          <div class="action-aura"></div>

          <div class="relative flex min-h-[260px] flex-col rounded-[27px] bg-[linear-gradient(180deg,rgba(10,13,28,0.96),rgba(2,3,11,0.98))] p-6 sm:min-h-[280px] sm:p-7">
            <span class="corner left-5 top-5 border-l border-t"></span>
            <span class="corner right-5 top-5 border-r border-t"></span>
            <span class="corner bottom-5 left-5 border-b border-l"></span>
            <span class="corner bottom-5 right-5 border-b border-r"></span>

            <div class="flex items-start justify-between gap-5">
              <div>
                <div class="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--accent)] sm:text-[10px] sm:tracking-[0.20em]">
                  {card.tag}
                </div>

                <h2 class="mt-4 text-2xl font-extrabold tracking-[-0.04em] text-white">
                  {card.title}
                </h2>
              </div>

              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-black/35 text-2xl text-[var(--accent)] shadow-[0_0_35px_color-mix(in_srgb,var(--accent)_20%,transparent)] transition duration-500 group-hover:rotate-6 group-hover:scale-110">
                {card.icon}
              </div>
            </div>

            <p class="mt-5 text-sm leading-7 text-slate-500">
              {card.text}
            </p>

            <a
              href={card.link}
              class="premium-link group/link relative mt-auto flex items-center justify-center overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.035] px-5 py-3.5 font-mono text-[10px] font-extrabold uppercase tracking-[0.13em] text-slate-300 transition duration-500 hover:-translate-y-1 hover:border-[var(--accent)] hover:bg-[color-mix(in_srgb,var(--accent)_13%,transparent)] hover:text-white hover:shadow-[0_20px_70px_color-mix(in_srgb,var(--accent)_22%,transparent)] active:scale-[0.98] sm:text-[11px] sm:tracking-[0.15em]"
            >
              <span class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover/link:translate-x-full"></span>

              <span class="relative flex items-center gap-2">
                Open Console
                <span class="transition duration-300 group-hover/link:translate-x-1">→</span>
              </span>
            </a>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  :global(body) {
    font-family: "Space Grotesk", system-ui, sans-serif;
    background: #02030B;
  }
@media (max-width: 768px) {
  .dashboard-bg {
    opacity: 0.35 !important;
    transform: none !important;
  }
}

  :global(.font-mono) {
    font-family: "JetBrains Mono", monospace;
  }

  .loading-grid,
  .dashboard-grid {
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.024) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.024) 1px, transparent 1px);
  }

  .loading-grid {
    background-size: 54px 54px;
    animation: loadingGrid 12s linear infinite;
  }

  @keyframes loadingGrid {
    from {
      background-position: 0 0;
    }

    to {
      background-position: 54px 54px;
    }
  }

  .loading-bar {
    width: 45%;
    animation: loadingMove 0.95s ease-in-out forwards;
    box-shadow: 0 0 35px rgba(255, 77, 0, 0.5);
  }

  @keyframes loadingMove {
    from {
      width: 8%;
      transform: translateX(-20%);
    }

    to {
      width: 100%;
      transform: translateX(0);
    }
  }

  .dashboard-grid {
    background-size: 58px 58px;
    animation: gridShift 26s linear infinite;
  }

  @keyframes gridShift {
    from {
      background-position: 0 0;
    }

    to {
      background-position: 58px 58px;
    }
  }

  .scan-layer {
    background: repeating-linear-gradient(
      to bottom,
      transparent 0px,
      transparent 3px,
      rgba(255, 255, 255, 0.05) 4px
    );
  }

  .neural-dot {
    animation: dotPop 4.8s ease-in-out infinite;
  }

  @keyframes dotPop {
    0%,
    100% {
      opacity: 0.14;
      transform: scale(0.75);
    }

    42% {
      opacity: 0.75;
      transform: scale(1.9);
    }

    70% {
      opacity: 0.32;
      transform: scale(0.95);
    }
  }

  .floating-blob {
    animation: blobFloat 10s ease-in-out infinite;
  }

  .delay-blob {
    animation-delay: 2.2s;
  }

  @keyframes blobFloat {
    0%,
    100% {
      transform: translate3d(0, 0, 0) scale(1);
    }

    50% {
      transform: translate3d(28px, -20px, 0) scale(1.06);
    }
  }

  .pulse-core {
    animation: corePulse 7s ease-in-out infinite;
  }

  @keyframes corePulse {
    0%,
    100% {
      opacity: 0.30;
      transform: translate(-50%, -50%) scale(1);
    }

    50% {
      opacity: 0.62;
      transform: translate(-50%, -50%) scale(1.08);
    }
  }

  .dashboard-enter {
    animation: dashboardEnter 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes dashboardEnter {
    from {
      opacity: 0;
      transform: translateY(28px);
      filter: blur(10px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
    }
  }

  .stat-card,
  .action-card {
    animation: cardRise 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes cardRise {
    from {
      opacity: 0;
      transform: translateY(32px) scale(0.96);
      filter: blur(12px);
    }

    to {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }

  .card-border {
    position: absolute;
    inset: -1px;
    border-radius: 24px;
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--accent) 35%, transparent),
      rgba(255, 255, 255, 0.03),
      color-mix(in srgb, var(--accent) 18%, transparent)
    );
    opacity: 0.25;
    filter: blur(18px);
    transition: opacity 0.5s ease;
  }

  .stat-card:hover .card-border {
    opacity: 0.62;
  }

  .action-aura {
    position: absolute;
    inset: -80%;
    background: conic-gradient(
      from 180deg,
      transparent,
      color-mix(in srgb, var(--accent) 18%, transparent),
      transparent,
      rgba(255, 255, 255, 0.05),
      transparent
    );
    opacity: 0.42;
    animation: rotateAura 15s linear infinite;
  }

  .action-card:hover .action-aura {
    opacity: 0.68;
  }

  @keyframes rotateAura {
    to {
      transform: rotate(360deg);
    }
  }
@media (hover: none) {
  .group:hover,
  .stat-card:hover,
  .action-card:hover,
  .project-card:hover,
  .blog-card:hover,
  .member-card:hover {
    transform: none !important;
  }

  .group:hover img {
    transform: none !important;
  }
}

  .corner {
    position: absolute;
    height: 18px;
    width: 18px;
    border-color: color-mix(in srgb, var(--accent) 48%, transparent);
    transition: all 0.45s ease;
  }

  .action-card:hover .corner {
    height: 26px;
    width: 26px;
    border-color: color-mix(in srgb, var(--accent) 70%, transparent);
  }

  @media (max-width: 640px) {
    .neural-dot {
      display: none;
    }

    .dashboard-grid {
      background-size: 44px 44px;
    }

    .stat-card:hover,
    .action-card:hover {
      transform: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .loading-grid,
    .dashboard-grid,
    .loading-bar,
    .neural-dot,
    .floating-blob,
    .pulse-core,
    .dashboard-enter,
    .stat-card,
    .action-card,
    .action-aura {
      animation: none;
    }
  }
</style>
