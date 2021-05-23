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


		const jointMan = this.getJointMan()

		this.addNewComposite(jointMan);

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

	/**
	 * 全パーツを設定し、取得する
	 * @returns {array} 
	 */
	getJointMan() {
		const group = Body.nextGroup(true)

		const head = Bodies.circle(235, 130, 40, {
			collisionFilter: {
				group: group
			},
			frictionAir: 1,
			render: {
				fillStyle: '#00B06B',
				lineWidth: 1
			}
		})
		const body = this.createBodyComposite(280, 205, 100, 160, [30, 30, 50, 50], group)
		const rightArm = this.createJointComposite(340, 200, 30, 100, [15, 15, 15, 15], group)
		const leftArm = this.createJointComposite(220, 200, 30, 100, [15, 15, 15, 15], group)
		const rightLeg = this.createJointComposite(320, 345, 30, 100, [15, 15, 15, 15], group)
		const leftLeg = this.createJointComposite(240, 340, 30, 100, [15, 15, 15, 15], group)

		//グループ化
		// Composite.add(composite, [hComposite, body])

		// Composites.chain(composite, 0, 1, 0, -1, {
		// 	stiffness: 1,
		// 	length: 1,
		// 	angularStiffness: 0.2,
		// 	render: {
		// 		strokeStyle: '#4a485b',
		// 		lineWidth: 10,
		// 		visible: false
		// 	}
		// })

		let composite = Composite.create({
			label: 'joint-man'
		})

		const joint = Constraint.create({
			bodyB: body,
			pointB: {
				x: 0,
				y: -100
			},
			bodyA: head,
			stiffness: 1,
			length: 0
		})


		Composite.addBody(composite, body);
		Composite.addBody(composite, head);

		composite = Composite.add(composite,
			[rightArm, leftArm]
		)
		// Composite.addBody(composite, leftArm);
		// Composite.addBody(composite, rightLeg);
		// Composite.addBody(composite, leftLeg);
		Composite.addConstraint(composite, joint);
		// Composites.chain(composite, 0, 0.35, 0, -0.35, {
		// 	stiffness: 1,
		// 	length: 1,
		// 	angularStiffness: 0.2,
		// 	render: {
		// 		strokeStyle: '#4a485b',
		// 		lineWidth: 10,
		// 		visible: false
		// 	}
		// })
		// Composite.create({
		// 	bodies: [body],
		// 	composites: [rightArm]
		// })

		return [composite]
	}

	/**
	 * 
	 * @param {*} x 
	 * @param {*} y 
	 * @param {*} w 
	 * @param {*} h 
	 * @param {*} radius 
	 * @param {*} group 
	 * @returns 
	 */
	createBodyComposite(x, y, w, h, radius, group) {
		const part1 = Bodies.rectangle(x, y, w, h, {
			collisionFilter: {
				group: group
			},
			chamfer: {
				radius: radius
			},
			frictionAir: 1,
			render: {
				fillStyle: '#00B06B',
				lineWidth: 1
			}
		})


		// //グループ化
		// const composite = Composite.create({
		// 	bodies: [part1]
		// })


		// Composite.add(composite, Constraint.create({
		// 	bodyB: composite.bodies[0],
		// 	pointB: {
		// 		x: 0,
		// 		y: -1 * h / 3
		// 	},
		// 	pointA: {
		// 		x: composite.bodies[0].position.x - 0.45 * 100,
		// 		y: composite.bodies[0].position.y
		// 	},
		// 	stiffness: 1,
		// 	length: 0.1,
		// 	render: {
		// 		fillStyle: '#00B06B',
		// 		strokeStyle: '#4a485b',
		// 		visible: false
		// 	}
		// }))
		return part1
	}

	createJointComposite(x, y, w, h, radius, group) {
		//第一関節
		const parts1 = Bodies.rectangle(x, y, w, h, {
			collisionFilter: {
				group: group
			},
			chamfer: {
				radius: radius
			},
			frictionAir: 1,
			render: {
				fillStyle: '#00B06B',
				lineWidth: 0
			}
		})
		//第二関節
		const parts2 = Bodies.rectangle(x, y, w, h, {
			collisionFilter: {
				group: group
			},
			chamfer: {
				radius: radius
			},
			frictionAir: 0.2,
			render: {
				fillStyle: '#00B06B',
				lineWidth: 0
			}
		})
		//グループ化
		const parts = Composite.create({
			bodies: [parts1, parts2]
		})
		//結合
		Composites.chain(parts, 0, 0.35, 0, -0.35, {
			stiffness: 1,
			length: 1,
			angularStiffness: 0.2,
			render: {
				strokeStyle: '#4a485b',
				lineWidth: 10,
				visible: false
			}
		})

		return parts
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