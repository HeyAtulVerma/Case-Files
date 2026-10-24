const cases = [
  {
    id: "101",
    title: "The Missing Laptop",
    description: "A laptop disappeared from the college computer laboratory.",
    status: "Open",
    suspects: ["Ava Brooks", "Leo Martin"],
  },
  {
    id: "102",
    title: "The Library Mystery",
    description: "A valuable book went missing from the college library.",
    status: "Investigating",
    suspects: ["Nia Patel", "Caleb Reed"],
  },
  {
    id: "103",
    title: "The Disappearing Trophy",
    description:
      "The annual sports trophy disappeared before the award ceremony.",
    status: "Solved",
    suspects: ["Sara Cole", "Owen Price"],
  },
];

const suspects = [
  {
    caseId: "101",
    name: "Ava Brooks",
    role: "Student Lab Assistant",
    alibi: "She says she was helping another student in the hallway.",
  },
  {
    caseId: "101",
    name: "Leo Martin",
    role: "Computer Science Student",
    alibi: "He claims he was in the study room the whole afternoon.",
  },
  {
    caseId: "102",
    name: "Nia Patel",
    role: "Library Assistant",
    alibi: "She says she was cataloging returned books at the desk.",
  },
  {
    caseId: "102",
    name: "Caleb Reed",
    role: "History Student",
    alibi: "He reports he left the library after the last bell.",
  },
  {
    caseId: "103",
    name: "Sara Cole",
    role: "Athletics Coordinator",
    alibi: "She claims she was preparing the award list in the office.",
  },
  {
    caseId: "103",
    name: "Owen Price",
    role: "Team Captain",
    alibi: "He says he was at practice and never left the field.",
  },
];

const overviewCases = document.getElementById("overview-cases");
const casesList = document.getElementById("cases-list");
const suspectsList = document.getElementById("suspects-list");
const searchInput = document.getElementById("search-input");
const statusFilter = document.getElementById("status-filter");
const detailContent = document.getElementById("case-detail-content");
const totalCasesEl = document.getElementById("total-cases");
const openCasesEl = document.getElementById("open-cases");

function renderOverview() {
  totalCasesEl.textContent = cases.length;
  openCasesEl.textContent = cases.filter(
    (item) => item.status === "Open",
  ).length;

  overviewCases.innerHTML = cases
    .map(
      (caseItem, index) => `
        <div class="case-card">
          <div class="case-meta">
            <span class="case-id">CASE #${caseItem.id}</span>
            <span class="case-status status-${caseItem.status.toLowerCase()}">${caseItem.status}</span>
          </div>
          <h3>${caseItem.title}</h3>
          <div class="case-description">${caseItem.description}</div>
          <button type="button" data-case-id="${index}">View Details</button>
        </div>
      `,
    )
    .join("");
}

function renderCaseCards() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedStatus = statusFilter.value;

  const filtered = cases.filter((caseItem) => {
    const matchesSearch = caseItem.title.includes(searchTerm);
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "Investigating"
        ? caseItem.status === "Open"
        : caseItem.status === selectedStatus);
    return matchesSearch && matchesStatus;
  });

  if (!filtered.length) {
    casesList.innerHTML = "<p>No cases match your search.</p>";
    return;
  }

  casesList.innerHTML = filtered
    .map(
      (caseItem, index) => `
        <article class="case-card">
          <div class="case-meta">
            <span class="case-id">CASE #${caseItem.id}</span>
            <span class="case-status status-${caseItem.status.toLowerCase()}">${caseItem.status}</span>
          </div>
          <h3>${caseItem.title}</h3>
          <div class="case-description">${caseItem.description}</div>
          <button type="button" data-case-id="${index}">View Details</button>
        </article>
      `,
    )
    .join("");
}

function renderSuspects() {
  suspectsList.innerHTML = suspects
    .map(
      (person) => `
        <div class="suspect-card">
          <h3>${person.name}</h3>
          <p class="suspect-role">${person.role}</p>
          <p><strong>Alibi:</strong> ${person.alibi}</p>
        </div>
      `,
    )
    .join("");
}

function showCaseDetail(caseId) {
  const selectedCase = cases[caseId];
  console.log(selectedCase);

  if (!selectedCase) {
    detailContent.innerHTML = "<p>Case not found.</p>";
    return;
  }

  const relevantSuspects = suspects.filter(
    (person) => person.caseId === selectedCase.id,
  );

  detailContent.innerHTML = `
    <h2>${selectedCase.title}</h2>
    <div class="meta-row">
      <span class="case-id">CASE #${selectedCase.id}</span>
      <span class="case-detail-status status-${selectedCase.status.toLowerCase()}">${selectedCase.status}</span>
    </div>
    <p>${selectedCase.description}</p>
    <h3>Suspects</h3>
    <ul>
      ${relevantSuspects
        .map(
          (person) => `
            <li>
              <strong>${person.name}</strong> — ${person.role}<br />
              <span>Alibi: ${person.alibi}</span>
            </li>
          `,
        )
        .join("")}
    </ul>
  `;

  showSection("case-detail");
}

function showSection(sectionId) {
  document.querySelectorAll(".page").forEach((section) => {
    section.classList.toggle("active", section.id === sectionId);
  });

  document.querySelectorAll(".nav-link").forEach((button) => {
    button.classList.toggle("active", button.dataset.section === sectionId);
  });
}

document.querySelectorAll(".nav-link").forEach((button) => {
  button.addEventListener("click", () => showSection(button.dataset.section));
});

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-case-id]");

  if (target) {
    const selectedCaseId = target.dataset.caseId;
    showCaseDetail(selectedCaseId);
  }
});

document
  .getElementById("back-to-cases")
  .addEventListener("click", () => showSection("cases"));
searchInput.addEventListener("input", renderCaseCards);
statusFilter.addEventListener("change", renderCaseCards);

renderOverview();
renderCaseCards();
renderSuspects();
showSection("overview");
