
var notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

var fdot_vals = [-1, -1, -1, -1, -1, -1];

var chord_library = {
	"M7": [0, 4, 7, 11],
	"7(13)": [0, 4, 7, 9, 10],
	"M": [0, 4, 7],
	"m": [0, 3, 7]
}

function gmod(a, b)
{
	return ((a % b) + b) % b
}

function chord_solver()
{	
	var capo_value = parseInt(document.querySelector("#capo-input").value) || 0;
	if (capo_value < 0) { capo_value = 0; document.querySelector("#capo-input").value = 0 }

	var fret_value = parseInt(document.querySelector("#fret-input").value) || 0;
	if (fret_value < 0) { fret_value = 0; document.querySelector("#fret-input").value = 0 }
	
	var starting_point = capo_value + fret_value;

	var n = [4, 9, 2, 7, 11, 4];
	for (var i in fdot_vals)
	{
		if (fdot_vals[i] == -1)
			n[i] = -1
		else
			n[i] = (n[i] + starting_point + fdot_vals[i]) % notes.length;
	}

	var ns = [];
	for (var i of n)
	{
		if (i != -1 && ns.indexOf(i) == -1)
			ns.push(i)
	}
	ns.sort((a,b)=>a-b);

	var match
	for (var chord in chord_library)
	{
		var offsets = chord_library[chord];
		var last = undefined // matters
		match = true;

		if (offsets.length != ns.length) match = false;
		else
			for (var i=0; i<offsets.length; i++)
			{
				if (last != undefined && last != ns[i] - offsets[i])
				{
					match = false;
				}
				last = ns[i] - offsets[i];
			}

		if (match)
		{
			document.querySelector("#chord").style.display = "block";
			document.querySelector("#chord .value").innerText = notes[gmod(last, notes.length)] + chord;
			break;
		}
	}

	if (!match)
	{
		document.querySelector("#chord").style.display = "none";
	}

}

function update(ev)
{
	
	var capo_value = parseInt(document.querySelector("#capo-input").value) || 0;
	if (capo_value < 0) { capo_value = 0; document.querySelector("#capo-input").value = 0 }
	
	var fret_value = parseInt(document.querySelector("#fret-input").value) || 0;
	if (fret_value < 0) { fret_value = 0; document.querySelector("#fret-input").value = 0 }
	
	var starting_point = capo_value + fret_value;
	
	document.querySelector("#string1").innerText = notes[(4 + starting_point) % notes.length];
	document.querySelector("#string2").innerText = notes[(9 + starting_point) % notes.length];
	document.querySelector("#string3").innerText = notes[(2 + starting_point) % notes.length];
	document.querySelector("#string4").innerText = notes[(7 + starting_point) % notes.length];
	document.querySelector("#string5").innerText = notes[(11 + starting_point) % notes.length];
	document.querySelector("#string6").innerText = notes[(4 + starting_point) % notes.length];
	
	document.querySelectorAll(".fdot")[0].querySelector(".fdot-text").innerText = notes[(4 + starting_point + fdot_vals[0]) % notes.length];
	document.querySelectorAll(".fdot")[1].querySelector(".fdot-text").innerText = notes[(9 + starting_point + fdot_vals[1]) % notes.length];
	document.querySelectorAll(".fdot")[2].querySelector(".fdot-text").innerText = notes[(2 + starting_point + fdot_vals[2]) % notes.length];
	document.querySelectorAll(".fdot")[3].querySelector(".fdot-text").innerText = notes[(7 + starting_point + fdot_vals[3]) % notes.length];
	document.querySelectorAll(".fdot")[4].querySelector(".fdot-text").innerText = notes[(11 + starting_point + fdot_vals[4]) % notes.length];
	document.querySelectorAll(".fdot")[5].querySelector(".fdot-text").innerText = notes[(4 + starting_point + fdot_vals[5]) % notes.length];
	
	chord_solver();
}

function snapTo(x, s, o)
{
	return o+s*~~((x-o)/s)
}

function reposition(ev)
{
	var fdotIndex = Math.max(0, ~~(ev.clientX/54)-1);

	var y_pos;
	var fdotValue;
	if (ev.clientY <= 66)
	{
		y_pos = 43;
		fdotValue = 0;
	}
	else
	{
		y_pos = snapTo(ev.clientY, 72, 127);
		fdotValue = ~~((ev.clientY-127)/72)+1;
	}

	document.querySelectorAll(".fdot")[fdotIndex].style.top = y_pos + "px";

	if (fdot_vals[fdotIndex] != -1 && fdot_vals[fdotIndex] == fdotValue)
	{
		document.querySelectorAll(".fdot")[fdotIndex].style.display = "none";
		fdot_vals[fdotIndex] = -1;
	}
	else
	{
		document.querySelectorAll(".fdot")[fdotIndex].style.display = "initial";
		fdot_vals[fdotIndex] = fdotValue;
	}
	update(ev);
}

document.querySelector("#capo-input").addEventListener("input", update);
document.querySelector("#fret-input").addEventListener("input", update);

document.querySelector("#guitar").addEventListener("click", reposition);
document.querySelector("#notes").addEventListener("click", reposition);