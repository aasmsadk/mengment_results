<?php session_start(); ?>
  <?php 
   error_reporting(E_ALL ^ E_NOTICE);

  include_once("headermo.php");
  include_once('cnnectdb.php');
 include_once('functions.php');
   include_once('session.php');
 include_once('navbar.php'); 

login_check();
 if($_SESSION['type_user']=="Admin" || $_SESSION['type_user']=="employee" ){


    ?>
 
    <script src="jquery.main.js" type="text/javascript"></script>
   
<?php
  $errormsg= '';
  if(isset ($_POST['submit1'])){
 

 $name=$_POST['stud_name'];
  $title1=$_POST['title'];
    $gender1=$_POST['gender'];
   $loc_brith1=$_POST['loc_brith'];
    $date_brith1=$_POST['date_brith'];


 // add image
	    	if(isset($_FILES['image']) && $_FILES['image']['name'] != ""){
			$image = $_FILES['image']['name'];
		   $directory_self = str_replace(basename($_SERVER['PHP_SELF']), '', $_SERVER['PHP_SELF']);
		   	 $uploadDirectory = $_SERVER['DOCUMENT_ROOT'] . $directory_self . " ";
		  $uploadDirectory .= $image;
		    move_uploaded_file($_FILES['image']['tmp_name'], $uploadDirectory);
	  	}


    // $sudent_image1=$_POST['sudent_image'];
 
      $phone1=$_POST['phone'];
        $Email1=$_POST['Email'];
        $id_nationality1=$_POST['id_nationality'];

  $city=$_POST['city'];
    $pass=$_POST['password1'];
      // $conf=$_POST['conf_pass'];
       $certif_prev1=$_POST['certif_prev'];
    $document=$_POST['id_document'];

    $average=$_POST['average'];
   $sta_st_id1=$_POST['sta_st_id'];
       $date_register=$_POST['date_register'];
        $date_certificate=$_POST['date_get_certificate'];
        $loc_certificate=$_POST['loc_get_certificate'];
      
      
         $IdTyp=mysqli_query($conn,"select IdType_user from type_users where type_user='student'");
              $idt="";
                 while ($uc=mysqli_fetch_assoc($IdTyp)){
                 $idt=$uc['IdType_user'];
                  }
    
                 $sq2="INSERT INTO `mohammed`.`accuont` (`password`,`IdType_user`)
                 VALUES ('$Email1','$idt')";
                 $result2= mysqli_query($conn,$sq2);
                  
                         
        $moha=mysqli_query($conn,"SELECT `account_id` FROM `accuont` WHERE `account_id` = (SELECT MAX( `account_id` ) FROM  `accuont`)");
      $mo=0;
              while ($unf=mysqli_fetch_assoc($moha)){
                $mo=$unf['account_id'];
   $sq="INSERT INTO `mohammed`.`student` (`stud_name`,`title` ,`gender` ,`loc_brith` ,`date_brith` ,`sudent_image` ,`phone` ,`Email`,`id_nationality` , `city` ,
 `id_document`,`certif_prev` , `average` , `sta_st_id`,`date_get_certificate`,`loc_get_certificate`,`account_id`)
         VALUES (
         '$name',
          '$title1',
           '$gender1',
           '$loc_brith1',
            '$date_brith1',
             '$image',
              '$phone1',
               '$Email1',
          '$id_nationality1',
                '$city',
          '$document',
               '$certif_prev1',
               '$average',
               '$sta_st_id1',
                '$date_certificate',
                 '$loc_certificate',
              '$mo' 
               )";
             	$result= mysqli_query($conn,$sq);
                //  $in_check = mysqli_num_rows($result);
                 if($result>0) { $errormsg = "  
              <div class='alert alert-success alert-autocloseable-success'>
        			تم تسجيل الطالب بنجاح 
				</div>
                 ";}else{
                      $errormsg = "  
              <div class='alert alert-danger alert-autocloseable-danger'>
        			لم يتم تسجيل الطالب  
				</div>
                 ";
                 }     

  
              }
   /* if($_POST['submit1']){ */
 $col_id=$_POST['col_id'];
 $dept_stu=$_POST['dept_id'];
 $spec_stu=$_POST['stu_id'];
        $ma=mysqli_query($conn,"SELECT `stu_id` FROM `student`WHERE `stu_id` = (SELECT MAX( `stu_id` ) FROM `student`)");
        $m=0;
              while ($unf=mysqli_fetch_assoc($ma)){
                $m=$unf['stu_id'];

  //$join_stu=$_POST['join_date'];
  $sql2="INSERT INTO `mohammed`.`stu_spec` (`col_id`,`dept_id`,`stu_id`)
   VALUES (

    '$col_id',
          '$dept_stu',
              '$m'
                      )";

                  	$result= mysqli_query($conn,$sql2); }
      
     //--------------------------------------------academic_number-------------------------------------------------------------
   $acq=mysqli_query($conn,"SELECT stu_id, CONCAT( SUBSTR( `date_register` , 1, 4 ) , stu_id ) AS 'a' FROM `student` WHERE `stu_id` ='$m'"  ); 
        $ac=0;
       while ($uc=mysqli_fetch_assoc($acq)){
                 $ac=$uc['a'];
                  }
    $acq1=mysqli_query($conn,"UPDATE `student` SET  `academic_number`= '$ac' WHERE `stu_id`='$m' " ); 

                 
    
           $acq2=mysqli_query($conn,"UPDATE `accuont` SET  `username`='$ac' WHERE `account_id`='$mo' " ); 
                   
                  
     
      //-----------------------------------------------------------------------------------------------------------------------
      
      
      
      //----------------------------------- insert reg_yearstudy------------------------------------------------------------------ 
      
      
      
       $year=mysqli_query($conn,"SELECT `year_id` FROM `year_study` WHERE `year_id` = (SELECT MAX( `year_id` ) FROM 
       `year_study`)");
              while ($unf=mysqli_fetch_assoc($year)){
                $ye=$unf['year_id'];
                  
                  
                $stu=mysqli_query($conn,"SELECT `stu_id` FROM `student`WHERE `stu_id` = (SELECT MAX( `stu_id` ) FROM `student`)");
              while ($unf=mysqli_fetch_assoc($stu)){
                $st=$unf['stu_id'];
   
      
                  
                 $class=mysqli_query($conn,"SELECT `classid` FROM `class`WHERE `classid` = (SELECT MIN( `classid` ) FROM `class`)");
              while ($unf=mysqli_fetch_assoc($class)){
                $cl=$unf['classid'];

                  
                    
                 $term=mysqli_query($conn,"SELECT `TermS_id` FROM `term_study`  WHERE `TermS_id` = (SELECT MIN( `TermS_id` ) FROM `term_study`)");
              while ($unf=mysqli_fetch_assoc($term)){
                $tr=$unf['TermS_id'];

                  
              $altaieb=mysqli_query($conn,"SELECT `freedept_id` FROM `free_dept` f, `dept` d WHERE f.`dept_id` = d.`dept_id` AND d.`dept_id` ='$dept_stu'" );   
                while ($unf=mysqli_fetch_assoc($altaieb)){
                $amount=$unf['freedept_id'];   
      
      
       $sql4="INSERT INTO `mohammed`.`reg_yearstudy` (`year_id`,`stu_id`,`classid`,`TermS_id`,`freedept_id`,`dept_id`) 
   VALUES (

    '$ye',
          '$st',
              '$cl',
                '$tr',
                '$amount',
                '$dept_stu'
                      )";
                    $result= mysqli_query($conn,$sql4); 

 //--------------------- insert fee-----------------------------------------------------------------------------
     $freedept_id_temp=0;
    $rf= mysqli_query($conn,"SELECT * FROM `free_dept` WHERE `freedept_id`= '".$amount."'  ");
                                           while ($resf= mysqli_fetch_array($rf)) {
                                               $freedept_id_temp=$resf['amount'];
                                           }
      
       $fee="INSERT INTO `mohammed`.`paid_fee` (`stu_id`,`classid`,`year_id`,`balance`,`freedept_id`) 
   VALUES (
          '$st',
              '$cl',
              '$ye',
              '$freedept_id_temp',
                '$amount'
                  )";
      
      

      	$result1= mysqli_query($conn,$fee);  }}}}}
  
  
 } 
   /*$errormsg =  
              "<div class='alert alert-danger alert-autocloseable-danger'>
        			عذرا لم يتم تسجيل الطالب     
				</div>
                 "; */
    
?>       

<script src="js/jquery-3.2.1.js"></script>
<script>

$(document).ready(function () {
			$('.alert-autocloseable-success').delay(2000).fadeOut( "slow", function() {
				// Animation complete.
				$('#autoclosable-btn-success').prop("disabled", false);
			});
     $('.alert-autocloseable-danger').delay(2000).fadeOut( "slow", function() {
				// Animation complete.
				$('#alert-autocloseable-danger').prop("disabled", false);
			});

  		
});


</script>



<style>
.wizard {
    
    
   
    background: #fff;
    padding :20px;
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
   /* width: 80%;*/
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
  <div class="content ">
 <br> 
<div class="container"  style="margin-top: -30px " >
 
    <div class="row">
       
    	<section>
           
        <div class="wizard">
 <?php echo $errormsg; ?>
            
            <div class="wizard-inner">
                
                <div class="connecting-line"> 
                    
                    </div>
 
                <ul class="nav nav-tabs" role="tablist" style="wh">

                    <li role="presentation" class="active">
                        <a href="#step1" data-toggle="tab" aria-controls="step1" role="tab" title="البيانات الشخصية">
                            <span class="round-tab">
                                <i class="glyphicon glyphicon-folder-open"></i>
                            </span>
                        </a>
                    </li>

                    <li role="presentation" class="disabled">
                        <a href="#step2" data-toggle="tab" aria-controls="step2" role="tab" title="بيانات الاكاديمية">
                            <span class="round-tab">
                                <i class="glyphicon glyphicon-pencil"></i>
                            </span>
                        </a>
                    </li>
                   <!-- <li role="presentation" class="disabled">
                        <a href="#step3" data-toggle="tab" aria-controls="step3" role="tab" title="بيانات تسجيل الدخول">
                            <span class="round-tab">
                                <i class="glyphicon glyphicon-picture"></i>
                            </span>
                        </a>
                    </li>

                    <li role="presentation" class="disabled">
                        <a href="#complete" data-toggle="tab" aria-controls="complete" role="tab" title="الانتهاء">
                            <span class="round-tab">
                                <i class="glyphicon glyphicon-ok"></i>
                            </span>
                        </a>
                    </li>-->
                </ul>
            </div>


            <form  action="" method="post"enctype="multipart/form-data">
                <div class="tab-content">
                    <div class="tab-pane active" role="tabpanel" id="step1">

                    <div class="step1">
                        <br>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="addres">اسم الطالب</label>
                                <input type="text" class="form-control"  name="stud_name"   placeholder="اسم الطالب" required  >
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
                                  <div class="row">
                            <div class="col-md-6">
                                <label for="addres">مكان الميلاد</label>
                                <input type="text" class="form-control"  name="loc_brith" placeholder="مكان الميلاد">
                            </div>

                        </div>

                              <div class="row">
                            <div class="col-md-6">
                                <label for="date_brith">تاريخ الميلاد</label>
                                <input type="text" class="form-control"  name="date_brith" placeholder="تاريخ الميلاد">
                            </div>

                        </div>

                       
              <label for="addres" >صورة الطالب
                 <img class="img-circle"  src="./bootstrap/img/<?php echo $unf['sudent_image']; ?>">
				 <input type="file" name="image" placeholder="صورة الطالب" >
              </label> 
                        
                       <div class="row">
       
                            <div class="col-md-6">
                                <label for="phon">رقم الهاتف</label>
                                <input type="text" class="form-control"  name="phone" placeholder="رقم الهاتف">
                            </div>

                        </div>
                         <div class="row">
                            <div class="col-md-6">
                            <label for="Email">البريد الالكتروني</label>
                                <div class="row">
                                    <div class="col-md-12 col-xs-12">
                                        <input type="text" class="form-control"  name="Email" placeholder="Email"  >
                                    </div>
                                </div>

                                      </div>
                        </div>

                         <div class="row mar_ned">
                                <div class="col-md-12 col-xs-12">
                                   <!-- <p align="right"><stong>الجنسية</stong></p>-->
                                        <label for="city">الجنسية</label>
                                </div>
                                <div class="col-md-9 col-xs-9">
                                    <select name="id_nationality"  class="dropselectsec" required >
                                    <option value="">Choose...</option>
                                           <?php  error_reporting(E_ALL ^ E_NOTICE);
              $uf=mysqli_query($conn,"SELECT * FROM `nationality` ");
              while ($unf=mysqli_fetch_assoc($uf)){
                echo('<option value="'.$unf['id_nationality'].'">'.$unf['nationName'].'</option> ');
                }
              ?>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                            <div class="col-md-6">
                                <label for="city">المحافظة</label>
                                <input type="text" class="form-control" name="city" placeholder="المحافظة">
                            </div>

                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <label for="id_document">رقم الهويه</label>
                                <input type="number" class="form-control"  name="id_document" placeholder="رقم الهوية">
                            </div>

                        </div> 
                            


                             

                              <div class="row">
                            <div class="col-md-6">
                                <label for="average">المؤهل السابق</label>
                                <input type="text" class="form-control"  name="certif_prev" placeholder="المؤهل السابق">
                             </div>
                                </div>
                        
                          <div class="row">
                            <div class="col-md-6">
                                <label for="average">مكان الحصول على المؤهل</label>
                                <input type="text" class="form-control"  name="loc_get_certificate" placeholder="مكان الحصول على المؤهل">
                             </div>
                                </div>
                        
                        <div class="row">
                            <div class="col-md-6">
                                <label for="average">تاريخ الحصول على المؤهل</label>
                                <input type="text" class="form-control"  name="date_get_certificate" placeholder="تاريخ الحصول على المؤهل">
                             </div>
                                </div>

                            <div class="row">
                            <div class="col-md-6">
                                <label for="average">المعدل</label>
                                <input type="text" class="form-control"  name="average" placeholder="المعدل">
                             </div>
                               </div>

                                       

                                 <div class="row mar_ned">
                                <div class="col-md-12 col-xs-12">
                                    <label for="city">حـالة الطالـب</label>
                                </div>
                                <div class="col-md-9 col-xs-9">
                                    <select name="sta_st_id"  class="dropselectsec" required>
                                    <option value="">Choose...</option>
                                           <?php  error_reporting(E_ALL ^ E_NOTICE);
              $uf=mysqli_query($conn,"SELECT * FROM `statuse_std` ");
              while ($unf=mysqli_fetch_assoc($uf)){
                echo('<option value="'.$unf['sta_st_id'].'">'.$unf['sta_name'].'</option> ');
                }
              ?>
                                    </select>
                                </div>
                            </div>



                        <ul class="list-inline pull-right">

                       <li> <button type="button" class="btn btn-primary next-step">متابعة</button></li >
                        </ul>


                              </div>
                    </div>
                    <div class="tab-pane" role="tabpanel" id="step2">
                        <div class="step2">
                        <h3><strong>بيانات التعليم</strong></h3>
                        <hr>
                            <div class="step_21">

                                <div class="row"style="margin-right: 30px">



                               <!-- <div class="row mar_ned">
                                <div class="col-md-12 col-xs-12">
                                    <p align="right"><stong>اسم الطالب</stong></p>
                                </div>
                                <div class="col-md-12 col-xs-12">
                                    <select name="stu_id"  class="dropselectsec">

                                           
                                    </select>
                                </div>
                            </div>-->


                            <div class="row mar_ned">
                                <div class="col-md-12 col-xs-12">
                                    <p align="right"><stong>الكلية</stong></p>
                                </div>
                                <div class="col-md-12 col-xs-12">
                                    <select name="col_id" id="col_id" class="dropselectsec" required   >
                                    <option value="">Choose...</option>
                                           <?php  error_reporting(E_ALL ^ E_NOTICE);


              $uf=mysqli_query($conn,"SELECT * FROM `colia` order by col_name ASC");
              while ($unf=mysqli_fetch_assoc($uf)){
                ?>
                <option value="<?PHP echo $unf["col_id"]; ?>"> <?PHP echo $unf["col_name"] ;} ?> </option>
             

                                    </select>
                                </div>
                            </div>

                              <div class="row mar_ned">
                                <div class="col-md-12 col-xs-12">
                                    <p align="right"><stong>القسم--التخصص</stong></p>
                                </div>
                                <div class="col-md-12 col-xs-12">
                              <select name="dept_id"  id="dept_id" class="dropselectsec" >
                                  <option value=""> Choose dept..</option>
                             
               </select>
                   </div>
                            </div>
                      </div>
                    <div class="tab-pane" role="tabpanel" id="complete">
                        <div class="step44">

                             <ul class="list-inline pull-right">
                            <li><h1> </h1></li>
                            <li><button type="button" class="btn btn-default prev-step">السابق</button></li>
               <!--             <li><input type="submit" name="submit" class="btn btn-primary btn-info-full " value="حفظ البيانات"/></li>   -->
                             <li><input type="submit" name="submit1" class="btn btn-primary btn-info-full " value=" حفظ البيانات"/></li>
                        </ul>


                        </div>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </form>
        </div>
    </section>
   </div>
</div>
 
    </div>
                    </div>
      </div>
</div>

</div> 


 <script>
   $(document).ready(function(){

    $("#col_id").change(function(){
      var col_id = this.value;
      $.ajax({
      url: "registermo2.php",
      type: "POST",
      data: {
      col_id: col_id
      },
      cache: false,
      success: function(data){
        $("#dept_id").html(data);

      }
      });
    });
     });
</script>
<?php
  if(!$_POST['submit1']){?>

<?php   error_reporting(E_ALL ^ E_NOTICE);
              
                   $col_id=$_POST['col_id'];
                         
                         echo $col_id;
                  
                   $result= mysqli_query($conn,"select * from dept where col_id='".$col_id."'  ");
                   while ($row= mysqli_fetch_array($result)) {
                   ?>
                 <option value="<?php echo $row["dept_id"] ?>"><?php echo $row["dept_name"] ;}?></option>
<?php }?>
                 
 
  <?php
 include("footermo.php");
}else {
    redirect("index.php");
}
?>


