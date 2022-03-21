// @flow

import {TDGameObjectStub} from "./stub/td-game-object-stub";
import {ResultIndicator} from "../src/js/game-object/result-indicator/result-indicator";

export default {
  title: 'result-indicator',
};

export const win = (): HTMLElement => {
  const stub = new TDGameObjectStub(({resources}) => {
    const indicator = new ResultIndicator(resources);
    return [indicator.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}