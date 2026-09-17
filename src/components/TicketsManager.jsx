import React, { useState } from 'react';
import { useMsal } from '@azure/msal-react';

export const TicketsManager = () => {
    const { accounts } = useMsal();
    const roles = accounts[0]?.idTokenClaims?.roles || [];

    // Determinamos qué vista mostrar basándonos en los claims
    const isOperatorOrAdmin = roles.includes('ROLE_OPERADOR') || roles.includes('ROLE_ADMINISTRADOR');

    const [showForm, setShowForm] = useState(false);
    
    // Datos simulados (Mock) para maquetar antes de tener el backend de Julio
    const [tickets] = useState([
        { id: "REQ-001", titulo: "Sin acceso a la VPN corporativa", categoria: "Redes", prioridad: "Alta", solicitante: "tonystark@cvillarp.onmicrosoft.com", estado: "EN_PROCESO", fecha: "2026-09-17" },
        { id: "REQ-002", titulo: "Renovación licencia Office 365", categoria: "Software", prioridad: "Media", solicitante: "steve@cvillarp.onmicrosoft.com", estado: "CREADA", fecha: "2026-09-16" },
        { id: "REQ-003", titulo: "Pantalla parpadea al conectar HDMI", categoria: "Hardware", prioridad: "Baja", solicitante: "tonystark@cvillarp.onmicrosoft.com", estado: "RESUELTA", fecha: "2026-09-15" }
    ]);

    const getStatusBadge = (estado) => {
        const styles = {
            CREADA: "bg-slate-100 text-slate-700 border-slate-200",
            ASIGNADA: "bg-purple-100 text-purple-700 border-purple-200",
            EN_PROCESO: "bg-amber-100 text-amber-700 border-amber-200",
            RESUELTA: "bg-emerald-100 text-emerald-700 border-emerald-200",
            CERRADA: "bg-gray-100 text-gray-500 border-gray-200",
            CANCELADA: "bg-red-100 text-red-700 border-red-200"
        };
        return (
            <span className={`px-2.5 py-1 rounded-md text-xs font-bold border shadow-sm ${styles[estado] || styles.CREADA}`}>
                {estado}
            </span>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-slate-800">
                        {isOperatorOrAdmin ? "Bandeja Global de Solicitudes" : "Mis Solicitudes de Soporte"}
                    </h2>
                    <p className="text-sm text-slate-500">
                        {isOperatorOrAdmin ? "Gestión de tickets de todos los clientes" : "Historial y estado de tus requerimientos"}
                    </p>
                </div>
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-600 hover:bg-blue-500 text-white transition-colors px-4 py-2 rounded-lg text-sm font-medium shadow-sm"
                >
                    {showForm ? "Cancelar" : "+ Nuevo Ticket"}
                </button>
            </div>

            {showForm && (
                <div className="p-6 border-b border-slate-200 bg-blue-50/30">
                    <h3 className="font-semibold text-slate-800 mb-4">Crear nuevo requerimiento</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Título</label>
                            <input type="text" className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Ej. Falla en equipo..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Categoría</label>
                            <select className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                                <option>Redes</option>
                                <option>Hardware</option>
                                <option>Software</option>
                                <option>Cuentas y Accesos</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
                            <textarea className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" rows="3" placeholder="Detalla tu problema..."></textarea>
                        </div>
                    </div>
                    <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md text-sm font-medium">Enviar Solicitud</button>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm text-slate-600">
                    <thead className="bg-white text-slate-400 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-3 border-b border-slate-100 font-semibold">ID</th>
                            <th className="px-6 py-3 border-b border-slate-100 font-semibold">Título</th>
                            {isOperatorOrAdmin && <th className="px-6 py-3 border-b border-slate-100 font-semibold">Solicitante</th>}
                            <th className="px-6 py-3 border-b border-slate-100 font-semibold">Categoría / Prioridad</th>
                            <th className="px-6 py-3 border-b border-slate-100 font-semibold">Estado</th>
                            <th className="px-6 py-3 border-b border-slate-100 font-semibold">Fecha</th>
                            <th className="px-6 py-3 border-b border-slate-100 font-semibold">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {tickets.map(ticket => (
                            <tr key={ticket.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs font-bold text-slate-500">{ticket.id}</td>
                                <td className="px-6 py-4 font-medium text-slate-800">{ticket.titulo}</td>
                                {isOperatorOrAdmin && <td className="px-6 py-4 text-slate-500 text-xs">{ticket.solicitante}</td>}
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-slate-700">{ticket.categoria}</span>
                                        <span className={`text-xs font-medium ${ticket.prioridad === 'Alta' ? 'text-red-600' : 'text-slate-500'}`}>{ticket.prioridad}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{getStatusBadge(ticket.estado)}</td>
                                <td className="px-6 py-4 text-slate-500 text-xs">{ticket.fecha}</td>
                                <td className="px-6 py-4">
                                    <button className="text-blue-600 hover:text-blue-800 font-medium text-xs">
                                        {isOperatorOrAdmin ? "Gestionar" : "Ver detalle"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
