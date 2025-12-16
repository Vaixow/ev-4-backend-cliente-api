/**
 * Muestra un mensaje en pantalla por un tiempo determinado.
 * @param {string} message - El mensaje que se mostrará.
 * @param {string} type - Tipo de mensaje ('success', 'error', 'info').
 */
function showMessage(message, type = 'info') {
    const container = document.createElement('div');
    container.className = `fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-md text-white ${getMessageTypeClass(type)}`;
    container.innerText = message;
    document.body.appendChild(container);

    setTimeout(() => container.remove(), 3000);
}

/**
 * Retorna la clase CSS correspondiente al tipo de mensaje.
 * @param {string} type - Tipo de mensaje ('success', 'error', 'info').
 * @returns {string} Clase CSS asociada al tipo de mensaje.
 */
function getMessageTypeClass(type) {
    switch (type) {
        case 'success':
            return 'bg-green-500';
        case 'error':
            return 'bg-red-500';
        default:
            return 'bg-blue-500';
    }
}

/**
 * Abre un modal especificado por su ID.
 * @param {string} modalId - El ID del modal que se desea abrir.
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
    } else {
        console.error(`El modal con ID ${modalId} no existe.`);
    }
}

/**
 * Cierra un modal especificado por su ID.
 * @param {string} modalId - El ID del modal que se desea cerrar.
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
    } else {
        console.error(`El modal con ID ${modalId} no existe.`);
    }
}

/**
 * Maneja errores fetch de la API.
 * @param {Error} error - Excepción lanzada por una petición fallida.
 */
function handleApiError(error) {
    console.error('Error en la API:', error);
    showMessage('Error al conectar con la API. Por favor, inténtalo de nuevo.', 'error');
}