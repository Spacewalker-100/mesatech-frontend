import React from 'react';
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { loginRequest } from '../auth/authConfig';

export const Navbar = () => {
    const { instance, accounts } = useMsal();

    const handleLogin = () => {
        instance.loginRedirect(loginRequest).catch(e => console.error(e));
    };

    const handleLogout = () => {
        instance.logoutRedirect({
            postLogoutRedirectUri: "/"
        }).catch(e => console.error(e));
    };

    const userName = accounts.length > 0 ? accounts[0].name : "Usuario";

    return (
        <nav className="bg-blue-900 p-4 text-white flex justify-between items-center shadow-md">
            <div className="font-bold text-xl tracking-wide">MesaTech Cloud</div>
            <div>
                <AuthenticatedTemplate>
                    <span className="mr-4 font-medium">Hola, {userName}</span>
                    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 transition-colors px-4 py-2 rounded-md font-semibold shadow-sm">
                        Cerrar Sesión
                    </button>
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                    <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-400 transition-colors px-4 py-2 rounded-md font-semibold shadow-sm">
                        Iniciar Sesión
                    </button>
                </UnauthenticatedTemplate>
            </div>
        </nav>
    );
};
