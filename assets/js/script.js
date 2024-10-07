//Переменные для поворота контейнера
const container = document.querySelector('.container')
const block2 = document.querySelector('.about')
const aboutHidden = document.querySelector('.about__hidden')
const worksHidden = document.querySelector('.works__hidden')
const aboutHiddenClick = document.querySelector('.fon__about')
const worksHiddenClick = document.querySelector('.fon__works')
const formInputs = document.querySelectorAll('.form__input, .form__textarea')

const blocks = document.querySelectorAll(".block")
let rotateSlide = 0, scaleSlide = 1

//Функция для смены цвета всей пижни

const changeColor = (numer) =>{
    if(numer == 1){
        document.body.style.cssText = `background-color: #040d3a;`
        blocks.forEach(item => {
            item.style.cssText =`color: #faac6d; background-color: #422e58;`
        })
        document.querySelector('#open').style.cssText = `background-color: #fb874f;`
    }
    if(numer == 2){
        document.body.style.cssText = `background-color: #012E4A;`
        blocks.forEach(item => {
            item.style.cssText =`color: #E8EDE7; background-color: #036280;`
        })
        document.querySelector('#open').style.cssText = `background-color: #81BECE;`
    }
    if(numer == 3){
        document.body.style.cssText = `background-color: #101116;`
        blocks.forEach(item => {
            item.style.cssText =`color: #8689AC; background-color:#2F3148;`
        })       
    }
    if(numer == 4){
        document.querySelector('.goodbye').style.opacity =`1`
    }
}

//срабатывает при нажатии на кнопку, но уже не работает
let nextSlide = () =>{
    rotateSlide -= 90
    scaleSlide *= 1.61804
    container.style.cssText = `transform: rotate(${rotateSlide}deg) scale(${scaleSlide});`  
    current++
}

let current = 0
//Для перехода по клику на слайд
let goToSlide = (index) =>{    
    if(current <= 4){
        let currentIndex = index - current
        rotateSlide -= currentIndex * 90
        scaleSlide *=  Math.pow(1.61804, currentIndex)
        container.style.cssText = `transform: rotate(${rotateSlide}deg) scale(${scaleSlide});`
        current = index
    }
}
window.addEventListener("click", () =>{
    blocks.forEach(block => { // обработчик при  клике на слайды
        block.addEventListener("click", ()=>{
            const index = block.getAttribute('data-index')
            goToSlide(index)
        })
    })
})

//Для слушания клавиатуры
let klav = (event) =>{
    const isInputActive = Array.from(formInputs).some(input => input === document.activeElement)
    if (isInputActive) {
        return
    }
    if ((event.code == 'ArrowRight' || event.code == 'KeyD') && rotateSlide != -360) {
        rotateSlide -= 90
        scaleSlide *= 1.61804
        current = Number(current) + 1
    } else if ((event.code == 'ArrowLeft' || event.code == 'KeyA') && rotateSlide != 0) {
        rotateSlide += 90
        scaleSlide /= 1.61804
        current = Number(current) - 1
    }
    changeColor(current)
    container.style.cssText = `transform: rotate(${rotateSlide}deg) scale(${scaleSlide});`
}
document.addEventListener('keydown', klav);

//Открывашка блока снизу
let openHidden = (num) =>{
    if(num == 'about'){
        aboutHidden.style.cssText = "transform:translateY(0); top:0;"
        document.removeEventListener('keydown', klav)
    
    } else if(num == 'works'){
        worksHidden.style.cssText = "transform:translateY(0); top:0;"
        document.removeEventListener('keydown', klav)
    }

        //Закрывашка
        aboutHiddenClick.addEventListener("click", () =>{
            aboutHidden.style.cssText = "transform:translateY(0); top:100vh;"
            document.addEventListener('keydown', klav);
        })
        worksHiddenClick.addEventListener("click", () =>{
            worksHidden.style.cssText = "transform:translateY(0); top:100vh;"
            document.addEventListener('keydown', klav);
        })
}


// Анимация лайка

const like = document.querySelector('.like')

like.addEventListener('click', ()=>{
    like.classList.add('like__click') 
    setTimeout(() =>{like.classList.remove('like__click')}, "1000")
})


/* Копирование текста в буфер обмена */
const copyEmail = () =>{
    navigator.clipboard.writeText('iliait2005@gmail.com').then(function() {
        console.log('Текст успешно скопирован в буфер обмена');
    }, function(err) {
        console.error('Произошла ошибка при копировании текста: ', err);
    });
    document.querySelector('.message').style.cssText = `opacity:1;`
    setTimeout(() => {document.querySelector('.message').style.cssText = `opacity:0;`}, 700)
}
    

// Валидация для формы

const validation = (form) =>{
    let result = true

    const createError = (input, text) =>{
        const parent = input.parentNode
        const errorLabel = document.createElement('label')
        errorLabel.classList.add('error__label')
        errorLabel.textContent = text
        parent.classList.add("error")
        parent.append(errorLabel)
    }

    const removeError = (input) =>{
        const parent = input.parentNode
        if(parent.classList.contains('error')){
            parent.querySelector('.error__label').remove()
            parent.classList.remove('error')
        }
    }

    document.querySelectorAll('.form__input').forEach(item =>{
        removeError(item)
         if(item.value == ""){
            createError(item, "Поле пусто, пожалуйста заполните его")
            result = false
        }
    })

    const textarea = document.querySelector('.form__textarea')
    removeError(textarea)
    if(textarea.value == ""){
        createError(textarea, "Напишите по какому поводу вы хотите связаться")
        result = false
    }

    formInputs.forEach(item =>{
        item.addEventListener('click', ()=>{
            removeError(item)
            document.querySelector('.form__button').disabled = false
        })
    })

    return result
}

document.getElementById('add-form').addEventListener('submit', (event) =>{
    event.preventDefault()
    if(validation(this)){
        document.querySelector('.form__button').disabled = false
    }else{
        document.querySelector('.form__button').disabled = true
    }    
})