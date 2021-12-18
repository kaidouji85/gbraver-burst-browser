// @flow

import test from 'ava';
import {burstNeoLandozer} from '../../../../../src/js/npc/burst-neo-landozer';
import {SimpleNPCBattleCourse} from "../../../../../src/js/game/npc-battle/simple-npc-battle-course";
import {DefaultStage} from "../../../../../src/js/game/npc-battle/npc-battle-stage";

const stage1 = {caption: ['test stage 1'], npc: burstNeoLandozer()};
const stage2 = {caption: ['test stage 2'], npc: burstNeoLandozer()};
const stage3 = {caption: ['test stage 3'], npc: burstNeoLandozer()};
const stage4 = {caption: ['test stage 4'], npc: burstNeoLandozer()};
const stage5 = {caption: ['test stage 5'], npc: burstNeoLandozer()};
const stages = [stage1, stage2, stage3, stage4, stage5];

test('引数に指定したステージ数をXとすると、stagesのX番目の要素が対応するステージである', t => {
  const course = new SimpleNPCBattleCourse(stages);
  t.deepEqual(course.stage(2), stage2);
});

test('ステージレベルに最小値を指定しても、問題なくステージ取得ができる', t => {
  const course = new SimpleNPCBattleCourse(stages);
  t.deepEqual(course.stage(1), stage1);
});

test('ステージレベルに最大値を指定しても、問題なくステージ取得ができる', t => {
  const course = new SimpleNPCBattleCourse(stages);
  t.deepEqual(course.stage(5), stage5);
});

test('コースに存在しないステージ数を指定すると、デフォルトステージを返す', t => {
  const course = new SimpleNPCBattleCourse(stages);
  t.deepEqual(course.stage(100), DefaultStage);
});

test('ステージレベルは1以上の整数なので、0を指定すると存在しないステージを指定したとみなす', t => {
  const course = new SimpleNPCBattleCourse(stages);
  t.deepEqual(course.stage(0), DefaultStage);
});

test('ゼロステージのコースでも、エラーなくステージ取得メソッドを呼ぶことができる', t => {
  const course = new SimpleNPCBattleCourse([]);
  t.deepEqual(course.stage(1), DefaultStage);
});

test('最終ステージのレベルは、stagesの要素数と一致する', t => {
  const course = new SimpleNPCBattleCourse(stages);
  t.is(course.lastStageLevel(), stages.length)
});

test('ゼロステージのコースの場合、最終ステージレベルは0となる', t => {
  const course = new SimpleNPCBattleCourse([]);
  t.deepEqual(course.lastStageLevel(), 0);
});
