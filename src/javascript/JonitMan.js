import {
	Body,
	Bodies,
	Composite,
	Composites,
	Constraint
} from "./MatterJSMediator"

/**
 * Matter-JSの機能からJointManを設定するクラス
 */
export class JointMan {

	constructor() {
		this.headConfig = {
			x: 235,
			y: 130,
			s: 40,
			type: 'circle'
		}
		this.bodyConfig = {
			x: 280,
			y: 205,
			h: 100,
			w: 160,
			r: [30, 30, 50, 50]
		}
		this.jointConfig = {
			parts: {
				ra1: {
					x: 340,
					y: 200
				},
				ra2: {
					x: 340,
					y: 200
				},
				la1: {
					x: 220,
					y: 200
				},
				la2: {
					x: 220,
					y: 200
				},
				rl1: {
					x: 320,
					l: 345
				},
				rl2: {
					x: 320,
					l: 345
				},
				ll1: {
					x: 240,
					y: 340
				},
				ll1: {
					x: 240,
					y: 340
				}
			},
			h: 30,
			w: 100,
			r: [15, 15, 15, 15]
		}
	}


	createJointMan() {
		// 干渉しないように設定する設定
		const group = Body.nextGroup(true)

		// 各パーツの生成
		const parts = {}
		parts['head'] = this.createCircle(this.headConfig.x, this.headConfig.y, this.headConfig.s, group)
		parts['body'] = this.createBlock(this.bodyConfig.x, this.bodyConfig.y, this.bodyConfig.w, this.bodyConfig.h, this.bodyConfig.r, group)
		for (const key in this.jointConfig.parts) {
			console.log(key)
			parts[key] = this.createBlock(this.jointConfig.parts[key].x, this.jointConfig.parts[key].y, this.jointConfig.w, this.jointConfig.h, this.jointConfig.r, group)
		}

		console.log(parts)



		return []

	}

	/**
	 * body:円を生成する
	 * @param {Number} x 
	 * @param {Number} y 
	 * @param {Number} s 
	 * @param {Number} group 
	 * @returns 
	 */
	createCircle(x, y, s, group) {
		const body = Bodies.circle(x, y, s, {
			collisionFilter: {
				group: group
			},
			frictionAir: 1,
			render: {
				fillStyle: '#00B06B',
				lineWidth: 1
			}
		})

		console.log(body)
		return body
	}

	/**
	 * body:四角形を生成
	 * @param {Number} x 
	 * @param {Number} y 
	 * @param {Number} w 
	 * @param {Number} h 
	 * @param {Array} radius 
	 * @param {Number} group 
	 * @returns 
	 */
	createBlock(x, y, w, h, radius, group) {
		return Bodies.rectangle(x, y, w, h, {
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
	}



	/**
	 * 全パーツを設定し、取得する
	 * @returns {array} 
	 */
	getJointMan() {


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