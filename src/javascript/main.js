import {
	MatterJSMediator
} from "./MatterJSMediator"

import {
	JointMan
} from "./JonitMan"

window.onload = function () {


	const matterJSMgr = new MatterJSMediator()

	const jointMan = new JointMan()
	jointMan.createJointMan()
	// matterJSMgr.addNewComposite(jointMan.createJointMan)

	matterJSMgr.run()


}