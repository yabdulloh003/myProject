<?php
    include("config/autoload.php");
    
    $project_id = @$REQUEST->project_id; // รับค่ารหัสโครงการที่จะลบ

    // ดึงที่ตั้งรูปภาพเดิมของโครงการที่จะลบ
    $project_image = $DATABASE->QueryString("SELECT project_image FROM project WHERE project_id='".$project_id."'");

    $sql = "
        DELETE FROM project 
        WHERE project_id='".$project_id."'
    ";
    if( $DATABASE->Query($sql) ) {
        if($project_image!="" && file_exists($project_image)) { // ตรวจสอบว่ามีรูปภาพในโฟลเดอร์ไหม
        	unlink($project_image); // ลบรูปภาพโครงการ
        }
        echo json_encode(array(
            "status"=>true,
        ));
    } else {
        echo json_encode(array(
            "status"=>false,
            "message"=>"ไม่สามารถติดต่อฐานข้อมูลได้"
        ));
    }
