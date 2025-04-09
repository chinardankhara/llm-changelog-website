            // script.js
            document.addEventListener('DOMContentLoaded', () => {
                const listElement = document.getElementById('changelog-list');
                // Use GitHub API to list files in the 'changelogs' directory
                // NOTE: This simple example uses the public API, might be rate-limited.
                // For robustness, the Action could generate a manifest file (e.g., changelogs.json)
                const repoOwner = 'chinardankhara'; // Replace with your GH username
                const repoName = 'llm-changelog-website'; // Replace with your website repo name
                const changelogsDir = 'changelogs';

                fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${changelogsDir}`)
                    .then(response => response.json())
                    .then(data => {
                        if (Array.isArray(data)) {
                            listElement.innerHTML = '<ul></ul>'; // Clear loading message
                            const ul = listElement.querySelector('ul');
                            data.sort((a, b) => b.name.localeCompare(a.name)); // Sort newest first (basic)
                            data.forEach(file => {
                                if (file.type === 'file' && file.name.endsWith('.md')) {
                                    const li = document.createElement('li');
                                    const a = document.createElement('a');
                                    // Link directly to the raw markdown file on GitHub Pages
                                    a.href = `${changelogsDir}/${file.name}`;
                                    a.textContent = file.name.replace('.md', ''); // Display clean name
                                    a.target = "_blank"; // Open in new tab
                                    li.appendChild(a);
                                    ul.appendChild(li);
                                }
                            });
                        } else {
                             listElement.innerHTML = '<p>Could not load changelogs.</p>';
                             console.error("Error fetching changelogs:", data);
                        }
                    })
                    .catch(error => {
                        listElement.innerHTML = '<p>Error loading changelogs.</p>';
                        console.error('Error fetching changelogs:', error);
                    });
            });