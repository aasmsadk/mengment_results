 <?php
  session_start();
  include_once("headermo.php");
 include_once('cnnectdb.php');
 include_once('navbar.php'); 
 include_once('functions.php');
login_check();
if($_SESSION['type_user']=="Admin" || $_SESSION['type_user']=="employee" ){

?>



    <link href="admincss.css" rel="stylesheet">
 <link href="static/css/bootstrap.min.css" rel="stylesheet" >
<link href="static/css/bootstrap-rtl.min.css" rel="stylesheet">
      <script src="jquery.main.js"></script>
          
      <!--=============================
                                             NAVIGATION
                                   =============================-->

 
<!--    top nav end===========-->

    <!-- begin SIDE NAV USER PANEL -->
 <style>
     .dropdown-menu>li>a { color: #f7f3f3 }

   @media (min-width: 768px).navbar-nav {
    float: left;
    margin:left 15px;}
.row {
    margin-top: 95px;
    
    margin-right: 45px;
    margin-left: 15px;
}



    #dirrtl{
       
        height: 100%;
         
         
     }



</style>

    <div class="container-2"id="dirrtl">
            <div class="col-md-12 col-sm-12 clearfix" style="text-align:center;">
		<h2 style="font-weight:200; margin:0px;">نظام ادارة شؤون الطلاب</h2>
    </div>
            
     <div id="page-wrapper">
      <?php
    
 if($_SESSION['type_user']=="Admin"){     ?>
         
        <div class="row" >
            
            
            
            
                    <div class="col-lg-4 col-sm-6">
                        <div class="circle-tile">
                            <a href="MangamenrUser.php">
                                <div class="circle-tile-heading dark-blue">
                                    <i class="fa fa-users fa-fw fa-3x"></i>
                                </div>
                            </a>
                            <div class="circle-tile-content dark-blue">
                                <div class="circle-tile-description text-faded">
                              عدد الطلـــاب 
                                </div>
                                <div class="circle-tile-number text-faded">
                                   <?php
                                    
                   /*  $query1 = "SELECT * FROM `pages`  WHERE   `pages`.`item_name_id`= ".$row["id"];
$result1 = mysqli_query($conn, $query1);
$row_cnt = mysqli_num_rows($result1);
                 */
                                    
                                    
                                    
  $sql = "SELECT stu_id FROM `student`  ";
$result = mysqli_query($conn, $sql);
    {
 while($row1 = mysqli_fetch_assoc($result)) {
 $row_cnt = mysqli_num_rows($result);
     
        
 }
                            if ($row_cnt ==0) { echo "No student"; }   elseif($row_cnt ==1) {echo "student : " .$row_cnt;}else {echo "الطـــــــلاب: " .$row_cnt;}
 } ?> 
                                    
                                    <span id="sparklineA"></span>
                                     
                                     
                                </div>
                                <a href="MangamenrUser.php" class="circle-tile-footer">ادارة الطلـــــــاب <i class="fa fa-chevron-circle-right"></i></a>
                            </div>
                        </div>
                    </div>
             
            
            
                    <div class="col-lg-4 col-sm-6">
                        <div class="circle-tile">
                            <a href="mang_accuont.php">
                                <div class="circle-tile-heading green">
                                    <i class="fa fa-money fa-fw fa-3x"></i>
                                </div>
                            </a>
                            <div class="circle-tile-content green">
                                <div class="circle-tile-description text-faded">
                              المستــــخدمين
                                </div>
                                <div class="circle-tile-number text-faded">
                                                                  
                       <?php             
  $sql = "SELECT account_id FROM `accuont`  ";
$result = mysqli_query($conn, $sql);
    {
 while($row1 = mysqli_fetch_assoc($result)) {
 $row_cnt = mysqli_num_rows($result);
     
        
 }
                            if ($row_cnt ==0) { echo "No account"; }   elseif($row_cnt ==1) {echo "account : " .$row_cnt;}else {echo "المســـتخدمين: " .$row_cnt;}
 } ?> 
                                    
                                     
                                </div>
                                <a href="mang_accuont.php" class="circle-tile-footer">  حسابات المستخـــــدمين<i class="fa fa-chevron-circle-right"></i></a>
                            </div>
                        </div>
                    </div>
              <div class="col-lg-4 col-sm-6">
                        <div class="circle-tile">
                            <a href="mang_subject.php">
                                <div class="circle-tile-heading orange">
                                    <i class="fa fa-bell fa-fw fa-3x"></i>
                                </div>
                            </a>
                            <div class="circle-tile-content orange">
                                <div class="circle-tile-description text-faded">
                      المــــواد الدراســــية
                                </div>
                                <div class="circle-tile-number text-faded">
                                 <?php             
  $sql = "SELECT subject_id FROM `subject`  ";
$result = mysqli_query($conn, $sql);
    {
 while($row1 = mysqli_fetch_assoc($result)) {
 $row_cnt = mysqli_num_rows($result);
     
        
 }
                            if ($row_cnt ==0) { echo "No subject"; }   elseif($row_cnt ==1) {echo "subject : " .$row_cnt;}else {echo "عدد المــواد: " .$row_cnt;}
 } ?> 
                                    
                                </div>
                                <a href="mang_subject.php" class="circle-tile-footer">المــواد الدراســـية<i class="fa fa-chevron-circle-left"></i></a>
                            </div>
                        </div>
                    </div>
              <div class="col-lg-4 col-sm-6">
                        <div class="circle-tile">
                            <a href="dept_manage.php">
                                <div class="circle-tile-heading blue">
                                    <i class="fa fa-tasks fa-fw fa-3x"></i>
                                </div>
                            </a>
                            <div class="circle-tile-content blue">
                                <div class="circle-tile-description text-faded">
                                 الاقســــــام الدراســــــية
                                </div>
                                <div class="circle-tile-number text-faded">
                                   
                                    <?php             
  $sql = "SELECT dept_id FROM `dept`  ";
$result = mysqli_query($conn, $sql);
    {
 while($row1 = mysqli_fetch_assoc($result)) {
 $row_cnt = mysqli_num_rows($result);
     
        
 }
                            if ($row_cnt ==0) { echo "No department"; }   elseif($row_cnt ==1) {echo "department : " .$row_cnt;}else {echo "الاقســــــــام: " .$row_cnt;}
 } ?>  
                                    
                                    
                                    <span id="sparklineB"></span>
                                </div>
                                <a href="dept_manage.php" class="circle-tile-footer">اقسام الجامعة<i class="fa fa-chevron-circle-right"></i></a>
                            </div>
                        </div>
                    </div>
          <div class="col-lg-4 col-sm-6">
                        <div class="circle-tile">
                            <a href="dept_manage.php">
                                <div class="circle-tile-heading purple">
                                    <i class="fa fa-tasks fa-fw fa-3x"></i>
                                </div>
                            </a>
                            <div class="circle-tile-content purple">
                                <div class="circle-tile-description text-faded">
                                  
                                </div>
                                <div class="circle-tile-number text-faded">
                                   
                                     <h3>  الدرجـــــات </h3>
                                    
                                    <span id="sparklineB"></span>
                                </div>
                                <a href="studentTemp.php" class="circle-tile-footer">درجات الطلاب <i class="fa fa-chevron-circle-right"></i></a>
                            </div>
                        </div>
                    </div>
     <div class="col-lg-4 col-sm-6">
                        <div class="circle-tile">
                            <a href="dept_manage.php">
                                <div class="circle-tile-heading dark-blue">
                                    <i class="fa fa-tasks fa-fw fa-3x"></i>
                                </div>
                            </a>
                            <div class="circle-tile-content dark-blue">
                                <div class="circle-tile-description text-faded">
                                  
                                </div>
                                <div class="circle-tile-number text-faded">
                                   
                                     <h3>  الرســــــــوم </h3>
                                    
                                    <span id="sparklineB"></span>
                                </div>
                                <a href="report_fee.php" class="circle-tile-footer">رســــــــوم الطــــــلاب <i class="fa fa-chevron-circle-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
<?php }elseif($_SESSION['type_user']=="employee"){?>
         
          <div class="row" >
            
             
            
            
            
            
                    <div class="col-lg-4 col-sm-6">
                        <div class="circle-tile">
                            <a href="MangamenrUser.php">
                                <div class="circle-tile-heading dark-blue">
                                    <i class="fa fa-users fa-fw fa-3x"></i>
                                </div>
                            </a>
                            <div class="circle-tile-content dark-blue">
                                <div class="circle-tile-description text-faded">
                             جـــــميع الطـــــلاب  
                                </div>
                                <div class="circle-tile-number text-faded">
                                   <?php
                                    
                   /*  $query1 = "SELECT * FROM `pages`  WHERE   `pages`.`item_name_id`= ".$row["id"];
$result1 = mysqli_query($conn, $query1);
$row_cnt = mysqli_num_rows($result1);
                 */
                                    
                                    
                                    
  $sql = "SELECT stu_id FROM `student`  ";
$result = mysqli_query($conn, $sql);
    {
 while($row1 = mysqli_fetch_assoc($result)) {
 $row_cnt = mysqli_num_rows($result);
     
        
 }
                            if ($row_cnt ==0) { echo "No student"; }   elseif($row_cnt ==1) {echo "student : " .$row_cnt;}else {echo "الطـــــلاب : " .$row_cnt;}
 } ?> 
                                    
                                    <span id="sparklineA"></span>
                                     
                                     
                                </div>
                                <a href="MangamenrUser.php" class="circle-tile-footer">ادارة الطـــــلاب <i class="fa fa-chevron-circle-right"></i></a>
                            </div>
                        </div>
                    </div>
              
            
               
          <div class="col-lg-4 col-sm-6">
                        <div class="circle-tile">
                            <a href="dept_manage.php">
                                <div class="circle-tile-heading blue">
                                    <i class="fa fa-tasks fa-fw fa-3x"></i>
                                </div>
                            </a>
                            <div class="circle-tile-content blue">
                                <div class="circle-tile-description text-faded">
                                  
                                </div>
                                <div class="circle-tile-number text-faded">
                                   
                                     <h3>  الدرجـــات </h3>
                                    
                                    <span id="sparklineB"></span>
                                </div>
                                <a href="studentTemp.php" class="circle-tile-footer">درجـــات الطـــــــلاب <i class="fa fa-chevron-circle-right"></i></a>
                            </div>
                        </div>
                    </div>
     <div class="col-lg-4 col-sm-6">
                        <div class="circle-tile">
                            <a href="dept_manage.php">
                                <div class="circle-tile-heading green">
                                    <i class="fa fa-tasks fa-fw fa-3x"></i>
                                </div>
                            </a>
                            <div class="circle-tile-content green">
                                <div class="circle-tile-description text-faded">
                                  
                                </div>
                                <div class="circle-tile-number text-faded">
                                   
                                     <h3>  الرســـــــوم </h3>
                                    
                                    <span id="sparklineB"></span>
                                </div>
                                <a href="report_fee.php" class="circle-tile-footer">رســوم الطـــلاب <i class="fa fa-chevron-circle-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
         
         
         <?php } ?>
         <div class="container"  >
 <footer class="my-5 pt-5 text-muted text-center text-small">
    <p class="mb-1">&copy; 2021-2022 By: Eng_Asem Sadaq.</p>
    <ul class="list-inline">
      <li class="list-inline-item"><a href="#"> aasmsadq11@gmail.com</a></li>
    
    </ul>
  </footer> 
</div>
    </div><!-- page-wrapper END-->
   </div><!-- container-1 END-->

<?php

//include("MangamenrUser.php");

?>
 

<script type="text/javascript">
    $(document).ready(function(){
        $(".sidebar-toggle").click(function(){
            $(this).hide();

           $("#user-profil").show();

           $("#hide-btn").show();

           $(".container-2").css("width", "85%");


        });

        $("#hide-btn").click(function(){
            $(this).hide();

           $("#user-profil").hide();

           $(".sidebar-toggle").show();

           $(".container-2").css("width", "100%");


        });
    });
</script>


 <?php
include("footermo.php");
}else {
    redirect("index.php");
}
?>
 