/**
 * Main App js
 * Author: Nathan Bland
 * Description: JS file to create and enable functionaility for a 
 * calculator.
 * Comments: I guess we don't like static html now?
 */

//Generate history from calculation

var previous = ''

function genereateHistory(result, expression){
    var history = document.querySelector('.history__container__items')
    var card = document.createElement('div')
    var cardContent = document.createElement('div')
    card.className = 'card'
    cardContent.className = 'card-content'
    
    var title = document.createElement('span')
    title.className = 'card-title grey-text text-darken-4'
    title.innerHTML = result
    
    var content = document.createElement('p')
    content.innerHTML = expression+'='+result
    
    var links = document.createElement('div')
    links.className = 'card-action'
    
    var copyQuery = document.createElement('button')
    var copyResult = document.createElement('button')
    
    copyQuery.innerHTML = '<i class="material-icons">library_add</i> Copy Calculation'
    copyResult.innerHTML = '<i class="material-icons">library_add</i> Copy Result'
    
    copyQuery.className = 'button btn waves-effect waves-light'
    copyResult.className = 'button btn waves-effect waves-light'
    
    links.appendChild(copyQuery)
    links.appendChild(copyResult)
    
    cardContent.appendChild(title)
    cardContent.appendChild(content)
    cardContent.appendChild(links)
    card.appendChild(cardContent)
    history.appendChild(card)
}

//Get the result of our calculation
function getResult(query) {
    var init = query.charAt(0)
    if (init === '*' || init === '/' || init === '+' || init === '-') {
        query = previous + query
    }
    var result = math.eval(query)
    previous = result
    genereateHistory(result, query)
    return result
}

// Lets make a button helper..
function createButton(text, parent, input) {
    var button = document.createElement('input')
    button.setAttribute('type', 'button')
    button.setAttribute('value', text)
    //button.innerHTML = text
    button.className = 'button btn waves-effect waves-light'
    button.addEventListener('click', function(e){
        console.log(button)
        console.log('event:',e)
        var value = button.value
        if (value === '='){
            getResult(input.value)
            input.value = ''
        } else {
            input.value += button.value
        }
    })
    
    if (parent !== undefined) {
        parent.appendChild(button)
        return parent
    }
    else {
        return button
    }
}

//Make our interface
function generateInterface() {
    var page = document.createElement('main')
    var calculator = document.createElement('article')
    var history = document.createElement('article')
    var historyItems = document.createElement('section')
    
    history.className = 'history__container'
    historyItems.className = 'history__container__items'
    
    calculator.className = 'calculator__container'
    var title = document.createElement('h1')
    title.innerHTML = 'Calculator'
    
    var historyTitle = document.createElement('h1')
    historyTitle.innerHTML = 'History'
    
    history.appendChild(historyTitle)
    history.appendChild(historyItems)
    
    var input = document.createElement('input')
    input.setAttribute('autofocus', 'autofocus')
    input.setAttribute('placeholder', '2*4')
    input.className = 'input-field calculator__input'
    input.addEventListener('keyup', function(e){
        if (e.keyCode === 13) {
            getResult(input.value)
            input.value = ''
        }
    })
    
    calculator.appendChild(title)
    calculator.appendChild(input)
    
    //create our numbers
    var numbers = document.createElement('section')
    numbers.className = 'calculator__numbers'
    for (var i=9; i>-1; i--){
        createButton(i, numbers, input)
        //numbers.appendChild(number)
    }
    
    //create our handy dandy controls
    var controls = document.createElement('section')
    controls.className = 'calculator__controls'
    createButton('+', controls, input)
    createButton('-', controls, input)
    createButton('*', controls, input)
    createButton('/', controls, input)
    createButton('=', controls, input)
    
    
    calculator.appendChild(numbers)
    calculator.appendChild(controls)
    
    page.appendChild(calculator)
    page.appendChild(history)
    document.body.appendChild(page)
}

//RUN IT
generateInterface()