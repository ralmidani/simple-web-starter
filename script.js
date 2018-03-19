const game = new Phaser.Game(1000, 750, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('ball', 'assets/ball.png')
    game.load.image('paddle', 'assets/paddle.png');
}

let ball, leftPaddle, rightPaddle;

var upKey;
var downKey;
var aKey;
var zKey;

var p1Score = 0;
var p1Text = '0';
var p2Score = 0;
var psText = '0';

function create() {

    ball = game.add.sprite(80, 350, 'ball');
    leftPaddle = game.add.sprite(20, 350, 'paddle');
    rightPaddle = game.add.sprite(950, 350, 'paddle');

    //  A simple animation that flashes the 'eyes' of the sprite
    // face1.animations.add('flash', [0,1,2,3,2,1,0], 24, false);
    // face2.animations.add('flash', [0,1,2,3,2,1,0], 24, false);

    //  Set-up the physics bodies
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.checkCollision.left = false;
    game.physics.arcade.checkCollision.right = false;

    game.physics.arcade.enable([ball, leftPaddle, rightPaddle]);


    ball.body.collideWorldBounds = true;
    
    ball.body.velocity.setTo(350, 30);
    ball.body.bounce.set(1.05);

    leftPaddle.body.velocity.setTo(0, 0);
    leftPaddle.body.bounce.set(1);
    leftPaddle.body.immovable = true;
    
    rightPaddle.body.velocity.setTo(0, 0);
    rightPaddle.body.bounce.set(1);
    rightPaddle.body.immovable = true;

    //---------------------------------------------------------------------------
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    zKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);

    //---------------------------------------------------------------------------

    p1Text = game.add.text(200, 150, "- You have clicked -\n0 times !", {
        font: "65px Arial",
        fill: "white",
        align: "center"
    });

    p1Text.anchor.setTo(0.5, 0.5);


    // -----------------------------------------------------------------------------

    //   Usually you'd provide a callback to the `game.physics.arcade.collide` function,
    //   which is passed the two sprites involved in the collision, which you can then
    //   perform further processing on. However you can also use this signal:

    // face1.body.onCollide = new Phaser.Signal();
    // face1.body.onCollide.add(hitSprite, this);

    //  You still need to call `collide` in your update function, and you can still use
    //  a callback with it too, but this Signal provides for another level of notification.

}

// function hitSprite (sprite1, sprite2) {

//     sprite1.play('flash');
//     sprite2.play('flash');
    
// }

function update () {

    game.physics.arcade.collide(ball, leftPaddle);
    game.physics.arcade.collide(ball, rightPaddle);

    if (upKey.isDown)
    {
        rightPaddle.y-=2;
    }
    else if (downKey.isDown)
    {
        rightPaddle.y+=2;
    }

    if (aKey.isDown)
    {
        leftPaddle.y-=2;
    }
    else if (zKey.isDown)
    {
        leftPaddle.y+=2;
    }

    if(ball.x < leftPaddle.x) {
        updateLeft();
    }

}

function updateLeft() {
    p1Score++;
    p1Text.setText("" + p1Score);
}