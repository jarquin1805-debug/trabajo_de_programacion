


        // ==========================================
        // 🎯 MODALES DE INSCRIPCIÓN (como en panel admin)
        // ==========================================
        
        function inscribirCurso(nombreCurso) {
            Swal.fire({
                title: 'Debes iniciar sesión para poder inscribirte',
                html: `tu deseas estudiar <strong>${nombreCurso}</strong>`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3B82F6',
                cancelButtonColor: '#6B7280',
                confirmButtonText: 'Sí, inscribirme' ,
                cancelButtonText: 'Cancelar',
                background: '#1F2937',
                color: '#F0F9FF'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡te ayudaremos de inmediato !',
                        html: `te deseamos lo mejor en <strong>${nombreCurso}</strong>`,
                        timer: 2000,
                        showConfirmButton: false,
                        background: '#1F2937',
                        color: '#F0F9FF'
                    });
                }
            });
        }

        // ==========================================
        // 🔍 MODAL DE FILTRO
        // ==========================================
        function filtrarCategoria(categoria) {
            Swal.fire({
                title: 'Filtrando cursos',
                html: `Mostrando cursos de <strong>${categoria}</strong>`,
                icon: 'info',
                timer: 1500,
                showConfirmButton: false,
                background: '#1F2937',
                color: '#F0F9FF'
            });
        }

        // ==========================================
        // 📢 MODAL DE NOTIFICACIONES
        // ==========================================
        function mostrarNotificaciones() {
            Swal.fire({
                title: 'Centro de Notificaciones',
                html: `
                    <div style="text-align: left;">
                        <p style="margin: 10px 0; color: #9BB5D9;">🔔 Nuevo curso: Blockchain Developer</p>
                        <p style="margin: 10px 0; color: #9BB5D9;">📢 Promoción: 20% en IA Avanzada</p>
                        <p style="margin: 10px 0; color: #9BB5D9;">⏰ Recordatorio: Webinar mañana</p>
                    </div>
                `,
                icon: 'info',
                confirmButtonColor: '#3B82F6',
                background: '#1F2937',
                color: '#F0F9FF'
            });
        }

        // ==========================================
        // ✉️ MODAL DE MENSAJES
        // ==========================================
        function mostrarMensajes() {
            Swal.fire({
                title: 'Bandeja de Mensajes',
                html: `
                    <div style="text-align: left;">
                        <p style="margin: 10px 0; color: #9BB5D9;"><strong>Admin:</strong> Bienvenido a Cenit Digital</p>
                        <p style="margin: 10px 0; color: #9BB5D9;"><strong>Soporte:</strong> Tu consulta fue respondida</p>
                        <p style="margin: 10px 0; color: #9BB5D9;"><strong>Sistema:</strong> Actualización completada</p>
                    </div>
                `,
                icon: 'info',
                confirmButtonColor: '#3B82F6',
                background: '#1F2937',
                color: '#F0F9FF'
            });
        }

        // ==========================================
        // 🚀 MODAL DE EXPLORAR CURSOS
        // ==========================================
        function explorarCursos() {
            Swal.fire({
                title: 'Explorar Cursos',
                html: 'Redirigiendo al catálogo completo de cursos...',
                icon: 'info',
                timer: 1500,
                showConfirmButton: false,
                background: '#1F2937',
                color: '#F0F9FF'
            }).then(() => {
                window.location.href = '#cursos';
            });
        }

        // ==========================================
        // ✨ MODAL DE BIENVENIDA (opcional)
        // ==========================================
        window.onload = function() {
            setTimeout(() => {
                Swal.fire({
                    title: '¡Bienvenido a Cenit Tecnológico!',
                    html: 'Descubre nuestros cursos de alta tecnología',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    background: '#1F2937',
                    color: '#F0F9FF'
                });
            }, 500);
        };
