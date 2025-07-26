// script.js

async function loadJSON(url) {
  const res = await fetch(url);
  return res.json();
}

function renderLayout(stage, layout) {
  const target = document.getElementById(`${stage}-layout`);
  target.textContent = layout;
}

function renderActivities(data, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  data.forEach(item => {
    const div = document.createElement('div');
    div.className = 'bg-white p-4 rounded shadow';

    const title = document.createElement('h3');
    title.className = 'font-bold text-lg mb-2';
    title.textContent = `Week ${item.Week}: ${item.ActivityName}`;

    const desc = document.createElement('ul');
    desc.className = 'list-disc list-inside text-sm mb-2';
    item.Description.forEach(d => {
      const li = document.createElement('li');
      li.textContent = d;
      desc.appendChild(li);
    });

    const equipment = document.createElement('p');
    equipment.className = 'text-xs text-gray-600';
    equipment.textContent = `Equipment: ${item.Equipment}`;

    div.appendChild(title);
    div.appendChild(desc);
    div.appendChild(equipment);

    container.appendChild(div);
  });
}

async function init() {
  const stage2 = await loadJSON('stage2.json');
  const stage3 = await loadJSON('stage3.json');

  renderLayout('stage2', stage2.layout);
  renderLayout('stage3', stage3.layout);

  const allActivities = [...stage2.activities, ...stage3.activities];
  renderActivities(allActivities, 'activity-bank');
}

init();
