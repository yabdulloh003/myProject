<?php
    include("config/autoload.php");

    $project_id = @$REQUEST->project_id;
    $project_name = @$REQUEST->project_name;        // รับชื่อโครงการ
    $project_detail = @$REQUEST->project_detail;    // รับรายละเอียดโครงการ
    $project_date = @$REQUEST->project_date;        // รับวันที่จัดโครงการ
    $project_amount = @$REQUEST->project_amount;    // รับงบประมาณโครงการ
    $project_image = @$REQUEST->project_image;      // รับที่ตั้งรูปภาพโครงการ
    $user_id = @$REQUEST->user_id;                  // รับรหัสผู้ใช้ของผู้แก้ไขโครงการ

    $date = date("Y-m-d H:i:s");

    // คำสังสำหรับเปลียนที่ตั้งของรูปโครงการ จากโฟลเดอร์ tmp เป็น project โดยเก็บที่ตั้งเดิมไว้ก่อน
    // ตัวอย่าง fileupload/tmp/1572714336.jpeg เป็น fileupload/project/1572714336.jpeg
    $project_image_old = $project_image;
    $project_image = str_replace("tmp", "project", $project_image);

    // ดึงที่ตั้งของรูปโครงการเดิม
    $project_image_before_edit = $DATABASE->QueryString("SELECT project_image FROM project WHERE project_id='".$project_id."'");

    $sql = "
        UPDATE project SET
            project_name='".$project_name."',
            project_detail='".$project_detail."',
            project_date='".$project_date."',
            project_amount='".$project_amount."',
            project_image='".$project_image."',
            user_id='".$user_id."',
            date='".$date."'
        WHERE project_id='".$project_id."'
    ";
    if( $DATABASE->Query($sql) ) {  // ทำการ Query เพื่อแก้ไขข้อมูลโครงการ
        if($project_image_old!="" && file_exists($project_image_old)) { // ตรวจสอบว่ามีการ upload รูปเข้าใน tmp ก่อนหน้าไหม
            if( $project_image_before_edit!=$project_image ) {      // ตรวจสอบว่ารูปเดิมกับรูปใหม่ไม่ใช่รูปเดียวกัน
                rename($project_image_old, $project_image);         // ทำการย้ายรูปจาก tmp เข้าใน project
                if(file_exists($project_image_before_edit)) unlink($project_image_before_edit); // ถ้ามีรูปเดิมจะทำการลบรูปเดิมออก
            }
        }
        echo json_encode(array(
            "status"=>true, // เมื่อแก้ไขโครงการเสร็จแล้วให้ทำการส่ง status=true
        ));
    } else {
        echo json_encode(array(
            "status"=>false,
            "message"=>"ไม่สามารถติดต่อฐานข้อมูลได้"
        ));
    }
