<?php session_start(); ?>
<?php  error_reporting(E_ALL ^ E_NOTICE);
    include_once("headermo.php");
  include_once('cnnectdb.php');
  include_once('functions.php');
  include_once('session.php');
  include_once('navbar.php');
login_check ();
if($_SESSION['type_user']=="Admin"){
 $errormsg='';


    if(isset($_POST['up_subject'])){
        
        $sql2 = "update  subject set SubjectName='".$_POST['SubjectName']."',namber_hors='".$_POST['namber_hors']."'  where  subject_id='".$_POST['subject_id']."' ";
mysqli_query($conn,$sql2);
         echo "  
              <div class='alert alert-success alert-autocloseable-success'>
        			تم التعديل بنجاح 
				</div>
                 ";
        
    }
      if(isset($_POST['delete_subject'])){
              $D=$_POST['subject_id'];
           $delet="DELETE FROM `subject` WHERE `subject_id`='$D'";
           mysqli_query($conn,$delet);
              echo "  
              <div class='alert alert-success alert-autocloseable-success'>
        			تم الحذف  بنجاح 
				</div>
                 ";
          }
     if(isset($_POST['add_subject'])){
              $namber_hors=$_POST['namber_hors'];
          $SubjectName=$_POST['SubjectName'];
         
           $add="INSERT INTO `mohammed`.`subject` (`SubjectName`,`namber_hors`)
   VALUES (

    '$SubjectName',
          ' $namber_hors'
                )";
           mysqli_query($conn,$add);
              echo "  
              <div class='alert alert-success alert-autocloseable-success'>
        			تم الاضافة بنجاح
				</div>
                 ";
          }
    
   
 ?>
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

            <script>
  function Delet(subject_id)
{

$.ajax({
            type: 'post',
            url: 'getfeeform.php',
            data: {
               subject_id:subject_id, 
                r:'del_subject'},
            success: function (data) {
              $('#formconten').html(data);
			  $("#tooltip").modal({backdrop: "static"});
            }
          });


}

</script>  
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
   
    <link href="static/css/datatable/datatable.css" rel="stylesheet" />
          
             <div class="modal fade" id="tooltip" role="dialog">
    <div class="modal-dialog modal-lg">
   <div class="modal-content" style="margin-top:100px;">
                
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" style="text-align:center;">هل تريد الحذف بالتاكيد ؟</h4>
                </div>
                <div id="formconten">
               
                 </div>
            </div>
    </div>
  </div>
  <div class="modal fade" id="e" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" style="color:red;">&times;</button>
          <h4 class="modal-title">تعديل المادة</h4>
        </div>
        <div class="modal-body" id="formcontent">
        
        </div>
        
      </div>
    </div>
  </div>
  <div class="modal fade" id="add" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" style="color:red;">&times;</button>
          <h4 class="modal-title">اضافة مادة</h4>
        </div>
        <div class="modal-body" id="f">
               <div role="tabpanel" class="tab-pane" id="profile">
<div class="container-fluid mypad">
    
 <form action='mang_subject.php' method='post'>
  <div class="form-group">
    <label  >SubjectName:</label>
    <input type="text" class="form-control" name="SubjectName" >
     
  </div>
  <div class="form-group">
    <label  >namber_hors:</label>
    <input type="namber" class="form-control" name="namber_hors" >
  </div>
     

   <input type="submit" name="add_subject" class="btn btn-info btn-info-full " value="اضافة"/>
 <!-- <button type="submit" class="btn btn-info" name="submit">Submit</button> -->
</form>
</div>
</div>
        
        </div>
        
      </div>
    </div>
  </div>

  
  <h1 class="text mypad1"  style="margin-top:-20px;">ادارة المواد</h1>
    <div class="container">
   <div class="row">
    <div class="col-md-4">
        
 </div>
 </div>
</div>
 
   <div id="page-wrapper" style="margin: 0 0 0 0px;
    padding: 15px 30px;
    min-height: 1200px;">
       
       <button   type="button" class="btn btn-primary pull-right"  data-toggle="modal" data-target="#add" name="submit">  
    	<i class="entypo-plus-circled"></i>
           اضافــة مادة جديدة &nbsp;  +</button>  
   
  
       
           
            <div id="page-inner">
               
				 
                <?php echo $errormsg; ?>
                
                

<div class="row" >
<div class="col-md-12">
    
<fieldset class="scheduler-border" >
    
<div class="form-inline" style="margin-bottom:0px; margin-top:20px;" >
 
  

  
 </div>
</fieldset>

</div>
</div>


		
		<div class="panel panel-default">
                        <div class="panel-heading">
                            
         <div class="form-inline" style="margin-bottom:0px; margin-top:20px;" >

  <div class="form-group">
    <label for="email">اسم المقرر</label>
    <input type="text" class="form-control" id="student-Search" name="student-Search">
  </div>
 
                        
  
 </div>   
                        </div>
            
                        <div class="panel-body">
                            <div class="table-sorting table-responsive " id="subjectresult">
                                
                                  
                               
                                <table class="table table-striped table-bordered table-hover" id="table22" >

                                    <thead>
                                        <tr>
                                          
                                            <th>رقم</th> 
                                            <th> رمز المادة</th>
                                            <th>اسم المادة</th>
											<th>عدد الساعات</th>
                                            <th>تعديل</th>
											<th>حذف</th>
                                        </tr>
                                    </thead>
                                    <tbody id="myTable">
                                        
                                   <?php  error_reporting(E_ALL ^ E_NOTICE);
									 $result=mysqli_query($conn,"SELECT * FROM subject ");

                                                        $i=1;
                                        $cunt=1;
                                                   while($un=mysqli_fetch_array($result)){
                                                  $i=$un['subject_id']; 
                                                     
							                                 ?>		
						                             <tr>          
                                             <td><?php echo $cunt++; ?></td>
                                         <td><?php echo $un['subject_id']; ?></td> 
											<td><?php echo $un['SubjectName']; ?></td>
                                             <td><?php echo $un['namber_hors']; ?></td>
   
                                                         
  <td><p title="update">                               
<a href="#" onclick="GetFeeFor(<?php echo $un['subject_id'];?>)" 
   data-toggle="modal" data-target="#e" class="btn btn-success btn-sm" >
<span class="glyphicon glyphicon-pencil">
    </span> تعديل </a></p>
      
                                                         </td>        
  <td> <p title="Delete"><a href="#" onclick="Delet(<?php echo $un['subject_id']; ?>)" data-placement="top"  data-toggle="modal" data-target="tooltip"    name="del" class="btn btn-danger btn-sm" >
      <span class="glyphicon glyphicon-trash"></span> حذف</a></p> 
  </td> 
                                                         
                       <?php 	}   ?>  
                              </tbody>
                                       
                                </table>

                
                                       
                            </div>
             </div>
                 </div>
             </div>
            <!-- /. PAGE INNER  -->
        </div>
 


 <script>
  function GetFeeFor(subject_id)
{

$.ajax({
            type: 'post',
            url: 'getfeeform.php',
            data: {
                subject_id:subject_id,
               
           
                r:'up_sub'},
            success: function (data) {
              $('#formcontent').html(data);
			  $("#e").modal({backdrop: "static"});
            }
          });


}

</script>
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




    <!-- METISMENU SCRIPTS -->
     <!-- METISMENU SCRIPTS -->
    <script src="js/jqubery.metisMenu.js"></script>
       <!-- CUSTOM SCRIPTS -->
    <script src="js/customg1.js"></script>   


    <script src="js/jquery/jquery-2.2.4.min.js"></script>

        <!-- <script src="js/bootstrap/bootstrap.min.js"></script>-->

       <script src="js/lobipanel/lobipanel.min.js"></script>

        <!-- ========== THEME JS ========== -->
<script src="js/main.js"></script>
        <script src="js/jquery-1.10.2.js"></script>    
	<script src="js/dataTable/jquery.dataTables.min.js"></script>

     <script>
         $(document).ready(function () {
             $('#table22').dataTable({
    "bPaginate": true,
    "bLengthChange": true,
    "bFilter": false,
    "bInfo": true,
    "bAutoWidth": true });
	
         });
		 
	
    </script>
    

     <script src="js/bootstrap.min.js"></script>
     

 <?php
//include("footermo.php");
}else {
    redirect("index.php");
}
?>



