import { _decorator, Component, Label, Node } from 'cc';
import { SECONDS_IN_MINUTE } from '../constants';
const { ccclass, property } = _decorator;

@ccclass('GameplayUserInterface')
export class GameplayUserInterface extends Component {
	@property(Label)
	protected livesLabel: Label = null;

	@property(Label)
	protected starsLabel: Label = null;

	@property(Label)
	protected timerLabel: Label = null;

	@property(Node)
	protected winPopup: Node = null;

	@property(Node)
	protected losePopup: Node = null;

	public updateLifes(value: number) {
		this.livesLabel.string = value.toString();
	}

	public updateStars(value: number) {
		this.starsLabel.string = value.toString();
	}

	public updateTimer(value: number) {
		this.timerLabel.string = this.parseTimerValue(value);
	}

	public showWinPopup() {
		this.winPopup.active = true;
	}

	public showLosePopup() {
		this.losePopup.active = true;
	}

	protected parseTimerValue(value: number) {
		const minutes = Math.floor(value / SECONDS_IN_MINUTE).toString();
		const seconds = Math.floor(value % SECONDS_IN_MINUTE).toString();

		let result = '';

		for (let i = minutes.length; i < 2; i++) {
			result += '0';
		}

		result += minutes + ':';

		for (let i = seconds.length; i < 2; i++) {
			result += '0';
		}

		result += seconds;

		return result;
	}
}
