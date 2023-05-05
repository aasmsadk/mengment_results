<?php  
 session_start();
 

   include_once('cnnectdb.php');
 include_once('functions.php');
login_check();



if(isset($_POST['r']) && $_POST['r']=='1') 
{
    $student=$_POST['student'];
 $classid=$_POST['classid'];
 $year_id=$_POST['year_id'];
    $freedept_id=$_POST['freedept_id'];
    

    
    
    $result= mysqli_query($conn,"SELECT MIN(balance) as balance,stud_name FROM paid_fee p,student s  WHERE p.stu_id=s.stu_id and p.stu_id='".$student."' and p.classid='".$classid."' ");
                                           while ($res= mysqli_fetch_array($result)) {  
                                                ?> 
    

  <form class="form-horizontal" id ="signupForm1" action="student_fee.php" method="post">
 <input type="hidden"  name="year_id"  value="<?php echo $year_id; ?>" />
      <input type="hidden"  name="classid"  value="<?php echo $classid; ?>" />
  <div class="form-group">
    <label class="control-label col-sm-2" for="email">اسم الطالب</label>
    <div class="col-sm-10">
      <input type="text" class="form-control"    value="<?php echo $res['stud_name']; ?>"  disabled />
        <input type="hidden"  name="stu_id"   value="<?php echo $student; ?>"  />
    </div>
  </div>
  
   
  
  <div class="form-group">
    <label class="control-label col-sm-2" for="email">مجموع الرسوم</label>
    <div class="col-sm-10">
      <input type=" " class="form-control"     value="<?php echo $freedept_id; ?>"   disabled />
        <input type="hidden"  name="freedept_id"    value="<?php echo $freedept_id; ?>"   />
    </div>
  </div>
  
  
  <div class="form-group">
    <label class="control-label col-sm-2" for="email">الباقي</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" value="<?php echo $res['balance']; ?>"  disabled />
	  <input type="hidden" value="<?php echo $res['balance']; ?>" name="balance">
    </div>
  </div>
  
  
  <div class="form-group">
    <label class="control-label col-sm-2" for="email">ادخل المبلغ </label>
    <div class="col-sm-10">
      <input type="text" class="form-control" name="paid"  id="paid" required   />
    </div>
  </div>

  
  
   <div class="form-group">
    <label class="control-label col-sm-2" for="email">ملاحظة</label>
    <div class="col-sm-10">
      <textarea class="form-control" name="transcation_remark" id="transcation_remark" ></textarea>
    </div>
  </div>
 
 
 
 
 
  <div class="form-group"> 
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-info" style="border-radius:0%" name="save">دفع</button>
    </div>
  </div>
</form>

<script type="text/javascript">
$(document).ready( function() {
$("#submitdate").datepicker( {
        changeMonth: true,
        changeYear: true,
       
        dateFormat: "yy-mm-dd",
      
    });
	
	
///////////////////////////

//يمنع التسديد اكثر من المطلوب

$("#signupForm1").validate( {
				rules: {
					submitdate: "required",
					
					paid: {
						required: true,
						digits: true,
						max:$res['balance']
					}	
					
					
				},
				errorElement: "em",
				errorPlacement: function ( error, element ) {
					// Add the `help-block` class to the error element
					error.addClass( "help-block" );

					// Add `has-feedback` class to the parent div.form-group
					// in order to add icons to inputs
					element.parents( ".col-sm-10" ).addClass( "has-feedback" );

					if ( element.prop( "type" ) === "checkbox" ) {
						error.insertAfter( element.parent( "label" ) );
					} else {
						error.insertAfter( element );
					}

					
					if ( !element.next( "span" )[ 0 ] ) {
						$( "<span class=\'glyphicon glyphicon-remove form-control-feedback\'></span>" ).insertAfter( element );
					}
				},
				success: function ( label, element ) {
					if ( !$( element ).next( "span" )[ 0 ] ) {
						$( "<span class=\'glyphicon glyphicon-ok form-control-feedback\'></span>" ).insertAfter( $( element ) );
					}
				},
				highlight: function ( element, errorClass, validClass ) {
					$( element ).parents( ".col-sm-10" ).addClass( "has-error" ).removeClass( "has-success" );
					$( element ).next( "span" ).addClass( "glyphicon-remove" ).removeClass( "glyphicon-ok" );
				},
				unhighlight: function ( element, errorClass, validClass ) {
					$( element ).parents( ".col-sm-10" ).addClass( "has-success" ).removeClass( "has-error" );
					$( element ).next( "span" ).addClass( "glyphicon-ok" ).removeClass( "glyphicon-remove" );
				}
			} );


//////////////////////////	
	
	
	
});

</script>
<?php

}}
?>


<?php
if(isset($_POST['r']) && $_POST['r']=='2') 
{ ?>
 <form class="form-horizontal" id ="signupForm1" action=" " method="post">
     <?php error_reporting(E_ALL ^ E_NOTICE);
  $result32= mysqli_query($conn,"SELECT stud_name FROM student where stu_id='".$_POST['student']."'  ");
                                           while ($row32= mysqli_fetch_array($result32)) {  
                                     
                                               echo "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; اسم الطالب : ".$row32['stud_name'];}
 
                         echo "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp; الفصل الدراسي : ". $_POST['term']."<br><br>";
     
     ?>
            <table class="table table-bordered table-hover table-striped ">
                                    <thead>
                                        <tr>
                                            <th>المقرر </th>
                                            <th> درجة الحضور</th>
                                            <th> درجة المشاركة</th>
                                            <th>درجة الاختبار النصفي</th>
                                            <th>درجة العملي</th>
                                            <th>درجة الاختبار النهائي</th>
                                            <th>المجموع</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                          <?php
                      
                                          $ID=$_SESSION['admin_id1'];
                                        $result= mysqli_query($conn,"SELECT * FROM `study_plan` st,`subject`su where st.`subject_id`=su.`subject_id` and  st.`TermS_id`='".$_POST['term']."' and st.dept_id='".$_POST['dept']."' ");
                                           while ($row= mysqli_fetch_array($result)) {  
                                                ?>
                                         <tr> <td><?php echo $row['SubjectName']; ?></td>
                                               <?php
                                        $result1= mysqli_query($conn,"SELECT * FROM `degry` WHERE `TermS_id`='".$_POST['term']."' and `subject_id`='".$row['subject_id']."' and `stu_id`='".$_POST['student']."'");
                                           while ($row1= mysqli_fetch_array($result1)) {  
                                                ?> 
                                               <td><?php echo $row1['deg_perseverance']; ?></td>
                                             <td><?php echo $row1['deg_nashat']; ?></td>
                                             <td><?php echo $row1['deg_half']; ?></td>
                                             <td><?php echo $row1['deg_duties']; ?></td>
                                             <td><?php echo $row1['deg_final']; ?></td>
                                             <td><?php 
                                        $sum=$row1['deg_perseverance']+$row1['deg_duties'];
                                               $sum1=$sum+$row1['deg_nashat']+$row1['deg_half'];
                                               $sum2=$sum1+$row1['deg_final'];
                                                    
                                                    echo $sum2; ?></td>
                                             <?php } ?>
                                            
                                        </tr>
                                         
                                        <?php } ?>
                                                
                                     </tbody>
          </table>
 
  <div class="form-group"> 
    <div class="col-sm-offset-2 col-sm-10">
      <a  href="print_res.php?r=1&student=<?php echo $_POST['student']; ?>&dept=<?php echo $_POST['dept']; ?>&term=<?php echo $_POST['term']; ?>" class="btn btn-info" style="border-radius:0%" name="print">طباعة</a>
    </div>
  </div>
</form>

<?php 

} ?>

<?php
if(isset($_POST['r']) && $_POST['r']=='3') 
{
$typeuser=$_POST['typeuser'];

?>
<div id="tSort">
                                    
  <table class="table table-striped table-bordered table-hover" id="tSortable22">                                  
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
                                     (SELECT    MIN(TermS_id) as TermS_id FROM `term_study` GROUP BY classid) tr,
                                     reg_yearstudy re,
                                     student s,dept d ,free_dept f ,class cs
                                     
                                     where re.stu_id=s.stu_id and re.TermS_id=tr.TermS_id  and  d.dept_id=re.dept_id and re.dept_id=f.dept_id and re.classid='".$typeuser."' 
                                     and re.classid=cs.classid");

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
    </div>
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
    });
  });
});
</script>

<?php } 

//تقرير برسوم الطالب
if(isset($_POST['r']) && $_POST['r']=='4' ) 
{
   $student=$_POST['student'];
 $classid=$_POST['classid'];
 $year_id=$_POST['year_id'];
    $freedept_id=$_POST['freedept_id'];
    
     $result= mysqli_query($conn,"SELECT s.stud_name,d.dept_name,s.academic_number,s.date_register,max(re.classid) as classid,f.amount FROM student s,dept d,reg_yearstudy re,free_dept f  WHERE re.stu_id=s.stu_id and  d.dept_id=re.dept_id and re.dept_id=f.dept_id and re.stu_id='".$student."'  ");
                                           while ($res= mysqli_fetch_array($result)) {  
                                                ?>


<div id="page-wrapper" style="margin: 0 0 0 0px;
    
      min-height: 0px">
           
            <div id="page-inner" style=" min-height: 0px; margin: 0px 0px 0px 0px;">

<div class="table-responsive">
                <div class="col-md-12"><h1 class="page-head-line"> بيانات الطالب </h1></div>
<table class="table table-bordered">
<tr>
<th>اسم الطالب</th>
<td><?php echo $res['stud_name']; ?></td>
<th>التخصص</th>
<td><?php echo $res['dept_name']; ?></td>
</tr>
<tr>
<th>الرقم الاكاديمي</th>
<td><?php echo $res['academic_number']; ?></td>
<th>تاريخ الانضمام</th>
<td><?php echo $res['date_register']; ?> </td>
</tr>


</table>
</div>
    </div>
</div>
<?php } ?>



                <div id="page-wrapper" style="margin: 0 0 0 0px;
    padding: 15px 30px;
    min-height: 1200px;  min-height: 0px">
           
            <div id="page-inner"  style=" min-height: 0px; margin: 0px 0px 0px 0px;">

  <div class="col-md-12"><h1 class="page-head-line">تقارير برسوم السنوية </h1></div>

        <?php 
    $sql3="SELECT  * FROM  (SELECT    MIN(TermS_id) as TermS_id FROM `term_study` GROUP BY classid)  t , class c, reg_yearstudy re WHERE  re.classid=c.classid and re.TermS_id=t.TermS_id and  re.stu_id='".$student."'";
    
                                               $result3= mysqli_query($conn,$sql3);
                                           while ($res3= mysqli_fetch_array($result3)) {  
                                                
                
    $sql1 = "SELECT sum(`amuont`) as totalpaid,MIN(balance) as balanc,MAX(`paid_id`) as paid_id ,classid FROM `paid_fee`WHERE `stu_id` = '".$student."' and classid='".$res3['classid']."' ";
     $result1= mysqli_query($conn,$sql1);
                                           while ($res1= mysqli_fetch_array($result1)) {  
                                                ?>
                
<table class="table " >
    
    
<tr style="background: silver">
<th style="text-align: end">المستوى :</th><td><?php echo $res3['ClassName']; ?></td>

<th style="text-align: end"> اجمالي الرسوم:</th><td><?php echo $freedept_id; ?></td>

<th style="text-align: end"> المبلغ المدفوع :</th><td><?php echo $res1['totalpaid']; ?></td>
    
<th style="text-align: end">الباقي : </th><td><?php echo $res1['balanc']; ?></td>
</tr>
</table>
                
                

 
<div class="table-responsive">    
<table class="table table-striped table-bordered table-hover">
    <thead>
      <tr>
        <th>التاريخ</th>
        <th>المبلغ المدفوع</th>
        <th>ملاحظات</th>
      </tr>
    </thead>
  <?php
    $sq="SELECT * FROM paid_fee  WHERE stu_id='".$student."' and classid='".$res1['classid']."'";
    
                 $result2= mysqli_query($conn,$sq);
                                           while ($res2= mysqli_fetch_array($result2)) {  
                                            if($res2['amuont']!=0) {     
                
                ?>
    <tbody>
        <tr>
        <td><?php echo $res2['date_paid']; ?></td>
        <td><?php echo $res2['amuont']; ?></td>
        <td><?php echo $res2['notice']; ?></td>
      </tr> 
    </tbody>
 <?php }} ?>
  </table>
    
              
 </div> 

    <?php }} ?>
  <div class="form-group"> 
    <div class="col-sm-offset-2 col-sm-10">
      <a  href="print_res.php?r=2&st=<?php echo $_POST['student']; ?>" class="btn btn-info"  name="print">طباعة</a>
    </div>
  </div>
<?php


 }

?>
                <?php 
                if(isset($_POST['r']) && $_POST['r']=='del') {
                
                ?>
                <form action="" method="post">
                 <div class="modal-footer"  style="margin:0px; border-top:0px; text-align:center;">
                     <input type="hidden" id="stu" name="stu" value="<?php echo $_POST['stu']; ?>" />
                    <button type="submit" name="delete"  class="btn btn-danger" id="delete_link">Delete</button>
                    <button type="button" class="btn btn-info" data-dismiss="modal">Cancel</button>
                </div>
                    </form>
                <?php }?>
                
                
                   <?php if(isset($_POST['r']) && $_POST['r']=='del_subject') {?>
                <form action="" method="post">
                 <div class="modal-footer"  style="margin:0px; border-top:0px; text-align:center;">
                     <input type="hidden" id="subject_id" name="subject_id" value="<?php echo $_POST['subject_id']; ?>" />
                    <button type="submit" name="delete_subject"  class="btn btn-danger" id="delete_link">Delete</button>
                    <button type="button" class="btn btn-info" data-dismiss="modal">Cancel</button>
                </div>
                    </form>
                <?php }?>
                
                
             <?php
                if(isset($_POST['r']) && $_POST['r']=='up_sub') {
                $subject_id=$_POST['subject_id'];
    	 $result=mysqli_query($conn,"SELECT * FROM subject where subject_id='".$subject_id."' ");
                                                   while($un=mysqli_fetch_array($result)){
                ?>    
                  <div role="tabpanel" class="tab-pane" id="profile">
<div class="container-fluid mypad">
 <form action='mang_subject.php' method='post'>
  <div class="form-group">
    <label  >SubjectName:</label>
    <input type="text" class="form-control" name="SubjectName" value="<?php echo $un['SubjectName']; ?>">
      <input type="hidden"  name="subject_id" value="<?php echo $un['subject_id']; ?>">
  </div>
  <div class="form-group">
    <label  >namber_hors:</label>
    <input type="namber" class="form-control" name="namber_hors" value="<?php echo $un['namber_hors']; ?>">
  </div>
     

   <input type="submit" name="up_subject" class="btn btn-info btn-info-full " value="تعديل"/>
 <!-- <button type="submit" class="btn btn-info" name="submit">Submit</button> -->
</form>
</div>
</div>
                <?php }}?>
                
             
    <?php 
                if(isset($_POST['r']) && $_POST['r']=='up_emp') {
      ?>    
      <div role="tabpanel" class="tab-pane" id="profile">
<div class="container-fluid mypad" style="font-size: 20px;">
 <form action='' method='post'>
  <div class="form-group">
    <label  >كلمة المرور:</label>
    <input type="text" class="form-control" name="password" required>
      
  </div>
  <div class="form-group">
    <label  >اعادة كلمة المرور</label>
    <input type="namber" class="form-control" name="repassword" required >
  </div>
     
<div class="container" style="width: fit-content;" >
   
   <button style="font-size: 20px;" type="submit" name="up_pass_emp" class="btn btn-info btn-info-full " >تعديل </button>
     <button style="font-size: 20px;" type="button" class="btn" data-dismiss="modal">Cancel</button>
    </div>
 <!-- <button type="submit" class="btn btn-info" name="submit">Submit</button> 
</form>
</div>
</div> 
                <?php  }?>
                
                
                
                
                