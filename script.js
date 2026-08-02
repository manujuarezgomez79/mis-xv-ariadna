/* ============================================
   INVITACIÓN WEB PREMIUM - XV AÑOS
   Script JavaScript - Funcionalidad Completa
   ============================================ */

// ============================================
// CONFIGURACIÓN CENTRALIZADA
// ============================================
// MODIFICA LOS DATOS A CONTINUACIÓN SEGÚN TU EVENTO
// ============================================
// DATOS DE LA QUINCEAÑERA
// ============================================
// nombreQuinceanera: Nombre completo que aparecerá en el título principal
//
// ============================================
// DATOS DEL EVENTO (FECHA, HORA, DIRECCIÓN)
// ============================================
// fechaEvento: Fecha y hora en formato ISO (YYYY-MM-DDTHH:MM:SS)
// salon: Nombre del salón o lugar del evento
// direccion: Dirección completa del evento
// mapa: Enlace de Google Maps para el botón "Cómo llegar"
//
// ============================================
// NÚMERO DE WHATSAPP PARA CONFIRMACIÓN
// ============================================
// whatsapp: Número en formato internacional sin + (ej: 5491112345678)
//
// ============================================
// ARCHIVOS MULTIMEDIA
// ============================================
// musica: Ruta del archivo de música de fondo (mp3)
// fotoPrincipal: Ruta de la fotografía principal (jpg, png, webp)
//
// ============================================
// DATOS BANCARIOS PARA REGALOS (TRANSFERENCIA)
// ============================================
// Estos datos se muestran al hacer clic en "Transferencia"
// alias: Alias de la cuenta para transferencias rápidas
// cbu: Clave Bancaria Uniforme (22 dígitos)
// cvu: Clave Virtual Uniforme para billeteras virtuales (22 dígitos)
// titular: Nombre del titular de la cuenta
// banco: Nombre del banco
// ============================================
const CONFIGURACION = {
    // Nombre de la quinceañera
    nombreQuinceanera: "Ariadna Maria Juarez Salvatierra",
    
    // Fecha y hora del evento (formato ISO: YYYY-MM-DDTHH:MM:SS)
    fechaEvento: "2026-09-25T22:00:00",
    
    // Información del salón
    salon: "Salón Real Hotel Carlos V",
    
    // Dirección del evento
    direccion: "25 de Mayo 330, San Miguel de Tucumán",
    
    // Enlace de Google Maps para "Cómo llegar"
    mapa: "https://maps.app.goo.gl/d4wiB1drPb8d12F27?g_st=aw",
    
    // Números de WhatsApp para confirmación (formato internacional sin +)
    whatsapp: ["5493812068302", "5493813577416"],
    
    // Ruta del archivo de música de fondo
    musica: "photograph.mpeg",
    
    // Ruta de la fotografía principal
    fotoPrincipal: "portada-principal.jpg",
    
    // Datos bancarios para regalos
    regalos: {
        alias: "ariadna.regaloxv.26",
        cvu: "0000003100091947043784",
        titular: "Gabriela Azucena Salvatierra",
        plataforma: "Mercado Pago"
    }
};

// ============================================
// SISTEMA DE INVITADOS
// ============================================
// Para agregar un nuevo invitado, copia y pega un objeto dentro del array
// Modifica el nombre, la cantidad de pases y el código según corresponda
const invitados = [
    {
        nombre: "Juan Pérez",
        pases: 2,
        codigo: "AMJS001"
    },
    {
        nombre: "María García",
        pases: 4,
        codigo: "AMJS002"
    },
    {
        nombre: "Carlos López",
        pases: 2,
        codigo: "AMJS003"
    }
    // Agrega más invitados aquí siguiendo el mismo formato
];

// ============================================
// GALERÍA DE FOTOGRAFÍAS
// ============================================
// Para agregar o modificar fotografías, edita las rutas en este array
const galeria = [
    "carrusel1.jpg",
    "carrusel2.jpg",
    "carrusel3.jpg",
    "carrusel4.jpg",
    "carrusel5.jpg"
    // Agrega más rutas de imágenes aquí
];

// ============================================
// VARIABLES GLOBALES
// ============================================
let audio = null;
let musicaReproduciendo = false;
let indiceGaleriaActual = 0;
let invitadoActual = null;
let particulasBienvenida = null;
let particulasPrincipal = null;

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    inicializarInvitacion();
});

function inicializarInvitacion() {
    // Configurar evento del sello
    configurarSello();
    
    // Inicializar partículas doradas
    inicializarParticulas();
    
    // Cargar datos de configuración
    cargarConfiguracion();
    
    // Detectar invitado (por parámetro URL o código)
    detectarInvitado();
    
    // Inicializar cuenta regresiva
    inicializarCuentaRegresiva();
    
    // Inicializar galería
    inicializarGaleria();
    
    // Configurar botones de copiar
    configurarBotonesCopiar();
    
    // Configurar botón de WhatsApp
    configurarBotonWhatsApp();
    
    // Configurar botón de mapa
    configurarBotonMapa();
    
    // Configurar reproductor de música
    configurarReproductorMusica();
    
    // Configurar animaciones de scroll
    configurarAnimacionesScroll();
    
    // Configurar opción de transferencia
    configurarOpcionTransferencia();
}

// ============================================
// SISTEMA DE PARTÍCULAS DORADAS
// ============================================
function inicializarParticulas() {
    // Partículas de la pantalla de bienvenida
    const canvasBienvenida = document.getElementById('particulas-canvas');
    if (canvasBienvenida) {
        particulasBienvenida = new SistemaParticulas(canvasBienvenida);
        particulasBienvenida.iniciar();
    }
    
    // Partículas de la invitación principal
    const canvasPrincipal = document.getElementById('particulas-canvas-principal');
    if (canvasPrincipal) {
        particulasPrincipal = new SistemaParticulas(canvasPrincipal);
        particulasPrincipal.iniciar();
    }
}

class SistemaParticulas {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particulas = [];
        this.numeroParticulas = 40;
        this.animando = false;
        
        this.ajustarTamano();
        window.addEventListener('resize', () => this.ajustarTamano());
    }
    
    ajustarTamano() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    crearParticula() {
        // Colores de pétalos: rosa pastel, rosa dorado, crema
        const colores = [
            'rgba(248, 232, 232, 0.7)',  // Rosa pastel
            'rgba(245, 224, 224, 0.7)',  // Rosa crema
            'rgba(212, 175, 55, 0.5)',   // Dorado sutil
            'rgba(255, 240, 245, 0.7)',  // Lavanda muy suave
            'rgba(250, 218, 221, 0.7)'   // Rosa claro
        ];
        
        return {
            x: Math.random() * this.canvas.width,
            y: -20,
            tamaño: Math.random() * 15 + 10,
            velocidadY: Math.random() * 0.8 + 0.3,
            velocidadX: (Math.random() - 0.5) * 0.8,
            opacidad: Math.random() * 0.4 + 0.3,
            rotacion: Math.random() * 360,
            rotacionVelocidad: (Math.random() - 0.5) * 1.5,
            oscilacion: Math.random() * Math.PI * 2,
            oscilacionVelocidad: Math.random() * 0.02 + 0.01,
            color: colores[Math.floor(Math.random() * colores.length)]
        };
    }
    
    iniciar() {
        for (let i = 0; i < this.numeroParticulas; i++) {
            this.particulas.push(this.crearParticula());
            // Distribuir partículas inicialmente en toda la pantalla
            this.particulas[i].y = Math.random() * this.canvas.height;
        }
        
        if (!this.animando) {
            this.animando = true;
            this.animar();
        }
    }
    
    animar() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particulas.forEach((particula, indice) => {
            // Actualizar posición
            particula.y += particula.velocidadY;
            particula.oscilacion += particula.oscilacionVelocidad;
            particula.x += Math.sin(particula.oscilacion) * 0.5 + particula.velocidadX;
            particula.rotacion += particula.rotacionVelocidad;
            
            // Reiniciar partícula si sale de la pantalla
            if (particula.y > this.canvas.height + 20) {
                particula.y = -20;
                particula.x = Math.random() * this.canvas.width;
            }
            
            // Dibujar pétalo
            this.ctx.save();
            this.ctx.translate(particula.x, particula.y);
            this.ctx.rotate(particula.rotacion * Math.PI / 180);
            this.ctx.globalAlpha = particula.opacidad;
            
            // Dibujar forma de pétalo (ovalo con punta)
            this.ctx.beginPath();
            this.ctx.fillStyle = particula.color;
            this.ctx.shadowColor = particula.color;
            this.ctx.shadowBlur = 5;
            
            // Forma de pétalo de flor
            this.ctx.moveTo(0, -particula.tamaño);
            this.ctx.bezierCurveTo(
                particula.tamaño * 0.6, -particula.tamaño * 0.3,
                particula.tamaño * 0.6, particula.tamaño * 0.3,
                0, particula.tamaño
            );
            this.ctx.bezierCurveTo(
                -particula.tamaño * 0.6, particula.tamaño * 0.3,
                -particula.tamaño * 0.6, -particula.tamaño * 0.3,
                0, -particula.tamaño
            );
            
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.restore();
        });
        
        requestAnimationFrame(() => this.animar());
    }
}

// ============================================
// CONFIGURACIÓN DEL SELLO Y APERTURA DEL SOBRE
// ============================================
function configurarSello() {
    const sello = document.getElementById('sello');
    const pantallaBienvenida = document.getElementById('pantalla-bienvenida');
    const invitacionPrincipal = document.getElementById('invitacion-principal');
    
    sello.addEventListener('click', function() {
        // Ocultar pantalla de bienvenida
        pantallaBienvenida.classList.add('oculta');
        
        // Mostrar invitación principal
        invitacionPrincipal.classList.add('visible');
        
        // Iniciar música después de la interacción del usuario
        iniciarMusica();
        
        // Activar animaciones de scroll
        activarAnimacionesScroll();
    });
}

// ============================================
// CARGAR CONFIGURACIÓN EN LA INTERFAZ
// ============================================
function cargarConfiguracion() {
    // Nombre de la quinceañera
    const nombreElement = document.getElementById('nombre-quinceanera');
    if (nombreElement) {
        nombreElement.textContent = CONFIGURACION.nombreQuinceanera;
    }
    
    // Fotografía principal
    const fotoElement = document.getElementById('foto-principal');
    if (fotoElement) {
        fotoElement.src = CONFIGURACION.fotoPrincipal;
    }
    
    // Información del evento
    const salonElement = document.getElementById('salon-nombre');
    if (salonElement) {
        salonElement.textContent = CONFIGURACION.salon;
    }
    
    const fechaElement = document.getElementById('evento-fecha');
    if (fechaElement) {
        const fecha = new Date(CONFIGURACION.fechaEvento);
        const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        fechaElement.textContent = fecha.toLocaleDateString('es-ES', opciones);
    }
    
    const horaElement = document.getElementById('evento-hora');
    if (horaElement) {
        const fecha = new Date(CONFIGURACION.fechaEvento);
        const opciones = { hour: '2-digit', minute: '2-digit' };
        horaElement.textContent = fecha.toLocaleTimeString('es-ES', opciones);
    }
    
    const direccionElement = document.getElementById('evento-direccion');
    if (direccionElement) {
        direccionElement.textContent = CONFIGURACION.direccion;
    }
    
    // Datos de regalos
    const aliasElement = document.getElementById('regalo-alias');
    if (aliasElement) {
        aliasElement.textContent = CONFIGURACION.regalos.alias;
    }
    
    const cvuElement = document.getElementById('regalo-cvu');
    if (cvuElement) {
        cvuElement.textContent = CONFIGURACION.regalos.cvu;
    }
    
    const titularElement = document.getElementById('regalo-titular');
    if (titularElement) {
        titularElement.textContent = CONFIGURACION.regalos.titular;
    }
    
    const plataformaElement = document.getElementById('regalo-plataforma');
    if (plataformaElement) {
        plataformaElement.textContent = CONFIGURACION.regalos.plataforma;
    }
}

// ============================================
// DETECTAR INVITADO
// ============================================
function detectarInvitado() {
    // Obtener código de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const codigoInvitado = urlParams.get('codigo');
    
    if (codigoInvitado) {
        // Buscar invitado por código
        invitadoActual = invitados.find(inv => inv.codigo === codigoInvitado);
    }
    
    // Mostrar información del invitado
    mostrarInformacionInvitado();
}

function mostrarInformacionInvitado() {
    const nombreElement = document.getElementById('invitado-nombre');
    const pasesElement = document.getElementById('invitado-pases');
    const seccionInvitado = document.getElementById('seccion-invitado');
    
    if (invitadoActual) {
        if (nombreElement) {
            nombreElement.textContent = invitadoActual.nombre;
        }
        if (pasesElement) {
            pasesElement.textContent = `Pases asignados: ${invitadoActual.pases}`;
        }
    } else {
        // Si no hay invitado específico, ocultar la sección
        if (seccionInvitado) {
            seccionInvitado.style.display = 'none';
        }
    }
}

// ============================================
// CUENTA REGRESIVA
// ============================================
function inicializarCuentaRegresiva() {
    actualizarCuentaRegresiva();
    setInterval(actualizarCuentaRegresiva, 1000);
}

function actualizarCuentaRegresiva() {
    const fechaEvento = new Date(CONFIGURACION.fechaEvento);
    const ahora = new Date();
    const diferencia = fechaEvento - ahora;
    
    const diasElement = document.getElementById('dias');
    const horasElement = document.getElementById('horas');
    const minutosElement = document.getElementById('minutos');
    const segundosElement = document.getElementById('segundos');
    const mensajeElement = document.getElementById('cuenta-mensaje');
    
    if (diferencia > 0) {
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
        
        if (diasElement) diasElement.textContent = dias.toString().padStart(2, '0');
        if (horasElement) horasElement.textContent = horas.toString().padStart(2, '0');
        if (minutosElement) minutosElement.textContent = minutos.toString().padStart(2, '0');
        if (segundosElement) segundosElement.textContent = segundos.toString().padStart(2, '0');
        
        if (mensajeElement) mensajeElement.textContent = '';
    } else {
        // El evento ya ocurrió
        if (diasElement) diasElement.textContent = '00';
        if (horasElement) horasElement.textContent = '00';
        if (minutosElement) minutosElement.textContent = '00';
        if (segundosElement) segundosElement.textContent = '00';
        
        if (mensajeElement) mensajeElement.textContent = '¡Hoy es el día especial!';
    }
}

// ============================================
// GALERÍA DE FOTOGRAFÍAS
// ============================================
function inicializarGaleria() {
    const galeriaImagenes = document.getElementById('galeria-imagenes');
    const galeriaIndicadores = document.getElementById('galeria-indicadores');
    
    if (!galeriaImagenes || !galeriaIndicadores) return;
    
    // Cargar imágenes
    galeria.forEach((ruta, indice) => {
        const img = document.createElement('img');
        img.src = ruta;
        img.alt = `Foto ${indice + 1}`;
        galeriaImagenes.appendChild(img);
        
        // Crear indicador
        const indicador = document.createElement('div');
        indicador.classList.add('galeria-indicador');
        if (indice === 0) indicador.classList.add('activo');
        indicador.addEventListener('click', () => irAImagen(indice));
        galeriaIndicadores.appendChild(indicador);
    });
    
    // Configurar botones de navegación
    const btnAnterior = document.getElementById('galeria-anterior');
    const btnSiguiente = document.getElementById('galeria-siguiente');
    
    if (btnAnterior) {
        btnAnterior.addEventListener('click', imagenAnterior);
    }
    
    if (btnSiguiente) {
        btnSiguiente.addEventListener('click', imagenSiguiente);
    }
    
    // Configurar deslizamiento táctil
    configurarDeslizamientoTactil();
}

function actualizarGaleria() {
    const galeriaImagenes = document.getElementById('galeria-imagenes');
    const indicadores = document.querySelectorAll('.galeria-indicador');
    
    if (galeriaImagenes) {
        galeriaImagenes.style.transform = `translateX(-${indiceGaleriaActual * 100}%)`;
    }
    
    indicadores.forEach((indicador, indice) => {
        if (indice === indiceGaleriaActual) {
            indicador.classList.add('activo');
        } else {
            indicador.classList.remove('activo');
        }
    });
}

function imagenAnterior() {
    if (indiceGaleriaActual > 0) {
        indiceGaleriaActual--;
        actualizarGaleria();
    } else {
        // Volver a la última imagen
        indiceGaleriaActual = galeria.length - 1;
        actualizarGaleria();
    }
}

function imagenSiguiente() {
    if (indiceGaleriaActual < galeria.length - 1) {
        indiceGaleriaActual++;
        actualizarGaleria();
    } else {
        // Volver a la primera imagen
        indiceGaleriaActual = 0;
        actualizarGaleria();
    }
}

function irAImagen(indice) {
    indiceGaleriaActual = indice;
    actualizarGaleria();
}

function configurarDeslizamientoTactil() {
    const galeriaCarrusel = document.querySelector('.galeria-carrusel');
    if (!galeriaCarrusel) return;
    
    let startX = 0;
    let endX = 0;
    
    galeriaCarrusel.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    }, { passive: true });
    
    galeriaCarrusel.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        manejarDeslizamiento();
    }, { passive: true });
    
    function manejarDeslizamiento() {
        const diferencia = startX - endX;
        const umbral = 50;
        
        if (diferencia > umbral) {
            // Deslizamiento a la izquierda - siguiente imagen
            imagenSiguiente();
        } else if (diferencia < -umbral) {
            // Deslizamiento a la derecha - imagen anterior
            imagenAnterior();
        }
    }
}

// ============================================
// BOTONES DE COPIAR
// ============================================
function configurarBotonesCopiar() {
    const botonesCopiar = document.querySelectorAll('.btn-copiar');
    
    botonesCopiar.forEach(boton => {
        boton.addEventListener('click', function() {
            const campo = this.getAttribute('data-campo');
            let textoACopiar = '';
            
            switch (campo) {
                case 'alias':
                    textoACopiar = CONFIGURACION.regalos.alias;
                    break;
                case 'cbu':
                    textoACopiar = CONFIGURACION.regalos.cbu;
                    break;
                case 'cvu':
                    textoACopiar = CONFIGURACION.regalos.cvu;
                    break;
            }
            
            copiarAlPortapapeles(textoACopiar);
        });
    });
}

function copiarAlPortapapeles(texto) {
    // Usar la API moderna de portapapeles
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(function() {
            mostrarNotificacion();
        }).catch(function(err) {
            // Fallback para navegadores antiguos
            copiarFallback(texto);
        });
    } else {
        // Fallback para navegadores antiguos
        copiarFallback(texto);
    }
}

function copiarFallback(texto) {
    const textarea = document.createElement('textarea');
    textarea.value = texto;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        mostrarNotificacion();
    } catch (err) {
        console.error('Error al copiar:', err);
    }
    
    document.body.removeChild(textarea);
}

function mostrarNotificacion() {
    const notificacion = document.getElementById('notificacion');
    if (notificacion) {
        notificacion.classList.add('visible');
        
        setTimeout(function() {
            notificacion.classList.remove('visible');
        }, 2000);
    }
}

// ============================================
// BOTÓN DE WHATSAPP
// ============================================
function configurarBotonWhatsApp() {
    const btnWhatsappAriadna = document.getElementById('btn-whatsapp-ariadna');
    const btnWhatsappGabriela = document.getElementById('btn-whatsapp-gabriela');
    
    if (btnWhatsappAriadna) {
        btnWhatsappAriadna.addEventListener('click', function() {
            generarMensajeWhatsApp(CONFIGURACION.whatsapp[0]);
        });
    }
    
    if (btnWhatsappGabriela) {
        btnWhatsappGabriela.addEventListener('click', function() {
            generarMensajeWhatsApp(CONFIGURACION.whatsapp[1]);
        });
    }
}

function generarMensajeWhatsApp(numero) {
    let mensaje = '';
    
    if (invitadoActual) {
        mensaje = `¡Hola! Confirmo la asistencia de ${invitadoActual.nombre} a los 15 años de ${CONFIGURACION.nombreQuinceanera}.`;
    } else {
        mensaje = `¡Hola! Confirmo mi asistencia a los 15 años de ${CONFIGURACION.nombreQuinceanera}.`;
    }
    
    const mensajeCodificado = encodeURIComponent(mensaje);
    const enlaceWhatsApp = `https://wa.me/${numero}?text=${mensajeCodificado}`;
    
    window.open(enlaceWhatsApp, '_blank');
}

// ============================================
// BOTÓN DE MAPA
// ============================================
function configurarBotonMapa() {
    const btnMapa = document.getElementById('btn-mapa');
    
    if (btnMapa) {
        btnMapa.addEventListener('click', function() {
            window.open(CONFIGURACION.mapa, '_blank');
        });
    }
}

// ============================================
// REPRODUCTOR DE MÚSICA
// ============================================
function configurarReproductorMusica() {
    const btnMusica = document.getElementById('btn-musica');
    
    if (btnMusica) {
        btnMusica.addEventListener('click', function() {
            toggleMusica();
        });
    }
}

function iniciarMusica() {
    // Crear elemento de audio
    audio = new Audio(CONFIGURACION.musica);
    audio.loop = true;
    audio.volume = 0.5;
    
    // Intentar reproducir
    audio.play().then(function() {
        musicaReproduciendo = true;
        actualizarEstadoReproductor();
    }).catch(function(err) {
        console.log('No se pudo reproducir la música automáticamente:', err);
        musicaReproduciendo = false;
        actualizarEstadoReproductor();
    });
}

function toggleMusica() {
    if (!audio) {
        iniciarMusica();
        return;
    }
    
    if (musicaReproduciendo) {
        audio.pause();
        musicaReproduciendo = false;
    } else {
        audio.play();
        musicaReproduciendo = true;
    }
    
    actualizarEstadoReproductor();
}

function actualizarEstadoReproductor() {
    const btnMusica = document.getElementById('btn-musica');
    
    if (btnMusica) {
        if (musicaReproduciendo) {
            btnMusica.classList.add('reproduciendo');
        } else {
            btnMusica.classList.remove('reproduciendo');
        }
    }
}

// ============================================
// CONFIGURACIÓN DE OPCIÓN DE TRANSFERENCIA
// ============================================
function configurarOpcionTransferencia() {
    const opcionTransferencia = document.getElementById('opcion-transferencia');
    const datosTransferencia = document.getElementById('regalos-datos-transferencia');
    
    if (opcionTransferencia && datosTransferencia) {
        opcionTransferencia.addEventListener('click', function() {
            datosTransferencia.classList.toggle('visible');
        });
    }
}

// ============================================
// ANIMACIONES DE SCROLL
// ============================================
function configurarAnimacionesScroll() {
    // Las animaciones se activarán después de abrir el sobre
}

function activarAnimacionesScroll() {
    const secciones = document.querySelectorAll('.seccion-hero, .seccion-cuenta-regresiva, .seccion-invitado, .seccion-galeria, .seccion-evento, .seccion-dresscode, .seccion-regalos, .seccion-confirmacion');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    secciones.forEach(seccion => {
        observer.observe(seccion);
    });
    
    // Activar la primera sección inmediatamente
    const primeraSeccion = document.querySelector('.seccion-hero');
    if (primeraSeccion) {
        primeraSeccion.classList.add('visible');
    }
}
