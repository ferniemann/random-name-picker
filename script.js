const btnPick = document.getElementById("btn-pick")
const btnDeleteAll = document.getElementById("btn-delete-all")
let names = []

btnPick.hidden = true
btnDeleteAll.hidden = true

function addNames() {
    const textField = document.getElementById("text-field")
    const newNames = textField.value.split("\n")
    names = names.concat(newNames)
    textField.value = ""
    renderNames()
}

function eventHandler() {
    const btnAdd = document.getElementById("btn-add-names")
    const buttonsDelete = document.querySelectorAll(".btn-delete")

    btnAdd.addEventListener("click", addNames)
    btnPick.addEventListener("click", pickName)
    btnDeleteAll.addEventListener("click", function() {
        names = []
        renderNames()
        btnDeleteAll.hidden = true
        btnPick.hidden = true
    })

    buttonsDelete.forEach(button => button.addEventListener("click", deleteName))
}

function renderNames() {
    list.innerHTML = ""

    if (names.length >= 2) {
        btnDeleteAll.hidden = false
        btnPick.hidden = false
    } else {
        btnDeleteAll.hidden = true
        btnPick.hidden = true
    }

    for (let i = 0; i < names.length; i++) {
        const listElement = document.createElement("li")
        listElement.setAttribute("data-id", i)
        listElement.innerText = names[i]

        const btnDelete = document.createElement("button")
        btnDelete.classList.add("btn-delete")
        btnDelete.innerText = "+"
        listElement.append(btnDelete)

        list.append(listElement)
    }

    eventHandler()
}

function deleteName(e) {
    const target = e.target
    const parent = target.parentElement
    const i = parent.getAttribute("data-id")

    names.splice(i, 1)
    renderNames()
}

function pickName() {
    const resultArea = document.getElementById("result")
    const randomIndex = randomNumber(0, names.length)
    const randomName = names[randomIndex]
    const text = document.createElement("p")
    text.innerText = randomName

    resultArea.append(text)

    removePickedName(randomIndex)
}

function removePickedName(i) {
    names.splice(i, 1)
    renderNames()
}

function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
}

eventHandler()