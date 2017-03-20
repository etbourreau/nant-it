<?php
function getConnection(){
	return mysqli_connect("localhost", "root", "", "nantit");
}

function init(){
	
	$GLOBALS['connect'] = getConnection();
	$GLOBALS['templates'] = "templates/";
	$GLOBALS['pageDiv'] = "content";
	
	$tabs = array();
	$tabs[] = array(
		'id' => 0,
		'title' => 'Accueil',
		'file' => $GLOBALS['templates'].'accueil.php'
	);
	$tabs[] = array(
		'id' => 1,
		'title' => 'Présentation',
		'file' => $GLOBALS['templates'].'presentation.php'
	);
	$tabs[] = array(
		'id' => 2,
		'title' => 'Galerie',
		'file' => $GLOBALS['templates'].'galerie.php'
	);
	$tabs[] = array(
		'id' => 3,
		'title' => 'Contact',
		'file' => $GLOBALS['templates'].'contact.php'
	);
	$GLOBALS['tabs'] = $tabs;
}

function getTabByName($name){
	$found = false;
	foreach($GLOBALS['tabs'] as $lineTab){
		if(strtolower(trim($lineTab['title'])) == strtolower(trim($name)))
			$found = $lineTab;
	}
	if($found){
		return $found;
	}else{
		return $GLOBALS['tabs'][0];
	}
}
?>