// @flow

import {domStub} from "./stub/dom-stub";
import {DOMFader} from "../src/js/components/dom-fader";

export default {
  title: 'dom-fader'
};

export const Scene = domStub((resourcePath) => {
  const fader = new DOMFader();
  return fader.getRootHTMLElement();
});
