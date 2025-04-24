const API_URL = 'http://localhost:3000/voyages';
const tableBody = document.querySelector('#voyagesTable tbody');
const searchInput = document.getElementById('searchInput');
const filterPays = document.getElementById('filterPays');

let voyages = [];

async function fetchVoyages() {
  const res = await fetch(API_URL);
  voyages = await res.json();
  updatePaysFilter();
  renderTable();
}

function updatePaysFilter() {
  const paysSet = new Set(voyages.map(v => v.pays));
  filterPays.innerHTML = '<option value="">🌐 Tous les pays</option>';
  paysSet.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p;
    opt.textContent = p;
    filterPays.appendChild(opt);
  });
}

function renderTable() {
  const search = searchInput.value.toLowerCase();
  const selectedPays = filterPays.value;

  const filtered = voyages.filter(v =>
    (v.titre.toLowerCase().includes(search)) &&
    (selectedPays === "" || v.pays === selectedPays)
  );

  tableBody.innerHTML = '';
  filtered.forEach(v => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${v.titre}</td>
      <td>${v.pays}</td>
      <td>${v.prix}</td>
      <td>${v.placesDispo}</td>
      <td>${v.datesDisponibles.map(d => new Date(d).toLocaleDateString()).join(', ')}</td>
    `;
    tableBody.appendChild(row);
  });
}

searchInput.addEventListener('input', renderTable);
filterPays.addEventListener('change', renderTable);

fetchVoyages();
