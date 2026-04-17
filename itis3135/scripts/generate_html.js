// ============================================================
//  generate_html.js  —  Collects form data and renders a
//  syntax-highlighted HTML output block in place of the form.
// ============================================================

(function () {

  // ------------------------------------------------------------------
  // Helper: collect every named field from the form into a plain object
  // ------------------------------------------------------------------
  function collectFormData(formEl) {
    const d = {};
    const fd = new FormData(formEl);

    // Single-value fields
    const singles = [
      "firstName","middleName","preferredName","lastName",
      "acknowledgmentStatement","acknowledgementDate",
      "mascotAdjective","mascotAnimal","divider",
      "pictureCaption","personalStatement","mainBullets",
      "courseDept","courseNumber","courseName","courseReason",
      "quote","quoteAuthor","funnyThing","shareSomething",
      "link1","link2","link3","link4","link5"
    ];
    singles.forEach(k => { d[k] = fd.get(k) || ""; });

    // Dynamic course rows added by introduction.js
    d.extraCourses = [];
    const depts    = fd.getAll("courseDept[]");
    const numbers  = fd.getAll("courseNumber[]");
    const names    = fd.getAll("courseName[]");
    const reasons  = fd.getAll("courseReason[]");
    for (let i = 0; i < depts.length; i++) {
      d.extraCourses.push({
        dept: depts[i] || "", number: numbers[i] || "",
        name: names[i] || "", reason: reasons[i] || ""
      });
    }

    return d;
  }

  // ------------------------------------------------------------------
  // Helper: escape a value so it is safe inside an HTML attribute or
  // text node in the generated source snippet
  // ------------------------------------------------------------------
  function esc(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // ------------------------------------------------------------------
  // Build the HTML source string from the collected data
  // ------------------------------------------------------------------
  function buildHTML(d) {
    // Render bullet lines from the freeform textarea
    const bulletLines = d.mainBullets
      .split("\n")
      .filter(l => l.trim())
      .map(l => `        <li>${esc(l.replace(/^•\s*/, ""))}</li>`)
      .join("\n");

    // Render all link entries that have a value
    const links = [d.link1, d.link2, d.link3, d.link4, d.link5]
      .filter(Boolean)
      .map(l => `        <li><a href="${esc(l)}">${esc(l)}</a></li>`)
      .join("\n");

    // Build extra course blocks
    const extraCourseBlocks = d.extraCourses
      .filter(c => c.dept || c.name)
      .map(c => `
      <div class="course">
        <p><strong>${esc(c.dept)} ${esc(c.number)}</strong> — ${esc(c.name)}</p>
        <p>${esc(c.reason)}</p>
      </div>`)
      .join("");

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(d.firstName)} ${esc(d.lastName)} — Introduction</title>
  <style>
    body { font-family: 'Segoe UI', sans-serif; max-width: 800px; margin: 2rem auto; padding: 1.5rem; color: #1a2c3e; }
    h1   { color: #1e3a5f; border-bottom: 3px solid #ffb347; padding-bottom: 0.5rem; }
    h2   { color: #1e5f8e; margin-top: 1.8rem; }
    blockquote { border-left: 4px solid #ffb347; padding-left: 1rem; color: #555; font-style: italic; }
    .course { background: #f0f6fc; border-radius: 0.75rem; padding: 1rem; margin-top: 0.75rem; }
    ul { padding-left: 1.4rem; }
    a  { color: #1e5f8e; }
  </style>
</head>
<body>

  <h1>
    ${esc(d.mascotAdjective)} ${esc(d.mascotAnimal)}
    ${esc(d.divider)}
    ${esc(d.firstName)}${d.middleName ? " " + esc(d.middleName) : ""}
    ${d.preferredName ? '("' + esc(d.preferredName) + '")' : ""}
    ${esc(d.lastName)}
  </h1>

  <img src="avatar_placeholder.png" alt="${esc(d.pictureCaption)}" width="80" style="border-radius:50%;">
  <p><em>${esc(d.pictureCaption)}</em></p>

  <h2>Personal Statement</h2>
  <p>${esc(d.personalStatement)}</p>

  <h2>About Me</h2>
  <ul>
${bulletLines}
  </ul>

  <h2>Course Details</h2>
  <div class="course">
    <p><strong>${esc(d.courseDept)} ${esc(d.courseNumber)}</strong> — ${esc(d.courseName)}</p>
    <p>${esc(d.courseReason)}</p>
  </div>${extraCourseBlocks}

  <h2>Favorite Quote</h2>
  <blockquote>
    <p>${esc(d.quote)}</p>
    <footer>— ${esc(d.quoteAuthor)}</footer>
  </blockquote>

${d.funnyThing ? `  <h2>Fun Fact</h2>\n  <p>${esc(d.funnyThing)}</p>\n` : ""}
${d.shareSomething ? `  <h2>Something I'd Like to Share</h2>\n  <p>${esc(d.shareSomething)}</p>\n` : ""}

  <h2>Links</h2>
  <ul>
${links}
  </ul>

  <hr>
  <p><small>${esc(d.acknowledgmentStatement)}<br>Date: ${esc(d.acknowledgementDate)}</small></p>

</body>
</html>`;
  }

  // ------------------------------------------------------------------
  // Render: replace the form card with a highlighted code block
  // ------------------------------------------------------------------
  function renderOutput(htmlSource) {
    const container = document.querySelector(".form-container");
    if (!container) return;

    container.innerHTML = `
      <div class="form-header">
        <h3>🖥️ Generated HTML</h3>
        <p>Copy the markup below and save it as an <code>.html</code> file.</p>
      </div>
      <div id="output-toolbar" style="
        display:flex; gap:0.75rem; flex-wrap:wrap;
        padding:1rem 2rem 0; justify-content:flex-end;">
        <button id="copyHtmlBtn"  style="max-width:160px;">📋 Copy HTML</button>
        <button id="backToFormHtmlBtn" class="reset-btn" style="max-width:160px;">↩ Back to Form</button>
      </div>
      <div style="padding:1.5rem 2rem 2rem; overflow:auto;">
        <pre style="margin:0; border-radius:1rem; overflow:auto;"><code id="htmlCodeBlock" class="language-html"></code></pre>
      </div>`;

    // Inject highlight.js from CDN if not already present
    loadHighlightJS(() => {
      const codeEl = document.getElementById("htmlCodeBlock");
      codeEl.textContent = htmlSource;          // safe assignment — hljs escapes internally
      hljs.highlightElement(codeEl);
    });

    document.getElementById("copyHtmlBtn").addEventListener("click", () => {
      navigator.clipboard.writeText(htmlSource)
        .then(() => alert("✅ HTML copied to clipboard!"))
        .catch(() => alert("⚠ Copy failed — please select and copy manually."));
    });

    document.getElementById("backToFormHtmlBtn").addEventListener("click", () => {
      location.reload();
    });
  }

  // ------------------------------------------------------------------
  // Lazy-load highlight.js + a theme from the official CDN
  // ------------------------------------------------------------------
  function loadHighlightJS(callback) {
    if (window.hljs) { callback(); return; }

    // Theme stylesheet
    const link  = document.createElement("link");
    link.rel    = "stylesheet";
    link.href   = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css";
    document.head.appendChild(link);

    // Core script
    const script  = document.createElement("script");
    script.src    = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js";
    script.onload = callback;
    document.head.appendChild(script);
  }

  // ------------------------------------------------------------------
  // Wire up the "Generate HTML" button once the DOM is ready
  // ------------------------------------------------------------------
  function init() {
    const formEl = document.getElementById("introForm");
    if (!formEl) return;

    const btn = document.createElement("button");
    btn.id          = "generateHtmlBtn";
    btn.type        = "button";
    btn.textContent = "🖥️ Generate HTML";
    btn.style.cssText = "background:#2a7d4f;";   // green accent to distinguish it

    btn.addEventListener("click", () => {
      const data = collectFormData(formEl);
      const html = buildHTML(data);
      renderOutput(html);
    });

    const buttonGroup = formEl.querySelector(".button-group");
    if (buttonGroup) buttonGroup.appendChild(btn);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
