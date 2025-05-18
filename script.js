document.addEventListener('DOMContentLoaded', () => {
    const extractButton = document.getElementById('extractButton');
    const articleContentDiv = document.getElementById('articleContent');

    extractButton.addEventListener('click', async () => {
        try {
            const response = await fetch(window.location.href);
            const html = await response.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Initialize Readability with the document
            const reader = new Readability(doc);

            // Parse the article content
            const article = reader.parse();

            if (article) {
                articleContentDiv.innerHTML = `<h1><span class="math-inline">\{article\.title \|\| 'Article'\}</h1\></span>{article.content || '<p>Could not extract article content.</p>'}`;
                articleContentDiv.classList.add('reader-mode');
                extractButton.style.display = 'none'; // Hide the button after extraction
            } else {
                articleContentDiv.textContent = 'Failed to parse article content using Readability.';
            }
        } catch (error) {
            console.error('Error fetching or parsing article:', error);
            articleContentDiv.textContent = 'An error occurred while trying to extract the article.';
        }
    });

    // Register service worker (ensure this is at the top level of your script)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js');
    }
});
