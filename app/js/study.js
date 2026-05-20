function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

function buildNoteList(notes) {
    const list = document.getElementById('studyList');
    if (!list) return;

    list.innerHTML = notes.map(note => `
        <button class="study-link" data-note="${note.id}">
            <div>
                <strong>${note.title}</strong>
                <span>${note.description}</span>
            </div>
            <span>Read</span>
        </button>
    `).join('');

    list.querySelectorAll('.study-link').forEach(item => {
        item.addEventListener('click', () => {
            const noteId = item.dataset.note;
            window.location.search = `?note=${encodeURIComponent(noteId)}`;
        });
    });
}

function highlightSelectedNote(noteId) {
    document.querySelectorAll('.study-link').forEach(item => {
        item.classList.toggle('active', item.dataset.note === noteId);
    });
}

function renderMarkdown(markdown) {
    const lines = markdown.replace(/\r/g, '').split('\n');
    let html = '';
    let inList = false;

    const formatText = text => text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

    for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line) {
            if (inList) {
                html += '</ul>';
                inList = false;
            }
            continue;
        }

        if (line.startsWith('# ')) {
            if (inList) {
                html += '</ul>';
                inList = false;
            }
            html += `<h1>${formatText(line.slice(2))}</h1>`;
            continue;
        }

        if (line.startsWith('## ')) {
            if (inList) {
                html += '</ul>';
                inList = false;
            }
            html += `<h2>${formatText(line.slice(3))}</h2>`;
            continue;
        }

        if (line.startsWith('### ')) {
            if (inList) {
                html += '</ul>';
                inList = false;
            }
            html += `<h3>${formatText(line.slice(4))}</h3>`;
            continue;
        }

        if (/^[-*]\s+/.test(line)) {
            if (!inList) {
                html += '<ul>';
                inList = true;
            }
            html += `<li>${formatText(line.replace(/^[-*]\s+/, ''))}</li>`;
            continue;
        }

        html += `<p>${formatText(line)}</p>`;
    }

    if (inList) {
        html += '</ul>';
    }
    return html;
}

async function loadNoteContent(noteId, notes) {
    const note = notes.find(item => item.id === noteId) || notes[0];
    if (!note) return;

    highlightSelectedNote(note.id);
    document.getElementById('currentNoteLabel').textContent = note.title;
    const cached = getCachedMarkdown(note.id);

    if (cached) {
        document.getElementById('noteContent').innerHTML = renderMarkdown(cached);
        return;
    }

    showLoader('Loading markdown content...');
    try {
        const response = await fetch(encodeURI(note.path));
        if (!response.ok) {
            throw new Error('Failed to fetch note content.');
        }
        const text = await response.text();
        saveCachedMarkdown(note.id, text);
        document.getElementById('noteContent').innerHTML = renderMarkdown(text);
    } catch (error) {
        document.getElementById('noteContent').innerHTML = `<p>Unable to load this note. Please check that the markdown file is available in the workspace.</p>`;
    } finally {
        hideLoader();
    }
}

function loadVideoRecommendations(videos) {
    const target = document.getElementById('studyVideoList');
    if (!target) return;
    target.innerHTML = (videos || []).map(video => `
        <a class="video-card" href="${video.url}" target="_blank">
            <img src="${video.thumbnail}" alt="${video.title}">
            <div>
                <h4>${video.title}</h4>
                <p>${video.channel}</p>
            </div>
        </a>
    `).join('');
}

async function initStudyPage() {
    showLoader('Preparing your study session...');
    await initPortalData();

    const portalData = getPortalData();
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    if (!loggedInUser) {
        window.location.href = 'index.html';
        return;
    }

    buildNoteList(portalData.studyNotes || []);
    loadVideoRecommendations(portalData.studyVideos || []);

    const noteId = getQueryParam('note') || (portalData.studyNotes && portalData.studyNotes[0] && portalData.studyNotes[0].id);
    if (noteId) {
        await loadNoteContent(noteId, portalData.studyNotes || []);
    }

    hideLoader();
}

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}

window.addEventListener('DOMContentLoaded', initStudyPage);
