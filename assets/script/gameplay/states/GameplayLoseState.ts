import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

import { GameplayBasicState } from './GameplayBasicState';
import { GameplayStatesE } from './GameplayStatesE';

@ccclass('GameplayLoseState')
export class GameplayLoseState extends GameplayBasicState {
	readonly id: string = GameplayStatesE.LOSE;

	protected onEnable(): void {
		const { gameplay } = this;

		gameplay.world.playerShip.node.active = false;

		gameplay.userInterface.showLosePopup();
	}
}
