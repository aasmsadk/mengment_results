 <?php
session_start();
 include_once('cnnectdb.php');
 include_once('functions.php');
login_check();
if($_SESSION['type_user']=="student"){
?>
<html>
    <head>
          <meta charset="utf-8">
       
   <link href="static/css/bootstrap.min.css" rel="stylesheet" >
         <link href="static/css/bootstrap-rtl.min.css" rel="stylesheet"id="bootstrap-css">
         <script src="js/jquery-3.2.1.js"></script>
         <script src="js/bootstrap.min.js"></script>
    

<!------ Include the above in your HEAD tag ---------->
   <script src="js/jquery-3.2.1.js"></script>
<script>

$(document).ready(function () {
			$('.alert-autocloseable-success').delay(1500).fadeOut( "slow", function() {
				// Animation complete.
				$('#autoclosable-btn-success').prop("disabled", false);
			});
    
    $('.alert-autocloseable-danger').delay(2000).fadeOut( "slow", function() {
				// Animation complete.
				$('#alert-autocloseable-danger').prop("disabled", false);
			});
		
});


</script>
</head>   
    
    
<body >
<style>

    /***
User Profile Sidebar by @keenthemes
A component of Metronic Theme - #1 Selling Bootstrap 3 Admin Theme in Themeforest: http://j.mp/metronictheme
Licensed under MIT
***/

body {
  background: #F1F3FA;
}


    
/* Profile container */
.profile {
  margin: 20px 0;
}

/* Profile sidebar */
.profile-sidebar {
  padding: 20px 0 10px 0;
  background: #fff;
}


.profile-userpic img {
  float: none;
  margin: 0 auto;
 
  -webkit-border-radius: 50% !important;
  -moz-border-radius: 50% !important;
  border-radius: 50% !important;
}

.profile-usertitle {
  text-align: center;
  margin-top: 20px;
}

.profile-usertitle-name {
  color: #5a7391;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 7px;
}

.profile-usertitle-job {
  text-transform: uppercase;
  color: #5b9bd1;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 15px;
}

.profile-userbuttons {
  text-align: center;
  margin-top: 10px;
}

.profile-userbuttons .btn {
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
  padding: 6px 15px;
  margin-right: 5px;
}

.profile-userbuttons .btn:last-child {
  margin-right: 0px;
}
    
.profile-usermenu {
  margin-top: 30px;
}

.profile-usermenu ul li {
  border-bottom: 1px solid #f0f4f7;
}

.profile-usermenu ul li:last-child {
  border-bottom: none;
}

.profile-usermenu ul li a {
  color: #93a3b5;
  font-size: 14px;
  font-weight: 400;
}

.profile-usermenu ul li a i {
  margin-right: 8px;
  font-size: 14px;
}

.profile-usermenu ul li a:hover {
  background-color: #fafcfd;
  color: #5b9bd1;
}

.profile-usermenu ul li.active {
  border-bottom: none;
}

.profile-usermenu ul li.active a {
  color: #5b9bd1;
  background-color: #f6f9fb;
  border-left: 2px solid #5b9bd1;
  margin-left: -2px;
}

/* Profile Content */
.profile-content {
  padding: 20px;
  background: #fff;
  min-height: 460px;
}

</style>
     <style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
             display: none;
        }
      }
         
         
        


.sidebar-nav .dropdown-menu {
    position: relative;
    width: 100%;
    padding: 0;
    margin: 0;
    border-radius: 0;
    border: none;
    background-color: #2222220a;
    box-shadow: none;
    margin-bottom: 10px;
}


    </style>
    
<?php $ID=$_SESSION['admin_id'];
                    
                      $result=mysqli_query($conn,"SELECT * FROM   student   where  account_id='$ID' ");
                     
              while ($S=mysqli_fetch_array($result)){
    
                  
    ?>
    <?php 
                                     error_reporting(E_ALL ^ E_NOTICE);
 
   $password1=$_POST['password']; 
   

  if($_POST['submit']){
      
    if($_POST['password']==$_POST['repassword']){
    
   $up="UPDATE `mohammed`.`accuont` SET
    `password` = '".$password1."' WHERE `accuont`.`account_id`='".$S['account_id']."' ";
       mysqli_query($conn,$up); 
        $errormsg = "  
              <div class='alert alert-success alert-autocloseable-success'>
        			تم تعديل كلمة السر 
				</div>
                 ";
        
    }else{ 
          
           $errormsg = "  
              <div class='alert alert-danger alert-autocloseable-danger'>
        			كلمة السر غير متوافقتين 
				</div>
                 "; 
  
           
     } 
  
  }
?>
    <?php echo $errormsg;  ?>
        <div class="container">
    <div class="row profile">
		<div class="col-md-3">
			<div class="profile-sidebar">
				<!-- SIDEBAR USERPIC -->
				<div class="profile-userpic">
              
					<?php echo '<img  class="img-responsive" style="width:150px; height:150px"   alt="" src="imag/'.$S['sudent_image'].'">' ;?>  
				</div>
				<!-- END SIDEBAR USERPIC -->
				<!-- SIDEBAR USER TITLE -->
				<div class="profile-usertitle">
					<div class="profile-usertitle-name">
						 اسم الطالب:<?php    echo $S['stud_name']; ?>
					</div>
					<div class="profile-usertitle-job">
						الرقم الاكاديمي: <?php   echo $S['academic_number']; ?>      
					</div>
				</div>
				<!-- END SIDEBAR USER TITLE -->
				<!-- SIDEBAR BUTTONS -->
				<div class="profile-userbuttons">
                    <a href="logout.php" ><button type="button" class="btn btn-success btn-sm">خروج </button> </a>
                    <a href="hom-student.php?content=passo" >	<button type="button" class="btn btn-danger btn-sm">تغير كلمة المرور</button></a>
				</div>
				<!-- END SIDEBAR BUTTONS -->
				<!-- SIDEBAR MENU -->
               
                     <div class=" navbar-expand-lg  " style="" role="navigation">
    
    <a class="btn btn-navbar navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="glyphicon glyphicon-home "></span>
        
        
    </a>
    
        </div>
                

				<div class="profile-usermenu collapse navbar-collapse " id="navbarCollapse">
					<ul class="nav sidebar-nav">
						<li class="">
							<a href="hom-student.php?content=home">
							<i class="glyphicon glyphicon-home"></i>
							الرئيسية </a>
						</li>
                            <li class="dropdown">
                     <a href="#" class="dropdown-toggle" data-toggle="dropdown">بيانات الدرجات <span class="caret"></span></a>
                     <ul class="dropdown-menu" role="menu" >
                      
                         <li  ><a href="hom-student.php?content=degre">نتائج الاعمال الفصلية</a></li>
                         <li><a href="hom-student.php?content=degre-end">النتائج النهائية</a></li>
                         
                    </ul>
                </li>
                                   <li class="dropdown">
                     <a href="#" class="dropdown-toggle" data-toggle="dropdown">بيانات الرسوم <span class="caret"></span></a>
                     <ul class="dropdown-menu" role="menu" >
                      
                         <li  ><a href="hom-student.php?content=fee">الرسوم السنوية</a></li>
                         <li><a href="hom-student.php?content=feetotal">الرسوم الاجمالية</a></li>
                        <li><a href="print_res.php?r=2&st=<?php echo $S['stu_id'];?>">تقريرالرسوم </a></li>
                    </ul>
                </li>
                        
						<li>
							<a href="#">
							<i class="glyphicon glyphicon-flag"></i>
							من نحن </a>
						</li>
                       </ul>
				
                        
                </div>
                
				<!-- END MENU -->
          
			
            </div>
            <hr>
		</div>
        
        
		<div class="col-md-9">
            <div class="profile-content">

      <?php 
                
             
      if(isset($_GET['content']) && $_GET['content']=="home" ||$_GET['content']=="" )  {
          ?>
      <div class="active">
  <h2>البيانات الشخصية </h2>
        <table  class="table table-bordered table-hover table-striped" >
            <tbody>
                <tr>
                    <th>الرقم الأكاديمي
                    </th>
                    <td><?php echo $S['academic_number'] ?>
                    </td>
                </tr>
                <tr><th>إسم الطالب</th>
                    <td><?php echo $S['stud_name'] ?></td>
                </tr>
                
                <tr>
                    <th>تاريخ التسجيل</th>
                    <td> <?php echo $S['date_register'] ?></td>
                </tr>
                <tr>
                    <th>الجنس</th>
                    <td><?php echo $S['gender'] ?></td>
                </tr>
                
                <tr><th>جوال 1</th>
                    <td><?php echo $S['phone'] ?></td>
                </tr>
                <tr><th>بريد الكتروني</th>
                <td><?php echo $S['Email'] ?>
                </td>
                </tr>
                <tr>
                <th>رقم الهوية</th>
                <td><?php echo $S['id_document'] ?></td>
                </tr>
                <tr>
                    <th>المؤهل السابق</th>
                <td><?php echo $S['certif_prev'] ?></td>
                </tr>
                <tr>
                <th>المعدل</th>
                <td><?php echo $S['average'] ?></td>
                </tr>
                <tr><th>مكان الحصول عليه</th>
                    <td><?php echo $S['loc_get_certificate'] ?></td>
                </tr>
                <tr>
                    <th>تاريخ الحصول عليه</th>
                <td><?php echo $S['date_get_certificate'] ?></td>
                </tr></tbody>
        </table>
         
      </div>
          
      <?php }elseif(isset($_GET['content']) && $_GET['content']=="degre"){
          $f=0;
           $f="SELECT  max(f.freedept_id),f.amount FROM free_dept f, reg_yearstudy r where  f.freedept_id=r.freedept_id and r.`stu_id`='".$S['stu_id']."'  ";
    
               $ff= mysqli_query($conn,$f);
              while ($fr= mysqli_fetch_array($ff)) {
                  $f=$fr['amount'];
              }
    
          ?>  
                 <h2>نتيجة الاعمال الفصلية</h2>
                 <div class="container-fluid mypad">
   <div class="masthead">
 <div>
   <ul class="nav nav-tabs" role="tablist">   
       <?php
         
            
     $result12= mysqli_query($conn,"SELECT * FROM  reg_yearstudy r , student s where r.`stu_id`=s.`stu_id` and s.stu_id='".$S['stu_id']."' ");
                   while ($row1= mysqli_fetch_array($result12)) {  
    ?>
    <li role="presentation" class="<?php if($row1['TermS_id']==1){?> active <?php }?>"><a href="#term1<?php echo $row1['TermS_id']; ?>" aria-controls="term<?php echo $row1['TermS_id'];?>,<?php echo $row1['dept_id']; ?>" role="tab" data-toggle="tab"> ترم :<?php echo $row1['TermS_id']; ?></a></li>
     <?php } ?>
  </ul>
  <!-- Tab panes -->
      
  <div class="tab-content">
   <?php
     $result11= mysqli_query($conn,"SELECT * FROM  reg_yearstudy r , student s where r.`stu_id`=s.`stu_id` and s.stu_id='".$S['stu_id']."' ");
                   while ($row1= mysqli_fetch_array($result11)) { 
                       
    ?>
    <div role="tabpanel" class="tab-pane <?php if($row1['TermS_id']==1){?> active <?php }?>" id="term1<?php echo $row1['TermS_id']; ?>">
     <?php error_reporting(E_ALL ^ E_NOTICE);
                                          $su1=mysqli_query($conn,"SELECT `classid` FROM `term_study` WHERE `TermS_id`='".$row1['TermS_id']."' ");
     while ($p_check1= mysqli_fetch_array($su1)){
                        $su=mysqli_query($conn,"SELECT MIN(balance) as balanc,MAX(`paid_id`) as paid_id,stu_id,classid FROM `paid_fee` WHERE `stu_id`='".$S['stu_id']."' and classid='".$p_check1['classid']."'  ");
     while ($p_check= mysqli_fetch_array($su)) {
         $fsa=$f/2;
         
                  if($p_check['balanc']==0 ){
  
                       
     ?>
            <table class="table table-bordered table-hover table-striped ">
                                    <thead>
                                        <tr><th> رقم</th>
                                            <th>المقرر </th>
                                            <th> درجة الحضور</th>
                                            <th> درجة المشاركة</th>
                                            <th>درجة الاختبار النصفي</th>
                                            <th>درجة العملي</th>
                                            <th>درجة الاختبار النهائي</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                          <?php
                      
                                            $i=1;
                                        $result= mysqli_query($conn,"SELECT * FROM `study_plan` st,`subject`su where st.`subject_id`=su.`subject_id` and  st.`TermS_id`='".$row1['TermS_id']."' and st.dept_id='".$row1['dept_id']."' ");
                                           while ($row= mysqli_fetch_array($result)) {  
                                                ?>
                                         <tr>
                                             <td><?php echo $i++; ?></td>
                                             <td><?php echo $row['SubjectName']; ?></td>
                                               <?php
                                        $result1= mysqli_query($conn,"SELECT * FROM `degry` WHERE `TermS_id`='".$row1['TermS_id']."' and `subject_id`='".$row['subject_id']."' and `stu_id`='".$S['stu_id']."'");
                                           while ($row2= mysqli_fetch_array($result1)) {  
                                                ?> 
                                               <td><?php echo $row2['deg_perseverance']; ?></td>
                                             <td><?php echo $row2['deg_nashat']; ?></td>
                                             <td><?php echo $row2['deg_half']; ?></td>
                                             <td><?php echo $row2['deg_duties']; ?></td>
                                             <td><?php echo $row2['deg_final']; ?></td>
                                       
                                             <?php } ?>
                                            
                                        </tr>
                                         
                                        <?php } ?>
                                                
                                     </tbody>
          </table>
 



      <?php }elseif($p_check['balanc']<=$fsa and $row1['TermS_id']%2!=0){?>
        <table class="table table-bordered table-hover table-striped ">
                                    <thead>
                                        <tr><th> رقم</th>
                                            <th>المقرر </th>
                                            <th> درجة الحضور</th>
                                            <th> درجة المشاركة</th>
                                            <th>درجة الاختبار النصفي</th>
                                            <th>درجة العملي</th>
                                            <th>درجة الاختبار النهائي</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                          <?php
                      
                                            $i=1;
                                        $result= mysqli_query($conn,"SELECT * FROM `study_plan` st,`subject`su where st.`subject_id`=su.`subject_id` and  st.`TermS_id`='".$row1['TermS_id']."' and st.dept_id='".$row1['dept_id']."' ");
                                           while ($row= mysqli_fetch_array($result)) {  
                                                ?>
                                         <tr>
                                             <td><?php echo $i++; ?></td>
                                             <td><?php echo $row['SubjectName']; ?></td>
                                               <?php
                                        $result1= mysqli_query($conn,"SELECT * FROM `degry` WHERE `TermS_id`='".$row1['TermS_id']."' and `subject_id`='".$row['subject_id']."' and `stu_id`='".$S['stu_id']."'");
                                           while ($row2= mysqli_fetch_array($result1)) {  
                                                ?> 
                                               <td><?php echo $row2['deg_perseverance']; ?></td>
                                             <td><?php echo $row2['deg_nashat']; ?></td>
                                             <td><?php echo $row2['deg_half']; ?></td>
                                             <td><?php echo $row2['deg_duties']; ?></td>
                                             <td><?php echo $row2['deg_final']; ?></td>
                                       
                                             <?php } ?>
                                            
                                        </tr>
                                         
                                        <?php } ?>
                                                
                                     </tbody>
          </table>
 
        <?php }else{
                    echo "<div class='alert alert-danger'><a href='#' class='close' data-dismiss='alert' aria-label='close'></a> <h3>يرجى مراجعة الحسابات</h3>  </div>";

                }
         
     }}
                
        ?>
      </div>
       <?php } ?>


  </div>
     
</div>

      </div>
      </div>
                
         <?php }elseif(isset($_GET['content']) && $_GET['content']=="degre-end")
      {
          
          $f=0;
           $f="SELECT  max(f.freedept_id),f.amount FROM free_dept f, reg_yearstudy r where  f.freedept_id=r.freedept_id and r.`stu_id`='".$S['stu_id']."'  ";
    
               $ff= mysqli_query($conn,$f);
              while ($fr= mysqli_fetch_array($ff)) {
                  $f=$fr['amount'];
              }
          ?>  
                 <h2>نتيجة الفصل النهائية</h2>
                 <div class="container-fluid mypad">
   <div class="masthead">
 <div>
   <ul class="nav nav-tabs" role="tablist">   
       <?php
                  
     $result12= mysqli_query($conn,"SELECT * FROM  reg_yearstudy r , student s where r.`stu_id`=s.`stu_id` and s.stu_id='".$S['stu_id']."' ");
                   while ($row1= mysqli_fetch_array($result12)) {  
    ?>
    <li role="presentation" class="<?php if($row1['TermS_id']==1){?> active <?php }?>"><a href="#term<?php echo $row1['TermS_id']; ?>" aria-controls="term<?php echo $row1['TermS_id']; ?>,<?php echo $row1['dept_id']; ?>" role="tab" data-toggle="tab"> ترم :<?php echo $row1['TermS_id']; ?></a></li>
     <?php } ?>
  </ul>
  <!-- Tab panes -->
      
  <div class="tab-content">
   <?php  
          
          
          $sum_degre=0;
          $conter=0;
          $m=0;
     $result11= mysqli_query($conn,"SELECT * FROM  reg_yearstudy r , student s where r.`stu_id`=s.`stu_id` and s.stu_id='".$S['stu_id']."' ");
                   while ($row1= mysqli_fetch_array($result11)) {  
    ?>
    <div role="tabpanel" class="tab-pane <?php if($row1['TermS_id']==1){?> active <?php }?>" id="term<?php echo $row1['TermS_id']; ?>">
     <?php error_reporting(E_ALL ^ E_NOTICE);
                        $su1=mysqli_query($conn,"SELECT `classid` FROM `term_study` WHERE `TermS_id`='".$row1['TermS_id']."' ");
     while ($p_check1= mysqli_fetch_array($su1)){
                        $su=mysqli_query($conn,"SELECT MIN(balance) as balanc,MAX(`paid_id`) as paid_id,stu_id,classid FROM `paid_fee` WHERE `stu_id`='".$S['stu_id']."' and classid='".$p_check1['classid']."'  ");
     while ($p_check= mysqli_fetch_array($su)) {
         $fsa=$f/2;
         
                  if($p_check['balanc']==0){
  
     ?>
            <table class="table table-bordered table-hover table-striped ">
                                    <thead>
                                        <tr>
                                            <th> رقم</th>
                                            <th>المقرر </th>
                                         
                                            <th>المجموع</th>
                                            <th> التقدير</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                          <?php
                      
                                          $i=1;
                                        $result= mysqli_query($conn,"SELECT * FROM `study_plan` st,`subject`su where st.`subject_id`=su.`subject_id` and  st.`TermS_id`='".$row1['TermS_id']."' and st.dept_id='".$row1['dept_id']."' ");
                                           while ($row= mysqli_fetch_array($result)) {  
                                                ?>
                                        
                                         <tr> 
                                             <td><?php echo $i++; ?></td>
                                             <td><?php echo $row['SubjectName']; ?></td>
                                               <?php
                                        $result1= mysqli_query($conn,"SELECT * FROM `degry` WHERE `TermS_id`='".$row1['TermS_id']."' and `subject_id`='".$row['subject_id']."' and `stu_id`='".$S['stu_id']."'");
                                           while ($row2= mysqli_fetch_array($result1)) {  
                                                ?> 
                                           
                                             <td><?php 
                                        $sum=$row2['deg_perseverance']+$row2['deg_duties'];
                                               $sum2=$sum+$row2['deg_nashat']+$row2['deg_half'];
                                               $sum3=$sum2+$row2['deg_final'];
                                                    
                                                    echo $sum3; ?></td>
                                             <td><?php
                                               if($sum3>0 && $sum3<50){
                                                   echo "راسب ";
                                                   $m++;
                                               }elseif($sum3>=50 && $sum3<60){
                                                    echo "ضعيف ";
                                               }elseif($sum3>=60 && $sum3<70){
                                                    echo "مقبول ";
                                               }elseif($sum3>=70 && $sum3<80){
                                                    echo "جيد";
                                               }elseif($sum3>=80 && $sum3<90){
                                                    echo "جيد جدا";
                                               }elseif($sum3>=90 && $sum3<=100){
                                                    echo "ممتاز";
                                               }elseif($sum3==0){
                                                    echo " ";
                                               }
                                               
                                               
                                                ?>  </td>
                                             <?php
                                           $sum_degre=$sum_degre+$sum3;
                                               $conter++;
                                           
                                           } ?>
                                            
                                        </tr>
                                         
                                        <?php } ?>
                                                
                                     </tbody>
          </table>
 



     <h3> المعدل : <?php $avg=$sum_degre/$conter;
         echo $avg;
                 $avg=0;
                  $sum_degre=0;
                    $conter=0;   
         ?>
        </h3> 
        <h3> الحالة :<?php 
                       if($m>=1){
                         echo  "مكمل" ;
                       }elseif($m<1)
                       {
                           echo"ناجح";
                       }
                       $m=0;
                       
                 
         ?> </h3>  
         
        
     
        
        
      
       <?php    }elseif($p_check['balanc']<=$fsa and $row1['TermS_id']%2!=0){
                    ?>
         <table class="table table-bordered table-hover table-striped ">
                                    <thead>
                                        <tr>
                                            <th> رقم</th>
                                            <th>المقرر </th>
                                         
                                            <th>المجموع</th>
                                            <th> التقدير</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                          <?php
                      
                                          $i=1;
                                        $result= mysqli_query($conn,"SELECT * FROM `study_plan` st,`subject`su where st.`subject_id`=su.`subject_id` and  st.`TermS_id`='".$row1['TermS_id']."' and st.dept_id='".$row1['dept_id']."' ");
                                           while ($row= mysqli_fetch_array($result)) {  
                                                ?>
                                        
                                         <tr> 
                                             <td><?php echo $i++; ?></td>
                                             <td><?php echo $row['SubjectName']; ?></td>
                                               <?php
                                        $result1= mysqli_query($conn,"SELECT * FROM `degry` WHERE `TermS_id`='".$row1['TermS_id']."' and `subject_id`='".$row['subject_id']."' and `stu_id`='".$S['stu_id']."'");
                                           while ($row2= mysqli_fetch_array($result1)) {  
                                                ?> 
                                           
                                             <td><?php 
                                        $sum=$row2['deg_perseverance']+$row2['deg_duties'];
                                               $sum2=$sum+$row2['deg_nashat']+$row2['deg_half'];
                                               $sum3=$sum2+$row2['deg_final'];
                                                    
                                                    echo $sum3; ?></td>
                                             <td><?php
                                               if($sum3>0 && $sum3<50){
                                                   echo "راسب ";
                                                   $m++;
                                               }elseif($sum3>=50 && $sum3<60){
                                                    echo "ضعيف ";
                                               }elseif($sum3>=60 && $sum3<70){
                                                    echo "مقبول ";
                                               }elseif($sum3>=70 && $sum3<80){
                                                    echo "جيد";
                                               }elseif($sum3>=80 && $sum3<90){
                                                    echo "جيد جدا";
                                               }elseif($sum3>=90 && $sum3<=100){
                                                    echo "ممتاز";
                                               }elseif($sum3==0){
                                                    echo " ";
                                               }
                                               
                                               
                                                ?>  </td>
                                             <?php
                                           $sum_degre=$sum_degre+$sum3;
                                               $conter++;
                                           
                                           } ?>
                                            
                                        </tr>
                                         
                                        <?php } ?>
                                                
                                     </tbody>
          </table>
        <h3> المعدل : <?php $avg=$sum_degre/$conter;
         echo $avg;
                 $avg=0;
                  $sum_degre=0;
                    $conter=0;   
         ?>
        </h3> 
        <h3> الحالة :<?php 
                       if($m>=1){
                         echo  "مكمل" ;
                       }elseif($m<1)
                       {
                           echo"ناجح";
                       }
                       $m=0;
                       
                
         ?> </h3>
 
        <?php
                }else{
                   echo "<div class='alert alert-danger'><a href='#' class='close' data-dismiss='alert' aria-label='close'></a> <h3>يرجى مراجعة الحسابات</h3>  </div>";
}
     
     }}?>
                  </div> 
                <?php   }   ?>
                         


  </div>
</div>

      </div>
      </div>
                
                
                
       <?php
                 
      }elseif(isset($_GET['content']) && $_GET['content']=="fee")
      {
          ?>
                                                    
             <h2>الرسوم السنوية</h2>
                
                
                              <div class="container-fluid mypad">
   <div class="masthead">
 <div>
   <ul class="nav nav-tabs" role="tablist">   
       <?php
                  
     $result123= mysqli_query($conn,"SELECT * FROM  (SELECT    MIN(TermS_id) as TermS_id FROM `term_study` GROUP BY classid)  t , reg_yearstudy r , student s where r.`stu_id`=s.`stu_id` and r.TermS_id=t.TermS_id and s.stu_id='".$S['stu_id']."'   ");
                   while ($row111= mysqli_fetch_array($result123)) {  
    ?>
    <li role="presentation" class="<?php if($row111['classid']==1){?> active <?php }?>"><a href="#class<?php echo $row111['classid']; ?>" aria-controls="class<?php echo $row111['classid']; ?>,<?php echo $row111['dept_id']; ?>" role="tab" data-toggle="tab"> المستوى:<?php echo $row111['classid']; ?></a></li>
     <?php } ?>
  </ul>
  <!-- Tab panes -->
      
  <div class="tab-content">
      <?php
                  
     $result12= mysqli_query($conn,"SELECT * FROM  (SELECT    MIN(TermS_id) as TermS_id FROM `term_study` GROUP BY classid)  t , reg_yearstudy r , student s where r.`stu_id`=s.`stu_id` and r.TermS_id=t.TermS_id and s.stu_id='".$S['stu_id']."'  ");
                   while ($row1= mysqli_fetch_array($result12)) {  
    ?>
      
    <div role="tabpanel" class="tab-pane <?php if($row1['classid']==1){?> active <?php }?>" id="class<?php echo $row1['classid']; ?>">
         
        
     
       <!-- ////////////////////////////////////////////////-->
                             

        
        
                <?php 
    $sql3="SELECT  * FROM  (SELECT    MIN(TermS_id) as TermS_id FROM `term_study` GROUP BY classid)  t , class c, reg_yearstudy re WHERE  re.classid=c.classid and re.TermS_id=t.TermS_id and  re.stu_id='".$S['stu_id']."' and re.classid='".$row1['classid']."' ";
    
                                               $result3= mysqli_query($conn,$sql3);
                                           while ($res3= mysqli_fetch_array($result3)) {  
                                                
                
    $sql1 = "SELECT sum(`amuont`) as totalpaid,MIN(balance) as balanc,MAX(`paid_id`) as paid_id ,classid FROM `paid_fee`WHERE `stu_id` = '".$S['stu_id']."' and classid='".$res3['classid']."' ";
     $result1= mysqli_query($conn,$sql1);
                                           while ($res1= mysqli_fetch_array($result1)) {  
                                                ?>
                
<table class="table " >
    
    
<tr style="background: silver">
<th style="text-align: end">المستوى :</th><td><?php echo $res3['ClassName']; ?></td>
    <?php
     $f="SELECT  amount FROM free_dept where  freedept_id='".$row1['freedept_id']."' ";
    
                                               $ff= mysqli_query($conn,$f);
                                           while ($fr= mysqli_fetch_array($ff)) {
    
    ?>

<th style="text-align: end"> اجمالي الرسوم:</th><td><?php echo $fr['amount'] ?></td>
    <?php }?>

<th style="text-align: end"> المبلغ المدفوع :</th><td><?php echo $res1['totalpaid']; ?></td>
    
<th style="text-align: end">الباقي : </th><td><?php echo $res1['balanc']; ?></td>
</tr>
</table>
                
                

 
<div class="table-responsive">    
<table class="table table-striped table-bordered table-hover">
    <thead>
      <tr>
        <th>التاريخ</th>
        <th>المبلغ المدفوع</th>
        <th>ملاحظات</th>
      </tr>
    </thead>
  <?php
    $sq="SELECT * FROM paid_fee  WHERE stu_id='".$S['stu_id']."' and classid='".$res1['classid']."' ";
    
                 $result2= mysqli_query($conn,$sq);
                                           while ($res2= mysqli_fetch_array($result2)) {  
                                            if($res2['amuont']!=0) {
                                                
                                              
                
                ?>
    <tbody>
        <tr>
        <td><?php echo $res2['date_paid']; ?></td>
        <td><?php echo $res2['amuont']; ?></td>
        <td><?php echo $res2['notice']; ?></td>
      </tr> 
    </tbody>
 <?php } } ?>
  </table>
                
 </div> 

    <?php }} ?>
        
       
        <!-- ////////////////////////////////////////////////-->
       </div>
<?php }   ?>
      </div>

         </div>
      </div>
      </div>
                
     <?php }
       elseif(isset($_GET['content']) && $_GET['content']=="feetotal"){
             ?>                                     
             <h2>الرسوم الاجمالية</h2>
                
                
      <div class="container-fluid mypad">
   <div class="masthead">
 <div>
            
     
  <div class="tab-content">
<table class="table table-bordered table-hover table-striped" >
    
    
<tr style="background: silver">
<th >المستوى :</th>
<th> اجمالي الرسوم:</th>
    <th > المبلغ المدفوع :</th>
    <th >الباقي : </th>
    </tr>
    
    <tr>
      <?php
                  
     $result12= mysqli_query($conn,"SELECT * FROM  (SELECT    MIN(TermS_id) as TermS_id FROM `term_study` GROUP BY classid)  t , reg_yearstudy r , student s where r.`stu_id`=s.`stu_id` and r.TermS_id=t.TermS_id and s.stu_id='".$S['stu_id']."'  ");
                   while ($row1= mysqli_fetch_array($result12)) { 
                       
                   
    ?>
      
     
       <!-- ////////////////////////////////////////////////-->
                             

        
        
                
                <?php 
    $sql3="SELECT  * FROM  (SELECT    MIN(TermS_id) as TermS_id FROM `term_study` GROUP BY classid)  t , class c, reg_yearstudy re WHERE  re.classid=c.classid and re.TermS_id=t.TermS_id and  re.stu_id='".$S['stu_id']."' and re.classid='".$row1['classid']."' ";
    
                                               $result3= mysqli_query($conn,$sql3);
                                           while ($res3= mysqli_fetch_array($result3)) {  
                                                
                
    $sql1 = "SELECT sum(`amuont`) as totalpaid,MIN(balance) as balanc,MAX(`paid_id`) as paid_id ,classid FROM `paid_fee`WHERE `stu_id` = '".$S['stu_id']."' and classid='".$res3['classid']."' ";
     $result1= mysqli_query($conn,$sql1);
                                           while ($res1= mysqli_fetch_array($result1)) {  
                                                ?>
    <td><?php echo $res3['ClassName']; ?></td>
    <?php
     $f="SELECT  amount FROM free_dept where  freedept_id='".$row1['freedept_id']."' ";
    
               $ff= mysqli_query($conn,$f);
              while ($fr= mysqli_fetch_array($ff)) {
    
    ?>

<td><?php echo $fr['amount'] ?></td>
    <?php }?>

<td><?php echo $res1['totalpaid']; ?></td>
    
<td><?php echo $res1['balanc']; ?></td>
</tr>
                
  
    <?php }} ?>
        
       
        <!-- ////////////////////////////////////////////////-->
       
<?php }   ?>
</table>
      </div> 
          
                
     <?php 
       
       
       
       }elseif(isset($_GET['content']) && $_GET['content']=="passo"){
             ?> 
     
             <h2><div id="page-title" class="user-info">
              
                <p> تغير كلمة المرور  </p>
            </div></h2>
 




    <div id="container">


 
        <div id="content">
 <div id="content-panels">
<div id="content-box">
     <div id="page-box">

        <div id="page-header">
        <div class="left"></div>
        <div class="middle">
            
        </div>
        <div class="right"></div>
    </div>
     <div id="page-content">

            <form  action=" " method="post" target="_self" runat="server"id="changePasswordForm">
                
                <div class="form-group">
    <label for="email">ادخل كلمة المرور</label>
    <input type="text" class="form-control" id="password" name="password" required>
  </div>
                <div class="form-group">
    <label for="email">اعد ادخال كلمة المرور</label>
    <input type="text" class="form-control" id="repassword" name="repassword" required>
  </div>
                <div class="profile-userbuttons">
        
                     	<input name="submit" type="submit" class="btn btn-success btn-sm" value="تغير كلمة المرور"> 
				</div>
            </form>
        <br><p></p>
     
</div>
    </div>
            </div>
        </div>
        
    </div>
</div>
  
                        

     
     <?php }?>
      

   <?php }
     
     }else {
    redirect("index.php");
}
     
     ?>
    
    
     
