import React, { useState } from 'react';
import { useMsal } from '@azure/msal-react';

export const TicketsManager = () => {
    const { accounts } = useMsal();
    const roles = accounts[0]?.idTokenClaims?.roles || [];
    const isOperatorOrAdmin = roles.includes('ROLE_OPERADOR') || roles.includes('ROLE_ADMINISTRADOR');

    const [showForm, setShowForm] = useState(false);
    
    const categoriasMock = [
        { id: 1, nombre: "Hardware" },
        { id: 2, nombre: "Software" },
        { id: 3, nombre: "Redes" },
        { id: 4, nombre: "Cuentas y Accesos" }
    ];

    const prioridadesMock = [
        { id: 1, nombre: "Baja" },
        { id: 2, nombre: "Media" },
        { id: 3, nombre: "Alta" },
        { id: 4, nombre: "Crítica" }
    ];

    const [formData, setFormData] = useState({
        titulo: "", descripcion: "", categoriaId: 1, prioridadId: 2
    });

    const [tickets] = useState([
        { id: "REQ-001", titulo: "Sin acceso a la VPN corporativa", categoria: "Redes", prioridad: "Alta", solicitante: "tonystark@cvillarp.onmicrosoft.com", estado: "EN_PROCESO", fecha: "2026-09-17" },
        { id: "REQ-002", titulo: "Renovación licencia Office 365", categoria: "Software", prioridad: "Media", solicitante: "steve@cvillarp.onmicrosoft.com", estado: "CREADA", fecha: "2026-09-16" }
    ]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name.includes('Id') ? parseInt(value) : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("JSON exacto para el backend de Julio:", formData);
        alert("Solicitud simulada. JSON enviado a consola.");
        setShowForm(false);
    };

    const getStatusBadge = (estado) => {
        const styles = {
            CREADA: "bg-slate-100 text-slate-700 border-slate-200",
            ASIGNADA: "bg-indigo-50 text-indigo-700 border-indigo-200",
            EN_PROCESO: "bg-amber-50 text-amber-700 border-amber-200",
            RESUELTA: "bg-emerald-50 text-emerald-700 border-emerald-200",
            CERRADA: "bg-gray-100 text-gray-500 border-gray-200",
            CANCELADA: "bg-red-50 text-red-700 border-red-200"
        };
        return <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[estado] || styles.CREADA}`}>{estado}</span>;
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
            <div className="bg-white border-b border-slate-100 px-8 py-5 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">
                        {isOperatorOrAdmin ? "Bandeja Global de Solicitudes" : "Mis Solicitudes de Soporte"}
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        {isOperatorOrAdmin ? "Supervisión y gestión de requerimientos B2B" : "Historial y seguimiento de tus tickets activos"}
                    </p>
                </div>
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-[#e24a27] hover:bg-[#c93e1f] text-white transition-all px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md shadow-orange-900/10"
                >
                    {showForm ? (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            Cancelar
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                            Nuevo Ticket
                        </>
                    )}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="p-8 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#e24a27]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        Crear nuevo requerimiento
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Título de la incidencia</label>
                            <input type="text" name="titulo" value={formData.titulo} onChange={handleInputChange} required className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="Ej. Pantalla azul al iniciar el equipo..." />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Categoría</label>
                                <select name="categoriaId" value={formData.categoriaId} onChange={handleInputChange} className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all cursor-pointer">
                                    {categoriasMock.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Prioridad</label>
                                <select name="prioridadId" value={formData.prioridadId} onChange={handleInputChange} className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all cursor-pointer">
                                    {prioridadesMock.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Descripción detallada</label>
                            <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} required className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-y" rows="4" placeholder="Describe los pasos para reproducir el problema o los mensajes de error..."></textarea>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-md transition-colors">
                            Enviar Solicitud
                        </button>
                    </div>
                </form>
            )}

            <div className="overflow-x-auto p-4">
                <table className="min-w-full text-left text-sm text-slate-600">
                    <thead className="text-slate-400 text-[11px] uppercase tracking-wider font-bold">
                        <tr>
                            <th className="px-4 py-3 border-b border-slate-100">ID Ticket</th>
                            <th className="px-4 py-3 border-b border-slate-100">Detalle</th>
                            {isOperatorOrAdmin && <th className="px-4 py-3 border-b border-slate-100">Solicitante</th>}
                            <th className="px-4 py-3 border-b border-slate-100">Estado</th>
                            <th className="px-4 py-3 border-b border-slate-100">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {tickets.map(ticket => (
                            <tr key={ticket.id} className="hover:bg-slate-50/80 transition-colors group">
                                <td className="px-4 py-4">
                                    <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">{ticket.id}</span>
                                    <div className="text-[11px] text-slate-400 mt-1">{ticket.fecha}</div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="font-semibold text-slate-800 mb-0.5">{ticket.titulo}</div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className="text-slate-500">{ticket.categoria}</span>
                                        <span className="text-slate-300">•</span>
                                        <span className={`font-semibold ${ticket.prioridad === 'Alta' ? 'text-red-500' : 'text-slate-500'}`}>{ticket.prioridad}</span>
                                    </div>
                                </td>
                                {isOperatorOrAdmin && (
                                    <td className="px-4 py-4 text-slate-500 text-xs font-medium">
                                        {ticket.solicitante}
                                    </td>
                                )}
                                <td className="px-4 py-4">{getStatusBadge(ticket.estado)}</td>
                                <td className="px-4 py-4">
                                    <button className="text-blue-600 hover:text-blue-800 font-semibold text-xs bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                                        {isOperatorOrAdmin ? "Gestionar" : "Ver"}
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
