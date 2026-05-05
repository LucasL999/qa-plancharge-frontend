

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

export async function addChantier(data) {
    try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/chantier`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to add chantier');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding chantier:', error);
        throw error;
    }
}

export async function getChantier() {
    try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getChantier`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch Chantier');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching Chantier:', error);
        throw error;
    }
}

export async function updateChantier(data) {
    try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/updateChantier`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to update chantier');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating chantier:', error);
        throw error;
    }
}