async function loadData() {
  const [stage2, stage3] = await Promise.all([
    fetch('stage2.json').then(res => res.json()),
    fetch('stage3.json').then(res => res.json())
  ]);

  renderStage(stage2, 'stage2-grid');
  renderStage(stage3, 'stage3-grid');
}

function renderStage(data, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ''; // clear before render

  data.forEach(activity => {
    const card = document.createElement('div');
    card.className =
      'bg-white rounded-2xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition';

    card.innerHTML = `
      <h3 class="text-xl font-semibold mb-2">${activity.ActivityName}</h3>
      <p class="text-sm text-gray-500 mb-1">Week ${activity.Week}</p>
      <ul class="text-sm mb-2 list-disc pl-5">
        ${activity.Description.map(line => `<li>${line}</li>`).join('')}
      </ul>
      <p class="text-sm text-gray-700"><span class="font-medium">Equipment:</span> ${activity.Equipment}</p>
    `;

    container.appendChild(card);
  });
}

loadData();
