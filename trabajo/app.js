
    // ==========================================
    // 🛡️ 1. PROTOCOLO DE SEGURIDAD (CHECKPOINT)
    // ==========================================
    const sesion = localStorage.getItem('sesionActiva');
    if (sesion !== 'true') {
        alert("⛔ Acceso Denegado: Debe iniciar sesión.");
        window.location.href = 'login.html';
    }

    // ==========================================
    // 🎓 2. GESTIÓN DE ESTUDIANTES CON INSCRIPCIÓN
    // ==========================================
    let listaEstudiantes = [];
    let indiceEditando = -1;
    let paginaActual = 1;
    const itemsPorPagina = 5;

    // Referencias a elementos
    const formulario = document.getElementById('formulario-inscripcion');
    const buscador = document.getElementById('buscador-estudiantes');
    const btnSalir = document.getElementById('btn-cerrar-sesion');
    const toggleTema = document.getElementById('toggle-tema');

    // ==========================================
    // 📥 3. CARGAR DATOS AL INICIAR
    // ==========================================
    document.addEventListener('DOMContentLoaded', () => {
        const datosGuardados = localStorage.getItem('estudiantesCenit');
        if (datosGuardados) {
            listaEstudiantes = JSON.parse(datosGuardados);
        } else {
            // Datos de ejemplo
            listaEstudiantes = [
                {
                    id: Date.now() - 1000000,
                    nombre: 'Sofía',
                    apellidos: 'Tamayo Pérez',
                    matricula: '2024-001',
                    email: 'sofia.tamayo@cenit.ni',
                    telefono: '8888-1234',
                    fechaNacimiento: '2002-05-15',
                    genero: 'Femenino',
                    direccion: 'Managua',
                    carrera: 'Ingeniería en Sistemas',
                    semestre: '4',
                    nota: 85,
                    estado: '✅ Aprobado',
                    clase: 'aprobado',
                    fechaInscripcion: new Date().toLocaleDateString()
                },
                {
                    id: Date.now() - 2000000,
                    nombre: 'Natalia',
                    apellidos: 'Cardona López',
                    matricula: '2024-002',
                    email: 'natalia.cardona@cenit.ni',
                    telefono: '8888-5678',
                    fechaNacimiento: '2001-08-22',
                    genero: 'Femenino',
                    direccion: 'León',
                    carrera: 'Ingeniería en Software',
                    semestre: '4',
                    nota: 65,
                    estado: '❌ Reprobado',
                    clase: 'reprobado',
                    fechaInscripcion: new Date().toLocaleDateString()
                }
            ];
        }
        renderizarTabla();
        actualizarContador();
        
        // Quitar foco de botones
        document.querySelectorAll('.sidebar a, .btn-top').forEach(boton => {
            boton.addEventListener('click', () => boton.blur());
        });
    });

    // ==========================================
    // 📝 4. FORMULARIO DE INSCRIPCIÓN
    // ==========================================
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();

            // Capturar valores
            const nombre = document.getElementById('nombre').value;
            const apellidos = document.getElementById('apellidos').value;
            const matricula = document.getElementById('matricula').value;
            const email = document.getElementById('email').value;
            const telefono = document.getElementById('telefono').value;
            const fechaNacimiento = document.getElementById('fecha-nacimiento').value;
            const genero = document.getElementById('genero').value;
            const direccion = document.getElementById('direccion').value;
            const carrera = document.getElementById('carrera').value;
            const semestre = document.getElementById('semestre').value;

            // Validaciones
            if (/\d/.test(nombre) || /\d/.test(apellidos)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de Validación',
                    text: 'Los nombres y apellidos no pueden contener números',
                    confirmButtonColor: '#3B82F6'
                });
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Email Inválido',
                    text: 'Por favor ingrese un correo electrónico válido',
                    confirmButtonColor: '#3B82F6'
                });
                return;
            }

            const telefonoRegex = /^[0-9-]+$/;
            if (!telefonoRegex.test(telefono)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Teléfono Inválido',
                    text: 'El teléfono solo puede contener números y guiones',
                    confirmButtonColor: '#3B82F6'
                });
                return;
            }

            const matriculaExiste = listaEstudiantes.some(e => e.matricula === matricula && listaEstudiantes.indexOf(e) !== indiceEditando);
            if (matriculaExiste) {
                Swal.fire({
                    icon: 'error',
                    title: 'Matrícula Duplicada',
                    text: 'Ya existe un estudiante con esta matrícula',
                    confirmButtonColor: '#3B82F6'
                });
                return;
            }

            // Crear objeto estudiante
            const estudiante = {
                id: indiceEditando === -1 ? Date.now() : listaEstudiantes[indiceEditando].id,
                nombre: nombre,
                apellidos: apellidos,
                matricula: matricula,
                email: email,
                telefono: telefono,
                fechaNacimiento: fechaNacimiento,
                genero: genero || 'No especificado',
                direccion: direccion || 'No especificada',
                carrera: carrera,
                semestre: semestre,
                nota: 0,
                estado: '⏳ Pendiente',
                clase: 'pendiente',
                fechaInscripcion: indiceEditando === -1 ? new Date().toLocaleDateString() : listaEstudiantes[indiceEditando].fechaInscripcion,
                fechaActualizacion: new Date().toLocaleDateString()
            };

            // Guardar
            if (indiceEditando === -1) {
                listaEstudiantes.push(estudiante);
                Swal.fire({
                    icon: 'success',
                    title: '¡Inscripción Exitosa!',
                    text: `El estudiante ${nombre} ${apellidos} ha sido inscrito correctamente`,
                    timer: 2000,
                    showConfirmButton: false
                });
            } else {
                listaEstudiantes[indiceEditando] = estudiante;
                indiceEditando = -1;
                document.getElementById('btn-texto').textContent = 'Guardar Inscripción';
                Swal.fire({
                    icon: 'success',
                    title: '¡Actualización Exitosa!',
                    text: 'Los datos del estudiante han sido actualizados',
                    timer: 2000,
                    showConfirmButton: false
                });
            }

            guardarEnDisco();
            renderizarTabla();
            actualizarContador();
            limpiarFormulario();
        });
    }

    // ==========================================
    // 🎨 5. RENDERIZAR TABLA CON PAGINACIÓN
    // ==========================================
    function renderizarTabla() {
        const tbody = document.getElementById('lista-estudiantes');
        if (!tbody) return;

        tbody.innerHTML = '';

        const inicio = (paginaActual - 1) * itemsPorPagina;
        const fin = inicio + itemsPorPagina;
        const estudiantesPagina = listaEstudiantes.slice(inicio, fin);

        estudiantesPagina.forEach((estudiante) => {
            const indexReal = listaEstudiantes.findIndex(e => e.id === estudiante.id);
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td><strong>${estudiante.matricula}</strong></td>
                <td>${estudiante.nombre} ${estudiante.apellidos}</td>
                <td>${estudiante.email}</td>
                <td>${estudiante.telefono}</td>
                <td>${estudiante.carrera}</td>
                <td>${estudiante.semestre}°</td>
                <td class="${estudiante.clase || 'pendiente'}">${estudiante.estado}</td>
                <td>
                    <button onclick="verDetalle(${indexReal})" class="btn-ver" title="Ver detalle"><i class="fas fa-eye"></i></button>
                    <button onclick="cargarParaEditar(${indexReal})" class="btn-editar" title="Editar"><i class="fas fa-pen"></i></button>
                    <button onclick="eliminarEstudiante(${indexReal})" class="btn-eliminar" title="Eliminar"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(fila);
        });

        const totalPaginas = Math.ceil(listaEstudiantes.length / itemsPorPagina) || 1;
        document.getElementById('pagina-actual').textContent = `Página ${paginaActual} de ${totalPaginas}`;
        
        const btnAnterior = document.getElementById('btn-anterior');
        const btnSiguiente = document.getElementById('btn-siguiente');
        
        if (btnAnterior) btnAnterior.disabled = paginaActual === 1;
        if (btnSiguiente) btnSiguiente.disabled = paginaActual >= totalPaginas;
    }

    // ==========================================
    // 🔍 6. SISTEMA DE BÚSQUEDA
    // ==========================================
    if (buscador) {
        buscador.addEventListener('input', function(e) {
            const texto = e.target.value.toLowerCase();
            
            if (texto === '') {
                renderizarTabla();
                return;
            }

            const resultados = listaEstudiantes.filter(est => 
                est.nombre.toLowerCase().includes(texto) ||
                est.apellidos.toLowerCase().includes(texto) ||
                est.matricula.toLowerCase().includes(texto) ||
                est.email.toLowerCase().includes(texto) ||
                est.carrera.toLowerCase().includes(texto)
            );

            const tbody = document.getElementById('lista-estudiantes');
            tbody.innerHTML = '';
            
            resultados.forEach((estudiante) => {
                const indexReal = listaEstudiantes.findIndex(e => e.id === estudiante.id);
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td><strong>${estudiante.matricula}</strong></td>
                    <td>${estudiante.nombre} ${estudiante.apellidos}</td>
                    <td>${estudiante.email}</td>
                    <td>${estudiante.telefono}</td>
                    <td>${estudiante.carrera}</td>
                    <td>${estudiante.semestre}°</td>
                    <td class="${estudiante.clase || 'pendiente'}">${estudiante.estado}</td>
                    <td>
                        <button onclick="verDetalle(${indexReal})" class="btn-ver"><i class="fas fa-eye"></i></button>
                        <button onclick="cargarParaEditar(${indexReal})" class="btn-editar"><i class="fas fa-pen"></i></button>
                        <   onclick="eliminarEstudiante(${indexReal})" class="btn-eliminar"><i class="fas fa-trash"></i></button>
                    </td>
                `;
                tbody.appendChild(fila);
            });

            if (resultados.length === 0) {
                tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 2rem;">No se encontraron resultados</td></tr>';
            }
        });
    }

    // ==========================================
    // 👁️ 7. VER DETALLE DEL ESTUDIANTE
    // ==========================================
    window.verDetalle = function(index) {
        const est = listaEstudiantes[index];
        Swal.fire({
            title: 'Detalle del Estudiante',
            html: `
                <div style="text-align: left;">
                    <p><strong>Matrícula:</strong> ${est.matricula}</p>
                    <p><strong>Nombre:</strong> ${est.nombre} ${est.apellidos}</p>
                    <p><strong>Email:</strong> ${est.email}</p>
                    <p><strong>Teléfono:</strong> ${est.telefono}</p>
                    <p><strong>Fecha Nacimiento:</strong> ${est.fechaNacimiento}</p>
                    <p><strong>Género:</strong> ${est.genero}</p>
                    <p><strong>Dirección:</strong> ${est.direccion}</p>
                    <p><strong>Carrera:</strong> ${est.carrera}</p>
                    <p><strong>Semestre:</strong> ${est.semestre}°</p>
                    <p><strong>Estado:</strong> <span class="${est.clase}">${est.estado}</span></p>
                    <p><strong>Fecha Inscripción:</strong> ${est.fechaInscripcion}</p>
                    ${est.fechaActualizacion ? `<p><strong>Última Actualización:</strong> ${est.fechaActualizacion}</p>` : ''}
                </div>
            `,
            icon: 'info',
            confirmButtonColor: '#3B82F6'
        });
    };

    // ==========================================
    // ✏️ 8. CARGAR PARA EDITAR
    // ==========================================
    window.cargarParaEditar = function(index) {
        const est = listaEstudiantes[index];
        
        document.getElementById('nombre').value = est.nombre;
        document.getElementById('apellidos').value = est.apellidos;
        document.getElementById('matricula').value = est.matricula;
        document.getElementById('email').value = est.email;
        document.getElementById('telefono').value = est.telefono;
        document.getElementById('fecha-nacimiento').value = est.fechaNacimiento;
        document.getElementById('genero').value = est.genero;
        document.getElementById('direccion').value = est.direccion;
        document.getElementById('carrera').value = est.carrera;
        document.getElementById('semestre').value = est.semestre;

        indiceEditando = index;
        document.getElementById('btn-texto').textContent = 'Actualizar Datos';
        document.getElementById('btn-submit').classList.add('campo-editando-animado');

        document.getElementById('formulario-inscripcion').scrollIntoView({ behavior: 'smooth' });

        Swal.fire({
            icon: 'info',
            title: 'Modo Edición',
            text: 'Estás editando los datos del estudiante',
            timer: 1500,
            showConfirmButton: false
        });
    };

    // ==========================================
    // 🧹 9. LIMPIAR FORMULARIO
    // ==========================================
    window.limpiarFormulario = function() {
        document.getElementById('formulario-inscripcion').reset();
        indiceEditando = -1;
        document.getElementById('btn-texto').textContent = 'Guardar Inscripción';
        document.getElementById('btn-submit').classList.remove('campo-editando-animado');
    };

    // ==========================================
    // 📄 10. PAGINACIÓN
    // ==========================================
    window.cambiarPagina = function(direccion) {
        if (direccion === 'anterior' && paginaActual > 1) {
            paginaActual--;
        } else if (direccion === 'siguiente' && paginaActual < Math.ceil(listaEstudiantes.length / itemsPorPagina)) {
            paginaActual++;
        }
        renderizarTabla();
    };

    // ==========================================
    // 📊 11. ACTUALIZAR CONTADOR
    // ==========================================
    function actualizarContador() {
        const totalSpan = document.getElementById('total-estudiantes');
        if (totalSpan) {
            totalSpan.textContent = `Total: ${listaEstudiantes.length} estudiantes`;
        }
    }

    // ==========================================
    // 🗑️ 12. ELIMINAR ESTUDIANTE
    // ==========================================
    window.eliminarEstudiante = function(index) {
        Swal.fire({
            title: '¿Eliminar estudiante?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e74c3c',
            cancelButtonColor: '#3B82F6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                listaEstudiantes.splice(index, 1);
                guardarEnDisco();
                renderizarTabla();
                actualizarContador();
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado',
                    text: 'El estudiante ha sido eliminado',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };

    // ==========================================
    // 💾 13. GUARDAR EN DISCO
    // ==========================================
    function guardarEnDisco() {
        localStorage.setItem('estudiantesCenit', JSON.stringify(listaEstudiantes));
    }

    // ==========================================
    // 📄 14. GENERAR REPORTE
    // ==========================================
      
        function generarPDF(seccion) {
            // Determinar qué contenido vamos a exportar según la sección
            let elemento = null;
            let nombreArchivo = 'reporte.pdf';
            
            switch(seccion) {
                case 'estudiantes':
                    elemento = document.querySelector('#vista-estudiantes .card:last-child');
                    nombreArchivo = 'lista_estudiantes.pdf';
                    break;
                case 'dashboard':
                    elemento = document.querySelector('#vista-dashboard');
                    nombreArchivo = 'dashboard.pdf';
                    break;
                case 'usuarios':
                    elemento = document.querySelector('#vista-usuarios .card');
                    nombreArchivo = 'usuarios.pdf';
                    break;
                default:
                    // Si no hay sección específica, toma la vista actual
                    elemento = document.querySelector('.vista.activo');
                    nombreArchivo = 'reporte_general.pdf';
            }
            
            if (!elemento) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo encontrar el contenido para generar el PDF'
                });
                return;
            }
            
            // Opciones para el PDF
            const opciones = {
                margin: [0.5, 0.5, 0.5, 0.5],
                filename: nombreArchivo,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, letterRendering: true },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            };
            
            // Mostrar mensaje de carga
            Swal.fire({
                title: 'Generando PDF...',
                text: 'Por favor espere',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            
            // Generar y descargar PDF
            html2pdf().set(opciones).from(elemento).save().then(() => {
                Swal.close();
                Swal.fire({
                    icon: 'success',
                    title: 'PDF Generado',
                    text: 'El documento se ha descargado correctamente',
                    timer: 2000,
                    showConfirmButton: false
                });
            }).catch(error => {
                Swal.close();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al generar el PDF'
                });
                console.error(error);
            });
        }


    // ==========================================
    // 📺 15. NAVEGACIÓN ENTRE PANTALLAS
    // ==========================================
    window.cambiarVista = function(vista) {
        document.querySelectorAll('.vista').forEach(v => v.classList.remove('activo'));
        document.getElementById(`vista-${vista}`).classList.add('activo');
        
        document.querySelectorAll('.menu-links a').forEach(a => a.classList.remove('active'));
        document.getElementById(`link-${vista}`).classList.add('active');
    };

    // ==========================================
    // 🔐 16. CIERRE DE SESIÓN
    // ==========================================
    if (btnSalir) {
        btnSalir.addEventListener('click', function() {
            Swal.fire({
                title: '¿Cerrar sesión?',
                text: "Saldrás del sistema de gestión",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#e74c3c',
                cancelButtonColor: '#3B82F6',
                confirmButtonText: 'Sí, salir',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem('sesionActiva');
                    window.location.href = 'login.html';
                }
            });
        });
    }

    // ==========================================
    // 🌙 17. MODO OSCURO
    // ==========================================
    if (localStorage.getItem('modoOscuro') === 'activado') {
        document.body.classList.add('modo-oscuro');
        if (toggleTema) toggleTema.checked = true;
    }

    if (toggleTema) {
        toggleTema.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('modo-oscuro');
                localStorage.setItem('modoOscuro', 'activado');
            } else {
                document.body.classList.remove('modo-oscuro');
                localStorage.setItem('modoOscuro', 'desactivado');
            }
        });
    }
