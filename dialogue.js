import { storyevent } from "./storyevent.js";

const initEvent = new storyevent("init");
initEvent.addDialogue("Welcome to Kevin RPG 2!");



export const story = [initEvent];