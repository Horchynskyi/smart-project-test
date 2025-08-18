import { _decorator, Component, Node, RigidBody2D, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Asteroid')
export class Asteroid extends Component {
	@property
	public rotationSpeed: number = 1;

	public moveSpeed: number = 0;

	protected rigidBody2D: RigidBody2D = null;

	protected onLoad(): void {
		this.rigidBody2D = this.getComponent(RigidBody2D);

		this.rigidBody2D.linearVelocity = new Vec2(0, this.moveSpeed);
		this.rigidBody2D.angularVelocity = this.rotationSpeed;
	}
}
