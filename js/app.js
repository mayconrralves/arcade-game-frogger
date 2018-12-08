// Inimigos que nosso jogador deve evitar
var Enemy = function(y) {
    // As variáveis aplicadas a nossas instâncias entram aqui.
    // Fornecemos uma a você para que possa começcar.
    this.x = -120;
    this.y = y;
    // A imagem/sprite de nossos inimigos, isso usa um
    // ajudante que é fornecido para carregar imagens
    // com facilidade.
    this.sprite = 'images/enemy-bug.png';
};

// Atualize a posição do inimigo, método exigido pelo jogo
// Parâmetro: dt, um delta de tempo entre ticks
Enemy.prototype.update = function(dt) {
    // Você deve multiplicar qualquer movimento pelo parâmetro
    // dt, o que garantirá que o jogo rode na mesma velocidade
    // em qualquer computador.
    this.x = this.x+120*dt;
    if(this.x >550)
        this.x=0;

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
        let stepY = 83;
        let stepX = 100;
        console.log(this.y);
        if((this.x === 0 && this.key === "left")|| (this.x === 400 && this.key === "right")){
            this.key=null;
            return;
        }
        if(this.y+stepY > 380 && this.key === "down"){
            this.key=null;
            return;
        }
        if(this.y === -35) {
            this.y = 380;
            this.x = 200;
            this.key = null;
        }
        if(this.key === "left") {
            this.x -= stepX;
        }
        else if(this.key === "up") {
            this.y -= stepY;
        }
        else if(this.key === "right") {
            this.x += stepX;
        }
        //down
        else if(this.key === "down") {
            this.y +=stepY;
        }
        this.key=null;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(key){
        this.key=key;

    }

}

// Represente seus objetos como instâncias.
// Coloque todos os objetos inimgos numa array allEnemies
// Coloque o objeto do jogador numa variável chamada jogador.
var allEnemies = [new Enemy(60),new Enemy(140),new Enemy(220)];
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
