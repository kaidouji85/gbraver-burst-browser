// @flow

import {TDGameObjectStub} from "./stub/td-game-object-stub";
import {WingDozer} from "../src/js/game-object/armdozer/wing-dozer/wing-dozer";

export default {
  title: 'wing-dozer',
};

export const stand = () => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const sprite = new WingDozer(resources, listener);
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}
