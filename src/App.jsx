import React from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from './auth/authConfig';
import { Navbar } from './components/Navbar';
import { ClaimsViewer } from './components/ClaimsViewer';
import { TicketsManager } from './components/TicketsManager';

function App() {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginRedirect(loginRequest).catch(e => console.error(e));
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            
            <AuthenticatedTemplate>
                <Navbar />
                <main className="flex-1 p-8 max-w-7xl mx-auto w-full mt-4">
                    <header className="mb-8 flex justify-between items-end">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Panel de Soporte</h1>
                            <p className="text-slate-500 mt-2 text-lg">
                                Sistema centralizado de MesaTech Cloud.
                            </p>
                        </div>
                    </header>
                    
                    {/* Componente Principal de Tickets */}
                    <TicketsManager />

                    {/* Descomentar para la presentación del token JWT */}
                    {/* <div className="mt-8">
                        <ClaimsViewer />
                    </div> */}
                </main>
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <main className="flex min-h-screen w-full bg-white">
                    <div className="w-full lg:w-[450px] flex flex-col justify-center px-10 sm:px-14 relative z-10 shadow-2xl">
                        <div className="flex items-center gap-3 mb-16">
                            <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <span className="font-bold text-3xl text-slate-800">MesaTech</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Iniciar Sesión</h1>
                        <p className="text-slate-500 mb-10 text-sm">
                            Plataforma de soporte tecnológico B2B. ¿No tienes cuenta? <a href="#" className="text-orange-600 hover:underline">Contacta a TI</a>
                        </p>
                        <div className="space-y-6">
                            <button 
                                onClick={handleLogin}
                                className="w-full flex items-center justify-center gap-3 bg-[#e24a27] hover:bg-[#c93e1f] text-white transition-colors py-3.5 px-4 rounded-md font-semibold text-lg shadow-md"
                            >
                                <svg className="w-5 h-5 bg-white p-0.5 rounded-sm" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 0h11v10H10z" fill="#f25022"/><path d="M10 11h11v10H10z" fill="#ffb900"/><path d="M-1 0h10v10H-1z" fill="#7fba00"/><path d="M-1 11h10v10H-1z" fill="#00a4ef"/>
                                </svg>
                                Log In con Microsoft
                            </button>
                        </div>
                        <div className="mt-auto pt-8 pb-4 text-center">
                            <p className="text-xs text-slate-400">
                                Copyright © 2026 MesaTech Cloud.
                            </p>
                        </div>
                    </div>
                    <div className="hidden lg:flex flex-1 relative overflow-hidden bg-slate-900">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#461b5c] to-[#e24a27] opacity-90"></div>
                        <div 
                            className="absolute inset-0" 
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', mixBlendMode: 'overlay' }}
                        ></div>
                        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-white p-16 text-center">
                            <h2 className="text-5xl font-extrabold mb-6 drop-shadow-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-200">
                                Soporte a la velocidad de la luz
                            </h2>
                            <p className="text-xl text-indigo-100 max-w-lg drop-shadow-md leading-relaxed">
                                Plataforma Cloud Native diseñada para gestionar solicitudes, catalogar prioridades y mantener la trazabilidad absoluta de tu infraestructura.
                            </p>
                        </div>
                    </div>
                </main>
            </UnauthenticatedTemplate>

        </div>
    );
}

export default App;
