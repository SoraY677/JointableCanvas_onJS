/**
 * Matter-JSの機能からJointManを設定するクラス
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
		})
	}