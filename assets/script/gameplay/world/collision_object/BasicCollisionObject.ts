import {
	_decorator,
	Collider2D,
	Component,
	Contact2DType,
	IPhysics2DContact,
	Node,
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BasicCollisionObject')
export class BasicCollisionObject extends Component {
	protected collider: Collider2D = null;

	protected onLoad(): void {
		this.collider = this.getComponent(Collider2D);

		this.collider.on(
			Contact2DType.BEGIN_CONTACT,
			this.onBeginContact,
			this
		);
	}

	protected onBeginContact(
		selfCollider: Collider2D,
		otherCollider: Collider2D,
		contact: IPhysics2DContact | null
	) {}
}
