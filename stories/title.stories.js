// @flow

import {DOMStub} from "./stub/dom-stub";
import {Title} from "../src/js/game/dom-scenes/title";

export default {
  title: 'title'
};

export const Scene = () => {
  const stub  = new DOMStub((parent, resourcePath) => {
    const scene = new Title(resourcePath);
    parent.appendChild(scene.getHTMLElement());
  });
  return stub.domElement();
}
