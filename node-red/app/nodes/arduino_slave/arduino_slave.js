module.exports = function(RED) {
	var i2cBus = require("i2c-bus");

	function arduino_slaveNode(n) {
		// Création du noeud
		RED.nodes.createNode(this, n);

		// Variables
		this.addr = parseInt(n.addr, 16);
		this.i2c1 = i2cBus.openSync(1);

		// Functions
		function sleep(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
		}

		// Action
		this.on('input', function(msg) {
			let value = [];

			// Demande à l'arduino des valeurs
			for(i=1; i<9; i++){
				value[i-1] = this.i2c1.readByteSync(this.addr, i);
				sleep(10);
			}

			// Dispatch des valeurs dans leur message
			let msg1 = {payload: value[0]};
			let msg2 = {payload: value[1]};
			let msg3 = {payload: value[2]};
			let msg4 = {payload: value[3]};
			let msg5 = {payload: value[4]};
			let msg6 = {payload: value[5]};
			let msg7 = {payload: value[6]};
			let msg8 = {payload: value[7]};

			// Envoie dans les différents outputs
			this.send([msg1, msg2, msg3, msg4, msg5, msg6, msg7, msg8]);
		});

		this.on('close', function() {
			this.i2c1.closeSync();
		});

	}
	RED.nodes.registerType("arduino_slave", arduino_slaveNode);
}
