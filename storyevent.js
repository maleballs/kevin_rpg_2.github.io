export class storyevent {
    constructor(name) {
        this.name = name;
        this.events = [];
    }
    addDialogue(text) {
        this.events.push(text);
    }
}
 