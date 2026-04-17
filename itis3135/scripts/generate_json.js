// ============================================================
//  generate_json.js  —  Collects form data and renders a
//  syntax-highlighted JSON output block in place of the form.
// ============================================================

(function () {

  // ------------------------------------------------------------------
  // Helper: collect every named field from the form into a plain object
  // ------------------------------------------------------------------
  function collectFormData(formEl) {
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
    const data = {};
    singles.forEach(k => { data[k] = fd.get(k) || ""; });

    // Parse the freeform bullet textarea into an array
    data.mainBulletsArray = data.mainBullets
      .split("\n")
      .map(l => l.replace(/^•\s*/, "").trim())
      .filter(Boolean);

    // Collect the 5 link fields into a tidy array
    data.links = [data.link1, data.link2, data.link3, data.link4, data.link5]
      .filter(Boolean);

    // Remove the redundant flat link keys from the root
    ["link1","link2","link3","link4","link5"].forEach(k => delete data[k]);

    // Dynamic course rows added by introduction.js
    const depts   = fd.getAll("courseDept[]");
    const numbers = fd.getAll("courseNumber[]");
    const names   = fd.getAll("courseName[]");
    const reasons = fd.getAll("courseReason[]");

    // First (static) course + any dynamically added extras
    const courses = [{
      department: data.courseDept,
      number:     data.courseNumber,
      name:       data.courseName,
      reason:     data.courseReason
    }];
    for (let i = 0; i < depts.length; i++) {
      courses.push({
        department: depts[i]   || "",
        number:     numbers[i] || "",
        name:       names[i]   || "",
        reason:     reasons[i] || ""
      });
    }
    data.courses = courses;

    // Remove the flat course keys now that they live in the array
    ["courseDept","courseNumber","courseName","courseReason"].forEach(k => delete data[k]);

    return data;
  }

  // ------------------------------------------------------------------
  // Render: replace the form card with a highlighted JSON block
  // ------------------------------------------------------------------
  function renderOutput(jsonSource) {
    const container = document.querySelector(".form-container");
    if (!container) return;

    container.innerHTML = `
      <div class="form-header">
        <h3>📄 Generated JSON</h3>
        <p>Copy the data below or save it as a <code>.json</code> file.</p>
      </div>
      <div id="output-toolbar" style="
        display:flex; gap:0.75rem; flex-wrap:wrap;
        padding:1rem 2rem 0; justify-content:flex-end;">
        <button id="copyJsonBtn"      style="max-width:160px;">📋 Copy JSON</button>
        <button id="downloadJsonBtn"  style="max-width:180px; background:#2a7d4f;">💾 Download .json</button>
        <button id="backToFormJsonBtn" class="reset-btn" style="max-width:160px;">↩ Back to Form</button>
      </div>
      <div style="padding:1.5rem 2rem 2rem; overflow:auto;">
        <pre style="margin:0; border-radius:1rem; overflow:auto;"><code id="jsonCodeBlock" class="language-json"></code></pre>
      </div>`;

    // Inject highlight.js from CDN if not already present
    loadHighlightJS(() => {
      const codeEl = document.getElementById("jsonCodeBlock");
      codeEl.textContent = jsonSource;       // safe assignment — hljs escapes internally
      hljs.highlightElement(codeEl);
    });

    document.getElementById("copyJsonBtn").addEventListener("click", () => {
      navigator.clipboard.writeText(jsonSource)
        .then(() => alert("✅ JSON copied to clipboard!"))
        .catch(() => alert("⚠ Copy failed — please select and copy manually."));
    });

    document.getElementById("downloadJsonBtn").addEventListener("click", () => {
      const blob = new Blob([jsonSource], { type: "application/json" });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = "introduction.json";
      a.click();
      URL.revokeObjectURL(url);
    });

    document.getElementById("backToFormJsonBtn").addEventListener("click", () => {
      location.reload();
    });
  }

  // ------------------------------------------------------------------
  // Lazy-load highlight.js + a theme from the official CDN
  // ------------------------------------------------------------------
  function loadHighlightJS(callback) {
    if (window.hljs) { callback(); return; }

    // Theme stylesheet (matches the one used by generate_html.js)
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
  // Wire up the "Generate JSON" button once the DOM is ready
  // ------------------------------------------------------------------
  function init() {
    const formEl = document.getElementById("introForm");
    if (!formEl) return;

    const btn = document.createElement("button");
    btn.id          = "generateJsonBtn";
    btn.type        = "button";
    btn.textContent = "📄 Generate JSON";
    btn.style.cssText = "background:#7b3fa0;";   // purple accent to distinguish it

    btn.addEventListener("click", () => {
      const data = collectFormData(formEl);
      const json = JSON.stringify(data, null, 2);
      renderOutput(json);
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
