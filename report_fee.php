<?php   session_start();
include("headermo.php");
 include_once('cnnectdb.php');
  include_once('navbar.php'); 
include_once('functions.php');
  
login_check();
if($_SESSION['type_user']=="Admin" || $_SESSION['type_user']=="employee" ){


 ?>
   
    <link href="static/cssrs/custom.css" rel="stylesheet" />
    <link href="static/css/datatable/datatable.css" rel="stylesheet" />
    <link href="css/datatable/datatable.css" rel="stylesheet" />
  <link href="static/cssrs/basic.css" rel="stylesheet" />
    <script type='text/javascript' src='js/jsrs/jquery-ui-1.10.1.custom.min.js'></script>
    <script type="text/javascript" src="js/jsrs/jquery.validate.min.js"></script>
    

	<!-- Modal -->
  <div class="modal fade" id="e" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" style="color:red;">&times;</button>
          <h4 class="modal-title">التقارير</h4>
        </div>
        <div class="modal-body" id="formcontent">
        
        </div>
        
      </div>
    </div>
  </div>
    <div id="page-wrapper" style="margin: 0 0 0 0px;
    padding: 15px 30px;
    min-height: 1200px;  min-height: 785px">
           
            <div id="page-inner" style=" min-height: 0px  ">
                <div class="row">
                    <div class="col-md-12">
                        <h1 class="page-head-line">تقارير برسوم الطلاب 
						
						</h1>

                    </div>
                </div>
			 
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
    <label for="email">اسم الطالب</label>
    <input type="text" class="form-control" id="student-Search" name="student-Search">
  </div>
   </div>   
                        </div>
            
                        <div class="panel-body">
                            <div class="table-sorting table-responsive " id="subjectresult">
                                
                                    
                                <table class="table table-striped table-bordered table-hover" id="tSortable22">

                                    <thead>
                                        <tr>
                                          
                                            <th>الاسم/الطالب</th>                                            
                                            <th>القسم</th>
											<th>المبلغ المستحق</th>
                                            <th>المستوى</th>
											<th>التقرير</th>
                                        </tr>
                                    </thead>
                                    <tbody id="myTable">
                                        
                                   <?php  error_reporting(E_ALL ^ E_NOTICE);
									 $result=mysqli_query($conn,"SELECT * FROM
                                     (SELECT `Reg_yearid`, `year_id`, `stu_id`, `TermS_id`, `date_register`, `freedept_id`, `dept_id` , MAX(classid) as c FROM `reg_yearstudy` GROUP BY stu_id) re,
                                     student s,dept d ,free_dept f
                                     
                                     where re.stu_id=s.stu_id and  d.dept_id=re.dept_id and re.dept_id=f.dept_id  ");

                                                        $i=1;
                                                   while($un=mysqli_fetch_array($result)){
                                                  $i=$un['stu_id']; 
                                                     
							                                 ?>		
						                             <tr>          
											<td><?php echo $un['stud_name']; ?></td>
                                             <td><?php echo $un['dept_name']; ?></td>
                                             <td><?php echo $un['amount']; ?></td> 
                                            <td><?php echo $un['c']; ?></td>
                              <td>
                                  
<a href="#" onclick="GetFeeForm(
                     <?php echo $un['stu_id'];?>,
                     <?php echo $un['c'];?>,
                     <?php echo $un['year_id'];?>,
                     <?php echo $un['amount'];?>)" 
   data-toggle="modal" data-target="#e" class="btn btn-success btn-sm" style="border-radius:0%">
<i class="fa fa-money"></i> عرض التقرير  </a>
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

                 <script src="js/jquery-1.10.2.js"></script>    
	<script src="js/dataTable/jquery.dataTables.min.js"></script>

   <script>
  function GetFeeForm(sid,classid,year_id,freedept_id)
{

$.ajax({
            type: 'post',
            url: 'getfeeform.php',
            data: {
                student:sid,
                classid:classid,
                year_id:year_id,
                freedept_id:freedept_id,
                r:'4'},
            success: function (data) {
              $('#formcontent').html(data);
			  $("#e").modal({backdrop: "static"});
            }
          });


}

</script>



  <script>
         $(document).ready(function () {
             $('#tSortable22').dataTable({
    "bPaginate": true,
    "bLengthChange": false,
    "bFilter": false,
    "bInfo": false,
    "bAutoWidth": true });
	
         });
		 
	
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

    <script src="js/bootstrap.js"></script>
    <!-- METISMENU SCRIPTS -->
    <script src="js/jquery.metisMenu.js"></script>
       <!-- CUSTOM SCRIPTS -->
    <script src="js/custom1.js"></script>  
    
</body>
</html>

<?php }else {
    redirect("index.php");
} ?>