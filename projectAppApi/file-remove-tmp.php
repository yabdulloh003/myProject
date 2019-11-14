<?php
	include("config/autoload.php");

	$filename = @$REQUEST->filename;

	if($filename!="" && file_exists($filename)) {
		$arr = explode('tmp', $filename);
		if(sizeof($arr)==2) {
			unlink($filename);
		}
	}

	echo json_encode(array(
      	"status"=>true,
  	));