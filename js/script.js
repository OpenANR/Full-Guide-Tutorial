const GITHUB_USERNAME = 'OpenANR';
const GITHUB_REPO = 'Full-Guide-Tutorial';
const FOLDER_PATH = 'content';

const listElement = document.getElementById('tutorial-list');
const contentDisplay = document.getElementById('content-display');

async function loadTutorialList(path = FOLDER_PATH, parrentElement = listElement) {
    const apiUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${FOLDER_PATH}`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Gagal mengambil data dari Github');

        const files = await response.json();

        if (path === FOLDER_PATH) {
            parrentElement.innerHTML = '';
        }

        listElement.innerHTML = '';

        files.forEach(file => {
            if (file.type === 'file' && file.name.endsWith('.md')) {
                const li = document.createElement('li');
                const a = document.createElement('a');

                a.textContent = file.name.replace('.md', '').replace(/-/g, ' ');
                a.href = "#";

                a.onclick = (e) => {
                    e.preventDefault();
                    loadMarkdownContent(file.download_url);
                }

                li.appendChild(a);
                listElement.appendChild(li);

            } else if (file.type ===  'dir' && file.name !== 'images') {
                const li =document.createElement('li');
                li.innerHTML = `<strong style="display:block; margin-top:10px; color:#555;">${file.name.replace(/-/g, ' ')}</strong>`;

                const ul = document.createElement('ul');
                ul.style.paddingLeft = "15px";
                li.appendChild(ul);
                parrentElement.appendChild(li);

                loadTutorialList(file.path, ul);
            }
        });
    } catch (error) {
        if (path === FOLDER_PATH) {
            listElement.innerHTML = `<li>Error: ${error.message}</li>`;
        }
    }
}

async function loadMarkdownContent(rawUrl) {
    contentDisplay.innerHTML = `<i>Memuat konten...</i>`;
    try {
        const response = await fetch(rawUrl);
        const markdownText = await response.text();

        contentDisplay.innerHTML = marked.parse(markdownText);
        hljs.highlightAll();
    } catch (error) {
        contentDisplay.innerHTML = `<p>Gagal memuat tutorial.</p>`;
    }
}

loadTutorialList();