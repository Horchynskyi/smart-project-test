import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

import { PlayerControllerAccelerationIncreaseEvent } from '../player_controller/event/PlayerControllerAccelerationIncreaseEvent';
import { PlayerControllerChangeRotationEvent } from '../player_controller/event/PlayerControllerChangeRotationEvent';
import { AsteroidCollideWithPlayerEvent } from '../world/collision_object/event/AsteroidCollideWithPlayerEvent';
import { StarCollideWithPlayerEvent } from '../world/collision_object/event/StarCollideWithPlayerEvent';
import { GameplayBasicState } from './GameplayBasicState';
import { GameplayStatesE } from './GameplayStatesE';

@ccclass('GameplayPlayingState')
export class GameplayPlayingState extends GameplayBasicState {
	readonly id: string = GameplayStatesE.PLAYING;

	protected onEnable(): void {
		this.listenEvents();
	}

	protected onDisable(): void {
		this.unlistenEvents();
	}

	protected listenEvents(): void {
		const { node } = this;

		node.on(
			PlayerControllerChangeRotationEvent.type,
			this.onPlayerControllerChangeRotation,
			this
		);

		node.on(
			PlayerControllerAccelerationIncreaseEvent.type,
			this.onPlayerControllerAccelerationIncrease,
			this
		);

		node.on(
			AsteroidCollideWithPlayerEvent.type,
			this.onAsteroidCollideWithPlayer,
			this
		);

		node.on(
			StarCollideWithPlayerEvent.type,
			this.onStarCollideWithPlayer,
			this
		);
	}

	protected unlistenEvents() {
		const { node } = this;

		node.off(
			PlayerControllerChangeRotationEvent.type,
			this.onPlayerControllerChangeRotation,
			this
		);

		node.off(
			PlayerControllerAccelerationIncreaseEvent.type,
			this.onPlayerControllerAccelerationIncrease,
			this
		);

		node.off(
			AsteroidCollideWithPlayerEvent.type,
			this.onAsteroidCollideWithPlayer,
			this
		);

		node.off(
			StarCollideWithPlayerEvent.type,
			this.onStarCollideWithPlayer,
			this
		);
	}

	protected onPlayerControllerChangeRotation(
		event: PlayerControllerChangeRotationEvent
	) {
		this.gameplay.world.playerShip.setRotation(event.details.rotation);
	}

	protected onPlayerControllerAccelerationIncrease(
		event: PlayerControllerAccelerationIncreaseEvent
	) {
		this.gameplay.world.playerShip.applyAccelerationIncrease();
	}

	protected onAsteroidCollideWithPlayer(
		event: AsteroidCollideWithPlayerEvent
	): void {
		const { gameplay } = this;

		gameplay.stats.lifes--;

		gameplay.userInterface.updateLifes(gameplay.stats.lifes);

		gameplay.world.playerShip.onTakeDamage();

		if (!gameplay.stats.lifes) {
			this.stateMachine.state = GameplayStatesE.LOSE;
		}
	}

	protected onStarCollideWithPlayer(event: StarCollideWithPlayerEvent): void {
		const { gameplay } = this;

		gameplay.stats.stars++;

		gameplay.userInterface.updateStars(gameplay.stats.stars);
	}

	protected update(dt: number): void {
		const { gameplay } = this;

		gameplay.stats.time += dt;

		gameplay.userInterface.updateTimer(gameplay.stats.time);

		gameplay.asteroidsSystem.levelProgress =
			gameplay.stats.time / gameplay.stats.winDuration;

		if (gameplay.stats.time >= gameplay.stats.winDuration) {
			this.stateMachine.state = GameplayStatesE.WIN;
		}
	}
}
