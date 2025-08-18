import {
	_decorator,
	Component,
	EventKeyboard,
	input,
	Input,
	KeyCode,
	Node,
} from 'cc';
import { PlayerControllerAccelerationIncreaseEvent } from './event/PlayerControllerAccelerationIncreaseEvent';
const { ccclass, property } = _decorator;

@ccclass('AccelerationPlayerController')
export class AccelerationPlayerController extends Component {
	protected controllerAccelerationIncreaseEvent: PlayerControllerAccelerationIncreaseEvent =
		new PlayerControllerAccelerationIncreaseEvent();

	protected onLoad(): void {
		input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
	}

	protected onKeyDown(event: EventKeyboard) {
		switch (event.keyCode) {
			case KeyCode.SPACE:
				this.emitAccelerationIncrease();
				break;
		}
	}

	protected emitAccelerationIncrease(): void {
		const { node, controllerAccelerationIncreaseEvent } = this;

		node.dispatchEvent(controllerAccelerationIncreaseEvent);
	}
}
