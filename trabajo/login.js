
        // Base de datos de usuarios
        const usuarios = {
            admin: { usuario: 'AdJespinoza', password: 'admin123', nombre: 'Administrador', rol: 'admin' },
            docente: { usuario: 'DoNesAguilar', password: 'docente123', nombre: 'Docente', rol: 'docente' },
            estudiante: { usuario: 'Naaguilar', password: 'estudiante123', nombre: 'Estudiante', rol: 'estudiante' }
        };

        // Función para menú móvil
        function toggleMenu() {
            document.getElementById('navMenu').classList.toggle('show');
        }

        // Cerrar menú al hacer clic en un link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                document.getElementById('navMenu').classList.remove('show');
            });
        });

        // Función para seleccionar usuario (si decides mostrar el selector)
        function seleccionarUsuario(tipo) {
            document.querySelectorAll('.user-option').forEach(opt => opt.classList.remove('selected'));
            document.getElementById(`user-${tipo}`).classList.add('selected');
            document.getElementById('username').value = usuarios[tipo].usuario;
            document.getElementById('password').value = '';
            document.getElementById('errorMessage').classList.remove('show');
        }

        // Función de validación de login
        function validarLogin(event) {
            event.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorElement = document.getElementById('errorMessage');

            // Validar campos vacíos
            if (!username || !password) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campos vacíos',
                    text: 'Por favor ingrese usuario y contraseña',
                    confirmButtonColor: '#3B82F6',
                    background: '#1F2937',
                    color: '#F0F9FF'
                });
                return false;
            }

            // Buscar usuario
            let usuarioValido = null;
            for (const [tipo, datos] of Object.entries(usuarios)) {
                if (datos.usuario === username && datos.password === password) {
                    usuarioValido = datos;
                    break;
                }
            }

            if (usuarioValido) {
                // Guardar sesión
                localStorage.setItem('sesionActiva', 'true');
                localStorage.setItem('usuarioRol', usuarioValido.rol);
                localStorage.setItem('usuarioNombre', usuarioValido.nombre);
                
                Swal.fire({
                    icon: 'success',
                    title: `¡Bienvenido ${usuarioValido.nombre}!`,
                    text: 'Acceso concedido al sistema',
                    timer: 1500,
                    showConfirmButton: false,
                    background: '#1F2937',
                    color: '#F0F9FF'
                }).then(() => {
                    // Redirigir según el rol
                    if (usuarioValido.rol === 'admin') {
                        window.location.href = 'inicio_admin.html';
                    } else if (usuarioValido.rol === 'docente') {
                        window.location.href = 'inicio_docente.html';
                    } else {
                        window.location.href = 'inicio_estudiante.html';
                    }
                });
            } else {
                errorElement.classList.add('show');
                Swal.fire({
                    icon: 'error',
                    title: 'Error de autenticación',
                    text: 'Usuario o contraseña incorrectos',
                    confirmButtonColor: '#3B82F6',
                    background: '#1F2937',
                    color: '#F0F9FF'
                });
            }

            return false;
        }

        // Cerrar menú al hacer clic fuera
        window.addEventListener('click', function(event) {
            const menu = document.getElementById('navMenu');
            const toggle = document.querySelector('.menu-toggle');
            if (menu && toggle && !menu.contains(event.target) && !toggle.contains(event.target) && menu.classList.contains('show')) {
                menu.classList.remove('show');
            }
        });

        // Inicializar - ocultar selector por defecto (opcional)
        document.addEventListener('DOMContentLoaded', function() {
            // Si quieres mostrar el selector, cambia esto
            // document.querySelector('.user-selector').style.display = 'flex';
        });
