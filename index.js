window.addEventListener('load', function () {
    //canvas setup
    const canvas = document.getElementById('kevin_rpg_2');

    //Drawing context, lets us draw and animate on our canvas element
    const ctx = canvas.getContext('2d');

    //This is retarded but seems to work
    canvas.width = 1550;
    canvas.height = 600;

    //NPC sprites
    const currnpc = new Image();
    currnpc.src = 'assets/woowooweewee.png';

    //For handling main menu change
    let cleanup;

    //Class declaration, add these as you go (oop principles)
    class InputHandler {

    }
    class Card {

    }
    class Item {

    }
    class Date {

    }
    class Background {

    }
    class NPC {
        constructor(game) {
            this.game = game;
            this.width = 200;
            this.height = 400;
            //Update these later, for now just draw on screen. screen size (1200, 400)
            this.x = 1375;
            this.y = 200;
        }
        update(sprite) {
            //Replace the sprite
            this.sprite = sprite;
        }
        draw(context) {
            if (!this.sprite) return;
            context.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        }
    }
    class UI {
        //May not need this, should display money and handle transactions
    }
    class Game {
        //All other classes will be encapsulated within this one
        constructor(width, height) {
            this.width = width;
            this.height = height;
            //calling our other class constructors from game
            this.npc = new NPC(this);
        }
        /*Can call all dependent update/draw methods here. 
        TODO: You MIGHT have to change this since this game
        Doesnt have animation and wont need a redraw on each pass.
        */
        update() {
            this.npc.update(currnpc);
        }
        draw(context) {
            this.npc.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);

    function mainmenu() {
        const title = new Image();
        const gif = document.createElement('video');
        //TODO: load dark souls music lmao

        let gifLoaded = false;
        let titleLoaded = false;
        let animFrameId;

        //set event listener so picture renders after its fully loaded
        gif.oncanplay = () => { gifLoaded = true; };
        title.onload = () => { titleLoaded = true; };


        title.src = 'assets/title.png';
        gif.src = 'assets/erika-kirk-kirk.mp4';
        gif.autoplay = true;
        gif.loop = true;
        gif.muted = true;

        //loads
        function loadorder() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (gifLoaded) {
                for (let i = 10; i < 1500; i += 250) {
                    ctx.drawImage(gif, i, 125);
                }
            }
            if (titleLoaded) ctx.drawImage(title, 200, 0);

            animFrameId = requestAnimationFrame(loadorder);
        }

        loadorder();

        function cleanup() {
            cancelAnimationFrame(animFrameId);
            gif.pause();
            gif.src = '';
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let button = document.getElementById('start-button');
            button.remove();
        }

        return cleanup
    }
    cleanup = mainmenu();

    window.startgame = function () {
        cleanup();
        gameloop();
    }

    //Game loop. maybe we only call this when a click listener is triggered?
    function gameloop() {
        //Again these MAY IN FACT NOT BE NECESSARY!
        game.update();
        game.draw(ctx);
        //might want to swap this out and execute gameloop during click listeners.
        requestAnimationFrame(gameloop);
    }
});