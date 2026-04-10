export class UI {
    constructor(game) {
        this.game = game;
        this.dialogueBox = document.getElementById('dialogue-box');
        this.dialogueText = this.dialogueBox.querySelector('p');
    }
    update(text) {
        this.dialogueText.textContent = text;
    }
    draw(context) {
        if (!this.image) return;
        context.drawImage(this.dialogueBox, 0, 500, this.game.width, 100);
    }
}