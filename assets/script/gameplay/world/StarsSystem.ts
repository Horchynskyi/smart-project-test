import {
	_decorator,
	Component,
	instantiate,
	math,
	Node,
	Prefab,
	UITransform,
	Vec2,
	Vec3,
	view,
} from 'cc';
import { StarCollideWithPlayerEvent } from './collision_object/event/StarCollideWithPlayerEvent';
import { StarsSystemConfigT } from '../types';
import { HALF_DESGIN_RESOLUTION_SIZE } from '../constants';
const { ccclass, property } = _decorator;

@ccclass('StarsSystem')
export class StarsSystem extends Component {
	@property
	public minSpawnDistanceBetween: number = 100;

	@property
	public minSpawnDistanceToShip: number = 200;

	@property(Node)
	protected playerShipNode: Node = null;

	@property(Node)
	protected containerNode: Node = null;

	@property(Prefab)
	protected prefab: Prefab = null;

	protected stars: Node[] = [];

	protected passedSpawnRatio: number = 0;

	protected config: StarsSystemConfigT = null;

	public setupConfig(config: StarsSystemConfigT) {
		this.config = config;
	}

	protected onLoad(): void {
		const { node } = this;

		node.on(
			StarCollideWithPlayerEvent.type,
			this.onStarCollideWithPlayer,
			this
		);
	}

	protected onStarCollideWithPlayer(event: StarCollideWithPlayerEvent): void {
		const { stars } = this;

		stars.splice(
			stars.findIndex((v) => v === event.details.selfCollider.node),
			1
		);
	}

	protected spawn(): void {
		const asteroidNode = instantiate(this.prefab);

		this.stars.push(asteroidNode);

		asteroidNode.position = this.getSpawnPosition();

		this.containerNode.addChild(asteroidNode);
	}

	protected getSpawnPosition(): Vec3 {
		const {
			playerShipNode,
			stars,
			minSpawnDistanceBetween,
			minSpawnDistanceToShip,
		} = this;

		const uiTrans = this.getComponent(UITransform)!;

		const world = uiTrans.convertToWorldSpaceAR(
			new Vec3(
				math.randomRange(
					-HALF_DESGIN_RESOLUTION_SIZE.x,
					HALF_DESGIN_RESOLUTION_SIZE.x
				),

				math.randomRange(
					-HALF_DESGIN_RESOLUTION_SIZE.y,
					HALF_DESGIN_RESOLUTION_SIZE.y
				)
			)
		);

		const local = uiTrans
			.convertToNodeSpaceAR(world)
			.add(playerShipNode.position);

		if (
			Vec3.distance(local, playerShipNode.position) <
			minSpawnDistanceToShip
		) {
			return this.getSpawnPosition();
		}

		for (const star of stars) {
			if (Vec3.distance(local, star.position) < minSpawnDistanceBetween) {
				return this.getSpawnPosition();
			}
		}

		return local;
	}

	protected update(dt: number): void {
		if (this.stars.length >= this.config.maxAmount) {
			return;
		}

		this.passedSpawnRatio += dt;

		if (this.passedSpawnRatio >= this.config.ratio) {
			this.passedSpawnRatio = 0;

			this.spawn();
		}
	}
}
