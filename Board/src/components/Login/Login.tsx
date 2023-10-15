import { useState } from 'react';
import './styles.css';  // Import the CSS file
import axios from 'axios';

async function authenticateUser(username, password) {
    let users;
    let user;

    try {
        console.log('Fetching data...');
        const response = await axios.get('http://10.31.34.17:1337/api/utilisateurs');
        // Process the response.data or perform actions after the GET request is complete
        console.log('Data:', response.data);
        users = response.data.data;
        user = users.find((u) => u.attributes.email === username);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }

    console.log(user);

    if (!user) {
        return { success: false, message: 'User not found' };
    }

    if (user.attributes.password !== password) {
        return { success: false, message: 'Incorrect password' };
    }

    return { success: true, user };
}

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    async function handleSubmit(e: React.FormEvent) {

        e.preventDefault();

        try {
            const authenticationResult = await authenticateUser(email, password);

            if (authenticationResult.success) {
                // Successful login - handle login logic (e.g., store authentication token)
                console.log('Login successful:', authenticationResult.user);
                // Redirect to the tasks page
                window.location.href = '/tasks-list';
            } else {
                // Failed login
                setError(authenticationResult.message);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };


    return (
        <div>
            <form className="registration-form" onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={handleEmailChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>

    );
};

export default Login;