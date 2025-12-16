const CALIFICACIONES_ENDPOINT = `${BASE_URL}/api/Calificacion/`;

function getAccessToken() {
    return localStorage.getItem('access');
}

function getAuthHeaders() {
    return { Authorization: `Bearer ${getAccessToken()}` };
}

function fetchCalificaciones() {
    fetch(CALIFICACIONES_ENDPOINT, {
        method: 'GET',
        headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.status === 401 || response.status === 403) {
            logoutUser();
        }
        return response.json();
    })
    .then(data => {
        const tbody = document.getElementById('calificaciones-tbody');
        tbody.innerHTML = '';
        data.forEach(calificacion => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4">${calificacion.id}</td>
                <td class="px-6 py-4">${calificacion.monto} CLP</td>
                <td class="px-6 py-4">${calificacion.tipo_movimiento}</td>
                <td class="px-6 py-4">${calificacion.estado}</td>
                <td class="px-6 py-4">${calificacion.fecha_registro}</td>
                <td class="px-6 py-4">${calificacion.usuario.username}</td>
                <td class="px-6 py-4">
                    <button onclick="deleteCalificacion(${calificacion.id})" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                        Eliminar
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(() => {
        alert('Error al cargar las calificaciones');
    });
}

function exportData(format) {
    const exportEndpoint = `${BASE_URL}/exportar/calificaciones/${format}`;
    fetch(exportEndpoint, {
        method: 'GET',
        headers: { ...getAuthHeaders() },
    })
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `calificaciones.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    })
    .catch(() => {
        alert('Error al exportar los datos');
    });
}