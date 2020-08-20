const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messagearea = document.querySelector('.message__area')

do{
name= prompt('Enter name ..........')
}while(!name)


textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})


function sendMessage(msg){
    let modifymsg = {
        user:name,
        message:msg.trim()
    }
    appendMessage(modifymsg,'outgoing')
    textarea.value = ''
    scrolltobottom()

    socket.emit('message',modifymsg)
}

// msg appand

function appendMessage(msg,type){
let maindiv = document.createElement('div')
let classname = type

maindiv.classList.add(classname,'message')

let markup = `
  <h4>${msg.user}</h4>
  <p>${msg.message}</p>

`

maindiv.innerHTML = markup

messagearea.appendChild(maindiv)

}


socket.on('message',(msg)=>{
   appendMessage(msg,'incoming')
   scrolltobottom()
})


function scrolltobottom(){
    messagearea.scrollTop = messagearea.scrollHeight
}