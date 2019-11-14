<?php
    include("config/autoload.php");			// ทำการ include ไฟล์สำหรับการ Config ต่างๆ เช่นการติดต่อฐานข้อมูล, การดึงค่าจากแอพ
    $username = @$REQUEST->username; 		// รับค่าชื่อผู้ใช้
    $password = @$REQUEST->password;		// รับค่ารหัสผ่าน
    $sql = "
        SELECT * 
        FROM user 
            INNER JOIN gender ON gender.gender_id=user.gender_id
        WHERE user.username='".$username."' AND user.password='".$password."'";
    $result = $DATABASE->QueryObj($sql); // ทำการสั่ง Query เพื่อดึงข้อมูลผู้ใช้งานตาม username และ password ที่รับมา
    if( sizeof($result)==1 ) { // ตรวจสอบว่าดึงข้อมูลได้ไหม หรือนับขนาดของ Array เท่ากับ 1 รายการไหม
        echo json_encode(array( // หากดึงข้อมูลได้ส่งกลับไปยังแอพ status=true พร้อมกับข้อมูล user ของผู้ที่ Login
            "status"=>true,	
            "user"=>$result[0]
        ));
    } else {
    	// หากดึงไม่ได้แสดงว่า Login ไม่สำเร็จ ให้ส่งกลับ status=false พร้อมกับแจ้ง message
        echo json_encode(array(
            "status"=>false,
            "message"=>"เข้าสู่ระบบไม่สำเร็จ"
        ));
    }
