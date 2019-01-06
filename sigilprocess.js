
setoutletassist(-1,outlet_help);

var d = new Dict("settings");
var current_index = -1

outlets = 3
inlets = 1

function process(phrase_index){
	doprocess(phrase_index, 0)
}

function process_start_task(phrase_index){
	doprocess(phrase_index, 1)
	///TODO unmute
}

function doprocess(phrase_index, force){
	
	//bail early if the number is the same
	if (phrase_index == current_index && !force){
		return
	}
	
	var data = d.get("data::"+phrase_index)
	var freq = d.get("freq")
	//Safety check that all things exist
	if (data && freq){
		//output message to set channel count
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
	} else {
		_fail('Data index unavailable: '+phrase_index)
		outlet(2, 'bang')
		return
	}
};

function startdac(){
	// todo would be cool to make this dynamic with the max channel number
	outlet(0, 'chans 24')
	//TODO mute
	outlet(1, 'start')
	// We need to set the actual values as part of a task because otherwise it will
	// incorrectly use the first values channel count as the max.
	// Using a task allows us to introduce a delay to handle this
	if (current_index == -1){
			current_index = 0
	}	
	t = new Task(process_start_task, this, current_index)
	t.schedule(50)
};

function stopdac(){
	// todo would be cool to make this dynamic with the max channel number
	outlet(1, 'stop')
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