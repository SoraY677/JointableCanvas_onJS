/**
 * Matter-JSの機能を仲介する拡張スクリプト
 * doc:[https://brm.io/matter-js/docs/]
 */
class MatterJSMediator {
	// module aliases
	Engine = Matter.Engine
	Render = Matter.Render
	Runner = Matter.Runner
	Body = Matter.Body
	Bodies = Matter.Bodies
	MouseConstraint = Matter.MouseConstraint
	Mouse = Matter.Mouse
	Composite = Matter.Composite
	Composites = Matter.Composites
	Constraint = Matter.Constraint

	/**
	 * 
	 */
	constructor() {

		// create an engine
		const canvas = document.getElementById("main_canvas")
		let engine = this.Engine.create()
		let world = engine.world

		// create a renderer
		let render = this.Render.create({
			element: document.body,
			engine: engine,
			options: {
				wireframes: false, //ワイヤーフレームモードをオフ
				showAngleIndicator: false,
			}
		});

		// マウスコントロールのセッティング
		render.mouse = this.getMouseControl(world, engine, render)

		engine.gravity.scale = 0
		// add all of the bodies to the world
		const jointMan = this.getJointMan()

		this.Composite.add(engine.world, jointMan);
		// run the renderer
		this.Render.run(render);

		// create runner
		var runner = this.Runner.create();

		// run the engine
		this.Runner.run(runner, engine);
	}

	/**
	 * マウスコントロールを取得
	 * @param {*} world 
	 * @param {*} engine 
	 * @param {*} render 
	 * @returns 
	 */
	getMouseControl(world, engine, render) {
		// add mouse control
		let mouse = this.Mouse.create(render.canvas)
		let mouseConstraint = this.MouseConstraint.create(engine, {
			mouse: mouse,
			constraint: {
				stiffness: 0.2,
				render: {
					visible: false
				}
			}
		});
		this.Composite.add(world, mouseConstraint);
		return mouse
	}

	/**
	 * 全パーツを設定し、取得する
	 * @returns {array} 
	 */
	getJointMan() {
		const group = this.Body.nextGroup(true)

		const head = this.Bodies.circle(235, 130, 40, {
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
		// this.Composite.add(composite, [hComposite, body])

		// this.Composites.chain(composite, 0, 1, 0, -1, {
		// 	stiffness: 1,
		// 	length: 1,
		// 	angularStiffness: 0.2,
		// 	render: {
		// 		strokeStyle: '#4a485b',
		// 		lineWidth: 10,
		// 		visible: false
		// 	}
		// })

		let composite = this.Composite.create({
			label: 'joint-man'
		})

		const joint = this.Constraint.create({
			bodyB: body,
			pointB: {
				x: 0,
				y: -100
			},
			bodyA: head,
			stiffness: 1,
			length: 0
		})


		this.Composite.addBody(composite, body);
		this.Composite.addBody(composite, head);

		composite = this.Composite.add(composite,
			[rightArm, leftArm]
		)
		console.log(composite)
		// this.Composite.addBody(composite, leftArm);
		// this.Composite.addBody(composite, rightLeg);
		// this.Composite.addBody(composite, leftLeg);
		this.Composite.addConstraint(composite, joint);
		// this.Composites.chain(composite, 0, 0.35, 0, -0.35, {
		// 	stiffness: 1,
		// 	length: 1,
		// 	angularStiffness: 0.2,
		// 	render: {
		// 		strokeStyle: '#4a485b',
		// 		lineWidth: 10,
		// 		visible: false
		// 	}
		// })
		// this.Composite.create({
		// 	bodies: [body],
		// 	composites: [rightArm]
		// })

		return [composite, rightArm, leftArm, rightLeg, leftLeg]
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
		const part1 = this.Bodies.rectangle(x, y, w, h, {
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
		// const composite = this.Composite.create({
		// 	bodies: [part1]
		// })


		// this.Composite.add(composite, this.Constraint.create({
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
		const parts1 = this.Bodies.rectangle(x, y, w, h, {
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
		const parts2 = this.Bodies.rectangle(x, y, w, h, {
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
		const parts = this.Composite.create({
			bodies: [parts1, parts2]
		})
		// console.log(parts)
		//結合
		this.Composites.chain(parts, 0, 0.35, 0, -0.35, {
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