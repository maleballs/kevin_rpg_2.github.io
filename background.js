export class Background {
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