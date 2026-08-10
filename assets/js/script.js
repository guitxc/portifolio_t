const githubUsername = 'guitxc';
const githubProfileUrl = `https://api.github.com/users/${githubUsername}`;

async function loadGithubProfile() {
    const followersElement = document.querySelector('#github-followers');
    const repositoriesElement = document.querySelector('#github-repositories');

    if (!followersElement || !repositoriesElement) {
        return;
    }

    try {
        const response = await fetch(githubProfileUrl, {
            headers: { Accept: 'application/vnd.github+json' }
        });

        if (!response.ok) {
            throw new Error(`GitHub API returned ${response.status}`);
        }

        const profile = await response.json();
        followersElement.textContent = profile.followers;
        repositoriesElement.textContent = profile.public_repos;
    } catch (error) {
        followersElement.textContent = '0';
        repositoriesElement.textContent = '0';
        console.error('Não foi possível carregar os dados do GitHub.', error);
    }
}

loadGithubProfile();
