// script.js (GitHub Pages Deployment Version)
document.addEventListener('DOMContentLoaded', () => {
    const listElement = document.getElementById('changelog-list');
    // Use GitHub API to list files in the 'changelogs' directory
    // Assumes the GitHub Action generates HTML files in this directory on the gh-pages branch
    const repoOwner = 'chinardankhara'; // Replace with your GH username
    const repoName = 'llm-changelog-website'; // Replace with your website repo name
    const changelogsDir = 'changelogs';
    const branch = 'gh-pages'; // Fetch from the deployment branch

    // Fetching from API to list the *generated* HTML files on the deployment branch
    // Adjust 'branch' if your Pages site is built from a different branch
    fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${changelogsDir}?ref=${branch}`)
        .then(response => {
            if (!response.ok) {
                // Handle case where the directory might not exist yet on gh-pages, or other errors
                if (response.status === 404) {
                    listElement.innerHTML = '<p>Loading changelogs... (may take a moment after deployment)</p>';
                    console.log(`Directory '${changelogsDir}' not found on branch '${branch}'. Waiting for deployment?`);
                    return []; // Return empty array to avoid further errors
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data)) {
                // Filter for HTML files generated from markdown
                const changelogFiles = data
                    .filter(file => file.type === 'file' && file.name.endsWith('.html')) // Look for .html files
                    .sort((a, b) => b.name.localeCompare(a.name)); // Sort newest first

                if (changelogFiles.length > 0) {
                    listElement.innerHTML = '<ul></ul>'; // Clear loading message
                    const ul = listElement.querySelector('ul');

                    changelogFiles.forEach(file => {
                        const li = document.createElement('li');
                        const a = document.createElement('a');
                        // Link to the generated HTML file relative to the root
                        a.href = `${changelogsDir}/${file.name}`; // Link to the .html file
                        // Display name based on HTML filename (remove .html extension)
                        a.textContent = file.name.replace('.html', '');
                        li.appendChild(a);
                        ul.appendChild(li);
                    });
                } else if (listElement.innerHTML.includes('Loading')) {
                    // Only update if it's still showing the loading message
                    listElement.innerHTML = '<p>No changelogs found.</p>';
                    console.log(`No .html files found in '${changelogsDir}' on branch '${branch}'.`);
                }
            } else {
                listElement.innerHTML = '<p>Could not parse changelogs listing.</p>';
                console.error("Error parsing changelogs directory listing:", data);
            }
        })
        .catch(error => {
            listElement.innerHTML = '<p>Error loading changelogs listing.</p>';
            console.error('Error fetching changelogs directory listing:', error);
        });
});