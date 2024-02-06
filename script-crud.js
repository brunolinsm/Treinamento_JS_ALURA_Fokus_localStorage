const botaoAddTarefa = document.querySelector('.app__button--add-task')
const formularioAddTarefa = document.querySelector('.app__form-add-task')
const areaTexto = document.querySelector('.app__form-textarea')
const ulTarefas = document.querySelector('.app__section-task-list')
const botaoCancelarFormulario = document.querySelector('.app__form-footer__button--cancel')

//Esta declaracao substitui uma função condicional
const listaTarefas = JSON.parse(localStorage.getItem('tarefas')) || []

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
    //Equivalente ao append para adicionar elemento em lista
    listaTarefas.push(tarefa)
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
    atualizarTarefas()
    //Textarea se refere ao campo de escrita do formulario
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

    //Item que recebe a descrição da tarefa
    const paragrafo = document.createElement('p')
    paragrafo.classList.add('app__section-task-list-item-description')
    paragrafo.textContent = tarefa.descricao

    const botaoDoItemTarefas = document.createElement('button')
    botaoDoItemTarefas.classList.add('app_button-edit')
    botaoDoItemTarefas.onclick = () => {
        // debugger
        const novaDescricaoTarefa = prompt('Qual é o nome da nova tarefa?')
        // console.log('Nova descriçãoda tarefa: ', novaDescricaoTarefa)
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

    return li
}

//Recarrega tarefas salvas no localStorage para exibir na lista
listaTarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
});
