module.exports = function(RED) {
	var i2cBus = require("i2c-bus");

	function ad5242Node(n) {
		// création du noeuds
		RED.nodes.createNode(this, n);

		// Variables
		this.addr = parseInt(n.addr, 16) || 0x2C;
		this.registre = parseInt(n.channel)===0 ? 0x00 : 0x80 || 0x00;
		this.valueRes = parseInt(n.res) || 10000;
		this.i2c1 = i2cBus.openSync(1);

		// Action
		this.on('input', function(msg) {
			let value = parseInt(msg.payload);
			if(value >=0 && value <= this.valueRes){

				// Valeur Max
				if (value >= 9960){
					value = 255;
				}
				// Conversion en valeur hex
				else{
					value = parseInt(value / (0.0039*this.valueRes));
				}
				this.i2c1.writeByteSync(this.addr, this.registre, value);

				// Lecture de la valeur dans le registre de l'AD5242
				msg.payload = this.i2c1.readByteSync(this.addr, this.registre)
			}
			else{
				msg.payload = false;
			}
			this.send(msg)
		});

		this.on('close', function() {
			this.i2c1.closeSync();
		});

	}
	RED.nodes.registerType("ad5242", ad5242Node);
}
