
/**
 * Main App js
 * Author: Nathan Bland
 * Description: JS file to create and enable functionaility for a 
 * calculator.
 * Comments: I guess we don't like static html now?
 */

//Generate history from calculation

var previous = []
var position = previous.length-1
var clipboard = new Clipboard('.btn');
function genereateHistory(result, expression){
    var history = document.querySelector('.history__container__items')
    var card = document.createElement('div')
    var cardContent = document.createElement('div')
    card.className = 'card animated fadeInDown'
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
    
    copyQuery.setAttribute('data-clipboard-text', expression)
    copyResult.setAttribute('data-clipboard-text', result)
    copyQuery.setAttribute('data-clipboard-action', 'copy')
    copyResult.setAttribute('data-clipboard-action', 'copy')
    
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
        query = previous[previous.length-1].result + query
    }
    var result = math.eval(query)
    previous.push({'result': result, 'query': query})
    position = previous.length-1
    var resultInput = document.querySelector('.input__result')
    resultInput.value = result
    resultInput.classList.add('pulse')
    
    genereateHistory(result, query)
    clipboard.destroy();
    clipboard = new Clipboard('.btn');
    clipboard.on('success', function(e) {
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);
        e.trigger.classList.add('animated')
        e.trigger.classList.add('pulse')
        var check = document.createElement('i')
        check.className = 'material-icons'
        check.textContent = 'done'
        e.trigger.appendChild(check)
        e.trigger.addEventListener('animationend', function(ev){
            console.log('fired!')
            e.trigger.classList.remove('animated')
            e.trigger.classList.remove('pulse')
            check.remove()
        })
        
    })
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
    
    var inputContainer = document.createElement('div')
    var input = document.createElement('input')
    var result = document.createElement('input')
    
    inputContainer.className = 'calculator__input__container'
    
    input.setAttribute('autofocus', 'autofocus')
    input.setAttribute('autofocus', 'autofocus')
    
    result.setAttribute('readonly', 'readonly')
    result.className = 'input__result animated pulse'
    result.addEventListener('animationend', function(ev){
        result.classList.remove('pulse')
    })
    input.className = 'input-field calculator__input'
    input.addEventListener('keyup', function(e){
        if (e.keyCode === 13) {
            getResult(input.value)
            input.value = ''
        } else if (e.keyCode === 38) { //up arrow
            if (position > -1) {
                console.log('position:', position)
                input.value = previous[position].query
                if (position > 0){
                    position -=1
                }
            }
        } else if (e.keyCode === 40) {//down arrow
            if (position < previous.length) {
                console.log('position:', position)
                position +=1
                if (!previous[position]){
                    input.value = ''
                    position -= 1
                } else {
                    input.value = previous[position].query
                }
            }
        }
    })
    
    calculator.appendChild(title)
    
    inputContainer.appendChild(input)
    inputContainer.appendChild(result)
    calculator.appendChild(inputContainer)
    
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