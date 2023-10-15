import { useState } from 'react';
import './styles.css';  // Import the CSS file

const handleRegistration = async ({ name, email, password }) => {
    const registrationData = {
        "data": {
            "nom": name,
            "email": email,
            "password": password,
        }
    };

    try {
        const response = await fetch('http://localhost:1337/api/utilisateurs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Registration successful:', data);

        // Redirect to the login page
        window.location.href = '/login';

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error registering:', error.message);
        }
    }
};


const Register: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleRegistration({ name, email, password });
    };

    return (
        <form className="registration-form" onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={handleNameChange} />
            </label>
            <br />
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
    );
};

export default Register;