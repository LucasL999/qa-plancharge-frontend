

export async function getStatuts() {
    try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/statuts`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch statuts');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching statuts:', error);
        throw error;
    }
}

export async function getPriorites() {
    try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/priorites`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch priorites');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching priorites:', error);
        throw error;
    }
}

export async function getQA() {
    try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/newChantierQA`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch QA');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching QA:', error);
        throw error;
    }
}