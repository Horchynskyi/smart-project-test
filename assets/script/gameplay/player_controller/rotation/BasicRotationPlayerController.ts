import { _decorator, Component } from 'cc';
import { PlayerControllerChangeRotationEvent } from '../event/PlayerControllerChangeRotationEvent';
const { ccclass, property } = _decorator;

@ccclass('BasicRotationPlayerController')
export class BasicRotationPlayerController extends Component {
	protected rotation: number = 0;
	protected controllerChaneRotationEvent: PlayerControllerChangeRotationEvent =
		new PlayerControllerChangeRotationEvent({ rotation: 0 });

	protected emitChangeRotation(): void {
		const { node, controllerChaneRotationEvent } = this;

		controllerChaneRotationEvent.details.rotation = this.rotation;

		node.dispatchEvent(controllerChaneRotationEvent);
	}
}
