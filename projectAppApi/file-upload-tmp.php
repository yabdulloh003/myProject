<?php
	include("config/autoload.php");

	$base64 = @$REQUEST->base64;
	$filename = @$REQUEST->filename;   // "" OR "tmp/15234699.png"

	if($filename!="" && file_exists($filename)) {
		$arr = explode('tmp', $filename);
		if(sizeof($arr)==2) {
			unlink($filename);
		}
	}
	
	$dir = 'fileupload/tmp/';

	$id = time();

	$type = get_type_base64($base64);  // jpg, jpeg, png, gif
	$filename = $id.".".$type;
	file_put_contents($dir.$filename, base64_decode(explode(',',$base64)[1]));

	echo json_encode(array(
        "status"=>true,
        "filename"=>$dir.$filename
    ));
    function get_type_base64($base64) {
		$arr1 = explode(";base64", $base64);
		$arr2 = explode("/", $arr1[0]);
		return $arr2[ sizeof($arr2)-1 ];
	}
