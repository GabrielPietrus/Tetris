let canvas;
let ctx;
let altura = 20; 
let largura = 12; 
let startX = 4; 
let startY = 0; 
let pontuacao = 0; 
let nivel = 1; 
let status = "JOGANDO";
let coordenada = [...Array(altura)].map(e => Array(largura).fill(0));
let curTetromino = [[1,0], [0,1], [1,1], [2,1]];
let tetrominos = [];
let tetrominoCor = ['purple','cyan','blue','yellow','orange','green','red'];
let curTetrominoCor;
let ArrayBorda = [...Array(20)].map(e => Array(12).fill(0));
let arrayParado = [...Array(20)].map(e => Array(12).fill(0));
let DIRECAO = {
    IDLE: 0,
    BAIXO: 1,
    ESQUERDA: 2,
    DIREITA: 3
};
let direcao;
class Coordenadas{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
document.addEventListener('DOMContentLoaded', SetupCanvas); 

function criarCoordenada(){
    let xR = 0, yR = 19;
    let i = 0, j = 0;
    for(let y = 9; y <= 446; y += 23){
       
        for(let x = 11; x <= 264; x += 23){
            coordenada[i][j] = new Coordenadas(x,y);
            
            i++;
        }
        j++;
        i = 0;
    }
}
function SetupCanvas(){
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 936;
    canvas.height = 956;   
    ctx.scale(2, 2);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);  
    ctx.strokeStyle = 'black';
    ctx.strokeRect(8, 8, 280, 462);
    tetrisLogo = new Image(161, 54);
    tetrisLogo.onload = desenharLogo;
    tetrisLogo.src = "tetrislogo2.png";  
    ctx.fillStyle = 'black';
    ctx.font = '21px Fantasy';
    ctx.fillText("PONTUAÇÃO", 300, 98); 
    ctx.strokeRect(300, 107, 161, 24);  
    ctx.fillText(pontuacao.toString(), 310, 127);  
    ctx.fillText("NÍVEL", 300, 157);  
    ctx.strokeRect(300, 171, 161, 24);   
    ctx.fillText(nivel.toString(), 310, 190);   
    ctx.fillText("STATUS", 300, 221);   
    ctx.fillText(status, 310, 261);  
    ctx.strokeRect(300, 232, 161, 95);  
    ctx.fillText("CONTROLES", 300, 354); 
    ctx.strokeRect(300, 366, 161, 104);
    ctx.font = '19px Fantasy';
    ctx.fillText("A : Esquerda", 310, 388);
    ctx.fillText("D : Direita", 310, 413);
    ctx.fillText("S : Baixo", 310, 438);
    ctx.fillText("E : Girar", 310, 463);

    document.addEventListener('keydown', HandleKeyPress);
 
    criarTetrominos(); 
    criarTetromino();
    criarCoordenada();
    desenharTetromino();
}
function desenharLogo(){
    ctx.drawImage(tetrisLogo, 300, 8, 161, 54);
}
function desenharTetromino(){   
    for(let i = 0; i < curTetromino.length; i++){
        let x = curTetromino[i][0] + startX;
        let y = curTetromino[i][1] + startY;   
        ArrayBorda[x][y] = 1;  
        let coorX = coordenada[x][y].x;
        let coorY = coordenada[x][y].y;    
        ctx.fillStyle = curTetrominoCor;
        ctx.fillRect(coorX, coorY, 21, 21);
    }
}
function HandleKeyPress(key){
    if(status != "VOCÊ PERDEU"){   
    if(key.keyCode === 65){     
        direcao = DIRECAO.ESQUERDA;
        if(!limiteParede() && !colisaoHorizontal()){
            deletarTetromino();
            startX--;
            desenharTetromino();
        }  
    } else if(key.keyCode === 68){     
        direcao = DIRECAO.DIREITA;
        if(!limiteParede() && !colisaoHorizontal()){
            deletarTetromino();
            startX++;
            desenharTetromino();
        }    
    } else if(key.keyCode === 83){
        moverBaixo();      
    } else if(key.keyCode === 69){
        girarTetromino();
    }
    } 
}
function moverBaixo(){   
    direcao = DIRECAO.BAIXO;    
    if(!colisaoVertical()){
        deletarTetromino();
        startY++;
        desenharTetromino();
    }
}
var dificuldade = prompt("Para escolher a dificuldade, digite: 1 - Facil | 2 - Normal | 3 - Dificil ","Dificuldade");
if (dificuldade == 1) {
window.setInterval(function(){
    if(status != "VOCÊ PERDEU"){
        moverBaixo();
    }
  }, 1200);
}
if (dificuldade == 2) {
    window.setInterval(function(){
        if(status != "VOCÊ PERDEU"){
            moverBaixo();
        }
      }, 800);
    }
    if (dificuldade == 3) {
        window.setInterval(function(){
            if(status != "VOCÊ PERDEU"){
                moverBaixo();
            }
          }, 300);
        }
function deletarTetromino(){
    for(let i = 0; i < curTetromino.length; i++){
        let x = curTetromino[i][0] + startX;
        let y = curTetromino[i][1] + startY;   
        ArrayBorda[x][y] = 0; 
        let coorX = coordenada[x][y].x;
        let coorY = coordenada[x][y].y;
        ctx.fillStyle = 'white';
        ctx.fillRect(coorX, coorY, 21, 21);
    }
}
function criarTetrominos(){   
    tetrominos.push([[1,0], [0,1], [1,1], [2,1]]);  
    tetrominos.push([[0,0], [1,0], [2,0], [3,0]]);   
    tetrominos.push([[0,0], [0,1], [1,1], [2,1]]);   
    tetrominos.push([[0,0], [1,0], [0,1], [1,1]]);   
    tetrominos.push([[2,0], [0,1], [1,1], [2,1]]);  
    tetrominos.push([[1,0], [2,0], [0,1], [1,1]]);  
    tetrominos.push([[0,0], [1,0], [1,1], [2,1]]);
}
function criarTetromino(){   
    let tetrominoAleatorio = Math.floor(Math.random() * tetrominos.length);   
    curTetromino = tetrominos[tetrominoAleatorio];
    curTetrominoCor = tetrominoCor[tetrominoAleatorio];
}
function limiteParede(){
    for(let i = 0; i < curTetromino.length; i++){
        let newX = curTetromino[i][0] + startX;
        if(newX <= 0 && direcao === DIRECAO.ESQUERDA){
            return true;
        } else if(newX >= 11 && direcao === DIRECAO.DIREITA){
            return true;
        }  
    }
    return false;
}
function colisaoVertical(){ 
    let tetrominoCopy = curTetromino; 
    let colisao = false;   
    for(let i = 0; i < tetrominoCopy.length; i++){        
        let quadrado = tetrominoCopy[i];      
        let x = quadrado[0] + startX;
        let y = quadrado[1] + startY;
        if(direcao === DIRECAO.BAIXO){
            y++;
        }       
        if(typeof arrayParado[x][y+1] === 'string'){           
            deletarTetromino();            
            startY++;
            desenharTetromino();
            colisao = true;
            break;
        }
        if(y >= 20){
            colisao = true;
            break;
        }
    }
    if(colisao){       
        if(startY <= 2){
            status = "VOCÊ PERDEU";
            ctx.fillStyle = 'white';
            ctx.fillRect(310, 242, 140, 30);
            ctx.fillStyle = 'black';
            ctx.fillText(status, 310, 261);
        } else {            
            for(let i = 0; i < tetrominoCopy.length; i++){
                let quadrado = tetrominoCopy[i];
                let x = quadrado[0] + startX;
                let y = quadrado[1] + startY;
              
                arrayParado[x][y] = curTetrominoCor;
            }           
            checarFileiraPreenchida();
            criarTetromino();           
            direcao = DIRECAO.IDLE;
            startX = 4;
            startY = 0;
            desenharTetromino();
        }

    }
}
function colisaoHorizontal(){
    var tetrominoCopy = curTetromino;
    var colisao = false;   
    for(var i = 0; i < tetrominoCopy.length; i++)
    {      
        var quadrado = tetrominoCopy[i];
        var x = quadrado[0] + startX;
        var y = quadrado[1] + startY;      
        if (direcao == DIRECAO.ESQUERDA){
            x--;
        }else if (direcao == DIRECAO.DIREITA){
            x++;
        }      
        var stoppedShapeVal = arrayParado[x][y];       
        if (typeof stoppedShapeVal === 'string')
        {
            colisao=true;
            break;
        }
    }
    return colisao;
}
function checarFileiraPreenchida(){
    let fileirasParaDeletar = 0;
    let inicioDeletar = 0;    
    for (let y = 0; y < altura; y++)
    {
        let completed = true;
    
        for(let x = 0; x < largura; x++)
        {           
            let quadrado = arrayParado[x][y];           
            if (quadrado === 0 || (typeof quadrado === 'undefined'))
            {               
                completed=false;
                break;
            }
        }       
        if (completed)
        {          
            if(inicioDeletar === 0) inicioDeletar = y;
            fileirasParaDeletar++;          
            for(let i = 0; i < largura; i++)
            {              
                arrayParado[i][y] = 0;
                ArrayBorda[i][y] = 0;               
                let coorX = coordenada[i][y].x;
                let coorY = coordenada[i][y].y;               
                ctx.fillStyle = 'white';
                ctx.fillRect(coorX, coorY, 21, 21);
            }
        }
    }
    if(fileirasParaDeletar > 0){
        pontuacao += 10;
        ctx.fillStyle = 'white';
        ctx.fillRect(310, 109, 140, 19);
        ctx.fillStyle = 'black';
        ctx.fillText(pontuacao.toString(), 310, 127);
        moverTodasFileiras(fileirasParaDeletar, inicioDeletar);
    }
}
function moverTodasFileiras(fileirasParaDeletar, inicioDeletar){
    for (var i = inicioDeletar-1; i >= 0; i--)
    {
        for(var x = 0; x < largura; x++)
        {
            var y2 = i + fileirasParaDeletar;
            var quadrado = arrayParado[x][i];
            var proximoQuadrado = arrayParado[x][y2];
            if (typeof quadrado === 'string')
            {
                proximoQuadrado = quadrado;
                ArrayBorda[x][y2] = 1; 
                arrayParado[x][y2] = quadrado;              
                let coorX = coordenada[x][y2].x;
                let coorY = coordenada[x][y2].y;
                ctx.fillStyle = proximoQuadrado;
                ctx.fillRect(coorX, coorY, 21, 21);
                quadrado = 0;
                ArrayBorda[x][i] = 0; 
                arrayParado[x][i] = 0; 
                coorX = coordenada[x][i].x;
                coorY = coordenada[x][i].y;
                ctx.fillStyle = 'white';
                ctx.fillRect(coorX, coorY, 21, 21);
            }
        }
    }
}
function girarTetromino()
{
    let novaRotacao = new Array();
    let tetrominoCopy = curTetromino;
    let curTetrominoBU;
    for(let i = 0; i < tetrominoCopy.length; i++)
    {       
        curTetrominoBU = [...curTetromino];      
        let x = tetrominoCopy[i][0];
        let y = tetrominoCopy[i][1];
        let newX = (pegaUltimoX() - y);
        let newY = x;
        novaRotacao.push([newX, newY]);
    }
    deletarTetromino();   
    try{
        curTetromino = novaRotacao;
        desenharTetromino();
    }   
    catch (e){ 
        if(e instanceof TypeError) {
            curTetromino = curTetrominoBU;
            deletarTetromino();
            desenharTetromino();
        }
    }
}
function pegaUltimoX()
{
    let ultimoX = 0;
     for(let i = 0; i < curTetromino.length; i++)
    {
        let quadrado = curTetromino[i];
        if (quadrado[0] > ultimoX)
            ultimoX = quadrado[0];
    }
    return ultimoX;
}