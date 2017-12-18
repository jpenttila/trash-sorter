var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var trash = [
			"tin-can",  
			"cd-disc", 
			"battery", 
			"apple", 
			"plastic-spoon",
			"brown-bottle",
			"lightbulb",
			"shampoo",
			"weed-killer",
			"thermometer",
			"milkcan",
			"plastic-bag",
			"newspaper",
			"coloured-paper",
			"broken-bottle",
			"chair",
			"television",
			"egg-carton",
			"teabag",
			"broken-plate",
			"spraycan2",
			"cardb-box",
			"paperbag",
			"paper-plate",
			"socks",
			"micro",
			"blender",
			"sodacan",
			"book",
			"glass-jar",
			"broken-bottle"
		 ];
		 
		 var bins = [
		 	"biojäte",
		 	"sekajäte",
		 	"pienmetalli",
		 	"muovi",
		 	"polttokelpoinen jäte",
		 	"ongelmajäte",
		 	"kartonki",
		 	"energiajäte",
		 	"lasi",
		 	"keräyspaperi",
		 	"elektroniikkajäte",
		 	"kierrätyskeskus"
		 ];
		 
		 var bio = ["apple", "egg-carton", "teabag"];
		 var mix = ["lightbulb", "broken-plate", "cd-disc"];
		 var metal = ["tin-can", "spraycan2", "sodacan"];
		 var cardb = ["milkcan", "cardb-box", "paper-plate"];
		 var paper = ["newspaper", "coloured-paper", "paperbag"];
		 var glass = ["brown-bottle", "glass-jar","broken-bottle"];
		 var plastic = ["plastic-bag", "plastic-spoon", "shampoo"];
		 var elec = ["television", "micro", "blender"];
		 var hazmat = ["weed-killer", "thermometer", "battery"];
		 var recyc = ["chair", "socks", "book"];
		 
		 var j, t, f, result, junkToBeTested, gLen, checkVal, img, imgGO, fact, factoid, bin;
		 var oldJunk = new Array();
		 var recAnswers = new Array();
		 var recImages = new Array();
		 
		 //pelin alustus, globaalit muuttujat nollille ja matriisiin täytearvo		 
		 		 
		 function presetGame()	{
    		j = 0;
    		t = 0;
    		f = 0;
    		result = 0;
    		oldJunk = ["filler"];
    		runGame();
		 }
		 
		 //satunnaisarvon nouto
		 		 
		 function randomValueFromArray(array){
  			return array[Math.floor(Math.random()*array.length)];
		 }		 
		 
		 //satunnaisarvo trash-matriisista		 
		 
		 function getValue()	{
		 	var junk = randomValueFromArray(trash);
		 	//document.getElementById("sortOut").innerHTML = junk;
		 	var junkToBeTested = junk;
		 	console.log("Käsiteltävä jäte: " + junkToBeTested);
			return junkToBeTested;
		 }	
		 	
		function runGame()	{			
			junkToBeTested = getValue();	//luetaan trash-matriisista satunnainen arvo junkToBeTested-muuttujaan
			//findImage(junkToBeTested);
			$("#start").hide();
			$("#next").hide();
			$("#factBox").hide();
			$("#bin-grid-container").show();
			console.log(result);
			var gLen = oldJunk.length;		//luetaan muuttujaan gLen oldJunk-matriisin pituus
			console.log("Kierros nro: " + gLen);
			//testataan onko junkToBeTested-muuttujan arvo oldJunk-matriisissa 
			var contains = function(junkToBeTested) {		
    			var findNaN = junkToBeTested !== junkToBeTested;
    			var indexOf;
    			if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        				indexOf = Array.prototype.indexOf;
    			} else {
        				indexOf = function(junkToBeTested) {
            			var i = -1, index = -1;
            			for(i = 0; i < this.length; i++) {
                			var item = this[i];
                			if((findNaN && item !== item) || item === junkToBeTested) {
                    			index = i;
                    		break;
                			}
            			}
            			return index;
        				};
    			}
    			return indexOf.call(this, junkToBeTested) > -1;
			};
			console.log("Käsiteltävä jäte: " + junkToBeTested);
			if(index = contains.call(oldJunk, junkToBeTested))	{		//jos jäte on matriisissa, palataan funktion alkuun...
				console.log("Oli matriisissa!");
				return runGame();
			} else {																	//...ja jos ei ollut, lasketaan vastaukset ja kutsutaan findImage-funktiota jossa etsitään jätteen kuva
				console.log("Ei ollut matriisissa.");
				countAnswers(result);
				findImage(junkToBeTested);
			}
		}
	
		//etsitään images-kansiosta käsiteltävän jätteen kuva ja kutsutaan edelleen runComp-funktiota	
					
		function findImage(junkToBeTested)	{
			img = document.createElement("img");
    		img.src = "/home/itpc/Työpöytä/Jenni/trashbot/images/" + junkToBeTested + ".png";
    		var pic = document.getElementById("sortOut");
    		$('#sortOut').html(img);
    		//pic.appendChild(img);
    		runComp(gLen);
		}
		
		//verrataan jätettä (junkToBeTested-muuttuja) klikattuun jäteastiaan ja reagoidaan sopivalla tavalla
				
		function runComp(gLen)	{	
				$("img").click(function() {		//reagointi jäteastian napsautukseen
					switch(this.id)	{
						case "bio":
        					var fLen = bio.length;									//luetaan matriisin bio pituus muuttujaan fLen
							bin = "bio";							
							for (var i = 0; i < fLen; i++) {
								if(bio.indexOf(junkToBeTested) > -1)	{		//jos muuttujan junkToBeTested sisältö löytyy matriisista...																
									foundIt();											//...kutsutaan funktiota foundIt (vastaus oli oikein)...	
								}	else {
									notFound();											//...ja jos ei, kutsutaan funktiota notFound (vastaus oli väärin)
								}	
		 					}
		 					break;		
    					case "mix":
        					var fLen = mix.length;
        					bin = "mix";
							for (var i = 0; i < fLen; i++) {
								if(mix.indexOf(junkToBeTested) > -1)	{																
									foundIt();	
								}	else {
									notFound();
								}	
		 					}	
		 					break;
        				case "metal":
        					var fLen = metal.length;
        					bin = "metal";
							for (var i = 0; i < fLen; i++) {
								if(metal.indexOf(junkToBeTested) > -1)	{								
									foundIt();	
								}	else {
									notFound();
								}	
		 					}
		 					break;
        				case "cardb":
        					var fLen = cardb.length;
        					bin = "cardb";
							for (var i = 0; i < fLen; i++) {
								if(cardb.indexOf(junkToBeTested) > -1)	{																
									foundIt();	
								}	else {
									notFound();
								}	
		 					}
		 					break;
        				case "paper":
        					var fLen = paper.length;
        					bin = "paper";
							for (var i = 0; i < fLen; i++) {
								if(paper.indexOf(junkToBeTested) > -1)	{																
									foundIt();	
								}	else {
									notFound();
								}				
		 					}
		 					break;
        				case "glass":
        					var fLen = glass.length;
        					bin = "glass";
							for (var i = 0; i < fLen; i++) {
								if(glass.indexOf(junkToBeTested) > -1)	{																
									foundIt();	
								}	else {
									notFound();
								}			
		 					}
		 					break;
        				case "plastic":
        					var fLen = plastic.length;
        					bin = "plastic";
							for (var i = 0; i < fLen; i++) {
								if(plastic.indexOf(junkToBeTested) > -1)	{																
									foundIt();	
								}	else {
									notFound();
								}	
		 					}
		 					break;
        				case "elec":
        					var fLen = elec.length;
        					bin = "elec";
							for (var i = 0; i < fLen; i++) {
								if(elec.indexOf(junkToBeTested) > -1)	{																
									foundIt();	
								}	else {
									notFound();
								}							
		 					}
		 					break;
        				case "hazmat":
        					var fLen = hazmat.length;
        					bin = "hazmat";
							for (var i = 0; i < fLen; i++) {
								if(hazmat.indexOf(junkToBeTested) > -1)	{																
									foundIt();	
								}	else {
									notFound();
								}		
		 					}
		 					break;
        				case "recyc":
        					var fLen = recyc.length;
        					bin = "recyc";
							for (var i = 0; i < fLen; i++) {
								if(recyc.indexOf(junkToBeTested) > -1)	{																
									foundIt();	
								}	else {
									notFound();
								}
		 					}
		 					break;    		 
		 				}
					});
				}

	// oikea vastaus, ruutuun oikein-kuva ja seuraava-painike, jota painamalla siirrytään resetointiin, 
	// kirjataan result-muuttujaan tieto siitä että vastaus on oikein 

	function foundIt()	{
		result = 0;
		document.getElementById('response').innerHTML = "Oikein!";
		document.getElementById("response").style.borderColor = "#00ff00";
    	/*img.src = "/home/itpc/Työpöytä/Jenni/trashbot/images/correct.png";
    	document.getElementById('response').appendChild(img);*/
    	img.src = "/home/itpc/Työpöytä/Jenni/trashbot/images/" + junkToBeTested + ".png";
    	document.getElementById('sortOut').appendChild(img);
    	//document.getElementById('factBox').appendChild(factBoxContents);
		result = "correct";
		$(document).ready(function(){
   	if ($("#factBox").html().length > 0) {
     		$('#factBox').show();
   	}                                           
 		});
		//$("#factBox").show();
		$("#next").show();
		var nextButton = document.getElementById('next');
   	nextButton.onclick = function(){
   									resetAfterGuess();
   									};
	 }
	
	// väärä vastaus, ruutuun väärin-kuva ja seuraava-painike, jota painamalla siirrytään resetointiin,
	// kirjataan result-muuttujaan tieto siitä että vastaus on väärin	
	
	function notFound()	{
		result = 0;
		document.getElementById('response').innerHTML = "Väärin";
		document.getElementById("response").style.borderColor = "red";
		//img.src = "/home/itpc/Työpöytä/Jenni/trashbot/images/wrong.png";
    	img.src = "/home/itpc/Työpöytä/Jenni/trashbot/images/" + junkToBeTested + ".png";
    	document.getElementById('sortOut').appendChild(img);
    	//document.getElementById('factBox').appendChild(factBoxContents);
		result = "wrong";
		$(document).ready(function(){
		if ($("#factBox").html().length > 0) {
     		$('#factBox').show();
   	}                                           
 		});
		//$("#factBox").show();
		showRightAnswer(junkToBeTested);
		$("#next").show();
		var nextButton = document.getElementById('next');
   	nextButton.onclick = function(){
   									resetAfterGuess();
   									};
	}
	
	// näyttää käsiteltävästä jätteestä pienen tietoiskun	
	
	function didYouKnow(junkToBeTested)	{
		switch(junkToBeTested)	{
			case "cd-disc":
				factTxt = document.createTextNode("CD-levyt ovat muovia, mutta eivät samanlaista muovia kuin esim. muovipullot! Kierrätyksen sijasta voit myös käyttää niitä erilaisiin askarteluprojekteihin..."); 
				factoid = document.getElementById("factBox");				
				factoid.appendChild(factTxt);
				fact = "CD-levyt ovat muovia, mutta eivät samanlaista muovia kuin esim. muovipullot! Kierrätyksen sijasta voit myös käyttää niitä erilaisiin askarteluprojekteihin..."; 
				break;
			case "battery":
				factTxt = document.createTextNode("Paristot sisältävät myrkyllisiä aineita, esim. kaliumhydroksidia, joka saattaa aiheuttaa hengitys-, silmä- tai ihoärsytystä."); 
				factoid = document.getElementById("factBox");
				factoid.appendChild(factTxt);
				fact = "Paristot sisältävät myrkyllisiä aineita, esim. kaliumhydroksidia, joka saattaa aiheuttaa hengitys-, silmä- tai ihoärsytystä.";
				break;
			case "lightbulb":
				factTxt = document.createTextNode("Tavalliset hehkulamput voi laittaa polttokelpoiseen jätteeseen. Energiansäästö- ja LED-lamput sekä alle 25 cm pitkät loisteputket (energiansäästölampuissa on pieniä määriä elohopeaa, LED-lampuissa kierrätyskelpoisia materiaaleja ja elektroniikkaa) viedään niitä myyviin liikkeisiin. Isojen loisteputkien oikea paikka on elektroniikkaromu.");
				factoid = document.getElementById("factBox");
				factoid.appendChild(factTxt);
				fact = "Tavalliset hehkulamput voi laittaa polttokelpoiseen jätteeseen. Energiansäästö- ja LED-lamput sekä alle 25 cm pitkät loisteputket (energiansäästölampuissa on pieniä määriä elohopeaa, LED-lampuissa kierrätyskelpoisia materiaaleja ja elektroniikkaa) viedään niitä myyviin liikkeisiin. Isojen loisteputkien oikea paikka on elektroniikkaromu.";
				break;
			case "thermometer":
				factTxt = document.createTextNode("Perinteinen lämpömittari sisältää elohopeaa, joka on erittäin haitallista niin ihmisille kuin ympäristöllekin. Digitaalisen kuumemittarin voi laittaa elektroniikkaromun sekaan.");
				factoid = document.getElementById("factBox");
				factoid.appendChild(factTxt);
				fact = "Perinteinen lämpömittari sisältää elohopeaa, joka on erittäin haitallista niin ihmisille kuin ympäristöllekin. Digitaalisen kuumemittarin voi laittaa elektroniikkaromun sekaan.";
				break;
			case "milkcan":
				factTxt = document.createTextNode("Muovikorkkia ei tarvitse ottaa irti.");
				factoid = document.getElementById("factBox");
				factoid.appendChild(factTxt);
				fact = "Muovikorkkia ei tarvitse ottaa irti."; 
				break;
			case "chair":
				factTxt = document.createTextNode("Rikkinäiset huonekalut viedään jäteasemalle.");
				factoid = document.getElementById("factBox");
				factoid.appendChild(factTxt);
				fact = "Rikkinäiset huonekalut viedään jäteasemalle.";
				break;
			case "television":
				factTxt = document.createTextNode("Toimivan laitteen voi viedä kierrätyskeskukseen.");
				factoid = document.getElementById("factBox");
				factoid.appendChild(factTxt);
				fact = "Toimivan laitteen voi viedä kierrätyskeskukseen.";
				break;
			case "socks":
				factTxt = document.createTextNode("Rikkinäiset vaatteet heitetään polttokelpoiseen jätteeseen, leikataan matonkuteiksi tai käytetään muissa askarteluprojekteissa.");
				factoid = document.getElementById("factBox");
				factoid.appendChild(factTxt);
				fact = "Rikkinäiset vaatteet heitetään polttokelpoiseen jätteeseen, leikataan matonkuteiksi tai käytetään muissa askarteluprojekteissa.";
				break;
			case "micro":
				factTxt = document.createTextNode("Toimivan laitteen voi viedä kierrätyskeskukseen.");
				factoid = document.getElementById("factBox");
				factoid.appendChild(factTxt);
				fact = "Toimivan laitteen voi viedä kierrätyskeskukseen.";
				break;
			case "blender":
				factTxt = document.createTextNode("Toimivan laitteen voi viedä kierrätyskeskukseen.");
				factoid = document.getElementById("factBox");
				factoid.appendChild(factTxt);
				fact = "Toimivan laitteen voi viedä kierrätyskeskukseen.";
				break;
			case "book":
				factTxt = document.createTextNode("Vanhat kirjat, joista on poistettu kannet, pannaan paperinkeräykseen.");
				factoid = document.getElementById("factBox");
				factoid.appendChild(factTxt);
				fact = "Vanhat kirjat, joista on poistettu kannet, pannaan paperinkeräykseen.";
				break;
		}
		return(fact);		     		
	}
				
	// lasketaan oikeat ja väärät vastaukset sekä käsiteltyjen jätteiden määrä, reagoidaan jätteiden määrään	
	
	function countAnswers(result)	{	
		/*if(result === "correct")	{			
				t++;
				//console.log("Yksi oikein! " + t + junkToBeTested);
				document.getElementById('correct').innerHTML = "Oikein: " + t + "/15";
		} else if (result === "wrong") {				
				f++;
				//console.log("Yksi väärin! " + f + junkToBeTested);
				document.getElementById('wrong').innerHTML = "Väärin: " + f + "/15";
		}*/
		document.getElementById('counter').innerHTML = "Jätteitä: " + j + "/15";
		didYouKnow(junkToBeTested);						// ladataan käsittelyssä oleva junkToBeTested-muuttujan arvo didYouKnow-funktioon				
		j = j + 1;
		if(j === 15 + 1) 
		{	endGame();
			}
	}	
	
	// näytetään pelitilanne ja faktaloota, talletetaan käsitelty jäte oldJunk-muuttujaan 
	// (varmistus että jokainen jäte tulee vain kerran käsiteltäväksi)
	
	function resetAfterGuess()	{
		$("#counter").show();
		//$("#correct").show();
		//$("#wrong").show();
		//$("#factBox").show();
		console.log("Faktalootan sisältö on: " + fact);
		/*if(fact !== null)	{
			alert(fact);
		}*/
		recImages.push(img.src);
		if (result === "correct") {
			var thumb = document.createElement("img");
			thumb.src = "/home/itpc/Työpöytä/Jenni/trashbot/images/thumbs/thumbup.png";
    		document.getElementById('thumbbox').appendChild(thumb);
    		var ans = "Oikein";
			recAnswers.push(ans);
    	}	else {    	
    		var thumb = document.createElement("img");
    		thumb.src = "/home/itpc/Työpöytä/Jenni/trashbot/images/thumbs/thumbdown.png";
    		document.getElementById('thumbbox').appendChild(thumb);
    		var ans = "Väärin";
			recAnswers.push(ans);
    	}
		document.getElementById('response').innerHTML = "";
		document.getElementById('factBox').innerHTML = "";
		document.getElementById("sortOut").innerHTML = "";
		document.getElementById('response').style.borderColor = "#fff";
		console.log("Muuttujan bin sisältö on: " + bin);
		$('img').css("border", "none");
		fact = 0;
		oldJunk.push(junkToBeTested);
		//console.log(oldJunk);
		//$("factBox").hide();
		runGame();
		}
		
	// näytetään oikea vastaus jos vastaus oli väärin
	
	function showRightAnswer (junkToBeTested)	{
		
		$(document).ready( function () {
		switch(junkToBeTested) {
		
		case "apple": 
		case "egg-carton": 
		case "teabag":	
					var imgId = document.getElementById('bio');
					imgId.style.border='3px solid #00ff00';
					break;
		case "lightbulb": 
		case "broken-plate": 
		case "cd-disc":
					var imgId = document.getElementById('mix');
					imgId.style.border='3px solid #00ff00';
					break;
		case "tin-can": 
		case "spraycan2": 
		case "sodacan":
					var imgId = document.getElementById('metal');
					imgId.style.border='3px solid #00ff00';
					break;
		case "milkcan": 
		case "cardb-box": 
		case "paper-plate":
					var imgId = document.getElementById('cardb');
					imgId.style.border='3px solid #00ff00';
					break;
		case "newspaper": 
		case "coloured-paper": 
		case "paperbag":
					var imgId = document.getElementById('paper');
					imgId.style.border='3px solid #00ff00';
					break;
		case "brown-bottle": 
		case "glass-jar": 
		case "broken-bottle":
					var imgId = document.getElementById('glass');
					imgId.style.border='3px solid #00ff00';
					break;					
		case "plastic-bag": 
		case "plastic-spoon": 
		case "shampoo":
					var imgId = document.getElementById('plastic');
					imgId.style.border='3px solid #00ff00';
					break;
		case "television": 
		case "micro": 
		case "blender":
					var imgId = document.getElementById('elec');
					imgId.style.border='5px solid #00ff00';
					break;
		case "weed-killer": 
		case "thermometer": 
		case "battery":
					var imgId = document.getElementById('hazmat');
					imgId.style.border='5px solid #00ff00';
					break;					
		case "chair": 
		case "socks": 
		case "book":
					var imgId = document.getElementById('recyc');
					imgId.style.border='5px solid #00ff00';
					break;
		}
		});
	}
			 			
	// kun kaikki jätteet on käsitelty, piilotetaan jäteastiat ja käsiteltävä jäte, laitetaan näkyville gameOver-kyltti ja pelin uudelleenkäynnistyspainike	
	
	function endGame()	{
		//document.getElementById('endGame').innerHTML = "Peli ohi!";
		$("#bio").hide();
		$("#mix").hide();
		$("#metal").hide();
		$("#cardb").hide();
		$("#paper").hide();
		$("#glass").hide();
		$("#plastic").hide();
		$("#elec").hide();
		$("#hazmat").hide();
		$("#recyc").hide();
		$("#next").hide();
		$("#text").hide();
		$("#response").hide();
		$("#counter").hide();
		var parent = document.getElementById("sidepanel-elements");
		var child = document.getElementById("sortOut");
		parent.removeChild(child);
		/*$("#endgame-container").show();
		$("#endGame").show();
		$("#link").show();
		$("#restart").show();
		$("#showScore").show();*/
		var endgameContainer = document.createElement('div');
		var endgameGrid = document.createElement('div');
		endgameContainer.id = "endgame-container";
		endgameGrid.id = "endgame-grid";
		document.getElementById("endgame-container").appendChild(endgameGrid);
		var endgame = document.createElement('img');
		endgame.src = "/home/itpc/Työpöytä/Jenni/trashbot/images/gameover-sign.png";
		endgame.id = "gameover";
    	document.getElementById("endgame-grid").appendChild(endgame); 
		var link = document.createElement('img');
		link.src = "/home/itpc/Työpöytä/Jenni/trashbot/images/link-sign.png";
		link.id = "link";
    	document.getElementById("endgame-grid").appendChild(link);
		var restart = document.createElement('img');
		restart.src = "/home/itpc/Työpöytä/Jenni/trashbot/images/restart-sign.png";
		restart.id = "restart";
    	document.getElementById("endgame-grid").appendChild(restart);
		var score = document.createElement('img');
		score.src = "/home/itpc/Työpöytä/Jenni/trashbot/images/score-sign.png";
		score.id = "score";
    	document.getElementById("endgame-grid").appendChild(score);
		var placeForStuff = document.getElementById('content');
		var contents = document.querySelector('.bin-grid-container');
		var endcontents = document.getElementById('endgame-container');
		placeForStuff.removeChild(contents);
		placeForStuff.appendChild(endcontents);
		$("#endGame").show();
		$("#link").show();
		$("#restart").show();
		$("#showScore").show();
		$('#link').css('cursor', 'pointer');
		$('#restart').css('cursor', 'pointer');
		$('#score').css('cursor', 'pointer');
		link.onclick = function(){
								imageClick("http://www.raahe.fi/instancedata/prime_product_julkaisu/testi/embeds/testiwwwstructure/29362_Raahen_jateopas_web.pdf");
								};
		restart.onclick = function(){								
								location.reload();
								};
		score.onclick = function(){
								showScore();
								};
		j = 0;
		t = 0;
		f = 0;					
		}
		
		function imageClick(url) {
    		window.location = url;
		}
		
		function showScore()	{
			//alert(recAnswers);
			localStorage.setItem("score", recAnswers);
			localStorage.setItem("junklist", recImages);
			window.open("scoresheet.html");		
		}
	  