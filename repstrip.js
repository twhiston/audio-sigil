// inlets and outlets
inlets = 1;
outlets = 1;

var d = new Dict("settings");

function strip(r)
{
	var str = r.toString()
	var linesplit = str.split('\n')
	
	process_phrases(linesplit)
	process_dedupe(linesplit)
	outlet(0, linesplit.length-1)
}


function process_phrases(linesplit){
	d.remove('input')
	for (var i = 0, len = linesplit.length; i < len; i++) {
		if(linesplit[i]){
			d.replace('input::' + i, linesplit[i])
		}
	}
}

function process_dedupe(linesplit){
	d.remove('data')
	for (var i = 0, len = linesplit.length; i < len; i++) {
		if(linesplit[i]){
			var split = linesplit[i].replace(/\s+/g, '').toLowerCase().split("").filter(function(x, n, s) {
  				return s.indexOf(x) == n
			}).join("");
			d.replace('data::' + i, split)
		}
	}	
}	