window.addEventListener('load', function () {

    // --- Canvas Setup ---
    const canvas = document.getElementById('kevin_rpg_2');
    const ctx = canvas.getContext('2d');
    canvas.width = 1550;
    canvas.height = 600;

    // --- Asset Loading ---
    const npcSprite = new Image();
    const backgroundImage = new Image();
    backgroundImage.src = 'assets/vegasstrip.jpg';

    // Tracks the active cleanup function for the current screen
    let cleanup;

    // --- Classes ---

    class Background {
        constructor(game) {
            this.game = game;
            this.image = null;
        }
        update(image) {
            this.image = image;
        }
        draw(context) {
            if (!this.image) return;
            context.drawImage(this.image, 0, 0, this.game.width, this.game.height);
        }
    }

    class NPC {
        constructor(game) {
            this.game = game;
            this.width = 200;
            this.height = 400;
            // Keep NPC within canvas bounds (x + width <= canvas.width)
            this.x = 1350;
            this.y = 200;
            this.sprite = null;
        }
        update(sprite) {
            this.sprite = sprite;
        }
        draw(context) {
            if (!this.sprite) return;
            context.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        }
    }

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.background = new Background(this);
            this.npc = new NPC(this);
        }
        update() {
            this.background.update(backgroundImage);
            this.npc.update(npcSprite);
        }
        draw(context) {
            this.background.draw(context);
            this.npc.draw(context);
        }
    }

    // --- Game Instance ---
    const game = new Game(canvas.width, canvas.height);

    // --- Main Menu ---
    function mainmenu() {
        const title = new Image();
        const video = document.createElement('video');

        let videoLoaded = false;
        let titleLoaded = false;
        let animFrameId;

        video.oncanplay = () => { videoLoaded = true; };
        title.onload = () => { titleLoaded = true; };

        title.src = 'assets/title.png';
        video.src = 'assets/erika-kirk-kirk.mp4';
        video.autoplay = true;
        video.loop = true;
        video.muted = true;

        // Autoplay may be blocked; retry on first user interaction
        video.play().catch(() => {
            const retry = () => video.play();
            document.addEventListener('mousemove', retry, { once: true });
            document.addEventListener('touchstart', retry, { once: true });
        });

        function render() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (videoLoaded) {
                for (let x = 10; x < 1500; x += 250) {
                    ctx.drawImage(video, x, 125);
                }
            }
            if (titleLoaded) {
                ctx.drawImage(title, 200, 0);
            }

            animFrameId = requestAnimationFrame(render);
        }

        // Create and insert the start button
        const button = document.getElementById('start-button');
        button.textContent = 'Start Game';
        button.onclick = () => window.startgame();
        canvas.parentElement.appendChild(button);

        render();

        return function cleanup() {
            cancelAnimationFrame(animFrameId);
            video.pause();
            video.src = '';
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            button.remove();
        };
    }

    cleanup = mainmenu();

    // --- Game Loop ---
    function gameloop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(gameloop);
    }

    // Exposed globally so the start button can trigger it
    window.startgame = function () {
        cleanup();
        gameloop();
    };

});