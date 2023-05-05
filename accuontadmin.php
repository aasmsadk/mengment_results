<?php session_start(); ?>
<?php  error_reporting(E_ALL ^ E_NOTICE);

  include_once("headermo.php");
  include_once('cnnectdb.php');
  include_once('functions.php');
  include_once('session.php');
 include_once('navbar.php'); 

if($_SESSION['type_user']=="Admin"){

//login_check ();

if (isset($_GET["admin"])) {
	$admin_id_selected = $_GET["admin"];


}else{
	$admin_id_selected = null;

}


?>




<style>

.mypad{
padding-top : 5px;
padding-right : 80px;
padding-left : 80px;
}
.mypad1{
padding-top : 10px;
padding-right : 80px;
padding-left : 120px;
}

</style>
  <h3 class="text mypad1">Manage Admin</h3>

  <div class="container">
      
      
      
  <div class="row">
    <div class="col-sm-2">


</div>

</div>
</div>
</div>

 <div class="container-fluid mypad">

      <div class="masthead">

<div>

  <ul class="nav nav-tabs" role="tablist">
    <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Admin</a></li>
    <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Add Admin </a></li>
    <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Edit Admin</a></li>
    <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Delete Admin</a></li>
  </ul>
  <!-- Tab panes -->
  <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="home">
      <h2>ADmin information</h2>
  <p>Admin information according to database:</p>
  <table class="table table-bordred table-striped">
    <thead >
      <tr>
        <th>رقم المستخدم</th>
        <th>اسم المستخدم</th>
        <th>كلمة المرور</th>
        
         
      </tr>
    </thead>
    <tbody>
 <?php
$sql = "SELECT * FROM admin ";

$result = mysqli_query($conn,$sql);
if (mysqli_num_rows($result) > 0) {

       $i=0;
            while($row=mysqli_fetch_assoc($result)){
       

   
    	?>

      <tr>
       <!-- <td><?php echo htmlentities( $i["admin_id"]);  ?></td> -->
         <td><?php echo $i+=1; ?></td>
        <td><?php echo htmlentities($row["useradmin"]);  ?></td>
        <td><?php echo htmlentities($row["passadmin"]);  ?></td>
        
      </tr>
       <?php
   }
    // $i=$i+1
}
?>
    </tbody>
  </table>

</div>



<!--add admin -->

  <?php
 
 if (isset($_POST["submit"])) {

   $username =  mysqli_real_escape_string($conn,checkEmptyPage(check_input ($_POST["useradmin"]) ))  ;
	 $pass =  mysqli_real_escape_string($conn,checkEmptyPage(check_input ($_POST["passadmin"]) ))  ;
     
     
    //$idtype =  mysqli_real_escape_string($conn,checkEmptyPage(check_input ($_POST["IdType_user"]) ))  ;
     
      $IdTyp=mysqli_query($conn,"select IdType_user from type_users where type_user='Admin'");
              $idt="";
                 while ($uc=mysqli_fetch_assoc($IdTyp)){
                 $idt=$uc['IdType_user'];
                  }
 
                $sq2="INSERT INTO `mohammed`.`accuont` (`username`,`password`,`IdType_user`)
                 VALUES ('$username','$pass','$idt')";
                 $result2= mysqli_query($conn,$sq2);
                         
        $moha=mysqli_query($conn,"SELECT `account_id` FROM `accuont` WHERE `account_id` = (SELECT MAX( `account_id` ) FROM `accuont`)");
              while ($unf=mysqli_fetch_assoc($moha)){
                $mo=$unf['account_id']; 
     
     
     
     
  $sql = "INSERT INTO `mohammed`.`admin`( `useradmin`, `passadmin`, `account_id`) VALUES
   	('$username','$pass','$mo')";
    

 	$result= mysqli_query($conn,$sql);
	   //	 $_SESSION['msg']=success_msg_admin();
      redirect("accuontadmin.php");

 
 }   }

     ?>


  <div role="tabpanel" class="tab-pane" id="profile">
<div class="container-fluid mypad">
 <form action='accuontadmin.php' method='post'>
  <div class="form-group">
    <label  >اسم المستخدم:</label>
    <input type="text" class="form-control" name="useradmin">
  </div>
  <div class="form-group">
    <label  >كلمة المرور:</label>
    <input type="namber" class="form-control" name="passadmin">
  </div>
     
     
 
     

   <input type="submit" name="submit" class="btn btn-primary btn-info-full " value="Submit"/>
 <!-- <button type="submit" class="btn btn-info" name="submit">Submit</button> -->
</form>
</div>
</div>


<!-- edit subject......................................................................................          -->






  <?php

if (isset($_POST["upd"])) {

	$id1 = $_SESSION['admin_id'];
$username =  mysqli_real_escape_string($conn,checkEmptyPage(check_input ($_POST["useradmin"]) ))  ;
	 $pass =  mysqli_real_escape_string($conn,checkEmptyPage(check_input ($_POST["passadmin"]) ))  ;
    $idtype =  mysqli_real_escape_string($conn,checkEmptyPage(check_input ($_POST["IdType_user"]) ))  ;
    
	if (!empty($errors)) {

		 $_SESSION['errors']=$errors  ;
	   //	 redirect('admins_manage.php');
	}

  
 	 $v= "UPDATE `mohammed`.`admin` SET
 	 `useradmin`= '$username',`passadmin`='$pass'   WHERE `admin`.`admin_id`= '$id1'";

 	if (mysqli_query($conn, $v) && mysqli_affected_rows($conn)>0) {
		  $_SESSION['msg']=update_success_msg_admin();
       redirect ("accuontadmin.php");

	}
    }
     else {
	 	 $_SESSION['msg']=update_fail_msg_admin();
	   //	redirect("admins_manage.php");
		 }


//else{
//redirect("admins_manage.php");
//}

                    ?>



<br>
    <div role="tabpanel" class="tab-pane" id="messages">


<div class="container">
  <div class="row">
    <div class="col-sm-2">


<?php
 $query1 = "SELECT * FROM `admin` ";
$result1 = mysqli_query($conn, $query1);
if (mysqli_num_rows($result1) > 0) {
 while($row1 = mysqli_fetch_assoc($result1)) {?>
 <ul  class="list-group" >
 <li class="list-group-item list-group-item-warning">
   <a href="accuontadmin.php?admin=<?php echo  mysqli_real_escape_string($conn,$row1["admin_id"]);  ?> ">
 <?php
 echo  mysqli_real_escape_string($conn,$row1["useradmin"]);   ?>
 </a>
 </li>
  </ul>
<?php }}?>

</div>
 <div class="col-sm-10">
<?php

if ($admin_id_selected) {

  $_SESSION['admin_id'] = $admin_id_selected;

$sql = "SELECT * FROM `admin`  WHERE admin_id = ".$admin_id_selected;
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
    	?>
<div class="container-fluid mypad">
    
 <form method='post'  action='accuontadmin.php'>
  <div class="form-group">
    <label  >اسم المستخدم:</label>
    <input type="text" class="form-control" name="useradmin"  value='<?php echo htmlentities($row["useradmin"]);  ?>'>
  </div>
      <div class="form-group">
    <label  >كلمة المرور:</label>
    <input type="text" class="form-control" name="passadmin"  value='<?php echo htmlentities($row["passadmin"]);  ?>'>
  </div>
  
        <input type="submit" name="upd" class="btn btn-primary btn-info-full " value="Submit"/>
  
</form>
</div>
<br><br>
<?php
    }
}}
?>

</div>
</div>
</div>

</div>




<!-- Deleted subject -->



 <?php

$id_admin = mysqli_real_escape_string($conn , $_GET["admin_id"]);


	$id1=  (int) $id_admin  ;

	//if (!empty($errors)) {

	  //	 $_SESSION['errors']=$errors  ;
		// redirect('admins_manage.php');
  //	}

	$sql = "DELETE FROM `mohammed`.`admin`   WHERE admin_id= '$id1' ";

	$result = mysqli_query($conn, $sql);
	if ($result && mysqli_affected_rows($conn)>0) {

	   $_SESSION['msg']=success_delete_msg_admin();
     redirect ("accuontadmin.php");

  //	} else {
	  //	 $_SESSION['msg']=fail_delete_msg_admin();
	   //	redirect("admins_manage.php");
	    }

        ?>

    <div role="tabpanel" class="tab-pane" id="settings">
  <h2>Admin Delete</h2>
  <p>This area to delete admin :</p>
  <table class="table table-bordred table-striped">
    <thead>
     <tr>
        <th> Admin Name  </th>
        <th>password</th>

      </tr>
    </thead>
    <tbody>
<?php
$sql = "SELECT * FROM `admin`";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
    	?>

      <tr>
        <td><?php echo htmlentities($row["useradmin"]);  ?></td>
        <td><?php echo htmlentities($row["passadmin"]);  ?></td>
          
        <td style="direction: ltr"><a  type="button" class="btn btn-danger"href="accuontadmin.php?admin_id=<?php echo   mysqli_real_escape_string($conn,$row["admin_id"]);?> ">Delete</td>
      </tr>

<?php
    }
}
?>
</tbody>
  </table>


</div>
  </div>
</div>

      </div>
      </div>



<script src="js/jquery/jquery-2.2.4.min.js"></script>

        <!-- <script src="js/bootstrap/bootstrap.min.js"></script>-->

       <script src="js/lobipanel/lobipanel.min.js"></script>

        <!-- ========== THEME JS ========== -->
        <script src="js/main.js"></script

 <?php
include("footermo.php");
}else {
    redirect("index.php");
}
?>



