const campaignApiBase = 'http://127.0.0.1:8001';

async function loadCampaignCatalog() {
  showLoader('Loading campaign templates...');
  const typeSelect = document.getElementById('campaignTypeSelect');
  const templateSelect = document.getElementById('templateSelect');
  const subjectInput = document.getElementById('campaignSubject');

  try {
    const response = await fetch(`${campaignApiBase}/campaigns`);
    const data = await response.json();

    typeSelect.innerHTML = '<option value="">Select campaign</option>';
    templateSelect.innerHTML = '<option value="">Select template</option>';

    data.campaigns.forEach((campaign) => {
      const option = document.createElement('option');
      option.value = campaign.key;
      option.textContent = campaign.label;
      typeSelect.appendChild(option);
    });

    data.templates.forEach((template) => {
      const option = document.createElement('option');
      option.value = template.template;
      option.textContent = template.label;
      option.dataset.subject = template.subject || '';
      option.dataset.campaignType = template.campaign || '';
      templateSelect.appendChild(option);
    });

    templateSelect.addEventListener('change', () => {
      const selected = templateSelect.selectedOptions[0];
      if (selected) {
        subjectInput.value = selected.dataset.subject || '';
        if (!typeSelect.value) {
          typeSelect.value = selected.dataset.campaignType || '';
        }
      }
    });
  } catch (error) {
    document.getElementById('campaignStatus').textContent = 'Unable to load campaign catalog.';
  } finally {
    hideLoader();
  }
}

async function loadCampaignHistory() {
  const body = document.getElementById('historyTableBody');
  try {
    const response = await fetch(`${campaignApiBase}/history`);
    const data = await response.json();
    const history = data.history || [];

    if (!history.length) {
      body.innerHTML = '<tr><td colspan="5">No campaign history found yet.</td></tr>';
      return;
    }

    body.innerHTML = history.map((item) => `
      <tr>
        <td>${item.timestamp}</td>
        <td>${item.sent_to}</td>
        <td>${item.campaign_type}</td>
        <td>${item.status}</td>
        <td>${item.error_message || '—'}</td>
      </tr>
    `).join('');
  } catch (error) {
    body.innerHTML = '<tr><td colspan="5">Unable to load history right now.</td></tr>';
  }
}

async function sendCampaign() {
  const typeSelect = document.getElementById('campaignTypeSelect');
  const templateSelect = document.getElementById('templateSelect');
  const subjectInput = document.getElementById('campaignSubject');
  const statusBox = document.getElementById('campaignStatus');

  if (!typeSelect.value || !templateSelect.value) {
    statusBox.textContent = 'Please choose both a campaign type and a template.';
    return;
  }

  showLoader('Sending campaign...');
  try {
    const response = await fetch(`${campaignApiBase}/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        campaign_type: typeSelect.value,
        template: templateSelect.value,
        subject: subjectInput.value || 'Campaign update'
      })
    });

    const result = await response.json();
    if (result.success) {
      statusBox.textContent = 'Campaign launched successfully. Check the history table for updates.';
      await loadCampaignHistory();
    } else {
      statusBox.textContent = result.error || 'Campaign could not be sent.';
    }
  } catch (error) {
    statusBox.textContent = 'The campaign API is not reachable. Start the Python API first.';
  } finally {
    hideLoader();
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  await initPortalData();
  await loadCampaignCatalog();
  await loadCampaignHistory();
  document.getElementById('sendCampaignBtn').addEventListener('click', sendCampaign);
  document.getElementById('refreshHistoryBtn').addEventListener('click', loadCampaignHistory);
});
