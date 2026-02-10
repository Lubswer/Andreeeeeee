// ==============================================
// CONFIGURACIÓN - Personaliza tu mensaje aquí
// ==============================================
const mensaje = `
Hola Andrea,
Hubo un día en que nos conocimos… y desde entonces, eres parte de todos mis días.

Cada uno de ellos lo paso tratando de no perderme en este mundo, solo para poder llegar a ti una vez más.

Porque a tu lado he podido sentir de verdad.

Sí, sentir: ese nerviosismo lindo cuando te acercas, ese palpitar fuerte en el pecho solo de saber de ti, esa emoción suave y llena de paz que me da hablar contigo. Saber lo que sabes, decirte lo que sé… compartirlo.

¿El amor puede doler bonito?
Sí, puede.

No todo ha sido fácil. Hubo días y días en que me sentí abandonado, ignorado, perdido en preguntas: ¿se fue? ¿algún día volverá? ¿qué hice mal? ¿por qué yo quería tanto que fueras tú?

Todo eso pasó por mi mente, una y otra vez. Un dolor que, aunque bonito en su intensidad, duele(bonito).

Pero nunca estuve solo. Siempre te llevé dentro de mí.

Te veo y te vi todos los días: en los amaneceres bonitos, en la música hermosa, en las acciones bondadosas de la gente, en mi propio ser. Lo que dejas en mí cada vez que estamos juntos son acciones bonitas que se reflejan en mí mismo.

Te veo reflejada en mis sueños más lindos, en las flores más bellas, en los aromas dulces y en las risas que no paran.

Te siento. Te amo. Te adoro.

No sólo hoy, ni solo mañana ni en una fecha: lo hago ahora y lo haré siempre.

Te amo, Andrea, hoy más que ayer y mañana más que hoy.

Hoy y siempre estaré para ti…

Con todo mi corazón,
Lubswer`;

// ==============================================
// ELEMENTOS DEL DOM
// ==============================================
const floatingContainer = document.getElementById('floatingElements');
const musicaFondo = document.getElementById('musicaFondo');
const musicaFondo2 = document.getElementById('musicaFondo2');

const acto1 = document.getElementById('acto1');
const acto2 = document.getElementById('acto2');
const acto3 = document.getElementById('acto3');

const envelope = document.getElementById('envelope');
const vintageLetter = document.getElementById('vintageLetter');
const letterText = document.getElementById('letterText');
const btnMemories = document.getElementById('btnMemories');
const hintText = document.querySelector('.hint-text');

// ==============================================
// ELEMENTOS FLOTANTES - Corazones y Estrellas
// ==============================================
function createFloatingElement() {
    const el = document.createElement('div');
    el.className = 'floating-item ' + (Math.random() > 0.2 ? 'heart' : 'star');
    el.textContent = el.classList.contains('heart') ? '♥' : '✦';
    el.style.left = Math.random() * 100 + '%';
    el.style.fontSize = (Math.random() * 20 + 14) + 'px';
    floatingContainer.appendChild(el);
    
    gsap.fromTo(el, {
        y: window.innerHeight + 50,
        x: (Math.random() - 0.5) * 100,
        opacity: 0,
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5
    }, {
        y: -100,
        x: '+=' + ((Math.random() - 0.5) * 200),
        opacity: 0.7,
        rotation: '+=' + (Math.random() * 360),
        duration: Math.random() * 10 + 8,
        ease: 'none',
        onComplete: () => el.remove()
    });
}

function startFloatingElements() {
    // Crear algunos elementos iniciales
    for (let i = 0; i < 20; i++) {
        setTimeout(createFloatingElement, i * 100);
    }
    setInterval(createFloatingElement, 150);
}

// ==============================================
// EXPLOSIÓN DE CORAZONES Y ESTRELLAS
// ==============================================
function burstHearts() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const numElements = 80;
    
    for (let i = 0; i < numElements; i++) {
        setTimeout(() => {
            const el = document.createElement('div');
            el.className = 'floating-item burst ' + (Math.random() > 0.15 ? 'heart' : 'star');
            el.textContent = el.classList.contains('heart') ? '♥' : '✦';
            el.style.left = centerX + 'px';
            el.style.top = centerY + 'px';
            el.style.fontSize = (Math.random() * 25 + 15) + 'px';
            el.style.position = 'fixed';
            floatingContainer.appendChild(el);
            
            // Dirección aleatoria en todas direcciones
            const angle = (Math.PI * 2 * i / numElements) + (Math.random() - 0.5) * 0.5;
            const distance = Math.random() * 400 + 200;
            const destX = Math.cos(angle) * distance;
            const destY = Math.sin(angle) * distance;
            
            gsap.fromTo(el, {
                x: 0,
                y: 0,
                scale: 0,
                opacity: 0,
                rotation: 0
            }, {
                x: destX,
                y: destY,
                scale: Math.random() * 1.5 + 0.8,
                opacity: 1,
                rotation: Math.random() * 720 - 360,
                duration: 0.8,
                ease: 'power2.out',
                onComplete: () => {
                    // Después de la explosión, flotan hacia arriba y desaparecen
                    gsap.to(el, {
                        y: '-=300',
                        opacity: 0,
                        rotation: '+=180',
                        duration: 2,
                        ease: 'power1.in',
                        delay: Math.random() * 0.5,
                        onComplete: () => el.remove()
                    });
                }
            });
        }, i * 15);
    }
}

// ==============================================
// ACTO 1: ANIMACIÓN INICIAL DEL SOBRE
// ==============================================
function initActo1() {
    gsap.fromTo(envelope, 
        { opacity: 0, scale: 0.8, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 0.3 }
    );
    
    gsap.fromTo(hintText,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 1.5, ease: 'power2.out' }
    );
}

// ==============================================
// TRANSICIÓN: ACTO 1 → ACTO 2
// ==============================================
envelope.addEventListener('click', () => {
    abrirSobre();
});

function abrirSobre() {
    if (envelope.classList.contains('clicked')) return;
    
    envelope.classList.add('clicked');
    
    // Reproducir música de fondo
    musicaFondo.volume = 0.5;
    musicaFondo.play().catch(e => console.log('Audio play prevented:', e));
    
    gsap.to(hintText, {
        opacity: 0,
        duration: 0.5
    });
    
    gsap.to(acto1, {
        opacity: 0,
        duration: 1,
        delay: 1,
        ease: 'power2.inOut',
        onComplete: () => {
            acto1.classList.remove('visible');
            acto2.classList.add('visible');
            iniciarActo2();
        }
    });
}

// ==============================================
// ACTO 2: CARTA CON TEXTO ANIMADO
// ==============================================
function iniciarActo2() {
    gsap.fromTo(acto2, 
        { opacity: 0 },
        { opacity: 1, duration: 0.8 }
    );
    
    gsap.to(vintageLetter, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.3,
        ease: 'power2.out',
        onStart: () => vintageLetter.classList.add('visible'),
        onComplete: () => {
            setTimeout(() => typeWriter(mensaje, letterText, 50), 600);
        }
    });
}

// ==============================================
// EFECTO MÁQUINA DE ESCRIBIR SUAVE CON SCROLL AUTOMÁTICO
// ==============================================
function typeWriter(text, element, speed) {
    let i = 0;
    element.innerHTML = '';
    
    // Obtener el contenedor con scroll
    const scrollContainer = element.closest('.letter-content');
    
    function type() {
        if (i < text.length) {
            const char = text.charAt(i);
            
            // Crear un span con animación para cada carácter
            if (char === '\n') {
                element.innerHTML += '<br>';
            } else if (char === ' ') {
                element.innerHTML += ' ';
            } else {
                const span = document.createElement('span');
                span.className = 'char-fade';
                span.textContent = char;
                element.appendChild(span);
                
                // Activar la animación después de un pequeño delay
                requestAnimationFrame(() => {
                    span.classList.add('visible');
                });
            }
            i++;
            
            // Scroll automático suave hacia abajo
            if (scrollContainer) {
                scrollContainer.scrollTo({
                    top: scrollContainer.scrollHeight,
                    behavior: 'smooth'
                });
            }
            
            let delay = speed;
            
            if (char === '.' || char === '!' || char === '?') {
                delay = speed * 8;
            } else if (char === ',') {
                delay = speed * 4;
            } else if (char === '\n') {
                delay = speed * 3;
            }
            
            setTimeout(type, delay);
        } else {
            element.classList.add('finished');
            mostrarBotonRecuerdos();
        }
    }
    
    type();
}

function mostrarBotonRecuerdos() {
    gsap.to(btnMemories, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1.2,
        ease: 'power2.out',
        onStart: () => btnMemories.classList.add('visible')
    });
}

// ==============================================
// TRANSICIÓN: ACTO 2 → ACTO 3 (Timeline)
// ==============================================
btnMemories.addEventListener('click', () => {
    // Explosión de corazones
    burstHearts();
    
    gsap.to(acto2, {
        opacity: 0,
        duration: 1.2,
        delay: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
            acto2.classList.remove('visible');
            acto3.classList.add('visible');
            iniciarActo3();
        }
    });
});

// ==============================================
// ACTO 3: CONTADOR DESDE QUE NOS CONOCIMOS
// ==============================================
const fecha1 = new Date('2024-01-19T00:00:00');
const fecha2 = new Date('2024-06-05T00:00:00');

const acto4 = document.getElementById('acto4');
const btnPero = document.getElementById('btnPero');

function calcularTiempo(fechaInicio) {
    const ahora = new Date();
    let años = ahora.getFullYear() - fechaInicio.getFullYear();
    let meses = ahora.getMonth() - fechaInicio.getMonth();
    let días = ahora.getDate() - fechaInicio.getDate();
    let horas = ahora.getHours() - fechaInicio.getHours();
    let minutos = ahora.getMinutes() - fechaInicio.getMinutes();
    let segundos = ahora.getSeconds() - fechaInicio.getSeconds();
    
    if (segundos < 0) { segundos += 60; minutos--; }
    if (minutos < 0) { minutos += 60; horas--; }
    if (horas < 0) { horas += 24; días--; }
    if (días < 0) {
        const mesAnterior = new Date(ahora.getFullYear(), ahora.getMonth(), 0);
        días += mesAnterior.getDate();
        meses--;
    }
    if (meses < 0) { meses += 12; años--; }
    
    return { años, meses, días, horas, minutos, segundos };
}

function actualizarContador1() {
    const tiempo = calcularTiempo(fecha1);
    document.getElementById('years1').textContent = tiempo.años;
    document.getElementById('months1').textContent = tiempo.meses;
    document.getElementById('days1').textContent = tiempo.días;
    document.getElementById('hours1').textContent = tiempo.horas;
    document.getElementById('minutes1').textContent = tiempo.minutos;
    document.getElementById('seconds1').textContent = tiempo.segundos;
}

function actualizarContador2() {
    const tiempo = calcularTiempo(fecha2);
    document.getElementById('years2').textContent = tiempo.años;
    document.getElementById('months2').textContent = tiempo.meses;
    document.getElementById('days2').textContent = tiempo.días;
    document.getElementById('hours2').textContent = tiempo.horas;
    document.getElementById('minutes2').textContent = tiempo.minutos;
    document.getElementById('seconds2').textContent = tiempo.segundos;
}

function iniciarActo3() {
    gsap.fromTo(acto3, { opacity: 0 }, { opacity: 1, duration: 0.8 });
    
    const title = document.querySelector('.counter-title');
    const date = document.querySelector('.counter-date');
    const counterBox = document.getElementById('counter1');
    
    gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        onStart: () => title.classList.add('visible')
    });
    
    gsap.to(date, {
        opacity: 1,
        duration: 1,
        delay: 0.6,
        onStart: () => date.classList.add('visible')
    });
    
    gsap.to(counterBox, {
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 0.9,
        ease: 'back.out(1.5)',
        onStart: () => {
            counterBox.classList.add('visible');
            actualizarContador1();
            setInterval(actualizarContador1, 1000);
        }
    });
    
    gsap.to(btnPero, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1.5,
        ease: 'power2.out',
        onStart: () => btnPero.classList.add('visible')
    });
}

// ==============================================
// TRANSICIÓN: ACTO 3 → ACTO 4
// ==============================================
btnPero.addEventListener('click', () => {
    burstHearts();
    
    gsap.to(acto3, {
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
            acto3.classList.remove('visible');
            acto4.classList.add('visible');
            iniciarActo4();
        }
    });
});

// ==============================================
// ACTO 4: IMAGEN Y CONTADOR DE AMOR
// ==============================================
const sanValentinQuestion = document.getElementById('sanValentinQuestion');
const choiceButtons = document.getElementById('choiceButtons');
const btnSi = document.getElementById('btnSi');
const btnNo = document.getElementById('btnNo');
const acto5 = document.getElementById('acto5');

function iniciarActo4() {
    // Resetear botón No a su posición original
    btnNo.style.position = 'relative';
    btnNo.style.left = '0';
    btnNo.style.top = '0';
    btnNo.style.transform = '';
    
    gsap.fromTo(acto4, { opacity: 0 }, { opacity: 1, duration: 0.8 });
    
    const imageContainer = document.getElementById('loveImageContainer');
    const loveText = document.getElementById('loveText');
    const loveDate = document.getElementById('loveDate');
    const counter2 = document.getElementById('counter2');
    
    gsap.to(imageContainer, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        delay: 0.3,
        ease: 'back.out(1.7)',
        onStart: () => imageContainer.classList.add('visible')
    });
    
    gsap.to(loveText, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1,
        ease: 'power2.out',
        onStart: () => loveText.classList.add('visible')
    });
    
    gsap.to(loveDate, {
        opacity: 1,
        duration: 1,
        delay: 1.5,
        onStart: () => loveDate.classList.add('visible')
    });
    
    gsap.to(counter2, {
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 1.8,
        ease: 'back.out(1.5)',
        onStart: () => {
            counter2.classList.add('visible');
            actualizarContador2();
            setInterval(actualizarContador2, 1000);
        }
    });
    
    // Mostrar pregunta San Valentín
    gsap.to(sanValentinQuestion, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 2.5,
        ease: 'power2.out',
        onStart: () => sanValentinQuestion.classList.add('visible')
    });
    
    gsap.to(choiceButtons, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 3,
        ease: 'power2.out',
        onStart: () => choiceButtons.classList.add('visible')
    });
}

// ==============================================
// BOTÓN "NO" - Huye del cursor (solo 2 veces)
// ==============================================
const gifOverlay = document.getElementById('gifOverlay');
let noHoverCount = 0;

function resetBtnNo() {
    btnNo.style.position = 'relative';
    btnNo.style.left = '0';
    btnNo.style.top = '0';
    btnNo.style.transform = '';
    noHoverCount = 0;
}

btnNo.addEventListener('mouseenter', () => {
    if (noHoverCount < 2) {
        // Mover a una posición aleatoria pero visible
        const positions = [
            { x: -150, y: 0 },
            { x: 150, y: 0 },
            { x: 0, y: -80 },
            { x: 0, y: 80 },
            { x: -100, y: -50 },
            { x: 100, y: 50 }
        ];
        
        const pos = positions[Math.floor(Math.random() * positions.length)];
        
        btnNo.style.position = 'relative';
        btnNo.style.left = pos.x + 'px';
        btnNo.style.top = pos.y + 'px';
        btnNo.style.zIndex = '100';
        
        noHoverCount++;
    }
});

btnNo.addEventListener('click', () => {
    // Mostrar el GIF
    gifOverlay.classList.add('visible');
    
    // Resetear posición del botón y contador
    resetBtnNo();
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        gifOverlay.classList.remove('visible');
    }, 5000);
});

// ==============================================
// BOTÓN "SÍ" - Animación de corazones juntándose
// ==============================================
btnSi.addEventListener('click', () => {
    // Crear muchos corazones que se juntan
    gatherHearts();
});

function gatherHearts() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const numHearts = 100;
    
    // Crear corazones desde todas partes
    for (let i = 0; i < numHearts; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'gathering-heart';
            heart.textContent = '♥';
            heart.style.color = '#f48fb1';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            
            // Posición inicial aleatoria en los bordes
            const side = Math.floor(Math.random() * 4);
            let startX, startY;
            switch(side) {
                case 0: startX = Math.random() * window.innerWidth; startY = -50; break;
                case 1: startX = window.innerWidth + 50; startY = Math.random() * window.innerHeight; break;
                case 2: startX = Math.random() * window.innerWidth; startY = window.innerHeight + 50; break;
                case 3: startX = -50; startY = Math.random() * window.innerHeight; break;
            }
            
            heart.style.left = startX + 'px';
            heart.style.top = startY + 'px';
            document.body.appendChild(heart);
            
            // Animar hacia el centro
            gsap.to(heart, {
                left: centerX,
                top: centerY,
                scale: Math.random() * 0.5 + 0.3,
                rotation: Math.random() * 360,
                duration: 1.5 + Math.random() * 0.5,
                ease: 'power2.in',
                onComplete: () => {
                    gsap.to(heart, {
                        opacity: 0,
                        scale: 0,
                        duration: 0.3,
                        onComplete: () => heart.remove()
                    });
                }
            });
        }, i * 20);
    }
    
    // Transición a acto 5 después de la animación
    setTimeout(() => {
        gsap.to(acto4, {
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut',
            onComplete: () => {
                acto4.classList.remove('visible');
                acto5.classList.add('visible');
                iniciarActo5();
            }
        });
    }, 2500);
}

// ==============================================
// ACTO 5: ESCENA FINAL - CORAZÓN MEGA
// ==============================================
function actualizarContador3() {
    const tiempo = calcularTiempo(fecha2);
    document.getElementById('years3').textContent = tiempo.años;
    document.getElementById('months3').textContent = tiempo.meses;
    document.getElementById('days3').textContent = tiempo.días;
    document.getElementById('hours3').textContent = tiempo.horas;
    document.getElementById('minutes3').textContent = tiempo.minutos;
    document.getElementById('seconds3').textContent = tiempo.segundos;
}

function iniciarActo5() {
    // Cambiar música
    musicaFondo.pause();
    musicaFondo.currentTime = 0;
    musicaFondo2.play();
    
    gsap.fromTo(acto5, { opacity: 0 }, { opacity: 1, duration: 0.8 });
    
    const megaHeartContainer = document.getElementById('megaHeartContainer');
    const megaHeartText = document.getElementById('megaHeartText');
    const finalDate = document.getElementById('finalDate');
    const counter3 = document.getElementById('counter3');
    
    // Corazón mega aparece con efecto
    gsap.to(megaHeartContainer, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        delay: 0.5,
        ease: 'elastic.out(1, 0.5)',
        onStart: () => megaHeartContainer.classList.add('visible')
    });
    
    // Texto dentro del corazón
    gsap.to(megaHeartText, {
        opacity: 1,
        duration: 1,
        delay: 2,
        onStart: () => megaHeartText.classList.add('visible')
    });
    
    // Fecha
    gsap.to(finalDate, {
        opacity: 1,
        duration: 1,
        delay: 2.5,
        onStart: () => finalDate.classList.add('visible')
    });
    
    // Contador final
    gsap.to(counter3, {
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 3,
        ease: 'back.out(1.5)',
        onStart: () => {
            counter3.classList.add('visible');
            actualizarContador3();
            setInterval(actualizarContador3, 1000);
        }
    });
}

// ==============================================
// INICIALIZACIÓN
// ==============================================
startFloatingElements();
initActo1();