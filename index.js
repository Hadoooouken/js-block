const one = () => {
    const randomNumber = Math.floor(Math.random() * 10 + 1)
    console.log(randomNumber);
    const two = () => {
        const a = prompt("Угадай число от 1 до 100")
        console.log(a);
        if (a === null) {
            alert('Игра окончена!')
            return
        }
        const b = Number(a)
        
        if (isNaN(b)) {
            alert('Введи число!')
            two()
            return
        }
        if (b > randomNumber) {
            alert('Загаданное число меньше')
            two()
        }
        else if (b < randomNumber) {
            alert('Загаданное число больше')
            two()
        }
        else {
            alert('Поздравляю, Вы угадали!!!')
            return
        }
    }

    two()
}



one()



