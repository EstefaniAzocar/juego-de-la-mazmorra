//Variable del lienzo
let canvas;
//Variable del conexto
let ctx;
//FPS
const FPS = 50;

//Ancho de la ficha
let anchoF = 50;
let altoF = 50;

//Tipo de ficha
let pasto = "green";
let agua = "blue";
let tierra = "brown"

//Escenario Array - Matriz
let escenario = [
    [0,0,0,0,0,0,0,0,0,2,2,0,0,0,0],
    [0,2,2,2,2,2,2,2,2,2,0,0,0,0,0],
    [0,0,0,0,0,0,2,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,0,0,0,0,0,0,0,0],
    [0,0,0,3,2,2,2,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,2,2,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,2,2,2,2,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,2,2,2,2] 
]

//Construir escenario
function dibujarEscenario(){
    let color;
    //Recorror el alto del escenario
    for(y = 0; y < 10; y++){
        //Recorrer el ancho del escenario
        for(x = 0; x < 15; x++){
            //Compara para reemplazar la ficha
            if(escenario[y][x] == 0){
                color = pasto;
            }
            if(escenario[y][x] == 1){
                color = agua;
            }
            if(escenario[y][x] == 2){
                color = tierra;
            }
            ctx.fillStyle = color
            ctx.fillRect(x*anchoF, y*altoF, anchoF, altoF)
        }
    }
}

//declaramos la funcion del personaje

let jugador = function(){
    // atributo de esta clase
    this.x = 1;
    this.y = 1;
    this.color = "black"

    //Metodos
    this.dibuja = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x*anchoF, this.y*altoF, anchoF, altoF);
    }

    this.arriba = function(){
        if (this.margenes(this.x, this.y - 1) ==false){
            this.y--
        }
     
    }
    this.abajo = function(){
        if (this.margenes(this.x, this.y +1) ==false){
            this.y++
        }
    }
    this.izquierda = function(){
        if (this.margenes(this.x - 1, this.y) ==false){
            this.x--
        }
    }
    this.derecha = function(){
        if (this.margenes(this.x + 1, this.y) ==false){
            this.x++
        }
    }
    this.margenes = function(x,y){
        let colisiones = false
        if(escenario[y][x] == 0){
            colisiones = true
        }
        return(colisiones)
    }

}
// Variable global
let protagonista;

//Esta funcion activa todo 
function inicializa(){
    canvas = document.getElementById("canva")
    ctx = canvas.getContext("2d")

    //creo el jugador
    protagonista = new jugador()

    // lectura del teclado
    document.addEventListener('keydown', function(tecla){
        if(tecla.key == "ArrowUp"){
            protagonista.arriba()
        }
        else if(tecla.key == "ArrowDown"){
            protagonista.abajo()
        }
        else if(tecla.key == "ArrowLeft"){
            protagonista.izquierda()
        }
        else if(tecla.key == "ArrowRight"){
            protagonista.derecha()
        }
    })

    //Cantidad de tiempo que va a usar el personaje para moverse
    setInterval(function(){
        principal()
    },1000/FPS)
    
    

}

//Esta función centraliza las demas funciones
function principal(){

    dibujarEscenario()
    protagonista.dibuja()

}







