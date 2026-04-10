import { Background } from "./background.js";
import { UI } from "./ui.js";
import { NPC } from "./npc.js";

export class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.background = new Background(this);
        this.ui = new UI(this);
        this.npc = new NPC(this);

        this.backgroundImage = new Image();
        this.backgroundImage.src = 'assets/vegasstrip.jpg';

        this.npcSprite = new Image();
    }
    update() {
        this.background.update(this.backgroundImage);
        this.ui.update(this.npc.getCurrentDialogue());
        this.npc.update(this.npcSprite);
    }
    draw(context) {
        this.background.draw(context);
        this.npc.draw(context);
        this.ui.draw(context);
    }
}