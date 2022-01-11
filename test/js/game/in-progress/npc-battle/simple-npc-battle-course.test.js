// @flow

import {normalNeoLandozer} from '../../../../../src/js/npc/normal-neo-landozer';
import {SimpleNPCBattleCourse} from "../../../../../src/js/game/npc-battle/simple-npc-battle-course";
import {DefaultStage} from "../../../../../src/js/game/npc-battle/npc-battle-stage";

const stage1 = {caption: ['test stage 1'], npc: normalNeoLandozer()};
const stage2 = {caption: ['test stage 2'], npc: normalNeoLandozer()};
const stage3 = {caption: ['test stage 3'], npc: normalNeoLandozer()};
const stage4 = {caption: ['test stage 4'], npc: normalNeoLandozer()};
const stage5 = {caption: ['test stage 5'], npc: normalNeoLandozer()};
const stages = [stage1, stage2, stage3, stage4, stage5];

test('引数に指定したステージ数をXとすると、stagesのX番目の要素が対応するステージである', () => {
  const course = new SimpleNPCBattleCourse(stages);
  expect(course.stage(2)).toEqual(stage2);
});

test('ステージレベルに最小値を指定しても、問題なくステージ取得ができる', () => {
  const course = new SimpleNPCBattleCourse(stages);
  expect(course.stage(1)).toEqual(stage1);
});

test('ステージレベルに最大値を指定しても、問題なくステージ取得ができる', () => {
  const course = new SimpleNPCBattleCourse(stages);
  expect(course.stage(5)).toEqual(stage5);
});

test('コースに存在しないステージ数を指定すると、デフォルトステージを返す', () => {
  const course = new SimpleNPCBattleCourse(stages);
  expect(course.stage(100)).toEqual(DefaultStage);
});

test('ステージレベルは1以上の整数なので、0を指定すると存在しないステージを指定したとみなす', () => {
  const course = new SimpleNPCBattleCourse(stages);
  expect(course.stage(0)).toEqual(DefaultStage);
});

test('ゼロステージのコースでも、エラーなくステージ取得メソッドを呼ぶことができる', () => {
  const course = new SimpleNPCBattleCourse([]);
  expect(course.stage(1)).toEqual(DefaultStage);
});

test('最終ステージのレベルは、stagesの要素数と一致する', () => {
  const course = new SimpleNPCBattleCourse(stages);
  expect(course.lastStageLevel()).toBe(stages.length)
});

test('ゼロステージのコースの場合、最終ステージレベルは0となる', () => {
  const course = new SimpleNPCBattleCourse([]);
  expect(course.lastStageLevel()).toBe(0);
});
