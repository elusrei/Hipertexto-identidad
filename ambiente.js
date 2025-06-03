// Clase para manejar la reproducción de sonidos ambientales
class AmbientSoundManager {
    constructor() {
        this.sounds = [];
        this.currentSound = null;
        this.currentGainNode = null;
        this.isPlaying = false;
        this.minDelay = 3000; // 3 segundos mínimo entre sonidos
        this.maxDelay = 8000; // 8 segundos máximo entre sonidos
        this.volume = 0.4; // Volumen al 40%
        this.fadeDuration = 3000; // 3 segundos para fade in/out
        this.audioContext = null;
        this.initialized = false;
        this.ambientGainNode = null; // Nodo de ganancia para el ambiente
        this.targetVolume = this.volume; // Volumen objetivo para transiciones suaves
        this.volumeTransitionSpeed = 0.1; // Velocidad de transición del volumen
        
        // Esperar a la primera interacción del usuario
        this.setupUserInteraction();
    }

    // Configurar la interacción del usuario
    setupUserInteraction() {
        const handleInteraction = async () => {
            if (!this.initialized) {
                await this.initializeAudio();
                document.removeEventListener('click', handleInteraction);
                document.removeEventListener('touchstart', handleInteraction);
                document.removeEventListener('keydown', handleInteraction);
            }
        };

        document.addEventListener('click', handleInteraction);
        document.addEventListener('touchstart', handleInteraction);
        document.addEventListener('keydown', handleInteraction);
    }

    // Inicializar el contexto de audio
    async initializeAudio() {
        try {
            if (this.initialized) return;

            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }

            // Crear nodo de ganancia para el ambiente
            this.ambientGainNode = this.audioContext.createGain();
            this.ambientGainNode.gain.value = this.volume;
            this.ambientGainNode.connect(this.audioContext.destination);

            this.initialized = true;
            await this.loadSounds();
        } catch (error) {
            console.error('Error al inicializar audio:', error);
        }
    }

    // Cargar todos los sonidos
    async loadSounds() {
        if (!this.initialized) return;

        const soundFiles = [
            'File Select/File Select 03.1.mp3',
            'File Select/File Select 03.2.mp3',
            'File Select/File Select 03.3.mp3'
        ];

        for (const file of soundFiles) {
            try {
                const response = await fetch(file);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const arrayBuffer = await response.arrayBuffer();
                const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
                this.sounds.push(audioBuffer);
                console.log(`Sonido cargado: ${file}`);
            } catch (error) {
                console.error(`Error al cargar el sonido ${file}:`, error);
            }
        }

        if (this.sounds.length > 0) {
            console.log('Iniciando reproducción...');
            this.start();
        }
    }

    // Iniciar la reproducción aleatoria
    start() {
        if (!this.isPlaying && this.initialized && this.sounds.length > 0) {
            this.isPlaying = true;
            this.playNextSound();
        }
    }

    // Detener la reproducción
    stop() {
        this.isPlaying = false;
        if (this.currentSound) {
            this.fadeOut(this.currentGainNode).then(() => {
                if (this.currentSound) {
                    this.currentSound.stop();
                    this.currentSound = null;
                }
            });
        }
    }

    // Efecto de fade in
    async fadeIn(gainNode) {
        return new Promise((resolve) => {
            const startTime = Date.now();
            const fadeInInterval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / this.fadeDuration, 1);
                gainNode.gain.value = progress * this.volume;
                
                if (progress >= 1) {
                    clearInterval(fadeInInterval);
                    resolve();
                }
            }, 50);
        });
    }

    // Efecto de fade out
    async fadeOut(gainNode) {
        return new Promise((resolve) => {
            const startVolume = gainNode.gain.value;
            const startTime = Date.now();
            const fadeOutInterval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / this.fadeDuration, 1);
                gainNode.gain.value = startVolume * (1 - progress);
                
                if (progress >= 1) {
                    clearInterval(fadeOutInterval);
                    resolve();
                }
            }, 50);
        });
    }

    // Bajar el volumen del ambiente
    lowerAmbientVolume() {
        this.targetVolume = this.volume * 0.2; // Bajar al 20% del volumen normal
    }

    // Restaurar el volumen del ambiente
    restoreAmbientVolume() {
        this.targetVolume = this.volume;
    }

    // Actualizar el volumen del ambiente
    updateAmbientVolume() {
        if (this.ambientGainNode) {
            const currentVolume = this.ambientGainNode.gain.value;
            const newVolume = currentVolume + (this.targetVolume - currentVolume) * this.volumeTransitionSpeed;
            this.ambientGainNode.gain.value = newVolume;
        }
    }

    // Reproducir el siguiente sonido
    async playNextSound() {
        if (!this.isPlaying || !this.initialized || !this.audioContext) return;

        if (this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
        }

        // Decidir si reproducir un sonido o mantener silencio
        if (Math.random() < 0.9) { // 90% de probabilidad de reproducir sonido
            const randomIndex = Math.floor(Math.random() * this.sounds.length);
            const audioBuffer = this.sounds[randomIndex];

            // Crear nuevo nodo de ganancia para este sonido
            const gainNode = this.audioContext.createGain();
            gainNode.gain.value = 0; // Iniciar en silencio
            gainNode.connect(this.ambientGainNode); // Conectar al nodo de ganancia del ambiente

            this.currentSound = this.audioContext.createBufferSource();
            this.currentSound.buffer = audioBuffer;
            this.currentSound.connect(gainNode);

            // Aplicar pitch aleatorio sutil
            const pitch = 0.98 + Math.random() * 0.04;
            this.currentSound.playbackRate.value = pitch;

            // Reproducir el sonido
            this.currentSound.start(0);
            console.log('Reproduciendo sonido...');
            
            // Fade in independiente
            this.fadeIn(gainNode);

            // Esperar un poco antes de iniciar el fade out
            const soundDuration = audioBuffer.duration * 1000; // duración en milisegundos
            const fadeOutStart = soundDuration - this.fadeDuration;
            
            setTimeout(async () => {
                if (this.currentSound) {
                    await this.fadeOut(gainNode);
                    this.currentSound.stop();
                    this.currentSound = null;
                    gainNode.disconnect(); // Limpiar el nodo de ganancia
                }
            }, fadeOutStart);
        }

        // Calcular el siguiente delay
        const delay = Math.random() * (this.maxDelay - this.minDelay) + this.minDelay;
        setTimeout(() => this.playNextSound(), delay);
    }

    // Iniciar el loop de actualización del volumen
    startVolumeUpdate() {
        const updateVolume = () => {
            this.updateAmbientVolume();
            requestAnimationFrame(updateVolume);
        };
        updateVolume();
    }

    // Ajustar el volumen
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        if (this.currentGainNode) {
            this.currentGainNode.gain.value = this.volume;
        }
    }
}

// Crear una instancia del administrador de sonidos
const ambientSoundManager = new AmbientSoundManager();

// Iniciar el loop de actualización del volumen
ambientSoundManager.startVolumeUpdate();

// Detener los sonidos cuando se abandona la página
window.addEventListener('beforeunload', () => {
    ambientSoundManager.stop();
}); 