<?php  
session_start();
include("headermo.php");
   include_once('cnnectdb.php');
  include_once('navbar.php'); 
 include_once('functions.php');
login_check();

if($_SESSION['type_user']=="Admin" || $_SESSION['type_user']=="employee" ){


$errormsg= '';
if(isset($_POST['save']))
{
 $amuont=$_POST['paid'];
 $transcation_remark =$_POST['transcation_remark'];    
 $stu_id=$_POST['stu_id'];
 $classid=$_POST['classid'];
 $year_id=$_POST['year_id'];
 $freedept_id=$_POST['freedept_id'];
 $balance=$_POST['balance'];
    
   
    $freedept_id_temp=0;
    $rf= mysqli_query($conn,"SELECT * FROM `free_dept` WHERE `amount`='".$freedept_id."'");
                                           while ($resf= mysqli_fetch_array($rf)) {
                                               $freedept_id_temp=$resf['freedept_id'];
                                           }

$result= mysqli_query($conn,"SELECT MIN(balance) as balance,MAX(`paid_id`) as paid_id FROM paid_fee  WHERE stu_id='".$stu_id."' and classid='".$classid."'  ");
                                           while ($res= mysqli_fetch_array($result)) {                                                
if($res['balance']>0 && $amuont<=$res['balance'])
{
$sql = "insert into paid_fee (stu_id,classid,year_id,amuont,balance,notice,freedept_id)
           values('".$stu_id."','".$classid."','".$year_id."','".$amuont."','".$balance."','".$transcation_remark."','".$freedept_id_temp."')";
  $r=mysqli_query($conn,$sql);
  
$sql1 = "SELECT sum(`amuont`) as totalpaid,MIN(balance) as balanc,MAX(`paid_id`) as paid_id FROM `paid_fee`WHERE `stu_id` = '".$stu_id."' and classid='".$classid."'";
$tpq=mysqli_query($conn,$sql1);
    while ($res1= mysqli_fetch_array($tpq)) {
$totalpaid = $res1['totalpaid'];
$tbalance = $balance - $amuont;

$sql2 = "update paid_fee set balance='$tbalance' where  balance='".$res1['balanc']."' and paid_id='".$res1['paid_id']."' ";
mysqli_query($conn,$sql2);

 //echo '<script type="text/javascript">window.location="student_fee.php?act=1";</script>';
    }
    $errormsg = "  
              <div class='alert alert-success alert-autocloseable-success'>
        			تم دفع الرسوم بنجاح 
				</div>
                 ";

}else{
   $errormsg =  
              "<div class='alert alert-danger alert-autocloseable-danger'>
        			لم يتم دفع الرسوم لان الرسوم المتوجب دفعة :اكثر من المستحق     
				</div>
                 "; 
    
 } 


}}
if(isset($_REQUEST['act']) && @$_REQUEST['act']=="1")
 
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
          <h4 class="modal-title">دفع رسوم  الطالب</h4>
        </div>
        <div class="modal-body" id="formcontent">
        
        </div>
        
      </div>
    </div>
  </div>
    <div id="page-wrapper" style="margin: 0 0 0 0px;
    padding: 15px 30px;
    min-height: 1200px;">
           
            <div id="page-inner">
                <div class="row">
                    <div class="col-md-12">
                        <h1 class="page-head-line">الطلاب الذين يجب عليهم دفع الرسوم  
						
						</h1>

                    </div>
                </div>
				 
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
    <label for="email">اسم الطالب</label>
    <input type="text" class="form-control" id="student-Search" name="student-Search">
  </div>
 
  
 
     
     <div class="form-group"    >
          <label for="country" >اختر المستوى الدراسي </label>
          <select class="form-control"   id="typeuser"  name="typeuser" style="width:250px" >

            <option value="">اختر المستوى الدراسي</option>
              
               <?php  error_reporting(E_ALL ^ E_NOTICE);

              $uf=mysqli_query($conn,"SELECT * FROM  class ");
              while ($unf=mysqli_fetch_assoc($uf)){
                ?>
                <option  value="<?PHP echo $unf["classid"]; ?>"> <?PHP echo $unf["ClassName"] ;} ?> </option>
             
          </select>

           </div>                       
  
 </div>   
                        </div>
            
                        <div class="panel-body">
                            <div class="table-sorting table-responsive " id="subjectresult">
                                
                                    <div id="tSort" >
                                    <?php

                                    if(!isset($_POST['typeuser'])) 
                                    {
                                    ?>
                                <table class="table table-striped table-bordered table-hover" id=" ">

                                    <thead>
                                        <tr>
                                          
                                            <th>الاسم/الطالب</th>                                            
                                            <th>القسم</th>
											<th>المبلغ المستحق</th>
                                            <th>المستوى</th>
											<th>تسديد الرسوم</th>
                                        </tr>
                                    </thead>
                                    <tbody id="myTable">
                                        
                                   <?php  error_reporting(E_ALL ^ E_NOTICE);
									 $result=mysqli_query($conn,"SELECT * FROM
                                     (SELECT `Reg_yearid`, `year_id`, `stu_id`, `TermS_id`, `date_register`, `freedept_id`, `dept_id` , MAX(classid) as classid FROM `reg_yearstudy` GROUP BY stu_id) re,
                                     student s,dept d ,free_dept f ,class cs
                                     
                                     where re.stu_id=s.stu_id and  d.dept_id=re.dept_id and re.dept_id=f.dept_id and re.classid=cs.classid ");

                                                        $i=1;
                                                   while($un=mysqli_fetch_array($result)){
                                                  $i=$un['stu_id']; 
                                                     
							                                 ?>		
						                             <tr>          
											<td><?php echo $un['stud_name']; ?></td>
                                             <td><?php echo $un['dept_name']; ?></td>
                                             <td><?php echo $un['amount']; ?></td> 
                                            <td><?php echo $un['ClassName']; ?></td>
  <td>
                                  
<a href="#" onclick="GetFeeForm(
                     <?php echo $un['stu_id'];?>,
                     <?php echo $un['classid'];?>,
                     <?php echo $un['year_id'];?>,
                     <?php echo $un['amount'];?>)" 
   data-toggle="modal" data-target="#e" class="btn btn-success btn-sm" style="border-radius:0%">
<i class="fa fa-money"></i> دفع الرسوم  </a>
  </td>        
                       <?php 	}   ?>  
                              </tbody>
                                       
                                </table>

                                   <?php 	}
                                     if(isset($_POST['typeuser'])) 
                                    {
                                          ?>
                                    <div id="tSort">
                                    
                                    </div>
                                    
                                    <?php }
                                    ?> 
                                         </div>
                            </div>
             </div>
                 </div>
             </div>
            <!-- /. PAGE INNER  -->
        </div>
 
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
                r:'1'},
            success: function (data) {
              $('#formcontent').html(data);
			  $("#e").modal({backdrop: "static"});
            }
          });


}

</script>
 <script>
   $(document).ready(function(){

    $("#typeuser").change(function(){
      var typeuser = this.value;
      $.ajax({
      url: "getfeeform.php",
      type: "POST",
      data: {
      typeuser: typeuser,r:3
      },
      cache: false,
      success: function(data){
        $("#tSort").html(data);

      }
      });
    });
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
<?php 
}else {
    redirect("index.php");
}
?>