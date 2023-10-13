const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const btnMascotaJugador = document.getElementById("btn-mascota")
const botonesAtaque = document.getElementById("botones-ataque")
const botonReiniciar = document.getElementById("btn-reiniciar")
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")
const mensajesJugador = document.getElementById("mensajesJugador")
const mensajesEnemigo = document.getElementById("mensajesEnemigo")
const mensajesResultado = document.getElementById("mensajesResultado")
const spanvidaMascotaJugador = document.getElementById("vida-mascota-jugador")
const spanvidaMascotaEnemigo = document.getElementById("vida-mascota-enemigo")
const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let mascotaJudador
let ataqueJugador
let ataquesJugador = []
let ataqueEnemigo
let ataquesEnemigo = []
let randomAtaquesEnemigo = []
let mokepones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let opcionDeMokepones
let opcionAtaques
let inputHipodoge
let inputCapipepo
let inputRatigueya
let botonFuego
let botonAgua
let botonTierra
let botones
let contadorJugador = 0
let contadorEnemigo = 0
class Mokepon{
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon('Hipodoge', 'img/hipodoge.png', 3)
let capipepo = new Mokepon('Capipepo', 'img/capipepo.png', 4)
let ratigueya = new Mokepon('Ratigueya', 'img/ratigueya.png', 2)
mokepones.push(hipodoge, capipepo, ratigueya)
// 🔥💧🌿
hipodoge.ataques.push(
    { nombre: "Agua 💧", id: "btn-agua" },
    { nombre: "Agua 💧", id: "btn-agua" },
    { nombre: "Agua 💧", id: "btn-agua" },
    { nombre: "Fuego 🔥", id: "btn-fuego" },
    { nombre: "Tierra 🌿", id: "btn-tierra" }
)

capipepo.ataques.push(
    { nombre: "Tierra 🌿", id: "btn-tierra" },
    { nombre: "Tierra 🌿", id: "btn-tierra" },
    { nombre: "Tierra 🌿", id: "btn-tierra" },
    { nombre: "Fuego 🔥", id: "btn-fuego" },
    { nombre: "Agua 💧", id: "btn-agua" }
)

ratigueya.ataques.push(
    { nombre: "Fuego 🔥", id: "btn-fuego" },
    { nombre: "Fuego 🔥", id: "btn-fuego" },
    { nombre: "Fuego 🔥", id: "btn-fuego" },
    { nombre: "Agua 💧", id: "btn-agua" },
    { nombre: "Tierra 🌿", id: "btn-tierra" }
)

function aleatorio(max) {
    return Math.round(Math.random()*(max-1)+1)
}
function iniciarJuego() {
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <label for=${mokepon.nombre}>
            <input type="radio" name="mascota" id=${mokepon.nombre} />
            <div class="boxMascotas">
                <img class="imgMascotas" src=${mokepon.foto} alt=${mokepon.nombre}>
                <p>${mokepon.nombre} -> Agua</p>            
            </div>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones
    })
    inputHipodoge = document.getElementById("Hipodoge")
    inputCapipepo = document.getElementById("Capipepo")
    inputRatigueya = document.getElementById("Ratigueya")
    sectionSeleccionarAtaque.style.display = "none"
    sectionVerMapa.style.display = "none"
    sectionReiniciar.style.display = "none"
    btnMascotaJugador.addEventListener("click",seleccionarMascotaJugador)
    botonReiniciar.addEventListener("click",reiniciarJuego)
    
}
function seleccionarMascotaJugador(){
    if (inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJudador = inputHipodoge.id
    }else if (inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJudador = inputCapipepo.id
    }else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJudador = inputRatigueya.id
    }else{
        alert("No seleccionaste nada")
    }
    if (inputHipodoge.checked || inputCapipepo.checked || inputRatigueya.checked) {
        extraerAtaques()
        seleccionarMascotaEnemigo()
        //sectionSeleccionarAtaque.style.display = "flex"
        sectionVerMapa.style.display = "flex"
        sectionSeleccionarMascota.style.display = "none"
        /*botonFuego.addEventListener("click",ataqueFuego)
        botonAgua.addEventListener("click",ataqueAgua)
        botonTierra.addEventListener("click",ataqueTierra)*/
    }
}

function extraerAtaques(){
    let ataques
    mokepones.forEach((mokepon)=>{
        if(mascotaJudador == mokepon.nombre){
            ataques = mokepon.ataques    
        }
    })
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        opcionAtaques = `
        <button id=${ataque.id} class="btn-ataque BAtaque">${ataque.nombre}</button>
        `
        botonesAtaque.innerHTML += opcionAtaques
    })
    botonFuego = document.getElementById("btn-fuego")
    botonAgua = document.getElementById("btn-agua")
    botonTierra = document.getElementById("btn-tierra")
    botones = document.querySelectorAll(".BAtaque")
}

function seleccionarMascotaEnemigo() {
    let random = aleatorio(mokepones.length)-1
    spanMascotaEnemigo.innerHTML = mokepones[random].nombre
    ataquesEnemigo = mokepones[random].ataques
    secuenciaAtaque()
}
function secuenciaAtaque() {
    botones.forEach((boton)=>{
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "Fuego 🔥") {
                ataquesJugador.push("Fuego 🔥")
                boton.style.background = "#112f58"
                boton.disabled = true
            }else if(e.target.textContent === "Agua 💧"){
                ataquesJugador.push("Agua 💧")
                boton.style.background = "#112f58"
                boton.disabled = true
            }else{
                ataquesJugador.push("Tierra 🌿")
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            if (ataquesJugador.length==5) {
                ataqueEnemigoRandom()
            }
        })
    })
}
function ataqueEnemigoRandom() {
    ataquesEnemigo.sort(function() {
        return Math.random()-0.5
    })
    ataquesEnemigo.forEach((ataqueE)=>{
        randomAtaquesEnemigo.push(ataqueE.nombre)
    })
    combate()
}
function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataquesJugador[jugador]
    indexAtaqueEnemigo = randomAtaquesEnemigo[enemigo]
}
function combate() {
    for (let i = 0; i < ataquesJugador.length; i++) {
        if (ataquesJugador[i] == randomAtaquesEnemigo[i]) {
            indexAmbosOponentes(i,i)
            crearMensaje("Empate")
        }else if(ataquesJugador[i] == "Fuego 🔥" && randomAtaquesEnemigo[i] == "Tierra 🌿" || ataquesJugador[i] == "Tierra 🌿" && randomAtaquesEnemigo[i] == "Agua 💧" || ataquesJugador[i] == "Agua 💧" && randomAtaquesEnemigo[i] == "Fuego 🔥"){
            indexAmbosOponentes(i,i)
            crearMensaje("Gana")
            contadorJugador+=1
        }else{
            indexAmbosOponentes(i,i)
            crearMensaje("Pierde")
            contadorEnemigo+=1
        }
    }
    estadoVidas()
}
function indicadoresResultado(){

}
function crearMensaje(resultadoCombate) {
    if (resultadoCombate == "Empate") {
        indexAtaqueJugador = indexAtaqueJugador+" ⚠️"
        indexAtaqueEnemigo = indexAtaqueEnemigo+" ⚠️"
    }else if(resultadoCombate == "Gana"){
        indexAtaqueJugador = indexAtaqueJugador+" ✅"
        indexAtaqueEnemigo = indexAtaqueEnemigo+" ⛔"
    }else if(resultadoCombate == "Pierde"){
        indexAtaqueJugador = indexAtaqueJugador+" ⛔"
        indexAtaqueEnemigo = indexAtaqueEnemigo+" ✅"
    }
    let parrafoAtaqueJugador = document.createElement("p")
    parrafoAtaqueJugador.innerHTML = indexAtaqueJugador+""
    mensajesJugador.appendChild(parrafoAtaqueJugador)
    
    let parrafoAtaqueEnemigo = document.createElement("p")
    parrafoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo
    mensajesEnemigo.appendChild(parrafoAtaqueEnemigo)
    
    mensajesResultado.innerHTML = resultadoCombate
}
function estadoVidas() {
    spanMascotaJugador.innerHTML = contadorJugador
    spanMascotaEnemigo.innerHTML = contadorEnemigo
    if (contadorJugador == contadorEnemigo) {
        mensajesResultado.innerHTML = "EMPATE EN LA PARTIDA"
    }else if (contadorJugador > contadorEnemigo) {
        mensajesResultado.innerHTML = "FELICITACIONES, GANASTE LA PARTIDA"
    }else{
        mensajesResultado.innerHTML = "LO SIENTO, PERDISTE LA PARTIDA"
    }
    botonFuego.disabled = true;
    botonAgua.disabled = true;
    botonTierra.disabled = true;
    sectionReiniciar.style.display = "flex";
}
function reiniciarJuego() {
    location.reload()
}
window.addEventListener("load", iniciarJuego)
