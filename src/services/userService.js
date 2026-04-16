export async function getRoles() {
    try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/roles`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch roles');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching roles:', error);
        throw error;
    }
}