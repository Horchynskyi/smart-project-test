import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraFollowController')
export class CameraFollowController extends Component {
	@property(Node)
	public followNode: Node = null;

	@property
	public ratio: number = 0.5;

	protected update(dt: number) {
		if (this.followNode) {
			this.node.position = this.node.position.lerp(
				this.followNode.position,
				dt * this.ratio
			);
		}
	}
}
