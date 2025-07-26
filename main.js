let currentStage = 'stage2';
let stageData = { stage2: [], stage3: [] };

async function loadData() {
  const [s2, s3] = await Promise.all([
    fetch('stage2.json').then(res => res.json()),
    fetch('stage3.json').then(res => res.json())
  ]);

  stageData.stage2 = s2;
  stageData.stage3 = s3;

  populateWeekDropdown();
  renderActivities();
}

function populateWeekDropdown() {
  const weekSet = new Set();
  [...stageData.stage2, ...stageData.stage3].forEach(item => weekSet.add(item.Week));
  const weekSelect = document.getElementById('week-select');
  [...weekSet].sort((a, b) => a - b).forEach(week => {
    const opt = document.createElement('option');
    opt.value = week;
    opt.textContent = `Week ${week}`;
    weekSelect.appendChild(opt);
  });

  weekSelect.addEventListener('change', renderActivities);
}

function renderActivities() {
  const week = document.getElementById('week-select').value;
  const data = stageData[currentStage];
  const grid = document.getElementById('activities-grid');
  grid.innerHTML = '';

  const filtered = week === 'All' ? data : data.filter(item => item.Week == week);

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="text-gray-500 col-span-full">No activities for selected filters.</p>`;
    return;
  }

  filtered.forEach(activity => {
    const card = document.createElement('div');
    card.className =
      'bg-white rounded-2xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition';

    card.innerHTML = `
      <h3 class="text-xl font-semibold mb-2">${activity["Activity Name"]}</h3>
      <p class="text-sm text-gray-500 mb-1">Week ${activity.Week}</p>
      <ul class="text-sm mb-2 list-disc pl-5">
        ${activity.Description.map(line => `<li>${line}</li>`).join('')}
      </ul>
      <p class="text-sm text-gray-700"><span class="font-medium">Equipment:</span> ${activity.Equipment}</p>
    `;

    grid.appendChild(card);
  });
}

document.getElementById('btn-stage2').addEventListener('click', () => {
  currentStage = 'stage2';
  renderActivities();
});

document.getElementById('btn-stage3').addEventListener('click', () => {
  currentStage = 'stage3';
  renderActivities();
});

loadData();
