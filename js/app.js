
//número de vitórias
var numberWins = 0;
//https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
//retorna um valor de um array aleatoriamente
function randomIntFromArray(array) {
        return array[randomIntFromInterval(0,array.length-1)];
    }
//atualiza o header do jogo, onde conta o número de vitórias
function renderVictory() {
    let element = document.getElementById("win");
    element.innerHTML = "";
    let win = document.createElement("p");
    let node = document.createTextNode("Vitórias: "+(++numberWins));
    win.appendChild(node);
    
    element.appendChild(win);
}
// Inimigos que nosso jogador deve evitar
var Enemy = function() {
    // As variáveis aplicadas a nossas instâncias entram aqui.
    // Fornecemos uma a você para que possa começar.
    this.x = randomIntFromArray([250,300,400]);
    this.y = randomIntFromInterval([60,140,225]);;
    // A imagem/sprite de nossos inimigos, isso usa um
    // ajudante que é fornecido para carregar imagens
    // com facilidade.
    this.sprite = 'images/enemy-bug.png';
    this.speed = randomIntFromArray([100, 150,200,250,300,400]);
};
// Atualize a posição do inimigo, método exigido pelo jogo
// Parâmetro: dt, um delta de tempo entre ticks
Enemy.prototype.update = function(dt) {
    // Você deve multiplicar qualquer movimento pelo parâmetro
    // dt, o que garantirá que o jogo rode na mesma velocidade
    // em qualquer computador.
    this.x = this.x+this.speed*dt;
    if(this.x > 550)
    {
        this.x = -randomIntFromInterval(300,600);
        this.y = randomIntFromArray([60,140,225]);
        this.speed = randomIntFromArray([250,300,400]);
    }
    this.collision();
};

Enemy.prototype.collision = function() {

    if (player.y + 131 >= this.y + 90 && player.y + 74 <= this.y + 135 && 
        player.x + 25 <= this.x + 88 && player.x + 76 >= this.x + 11) {
        player = new Player();
    }
};

// Desenhe o inimigo na tela, método exigido pelo jogo
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Agora, escreva sua própria classe de jogador
// Esta classe exige um método update(), 
// um render() e um handleInput().
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 380;
    }
    update() {
       }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    //função que captura e direciona o player
    handleInput(key){
        let stepY = 83;
        let stepX = 100;

        if((this.x === 0 && key === "left")|| (this.x === 400 && key === "right")){
            key=null;
            return;
        }
        if(this.y+stepY > 380 && key === "down"){
            key=null;
            return;
        }
        if(key === "left") {
            this.x -= stepX;
        }
        else if(key === "up") {
            if(this.y < 50) {
                this.render();
                renderVictory();
                //paralisa a tela por alguns milisegundos
                setTimeout(() => {
                this.y = 380;
                this.x = 200;
                key = null;
                return;
                },200);
            }
            this.y -= stepY;
        }
        else if(key === "right") {
            this.x += stepX;
        }
        //down
        else if(key === "down") {
            this.y +=stepY;
        }
        key=null;

    }

}

// Represente seus objetos como instâncias.
// Coloque todos os objetos inimgos numa array allEnemies
// Coloque o objeto do jogador numa variável chamada jogador.
var allEnemies = [];
var player = new Player();


// Isto reconhece cliques em teclas e envia as chaves para seu
// jogador. método handleInput(). Não é preciso mudar nada.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
//adiciona ´inimigos
function newGame() {
    allEnemies.length=0;
    for(let i=0; i < 7; i++) {
        allEnemies.push(new Enemy());
    }

}

document.addEventListener("DOMContentLoaded", function(event) { 
  newGame();
});