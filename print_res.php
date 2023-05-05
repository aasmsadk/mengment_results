<?php 

session_start();
include("headermo.php");
   include_once('cnnectdb.php');
 include_once('functions.php');

?>

   
     
    <link href="static/cssrs/custom.css" rel="stylesheet" />
    <link href="static/css/datatable/datatable.css" rel="stylesheet" />
          <link href="css/datatable/datatable.css" rel="stylesheet" />
    <script src="js/jsrs/jquery-1.10.2.js"></script>	
    <script type='text/javascript' src='js/jsrs/jquery-ui-1.10.1.custom.min.js'></script>
    <script type="text/javascript" src="js/jsrs/jquery.validate.min.js"></script>
    <script src="js/jsrs/jquery.dataTables.min.js"></script>  
    <body onload="window.print();">
            <?php
if(isset($_GET['r']) && $_GET['r']=='1') 
{?>
     <div class=" " id="e"  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
           <h4 class="modal-title">اشـــعار بنتيجة الطالب</h4>
        </div>
          
        <div class="modal-body" id="formcontent">
        
   
<form class="form-horizontal" id ="signupForm1" action=" " method="post">
     <?php error_reporting(E_ALL ^ E_NOTICE);
        $resq= mysqli_query($conn,"SELECT * FROM student s,dept d,reg_yearstudy re,free_dept f  
        WHERE re.stu_id=s.stu_id and  d.dept_id=re.dept_id and re.dept_id=f.dept_id and re.stu_id='".$_GET['student']."' and re.TermS_id='".$_GET['term']."'   ");
                                           while ($ro1= mysqli_fetch_array($resq)) { ?>
    <div id="page-wrapper" style="margin: 0 0 0 0px;
    
      min-height: 0px">
           
            <div id="page-inner" style=" min-height: 0px; margin: 0px 0px 0px 0px;">

<div class="table-responsive">
               
<table class="table table-bordered">
<tr>
<th>الاسم الكامل</th>
<td><?php echo $ro1['stud_name']; ?></td>
<th>التخصص</th>
<td><?php echo $ro1['dept_name']; ?></td>
</tr>
<tr>
<th>الرقم الاكاديمي</th>
<td><?php echo $ro1['academic_number']; ?></td>
<th>الفصل الدراسي</th>
<td><?php echo $_GET['term']; ?> </td>
</tr>


</table>
</div>
    </div>
</div>
    
 <?php   } ?>
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
                                        $result= mysqli_query($conn,"SELECT * FROM `study_plan` st,`subject`su where st.`subject_id`=su.`subject_id` and  st.`TermS_id`='".$_GET['term']."' and st.dept_id='".$_GET['dept']."' ");
                                           while ($row= mysqli_fetch_array($result)) {  
                                                ?>
                                         <tr> <td><?php echo $row['SubjectName']; ?></td>
                                               <?php
                                        $result1= mysqli_query($conn,"SELECT * FROM `degry` WHERE `TermS_id`='".$_GET['term']."' and `subject_id`='".$row['subject_id']."' and `stu_id`='".$_GET['student']."'");
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
     
    </div>
  </div>
</form>
     </div>
       
      </div>
    </div>
  </div>
    <?php }?>    
        

 
        
    <?php
if(isset($_GET['r']) && $_GET['r']=='2') 
{?>
        
          <div class="" >
    <div class="">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">تقرير الرسوم</h4>
        </div>
        <div class="modal-body" id="formcontent">
        
      
        <?php
   $student=$_GET['st'];
    
//$classid=$_GET['classid'];

    $freedept_id=0;
    
     $result= mysqli_query($conn,"SELECT s.stud_name,d.dept_name,s.academic_number,s.date_register,max(re.classid) as classid,f.amount FROM student s,dept d,reg_yearstudy re,free_dept f  WHERE re.stu_id=s.stu_id and  d.dept_id=re.dept_id and re.dept_id=f.dept_id and re.stu_id='".$student."' ");
                                           while ($res= mysqli_fetch_array($result)) { 
                                               $freedept_id=$res['amount'];
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

    <?php }}?>
             </div>
        
      </div>
    </div>
  </div>     
                <?php } ?>
   
        
  