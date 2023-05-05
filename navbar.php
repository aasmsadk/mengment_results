 <?php
error_reporting(E_ALL ^ E_NOTICE);
session_start();
 include_once('functions.php');
 include_once("headermo.php");
login_check();
 
  $errorm='';
if(isset($_POST['up_pass_emp'])){
                      if($_POST['password']==$_POST['repassword']){
    
   $up="UPDATE `mohammed`.`accuont` SET
    `password` = '".$_POST['password']."' WHERE `accuont`.`account_id`='".$_SESSION['admin_id']."' ";
       mysqli_query($conn,$up); 
        $errorm = "  
              <div class='alert alert-success alert-autocloseable-success'>
        			تم تعديل كلمة السر 
				</div>
                 ";
        
    }else{ 
          
           $errorm = "  
              <div class='alert alert-danger alert-autocloseable-danger'>
        			كلمة السر غير متوافقتين 
				</div>
                 "; 
  
           
     }
}

?>

  
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title> </title>
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <!-- Bootstrap 3.3.2 -->
     
  
         
      
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
   
    
            <div class="modal fade" id="eu" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" style="color:red;">&times;</button>
          <h4 class="modal-title">تغير كلمة المرور</h4>
        </div>
        <div class="modal-body" id="formcon">
        
        </div>
        
      </div>
    </div>
  </div>
    
<header class="main-header" style=" background-color:#f3f3f3; margin-top:-22px;">
        <!-- Logo -->
    
        <nav class="navbar navbar-static-top" role="navigation">
        <?php include_once('fancy.php');?>
           <div class="navbar-custom-menu" style="float: left;">
               
          <?php
              
              $ID=$_SESSION['admin_id'];
              if($_SESSION['type_user']=="employee"){
                  
                  

                  
                    

                    
                      $result=mysqli_query($conn,"SELECT * FROM   employee   where  account_id='$ID' ");
                     
              while ($S=mysqli_fetch_array($result)){
                    
                    ?>
			 
            
           
            
          <div class="navbar-custom-menu" style="float: left;">
      
            <ul class="nav navbar-nav" style="margin-left: 80px;">
              <!-- User Account: style can be found in dropdown.less -->
              <li class="dropdown user user-menu" style="">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
        <?php echo '<img  class="img-responsive" class="user-image" alt="User Image" style="float: left;
             width: 59px;
             height: 35px;
    border-radius: 50%;
    margin-right: 10px;
    margin-top: -2px;"alt="" src="imag/'.$S['image'].'">' ;?>
                    
                  <span class="hidden-xs"><?php    echo $S['emp_name']; ?></span>
                </a>
                <ul class="dropdown-menu" style="">
                  <!-- User image -->
                  <li class="user-header" style="height:175px;
    padding:10px; width: 190px;
    text-align: center;">
                  <?php echo '<img  class="img-circle" alt="User Image"    style="z-index: 5;
    height: 90px;
    width: 90px;
    border: 3px solid;"src="imag/'.$S['image'].'">' ;?>
                    <p>
                      user : <?php    echo $S['emp_name']; ?>
                    </p>
                  </li>
                  <!-- Menu Body -->
                  <li class="user-body">
                    <div class="col-xs-4 text-center">
                      <a href="username.php"> </a>
                    </div>
                      
                    <div class="col-xs-4 text-center pull-right">
                        
    
              <a href="#" onclick="GetFeeFormu(<?php  echo $ID?>)" 
   data-toggle="modal" data-target="#eu" class="btn btn-success btn-sm" style="border-radius:0%">
<i class="fa fa-money"></i> تغير كلمة المرور </a>
                     </div>
                  </li>
                </ul>
              </li>
            </ul>
   <script>
  function GetFeeFormu(account_id)
{

$.ajax({
            type: 'post',
            url: 'getfeeform.php',
            data: {
                account_id:account_id,
                 r:'up_emp'},
            success: function (data) {
              $('#formcon').html(data);
			  $("#eu").modal({backdrop: "static"});
            }
          });


}

</script>  
   <?php }}elseif($_SESSION['type_user']=="Admin"){ ?>
                      
            <ul class="nav navbar-nav" style="margin-left: 80px;">
              <!-- User Account: style can be found in dropdown.less -->
              <li class="dropdown user user-menu" style="">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
        <?php echo '<img  class="img-responsive" class="user-image" alt="User Image" style="float: left;
             width: 59px;
             height: 35px;
    border-radius: 50%;
    margin-right: 10px;
    margin-top: -2px;"alt="" src="imag/user_100px.png">' ;?>
                    
                  <span class="hidden-xs"><?php    echo "Administrator"; ?></span>
                </a>
                <ul class="dropdown-menu" style="">
                  <!-- User image -->
                  <li class="user-header" style="height:175px;
    padding:10px; width: 190px;
    text-align: center;">
                  <?php echo '<img  class="img-circle" alt="User Image"    style="z-index: 5;
    height: 90px;
    width: 90px;
    border: 3px solid;"src="imag/user_100px.png">' ;?>
                    <p>
                      user : <?php    echo "Administrator" ; ?>
                    </p>
                  </li>
                  <!-- Menu Body -->
                  <li class="user-body">
                    <div class="col-xs-4 text-center">
                      <a href="username.php"> </a>
                    </div>
                    <div class="col-xs-4 text-center pull-right">
                      <a href="password.php"> </a>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
              <?php } ?>
              
              
              <ul class="nav navbar-nav">
              <li>
                <a href="logout.php">
                  <i class="glyphicon glyphicon-log-out" data-toggle="tooltip" title="Logout"></i>
              خـــروج
                  </a>
              </li>
                  </ul>
          </div>
        </nav>
      </header>
 <?php echo $errorm; ?>
     <?php

 include("footermo.php");

    ?>
    
   