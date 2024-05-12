import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';

const SignUp = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await actions.signUp(email, password);
            // Si el registro es exitoso, puedes redirigir al usuario a la página de inicio de sesión
            // history.push('/login'); // Si estás utilizando React Router
        } catch (error) {
            setError('Error durante el registro, por favor inténtalo de nuevo.');
            console.error('Error durante el registro:', error);
        }
    };

    return (
        <div>
            <h2>Registro</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Correo electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default SignUp;
