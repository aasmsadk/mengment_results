<?php  
session_start();
include("headermo.php");
include_once('cnnectdb.php');
  include_once('navbar.php'); 
 include_once('functions.php');
login_check();

if($_SESSION['type_user']=="Admin" || $_SESSION['type_user']=="employee" ){

?>
 	 
   <style>
	h1{
		text-align: center;
	}
	h4{
		text-align: center;
	}
   </style>
    
    
    <title>  عرض نتائج الطلاب</title>
     
    <link href="static/cssrs/custom.css" rel="stylesheet" />
    <link href="static/css/datatable/datatable.css" rel="stylesheet" />
          <link href="css/datatable/datatable.css" rel="stylesheet" />
    <script src="js/jsrs/jquery-1.10.2.js"></script>	
    <script type='text/javascript' src='js/jsrs/jquery-ui-1.10.1.custom.min.js'></script>
    <script type="text/javascript" src="js/jsrs/jquery.validate.min.js"></script>
    <script src="js/jsrs/jquery.dataTables.min.js"></script>  
    
     <div class="modal fade" id="e" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" style="color:red;">&times;</button>
          <h4 class="modal-title">اشـــعار بنتيجة الطالب</h4>
        </div>
          
        <div class="modal-body" id="formcontent">
        
        </div>
        
      </div>
    </div>
  </div>
<!--
<div class="row" style="margin-bottom:20px;">
<div class="col-md-12">
<fieldset class="scheduler-border" >
    <legend  class="scheduler-border">ابحث :</legend>
<form class="form-inline" role="form" id="searchform">
   
    <div class="form-group">
    <label for="email"> الكلية </label>
     
      <select name="col_id" id="col_id" class="form-control">
         
               
                            
                  <option value="">اختار الكلية</option>
                  <?php 
                    $query= "select * from colia order by col_name ASC";
                     $result= mysqli_query($conn,$query);
                     while ($row= mysqli_fetch_array($result)) { ?>
                  <option value="<?php echo $row['col_id']; ?>"><?php echo $row['col_name'] ?></option>
                  <?php }  ?>
               </select>   
        
        
        
  </div>
   <div class="form-group">
   <select name="dept_id" class="form-control" id="dept_id">
                              
                 
 
                  <option value="">اختار القسم</option>
                              
                             
               </select>
   
  
    </div>
    
    <div class="form-group">
   <select name="dept_id" class="form-control" id="dept_id">
                              
                 
 
                  <option value=""> اختار المستوى</option>
                              
                             
               </select>
   
  
    </div>
    
  
   <button type="button" class="btn btn-success btn-sm" style="border-radius:0%" id="find" > ابحث </button>
  <button type="reset" class="btn btn-danger btn-sm" style="border-radius:0%" id="clear" > الغاء </button>
</form>
</fieldset>

</div>
</div>  -->

  	<div id="wrapper">
        <div id="page-wrapper">
            <div id="page-inner">
 <div class="panel panel-default" style="margin-top:40px;">
                        <div class="panel-heading">
                           <h4> جدول النتائج  </h4>
                        </div>
                        <div class="panel-body">
                            <div class="table-sorting table-responsive">
                                <table class="table table-striped table-bordered table-hover" id="tSortable22">
                                    <thead>
                                        <tr>
                                            <th>الاسم </th>
											<th>الكلية</th>
                                            <th>القسم</th>
                                          <th>اظهار النتيجة</th>
                                        </tr>
                                    </thead>
                                    <tbody>
         </div>
                           
           
        </div>
       
    </div>
     <!-- BOOTSTRAP SCRIPTS -->
    <script src="js/bootstrap.js"></script>
    <!-- METISMENU SCRIPTS -->
    <script src="js/jquery.metisMenu.js"></script>
       <!-- CUSTOM SCRIPTS -->
    <script src="js/custom1.js"></script>                        
                               
			 <?php  error_reporting(E_ALL ^ E_NOTICE);
			 $result=mysqli_query($conn,"SELECT *FROM `student` s,`stu_spec` sp,`colia` c,dept d , nationality n , statuse_std ss where sp.stu_id=s.stu_id and c.col_id=sp.col_id
  and sp.dept_id=d.dept_id and s.id_nationality = n.id_nationality and s.sta_st_id=ss.sta_st_id");

             $i=1;
             while($un=mysqli_fetch_array($result)){
            $i=$un['stu_id'];  
							?>		
						  <tr>
                                           
							 <td><?php echo $un['stud_name']; ?></td>
                              <td><?php echo $un['col_name']; ?></td>
                               
                                            <td><?php echo $un['dept_name']; ?></td>
										 
											 <td>
   <div class="btn-group">
 <button type="button" class="btn btn-info btn-sm dropdown-toggle" data-toggle="dropdown">
Action <span class="caret"></span></button>
<ul class="dropdown-menu dropdown-default pull-right" role="menu">
                                        
                                        <!-- teacher EDITING LINK -->
    <?php
     $result1= mysqli_query($conn,"SELECT * FROM  reg_yearstudy r , student s where r.`stu_id`=s.`stu_id` and s.stu_id='".$un['stu_id']."' ");
                   while ($row1= mysqli_fetch_array($result1)) {  
    ?>
<li>
<a href="#" onclick="GetFeeForm(<?php echo $row1['stu_id']; ?>,<?php echo $row1['TermS_id']; ?>,<?php echo $row1['dept_id']; ?>)" data-toggle="modal" data-target="#e">
<i class="entypo-pencil"></i>Term <?php echo $row1['TermS_id']; ?> </a>
</li>
<li class="divider"></li>
    <?php } ?>
  
                                    </ul>
                                                 </div> </td>
  
                                    </ul>
                                </div>
									  </tr>		 
							 <?php 	} ?>
									
                                        
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                 <script src="js/jquery-1.10.2.js"></script>    
	<script src="js/dataTable/jquery.dataTables.min.js"></script>
    
     <script>
         $(document).ready(function () {
             $('#tSortable22').dataTable({
    "bPaginate": true,
    "bLengthChange": true,
    "bFilter": true,
    "bInfo": true,
    "bAutoWidth": true });
	
         });
		 
	
    </script>
<script>
    
function GetFeeForm(sid,term,dept)
{

$.ajax({
            type: 'post',
            url: 'getfeeform.php',
            data: {student:sid,
                   dept:dept,
                   term:term,r:'2'},
            success: function (data) {
              $('#formcontent').html(data);
			  $("#e").modal({backdrop: "static"});
            }
          });


}

</script>     
    
  



		
				
				
            
            </div>
            <!-- /. PAGE INNER  -->
        </div>
        <!-- /. PAGE WRAPPER  -->
    </div>
    <!-- /. WRAPPER  -->
 <?php
}else {
    redirect("index.php");
}
?>