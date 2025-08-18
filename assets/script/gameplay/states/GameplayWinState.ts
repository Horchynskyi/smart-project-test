import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

import { GameplayBasicState } from './GameplayBasicState';
import { GameplayStatesE } from './GameplayStatesE';

@ccclass('GameplayWinState')
export class GameplayWinState extends GameplayBasicState {
	readonly id: string = GameplayStatesE.WIN;

	protected onEnable(): void {
		const { gameplay } = this;

		gameplay.world.playerShip.node.active = false;

		gameplay.userInterface.showWinPopup();
	}
}
