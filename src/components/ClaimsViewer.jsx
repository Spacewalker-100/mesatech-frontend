import React from 'react';
import { useMsal } from '@azure/msal-react';

export const ClaimsViewer = () => {
    const { accounts } = useMsal();

    if (accounts.length === 0) return null;

    const claims = accounts[0].idTokenClaims;

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Inspección del Token (Claims)</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-gray-700">
                        <tr>
                            <th className="px-4 py-2 border-b">Claim</th>
                            <th className="px-4 py-2 border-b">Valor</th>
                            <th className="px-4 py-2 border-b">Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-4 py-2 border-b font-mono text-blue-600">name</td>
                            <td className="px-4 py-2 border-b font-medium">{claims.name}</td>
                            <td className="px-4 py-2 border-b">Nombre del usuario</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 border-b font-mono text-blue-600">preferred_username</td>
                            <td className="px-4 py-2 border-b font-medium">{claims.preferred_username || claims.email || 'N/A'}</td>
                            <td className="px-4 py-2 border-b">Correo o identificador principal</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 border-b font-mono text-blue-600">oid</td>
                            <td className="px-4 py-2 border-b font-mono text-xs">{claims.oid}</td>
                            <td className="px-4 py-2 border-b">Object ID único en Entra ID</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 border-b font-mono text-blue-600">roles</td>
                            <td className="px-4 py-2 border-b font-medium">
                                {claims.roles ? (
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">
                                        {claims.roles.join(', ')}
                                    </span>
                                ) : (
                                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                                        Sin roles asignados
                                    </span>
                                )}
                            </td>
                            <td className="px-4 py-2 border-b">Roles de aplicación</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
