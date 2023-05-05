<?php 
session_start();
include_once('cnnectdb.php'); 
 include_once('functions.php');
login_check();

?>

<div >
         	<div class="row" style="margin-bottom: -50px; margin-right:50px; margin-left: 50px " >

        <div class="col-md-12">

        <div class="table-responsive" style="margin-bottom: 20px; margin-right:-10px; margin-left: 20px ">


              <table id="mytable" class="table table-bordred table-striped" >

                   <thead>




                    <th>الرقم</th>
                    <th>الرقم المستخدم</th>
                    <th>اسم المستخدم</th>
                 
                       <th>نوع المستخدم</th>
                    <th>تعديل</th>

                       <th>حذف</th>
                   </thead>
    <tbody>
       <?php  error_reporting(E_ALL ^ E_NOTICE);
             
                $r=$_POST['typeuser']; 
             
              
        
              $u=mysqli_query($conn,"SELECT * FROM accuont a,type_users t  where a.IdType_user=t.IdType_user AND a.IdType_user='$r'");
              $i=0;
              while ($un=mysqli_fetch_array($u)){
//$i=$un['accuont_id'];
                 ?>
    <tr>

    <td><?php echo ++$i ; ?></td>
    <td><?php echo $un['account_id']?></td>
    <td><?php echo $un['username']?></td>
    
    <td><?php echo $un['type_user']?></td>
        
    <td><p data-placement="top" data-toggle="tooltip" title="Edit"><a  href="mang_accuont.php?id=<?php echo $un['account_id']?>" name="idet"  class="btn btn-primary btn-xs" ><span class="glyphicon glyphicon-pencil"></span></a></p></td>
    <td><p data-placement="top" data-toggle="tooltip" title="Delete"><a href="mang_accuont.php?delete=<?php echo $un['account_id']?>" name="del" class="btn btn-danger btn-xs" ><span class="glyphicon glyphicon-trash"></span></a></p></td>
    </tr>
      <?php } ?>

   </tbody>

</table>


            </div>

        </div>
	</div>
</div>