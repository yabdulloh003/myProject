<?php
    include("config/autoload.php");
    $project_id = @$REQUEST->project_id;
    $sql = "
        SELECT *
        FROM project
        WHERE project_id='".$project_id."'
    ";
    $result = $DATABASE->QueryObj($sql);
    if( sizeof($result)==1 ) {
        echo json_encode(array(
            "status"=>true,
            "project"=>$result[0]
        ));
    } else {
        echo json_encode(array(
            "status"=>false,
            "project"=>"ไม่พบข้อมูล"
        ));
    }
