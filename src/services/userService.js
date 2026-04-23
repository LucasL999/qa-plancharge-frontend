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

export async function getAllUsers() {
    try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

export async function addUser(userData) {
    try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            throw new Error('Failed to add user');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
}

export async function updateUser(userData) {
    try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userData.id_user}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}