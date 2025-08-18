import {
	_decorator,
	Animation,
	Component,
	math,
	Node,
	RigidBody2D,
	Vec2,
	Vec3,
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AsteroidPiecesEffect')
export class AsteroidPiecesEffect extends Component {
	protected animation: Animation;

	protected onLoad(): void {
		this.animation = this.getComponent(Animation);

		this.animation.once(Animation.EventType.FINISHED, () => {
			this.node.destroy();
		});
	}

	public applyPlayerShipWorldPosition(worldPosition: Vec3) {
		const rigidBodies = this.getComponentsInChildren(RigidBody2D);

		for (const rigidBody of rigidBodies) {
			const angle = Math.atan2(
				rigidBody.node.worldPosition.y - worldPosition.y,

				rigidBody.node.worldPosition.x - worldPosition.x
			);

			rigidBody.applyLinearImpulse(
				new Vec2(
					Math.cos(angle) * math.randomRange(1, 5),
					Math.sin(angle) * math.randomRange(1, 5)
				),
				new Vec2(worldPosition.x, worldPosition.y),
				true
			);
		}
	}
}
