<?php session_start();
error_reporting(E_ALL ^ E_NOTICE);

 // include_once("headers.php");
  include_once("headermo.php");
  include_once('cnnectdb.php');
 include_once('functions.php');
 include_once('navbar.php'); 

login_check();
if($_SESSION['type_user']=="Admin"){
 
  $acc_id=$_POST['account_id1'];
   $acc_name=$_POST['usernameq'];
  $acc_pass=$_POST['password'];
  $acc_type=$_POST['IdType_user'];
  $acc_id_up=$_GET['acc_id_up'];

  if($_POST['upd']){

   $up="UPDATE `mohammed`.`accuont` SET
    `username` = '$acc_name',
    `password` = '$acc_pass',
     `IdType_user` = '$acc_type'
           WHERE `accuont`.`account_id` = '$acc_id_up'";
      
	 mysqli_query($conn,$up);
  }

   ?>
 

 <script>
   $(document).ready(function(){

    $("#typeuser").change(function(){
      var typeuser = this.value;
      $.ajax({
      url: "row-admin-acc.php",
      type: "POST",
      data: {
      typeuser: typeuser
      },
      cache: false,
      success: function(data){
        $("#aa").html(data);

      }
      });
    });
     });
</script>
               
<script src="js/jquery-3.2.1.js"></script> 


    
 <section class="container-fluid" style="margin-top:60px; margin-bottom:-60px  " >
     
 
       <article class="col-md-12 col-lg-12 art_bg" style=" margin-bottom: 40px "  >
 <div class="container" style="margin-right:400px;  " >
          <label for="country" >اختر نوع الحساب</label>
          <select  id="typeuser"  name="typeuser" >

            <option value="">Choose...</option>
              
               <?php  error_reporting(E_ALL ^ E_NOTICE);

              $uf=mysqli_query($conn,"SELECT * FROM type_users ");
              while ($unf=mysqli_fetch_assoc($uf)){
                ?>
                <option  value="<?PHP echo $unf["IdType_user"]; ?>"> <?PHP echo $unf["type_user"] ;} ?> </option>
             
          </select>

           </div>
     
        <?php
          if(isset($_GET['delete'])){
              $D=$_GET['delete'];
           $delet="DELETE FROM `accuont` WHERE `account_id`='$D'";
           mysqli_query($conn,$delet);
          }
         if(empty($_GET['id'])){

        ?>
           
           <div  id="aa" >
           
           
           
           </div>
        
<?php }?>
<?php
 if(!isset($_POST['upd'])){
if(isset($_GET['id'])){
      $ID= $_GET['id'];
     error_reporting(E_ALL ^ E_NOTICE);

              $SQL=mysqli_query($conn,"SELECT * FROM `accuont` where `account_id`='$ID' ");
               //echo "$u";
              $i=0;
              while ($S=mysqli_fetch_array($SQL)){

                ?>
 
           
                <a href="mang_accuont.php" class="btn btn btn-success navbar-left" style=" margin-top: 10px">رجوع</a>
<form action="mang_accuont.php?id&acc_id_up=<?php echo $S['account_id']?>" method="post" >
	<div class="row" style="margin-bottom: 20px; margin-right:-10px; margin-left: 20px ; margin-top: 30px " >
         <div class="form-group" >
         <label >اسم المستخدم</label>
         <input class="form-control " name="usernameq" type="text" placeholder="اسم المستخدم" value="<?php echo $S['username']?>" >
         </div>
        <div class="form-group">
        <label >كلمة المرور</label>
        <input  type="text" class="form-control" name="password" placeholder="ادخل كلمة المرور الجديدة"  />
        </div>



          <div class="form-group">
          <label>نوع المستخدم</label>
        <input class="form-control " name="IdType_user" type="text" placeholder="نوع المستخدم" value="<?php echo $S['IdType_user']?> ">
        </div>
       

          <div class="modal-footer ">
        <input type="submit" class="btn btn-warning btn-lg " style="width: 100%;" name="upd" value="تعديل "><!--<span class="glyphicon glyphicon-ok-sign"></span>-->
      </div>
      </div>
       </form>
       <?php }}}?>
 
 </article>

</section>
 
  <?php
 include("footermo.php");
}else {
    redirect("index.php");
}
?>