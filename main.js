
var notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

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
	
	var fdot_offset = 1;
	document.querySelectorAll(".fdot")[0].querySelector(".fdot-text").innerText = notes[(4 + starting_point + fdot_offset) % notes.length];
	document.querySelectorAll(".fdot")[1].querySelector(".fdot-text").innerText = notes[(9 + starting_point + fdot_offset) % notes.length];
	document.querySelectorAll(".fdot")[2].querySelector(".fdot-text").innerText = notes[(2 + starting_point + fdot_offset) % notes.length];
	document.querySelectorAll(".fdot")[3].querySelector(".fdot-text").innerText = notes[(7 + starting_point + fdot_offset) % notes.length];
	document.querySelectorAll(".fdot")[4].querySelector(".fdot-text").innerText = notes[(11 + starting_point + fdot_offset) % notes.length];
	document.querySelectorAll(".fdot")[5].querySelector(".fdot-text").innerText = notes[(4 + starting_point + fdot_offset) % notes.length];
	
}

document.querySelector("#capo-input").addEventListener("input", update)
document.querySelector("#fret-input").addEventListener("input", update)