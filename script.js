const paginaHtml = document.querySelector('Html')
const textoTitulo = document.querySelector('.app__title')
const imagemPagina = document.querySelector('.app__image')
const botoesDaPagina = document.querySelectorAll('.app__card-button')
const botaoFoco = document.querySelector('.app__card-button--foco')
const botaoDescansoCurto = document.querySelector('.app__card-button--curto')
const botaoDescansoLongo = document.querySelector('.app__card-button--longo')
const botaoIniciarOuPausar = document.querySelector('#start-pause')
const textoBotaoIniciarOuPausar = document.querySelector('#start-pause span')
const iconeBotaoIniciarOuPausar = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')
const chaveMusica = document.querySelector('#alternar-musica')

const musica = new Audio('/sons/luna-rise-part-one.mp3')
musica.loop = true
const somBotaoPlay = new Audio('/sons/play.wav')
const somBotaoPause = new Audio('/sons/pause.mp3')
const somFinalContagemTempo = new Audio('/sons/beep.mp3')

let contagemTempoEmSegundos = 1500
let intervaloContagemTempo = null

chaveMusica.addEventListener('change', function() {

    if(musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
})

botaoFoco.addEventListener('click', () => {
    contagemTempoEmSegundos = 1500
    alterarContextoPagina('foco')
    botaoFoco.classList.add('active')
})

botaoDescansoCurto.addEventListener('click', () => {
    contagemTempoEmSegundos = 300
    alterarContextoPagina('descanso-curto')
    botaoDescansoCurto.classList.add('active')
})

botaoDescansoLongo.addEventListener('click', () => {
    contagemTempoEmSegundos = 900
    alterarContextoPagina('descanso-longo')
    botaoDescansoLongo.classList.add('active')
})

function alterarContextoPagina(contexto) {
    mostrarTempoNaTela()
    botoesDaPagina.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    paginaHtml.setAttribute('data-contexto', contexto)
    imagemPagina.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            textoTitulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            textoTitulo.innerHTML = `
            Que tal dar uma respirada? 
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            textoTitulo.innerHTML = `
            Hora de voltar à superfície.
            <strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

const contagemRegressiva = function(){
    if (contagemTempoEmSegundos <= 0){
        somFinalContagemTempo.play()
        alert('Tempo finalizado!')
        zerar()
        return
    }
    contagemTempoEmSegundos -= 1
    mostrarTempoNaTela()
}

botaoIniciarOuPausar.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    if (intervaloContagemTempo){
        somBotaoPause.play()
        zerar()
        return
    }
    somBotaoPlay.play()
    textoBotaoIniciarOuPausar.textContent = "Pausar"
    iconeBotaoIniciarOuPausar.setAttribute('src',"/imagens/pause.png")   
    intervaloContagemTempo = setInterval(contagemRegressiva, 1000)
}

function zerar() {
    clearInterval(intervaloContagemTempo)
    textoBotaoIniciarOuPausar.textContent = "Começar"
    iconeBotaoIniciarOuPausar.setAttribute('src',"/imagens/play_arrow.png")
    intervaloContagemTempo = null
}

function mostrarTempoNaTela(){
    const tempo = new Date (contagemTempoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempoNaTela()