<?php session_start(); ?>
<?php  error_reporting(E_ALL ^ E_NOTICE);
    include_once("headermo.php");
  include_once('cnnectdb.php');
  include_once('functions.php');
  include_once('session.php');
 include_once('navbar.php');
 
 
login_check();
if($_SESSION['type_user']=="Admin" || $_SESSION['type_user']=="employee" ){


 ?>
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
<html>

 <meta charset="utf-8">
   
    <meta  name="viewport" content="width=device-width, initial-scale=1">
    
     <h1 class="text mypad1"  style="margin-top:40px;">ترحيل الطلاب</h1>
    <div class="container">
   <div class="row">
    <div class="col-md-4">
      <?php
    $tw=0;
$sql = "SELECT * FROM
                    (SELECT `Reg_yearid`, max(`year_id`) as year_id , `stu_id`, max(`TermS_id`) as TermS_id, `date_register`, `freedept_id`, `dept_id` , MAX(classid) as classid FROM `reg_yearstudy` GROUP BY stu_id) re,
                     student s,dept d ,free_dept f ,student st ,class cs ,year_study ys
                                     
                      where re.stu_id=s.stu_id and  d.dept_id=re.dept_id and re.dept_id=f.dept_id and st.stu_id=re.stu_id  and re.classid=cs.classid and ys.year_id=re.year_id";
 $result = mysqli_query($conn,$sql);
   while($row=mysqli_fetch_assoc($result)){
       $tw=$row["TermS_id"];}
        if($tw%2==0){
    	?>
        
  <div role="tabpanel" class="tab-pane" id="profile">
<div class=" ">
 <form action='' method='post'>
  <div class="form-group">
    <label  >اسم العام الدراسي:</label>
    <input type="text" class="form-control" name="yname">
  </div>
  <div class="form-group">
    <label  >تاريخ بداية العام الدراسي:</label>
    <input type="text" class="form-control" name="ydate">
  </div>

<input type="submit" name="sub1" class="btn btn-primary btn-info-full " value="ترحيل"/>
     
 <!-- <button type="submit" class="btn btn-info" name="submit">Submit</button> -->
</form>
</div>
</div>
        <?php }else{?>
        
            <div role="tabpanel" class="tab-pane" id="profile">
<div class="container-fluid  ">
 <form action='' method='post'>
     <label><?php echo ("ترحيل الطلاب من الفصل الاول الى الفصل الثاني"); ?></label>

     <input type="submit" name="sub" class="btn btn-primary btn-info-full " value="ترحيل"/>
 <!-- <button type="submit" class="btn btn-info" name="submit">Submit</button> -->
</form>
</div>
</div>  
            
       <?php }
        
        ?>
        
        
 </div>
 </div>
</div>
 
   <div id="page-wrapper" style="margin: 0 0 0 0px;
    padding: 15px 30px;
    min-height: 1200px;">
      
            <div id="page-inner">
                <div class="row" >
<div class="col-md-12">
    
<fieldset class="scheduler-border" >
    
<div class="form-inline" style="margin-bottom:0px; margin-top:20px;" >
 
  

  
 
               
 
 
  
  <table class="table table-bordered">
    <thead>
      <tr>
        <th> الرقم الاكاديمي</th>
        <th>السنة الدراسية</th>
        <th>اسم الطالب</th>
           <th>المستوى</th>
           <th>الترم</th>
           <th>تاريخ التسجيل</th>
           <th>الرسوم</th>
           <th>القسم</th>
          
      </tr>
    </thead>
    <tbody>
 <?php
    $t=0;
$sql = "SELECT * FROM
                      (SELECT `Reg_yearid`, max(`year_id`) as year_id , `stu_id`, max(`TermS_id`) as TermS_id, `date_register`, `freedept_id`, `dept_id` , MAX(classid) as classid FROM `reg_yearstudy` GROUP BY stu_id) re,
                      student s,dept d ,free_dept f , class cs , year_study ys , term_study ts
                      where re.stu_id=s.stu_id and  d.dept_id=re.dept_id and re.dept_id=f.dept_id and re.classid=cs.classid and ys.year_id=re.year_id and ts.TermS_id=re.TermS_id ";
 $result = mysqli_query($conn,$sql);
   while($row=mysqli_fetch_assoc($result)){
       $t=$row["TermS_id"];
        
    	?>
       <tr>
       
         <td><?php echo  $row["academic_number"] ;  ?></td> 
        <td><?php echo  $row["year_name"] ;  ?></td>
        <td><?php echo  $row["stud_name"];  ?></td>
 <td><?php echo  $row["ClassName"];  ?></td>
            <td><?php echo  $row["Term_name"];  ?></td>
            <td><?php echo  $row["date_register"];  ?></td>
            <td><?php echo  $row["amount"];  ?></td>
            <td><?php echo  $row["dept_name"];  ?></td>
      </tr>
       <?php
   }
   
 
?>
    </tbody>
  </table>

    </div></fieldset>
    
    </div>


</div>
</div>
<!--add Subject -->

  <?php
   if (isset($_POST["sub"])) {
       if($t%2!=0){

$sql1 = "SELECT * FROM
                                     (SELECT `Reg_yearid`, `year_id`, `stu_id`, max(`TermS_id`) as TermS_id, `date_register`, `freedept_id`, `dept_id` , MAX(classid) as classid FROM `reg_yearstudy` GROUP BY stu_id) re,
                                     student s,dept d ,free_dept f
                                     
                                     where re.stu_id=s.stu_id and  d.dept_id=re.dept_id and re.dept_id=f.dept_id ";
 
       $result1 = mysqli_query($conn,$sql1);
   while($row1=mysqli_fetch_assoc($result1)){
        
       $i=0;
       $i=$row1['TermS_id']+1;
          $ymax=mysqli_query($conn,"select max(year_id) as year_id from year_study ");
           while($yr=mysqli_fetch_assoc($ymax)){
               
              $year_id=$yr['year_id'];
           }
  $sql3 = "INSERT INTO `mohammed`.`reg_yearstudy`( `year_id`, `stu_id`, `classid`, `TermS_id`, `date_register`, `freedept_id`, `dept_id`) VALUES
   	('".$year_id."','".$row1['stu_id']."','".$row1['classid']."','".$i."','".$row1['date_register']."','".$row1['freedept_id']."','".$row1['dept_id']."')";
     $resulte2=mysqli_query($conn,$sql3);

   }
            redirect("mgr_sub.php");
   
 } 
   
     
   }
       if (isset($_POST["sub1"])) {
           
           $yname=$_POST['yname'];
           $ydate=$_POST['ydate'];
           $year_id=0;
           $y = mysqli_query($conn,"insert into  year_study (year_name,date_start_year) VALUES ('".$yname."','".$ydate."')");
            $ymax=mysqli_query($conn,"select max(year_id) as year_id from year_study ");
           while($yr=mysqli_fetch_assoc($ymax)){
               
              $year_id=$yr['year_id'];
           }
           
           

$sql2 = "SELECT * FROM
                                     (SELECT `Reg_yearid`, `year_id`, `stu_id`, max(`TermS_id`) as TermS_id, `date_register`, `freedept_id`, `dept_id` , MAX(classid) as classid FROM `reg_yearstudy` GROUP BY stu_id) re,
                                     student s,dept d ,free_dept f
                                     
                                     where re.stu_id=s.stu_id and  d.dept_id=re.dept_id and re.dept_id=f.dept_id ";
  $result1 = mysqli_query($conn,$sql2);
   while($row1=mysqli_fetch_assoc($result1)){
       $it=0;
       $iclass=0;
       $it=$row1['TermS_id']+1;
       $iclass=$row1['classid']+1;
       $contt=0;
     $resud= mysqli_query($conn,"SELECT * FROM `degry` WHERE  classid='".$row1['classid']."' and `stu_id`='".$row1['stu_id']."'");
      while ($rowd= mysqli_fetch_array($resud)) { 
          
      $sum=$rowd['deg_perseverance']+$rowd['deg_duties'];
       $sum2=$sum+$rowd['deg_nashat']+$rowd['deg_half'];
       $sum3=$sum2+$rowd['deg_final'];
          if($sum3<50){
              $contt++;
          }
          
          
      }
       if($contt<=3){
           
       
  $sql3 = "INSERT INTO `mohammed`.`reg_yearstudy`( `year_id`, `stu_id`, `classid`, `TermS_id`, `date_register`, `freedept_id`, `dept_id`) VALUES
   	('".$year_id."','".$row1['stu_id']."','".$iclass."','".$it."','".$row1['date_register']."','".$row1['freedept_id']."','".$row1['dept_id']."')";
       $resulte2=mysqli_query($conn,$sql3);
    
    $freedept_id_temp=0;
    $rf= mysqli_query($conn,"SELECT amount FROM `free_dept` WHERE `freedept_id`= '".$row1['freedept_id']."'  ");
         while ($resf= mysqli_fetch_array($rf)) {$freedept_id_temp=$resf['amount'];}
      
       $fee="INSERT INTO `mohammed`.`paid_fee` (`stu_id`,`classid`,`year_id`,`balance`,`freedept_id`) 
        VALUES ('".$row1['stu_id']."','".$iclass."','".$year_id."','".$freedept_id_temp."','".$row1['freedept_id']."')";
      	$re= mysqli_query($conn,$fee); 
   }
           
 }
           
             redirect("mgr_sub.php");
  
   }

     ?>

 <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

 
</tbody>
  </table>


</div>
  </div>
</div>

      </div>
      </div>


</html>
<script src="js/jquery/jquery-2.2.4.min.js"></script>

        <!-- <script src="js/bootstrap/bootstrap.min.js"></script>-->

       <script src="js/lobipanel/lobipanel.min.js"></script>

        <!-- ========== THEME JS ========== -->
<script src="js/main.js"></script>

 <?php
include("footermo.php");
}else {
    redirect("index.php");
}
?>



