const botaoAddTarefa = document.querySelector('.app__button--add-task')
const formularioAddTarefa = document.querySelector('.app__form-add-task')
const areaTexto = document.querySelector('.app__form-textarea')
const ulTarefas = document.querySelector('.app__section-task-list')
const botaoCancelarFormulario = document.querySelector('.app__form-footer__button--cancel')
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')
const botaoRemoverTarefasConcluidas = document.querySelector('#btn-remover-concluidas')
const botaoRemoverTodasTarefas = document.querySelector('#btn-remover-todas')
let listaTarefas = JSON.parse(localStorage.getItem('tarefas')) || []
let tarefaSelecionada = null
let liTarefaSelecionada = null

const limparEsconderFormulario = () => {
    areaTexto.value = ''
    formularioAddTarefa.classList.toggle('hidden')
}

function atualizarTarefas(){
    localStorage.setItem('tarefas', JSON.stringify(listaTarefas))
}

botaoAddTarefa.addEventListener('click', () => {
    formularioAddTarefa.classList.toggle('hidden')
})

botaoCancelarFormulario.addEventListener('click', limparEsconderFormulario)

formularioAddTarefa.addEventListener('submit', function(evento) {
    evento.preventDefault()
    const tarefa = {descricao: areaTexto.value}
    listaTarefas.push(tarefa)
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
    atualizarTarefas()
    areaTexto.value = ''
    formularioAddTarefa.classList.add('hidden')
})

function criarElementoTarefa(tarefa){
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.classList.add('app__section-task-icon-status')
    svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>`

    const paragrafo = document.createElement('p')
    paragrafo.classList.add('app__section-task-list-item-description')
    paragrafo.textContent = tarefa.descricao

    const botaoDoItemTarefas = document.createElement('button')
    botaoDoItemTarefas.classList.add('app_button-edit')
    botaoDoItemTarefas.onclick = () => {
        const novaDescricaoTarefa = prompt('Qual é o nome da nova tarefa?')
        
        if(novaDescricaoTarefa){
            paragrafo.textContent = novaDescricaoTarefa
            tarefa.descricao = novaDescricaoTarefa
            atualizarTarefas()
        }
    }
    
    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src','/imagens/edit.png')
    
    botaoDoItemTarefas.append(imagemBotao)

    li.append(svg)
    li.append(paragrafo)
    li.append(botaoDoItemTarefas)

    if (tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete')
        botaoDoItemTarefas.setAttribute('disabled', 'disabled')
    }
    else {
        li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active')
                .forEach(elemento => {
                    elemento.classList.remove('app__section-task-list-item-active')
                })
            if (tarefaSelecionada == tarefa){
                paragrafoDescricaoTarefa.textContent = ''
                tarefaSelecionada = null
                liTarefaSelecionada = null
                return
            }
            
            tarefaSelecionada = tarefa
            liTarefaSelecionada = li
            paragrafoDescricaoTarefa.textContent = tarefa.descricao
    
            li.classList.add('app__section-task-list-item-active')
        }  
    }
    

    return li
}

listaTarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
});

document.addEventListener('FocoFinalizado', () => {
    if (tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active')
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete')
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled')
        tarefaSelecionada.completa = true
        atualizarTarefas()
    }
})

const removerTarefas = (somenteCompletas) => {
    let seletor = ".app__section-task-list-item"
    if (somenteCompletas) {
        seletor = ".app__section-task-list-item-complete"
    }
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove()
    })
    paragrafoDescricaoTarefa.textContent = null
    
    listaTarefas = somenteCompletas ? listaTarefas.filter(tarefa => !tarefa.completa) : []
    atualizarTarefas()

}

botaoRemoverTarefasConcluidas.onclick = () => removerTarefas(true)
botaoRemoverTodasTarefas.onclick = () => removerTarefas(false)