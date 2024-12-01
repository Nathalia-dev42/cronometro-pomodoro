// Variáveis globais
let timer;
let isRunning = false;
let isWorking = true; // true -> Trabalhando, false -> Pausa
let timeLeft = 25 * 60; // Tempo inicial em segundos (25 minutos)
let cycleCount = 0; // Contador de ciclos de trabalho

// Elementos HTML
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const statusDisplay = document.getElementById('status');
const cycleCountDisplay = document.getElementById('cycle-count');
const progressCircle = document.querySelector('.progress-circle'); // Círculo de progresso

// Função para formatar o tempo no formato mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Função para atualizar o progresso do círculo
function updateProgress() {
    const circleLength = 440; // Comprimento total do círculo (2 * π * r)
    const progress = (timeLeft / (isWorking ? 25 * 60 : 5 * 60)) * circleLength;
    progressCircle.style.strokeDashoffset = circleLength - progress;
}

// Função para atualizar o cronômetro
function updateTimer() {
    timerDisplay.textContent = formatTime(timeLeft);
    updateProgress();

    // Se o tempo acabar, alterna para a próxima fase (trabalho ou pausa)
    if (timeLeft <= 0) {
        if (isWorking) {
            // Fim do ciclo de trabalho, iniciando a pausa
            timeLeft = 5 * 60; // Pausa de 5 minutos
            statusDisplay.textContent = "Ciclo: Pausa curta!";
            statusDisplay.style.color = "#007bff"; // Cor azul para pausa
        } else {
            // Fim da pausa, iniciando o próximo ciclo de trabalho
            timeLeft = 25 * 60; // Novo ciclo de trabalho de 25 minutos
            statusDisplay.textContent = "Ciclo: Trabalhando...";
            statusDisplay.style.color = "#4CAF50"; // Cor verde para trabalho
            cycleCount++; // Incrementa o contador de ciclos
            cycleCountDisplay.textContent = `Ciclos completos: ${cycleCount}`; // Atualiza o contador na tela
        }
        isWorking = !isWorking; // Alterna entre trabalho e pausa
    }
}

// Função para iniciar o cronômetro
function startTimer() {
    if (isRunning) return; // Se já estiver rodando, não faz nada

    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
    }, 1000);

    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    isRunning = true;
}

// Função para pausar o cronômetro
function pauseTimer() {
    clearInterval(timer);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    isRunning = false;
}

// Função para reiniciar o cronômetro
function resetTimer() {
    clearInterval(timer);
    timeLeft = 25 * 60; // Reinicia para 25 minutos
    updateTimer();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    isRunning = false;
    cycleCount = 0; // Reinicia o contador de ciclos
    cycleCountDisplay.textContent = `Ciclos completos: ${cycleCount}`; // Atualiza o contador na tela
    statusDisplay.textContent = "Ciclo: Trabalhando...";
    statusDisplay.style.color = "#4CAF50"; // Cor verde para ciclo de trabalho
}

// Eventos de clique nos botões
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
