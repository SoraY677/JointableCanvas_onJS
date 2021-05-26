import {
	MatterJSMediator
} from "./MatterJSMediator"

import {
	JointMan
} from "./JonitMan"

window.onload = function () {


	const matterJSMgr = new MatterJSMediator('main_canvas')

	const jointMan = (new JointMan()).createJointMan()
	matterJSMgr.addNewComposite(jointMan)

	matterJSMgr.run()


}