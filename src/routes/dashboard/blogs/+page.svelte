<script>
  import { enhance } from "$app/forms";
  import { onMount } from "svelte";

  let { data, form } = $props();

  let clientError = $state("");
  let blogs = $state(data.blogs);
  let pageLoading = $state(true);

  onMount(() => {
    const timer = setTimeout(() => {
      pageLoading = false;
    }, 950);

    return () => clearTimeout(timer);
  });

  $effect(() => {
    blogs = data.blogs;
  });

  let showDeleteModal = $state(false);
  let deletingBlog = $state(null);

  function openDeleteModal(blog) {
    deletingBlog = blog;
    showDeleteModal = true;
  }

  function closeDeleteModal() {
    deletingBlog = null;
    showDeleteModal = false;
  }

  let isSubmitting = $state(false);

  const handleFormSubmit = ({ formData, cancel }) => {
    clientError = "";

    const imageFile = formData.get("imageFile");
    const maxSize = 2 * 1024 * 1024;

    if (!isEditing && (!imageFile || imageFile.size === 0)) {
      clientError = "Please upload a blog image.";
      cancel();
      return;
    }

    if (imageFile && imageFile.size > maxSize) {
      clientError = "Image size must be less than 2MB.";
      cancel();
      return;
    }

    isSubmitting = true;

    return async ({ update, result }) => {
      await update({
        reset: false,
        invalidateAll: true
      });

      isSubmitting = false;

      if (result.type === "success" || result.type === "redirect") {
        showModal = false;
        clientError = "";
      }
    };
  };

  const categoryOptions = [
    "Machine Learning",
    "Python",
    "Deep Learning",
    "Data Science",
    "Artificial Intelligence"
  ];

  const statusOptions = ["Published", "Draft"];

  const categoryAccents = {
    "Machine Learning": "#FF4D00",
    Python: "#00FFD1",
    "Deep Learning": "#8B5CF6",
    "Data Science": "#FFBD2E",
    "Artificial Intelligence": "#F472B6"
  };

  const categoryIcons = {
    "Machine Learning": "⬡",
    Python: "⌘",
    "Deep Learning": "◈",
    "Data Science": "◌",
    "Artificial Intelligence": "✦"
  };

  const statusAccents = {
    Published: "#22C55E",
    Draft: "#FFBD2E"
  };

  let showModal = $state(false);
  let isEditing = $state(false);
  let editingId = $state(null);

  let blogForm = $state({
    title: "",
    category: "Machine Learning",
    author: "ML Club",
    description: "",
    image: "",
    date: "",
    status: "Draft"
  });

  let categories = $derived(
    categoryOptions.map((category) => ({
      title: category,
      count: blogs.filter((blog) => blog.category === category).length,
      accent: categoryAccents[category] || "#FF4D00",
      icon: categoryIcons[category] || "⬡"
    }))
  );

  let publishedCount = $derived(
    blogs.filter((blog) => blog.status === "Published").length
  );

  let draftCount = $derived(
    blogs.filter((blog) => blog.status === "Draft").length
  );

  const summaryCards = $derived([
    {
      title: "Total Blogs",
      value: blogs.length,
      text: "All blog posts",
      accent: "#FF4D00",
      icon: "◈"
    },
    {
      title: "Published",
      value: publishedCount,
      text: "Visible posts",
      accent: "#22C55E",
      icon: "✓"
    },
    {
      title: "Drafts",
      value: draftCount,
      text: "Pending posts",
      accent: "#FFBD2E",
      icon: "◌"
    },
    {
      title: "Categories",
      value: categoryOptions.length,
      text: "Content groups",
      accent: "#00FFD1",
      icon: "✦"
    }
  ]);

  function resetForm() {
    blogForm.title = "";
    blogForm.category = "Machine Learning";
    blogForm.author = "ML Club";
    blogForm.description = "";
    blogForm.image = "";
    blogForm.date = "";
    blogForm.status = "Draft";
  }

  function openAddModal() {
    isEditing = false;
    editingId = null;
    resetForm();
    showModal = true;
  }

  function openEditModal(blog) {
    isEditing = true;
    editingId = blog._id;

    blogForm.title = blog.title;
    blogForm.category = blog.category;
    blogForm.author = blog.author;
    blogForm.description = blog.description;
    blogForm.image = blog.image;
    blogForm.date = blog.date;
    blogForm.status = blog.status;

    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }

  const nodes = [
    { left: 8, top: 18, size: 4, delay: 0.2 },
    { left: 18, top: 76, size: 5, delay: 1.1 },
    { left: 31, top: 35, size: 4, delay: 0.7 },
    { left: 43, top: 88, size: 3, delay: 2.2 },
    { left: 54, top: 16, size: 5, delay: 1.4 },
    { left: 66, top: 60, size: 4, delay: 1.8 },
    { left: 78, top: 26, size: 5, delay: 0.5 },
    { left: 90, top: 74, size: 4, delay: 2.6 },
    { left: 12, top: 50, size: 3, delay: 1.7 },
    { left: 86, top: 42, size: 3, delay: 0.9 }
  ];
</script>

<svelte:head>
  <title>Blogs | ML Club Admin</title>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

{#if pageLoading}
  <div class="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#010208] text-white">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,77,0,0.14),transparent_34%),radial-gradient(circle_at_70%_70%,rgba(0,255,209,0.08),transparent_30%)]"></div>
    <div class="absolute inset-0 loading-grid opacity-40"></div>

    <div class="relative text-center">
      <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[26px] border border-orange-500/30 bg-orange-500/10 shadow-[0_0_70px_rgba(255,77,0,0.24)]">
        <img src="/logo.png" alt="ML Club Logo" class="h-19 w-19 object-contain" />
      </div>

      <p class="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-orange-300">
        Entering
      </p>

      <h1 class="mt-3 text-4xl font-extrabold tracking-[-0.06em] text-white">
        Blog Management
      </h1>

      <div class="mx-auto mt-6 h-1.5 w-64 overflow-hidden rounded-full bg-white/10">
        <div class="loading-bar h-full rounded-full bg-gradient-to-r from-orange-500 via-orange-300 to-cyan-300"></div>
      </div>

      <p class="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600">
        Syncing blog records...
      </p>
    </div>
  </div>
{/if}

<section
  class={`relative min-h-screen overflow-hidden bg-[#02030B] px-5 py-10 text-slate-100 transition duration-700 ${
    pageLoading ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
  }`}
>
  <!-- Animated Background -->
  <div class="pointer-events-none absolute inset-0">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(255,77,0,0.15),transparent_30%),radial-gradient(circle_at_84%_22%,rgba(0,255,209,0.10),transparent_28%),radial-gradient(circle_at_52%_94%,rgba(139,92,246,0.13),transparent_36%)]"></div>

    <div class="absolute inset-0 blog-grid opacity-50"></div>
    <div class="absolute inset-0 scan-layer opacity-[0.09]"></div>

    <div class="floating-blob absolute left-[-140px] top-24 h-[420px] w-[420px] rounded-full bg-orange-600/[0.08] blur-[135px]"></div>
    <div class="floating-blob delay-blob absolute bottom-10 right-[-160px] h-[460px] w-[460px] rounded-full bg-cyan-400/[0.06] blur-[150px]"></div>
    <div class="pulse-core absolute left-1/2 top-[42%] h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.045] blur-[160px]"></div>

    {#each nodes as node}
      <span
        class="neural-dot absolute rounded-full bg-orange-500 shadow-[0_0_28px_rgba(255,77,0,0.9)]"
        style={`left:${node.left}%; top:${node.top}%; width:${node.size}px; height:${node.size}px; animation-delay:${node.delay}s;`}
      ></span>
    {/each}

    <div class="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,3,11,0.10),rgba(2,3,11,0.76),#02030B)]"></div>
  </div>

  <div class="relative z-10 mx-auto max-w-7xl">
    <!-- Header -->
    <div class="page-enter flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <div class="inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-2 shadow-[0_0_35px_rgba(255,77,0,0.12)] backdrop-blur-xl">
          <span class="h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_14px_#FF4D00]"></span>
          <span class="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-orange-300">
            Blog Management
          </span>
        </div>

        <h1 class="mt-6 max-w-4xl text-[42px] font-extrabold leading-[1.04] tracking-[-0.055em] text-white md:text-[64px]">
          Manage
          <span class="bg-gradient-to-r from-[#FF4D00] via-[#FFB04D] to-[#00FFD1] bg-clip-text text-transparent drop-shadow-[0_0_34px_rgba(255,77,0,0.30)]">
            Club Blogs
          </span>
        </h1>

        <p class="mt-5 max-w-2xl text-[15px] leading-8 text-slate-400">
          Create, edit, publish, and organize ML Club blog posts with showcase images, authors, categories, and publication status.
        </p>
      </div>

      <button
        type="button"
        onclick={openAddModal}
        class="premium-add group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-orange-500/35 bg-orange-500/10 px-6 py-4 font-mono text-xs font-extrabold uppercase tracking-[0.16em] text-orange-200 shadow-[0_18px_60px_rgba(255,77,0,0.16)] transition duration-500 hover:-translate-y-1 hover:border-orange-500/70 hover:bg-orange-500 hover:text-white hover:shadow-[0_24px_80px_rgba(255,77,0,0.35)] active:scale-[0.98]"
      >
        <span class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-full"></span>
        <span class="relative flex items-center gap-2">
          <span class="text-lg leading-none">+</span>
          Add Blog
        </span>
      </button>
    </div>

    <!-- Summary Cards -->
    <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {#each summaryCards as item, index}
        <div
          class="summary-card group relative overflow-hidden rounded-[24px] border border-white/[0.075] bg-[#070A16]/80 p-[1px] shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-white/15 hover:shadow-[0_34px_110px_rgba(0,0,0,0.75)]"
          style={`--accent:${item.accent}; animation-delay:${0.1 + index * 0.07}s;`}
        >
          <div class="card-glow"></div>

          <div class="relative rounded-[23px] bg-[linear-gradient(180deg,rgba(10,13,28,0.94),rgba(3,5,13,0.96))] p-5">
            <div class="flex items-center justify-between gap-3">
              <p class="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 transition group-hover:text-[var(--accent)]">
                {item.title}
              </p>

              <div class="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-black/35 text-[var(--accent)] shadow-[0_0_18px_color-mix(in_srgb,var(--accent)_25%,transparent)] transition group-hover:rotate-6 group-hover:scale-110">
                {item.icon}
              </div>
            </div>

            <h2 class="mt-5 text-4xl font-extrabold tracking-[-0.06em] text-white">
              {item.value}
            </h2>

            <p class="mt-2 text-xs text-slate-600">
              {item.text}
            </p>
          </div>
        </div>
      {/each}
    </div>

    <!-- Category Cards -->
    <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {#each categories as category, index}
        <div
          class="category-card group relative overflow-hidden rounded-[24px] border border-white/[0.075] bg-[#070A16]/80 p-[1px] shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-white/15 hover:shadow-[0_34px_110px_rgba(0,0,0,0.75)]"
          style={`--accent:${category.accent}; animation-delay:${0.22 + index * 0.07}s;`}
        >
          <div class="card-glow"></div>

          <div class="relative rounded-[23px] bg-[linear-gradient(180deg,rgba(10,13,28,0.94),rgba(3,5,13,0.96))] p-5">
            <div class="flex items-center justify-between gap-3">
              <p class="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 transition group-hover:text-[var(--accent)]">
                {category.title}
              </p>

              <div class="flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.08] bg-black/35 text-[var(--accent)] shadow-[0_0_18px_color-mix(in_srgb,var(--accent)_25%,transparent)] transition group-hover:rotate-6 group-hover:scale-110">
                {category.icon}
              </div>
            </div>

            <h2 class="mt-5 text-4xl font-extrabold tracking-[-0.06em] text-white">
              {category.count}
            </h2>

            <p class="mt-2 text-xs text-slate-600">
              Category posts
            </p>
          </div>
        </div>
      {/each}
    </div>

    <!-- Blogs Grid -->
    <div class="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
      {#if blogs.length === 0}
        <div class="empty-card col-span-full overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#070A16]/80 p-[1px] shadow-[0_30px_100px_rgba(0,0,0,0.65)] backdrop-blur-2xl">
          <div class="rounded-[27px] bg-[linear-gradient(180deg,rgba(10,13,28,0.96),rgba(2,3,11,0.98))] p-10 text-center">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-500/25 bg-orange-500/10 text-3xl text-orange-300 shadow-[0_0_45px_rgba(255,77,0,0.18)]">
              ◈
            </div>

            <h2 class="mt-6 text-2xl font-extrabold tracking-[-0.04em] text-white">
              No blogs found
            </h2>

            <p class="mt-3 text-sm leading-7 text-slate-500">
              Click Add Blog to create your first ML Club blog post.
            </p>
          </div>
        </div>
      {/if}

      {#each blogs as blog, index}
        <div
          class="blog-card group relative overflow-hidden rounded-[30px] border border-white/[0.075] bg-[#070A16]/85 p-[1px] shadow-[0_28px_95px_rgba(0,0,0,0.60)] backdrop-blur-2xl transition duration-500 hover:-translate-y-3 hover:border-white/15 hover:shadow-[0_42px_135px_rgba(0,0,0,0.82)]"
          style={`--accent:${categoryAccents[blog.category] || "#FF4D00"}; --status:${statusAccents[blog.status] || "#FFBD2E"}; animation-delay:${0.25 + index * 0.06}s;`}
        >
          <div class="blog-aura"></div>

          <div class="relative rounded-[29px] bg-[linear-gradient(180deg,rgba(10,13,28,0.96),rgba(2,3,11,0.98))] p-4">
            <span class="corner left-4 top-4 border-l border-t"></span>
            <span class="corner right-4 top-4 border-r border-t"></span>
            <span class="corner bottom-4 left-4 border-b border-l"></span>
            <span class="corner bottom-4 right-4 border-b border-r"></span>

            <div class="relative overflow-hidden rounded-[24px] border border-white/[0.07] bg-black/35">
              <img
                src={blog.image ||
                  "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"}
                alt={blog.title}
                class="h-60 w-full object-cover transition duration-700 group-hover:scale-110 group-hover:rotate-1"
              />

              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent"></div>
              <div class="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_30%,color-mix(in_srgb,var(--accent)_22%,transparent),transparent_45%)]"></div>

              <span class="absolute left-4 top-4 rounded-full border border-white/10 bg-black/55 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--accent)] backdrop-blur-xl shadow-[0_0_28px_color-mix(in_srgb,var(--accent)_20%,transparent)]">
                {blog.category}
              </span>

              <span class="absolute right-4 top-4 rounded-full border border-white/10 bg-black/55 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--status)] backdrop-blur-xl shadow-[0_0_28px_color-mix(in_srgb,var(--status)_20%,transparent)]">
                {blog.status}
              </span>
            </div>

            <div class="px-1 pb-1 pt-5">
              <h2 class="text-2xl font-extrabold tracking-[-0.04em] text-white transition duration-300 group-hover:text-[var(--accent)]">
                {blog.title}
              </h2>

              <p class="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-600">
                By {blog.author || "ML Club"} • {blog.date || "No date"}
              </p>

              <p class="mt-4 line-clamp-3 text-sm leading-7 text-slate-500">
                {blog.description}
              </p>

              <div class="mt-6 flex items-center justify-between gap-3">
                <div class="flex items-center gap-2">
                  <span class="h-1.5 w-1.5 rounded-full bg-[var(--status)] shadow-[0_0_12px_var(--status)]"></span>
                  <span class="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-600">
                    {blog.status}
                  </span>
                </div>

                <div class="flex gap-2">
                  <button
                    type="button"
                    onclick={() => openEditModal(blog)}
                    class="action-btn border-white/10 text-slate-300 hover:border-[var(--accent)] hover:bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] hover:text-white hover:shadow-[0_15px_40px_color-mix(in_srgb,var(--accent)_18%,transparent)]"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onclick={() => openDeleteModal(blog)}
                    class="action-btn border-red-500/20 text-red-300 hover:border-red-500/50 hover:bg-red-500/15 hover:text-white hover:shadow-[0_15px_40px_rgba(239,68,68,0.18)]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Add/Edit Modal -->
{#if showModal}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 backdrop-blur-md">
    <div class="modal-card relative w-full max-w-4xl overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#050712]/95 p-[1px] shadow-[0_40px_140px_rgba(0,0,0,0.90)]">
      <div class="modal-shine"></div>

      <div class="relative rounded-[29px] bg-[linear-gradient(180deg,rgba(10,13,28,0.98),rgba(2,3,11,0.99))] p-6 sm:p-8">
        <span class="modal-corner left-5 top-5 border-l border-t"></span>
        <span class="modal-corner right-5 top-5 border-r border-t"></span>
        <span class="modal-corner bottom-5 left-5 border-b border-l"></span>
        <span class="modal-corner bottom-5 right-5 border-b border-r"></span>

        <div class="flex items-start justify-between gap-4">
          <div>
            <div class="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-orange-400">
              // Blog CMS
            </div>

            <h2 class="mt-3 text-3xl font-extrabold tracking-[-0.05em] text-white">
              {isEditing ? "Edit Blog" : "Add New Blog"}
            </h2>

            <p class="mt-2 text-sm leading-6 text-slate-500">
              Fill the blog details below. Image upload supports JPG, PNG, and WEBP.
            </p>
          </div>

          <button type="button" onclick={closeModal} class="close-btn">
            ✕
          </button>
        </div>

        <form
          method="POST"
          enctype="multipart/form-data"
          action={isEditing ? "?/updateBlog" : "?/addBlog"}
          use:enhance={handleFormSubmit}
          class="mt-6 grid gap-4 md:grid-cols-2"
        >
          {#if clientError || form?.error}
            <div class="md:col-span-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 font-mono text-xs font-semibold text-red-300 shadow-[0_0_35px_rgba(239,68,68,0.10)]">
              {clientError || form.error}
            </div>
          {/if}

          {#if isEditing}
            <input type="hidden" name="id" value={editingId} />
            <input type="hidden" name="oldImage" value={blogForm.image} />
          {/if}

          <div>
            <label class="form-label">Blog Title</label>
            <input
              name="title"
              bind:value={blogForm.title}
              type="text"
              placeholder="Enter blog title"
              required
              class="form-input"
            />
          </div>

          <div>
            <label class="form-label">Author</label>
            <input
              name="author"
              bind:value={blogForm.author}
              type="text"
              placeholder="Author name"
              class="form-input"
            />
          </div>

          <div class="md:col-span-2">
            <label class="form-label">Category</label>

            <input type="hidden" name="category" value={blogForm.category} />

            <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {#each categoryOptions as category}
                <button
                  type="button"
                  onclick={() => (blogForm.category = category)}
                  class={`category-picker group relative overflow-hidden rounded-2xl border px-4 py-3 text-left transition duration-300 ${
                    blogForm.category === category
                      ? "border-orange-500/50 bg-orange-500/12 text-white shadow-[0_18px_55px_rgba(255,77,0,0.18)]"
                      : "border-white/[0.08] bg-black/30 text-slate-400 hover:-translate-y-1 hover:border-orange-500/30 hover:bg-orange-500/[0.06] hover:text-white"
                  }`}
                >
                  <span class="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_0%,rgba(255,77,0,0.18),transparent_45%)]"></span>

                  <span class="relative flex items-center gap-3">
                    <span
                      class="flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.08] bg-black/35 text-sm shadow-[0_0_14px_currentColor]"
                      style={`color:${categoryAccents[category] || "#FF4D00"};`}
                    >
                      {categoryIcons[category] || "⬡"}
                    </span>

                    <span class="font-mono text-[10px] font-extrabold uppercase tracking-[0.13em]">
                      {category}
                    </span>
                  </span>
                </button>
              {/each}
            </div>
          </div>

          <div>
            <label class="form-label">Status</label>

            <input type="hidden" name="status" value={blogForm.status} />

            <div class="grid grid-cols-2 gap-3">
              {#each statusOptions as status}
                <button
                  type="button"
                  onclick={() => (blogForm.status = status)}
                  class={`status-picker group relative overflow-hidden rounded-2xl border px-4 py-3 text-left transition duration-300 ${
                    blogForm.status === status
                      ? "border-orange-500/50 bg-orange-500/12 text-white shadow-[0_18px_55px_rgba(255,77,0,0.18)]"
                      : "border-white/[0.08] bg-black/30 text-slate-400 hover:-translate-y-1 hover:border-orange-500/30 hover:bg-orange-500/[0.06] hover:text-white"
                  }`}
                >
                  <span class="relative flex items-center gap-3">
                    <span
                      class="h-2.5 w-2.5 rounded-full shadow-[0_0_14px_currentColor]"
                      style={`background:${statusAccents[status]}; color:${statusAccents[status]};`}
                    ></span>

                    <span class="font-mono text-[10px] font-extrabold uppercase tracking-[0.13em]">
                      {status}
                    </span>
                  </span>
                </button>
              {/each}
            </div>
          </div>

          <div>
            <label class="form-label">Date</label>
            <input
              name="date"
              bind:value={blogForm.date}
              type="date"
              class="form-input"
            />
          </div>

          <div>
            <label class="form-label">Blog Image</label>
            <input
              name="imageFile"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              required={!isEditing}
              class="form-input file:mr-4 file:rounded-xl file:border-0 file:bg-orange-500/15 file:px-4 file:py-2 file:font-mono file:text-xs file:font-bold file:text-orange-200 hover:file:bg-orange-500/25"
            />
          </div>

          <div class="md:col-span-2">
            <label class="form-label">Description</label>
            <textarea
              name="description"
              bind:value={blogForm.description}
              rows="4"
              placeholder="Write blog description"
              required
              class="form-input resize-none"
            ></textarea>
          </div>

          <div class="flex justify-end gap-3 pt-3 md:col-span-2">
            <button type="button" onclick={closeModal} class="cancel-btn">
              Cancel
            </button>

            <button type="submit" disabled={isSubmitting} class="submit-btn">
              {#if isSubmitting}
                {isEditing ? "Updating..." : "Uploading..."}
              {:else}
                {isEditing ? "Update Blog" : "Add Blog"}
              {/if}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}

<!-- Delete Modal -->
{#if showDeleteModal && deletingBlog}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 backdrop-blur-md">
    <div class="delete-card relative w-full max-w-md overflow-hidden rounded-[30px] border border-red-500/20 bg-[#050712]/95 p-[1px] shadow-[0_40px_140px_rgba(0,0,0,0.90)]">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(239,68,68,0.18),transparent_48%)]"></div>

      <div class="relative rounded-[29px] bg-[linear-gradient(180deg,rgba(20,7,10,0.96),rgba(2,3,11,0.99))] p-6">
        <div class="flex items-start justify-between gap-4">
          <div>
            <div class="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-red-300">
              // Danger Zone
            </div>

            <h2 class="mt-3 text-3xl font-extrabold tracking-[-0.05em] text-white">
              Delete Blog?
            </h2>
          </div>

          <button type="button" onclick={closeDeleteModal} class="close-btn">
            ✕
          </button>
        </div>

        <p class="mt-5 text-sm leading-7 text-slate-400">
          Are you sure you want to delete
          <span class="font-bold text-orange-300">{deletingBlog.title}</span>?
          This action cannot be undone.
        </p>

        <div class="mt-7 flex justify-end gap-3">
          <button type="button" onclick={closeDeleteModal} class="cancel-btn">
            Cancel
          </button>

          <form method="POST" action="?/deleteBlog">
            <input type="hidden" name="id" value={deletingBlog._id} />

            <button type="submit" class="delete-btn">
              Yes, Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  :global(body) {
    font-family: "Space Grotesk", system-ui, sans-serif;
    background: #02030B;
  }

  :global(.font-mono) {
    font-family: "JetBrains Mono", monospace;
  }

  .loading-grid,
  .blog-grid {
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

  .blog-grid {
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

  .page-enter {
    animation: pageEnter 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes pageEnter {
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

  .summary-card,
  .category-card,
  .blog-card,
  .empty-card {
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

  .card-glow {
    position: absolute;
    inset: -1px;
    border-radius: 24px;
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--accent) 35%, transparent),
      rgba(255, 255, 255, 0.03),
      color-mix(in srgb, var(--accent) 18%, transparent)
    );
    opacity: 0.24;
    filter: blur(18px);
    transition: opacity 0.5s ease;
  }

  .summary-card:hover .card-glow,
  .category-card:hover .card-glow {
    opacity: 0.64;
  }

  .blog-aura {
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

  .blog-card:hover .blog-aura {
    opacity: 0.68;
  }

  @keyframes rotateAura {
    to {
      transform: rotate(360deg);
    }
  }

  .corner {
    position: absolute;
    height: 18px;
    width: 18px;
    border-color: color-mix(in srgb, var(--accent) 48%, transparent);
    transition: all 0.45s ease;
  }

  .blog-card:hover .corner {
    height: 26px;
    width: 26px;
    border-color: color-mix(in srgb, var(--accent) 70%, transparent);
  }

  .action-btn {
    border-width: 1px;
    border-radius: 12px;
    padding: 0.5rem 0.75rem;
    font-family: "JetBrains Mono", monospace;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    transition: all 0.35s ease;
  }

  .modal-card,
  .delete-card {
    animation: modalEnter 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes modalEnter {
    from {
      opacity: 0;
      transform: translateY(28px) scale(0.96);
      filter: blur(12px);
    }

    to {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }

  .modal-shine {
    position: absolute;
    inset: -90%;
    background: conic-gradient(
      from 180deg,
      transparent,
      rgba(255, 77, 0, 0.16),
      transparent,
      rgba(0, 255, 209, 0.10),
      transparent
    );
    animation: rotateAura 14s linear infinite;
    opacity: 0.42;
  }

  .modal-corner {
    position: absolute;
    height: 20px;
    width: 20px;
    border-color: rgba(255, 77, 0, 0.48);
  }

  .close-btn {
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.04);
    padding: 0.65rem 0.9rem;
    color: rgb(148 163 184);
    transition: all 0.35s ease;
  }

  .close-btn:hover {
    transform: rotate(90deg) scale(1.05);
    border-color: rgba(255, 77, 0, 0.45);
    background: rgba(255, 77, 0, 0.10);
    color: white;
  }

  .form-label {
    margin-bottom: 0.5rem;
    display: block;
    font-family: "JetBrains Mono", monospace;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.18em;
    color: rgb(100 116 139);
    text-transform: uppercase;
  }

  .form-input {
    width: 100%;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.075);
    background: rgba(0, 0, 0, 0.35);
    padding: 0.9rem 1rem;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.85rem;
    color: white;
    outline: none;
    transition: all 0.4s ease;
  }

  .form-input::placeholder {
    color: rgb(71 85 105);
  }

  .form-input:focus {
    border-color: rgba(255, 77, 0, 0.55);
    background: rgba(255, 77, 0, 0.035);
    box-shadow: 0 0 0 2px rgba(255, 77, 0, 0.08),
      0 18px 45px rgba(255, 77, 0, 0.08);
  }

  .category-picker,
  .status-picker {
    isolation: isolate;
  }

  .cancel-btn,
  .submit-btn,
  .delete-btn {
    border-radius: 16px;
    padding: 0.9rem 1.25rem;
    font-family: "JetBrains Mono", monospace;
    font-size: 11px;
    font-weight: 900;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    transition: all 0.35s ease;
  }

  .cancel-btn {
    border: 1px solid rgba(255, 255, 255, 0.09);
    background: rgba(255, 255, 255, 0.035);
    color: rgb(203 213 225);
  }

  .cancel-btn:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.18);
    background: rgba(255, 255, 255, 0.07);
    color: white;
  }

  .submit-btn {
    border: 1px solid rgba(255, 77, 0, 0.45);
    background: rgba(255, 77, 0, 0.15);
    color: rgb(254 215 170);
    box-shadow: 0 15px 45px rgba(255, 77, 0, 0.14);
  }

  .submit-btn:hover {
    transform: translateY(-2px);
    background: rgb(249 115 22);
    color: white;
    box-shadow: 0 22px 70px rgba(255, 77, 0, 0.34);
  }

  .submit-btn:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
  }

  .delete-btn {
    border: 1px solid rgba(239, 68, 68, 0.45);
    background: rgba(239, 68, 68, 0.16);
    color: rgb(252 165 165);
    box-shadow: 0 15px 45px rgba(239, 68, 68, 0.12);
  }
@media (max-width: 768px) {
  .floating-blob,
  .pulse-core,
  .neural-dot,
  .action-aura,
  .project-aura,
  .blog-aura,
  .modal-shine,
  .scan-layer {
    display: none !important;
  }

  .dashboard-grid,
  .project-grid,
  .blog-grid,
  .member-grid,
  .loading-grid {
    animation: none !important;
    opacity: 0.22;
  }

  .stat-card,
  .action-card,
  .project-card,
  .blog-card,
  .member-card,
  .category-card,
  .summary-card {
    animation: none !important;
  }

  .stat-card:hover,
  .action-card:hover,
  .project-card:hover,
  .blog-card:hover,
  .member-card:hover,
  .category-card:hover,
  .summary-card:hover {
    transform: none !important;
  }

  .group:hover img {
    transform: none !important;
  }
}

  .delete-btn:hover {
    transform: translateY(-2px);
    background: rgb(239 68 68);
    color: white;
    box-shadow: 0 22px 70px rgba(239, 68, 68, 0.32);
  }

  @media (max-width: 768px) {
    .blog-card img {
      height: 15rem;
    }

    .modal-card {
      max-height: 92vh;
      overflow-y: auto;
    }
  }
</style>
