module.exports = {
	muted: false,
	timer: null,
	activate: function( duration, fn ){
		if( this.muted ){
			return;
		}
		
		var _this = this;
		this.muted = true;
		this.timer = setTimeout( function(){
			_this.deactivate( fn );
		}, duration * 1000 );
	},

	deactivate: function( fn ){
		this.muted = false;
		if( fn ){
			return fn();
		}
	}

};