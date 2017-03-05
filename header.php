<html>
	<head>
		<title>Nant'IT - Conception de Sites Web & Hébergement</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<link rel="stylesheet" type="text/css" href="css/style.css">
		<link rel="stylesheet" type="text/css" href="css/header.css">
		<link rel="stylesheet" type="text/css" href="css/footer.css">
		<script type="text/javascript" src="js/traitement.js"></script>
		<style>
		@import url('https://fonts.googleapis.com/css?family=Cinzel');
		</style>
	</head>
	<body>
	<?php
		include('traitement.php');
		init();
	?>

<div class="header">

	<div class="row">
		<div class="logo">
			<a href="./">
				<img src="img/header/logo.png" alt="Nant'IT" title="Nant'IT"/>
			</a>
		</div>
		<div class="tabs">
			<ul>
				<?php
				foreach($GLOBALS['tabs'] as $lineTab){
					?>
					<li id="tab-<?=$lineTab['id']?>"
						<?php 
						if( (!isset($_POST['tab']) && $lineTab['id']==0) || (isset($_POST['tab']) && $_POST['tab']==$lineTab['id']) )
							echo 'class="selected"';
						if(isset($lineTab['content'])){
							?>
							onClick="document.getElementById('<?=$GLOBALS['pageDiv']?>').innerHTML = <?=$lineTab['content']?>;"
							<?php
						}else{
							?>
							onClick="getTab(<?=$lineTab['id']?>, <?=count($GLOBALS['tabs'])?>, '<?=$lineTab['file']?>', '<?=$GLOBALS['pageDiv']?>');"
							<?php
						}
						?> 
						>
						<?=$lineTab['title']?>
					</li>
					<?php
				}
				?>
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