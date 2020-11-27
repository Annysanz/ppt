const nRondas = 3
//GUARDAR CONTACTO Y LLEVAR A LA PANTALLA DE JUEGO
function savePlayerName(){
    let form = document.querySelector("#frmcontacto")
    //console.log(form)
    let player_name=""
    player_name=form.querySelector("[name='txtname']").value
    //console.log(player_name)
    document.querySelector("#player_name").textContent=player_name
    document.querySelector(".play_screen").style.display="flex"
    document.querySelector(".modal").style.display="none"
    window.localStorage.setItem("nombre",player_name)
}
//programar click botón GUARDAR:
document.querySelector(".aceptar").onclick=()=>savePlayerName()

//BOTON CANCELAR , VUELVE A LA PANTALLA PRINCIPAL
function aceptCancelar(){
    document.querySelector(".modal").style.display="none"
}
document.querySelector(".cancelar").onclick=aceptCancelar

//BOTÓN PLAY, VA A LA PANTALLA INTRODUCE TU NOMBRE
function openName(){
    document.querySelector(".modal-hidden").style.display="flex"
}
document.getElementById("openPlay").onclick=openName


//BOTÓN INSTRUCCIONES, ABRE INSTRUCCIONES
function openInstruction(){
    document.querySelector("#instructions").style.display="flex"
}

document.getElementById("openInstructions").onclick=openInstruction


//BOTÓN MENU, VUELVE A PANTALLA PRINCIPAL DESDE INTRUCCIONES
function openMenu_instructions(){
    document.querySelector("#instructions").style.display="none"
}
document.querySelector(".menu2").onclick=openMenu_instructions

//BOTÓN MENÚ, VUELVES A MENÚ
function openMenu_play(){
    document.querySelector("#play").style.display="none"
}
document.querySelector(".menu1").onclick=openMenu_play

//BOTÓN FINALIZAR, VA A PANTALLA ¿ABANDONAS?
function hastaLuego(){
    
    document.querySelector(".bye_screen").style.display="flex"
}
document.querySelector(".finalizar").onclick=hastaLuego

//BOTÓN PARA VOLVER A LA PANTALLA DE JUEGO DESDE LA PANTALLA DE DESPEDIDA
function outMenu(){

    document.querySelector("#bye").style.display="none"
}
document.querySelector(".fin").onclick=outMenu











//Funcion para capturar el click del raton
document.onclick = capturarClick;
console.log(capturarClick)
function capturarClick(e) {
    let elemento = e.target
    //Clonamos el elemento recogido para poder trabajarlo
    let t = elemento.cloneNode(true)
    //Recibimos el valor del atributo id
    let confir = t.getAttribute("id")
    //Limitamos el click a las imagenes que nos interesan
    if (confir == "piedra" || confir == "papel" || confir == "tijera"){
        //Quitamos el mensaje de a jugar
        document.querySelector(".aJugar").innerHTML=""
        //llamada a funcion para mostrar jugada, score y mensaje pierde o gana
        mostrarImg(t)
        let pc = turnoPc()
        ronda(confir, pc)
  
  document.querySelector(".loader").style.visibility="hidden"  }
}

//Esta funcion agrega la imagen seleccionada
function mostrarImg(jugada){
    let clon = document.createElement("img")
    //console.log(jugada.src)
    clon.src = jugada.src
    document.querySelector(".imagen_oculta").appendChild(clon)
    setTimeout(cleanJugada, 3000)
    document.querySelector(".overlay").style.visibility="hidden"
}

//Esta funcion recibe realiza la jugada del PC
function turnoPc(){
    //Recibe el numero aleatorio
    let jugadaPc = enviarNumero()
    //Quitar opacidad 
    let opacidad = document.querySelector(".overlay")
    //opacidad.className = "escondite"
    //En base al numero carga la imagen que le representa
    if (jugadaPc == 0){
        let cloncito = document.createElement("img")
        cloncito.src= "./images/piedra.jpg"
        document.querySelector(".box_loader").appendChild(cloncito)
        return 0
    }
    if (jugadaPc == 1){
        let cloncito = document.createElement("img")
        cloncito.src= "./images/papel.jpg"
        document.querySelector(".box_loader").appendChild(cloncito)
        return 1
    }
    if (jugadaPc == 2){
        let cloncito = document.createElement("img")
        cloncito.src= "./images/tijera.jpg"
        document.querySelector(".box_loader").appendChild(cloncito)
        return 2
    }
}

//Esta funcion lo que hace es convertir la jugada del usuario a un numero y compara con la generada por el PC para definir quien gana la ronda
let contadorPc=0
let contadorUser=0
function ronda(jugador, pc){
    let player1  
    let player2 = pc
    //Convertir la jugada del jugador a numero para poder comparar
    if (jugador == "piedra")
        player1 = 0
    if (jugador == "papel")
        player1 = 1
    if (jugador == "tijera")
        player1 = 2
    //Comparamos resultados
    if (player1 == player2){
        document.querySelector(".mensajeGanasPierdes").innerHTML="¡¡Empate!!"
    }
    else if (player1==0 && player2==1 || player1==1 && player2==2 || player1==2 && player2==0 ){      
        document.querySelector(".mensajeGanasPierdes").innerHTML="¡¡Perdiste!!"
        contadorPc++
        let scorePc = document.createElement("b")
        scorePc.textContent = contadorPc
        //console.log(scorePc)
        document.querySelector(".comp-score").innerHTML=""
        document.querySelector(".comp-score").appendChild(scorePc)
        //console.log(contadorPc)
    }
    else{
        document.querySelector(".mensajeGanasPierdes").innerHTML="¡¡Ganaste!!"
        contadorUser++
        let scoreUs = document.createElement("b")
        scoreUs.textContent = contadorUser
        //console.log(scoreUs)
        document.querySelector(".user-score").innerHTML=""
        document.querySelector(".user-score").appendChild(scoreUs)
        //console.log(contadorUser)
    }
    partida()
}
//Genera un numero aleatorio 0-2
function enviarNumero(){
    let n = Math.round(Math.random()*2)
    return n
}

//Permite iniciar una vez mas hasta que uno de los llegue a 3 puntos 
function partida(){
    if (contadorUser >= nRondas || contadorPc >= nRondas){
        //declarar ganador    
        openWinner()
       
    } 
}

function openWinner(){
    if (contadorUser == nRondas){
        document.querySelector(".finJuego").innerHTML="¡¡¿Victoria!!! ¡¡¡Qué pro!!! ^^"
        document.querySelector(".modal-hidden-w").style.display="flex"

    }else{
        document.querySelector(".finJuego").innerHTML="¡¡¡Derrotado por una máquina!!! X("
        document.querySelector(".modal-hidden-w").style.display="flex"
    }
    contadorUser = 0
    contadorPc = 0
}
//Boton Volver a jugar - modal -winner/losser
document.querySelector(".repite").onclick=()=>{

    document.querySelector(".comp-score").innerHTML=""
    document.querySelector(".user-score").innerHTML=""
    
    let scoreUs = document.createElement("b")
    scoreUs.textContent = contadorUser
    document.querySelector(".user-score").appendChild(scoreUs)

    let scorePc = document.createElement("b")
    scorePc.textContent = contadorPc
    document.querySelector(".comp-score").appendChild(scorePc)
    document.querySelector(".modal-hidden-w").style.display="none"
}

//Boton Menu - ventana modal-Winner/Losser
document.querySelector(".salir").onclick=()=>{
     location.reload()
}

//Borra la jugada anterior
function cleanJugada(){
    document.querySelector(".imagen_oculta").innerHTML=""
    document.querySelector(".box_loader").innerHTML=""
    document.querySelector(".mensajeGanasPierdes").innerHTML=""
    document.querySelector(".overlay").style.visibility="visible"
}