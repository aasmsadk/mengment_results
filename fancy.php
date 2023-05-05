<?php error_reporting(E_ALL ^ E_NOTICE);
session_start();


   include_once("headermo.php");
include_once('functions.php');


 login_check ();

?>


  
  <script src="js/jquery-3.2.1.js"></script>  

       <link href="cssfancy.css" rel="stylesheet">
 
          
         




<style>
    .overlay { position: absolute;} 
    
</style>

<script>
      $(document).ready(function () {
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();
    });

    function hamburger_cross() {

      if (isClosed == true) {
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }

  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });
});
    
    
    
</script>

 

<div class="content-container"> 


    <div    id="wrapper">
        

        
        
        <!-- Sidebar -->
        <nav class="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper" role="navigation"style="background: #547794">

                <?php 
            if($_SESSION['type_user']=="Admin"){
            ?>
                <ul class="nav sidebar-nav">
            
                <br><br><br>
                <li class="active"><a href="adminpanal.php">Home</a></li>
                
                <li class="dropdown">
                     <a href="#" class="dropdown-toggle" data-toggle="dropdown">بيانات الطلاب <span class="caret"></span></a>
                     <ul class="dropdown-menu" role="menu" >
                      
                        <!-- <li  ><a href="registermo2.php">اضافة طالب</a></li>   -->
                         <li><a href="MangamenrUser.php">ادارة الطلاب</a></li>
                    </ul>
                </li>
                
                
                
                
                
                <li class="dropdown">
                     <a href="#" class="dropdown-toggle" data-toggle="dropdown">المواد الدراسية <span class="caret"></span></a>
                     <ul class="dropdown-menu" role="menu">
                   
                         <li><a href="mang_subject.php">ادارة المواد</a></li>
                           <li><a href="subjectdept.php">اضافة مواد الاقسام</a></li>
                    </ul>
                </li>
             <li class="dropdown">
                     <a href="#" class="dropdown-toggle" data-toggle="dropdown">بيانات التخصصات<span class="caret"></span></a>
                     <ul class="dropdown-menu" role="menu">
                   
                           <li><a href="Add_department.php">اضافة الكلية والاقسام</a></li>
                           <li><a href="dept_manage.php">ادارة الاقسام</a></li>
                         <li><a href="level_dept.php">اضافة مستويات الاقسام</a></li>
                           <li><a href="dept_fee.php">اضافة رسوم الاقسام</a></li>
                         <li><a href="samester.php">اضافة المستويات والفصول</a></li>
                    </ul>
                </li>
                    
                    
                     <li class="dropdown">
                     <a href="#" class="dropdown-toggle" data-toggle="dropdown">نتائج الطلاب<span class="caret"></span></a>
                     <ul class="dropdown-menu" role="menu">
                   
                      <!--   <li><a href="degrym.php">اضافة نتيجة</a></li> -->
                           <li><a href="studentTemp.php">استعلام عن النتائج</a></li>
                           
                    </ul>
                </li>
                    <li class="dropdown">
                     <a href="#" class="dropdown-toggle" data-toggle="dropdown">رسوم الطلاب<span class="caret"></span></a>
                     <ul class="dropdown-menu" role="menu">
                   
                       <!--  <li><a href="student_fee.php">تسديد الرسوم</a></li>  -->
                           <li><a href="report_fee.php">تقرير بالرسوم</a></li>
                    </ul>
                </li>
                  <li class="active"><a href="mgr_sub.php">ترحيل الطلاب</a></li>  
               <li class="dropdown">
                     <a href="#" class="dropdown-toggle" data-toggle="dropdown">  المستخدمين<span class="caret"></span></a>
                     <ul class="dropdown-menu" role="menu">
                <li><a href="mang_accuont.php">ادارة المستخدمين</a></li>
            <li><a href="accuontadmin.php">ادارة المسؤلون</a></li>
             <li><a href="employee.php">اضافة موظف</a></li>
            </ul>
           
                </li>
                    
            <?php }elseif($_SESSION['type_user']=="employee"){ ?>
            
             <ul class="nav sidebar-nav">
           
            
             <!--  <li class="sidebar-brand">
                    <a href="#">
                       Brand
                    </a>
                </li> -->
                <br><br><br>
                <li class="active"><a href="adminpanal.php">Home</a></li>
                
                <li class="dropdown">
                     <a href="#" class="dropdown-toggle" data-toggle="dropdown">بيانات الطلاب <span class="caret"></span></a>
                     <ul class="dropdown-menu" role="menu" >
                      
                         <li  ><a href="registermo2.php">اضافة طالب</a></li>
                         <li><a href="MangamenrUser.php">ادارة الطلاب</a></li>
                    </ul>
                </li>      
                     <li class="dropdown">
                     <a href="#" class="dropdown-toggle" data-toggle="dropdown">نتائج الطلاب<span class="caret"></span></a>
                     <ul class="dropdown-menu" role="menu">
                   
                         <li><a href="degrym.php">اضافة نتيجة</a></li>
                           <li><a href="studentTemp.php">استعلام عن النتائج</a></li>
                           
                    </ul>
                </li>
                    <li class="dropdown">
                     <a href="#" class="dropdown-toggle" data-toggle="dropdown">رسوم الطلاب<span class="caret"></span></a>
                     <ul class="dropdown-menu" role="menu">
                   
                         <li><a href="student_fee.php">تسديد الرسوم</a></li>
                           <li><a href="report_fee.php">تقرير بالرسوم</a></li>
                    </ul>
                </li>
                  <li class="active"><a href="mgr_sub.php">ترحيل الطلاب</a></li> 
             
            </ul>
            
            <?php } ?>
            
        </nav>
        <!-- /#sidebar-wrapper -->

        <!-- Page Content 
        class="col-lg-8 col-lg-offset-4"  -->
        
        <style>
        
           #mohammed {
             right: 20%;  
              direction: ltr;  
               display: block
            }
            li{  text-align:right;
                 font-family:sans-serif;
                font-size: 15px;
               }    
                   
            /*margin-top:-70px*/
        </style>
         <div id="page-content-wrapper">
            <button type="button" class="hamburger is-closed " data-toggle="offcanvas"role="navigation">
                <span class="hamb-top"></span>
    			<span class="hamb-middle"></span>
				<span class="hamb-bottom"></span>
            </button>
           
        </div>

        <!-- /#page-content-wrapper -->

    </div>
    
    <!-- /#wrapper -->
    
    
    <?php

 include("footermo.php");

    ?>