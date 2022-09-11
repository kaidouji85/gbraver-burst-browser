// @flow
import {TutorialSelector} from "../src/js/game/dom-scenes/tutorial-selector/tutorial-selector";
import {domStub} from "./stub/dom-stub";
import type {DOMStubStory} from "./stub/dom-stub";

export default {
  title: 'tutorial-selector',
};
export const scene: DOMStubStory = domStub(() => {
  const scene = new TutorialSelector([
    {id: '01', title: 'バッテリーシステム基礎'},
    {id: '02', title: 'ゼロ防御は即死'},
    {id: '03', title: 'バースト基礎'},
  ]);
  scene.prevNotifier().subscribe(() => {
    console.log('prev');
  })
  return scene.getRootHTMLElement();
});