
setoutletassist(-1,outlet_help);

var d = new Dict("settings");
var current_index = -1

outlets = 3
inlets = 1

function process(phrase_index){
	
	//bail early if the number is the same
	if (phrase_index == current_index){
		return
	}
	
	var data = d.get("data::"+phrase_index)
	var freq = d.get("freq")
	//Safety check that all things exist
	if (data && freq){
		//output message to set channel count
		outlet(1, 'stop')
		d.replace('active', phrase_index)
		outlet(0, "chans " + data.length)
		for ( var i = 0; i < data.length; i++ )
		{
			var ch = data.charAt(i)
			var f = freq.get(ch)
			if(f){
				var index = i + 1
				outlet(0, 'setvalue ' +index + ' ' + f)
			} else {
				_fail('Character translation not possible, exiting')
				outlet(1, 'stop')
				return
			}	
		}
		current_index = phrase_index
		t = new Task(startdac);
		t.schedule(1000)
	} else {
		_fail('Data index unavailable: '+phrase_index)
		outlet(2, 'bang')
		return
	}
};

function startdac(){
	outlet(1, 'startwindow')
};

function _fail(msg){
	post(msg + '\n')
};


function outlet_help(num)
{
	switch(num) {
  		case 0:
    		assist("output data for cycle generation");
    	break;
  		case 1:
    		assist("dac control");
    	break;
	} 
	
};