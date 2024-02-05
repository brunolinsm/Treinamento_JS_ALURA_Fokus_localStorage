const botaoAddTarefa = document.querySelector('.app__button--add-task')
const formularioAddTarefa = document.querySelector('.app__form-add-task')

botaoAddTarefa.addEventListener('click', () =>{
    formularioAddTarefa.classList.toggle('hidden')
})