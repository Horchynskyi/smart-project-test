import { _decorator, Component, Node, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('InfinityBackground')
export class InfinityBackground extends Component {
	@property(Vec2)
	public moveSizeCap: Vec2 = new Vec2(1000, 1000);

	@property(Node)
	protected playerShipNode: Node = null;

	protected update(dt: number): void {
		const x = Math.round(
			this.playerShipNode.position.x / this.moveSizeCap.x
		);

		const y = Math.round(
			this.playerShipNode.position.y / this.moveSizeCap.y
		);

		this.node.setPosition(x * this.moveSizeCap.x, y * this.moveSizeCap.y);
	}
}
