const API_URL = "http://localhost:3001/api";

export async function getStatuts() {
    try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${API_URL}/statuts`, {
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
