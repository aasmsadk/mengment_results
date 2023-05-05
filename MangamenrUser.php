<?php 
session_start();
error_reporting(E_ALL ^ E_NOTICE);

  include_once("headermo.php");
  include_once('cnnectdb.php');
 include_once('navbar.php'); 
include_once('functions.php');
 $errormsg='';
login_check();
if($_SESSION['type_user']=="Admin" || $_SESSION['type_user']=="employee" ){


 
?>

  <?php
  $stu_no=$_POST['stu_id'];
   $student_name1=$_POST['stud_name'];
   $date_register=$_POST['date_register'];
   $gender=$_POST['gender'];
  $loc_brith=$_POST['loc_brith'];
   $date_brith=$_POST['date_brith'];

       if(isset($_FILES['image']) && $_FILES['image']['name'] != ""){
			$image = $_FILES['image']['name'];
		   $directory_self = str_replace(basename($_SERVER['PHP_SELF']), '', $_SERVER['PHP_SELF']);
		   	 $uploadDirectory = $_SERVER['DOCUMENT_ROOT'] . $directory_self . "bootstrap/img/";
		  $uploadDirectory .= $image;
		    move_uploaded_file($_FILES['image']['tmp_name'], $uploadDirectory);
	  	}

    $phone=$_POST['phone'];
     $email1=$_POST['Email'];
    $id_nationality=$_POST['id_nationality'];
  $city1=$_POST['city'];
  $document=$_POST['id_document'];
  $pass=$_POST['password1'];
  $certif_prev=$_POST['certif_prev'];
  $average1=$_POST['average'];



  $sta_st_id=$_POST['sta_st_id'];

   $sti_is=$_GET['sti_is'];

    $stu_no=$_POST['stu_id'];
   $spec_id=$_POST['spec_id'];
 $col_id=$_POST['col_id'];
  $dept_id=$_POST['dept_id'];
 // $ID2= $_GET['sti_is'];


  if($_POST['upd']){

   $up="UPDATE `mohammed`.`student` SET
    `stud_name` = '$student_name1',
    `gender` = '$gender',
      `date_register` = '$date_register',
      `loc_brith` = '$loc_brith',
       `date_brith`='$date_brith',
      `phone` = '$phone',
       `Email` = '$email1',
       `id_nationality` = '$id_nationality',
      `city` = '$city1',
       `id_document` ='$document',
        `certif_prev` = '$certif_prev',
         `average` = '$average1',
           `sta_st_id` = '$sta_st_id'";
            if(isset($image)){
	  $up .= ",sudent_image='$image' WHERE stu_id = '$sti_is'";
	} else {
	   $up .= " WHERE stu_id = '$sti_is'";
	}

    mysqli_query($conn,$up);
    
      
   
               
                      
       echo "  
              <div class='alert alert-success alert-autocloseable-success'>
        			تم تعديل الطالب بنجاح 
				</div>
                 ";
                      
                  
     $up1="UPDATE `mohammed`.`stu_spec` SET `col_id` = '$col_id',`dept_id` = '$dept_id'
      WHERE `stu_spec`.`stu_id`= '$sti_is'";
                    mysqli_query($conn,$up1);
                  }



  if(isset($_POST['delete'])){
              $D=$_POST['stu'];
           $delet="DELETE FROM `student` WHERE `stu_id`='$D'";
           mysqli_query($conn,$delet);
              echo "  
              <div class='alert alert-success alert-autocloseable-success'>
        			تم حذف الطالب بنجاح 
				</div>
                 ";
          }
   ?>
<?php echo $errormsg; ?>
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


  <div class="col-md-12 col-sm-12 clearfix" style="text-align:center;">
		<h2 style="font-weight:200; margin:0px;">ادارة الطــــــلاب</h2>
    </div>
        <article class="col-md-12 col-lg-12 art_bg" >

        <?php
        
         if(empty($_GET['id'])){

        ?>
 
<style>
            
   .art_bg{ margin-top: 30px;
    
    }
            
          </style>
   

             <div class="modal fade" id="tooltip" role="dialog">
    <div class="modal-dialog modal-lg">
   <div class="modal-content" style="margin-top:100px;">
                
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" style="text-align:center;">هل تريد الحذف بالتاكيد ؟</h4>
                </div>
                <div id="formcontent">
               
                 </div>
            </div>
    </div>
  </div>
            <script>
  function Delete(stu)
{

$.ajax({
            type: 'post',
            url: 'getfeeform.php',
            data: {
               stu:stu, 
                r:'del'},
            success: function (data) {
              $('#formcontent').html(data);
			  $("#tooltip").modal({backdrop: "static"});
            }
          });


}

</script>   

        <div class="container"    style=" "   >
                                         
         	<div class="row" style="margin-bottom: 20px; margin-right:-120px;  margin-left:-120px; font-size:15px;
                                    " >
        <div class="col-md-12   ">

        <div class="table-responsive" style="margin-bottom: 20px; margin-right:-10px; margin-left: 20px ">


              <table  id="tSortable22"   class="table table-bordred table-striped" >

 <div class="form-group">
    <label for="email">اسم الطالب </label> 
    <input type="text" style="width: 170px; "   class="control" id="student-Search" name="student-Search">
  
            </div>
        <thead style='padding:20px'>
                   <th>الرقم التسلسلي</th>
                <th>الرقم الاكاديمي</th>
                   <th>الاسم</th>
                   
                     <th>مكان الميلاد</th>
                   
                       <th>رقم التلفون</th>
                          <th>البريدالالكتروني </th>
                            <th>الجنسية</th>
                          <th>رقم البطاقة</th>
                        <th>المؤهل السابق</th>
                       
                    <th>تاريخ التسجيل</th>
                    <th>الكلــية </th>
                     <th>التخصص </th>
                   <th>تعديل</th>
                   <th>حذف</th>
                   </thead>
    <tbody id="myTable">
       <?php  error_reporting(E_ALL ^ E_NOTICE);
             
  $result=mysqli_query($conn,"SELECT *FROM `student` s,`stu_spec` sp,`colia` c,dept d , nationality n , statuse_std ss where sp.stu_id=s.stu_id and c.col_id=sp.col_id
  and sp.dept_id=d.dept_id and s.id_nationality = n.id_nationality and s.sta_st_id=ss.sta_st_id");

             $i=1;
             while($un=mysqli_fetch_array($result)){
            $i=$un['stu_id'];
                 ?>
 <tr>
  <td><?php echo $un['stu_id']; ?></td>
      <td><?php echo $un['academic_number']; ?></td>
    <td><?php echo $un['stud_name']?></td>
     
     <td><?php echo $un['loc_brith']?></td>
     
     <td><?php echo $un['phone']?></td>
        <td><?php echo $un['Email']?></td>
        <td><?php echo $un['nationName']?></td> 
     
    <td><?php echo $un['id_document']?></td>
   <td><?php echo $un['certif_prev']?></td>
     
         <td><?php echo $un['date_register']?></td>
    <td><?php echo $un['col_name']?></td>

     <td><?php echo $un['dept_name']?></td>

    <td><p data-placement="top" data-toggle="tooltip" title="Edit">
        <a  href="MangamenrUser.php?id=<?php echo $un['stu_id']?>" name="idet"  class="btn btn-primary btn-xs" >
            <span class="glyphicon glyphicon-pencil">
            </span>
        </a></p>
        </td>
  <td><p  title="Delete"><a href="#" onclick="Delete(<?php echo $un['stu_id']; ?>)" data-placement="top"  data-toggle="modal" data-target="tooltip" name="del" class="btn btn-danger btn-xs" ><span class="glyphicon glyphicon-trash"></span></a></p></td>
    </tr>
      <?php
          // $i=$i+1;
 } ?>
  </tbody>
 </table>
  </div>
 </div>
	</div>
</div>
<?php }?>
<?php
 if(!isset($_POST['upd1'])){
if(isset($_GET['id'])){
      $ID= $_GET['id'];
     error_reporting(E_ALL ^ E_NOTICE);


               $result=mysqli_query($conn,"SELECT * FROM student s,stu_spec sp   where s.stu_id=sp.stu_id and s.stu_id='$ID' ");
               //echo "$u";
              $i=0;
              while ($S=mysqli_fetch_array($result)){

                ?>

    <a href="MangamenrUser.php" class="btn btn btn-success navbar-left" style=" margin-bottom: 5px; margin-top: 5px">رجوع</a>
<form action="MangamenrUser.php?id&sti_is=<?php echo $S['stu_id']?>" method="post" enctype="multipart/form-data" >
<style>
            
   .art_bg{ margin-top: 60px;
    
    }
            
          </style>
	<div class="row" style="margin-bottom: 20px; margin-right:-10px; margin-left: 20px " >
   <div class="form-group" >
   <label >الاسم</label>
       <input class="form-control " name="stud_name" type="text" placeholder="الاسم" value="<?php echo $S['stud_name']?>" >
        </div>
          <div class="form-group">
        <label>تاريخ التسجيل</label>
        <input class="form-control" name="date_register" type="text" placeholder="تاريخ التسجيل" 
               value="<?php echo $S['date_register']?> ">
        </div>
  <?php
       	echo "   <div class='form-group'>   ";
	echo "     <div class='radio'>   ";
    echo "      <label for='text'>الجنس : </label>   ";
           if ( $S['gender'] ==Male) {

 		echo "      <label><input    type='radio' name='gender' value='Male'    checked >ذكر</label>  ";
	    echo "       <label><input    type='radio' name='gender'  value='Female'> انثى</label>   ";
 }else {
 		echo "      <label><input type='radio' name='gender' value='Male'  >ذكر</label>   ";
 		echo "       <label><input type='radio' name='gender'  value='Female'    checked >انثى</label>   ";
 	}

	echo "     </div>   ";
  	echo "     </div>   ";


           ?>
  <div class="form-group">
        <label>مكان الميلاد</label>
        <input class="form-control" name="loc_brith" type="text" placeholder="مكان الميلاد" value="<?php echo $S['loc_brith']?> ">
        </div>
  <div class="form-group">
        <label>تاريخ الميلاد</label>
        <input class="form-control" name="date_brith" type="text" placeholder="تاريخ الميلاد" value="<?php echo $S['date_brith']?> ">
        </div>
 <div class="form-group">
        <label>  المحافظة</label>
        <input class="form-control" name="city" type="text" placeholder="المحافظة  " value="<?php echo $S['city']?> ">
        </div>
 <div class="form-group">
        <label >صورة الطالب</label>
        <input class="form-control "name="image" type="file" placeholder=" صورة الطالب">
        </div>
  <div class="form-group">
        <label>رقم الجوال</label>
        <input class="form-control "name="phone" type="text" placeholder="رقم التلفون" value="<?php echo $S['phone']?> ">
        </div>
  <div class="form-group" id="mm">
          <label for="country">الجنسـية</label>
          <select class="form-control" id="country" name="id_nationality">
            <?php  error_reporting(E_ALL ^ E_NOTICE);
              $uf=mysqli_query($conn,"SELECT * FROM `nationality` ");
              while ($unf=mysqli_fetch_assoc($uf)){
                echo('<option value="'.$unf['id_nationality'].'"'.($S['id_nationality']==$unf['id_nationality']?'selected':'').'>'.$unf['nationName'].'</option> ');
                }
              ?>
          </select>

        </div>

         <div class="form-group">
        <label>البريد الالكتروني</label>
        <input class="form-control "name="Email" type="text" placeholder="الايميل" value="<?php echo $S['Email']?> ">
        </div>
            <div class="form-group">
        <label>رقم الهوية</label>
        <input class="form-control "name="id_document" type="text" placeholder="رقم الهوية" value="<?php echo $S['id_document']?> ">
        </div>
          <div class="form-group">
        <label>المعدل</label>
        <input class="form-control "name="average" type="text" placeholder="المعدل" value="<?php echo $S['average']?> ">
        </div>

     <div class="row mar_ned">
                                <div class="col-md-12 col-xs-12">
                                    <p align="right"><stong>الكلية</stong></p>
                                </div>
                                <div class="col-md-12 col-xs-12">
                                    <select name="col_id" id="col_id" class="dropselectsec">

                                           <?php  error_reporting(E_ALL ^ E_NOTICE);
              $uf=mysqli_query($conn,"SELECT * FROM `colia` ");
              while ($unf=mysqli_fetch_assoc($uf)){
                  echo('<option value="'.$unf['col_id'].'"'.($S['col_id']==$unf['col_id']?'selected':'').'>'.$unf['col_name'].'</option> ');
                }
              ?>
                                    </select>
                                </div>
                            </div>

                             <div class="row mar_ned">
                                <div class="col-md-12 col-xs-12">
                                    <p align="right"><stong>التخصص</stong></p>
                                </div>
                                <div class="col-md-12 col-xs-12">
                                    <select name="dept_id" id="dept_id" class="dropselectsec">
                                   
 
                                    </select>
                                </div>
                            </div>
  <div class="form-group" id="mm">
          <label for="country">حالة الطالب</label>
          <select class="form-control" id="country" name="sta_st_id">

               <?php  error_reporting(E_ALL ^ E_NOTICE);
               $uf=mysqli_query($conn,"SELECT * FROM `statuse_std` ");
                while ($unf=mysqli_fetch_assoc($uf)){
              echo('<option value="'.$unf['sta_st_id'].'"'.($S['sta_st_id']==$unf['sta_st_id']?'selected':'').'>'.$unf['sta_name'].'</option> ');

                 }
              ?>
                                    </select>

                          </div>



          <div class="modal-footer ">
        <input type="submit" class="btn btn-warning btn-lg " style="width: 100%;" name="upd" value="تعديل "><!--<span class="glyphicon glyphicon-ok-sign"></span>-->
        <!-- <input type="submit" class="btn btn-warning btn-lg " style="width: 30%;" name="upd2" value="2تعديل ">   -->
      </div>
      </div>
       </form>
       <?php }}}?>
            
      
 </article>
 <script src="jquery.main.js" type="text/javascript"></script>

<script>
   $(document).ready(function(){

    $("#col_id").change(function(){
      var col_id = this.value;
      $.ajax({
      url: "MangamenrUser.php",
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


<script src="js/dataTable/jquery-1.10.2.js"></script>    
	<script src="js/dataTable/jquery.dataTables.min.js"></script>
    
     
<script>
$(document).ready(function(){
  $("#student-Search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
       // Document.write("dsfsd");
    });
  });
});
</script>
   <script src="js/bootstjrap.js"></script>
    <!-- METISMENU SCRIPTS -->
    <script src="js/jqubery.metisMenu.js"></script>
       <!-- CUSTOM SCRIPTS -->
    <script src="js/customg1.js"></script>  
    
 <?php if(!$_POST['upd']){?>
  <?php
   //ubd dept student
   $col_id=$_POST['col_id'];         
 $query= "select * from dept where col_id='".$col_id."'  ";
$result= mysqli_query($conn,$query);

 while ($row= mysqli_fetch_array($result)) {
                echo('<option value="'.$row['dept_id'].'"'.($S['dept_id']==$row['dept_id']?'selected':'').'>'.$row['dept_name'].'</option> ');
              }
  ?> 
        <?php } ?>
  <?php
 include("footermo.php");
}else {
    redirect("index.php");
}
  ?>