async function loadDashboardStats() {
  const ids = ['campaignCount', 'sentCount', 'recipientCount', 'historyCount'];
  const defaults = { campaignCount: 0, sentCount: 0, recipientCount: 0, historyCount: 0 };

  try {
    const response = await fetch('http://127.0.0.1:8002/dashboard-stats');
    if (!response.ok) {
      throw new Error('stats api unavailable');
    }

    const data = await response.json();
    const values = { ...defaults, ...data };

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = values[id.replace('Count', 'Count')] || 0;
      }
    });
  } catch (error) {
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = '0';
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', loadDashboardStats);
