const botaoAddTarefa = document.querySelector('.app__button--add-task')
const formularioAddTarefa = document.querySelector('.app__form-add-task')
const areaTexto = document.querySelector('.app__form-textarea')
listaTarefas = []

botaoAddTarefa.addEventListener('click', () =>{
    formularioAddTarefa.classList.toggle('hidden')
})

formularioAddTarefa.addEventListener('submit', function(evento) {
    evento.preventDefault()
    const tarefa = {descricao: areaTexto.value}
    listaTarefas.push(tarefa)
    localStorage.setItem('tarefas', JSON.stringify(listaTarefas))
})
