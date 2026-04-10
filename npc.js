import { story } from "./dialogue.js";

export class NPC {
    constructor(game) {
        this.game = game;
        this.width = 200;
        this.height = 400;
        this.x = 1350;
        this.y = 200;
        this.sprite = null;
        this.story = story;
        this.storyIndex = 0;
        this.dialogueIndex = 0;
    }
    update(sprite) {
        this.sprite = sprite;
    }
    draw(context) {
        if (!this.sprite) return;
        context.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }
    getCurrentDialogue() {
        return this.story[this.storyIndex]?.events[this.dialogueIndex] ?? "";
    }
    advanceDialogue() {
        this.dialogueIndex++;
        if (this.dialogueIndex >= this.story[this.storyIndex].events.length) {
            this.storyIndex++;
            this.dialogueIndex = 0;
        }
    }
}