/**
 * Matter-JSの機能を仲介する拡張スクリプト
 * 主にMatter-JSの基本となるセッティングを行う
 * doc:[https://brm.io/matter-js/docs/]
 */
import Matter from 'matter-js';

// module aliases
export const Engine = Matter.Engine
export const Render = Matter.Render
export const Runner = Matter.Runner
export const Body = Matter.Body
export const Bodies = Matter.Bodies
export const MouseConstraint = Matter.MouseConstraint
export const Mouse = Matter.Mouse
export const Composite = Matter.Composite
export const Composites = Matter.Composites
export const Constraint = Matter.Constraint

export class MatterJSMediator {

	/**
	 * コンストラクタ
	 * 詳細な処理はコード内を確認
	 */
	constructor(canvasId) {

		// キャンバスを指定
		this.canvas = document.getElementById(canvasId)

		// 物理演算と描画
		this.engine = Engine.create()
		this.world = this.engine.world
		this.render = Render.create({
			element: document.body,
			engine: this.engine,
			options: {
				wireframes: false, //ワイヤーフレームモードをオフ
				showAngleIndicator: false,
			}
		});

		// マウスコントロールのセッティング
		this.render.mouse = this.getMouseControl()

		this.engine.gravity.scale = 0 // 重力0


		// const jointMan = this.getJointMan()

		// this.addNewComposite(jointMan);

	}

	addNewComposite(composite) {
		// 配列の場合は随時チェックして追加
		if (!!composite.length === true) {
			for (let i in composite) {
				if (isCompositeCheck(composite[i])) {
					Composite.add(this.engine.world, composite[i]);
				} else {
					throw 'try add composite , found not composite!'
				}
			}
		}
		//単体の場合はチェック後に追加 
		else if (isCompositeCheck(composite)) {
			Composite.add(this.engine.world, composite)
		}
		//Error 
		else {
			throw 'try add composite , found not composite!'
		}
		return true
	}

	/**
	 * 物理演算と描画処理を実行
	 */
	run() {
		// run the renderer
		Render.run(this.render);
		// create runner
		const runner = Runner.create();
		// run the engine
		Runner.run(runner, this.engine);
	}

	/**
	 * マウスコントロールを取得
	 */
	getMouseControl() {
		const mouse = Mouse.create(this.render.canvas)
		const mouseConstraint = MouseConstraint.create(this.engine, {
			mouse: mouse,
			constraint: {
				stiffness: 0.2,
				render: {
					visible: false
				}
			}
		});
		Composite.add(this.world, mouseConstraint);
		return mouse
	}

}

/**
 * Compositeのオブジェクトか調べる
 * @param target 調査対象
 */
export function isCompositeCheck(target) {
	if (typeof (target) === "object" && target.type == "composite") return true
	else return false
}