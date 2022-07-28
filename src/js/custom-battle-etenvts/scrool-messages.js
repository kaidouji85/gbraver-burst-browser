// @flow
import type {MessageWindow} from "../game-dom/message-window/message-window";
import type {BattleSceneProps} from "../game/td-scenes/battle/custom-battle-event";
import {waitUntilWindowPush} from "./wait-until-window-push";

type Paragraph = string[];

export async function scrollMessages(props: BattleSceneProps, messageWindow: MessageWindow, paragraphs: Paragraph[]): Promise<void> {
  for(let i=0; i < paragraphs.length; i ++) {
    messageWindow.messages(paragraphs[i]);
    await waitUntilWindowPush(props);
    const isLastParagraph = i === paragraphs.length - 1;
    !isLastParagraph && await messageWindow.scrollUp();
  }
}

export async function scrollLeftMessages(props: BattleSceneProps, paragraphs: Paragraph[]): Promise<void> {
  await scrollMessages(props, props.view.dom.leftMessageWindow, paragraphs);
}

export async function scrollRightMessages(props: BattleSceneProps, paragraphs: Paragraph[]): Promise<void> {
  await scrollMessages(props, props.view.dom.rightMessageWindow, paragraphs);
}