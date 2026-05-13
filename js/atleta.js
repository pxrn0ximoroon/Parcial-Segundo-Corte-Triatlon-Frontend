const BASE_URL = 'http://localhost:8081/atleta';


let enviando = false;

function crearAtleta() {
    if (enviando) return;
    enviando = true;

    const atleta = {
        nombre: document.getElementById('nombre').value,
        identificacion: document.getElementById('identificacion').value,
        email: document.getElementById('email').value,
        edad: parseInt(document.getElementById('edad').value),
        genero: document.getElementById('genero').value,
        especialidad: document.getElementById('especialidad').value,
        modalidadCross: document.getElementById('modalidadCross').checked
    };

    const fotoInput = document.getElementById('foto');
    const file = fotoInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onloadend = function(e) {
            atleta.foto = e.target.result.split(',')[1];
            enviarAtleta(atleta);
            enviando = false;
        };
        reader.readAsDataURL(file);
    } else {
        enviarAtleta(atleta);
        enviando = false;
    }
}

function enviarAtleta(atleta) {
    fetch(`${BASE_URL}/crear`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(atleta)
    })
    .then(response => response.json())
    .then(data => {
        mostrarMensaje('mensaje', 'Atleta registrado exitosamente', 'success');
    })
    .catch(error => {
        mostrarMensaje('mensaje', 'Error al registrar atleta', 'danger');
    });
}


function modificarNombre() {
    const id = document.getElementById('idAtleta').value;
    const nombre = document.getElementById('nuevoNombre').value;
    fetch(`${BASE_URL}/${id}/nombre?nombre=${nombre}`, { method: 'PUT' })
    .then(response => response.json())
    .then(data => {
        mostrarMensaje('mensajeNombre', 'Nombre modificado exitosamente', 'success');
    })
    .catch(error => {
        mostrarMensaje('mensajeNombre', 'Error al modificar nombre', 'danger');
    });
}

function modificarIdentificacion() {
    const id = document.getElementById('idAtleta').value;
    const identificacion = document.getElementById('nuevaIdentificacion').value;
    fetch(`${BASE_URL}/${id}/identificacion?identificacion=${identificacion}`, { method: 'PUT' })
    .then(response => response.json())
    .then(data => {
        mostrarMensaje('mensajeIdentificacion', 'Identificación modificada exitosamente', 'success');
    })
    .catch(error => {
        mostrarMensaje('mensajeIdentificacion', 'Error al modificar identificación', 'danger');
    });
}
function modificarCategoria() {
    const id = document.getElementById('idAtleta').value;
    const categoria = document.getElementById('nuevaCategoria').value;
    fetch(`${BASE_URL}/${id}/categoria?categoria=${categoria}`, { method: 'PUT' })
    .then(response => response.json())
    .then(data => {
        mostrarMensaje('mensajeCategoria', 'Categoría modificada exitosamente', 'success');
    })
    .catch(error => {
        mostrarMensaje('mensajeCategoria', 'Error al modificar categoría', 'danger');
    });
}


function consultarPorIdentificacion() {
    const identificacion = document.getElementById('buscarIdentificacion').value;

    fetch(`${BASE_URL}/identificacion/${identificacion}`)
    .then(response => response.json())
    .then(data => {
        mostrarTabla([data], 'resultado');
    })
    .catch(error => {
        mostrarMensaje('resultado', 'Atleta no encontrado', 'danger');
    });
}

function consultarPorGenero() {
    const genero = document.getElementById('buscarGenero').value;

    fetch(`${BASE_URL}/genero/${genero}`)
    .then(response => response.json())
    .then(data => {
        mostrarTabla(data, 'resultado');
    })
    .catch(error => {
        mostrarMensaje('resultado', 'Error al consultar', 'danger');
    });
}

function consultarPorCategoria() {
    const categoria = document.getElementById('buscarCategoria').value;

    fetch(`${BASE_URL}/categoria/${categoria}`)
    .then(response => response.json())
    .then(data => {
        mostrarTabla(data, 'resultado');
    })
    .catch(error => {
        mostrarMensaje('resultado', 'Error al consultar', 'danger');
    });
}

function consultarPorEspecialidad() {
    const especialidad = document.getElementById('buscarEspecialidad').value;

    fetch(`${BASE_URL}/especialidad/${especialidad}`)
    .then(response => response.json())
    .then(data => {
        mostrarTabla(data, 'resultado');
    })
    .catch(error => {
        mostrarMensaje('resultado', 'Error al consultar', 'danger');
    });
}

function consultarPorCross() {
    const cross = document.getElementById('buscarCross').value;

    fetch(`${BASE_URL}/cross/${cross}`)
    .then(response => response.json())
    .then(data => {
        mostrarTabla(data, 'resultado');
    })
    .catch(error => {
        mostrarMensaje('resultado', 'Error al consultar', 'danger');
    });
}


function eliminarAtleta() {
    const identificacion = document.getElementById('idEliminar').value;

    fetch(`${BASE_URL}/identificacion/${identificacion}`, {
        method: 'DELETE'
    })
    .then(response => {
        mostrarMensaje('mensaje', 'Atleta eliminado exitosamente', 'success');
    })
    .catch(error => {
        mostrarMensaje('mensaje', 'Error al eliminar atleta', 'danger');
    });
}


function mostrarMensaje(elementId, mensaje, tipo) {
    document.getElementById(elementId).innerHTML = `
        <div class="alert alert-${tipo}">${mensaje}</div>
    `;
}

function mostrarTabla(atletas, elementId) {
    if (!atletas || atletas.length === 0) {
        mostrarMensaje(elementId, 'No se encontraron atletas', 'warning');
        return;
    }
    function modificarEspecialidad() {
    const id = document.getElementById('idAtleta').value;
    const especialidad = document.getElementById('nuevaEspecialidad').value;
    fetch(`${BASE_URL}/${id}/especialidad?especialidad=${especialidad}`, { method: 'PUT' })
    .then(response => response.json())
    .then(data => {
        mostrarMensaje('mensajeEspecialidad', 'Especialidad modificada exitosamente', 'success');
    })
    .catch(error => {
        mostrarMensaje('mensajeEspecialidad', 'Error al modificar especialidad', 'danger');
    });
}

function modificarCross() {
    const id = document.getElementById('idAtleta').value;
    const modalidadCross = document.getElementById('nuevoCross').checked;
    fetch(`${BASE_URL}/${id}/cross?modalidadCross=${modalidadCross}`, { method: 'PUT' })
    .then(response => response.json())
    .then(data => {
        mostrarMensaje('mensajeCross', 'Modalidad Cross modificada exitosamente', 'success');
    })
    .catch(error => {
        mostrarMensaje('mensajeCross', 'Error al modificar modalidad Cross', 'danger');
    });
}

    let tabla = `
        <table class="table table-striped table-hover table-bordered">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Identificación</th>
                    <th>Email</th>
                    <th>Edad</th>
                    <th>Género</th>
                    <th>Categoría</th>
                    <th>Especialidad</th>
                    <th>Cross</th>
                    <th>Foto</th>
                </tr>
            </thead>
            <tbody>
    `;

    atletas.forEach(atleta => {
        tabla += `
            <tr>
                <td>${atleta.id}</td>
                <td>${atleta.nombre}</td>
                <td>${atleta.identificacion}</td>
                <td>${atleta.email}</td>
                <td>${atleta.edad}</td>
                <td>${atleta.genero}</td>
                <td>${atleta.categoria}</td>
                <td>${atleta.especialidad}</td>
                <td>${atleta.modalidadCross ? 'Sí' : 'No'}</td>
                <td>${atleta.fotoBase64 ? 
                    `<img src="${atleta.fotoBase64}" class="foto-atleta">`
                    : 'Sin foto'}</td>
            </tr>
        `;
    });

    tabla += `</tbody></table>`;
    document.getElementById(elementId).innerHTML = tabla;
}