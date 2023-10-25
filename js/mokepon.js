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

let idMascotaJugador
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

let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./img/mokemap.png"

const anchoMaximo = 650
let anchoResponsive = window.innerWidth - 20
if (anchoResponsive > anchoMaximo) {
    anchoResponsive = anchoMaximo
}
let alturaResponsive = anchoResponsive*600/800
mapa.width = anchoResponsive
mapa.height = alturaResponsive

class Mokepon{
    constructor(nombre, foto, vida, fotoMapa){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(mapa.width-this.ancho)
        this.y = aleatorio(mapa.height-this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadY = 0 
        this.velocidadX = 0 
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon("Hipodoge", "img/hipodoge.png", 3, "img/minhipodoge.png")
let capipepo = new Mokepon("Capipepo", "img/capipepo.png", 4, "img/mincapipepo.png")
let ratigueya = new Mokepon("Ratigueya", "img/ratigueya.png", 2, "img/minratigueya.png")
let hipodogeEnemigo = new Mokepon("Hipodoge", "img/hipodoge.png", 3, "img/minhipodoge.png")
let capipepoEnemigo = new Mokepon("Capipepo", "img/capipepo.png", 4, "img/mincapipepo.png")
let ratigueyaEnemigo = new Mokepon("Ratigueya", "img/ratigueya.png", 2, "img/minratigueya.png")

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
hipodogeEnemigo.ataques.push(
    { nombre: "Agua 💧", id: "btn-agua" },
    { nombre: "Agua 💧", id: "btn-agua" },
    { nombre: "Agua 💧", id: "btn-agua" },
    { nombre: "Fuego 🔥", id: "btn-fuego" },
    { nombre: "Tierra 🌿", id: "btn-tierra" }
)
capipepoEnemigo.ataques.push(
    { nombre: "Tierra 🌿", id: "btn-tierra" },
    { nombre: "Tierra 🌿", id: "btn-tierra" },
    { nombre: "Tierra 🌿", id: "btn-tierra" },
    { nombre: "Fuego 🔥", id: "btn-fuego" },
    { nombre: "Agua 💧", id: "btn-agua" }
)
ratigueyaEnemigo.ataques.push(
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
        idMascotaJugador = inputHipodoge.id
    }else if (inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        idMascotaJugador = inputCapipepo.id
    }else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        idMascotaJugador = inputRatigueya.id
    }else{
        alert("No seleccionaste nada")
    }
    if (inputHipodoge.checked || inputCapipepo.checked || inputRatigueya.checked) {
        extraerAtaques()
        sectionVerMapa.style.display = "flex"
        sectionSeleccionarMascota.style.display = "none"
        mokeponJugador = obtenerObjetoMascota()
        iniciarMapa()
    }
}
function extraerAtaques(){
    let ataques
    mokepones.forEach((mokepon)=>{
        if(idMascotaJugador == mokepon.nombre){
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
function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesEnemigo = enemigo.ataques
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
function obtenerObjetoMascota() {
    let miMokepon
    mokepones.forEach(mokepon => {
        if (mokepon.nombre == idMascotaJugador) {
            miMokepon = mokepon
        }
    })
    return miMokepon
}
function iniciarMapa() {
    intervalo = setInterval(pintarCanvas,20)
    window.addEventListener("keydown",movimientoTeclado)
    window.addEventListener("keyup",detener)
}
function movimientoTeclado(event) {
        if (event.key == "ArrowRight"){
            moverDerecha()
        }else if (event.key == "ArrowLeft") {
            moverIzquierda()   
        }else if (event.key == "ArrowUp") {
            moverArriba()
        }else if (event.key == "ArrowDown"){
            moverAbajo()
        }
}
function responsiveMap() {
    
}
function pintarCanvas(){
    mokeponJugador.x += mokeponJugador.velocidadX
    mokeponJugador.y += mokeponJugador.velocidadY
    lienzo.clearRect(0,0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mokeponJugador.pintarMokepon()
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()
    if (mokeponJugador.velocidadX != 0 || mokeponJugador.velocidadY != 0) {
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
    }
}
function moverArriba() {
    mokeponJugador.velocidadY = -5
}
function moverAbajo() {
    mokeponJugador.velocidadY = 5
}
function moverIzquierda() {
    mokeponJugador.velocidadX = -5
}
function moverDerecha() {
    mokeponJugador.velocidadX = 5
}
function detener() {
    mokeponJugador.velocidadX = 0
    mokeponJugador.velocidadY = 0
}
function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const izquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.ancho
    
    const arribaMascota = mokeponJugador.y
    const abajoMascota = mokeponJugador.y + mokeponJugador.alto
    const izquierdaMascota = mokeponJugador.x
    const derechaMascota = mokeponJugador.x + mokeponJugador.ancho

    if (abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo) {
        return
    }
    detener()
    alert("Hay colisión con "+enemigo.nombre)
    sectionVerMapa.style.display = "none"
    sectionSeleccionarAtaque.style.display = "flex"
    seleccionarMascotaEnemigo(enemigo)
}
window.addEventListener("load", iniciarJuego)