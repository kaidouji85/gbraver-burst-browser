// @flow
import {EMPTY_PLAYER} from 'gbraver-burst-core';
import {EmptyCustomBattleEvent} from "../../../src/js/custom-battle-events/empty-custom-battle-event";
import {updateTutorialState} from "../../../src/js/game/tutorial";
import {createEmptyNPC} from "../../data/npc";

const stage1 = {title: ['stage1'], player: {...EMPTY_PLAYER, playerId: 'player-01'}, npc: createEmptyNPC(), event: () => new EmptyCustomBattleEvent(), bgm: 'bgm01'};
const stage2 = {title: ['stage2'], player: {...EMPTY_PLAYER, playerId: 'player-02'}, npc: createEmptyNPC(), event: () => new EmptyCustomBattleEvent(), bgm: 'bgm02'};
const stage3 = {title: ['stage3'], player: {...EMPTY_PLAYER, playerId: 'player-03'}, npc: createEmptyNPC(), event: () => new EmptyCustomBattleEvent(), bgm: 'bgm03'};

test('ステージクリアの処理が正しい', () => {
  const tutorialState = {stages: [stage1, stage2, stage3], stageIndex: 0};
  const battleResult = {type: 'GameOver', winner: stage1.player.playerId};
  expect(updateTutorialState(tutorialState, battleResult))
    .toEqual({state: {...tutorialState, stageIndex: 1}, result: 'StageClear'});
});

test('ステージ失敗の処理が正しい', () => {
  const tutorialState = {stages: [stage1, stage2, stage3], stageIndex: 0};
  const battleResult = {type: 'GameOver', winner: 'not-player'};
  expect(updateTutorialState(tutorialState, battleResult))
    .toEqual({state: tutorialState, result: 'StageMiss'});
});

test('引き分けはミスとみなす', () => {
  const tutorialState = {stages: [stage1, stage2, stage3], stageIndex: 0};
  const battleResult = {type: 'EvenMatch'};
  expect(updateTutorialState(tutorialState, battleResult))
    .toEqual({state: tutorialState, result: 'StageMiss'});
});

test('最終ステージクリアの処理が正しい', () => {
  const tutorialState = {stages: [stage1, stage2, stage3], stageIndex: 2};
  const battleResult = {type: 'GameOver', winner: stage3.player.playerId};
  expect(updateTutorialState(tutorialState, battleResult))
    .toEqual({state: tutorialState, result: 'TutorialComplete'});
});

test('最終ステージ失敗の処理が正しい', () => {
  const tutorialState = {stages: [stage1, stage2, stage3], stageIndex: 2};
  const battleResult = {type: 'GameOver', winner: 'not-player'};
  expect(updateTutorialState(tutorialState, battleResult))
    .toEqual({state: tutorialState, result: 'StageMiss'});
});

test('最終ステージでも引き分けはミスとみなす', () => {
  const tutorialState = {stages: [stage1, stage2, stage3], stageIndex: 2};
  const battleResult = {type: 'EvenMatch'};
  expect(updateTutorialState(tutorialState, battleResult))
    .toEqual({state: tutorialState, result: 'StageMiss'});
});

test('ステート不整合の場合はnullを返す', () => {
  const tutorialState = {stages: [stage1, stage2, stage3], stageIndex: 3};
  const battleResult = {type: 'GameOver', winner: 'not-player'};
  expect(updateTutorialState(tutorialState, battleResult)).toEqual(null);
});