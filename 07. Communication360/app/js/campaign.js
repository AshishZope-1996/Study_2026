const campaignApiBase = 'http://127.0.0.1:8001';

const fallbackCatalog = {
  campaigns: [
    { key: 'LinkedIn', label: 'LinkedIn Campaign' },
    { key: 'Festival', label: 'Festival Campaign' }
  ],
  templates: [
    {
      campaign: 'LinkedIn',
      template: 'LinkdinPost.html',
      label: 'LinkedIn Notes Outreach',
      subject: 'Sharing My Notes With You'
    },
    {
      campaign: 'Festival',
      template: 'Festival_Diwali.html',
      label: 'Festival - Diwali',
      subject: 'Happy Diwali....!!'
    },
    {
      campaign: 'Festival',
      template: 'Holi.html',
      label: 'Festival - Holi',
      subject: 'Happy Holi!'
    },    {
      campaign: 'Festival',
      template: 'Holi.html',
      label: 'Festival - Holi',
      subject: 'Happy Holi!'
    },
    {
      campaign: 'Festival',
      template: 'Christmas.html',
      label: 'Festival - Christmas',
      subject: 'Merry Christmas!'
    }
  ]
};

function getStoredCampaignHistory() {
  try {
    const raw = localStorage.getItem('campaignHistory');
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

function saveStoredCampaignHistory(history) {
  localStorage.setItem('campaignHistory', JSON.stringify(history));
}

function pushStoredCampaignEntry(entry) {
  const history = getStoredCampaignHistory();
  history.unshift(entry);
  saveStoredCampaignHistory(history.slice(0, 25));
  return history;
}

function renderCampaignHistory(body, history) {
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
}

async function fetchCampaignJson(path, fallbackValue) {
  try {
    const response = await fetch(`${campaignApiBase}${path}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    return fallbackValue;
  }
}

function populateCampaignOptions(data) {
  const typeSelect = document.getElementById('campaignTypeSelect');
  const templateSelect = document.getElementById('templateSelect');
  const subjectInput = document.getElementById('campaignSubject');

  if (!typeSelect || !templateSelect || !subjectInput) {
    return;
  }

  typeSelect.innerHTML = '<option value="">Select campaign</option>';
  templateSelect.innerHTML = '<option value="">Select template</option>';

  const campaigns = data?.campaigns || fallbackCatalog.campaigns;
  const templates = data?.templates || fallbackCatalog.templates;

  campaigns.forEach((campaign) => {
    const option = document.createElement('option');
    option.value = campaign.key;
    option.textContent = campaign.label;
    typeSelect.appendChild(option);
  });

  templates.forEach((template) => {
    const option = document.createElement('option');
    option.value = template.template;
    option.textContent = template.label;
    option.dataset.subject = template.subject || '';
    option.dataset.campaignType = template.campaign || '';
    templateSelect.appendChild(option);
  });

  templateSelect.onchange = () => {
    const selected = templateSelect.selectedOptions[0];
    if (selected) {
      subjectInput.value = selected.dataset.subject || '';
      if (!typeSelect.value) {
        typeSelect.value = selected.dataset.campaignType || '';
      }
    }
  };
}

async function loadCampaignCatalog() {
  showLoader('Loading campaign templates...');
  const statusBox = document.getElementById('campaignStatus');

  try {
    const data = await fetchCampaignJson('/campaigns', fallbackCatalog);
    populateCampaignOptions(data);

    if (data?.campaigns?.length && data?.templates?.length) {
      statusBox.textContent = 'Campaign catalog loaded.';
    } else {
      statusBox.textContent = 'Campaign API unavailable. Using built-in templates instead.';
    }
  } catch (error) {
    populateCampaignOptions(fallbackCatalog);
    if (statusBox) {
      statusBox.textContent = 'Unable to load the live catalog, but built-in templates are ready.';
    }
  } finally {
    hideLoader();
  }
}

async function loadCampaignHistory() {
  const body = document.getElementById('historyTableBody');
  if (!body) {
    return;
  }

  try {
    const data = await fetchCampaignJson('/history', { history: [] });
    const remoteHistory = data?.history || [];
    const storedHistory = getStoredCampaignHistory();

    const history = remoteHistory.length
      ? [...remoteHistory, ...storedHistory.filter((item) => !remoteHistory.some((entry) => entry.timestamp === item.timestamp && entry.sent_to === item.sent_to))]
      : storedHistory;

    renderCampaignHistory(body, history);
  } catch (error) {
    renderCampaignHistory(body, getStoredCampaignHistory());
  }
}

async function sendCampaign() {
  const typeSelect = document.getElementById('campaignTypeSelect');
  const templateSelect = document.getElementById('templateSelect');
  const subjectInput = document.getElementById('campaignSubject');
  const statusBox = document.getElementById('campaignStatus');

  if (!typeSelect?.value || !templateSelect?.value) {
    statusBox.textContent = 'Please choose both a campaign type and a template.';
    return;
  }

  showLoader('Sending campaign...');
  const campaignLabel = typeSelect.options[typeSelect.selectedIndex]?.textContent || typeSelect.value;

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

    let result = null;
    try {
      result = await response.json();
    } catch (parseError) {
      result = null;
    }

    if (response.ok && result?.success) {
      statusBox.textContent = 'Campaign launched successfully. Check the history table for updates.';
      pushStoredCampaignEntry({
        timestamp: new Date().toLocaleString(),
        sent_to: 'Queued for delivery',
        campaign_type: campaignLabel,
        status: 'SUCCESS',
        error_message: ''
      });
      await loadCampaignHistory();
    } else {
      pushStoredCampaignEntry({
        timestamp: new Date().toLocaleString(),
        sent_to: 'Local queue',
        campaign_type: campaignLabel,
        status: 'QUEUED',
        error_message: result?.error || 'The API is temporarily unavailable, so the request was saved locally.'
      });
      statusBox.textContent = result?.error || 'The campaign API is not reachable right now, so the request was saved locally.';
      await loadCampaignHistory();
    }
  } catch (error) {
    pushStoredCampaignEntry({
      timestamp: new Date().toLocaleString(),
      sent_to: 'Local queue',
      campaign_type: campaignLabel,
      status: 'QUEUED',
      error_message: 'The campaign API is not reachable right now, so the request was saved locally.'
    });
    statusBox.textContent = 'The campaign API is not reachable right now, but your request has been saved locally.';
    await loadCampaignHistory();
  } finally {
    hideLoader();
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  await initPortalData();
  await loadCampaignCatalog();
  await loadCampaignHistory();

  const sendButton = document.getElementById('sendCampaignBtn');
  const refreshButton = document.getElementById('refreshHistoryBtn');

  if (sendButton) {
    sendButton.addEventListener('click', sendCampaign);
  }

  if (refreshButton) {
    refreshButton.addEventListener('click', loadCampaignHistory);
  }
});

