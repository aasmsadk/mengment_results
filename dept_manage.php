<?php session_start();

error_reporting(E_ALL ^ E_NOTICE);

 // include_once("headers.php");
  include_once("headermo.php");
  include_once('cnnectdb.php');
 include_once('navbar.php'); 
 include_once('functions.php');

login_check();
if($_SESSION['type_user']=="Admin"){
 ?>

<?php
  $dept_id=$_POST['dept_id'];
   $dept_name=$_POST['dept_name'];
  $col_id=$_POST['col_id'];
  $acc_id_up=$_GET['acc_id_up'];

  
  if($_POST['upd']){

   $up="UPDATE `mohammed`.`dept` SET
    `dept_name` = '$dept_name',
    `col_id` = '$col_id'
   
           WHERE `dept`.`dept_id` = '$acc_id_up'";
      
	 mysqli_query($conn,$up);
  }

   ?>
  <div class="col-md-12 col-sm-12 clearfix" style="text-align:center;">
		<h2 style="font-weight:200; margin:0px;"> ادارة الاقســـام الدراسيــة</h2>
    </div>
 <section class="container-fluid" style="margin-top:60px; margin-bottom:-60px  " >
     
 
       <article class="col-md-12 col-lg-12 art_bg" style=" margin-bottom: 40px "  >
 <div class="container" style="margin-right:400px;  " >
           

           </div>
     
        <?php
          if(isset($_GET['delete'])){
              $D=$_GET['delete'];
           $delet="DELETE FROM `dept` WHERE `dept_id`='$D'";
           mysqli_query($conn,$delet);
          }
         if(empty($_GET['id'])){

        ?>

        <div>
         	<div class="row" style="margin-bottom: -50px; margin-right:50px; margin-left: 50px " >

        <div class="col-md-12">

        <div class="table-responsive" style="margin-bottom: 20px; margin-right:-10px; margin-left: 20px ">


              <table id="mytable" class="table table-bordred table-striped" >

                   <thead>
                      <th>الرقم</th>
                    <th>اسم القسم</th>
                       <th>الكــلية</th>
                    <th>تعديل</th>

                       <th>حذف</th>
                   </thead>
    <tbody>
       <?php  error_reporting(E_ALL ^ E_NOTICE);
         
              $u=mysqli_query($conn,"SELECT * FROM dept a,colia t  where a.col_id=t.col_id");
              $i=0;
              while ($un=mysqli_fetch_array($u)){
//$i=$un['accuont_id'];
                 ?>
    <tr>

    <td><?php echo ++$i ; ?></td>
    <td><?php echo $un['dept_name']?></td>
    <td><?php echo $un['col_name']?></td>
     
    <td><p data-placement="top" data-toggle="tooltip" title="Edit"><a  href="dept_manage.php?id=<?php echo $un['dept_id']?>" name="idet"  class="btn btn-primary btn-xs" ><span class="glyphicon glyphicon-pencil"></span></a></p></td>
    <td><p data-placement="top" data-toggle="tooltip" title="Delete"><a href="dept_manage.php?delete=<?php echo $un['dept_id']?>" name="del" class="btn btn-danger btn-xs" ><span class="glyphicon glyphicon-trash"></span></a></p></td>
    </tr>
      <?php } ?>

   </tbody>

</table>


            </div>

        </div>
	</div>
</div>
<?php }?>
<?php
 if(!isset($_POST['upd'])){
if(isset($_GET['id'])){
      $ID= $_GET['id'];
     error_reporting(E_ALL ^ E_NOTICE);

              $SQL=mysqli_query($conn,"SELECT * FROM `dept` where `dept_id`='$ID' ");
               //echo "$u";
              $i=0;
              while ($S=mysqli_fetch_array($SQL)){

                ?>
  
 <a href="dept_manage.php" class="btn btn btn-success navbar-right" style=" margin-top: 10px">رجوع</a>
<form action="dept_manage.php?id&acc_id_up=<?php echo $S['dept_id']?>" method="post" >
	<div class="row" style="margin-bottom: 20px; margin-right:-10px; margin-left: 20px ; margin-top: 30px " >
         <div class="form-group" >
         <label >اسم القسم</label>
         <input class="form-control " name="dept_name" type="text" placeholder="اسم القسم" value="<?php echo $S['dept_name']?>" >
         </div>
        
        
        
        
        
        <div class="form-group" id="mm">
          <label for="col">الكـــلية</label>
          <select class="form-control" id="col" name="col_id">
            <?php  error_reporting(E_ALL ^ E_NOTICE);
              $uf=mysqli_query($conn,"SELECT * FROM `colia` ");
              while ($unf=mysqli_fetch_assoc($uf)){
                echo('<option value="'.$unf['col_id'].'"'.($S['col_id']==$unf['col_id']?'selected':'').'>'.$unf['col_name'].'</option> ');
                }
              ?>
          </select>

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