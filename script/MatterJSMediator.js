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
		let engine = this.Engine.create()
		let world = engine.world

		// create a renderer
		let render = this.Render.create({
			element: document.body,
			engine: engine
		});

		// マウスコントロールのセッティング
		render.mouse = this.getMouseControl(world, engine, render)

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

		var group = this.Body.nextGroup(true),
			length = 200,
			width = 25;

		//右腕
		const rightArm = this.Composites.stack(350, 120, 2, 1, -20, 0, (x, y) => {
			return this.Bodies.rectangle(x, y, length, width, {
				collisionFilter: {
					group: group
				},
				frictionAir: 0,
				chamfer: 5,
				render: {
					fillStyle: 'transparent',
					lineWidth: 1
				}
			});
		});
		this.Composites.chain(rightArm, 0.45, 0, -0.45, 0, {
			stiffness: 0.9,
			length: 0,
			angularStiffness: 0.7,
			render: {
				strokeStyle: '#4a485b'
			}
		});

		this.Composite.add(rightArm, this.Constraint.create({
			bodyB: rightArm.bodies[0],
			pointB: {
				x: -length * 0.42,
				y: 0
			},
			pointA: {
				x: rightArm.bodies[0].position.x - length * 0.42,
				y: rightArm.bodies[0].position.y
			},
			stiffness: 0.9,
			length: 0,
			render: {
				strokeStyle: '#4a485b'
			}
		}));
		return [
			rightArm

		]
	}
}