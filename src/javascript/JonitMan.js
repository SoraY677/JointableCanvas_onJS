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
		// 各座標とサイズ等の設定
		this.headConfig = {
			x: 235,
			y: 130,
			s: 40,
			type: 'circle'
		}
		this.bodyConfig = {
			x: 280,
			y: 205,
			h: 160,
			w: 100,
			r: [30, 30, 50, 50]
		}
		this.partConfig = {
			parts: {
				ra1: {
					x: 340,
					y: 200
				},
				ra2: {
					x: 340,
					y: 200 + 60
				},
				la1: {
					x: 220,
					y: 200
				},
				la2: {
					x: 220,
					y: 200 + 60
				},
				rl1: {
					x: 320,
					y: 345
				},
				rl2: {
					x: 320,
					y: 345 + 60
				},
				ll1: {
					x: 240,
					y: 340
				},
				ll2: {
					x: 240,
					y: 340 + 60
				}
			},
			h: 100,
			w: 30,
			r: [15, 15, 15, 15]
		}

		// 各パーツの接合部分の設定
		this.jointConfig = [
			// head - body
			{
				bodyA: 'head',
				pointA: {
					x: 0,
					y: this.headConfig.s * 1.2
				},
				bodyB: 'body',
				pointB: {
					x: 0,
					y: -1 * this.bodyConfig.h / 2
				}
			},
			// body - leftarm1
			{
				bodyA: 'body',
				pointA: {
					x: -1 * this.bodyConfig.w / 2 * 1.01,
					y: -1 * this.bodyConfig.h / 2
				},
				bodyB: 'la1',
				pointB: {
					x: 0,
					y: -1 * this.partConfig.h / 2
				}
			},
			// leftarm1 - leftarm2
			{
				bodyA: 'la1',
				pointA: {
					x: 0,
					y: this.partConfig.h / 3
				},
				bodyB: 'la2',
				pointB: {
					x: 0,
					y: -1 * this.partConfig.h / 3
				}
			},
			// body - rightarm1
			{
				bodyA: 'body',
				pointA: {
					x: this.bodyConfig.w / 2 * 1.01,
					y: -1 * this.bodyConfig.h / 2
				},
				bodyB: 'ra1',
				pointB: {
					x: 0,
					y: -1 * this.partConfig.h / 2
				}
			},
			// rightarm1 - rightarm2
			{
				bodyA: 'ra1',
				pointA: {
					x: 0,
					y: this.partConfig.h / 3
				},
				bodyB: 'ra2',
				pointB: {
					x: 0,
					y: -1 * this.partConfig.h / 3
				}
			},
			// body - leftleg1
			{
				bodyA: 'body',
				pointA: {
					x: -1 * this.bodyConfig.w / 2 * 1.01,
					y: this.bodyConfig.h / 2 * 0.7
				},
				bodyB: 'll1',
				pointB: {
					x: 0,
					y: -1 * this.partConfig.h / 2
				}
			},
			// leftleg1 - leftleg2
			{
				bodyA: 'll1',
				pointA: {
					x: 0,
					y: this.partConfig.h / 3
				},
				bodyB: 'll2',
				pointB: {
					x: 0,
					y: -1 * this.partConfig.h / 3
				}
			},
			// body - rightleg1
			{
				bodyA: 'body',
				pointA: {
					x: this.bodyConfig.w / 2 * 1.01,
					y: this.bodyConfig.h / 2 * 0.7
				},
				bodyB: 'rl1',
				pointB: {
					x: 0,
					y: -1 * this.partConfig.h / 2
				}
			},
			// rightleg1 - rightleg2
			{
				bodyA: 'rl1',
				pointA: {
					x: 0,
					y: this.partConfig.h / 3
				},
				bodyB: 'rl2',
				pointB: {
					x: 0,
					y: -1 * this.partConfig.h / 3
				}
			},
		]
	}

	/**
	 * 関節ふにゃふにゃの男を誕生させる
	 * @returns {Matter.Composite}
	 */
	createJointMan() {
		// 干渉しないように設定する設定
		const group = Body.nextGroup(true)

		// 各パーツの生成
		const parts = {}
		parts['head'] = this.createCircle(this.headConfig.x, this.headConfig.y, this.headConfig.s, group)
		parts['body'] = this.createBlock(this.bodyConfig.x, this.bodyConfig.y, this.bodyConfig.w, this.bodyConfig.h, this.bodyConfig.r, group)
		for (const key in this.partConfig.parts) {
			parts[key] = this.createBlock(this.partConfig.parts[key].x, this.partConfig.parts[key].y, this.partConfig.w, this.partConfig.h, this.partConfig.r, group)
		}

		const composite = Composite.create()
		// 各パーツを追加
		for (const key in parts) Composite.add(composite, parts[key])
		// 接続設定を追加
		for (let i in this.jointConfig) {
			const config = this.jointConfig[i]
			const constraint = Constraint.create({
				bodyA: parts[config.bodyA],
				pointA: config.pointA,
				bodyB: parts[config.bodyB],
				pointB: config.pointB,
				stiffness: 0,
				length: 0,
				render: {
					visible: false
				}
			})
			Composite.addConstraint(composite, constraint);
		}
		return composite

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
		return Bodies.circle(x, y, s, {
			frictionAir: 1,
			render: {
				fillStyle: '#00B06B',
				lineWidth: 1
			}
		})

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
				// lineWidth: 1
			}
		})
	}

}