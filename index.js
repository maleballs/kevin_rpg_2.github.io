import { Game } from "./game.js";

window.addEventListener('load', function () {

    // --- Canvas Setup ---
    const canvas = document.getElementById('kevin_rpg_2');
    const ctx = canvas.getContext('2d');
    canvas.width = 1550;
    canvas.height = 600;

    const dialogueBox = document.getElementById('dialogue-box');

    //Ear sex
    const earsex = new Audio('assets/KEVIN_RPG_2_THEME.mp3');
    earsex.loop = true;

    // Tracks the active cleanup function for the current screen
    let cleanup;

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
        video.muted = false;

        // Autoplay may be blocked; retry on first user interaction
        video.play().catch(() => {
            const retry = () => video.play();
            document.addEventListener('mousemove', retry, { once: true });
            document.addEventListener('touchstart', retry, { once: true });
        });

        //try and paly audio as well
        earsex.play().catch(() => {
            const retry = () => { earsex.play(); document.removeEventListener('click', retry); };
            document.addEventListener('click', retry);
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

        const button = document.getElementById('start-button');
        button.textContent = 'Start Game';
        button.onclick = () => window.startgame();
        canvas.parentElement.appendChild(button);

        render();

        return function cleanup() {
            cancelAnimationFrame(animFrameId);
            earsex.pause();
            video.pause();
            video.src = '';
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            button.remove();
            dialogueBox.removeAttribute('hidden');
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