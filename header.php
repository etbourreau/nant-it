<html>
	<head>
		<title>Nant'IT - Conception de Sites Web & Hébergement</title>
		<link rel="stylesheet" type="text/css" href="css/style.css">
		<link rel="stylesheet" type="text/css" href="css/header.css">
		<link rel="stylesheet" type="text/css" href="css/footer.css">
		<script type="text/javascript" src="js/traitement.js"></script>
		<style>
		@import url('https://fonts.googleapis.com/css?family=Cinzel');
		//font-family: 'Cinzel', serif;
		</style>
	</head>
	<body>

<div class="header">

	<div class="row">
		<div class="logo">
			<a href="./">
				<img src="img/header/logo.png" alt="Nant'IT" title="Nant'IT"/>
			</a>
		</div>
		<div class="tabs">
			<?php
			$nbTabs = 4;
			?>
			<ul>
				<li id="tab-1" class="selected" onClick="getTab(1, <?=$nbTabs?>, 'templates/accueil.php', 'content');">
					ACCUEIL
				</li>
				<li  id="tab-2" onClick="getTab(2, <?=$nbTabs?>,  'templates/presentation.php', 'content');">
					PRÉSENTATION
				</li>
				<li  id="tab-3" onClick="getTab(3, <?=$nbTabs?>, 'templates/gallerie.php', 'content');">
					GALLERIE
				</li>
				<li  id="tab-4" onClick="getTab(4, <?=$nbTabs?>, 'templates/contact.php', 'content');">
					CONTACT
				</li>
			</ul>
		</div>
	</div>
	
	<div class="row">
		<div class="desc">
			CRÉATEUR DE SITES WEB & HÉBERGEMENT
		</div>
	</div>
	
	<div class="bar">
	</div>
	
</div>