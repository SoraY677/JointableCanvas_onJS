/**
 * Matter-JSの機能を仲介する拡張スクリプト
 * doc:[https://brm.io/matter-js/docs/]
 */
class MatterJSMediator {
	// module aliases
	Engine = Matter.Engine
	Render = Matter.Render
	Runner = Matter.Runner
	Bodies = Matter.Bodies
	MouseConstraint = Matter.MouseConstraint
	Mouse = Matter.Mouse
	Composite = Matter.Composite

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
		return [
			//
			this.Bodies.rectangle(400, 200, 80, 80),
			//
			this.Bodies.rectangle(450, 50, 80, 80),
			//
			this.Bodies.rectangle(400, 610, 810, 60, {
				isStatic: true
			})
		]
	}
}