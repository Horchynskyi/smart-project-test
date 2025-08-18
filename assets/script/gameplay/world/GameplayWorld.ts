import { _decorator, Component, Node } from 'cc';
import { PlayerShip } from './PlayerShip';
const { ccclass, property } = _decorator;

@ccclass('GameplayWorld')
export class GameplayWorld extends Component {
	@property(PlayerShip)
	readonly playerShip: PlayerShip = null;
}
