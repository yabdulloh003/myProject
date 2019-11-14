<?php
    include("config/autoload.php");

    $project_name = @$REQUEST->project_name;        // รับชื่อโครงการ
    $project_detail = @$REQUEST->project_detail;    // รับรายละเอียดโครงการ
    $project_date = @$REQUEST->project_date;        // รับวันที่จัดโครงการ
    $project_amount = @$REQUEST->project_amount;    // รับงบประมาณโครงการ
    $project_image = @$REQUEST->project_image;      // รับที่ตั้งรูปภาพโครงการ
    $user_id = @$REQUEST->user_id;                  // รับรหัสผู้ใช้ของผู้บันทึกโครงการ


    $project_id = $DATABASE->QueryMaxId("project", "project_id");   // ทำการสร้างรหัสโครงการใหม่ โดยรหัสโครงการจะเป็น running ตัวเลข 1 2 3 ...
    $date = date("Y-m-d H:i:s");                                    // ดึงเวลาปัจจุบัน

    // คำสังสำหรับเปลียนที่ตั้งของรูปโครงการ จากโฟลเดอร์ tmp เป็น project โดยเก็บที่ตั้งเดิมไว้ก่อน
    // ตัวอย่าง fileupload/tmp/1572714336.jpeg เป็น fileupload/project/1572714336.jpeg
    $project_image_old = $project_image;
    $project_image = str_replace("tmp", "project", $project_image);

    $sql = "
        INSERT INTO project (
            project_id,
            project_name,
            project_detail,
            project_date,
            project_amount,
            project_image,
            user_id,
            date
        ) VALUES (
            '".$project_id."',
            '".$project_name."',
            '".$project_detail."',
            '".$project_date."',
            '".$project_amount."',
            '".$project_image."',
            '".$user_id."',
            '".$date."'
        )
    ";
    if( $DATABASE->Query($sql) ) { // ทำการ Query เพื่อเพิ่มข้อมูลโครงการ
        if($project_image_old!="" && file_exists($project_image_old)) { // ตรวจสอบว่ามีการอัพโหลดรูปภาพไหม
            rename($project_image_old, $project_image); // ทำการย้ายภาพจากที่เก็บในโฟลเดอร์ tmp ไปยังที่เก็บโฟลเดอร์ project
        }
        echo json_encode(array(
            "status"=>true // เมื่อเพิ่มโครงการเสร็จเรียบร้อยส่งข้อมูลกลับไปยังแอพอีกครั้งโดยแจ้ง status=true
        ));
    } else {
        // กรณีเพิ่มโครงการไม่ได้ให้แจ้งกลับไปยังแอพ status=false พร้อมกับ Message
        echo json_encode(array(
            "status"=>false,
            "message"=>"ไม่สามารถติดต่อฐานข้อมูลได้"
        ));
    }
