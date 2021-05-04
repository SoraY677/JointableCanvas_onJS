function settingMatterJS() {
	// module aliases
	var Engine = Matter.Engine,
		Render = Matter.Render,
		Runner = Matter.Runner,
		Bodies = Matter.Bodies,
		MouseConstraint = Matter.MouseConstraint,
		Mouse = Matter.Mouse,
		Composite = Matter.Composite;

	// create an engine
	var engine = Engine.create(),
		world = engine.world;

	// create a renderer
	var render = Render.create({
		element: document.body,
		engine: engine
	});

	// create two boxes and a ground
	var boxA = Bodies.rectangle(400, 200, 80, 80);
	var boxB = Bodies.rectangle(450, 50, 80, 80);
	var ground = Bodies.rectangle(400, 610, 810, 60, {
		isStatic: true
	});

	// add mouse control
	var mouse = Mouse.create(render.canvas),
		mouseConstraint = MouseConstraint.create(engine, {
			mouse: mouse,
			constraint: {
				stiffness: 0.2,
				render: {
					visible: false
				}
			}
		});
	Composite.add(world, mouseConstraint);
	render.mouse = mouse

	// add all of the bodies to the world
	Composite.add(engine.world, [boxA, boxB, ground]);

	// run the renderer
	Render.run(render);

	// create runner
	var runner = Runner.create();

	// run the engine
	Runner.run(runner, engine);
}

window.onload = function () {

	settingMatterJS()

	// let jointMan = new JointMan()
	// let canvas = document.getElementById('main_canvas')

	// jointMan.drawBase(canvas)

	// var img = new Image();
	// img.src = 'http://www.w3.org/Icons/SVG/svg-logo-v.svg';
	// img.onload = function () {
	// 	var c = document.getElementById('main_canvas');
	// 	var ctx = c.getContext('2d');
	// 	ctx.drawImage(img, 0, 0, 200, 200);
	// }

}