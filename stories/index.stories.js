// @flow

import {GameObjectStub} from "./game-object-stub";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../src/js/action/game-object-action";
import {PlayerShinBraver} from "../src/js/game-object/armdozer/shin-braver";
import type {Resources} from "../src/js/resource";

export default {
  title: 'three-js-objects',
};

export const Heading = () => '<h1>Hello World</h1>';

export const Button = () => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.innerText = 'Hello Button';
  return btn;
};

export const ShinBraver = () => {
  const stub = new GameObjectStub();
  stub.start((resources: Resources, listener: Observable<GameObjectAction>) => {
    const sprite = PlayerShinBraver(resources, listener);
    return [sprite.getObject3D()];
  });
  return stub.domElement();
}