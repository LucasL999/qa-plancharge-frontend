export async function getTotCap() {
    try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/TotalCap`, {
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