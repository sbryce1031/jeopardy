var points = [0, 0, 0]
var qcount = 0
var phase = 1

function doublejep()
{
	for(i=0; i < 6; i++)
	{
			document.getElementById("cat" + (i + 1)).innerHTML = doublequestions[i].name
	}
	var cards = document.getElementsByClassName("grid-item");
	var i;
	for(i = 0; i < 30; i++)
	{
		cards[i].innerHTML = "$" + (parseInt(cards[i].innerHTML.substring(1)) * 2).toString();
		cards[i].style.color = "#f9ab61"
	}
}

function finaljep()
{
	var board = document.getElementById("board");
	board.style.display = "none";
	var q = document.getElementById("q");
	q.style.display = "block";
	q.innerHTML = "<p>Final Jeopardy</p><p>Decimal to Hexadecimal</p><p></p>";
	var next = document.createElement("input");
	next.type = "button";
	next.value = "Reveal Question";
	next.onclick = function(){q.innerHTML = "<p>Convert this decimal number to hexadecimal:</p><p>168</p>";};
	q.appendChild(next);
}

function createResultButton(team, val, correct)
{
	var b = document.createElement("input");
	b.type = "button";
	if(correct)
	{
		b.value = "Right";
	}
	else
	{
		b.value = "Wrong";
	}
	b.onclick = function(){answered(team, val, correct)};
	b.id = b.value.toLowerCase() + team.toString();
	document.getElementById("team" + team.toString()).appendChild(b);
}

function createResultButtons(val)
{
	createResultButton(1, val, true);
	createResultButton(1, val, false);
	createResultButton(2, val, true);
	createResultButton(2, val, false);
	createResultButton(3, val, true);
	createResultButton(3, val, false);
}

function qselected(category, qNdx, card)
{
	qcount++;
  card.style.color = "#0f27a3";
  var board = document.getElementById("board");
	board.style.display = "none";
	var q = document.getElementById("q");
	q.style.display = "block";
	var qobj = questions;
	if(phase == 2)
	{
		qobj = doublequestions;
	}
	if(qobj[category].questions[qNdx].dailyd)
	{
		q.innerHTML = "Daily Double <p></p>";
		var box = document.createElement("input");
		box.type = "text";
		q.appendChild(box);
		var ok = document.createElement("input");
		ok.type = "button";
		ok.value = "Wager";
		ok.onclick = function()
		{
			q.innerHTML = qobj[category].questions[qNdx].q + "<br>";
			var skip = document.createElement("input");
			skip.type = "button";
			skip.value = "Skip";
			skip.onclick = function(){answered(3, 0, true)};
			q.appendChild(skip);
			createResultButtons(parseInt(box.value));
		};
		q.appendChild(ok);
	}
	else
	{
		q.innerHTML = qobj[category].questions[qNdx] + "<p><\p>";
		var skip = document.createElement("input");
		skip.type = "button";
		skip.value = "Skip";
		skip.onclick = function(){answered(3, 0, true)};
		q.appendChild(skip);
		var mult = 200;
		if(phase == 2)
		{
			mult = 400;
		}
		createResultButtons((qNdx + 1) * mult);
	}

	if(qcount >= 30)
	{
		phase++;
		qcount = 0;
		if(phase == 2)
		{
			doublejep();
		}
	}
  }

function answered(teamNum, value, correct) {
	if(correct)
	{
		//go back to grid view
		points[teamNum - 1] += value;
		var board = document.getElementById("board");
		board.style.display = "grid";
		var q = document.getElementById("q");
		q.style.display = "none";

		//remove right and wrong buttons
		var i;
		for(i = 1; i < 4; i++)
		{
			var element = document.getElementById("right" + i.toString());
			element.parentNode.removeChild(element);
			element = document.getElementById("wrong" + i.toString());
			element.parentNode.removeChild(element);
		}
		if(phase == 3)
		{
			finaljep();
		}
	}
	else
	{
		points[teamNum - 1] -= value;
	}

	document.getElementById("score" + teamNum.toString()).innerHTML = "$" + points[teamNum-1].toString();
}