export async function getAllTeam() {
    try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/QA`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch QAs');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching QAs:', error);
        throw error;
    }
}

export async function getNbQA() {
    try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/nbQA`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch nb QA');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching nb QA:', error);
        throw error;
    }
}