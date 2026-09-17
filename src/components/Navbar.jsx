import React from 'react';
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { loginRequest } from '../auth/authConfig';

export const Navbar = () => {
    const { instance, accounts } = useMsal();

    const handleLogin = () => {
        instance.loginRedirect(loginRequest).catch(e => console.error(e));
    };

    const handleLogout = () => {
        instance.logoutRedirect({ postLogoutRedirectUri: "/" }).catch(e => console.error(e));
    };

    const account = accounts[0] || {};
    const userName = account.name || "Usuario";
    const roles = account.idTokenClaims?.roles || [];
    
    // Mapeo dinámico de roles para la interfaz
    let roleDisplay = "Sin rol asignado";
    let roleColor = "text-slate-400";
    
    if (roles.includes('ROLE_ADMINISTRADOR')) {
        roleDisplay = "Administrador";
        roleColor = "text-orange-400 font-bold tracking-wide";
    } else if (roles.includes('ROLE_OPERADOR')) {
        roleDisplay = "Operador de Soporte";
        roleColor = "text-blue-400 font-bold tracking-wide";
    } else if (roles.includes('ROLE_CLIENTE')) {
        roleDisplay = "Cliente";
        roleColor = "text-emerald-400 font-bold tracking-wide";
    }

    return (
        <nav className="bg-[#1a0b2e] border-b border-indigo-900/30 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-lg">
            <div className="flex items-center gap-3">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="font-bold text-xl tracking-wide text-white">MesaTech <span className="text-orange-600 font-light">Cloud</span></span>
            </div>
            <div>
                <AuthenticatedTemplate>
                    <div className="flex items-center gap-5">
                        <div className="flex flex-col text-right">
                            <span className="text-sm font-semibold text-slate-100">{userName}</span>
                            <span className={`text-[11px] uppercase ${roleColor}`}>{roleDisplay}</span>
                        </div>
                        <div className="h-8 w-px bg-slate-700/50"></div>
                        <button onClick={handleLogout} className="text-sm bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all px-4 py-2 rounded-lg font-medium shadow-sm">
                            Cerrar Sesión
                        </button>
                    </div>
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                    <button onClick={handleLogin} className="text-sm bg-[#e24a27] hover:bg-[#c93e1f] text-white transition-all px-5 py-2.5 rounded-lg font-medium shadow-md">
                        Acceso Corporativo
                    </button>
                </UnauthenticatedTemplate>
            </div>
        </nav>
    );
};
