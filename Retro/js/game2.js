//Guilegames - Dillon Mendes - 2014

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

		if (Controls.detectHeldKey(this.keyCode)) {
			Controls.variables.directionControls.push(this.keyCode);
		}
	},

	onKeyUp: function (event) {
		'use strict';

		this.keyCode = event.keyCode;
		console.log(this.keyCode);

		console.log(Controls.variables.directionControls);
		Controls.variables.directionControls.pop();
		console.log(Controls.variables.directionControls);
	},

	detectHeldKey: function (pressedKey) {
		'use strict';

		var index = 0;

		for (index = 0; index < Controls.variables.directionControls.index; index++) {
			if (Controls.variables.directionControls[index] === pressedKey) {
			}
		}
		return false;
	},

	input: function () {
		'use strict';
	}
};

window.onload = function () {
	'use strict';
	Controls.initialize();
};
