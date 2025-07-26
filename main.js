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
  data.forEach(activity => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <strong>${activity.ActivityName}</strong>
      <p><em>Week ${activity.Week}</em></p>
      <p>${activity.Description.join('<br>')}</p>
      <p><strong>Equipment:</strong> ${activity.Equipment}</p>
    `;
    container.appendChild(card);
  });
}

loadData();
