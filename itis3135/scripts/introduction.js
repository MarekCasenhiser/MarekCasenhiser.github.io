// ============================================================
//  introduction.js  —  Form behavior for intro_form.html
// ============================================================

// ------------------------------------------------------------------
// 1. Prevent default form submission (no page refresh)
// ------------------------------------------------------------------
const formElement = document.getElementById("introForm");
formElement.addEventListener("submit", (e) => e.preventDefault()); // prevents page refresh / default behavior

// ------------------------------------------------------------------
// 2. Validate required fields before submission
// ------------------------------------------------------------------
function validateForm() {
  const firstName = formElement.querySelector("input[name='firstName']");
  const lastName  = formElement.querySelector("input[name='lastName']");
  let isValid = true;

  // Remove any existing error highlights
  formElement.querySelectorAll(".field-error").forEach((el) => el.remove());
  formElement.querySelectorAll(".input-error").forEach((el) =>
    el.classList.remove("input-error")
  );

  function markError(inputEl, message) {
    inputEl.classList.add("input-error");
    inputEl.style.borderColor = "#e63946";
    inputEl.style.boxShadow = "0 0 0 3px rgba(230,57,70,0.2)";
    const errMsg = document.createElement("small");
    errMsg.className = "field-error";
    errMsg.style.cssText = "color:#e63946; font-size:0.75rem; display:block; margin-top:0.25rem;";
    errMsg.textContent = message;
    inputEl.insertAdjacentElement("afterend", errMsg);
    isValid = false;
  }

  if (!firstName.value.trim()) {
    markError(firstName, "⚠ First Name is required.");
  }
  if (!lastName.value.trim()) {
    markError(lastName, "⚠ Last Name is required.");
  }

  if (isValid) {
    // Gather data for demonstration
    const formData = new FormData(formElement);
    console.log("=== Form Submission Data ===");
    for (let [key, value] of formData.entries()) {
      if (key !== "picture") console.log(`${key}: ${value}`);
      else console.log(`${key}: file selected — ${value ? value.name : "none"}`);
    }
    alert("✅ Thank you! Your introduction has been submitted (demo).\nCheck the browser console for all field values.");
  }

  return isValid;
}

// Wire validate to submit event
formElement.addEventListener("submit", validateForm);

// ------------------------------------------------------------------
// 3. Reset — restore form to its original pre-filled state
// ------------------------------------------------------------------
function resetForm() {
  // Native reset restores all inputs to their original HTML value attributes
  formElement.reset();

  // Also restore the picture preview to the default avatar
  const defaultPreviewImg = document.getElementById("defaultPreview");
  const uploadPreviewImg  = document.getElementById("uploadPreview");
  if (defaultPreviewImg && uploadPreviewImg) {
    defaultPreviewImg.style.display = "inline-block";
    uploadPreviewImg.style.display  = "none";
    uploadPreviewImg.src            = "";
  }

  // Remove any validation error markers
  formElement.querySelectorAll(".field-error").forEach((el) => el.remove());
  formElement.querySelectorAll(".input-error").forEach((el) => {
    el.classList.remove("input-error");
    el.style.borderColor = "";
    el.style.boxShadow   = "";
  });
}

// Wire reset to the Reset button (type="reset")
const resetButton = document.querySelector("button[type='reset']");
if (resetButton) {
  resetButton.addEventListener("click", (e) => {
    e.preventDefault(); // prevent native reset so we can control it
    resetForm();
  });
}

// ------------------------------------------------------------------
// 4. Clear — wipe every field to blank so placeholders show
// ------------------------------------------------------------------
function clearForm() {
  const allFields = formElement.querySelectorAll("input, textarea");
  allFields.forEach((field) => {
    if (field.type === "submit" || field.type === "button") return;
    if (field.type === "file") {
      field.value = "";
      const defaultPreviewImg = document.getElementById("defaultPreview");
      const uploadPreviewImg  = document.getElementById("uploadPreview");
      if (defaultPreviewImg && uploadPreviewImg) {
        defaultPreviewImg.style.display = "inline-block";
        uploadPreviewImg.style.display  = "none";
        uploadPreviewImg.src            = "";
      }
    } else if (field.type === "checkbox") {
      field.checked = false;
    } else {
      field.value = "";
    }
  });

  // Remove any dynamically added course rows
  document
    .querySelectorAll(".dynamic-course-row")
    .forEach((row) => row.remove());

  // Remove validation error markers
  formElement.querySelectorAll(".field-error").forEach((el) => el.remove());
  formElement.querySelectorAll(".input-error").forEach((el) => {
    el.classList.remove("input-error");
    el.style.borderColor = "";
    el.style.boxShadow   = "";
  });
}

// Wire clear to the Clear button (type="button")
const clearButton = document.querySelector("button[type='button']");
const inputElements = Array.from(document.querySelectorAll("form input"));
if (clearButton) {
  clearButton.addEventListener("click", function () {
    clearForm();
  });
}

// ------------------------------------------------------------------
// 5. Add a new course text-box row (with delete button)
// ------------------------------------------------------------------
function addCourseRow() {
  const courseContainer = document.querySelector(
    ".field-group .sub-bullet-group"
  );
  if (!courseContainer) return;

  // Wrapper for the entire new course entry
  const newRow = document.createElement("div");
  newRow.className = "dynamic-course-row";
  newRow.style.cssText =
    "margin-top: 1rem; padding-top: 1rem; border-top: 1px dashed #bdd4e7; position: relative;";

  newRow.innerHTML = `
    <div class="row-2cols">
      <div><input type="text" name="courseDept[]"   placeholder="Department (e.g., CSCI, MATH)"></div>
      <div><input type="text" name="courseNumber[]" placeholder="Course Number"></div>
    </div>
    <div style="margin-top: 10px;">
      <input type="text" name="courseName[]" placeholder="Course Name">
    </div>
    <div style="margin-top: 10px;">
      <textarea name="courseReason[]" rows="2" placeholder="Reason for taking this course..."></textarea>
    </div>
  `;

  // Append the delete button via the dedicated function
  addDeleteButton(newRow);

  courseContainer.appendChild(newRow);
}

// ------------------------------------------------------------------
// 6. Add a delete button beside (inside) a course row
// ------------------------------------------------------------------
function addDeleteButton(courseRowElement) {
  const deleteBtn = document.createElement("button");
  deleteBtn.type      = "button";
  deleteBtn.textContent = "🗑 Remove";
  deleteBtn.style.cssText =
    "margin-top: 0.5rem; background: #e63946; color: white; border: none; " +
    "padding: 0.4rem 1rem; font-size: 0.85rem; border-radius: 2rem; " +
    "cursor: pointer; width: auto; max-width: 120px; box-shadow: none;";

  deleteBtn.addEventListener("mouseover", () => {
    deleteBtn.style.background = "#b5202c";
  });
  deleteBtn.addEventListener("mouseout", () => {
    deleteBtn.style.background = "#e63946";
  });

  deleteBtn.addEventListener("click", function () {
    courseRowElement.remove();
  });

  courseRowElement.appendChild(deleteBtn);
}

// Wire "Add Course" button if present, otherwise inject it
document.addEventListener("DOMContentLoaded", () => {
  const subBulletGroup = document.querySelector(".sub-bullet-group");
  if (!subBulletGroup) return;

  // Only add the "+ Add Course" button if it doesn't already exist
  if (!document.getElementById("addCourseBtn")) {
    const addBtn = document.createElement("button");
    addBtn.id        = "addCourseBtn";
    addBtn.type      = "button";
    addBtn.textContent = "+ Add Course";
    addBtn.style.cssText =
      "margin-top: 0.75rem; background: #2a7d4f; color: white; border: none; " +
      "padding: 0.5rem 1.2rem; font-size: 0.9rem; border-radius: 2rem; " +
      "cursor: pointer; width: auto; max-width: 160px; box-shadow: none;";

    addBtn.addEventListener("mouseover", () => {
      addBtn.style.background = "#1d5e39";
    });
    addBtn.addEventListener("mouseout", () => {
      addBtn.style.background = "#2a7d4f";
    });

    addBtn.addEventListener("click", addCourseRow);

    // Insert the button right after the sub-bullet group
    subBulletGroup.insertAdjacentElement("afterend", addBtn);
  }
});
