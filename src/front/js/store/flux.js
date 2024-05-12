import React, { createContext, useState } from 'react';

export const Context = createContext();

const AppContextProvider = ({ children }) => {
    const [state, setState] = useState({
        message: null,
        user: null
    });

    const actions = {
        getMessage: async () => {
            try {
                const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                const data = await resp.json();
                setState({ ...state, message: data.message });
                return data;
            } catch (error) {
                console.log("Error loading message from backend", error);
            }
        },
        login: async (email, password) => {
            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });
        
                if (response.ok) {
                    const data = await response.json();
                    setState(prevState => ({
                        ...prevState,
                        user: data.user
                    }));
                    console.log('Inicio de sesión exitoso');
                } else {
                    const data = await response.json();
                    console.log('Error de inicio de sesión:', data.message);
                }
            } catch (error) {
                console.error('Error durante el inicio de sesión:', error);
            }
        },
        logout: () => {
            setState({ ...state, user: null });
        },
        signUp: async (email, password) => {
            try {
                const response = await fetch('/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setState(prevState => ({
                        ...prevState,
                        user: data.user
                    }));
                    console.log('Registro exitoso');
                } else {
                    const data = await response.json();
                    console.log('Error durante el registro:', data.message);
                }
            } catch (error) {
                console.error('Error durante el registro:', error);
            }
        }
    };

    return (
        <Context.Provider value={{ state, actions }}>
            {children}
        </Context.Provider>
    );
};

export default AppContextProvider;
