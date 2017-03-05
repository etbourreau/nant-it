		<footer>
			
			<p>
				Nant'IT &#169; <?php if(date("Y")!=2017) echo "2017 - "; echo date("Y");?>
			</p>
			<p>
				<?php
				$tabContact = getTabByName("Contact");
				?>
				<a href="#" onclick="getTab(<?=$tabContact['id']?>, <?=count($GLOBALS['tabs'])?>, '<?=$tabContact['file']?>', '<?=$GLOBALS['pageDiv']?>');">
					Contact
				</a>
			</p>
		</footer>
	</body>
</html>