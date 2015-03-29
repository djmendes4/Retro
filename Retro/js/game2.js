//Guilegames - Dillon Mendes - 2014

/*jslint devel:true plusplus:true */

var Controls = {
	initialize: function () {
		'use strict';

		window.addEventListener('keydown', Controls.onKeyDown, false);
		window.addEventListener('keyup', Controls.onKeyUp, false);
	},

	variables: {
		directionControls: []
	},

	onKeyDown: function (event) {
		'use strict';

		this.keyCode = event.keyCode;
		console.log(this.keyCode);

		switch (this.keyCode) {
		case 119: // W
		case 97: // A
		case 115: // S
		case 100: // D
			Controls.movementControls(this.keyCode);
			break;
		}
	},

	onKeyUp: function (event) {
		'use strict';

		this.keyCode = event.keyCode;
		console.log(this.keyCode);

		switch (this.keyCode) {
		case 119: // W
		case 97: // A
		case 115: // S
		case 100: // D
			Controls.stopControls(this.keyCode);
			break;
		}
	},

	movementControls: function (pressedKey) {
		'use strict';

		if (Controls.detectHeldKey(pressedKey)) {
			Controls.variables.directionControls.push(pressedKey);
//			console.log('Key number ' + pressedKey + ' has been pressed.');
			console.log(Controls.variables.directionControls);
		}
	},

	stopControls: function (pressedKey) {
		'use strict';

		var index = 0;

		for (index = 0; index < Controls.variables.directionControls.length; index++) {
			if (Controls.variables.directionControls[index] === pressedKey) {
//				console.log(Controls.variables.directionControls);
				Controls.variables.directionControls.splice(index, 1);
//				console.log(Controls.variables.directionControls);
			}
		}
	},

	detectHeldKey: function (pressedKey) {
		'use strict';

		var index = 0;

		for (index = 0; index < Controls.variables.directionControls.length; index++) {
			if (Controls.variables.directionControls[index] === pressedKey) {
				return true;
			}
		}

		return false;
	}
};

window.onload = function () {
	'use strict';
	Controls.initialize();
};
