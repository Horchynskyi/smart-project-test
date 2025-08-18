import { _decorator, Component, director } from 'cc';
import { GameplayWorld } from './world/GameplayWorld';
import { GameplayUserInterface } from './user_interface/GameplayUserInterface';
import { AsteroidsSystem } from './world/AsteroidsSystem';
import { GameplayConfigT } from './types';

import { StarsSystem } from './world/StarsSystem';
import { gameplsyConfig } from './gameplay_config';

const { ccclass, property } = _decorator;

@ccclass('GameplayMain')
export class GameplayMain extends Component {
	@property(GameplayWorld)
	readonly world: GameplayWorld = null;

	@property(GameplayUserInterface)
	readonly userInterface: GameplayUserInterface = null;

	protected _asteroidsSystem: AsteroidsSystem = null;
	protected _starsSystem: StarsSystem = null;

	public get asteroidsSystem() {
		return this._asteroidsSystem;
	}

	public get starsSystem() {
		return this._starsSystem;
	}

	readonly stats = {
		lifes: 0,
		time: 0,
		stars: 0,
		winDuration: 0,
	};

	protected onLoad(): void {
		this._asteroidsSystem = this.getComponent(AsteroidsSystem);
		this._starsSystem = this.getComponent(StarsSystem);

		this.setupConfig(gameplsyConfig);
	}

	protected setupConfig(config: GameplayConfigT) {
		this.stats.winDuration = config.surviveSeconds;
		this.stats.lifes = config.startLifes;
		this.asteroidsSystem.setupConfig(config.asteroidsSystemConfig);
		this.starsSystem.setupConfig(config.starsSystemConfig);
	}

	protected onRestartClicked(): void {
		director.loadScene('gameplay');
	}
}
