import {
	_decorator,
	Animation,
	Collider2D,
	Component,
	Contact2DType,
	easing,
	IPhysics2DContact,
	math,
	Node,
	RigidBody2D,
	tween,
	Vec2,
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerShip')
export class PlayerShip extends Component {
	protected rigidBody2D: RigidBody2D = null;
	protected collider: Collider2D = null;
	protected moveDirection: Vec2 = new Vec2(1, 0);
	protected acceleration: number = 1;
	protected animation: Animation;

	public applyAccelerationIncrease(): void {
		tween(this)
			.to(0.5, { acceleration: 5 }, { easing: 'sineIn' })
			.to(0.5, { acceleration: 1 }, { easing: 'sineOut' })
			.start();
	}

	public setRotation(rotation: number): void {
		const { node, moveDirection } = this;

		node.angle = rotation;

		const radians = math.toRadian(rotation);

		moveDirection.set(Math.cos(radians) * 1, Math.sin(radians) * 1);
	}

	public onTakeDamage(): void {
		this.animation.play('damaged');
	}

	protected onLoad(): void {
		this.rigidBody2D = this.getComponent(RigidBody2D);
		this.animation = this.getComponent(Animation);
	}

	protected onDisable(): void {
		this.rigidBody2D.linearVelocity = Vec2.ZERO;
	}

	protected update(dt: number): void {
		const { acceleration, moveDirection, rigidBody2D } = this;

		rigidBody2D.linearVelocity = moveDirection
			.clone()
			.multiplyScalar(3)
			.multiplyScalar(acceleration);
	}
}
