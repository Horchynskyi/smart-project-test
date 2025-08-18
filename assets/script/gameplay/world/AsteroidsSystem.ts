import {
	_decorator,
	Component,
	instantiate,
	math,
	Node,
	Prefab,
	RigidBody2D,
	UITransform,
	Vec2,
	Vec3,
	view,
} from 'cc';
import { Asteroid } from './Asteroid';
import { AsteroidCollideWithPlayerEvent } from './collision_object/event/AsteroidCollideWithPlayerEvent';
import { AsteroidPiecesEffect } from './AsteroidPiecesEffect';
import { AsteroidsSystemConfigT } from '../types';
import { HALF_DESGIN_RESOLUTION_SIZE } from '../constants';
const { ccclass, property } = _decorator;

@ccclass('AsteroidsSystem')
export class AsteroidsSystem extends Component {
	public levelProgress: number = 0;

	@property
	public minSpawnDistanceBetween: number = 200;

	@property(Node)
	protected playerShipNode: Node = null;

	@property(Node)
	protected containerNode: Node = null;

	@property(Prefab)
	protected asteroidPrefab: Prefab = null;

	@property(Prefab)
	protected asteroidPiecesPrefab: Prefab = null;

	protected asteroids: Node[] = [];

	protected passedSpawnRatio: number = 0;

	protected config: AsteroidsSystemConfigT = null;

	public setupConfig(config: AsteroidsSystemConfigT) {
		this.config = config;
	}

	protected onLoad(): void {
		const { node } = this;

		node.on(
			AsteroidCollideWithPlayerEvent.type,
			this.onAsteroidCollideWithPlayer,
			this
		);
	}

	protected onAsteroidCollideWithPlayer(
		event: AsteroidCollideWithPlayerEvent
	): void {
		const {
			asteroidPiecesPrefab,
			containerNode,
			asteroids,
			playerShipNode,
		} = this;

		const piecesNode = instantiate(asteroidPiecesPrefab);

		piecesNode.setPosition(event.details.selfCollider.node.position);

		this.scheduleOnce(() => {
			containerNode.addChild(piecesNode);

			piecesNode
				.getComponent(AsteroidPiecesEffect)
				.applyPlayerShipWorldPosition(playerShipNode.worldPosition);

			event.details.selfCollider.node.destroy();
		});

		event.details.selfCollider.enabled = false;

		asteroids.splice(
			asteroids.findIndex((v) => v === event.details.selfCollider.node),
			1
		);
	}

	protected spawnNewAsteroid(): void {
		const asteroidNode = instantiate(this.asteroidPrefab);

		const asteroid = asteroidNode.getComponent(Asteroid);

		asteroid.moveSpeed = this.getCurrentAsteroidSpeed();

		this.asteroids.push(asteroidNode);

		asteroidNode.position = this.getSpawnPosition();

		this.containerNode.addChild(asteroidNode);
	}

	protected getCurrentAsteroidSpeed(): number {
		const { config, levelProgress } = this;

		return (
			config.speed.from +
			(config.speed.to - config.speed.from) * levelProgress
		);
	}

	protected getCurrentSpawnRatio(): number {
		const { config, levelProgress } = this;

		return (
			config.ratio.from +
			(config.ratio.to - config.ratio.from) * levelProgress
		);
	}

	protected getSpawnPosition(): Vec3 {
		const { playerShipNode, asteroids, minSpawnDistanceBetween } = this;

		const uiTrans = this.getComponent(UITransform)!;

		const world = uiTrans.convertToWorldSpaceAR(
			new Vec3(
				math.randomRange(
					-HALF_DESGIN_RESOLUTION_SIZE.x,
					HALF_DESGIN_RESOLUTION_SIZE.x
				),
				HALF_DESGIN_RESOLUTION_SIZE.y + 100
			)
		);

		const local = uiTrans
			.convertToNodeSpaceAR(world)
			.add(playerShipNode.position);

		for (const asteroid of asteroids) {
			if (
				Vec3.distance(local, asteroid.position) <
				minSpawnDistanceBetween
			) {
				return this.getSpawnPosition();
			}
		}

		return local;
	}

	protected update(dt: number): void {
		const newAsteroids = [];

		for (let i = 0; i < this.asteroids.length; i++) {
			const asteroid = this.asteroids[i];

			if (
				asteroid.position.y - this.playerShipNode.position.y <
				-HALF_DESGIN_RESOLUTION_SIZE.y - 100
			) {
				asteroid.destroy();

				continue;
			}

			newAsteroids.push(asteroid);
		}

		this.asteroids = newAsteroids;

		this.passedSpawnRatio += dt;

		if (this.passedSpawnRatio >= this.getCurrentSpawnRatio()) {
			this.passedSpawnRatio = 0;

			this.spawnNewAsteroid();
		}
	}
}
