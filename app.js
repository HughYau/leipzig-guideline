const manual = window.MANUAL_CONTENT;

const state = {
  sections: manual?.sections || [],
  activeId: "",
  sectionToChapter: new Map(),
};

const contentEl = document.querySelector("#content");
const tocEl = document.querySelector("#toc");
const searchInput = document.querySelector("#searchInput");
const searchResults = document.querySelector("#searchResults");
const resultList = document.querySelector("#resultList");
const sidebar = document.querySelector("#sidebar");
const menuButton = document.querySelector("#menuButton");
const closeMenuButton = document.querySelector("#closeMenuButton");
const backTop = document.querySelector("#backTop");

init();

function init() {
  if (!manual || !state.sections.length) {
    contentEl.innerHTML = `<p class="editor-note">手册内容载入失败。请确认 manual-content.js 已生成。</p>`;
    return;
  }

  renderMeta(manual.meta);
  renderToc(state.sections);
  renderContent(state.sections);
  setupSearch();
  setupNavigation();
  setupActiveSectionObserver();
}

function renderMeta(meta) {
  document.title = `${meta.title} ${meta.edition}`;
  document.querySelector(".brand span").textContent = meta.title;
  document.querySelector(".cover h1").textContent = meta.title;
  document.querySelector(".edition").textContent = meta.edition;
  document.querySelector(".publisher").textContent = meta.publisher;
  document.querySelector(".notice").textContent = `${meta.updatedLabel}。${meta.disclaimer}`;
}

function renderToc(sections) {
  const groups = groupSections(sections);
  state.sectionToChapter = new Map();
  groups.forEach((group) => {
    state.sectionToChapter.set(group.chapter.id, group.chapter.id);
    group.children.forEach((item) => {
      state.sectionToChapter.set(item.section.id, group.chapter.id);
      item.children.forEach((child) => state.sectionToChapter.set(child.id, group.chapter.id));
    });
  });

  tocEl.innerHTML = [
    `<a class="level-1 toc-home" href="#cover">首页</a>`,
    ...groups.map(
      ({ chapter, children }) => `
        <div class="toc-group" data-chapter="${chapter.id}">
          <a class="level-1 toc-chapter" href="#${chapter.id}" data-section="${chapter.id}">
            <span>${escapeHtml(chapter.title)}</span>
            <span class="toc-caret" aria-hidden="true">›</span>
          </a>
          <div class="toc-children">
            ${children
              .map(({ section, children: nested }) => {
                const nestedLinks = nested
                  .map(
                    (child) =>
                      `<a class="level-3" href="#${child.id}" data-section="${child.id}">${escapeHtml(child.title)}</a>`,
                  )
                  .join("");
                return `
                  <div class="toc-subgroup">
                    <a class="level-2" href="#${section.id}" data-section="${section.id}">${escapeHtml(section.title)}</a>
                    ${nestedLinks ? `<div class="toc-grandchildren">${nestedLinks}</div>` : ""}
                  </div>
                `;
              })
              .join("")}
          </div>
        </div>
      `,
    ),
  ].join("");

  const initialId = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  if (initialId) expandTocForSection(initialId);
}

function groupSections(sections) {
  const groups = [];
  let current = null;
  let currentSecondLevel = null;
  sections.forEach((section) => {
    if (section.level === 1) {
      current = { chapter: section, children: [] };
      currentSecondLevel = null;
      groups.push(current);
      return;
    }
    if (!current) return;
    if (section.level === 2) {
      currentSecondLevel = { section, children: [] };
      current.children.push(currentSecondLevel);
      return;
    }
    if (currentSecondLevel) {
      currentSecondLevel.children.push(section);
      return;
    }
    current.children.push({ section, children: [] });
  });
  return groups;
}

function renderContent(sections) {
  contentEl.innerHTML = sections.map(renderSection).join("");
}

function renderSection(section) {
  const headingTag = section.level === 1 ? "h2" : section.level === 2 ? "h3" : "h4";
  return `
    <section id="${section.id}" data-title="${escapeHtml(section.title)}">
      <${headingTag}>${escapeHtml(section.title)}</${headingTag}>
      ${section.blocks.map(renderBlock).join("")}
    </section>
  `;
}

function renderBlock(block) {
  switch (block.type) {
    case "paragraph":
      return `<p>${inlineText(block.text)}</p>`;
    case "list":
      return `<ul>${block.items.map((item) => `<li>${inlineText(item)}</li>`).join("")}</ul>`;
    case "table":
      return `<div class="table-wrap">${block.html}</div>`;
    case "visual":
      return `
        <figure class="chapter-visual">
          <img src="${block.src}" alt="${escapeHtml(block.alt)}" />
          <figcaption>
            <span>${escapeHtml(block.caption)}</span>
            <a href="${block.creditUrl}" target="_blank" rel="noreferrer">${escapeHtml(block.credit)}</a>
          </figcaption>
        </figure>
      `;
    case "keypoints":
      return renderCardBlock("keypoints", block);
    case "overview":
      return renderCardBlock("overview", block);
    default:
      return "";
  }
}

function renderCardBlock(className, block) {
  return `
    <aside class="content-card ${className}">
      <div class="content-card-title">${escapeHtml(block.title)}</div>
      <ul>${block.items.map((item) => `<li>${inlineText(item)}</li>`).join("")}</ul>
    </aside>
  `;
}

function inlineText(text) {
  const tokens = [];
  let escaped = escapeHtml(text);
  escaped = escaped.replace(/(https?:\/\/[^\s<]+)/g, (url) => {
    const cleanUrl = url.replace(/[),.;，。；）]+$/, "");
    const suffix = url.slice(cleanUrl.length);
    const token = `__LINK_${tokens.length}__`;
    tokens.push(`<a href="${cleanUrl}" target="_blank" rel="noreferrer">${cleanUrl}</a>${escapeHtml(suffix)}`);
    return token;
  });
  escaped = emphasizeTerms(escaped);
  tokens.forEach((link, index) => {
    escaped = escaped.replace(`__LINK_${index}__`, link);
  });
  return escaped;
}

function emphasizeTerms(html) {
  const strongPatterns = [
    /§\s*16b\s+AufenthG/gi,
    /\b16B\b/g,
    /140\s*个全天/g,
    /280\s*个半天/g,
    /11,904\s*欧(?:元|\/年)?/g,
    /992\s*欧(?:元|\/月)?/g,
    /18\.36\s*欧/g,
    /55\.08\s*欧/g,
    /226\.80\s*欧/g,
    /63\s*欧\/月/g,
    /112/g,
    /116\s*117/g,
  ];
  const termPatterns = [
    /Ausländerbehörde/g,
    /Bürgerbüro/g,
    /Bürgeramt/g,
    /Sperrkonto/g,
    /Immatrikulationsbescheinigung/g,
    /Rundfunkbeitrag/g,
    /Deutschland-Semesterticket/g,
    /Deutschlandticket/g,
    /Rückmeldung/g,
    /Girokonto/g,
    /Anmeldung/g,
    /Krankenkasse/g,
  ];

  let result = html;
  strongPatterns.forEach((pattern) => {
    result = result.replace(pattern, (match) => `<strong>${match}</strong>`);
  });
  termPatterns.forEach((pattern) => {
    result = result.replace(pattern, (match) => `<em>${match}</em>`);
  });
  return result;
}

function setupSearch() {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      searchResults.hidden = true;
      resultList.innerHTML = "";
      return;
    }

    const results = state.sections
      .map((section) => ({
        section,
        haystack: `${section.title} ${section.text}`.toLowerCase(),
      }))
      .filter((item) => item.haystack.includes(query))
      .slice(0, 12);

    searchResults.hidden = false;
    if (!results.length) {
      resultList.innerHTML = `<p class="result-snippet">没有找到匹配内容。</p>`;
      return;
    }

    resultList.innerHTML = results
      .map(({ section }) => {
        const snippet = makeSnippet(section.text, query);
        return `
          <a class="result-item" href="#${section.id}">
            <span class="result-title">${escapeHtml(section.title)}</span>
            <span class="result-snippet">${escapeHtml(snippet)}</span>
          </a>
        `;
      })
      .join("");
  });
}

function makeSnippet(text, query) {
  const normalized = text.replace(/\s+/g, " ");
  const index = normalized.toLowerCase().indexOf(query);
  if (index < 0) return normalized.slice(0, 110);
  const start = Math.max(0, index - 42);
  const end = Math.min(normalized.length, index + 90);
  return `${start ? "..." : ""}${normalized.slice(start, end)}${end < normalized.length ? "..." : ""}`;
}

function setupNavigation() {
  tocEl.addEventListener("click", (event) => {
    const sectionLink = event.target.closest("a[data-section]");
    if (!sectionLink) return;
    expandTocForSection(sectionLink.dataset.section);
  });

  menuButton.addEventListener("click", () => {
    const open = !document.body.classList.contains("menu-open");
    document.body.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
  });

  closeMenuButton.addEventListener("click", closeMenu);
  sidebar.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    backTop.classList.toggle("visible", window.scrollY > 700);
  });
}

function closeMenu() {
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
}

function setupActiveSectionObserver() {
  const links = [...tocEl.querySelectorAll("a[data-section]")];
  const byId = new Map(links.map((link) => [link.dataset.section, link]));
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const id = visible.target.id;
      if (state.activeId === id) return;
      state.activeId = id;
      links.forEach((link) => link.classList.toggle("active", link === byId.get(id)));
      expandTocForSection(id);
    },
    { rootMargin: "-20% 0px -65% 0px", threshold: [0.1, 0.4, 0.8] },
  );

  document.querySelectorAll(".content section").forEach((section) => observer.observe(section));
}

function expandTocForSection(sectionId) {
  const chapterId = state.sectionToChapter.get(sectionId);
  if (!chapterId) return;
  tocEl.querySelectorAll(".toc-group").forEach((group) => {
    group.classList.toggle("expanded", group.dataset.chapter === chapterId);
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
