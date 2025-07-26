// Load JSON data and populate activities
async function loadActivities(stage, jsonPath, containerId) {
  const response = await fetch(jsonPath);
  const data = await response.json();
  const container = document.getElementById(containerId);

  data.forEach(activity => {
    const card = document.createElement('div');
    card.className = 'bg-white p-4 rounded-xl shadow-md';

    card.innerHTML = `
      <h2 class="text-xl font-semibold mb-1">${activity["Activity Name"]}</h2>
      <p class="text-sm text-gray-600 mb-2"><strong>Week:</strong> ${activity["Week"]}</p>
      <p class="mb-2"><strong>Section:</strong> ${activity["Section"]}</p>
      <p class="mb-2"><strong>Skill Type:</strong> ${activity["Skill Type"].join(', ')}</p>
      <p class="mb-2"><strong>Description:</strong><ul class="list-disc ml-6">${activity["Description"].map(line => `<li>${line}</li>`).join('')}</ul></p>
      <p><strong>Equipment:</strong> ${activity["Equipment"]}</p>
    `;
    container.appendChild(card);
  });
}

loadActivities(2, 'stage2.json', 'stage2-activities');
loadActivities(3, 'stage3.json', 'stage3-activities');
