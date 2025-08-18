import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MainMenuMain')
export class MainMenuMain extends Component {
	protected onLoad(): void {
		director.preloadScene('gameplay');
	}

	protected onPlayClicked(): void {
		director.loadScene('gameplay');
	}
}
