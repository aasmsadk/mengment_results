﻿
  <?php
session_start();
error_reporting(E_ALL ^ E_NOTICE);

  include_once("headermo.php");
  include_once('cnnectdb.php');
 include_once('navbar.php');
 include_once('functions.php');
login_check();
if($_SESSION['type_user']=="Admin"){

  if($_POST['submit']){
 $name=$_POST['emp_name'];
  $date_birth=$_POST['date_birth'];
    $gender1=$_POST['gender'];
   $image=$_POST['image'];
    $email=$_POST['email'];
    $id_card=$_POST['id_card'];
      
      // add image
	    	if(isset($_FILES['image']) && $_FILES['image']['name'] != ""){
			$image = $_FILES['image']['name'];
		   $directory_self = str_replace(basename($_SERVER['PHP_SELF']), '', $_SERVER['PHP_SELF']);
		   	 $uploadDirectory = $_SERVER['DOCUMENT_ROOT'] . $directory_self . " ";
		  $uploadDirectory .= $image;
		    move_uploaded_file($_FILES['image']['tmp_name'], $uploadDirectory);
	  	}


    
      
      
      $IdTyp=mysqli_query($conn,"select IdType_user from type_users where type_user='employee'");
              $idt="";
                 while ($uc=mysqli_fetch_assoc($IdTyp)){
                 $idt=$uc['IdType_user'];
                  }
 
                $sq2="INSERT INTO `mohammed`.`accuont` (`username`,`password`,`IdType_user`)
                 VALUES ('$email','$id_card','$idt')";
                 $result2= mysqli_query($conn,$sq2);
                         
        $moha=mysqli_query($conn,"SELECT `account_id` FROM `accuont` WHERE `account_id` = (SELECT MAX( `account_id` ) FROM `accuont`)");
              while ($unf=mysqli_fetch_assoc($moha)){
                $mo=$unf['account_id'];  
      
      
      
  $sq="INSERT INTO `mohammed`.`employee` (`emp_name`,`date_birth`,`gender`,`image`,`email`,`id_card`,`account_id` )
         VALUES (
          '$name',
           '$date_birth',
           '$gender1',
           '$image',
           '$email',
           '$id_card',
           '$mo'
               )";
             	$result= mysqli_query($conn,$sq);
                      
            } }

  ?>
<style>
.wizard {
    margin: 20px auto;
    background: #fff;
}
 .wizard .nav-tabs {
        position: relative;
        margin: 40px auto;
        margin-bottom: 0;
        border-bottom-color: #e0e0e0;
    }

    .wizard > div.wizard-inner {
        position: relative;
    }

.connecting-line {
    height: 2px;
    background: #e0e0e0;
    position: absolute;
    width: 80%;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 50%;
    z-index: 1;
}

.wizard .nav-tabs > li.active > a, .wizard .nav-tabs > li.active > a:hover, .wizard .nav-tabs > li.active > a:focus {
    color: #555555;
    cursor: default;
    border: 0;
    border-bottom-color: transparent;
}

span.round-tab {
    width: 70px;
    height: 70px;
    line-height: 70px;
    display: inline-block;
    border-radius: 100px;
    background: #fff;
    border: 2px solid #e0e0e0;
    z-index: 2;
    position: absolute;
    left: 0;
    text-align: center;
    font-size: 25px;
}
span.round-tab i{
    color:#555555;
}
.wizard li.active span.round-tab {
    background: #fff;
    border: 2px solid #5bc0de;

}
.wizard li.active span.round-tab i{
    color: #5bc0de;
}

span.round-tab:hover {
    color: #333;
    border: 2px solid #333;
}

.wizard .nav-tabs > li {
    width: 25%;
}

.wizard li:after {
    content: " ";
    position: absolute;
    left: 46%;
    opacity: 0;
    margin: 0 auto;
    bottom: 0px;
    border: 5px solid transparent;
    border-bottom-color: #5bc0de;
    transition: 0.1s ease-in-out;
}

.wizard li.active:after {
    content: " ";
    position: absolute;
    left: 46%;
    opacity: 1;
    margin: 0 auto;
    bottom: 0px;
    border: 10px solid transparent;
    border-bottom-color: #5bc0de;
}

.wizard .nav-tabs > li a {
    width: 70px;
    height: 70px;
    margin: 20px auto;
    border-radius: 100%;
    padding: 0;
}

    .wizard .nav-tabs > li a:hover {
        background: transparent;
    }

.wizard .tab-pane {
    position: relative;
    padding-top: 50px;
}

.wizard h3 {
    margin-top: 0;
}
.step1 .row {
    margin-bottom:10px;
}
.step_21 {
    border :1px solid #eee;
    border-radius:5px;
    padding:10px;
}
.step33 {
    border:1px solid #ccc;
    border-radius:5px;
    padding-left:10px;
    margin-bottom:10px;
}
.dropselectsec {
    width: 68%;
    padding: 6px 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    color: #333;
    margin-left: 10px;
    outline: none;
    font-weight: normal;
}
.dropselectsec1 {
    width: 74%;
    padding: 6px 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    color: #333;
    margin-left: 10px;
    outline: none;
    font-weight: normal;
}
.mar_ned {
    margin-bottom:10px;
}
.wdth {
    width:25%;
}
.birthdrop {
    padding: 6px 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    color: #333;
    margin-left: 10px;
    width: 16%;
    outline: 0;
    font-weight: normal;
}


/* according menu */
#accordion-container {
    font-size:13px
}
.accordion-header {
    font-size:13px;
	background:#ebebeb;
	margin:5px 0 0;
	padding:7px 20px;
	cursor:pointer;
	color:#fff;
	font-weight:400;
	-moz-border-radius:5px;
	-webkit-border-radius:5px;
	border-radius:5px
}
.unselect_img{
	width:18px;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
.active-header {
	-moz-border-radius:5px 5px 0 0;
	-webkit-border-radius:5px 5px 0 0;
	border-radius:5px 5px 0 0;
	background:#F53B27;
}
.active-header:after {
	content:"\f068";
	font-family:'FontAwesome';
	float:right;
	margin:5px;
	font-weight:400
}
.inactive-header {
	background:#333;
}
.inactive-header:after {
	content:"\f067";
	font-family:'FontAwesome';
	float:right;
	margin:4px 5px;
	font-weight:400
}
.glyphicon {
    position: relative;
    top: 0px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.accordion-content {
	display:none;
	padding:20px;
	background:#fff;
	border:1px solid #ccc;
	border-top:0;
	-moz-border-radius:0 0 5px 5px;
	-webkit-border-radius:0 0 5px 5px;
	border-radius:0 0 5px 5px
}
.accordion-content a{
	text-decoration:none;
	color:#333;
}
.accordion-content td{
	border-bottom:1px solid #dcdcdc;
}



@media( max-width : 585px ) {

    .wizard {
        width: 90%;
        height: auto !important;
    }

    span.round-tab {
        font-size: 16px;
        width: 50px;
        height: 50px;
        line-height: 50px;
    }

    .wizard .nav-tabs > li a {
        width: 50px;
        height: 50px;
        line-height: 50px;
    }

    .wizard li.active:after {
        content: " ";
        position: absolute;
        left: 35%;
    }
}
 
</style>
<div class="container" style="margin-top:-30px" >
    <div class="row">
           <br><br><br><br>
    	<section>
             
            <h2>شاشة ادخال بيانات الموظف</h2>
   
           
            <form  action=" " method="post">
                <div class="tab-content">
                    <div class="tab-pane active" role="tabpanel" id="step1">
 <div class="step1">
                        <br> <div class="row">
                            <div class="col-md-6">
                                <label for="addres">اسم الموظف</label>
                                <input type="text" class="form-control"  name="emp_name"   placeholder="اسم الموظف"   >
                            </div>

                        </div>
  <div class="row">
                            <div class="col-md-6">
                                <label for="addres">تاريخ الميلاد</label>
                                <input type="text" class="form-control"  name="date_birth"   placeholder="تاريخ الميلاد"   >
                            </div>

                        </div>
  <div class="row mar_ned">
                                <div class="col-md-12 col-xs-12">
                                    <p align="right"><stong>الجنس</stong></p>
                                </div>

                                <div class="col-md-8 col-xs-9">
                                    <label class="radio-inline">
                                      <input type="radio" name="gender" id="mal" value="Male"> ذكر
                                    </label>
                                    <label class="radio-inline">
                                      <input type="radio" name="gender" id="fmal" value="Female"> انثى
                                    </label>
                                </div>
                            </div>
                                  
                         
                         
                    <label for="addres" >صورة الموظف
                   <img class="img-circle"  src="./bootstrap/img/<?php //echo $unf['image']; ?>">
				     <input type="file" name="image" placeholder="ادخل صورة" >
                     </label> 
     
                       <div class="row">
                            <div class="col-md-6">
                                <label for="addres">الايميل</label>
                                <input type="text" class="form-control"  name="email"   placeholder=" الايميل"   >
                            </div>

                        </div>
                            <div class="row">
                            <div class="col-md-6">
                                <label for="addres">رقم البطاقة</label>
                                <input type="text" class="form-control"  name="id_card"   placeholder="رقم البطاقة"   >
                            </div>

                        </div>


 
                         
                              <input type="submit" name="submit" class="btn btn-primary btn-info-full " value="حفظ البيانات"/> 
                          
                        
                        
                        
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </form>
        
    </section>
   </div>
</div>
  
 









  <?php
include("footermo.php");
}else {
    redirect("index.php");
}
?>
 