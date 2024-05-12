import React, { useEffect, useState } from 'react';

const Private = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Aquí puedes realizar una solicitud al backend para verificar si el usuario está autenticado
        const checkAuthentication = async () => {
            try {
                const response = await fetch('/private');

                if (response.ok) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error al verificar la autenticación:', error);
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuthentication();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!isLoggedIn) {
        // Si el usuario no está autenticado, puedes redirigirlo a la página de inicio de sesión o mostrar un mensaje de error
        return <div>No estás autenticado. Por favor inicia sesión para acceder a esta página.</div>;
    }

    return (
        <div>
            <h2>Página Privada</h2>
            <p>Bienvenido a la página privada. Este contenido solo es visible para usuarios autenticados.</p>
        </div>
    );
};

export default Private;
