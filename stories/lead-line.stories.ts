import { StoryFn } from "@storybook/html";
import { Observable } from "rxjs";
import * as THREE from "three";

import { GameObjectAction } from "../src/js/game-object/action/game-object-action";
import { LeadLine } from "../src/js/game-object/lead-line/lead-line";
import { LeadLineView } from "../src/js/game-object/lead-line/view/lead-line-view";
import { hudGameObjectStory } from "./stub/hud-game-object-stub";

export default {
  title: "lead-line",
};

/**
 * 座標確認用の円を生成する
 * @param radius 円の半径
 * @param color 円の色
 * @returns 生成した円
 */
const circle = (radius: number, color = 0xffff00) => {
  const geometry = new THREE.CircleGeometry(radius, 32);
  const material = new THREE.MeshBasicMaterial({ color });
  return new THREE.Mesh(geometry, material);
};

/**
 * 引き出し線生成関数
 * @param gameObjectAction ゲームオブジェクトアクション
 * @returns 引き出し線、点A、点B
 */
type Generator = (
  gameObjectAction: Observable<GameObjectAction>,
) => [LeadLine, THREE.Mesh, THREE.Mesh];

/**
 * 引き出し線操作関数
 * @param leadLine 引き出し線
 * @param a 点A
 * @param b 点B
 */
type Fn = (leadLine: LeadLine, a: THREE.Mesh, b: THREE.Mesh) => void;

/**
 * 引き出し線ストーリー
 * @param generator 引き出し線生成関数
 * @param fn 引き出し線操作関数
 */
const leadLineStory = (generator: Generator, fn: Fn) =>
  hudGameObjectStory(({ gameObjectAction }) => {
    const [leadLine, a, b] = generator(gameObjectAction);
    fn(leadLine, a, b);
    return [leadLine.getObject3D(), a, b];
  });

/** 青線 */
const blueLine: Generator = (gameObjectAction) => {
  const color = 0x0000ff;
  const view = new LeadLineView(color, 40, 1);
  return [
    new LeadLine(view, gameObjectAction),
    circle(5, color),
    circle(5, color),
  ];
};

/** 右上 */
export const rightUpper: StoryFn = leadLineStory(blueLine, (leadLine, a, b) => {
  a.position.x = 30;
  a.position.y = 40;
  b.position.x = a.position.x + 200;
  b.position.y = a.position.y + 220;
  leadLine.set(a.position, b.position);
  leadLine.show().play();
});

/** 左上 */
export const leftUpper: StoryFn = leadLineStory(blueLine, (leadLine, a, b) => {
  a.position.x = -30;
  a.position.y = 40;
  b.position.x = a.position.x - 200;
  b.position.y = a.position.y + 220;
  leadLine.set(a.position, b.position);
  leadLine.show().play();
});

/** 右下 */
export const rightLover: StoryFn = leadLineStory(blueLine, (leadLine, a, b) => {
  a.position.x = 30;
  a.position.y = -40;
  b.position.x = a.position.x + 200;
  b.position.y = a.position.y - 220;
  leadLine.set(a.position, b.position);
  leadLine.show().play();
});

/** 左下 */
export const leftLover: StoryFn = leadLineStory(blueLine, (leadLine, a, b) => {
  a.position.x = -30;
  a.position.y = -40;
  b.position.x = a.position.x - 200;
  b.position.y = a.position.y - 220;
  leadLine.set(a.position, b.position);
  leadLine.show().play();
});
