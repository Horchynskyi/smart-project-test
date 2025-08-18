import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

import { State } from '../../common/states/State';
import { GameplayMain } from '../GameplayMain';

@ccclass('GameplayLoseState')
export class GameplayBasicState extends State {
	protected gameplay: GameplayMain = null;

	protected onLoad(): void {
		super.onLoad();

		this.gameplay = this.getComponent(GameplayMain);
	}
}
