function getXHR() // création d'un objet qui récupère une valeur
{
    var xhr=null;

    if (window.XMLHttpRequest) { // selon le navigateur
        xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else{
        alert("Votre navigateur ne supporte pas l'importation XMLHttpRequest");
        return false;
    }

    return xhr;
}

function loadPart(fileName, divId, id = null){
    var xhr = getXHR();
    xhr.open('POST',fileName,true); // true : asynchronisation
    xhr.onreadystatechange = function(){ //fonction executée qd le statut change
        if (xhr.readyState == 4){ //statut = 4 quand on a recu les donnees
            if (document.getElementById){
                document.getElementById(divId).innerHTML = xhr.responseText;
            }
        }
    }
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	var data = 'id='+id;
    xhr.send(data);
}

function getTab(idTab, max, file, div){
	for(var i = 0; i < max+1; i++){
		if(document.getElementById("tab-"+i)){
			document.getElementById("tab-"+i).className="";
		}
	}
	if(document.getElementById("tab-"+idTab)){
		document.getElementById("tab-"+idTab).className = "selected";
		loadPart(file, div);
	}else{
		document.getElementById("tab-0").className = "selected";
		loadPart( 'templates/accueil.php', 'content');
	}
}