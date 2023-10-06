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

let mascotaJudador
let ataqueJugador
let ataqueEnemigo
let mokepones = []
let opcionDeMokepones
let opcionAtaques
let inputHipodoge
let inputCapipepo
let inputRatigueya
let botonFuego
let botonAgua
let botonTierra
let contadorJugador = 3
let contadorEnemigo = 3
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
        extraerAtaques(mascotaJudador)
        seleccionarMascotaEnemigo()
        sectionSeleccionarAtaque.style.display = "flex"
        sectionSeleccionarMascota.style.display = "none"
        botonFuego.addEventListener("click",ataqueFuego)
        botonAgua.addEventListener("click",ataqueAgua)
        botonTierra.addEventListener("click",ataqueTierra)
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
        <button id=${ataque.id} class="btn-ataque">${ataque.nombre}</button>
        `
        botonesAtaque.innerHTML += opcionAtaques
    })
    botonFuego = document.getElementById("btn-fuego")
    botonAgua = document.getElementById("btn-agua")
    botonTierra = document.getElementById("btn-tierra")
}

function seleccionarMascotaEnemigo() {
    let random = aleatorio(3)
    spanMascotaEnemigo.innerHTML = mokepones[random-1].nombre
}
function ataqueFuego() {
    ataqueJugador = "ATAQUE 🔥"
    ataqueEnemigoRandom()
}
function ataqueAgua() {
    ataqueJugador = "ATAQUE 💧"
    ataqueEnemigoRandom()
}
function ataqueTierra() {
    ataqueJugador = "ATAQUE 🌿"
    ataqueEnemigoRandom()
}
function ataqueEnemigoRandom() {
    let random = aleatorio(3)
    if (random == 1) {
        ataqueEnemigo = "ATAQUE 🔥"
    }else if (random == 2) {
        ataqueEnemigo = "ATAQUE 💧"
    }else {
        ataqueEnemigo = "ATAQUE 🌿"
    }
    combate()
}
function crearMensaje(resultadoCombate) {
    let parrafoAtaqueJugador = document.createElement("p")
    parrafoAtaqueJugador.innerHTML = ataqueJugador
    mensajesJugador.appendChild(parrafoAtaqueJugador)
    
    let parrafoAtaqueEnemigo = document.createElement("p")
    parrafoAtaqueEnemigo.innerHTML = ataqueEnemigo
    mensajesEnemigo.appendChild(parrafoAtaqueEnemigo)
    
    mensajesResultado.innerHTML = resultadoCombate
}
function estadoVidas() {
    if(contadorJugador == 0 || contadorEnemigo == 0){
        if (contadorJugador > contadorEnemigo) {
            mensajesResultado.innerHTML = "FELICITACIONES, GANASTE LA PARTIDA"
        }else{
            mensajesResultado.innerHTML = "LO SIENTO, PERDISTE LA PARTIDA"
        }
        botonFuego.disabled = true;
        botonAgua.disabled = true;
        botonTierra.disabled = true;
        sectionReiniciar.style.display = "block";
    }
}
function combate() {
    
    if (ataqueJugador == ataqueEnemigo) {
        crearMensaje("EMPATE 🫱🫲")
    }else if(ataqueJugador == "ATAQUE 🔥" && ataqueEnemigo == "ATAQUE 🌿" || ataqueJugador == "ATAQUE 🌿" && ataqueEnemigo == "ATAQUE 💧" || ataqueJugador == "ATAQUE 💧" && ataqueEnemigo == "ATAQUE 🔥"){
        contadorEnemigo -= 1
        spanvidaMascotaEnemigo.innerHTML = contadorEnemigo 
        crearMensaje("GANASTE 🎉")
    }else{
        contadorJugador -= 1
        spanvidaMascotaJugador.innerHTML = contadorJugador
        crearMensaje("PERDISTE 😭")
    }
    estadoVidas()
}
function reiniciarJuego() {
    location.reload()
}
window.addEventListener("load", iniciarJuego)
