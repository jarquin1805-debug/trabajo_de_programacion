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

        // ===== MODALES (como en panel admin) =====
        function enviarMensaje() {
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const asunto = document.getElementById('asunto').value;
            const mensaje = document.getElementById('mensaje').value;

            if (!nombre || !email || !asunto || !mensaje) {
                Swal.fire({
                    icon: 'error',
                    title: 'Campos incompletos',
                    text: 'Por favor complete todos los campos requeridos',
                    confirmButtonColor: '#3B82F6',
                    background: '#1F2937',
                    color: '#F0F9FF'
                });
                return;
            }

            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Email inválido',
                    text: 'Por favor ingrese un correo electrónico válido',
                    confirmButtonColor: '#3B82F6',
                    background: '#1F2937',
                    color: '#F0F9FF'
                });
                return;
            }

            // Modal de carga
            Swal.fire({
                title: 'Enviando mensaje...',
                text: 'Por favor espere',
                allowOutsideClick: false,
                background: '#1F2937',
                color: '#F0F9FF',
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            // Simular envío
            setTimeout(() => {
                Swal.close();
                Swal.fire({
                    icon: 'success',
                    title: '¡Mensaje enviado!',
                    html: `Gracias <strong>${nombre}</strong>, te contactaremos pronto`,
                    timer: 3000,
                    showConfirmButton: false,
                    background: '#1F2937',
                    color: '#F0F9FF'
                });
                
                // Limpiar formulario (opcional)
                document.getElementById('contactForm').reset();
            }, 1500);
        }

        function enviarEmail(event) {
            event.preventDefault();
            Swal.fire({
                icon: 'info',
                title: 'Correo electrónico',
                text: 'hola@zenith.tech',
                confirmButtonColor: '#3B82F6',
                background: '#1F2937',
                color: '#F0F9FF'
            });
        }

        function mostrarTelefono(event) {
            event.preventDefault();
            Swal.fire({
                icon: 'info',
                title: 'Teléfono de contacto',
                text: '+(505) 7539-6621',
                confirmButtonColor: '#3B82F6',
                background: '#1F2937',
                color: '#F0F9FF'
            });
        }

        // Cerrar menú al hacer clic fuera
        window.addEventListener('click', function(event) {
            const menu = document.getElementById('navMenu');
            const toggle = document.querySelector('.menu-toggle');
            if (menu && toggle && !menu.contains(event.target) && !toggle.contains(event.target) && menu.classList.contains('show')) {
                menu.classList.remove('show');
            }
        });