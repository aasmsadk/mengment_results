          
<?php session_start();

error_reporting(E_ALL ^ E_NOTICE);
   include_once("headermo.php");
   include_once('cnnectdb.php');

 include_once('navbar.php'); 
 include_once('functions.php');
login_check();
if($_SESSION['type_user']=="Admin" || $_SESSION['type_user']=="employee" ){

 

 $name=$_POST['col_id'];
  $title1=$_POST['dept_id'];
    $gender1=$_POST['classid'];
   $loc_brith1=$_POST['TermS_id'];
        $average=$_POST['subject_id'];
    $subject_id=$_POST['subject_id'];
        $student=$_POST['ss'];
            $mo=$_POST['deg_perseverance'];
            $nash=$_POST['deg_nashat'];
            $de=$_POST['deg_half'];
            $nsef=$_POST['deg_duties'];
            $final=$_POST['deg_final'];
          
        $m=$_POST['degry_id'];
    
if(isset($_POST['submit']) || isset($_POST['submit'])){
   
   $sq2="UPDATE `mohammed`.`degry` SET 
     `deg_perseverance` = '$mo',
    `deg_nashat` = '$nash',
     `deg_half` = '$de',
      `deg_duties` = '$nsef',
     
       `deg_final`='$final'  WHERE  stu_id='".$student."' and subject_id='".$subject_id."'";
    
                 $result2= mysqli_query($conn,$sq2);

      }

//}


             
           ?>


 <script src="jquery.main.js"></script>
 

<div class="row">
	<div class="col-md-12">
    
    	<!------CONTROL TABS START------>
		<ul class="nav nav-tabs bordered">
			<li class="active">
            	<a href="#list" data-toggle="tab"><i class="entypo-menu"></i> 
					<?php echo ('اضافـــة الدرجـــات');?>
                    	</a></li>
		</ul>
    	<!------CONTROL TABS END------>
        
	
            <!----TABLE LISTING STARTS-->
            <div class="tab-pane  " id="list">
				<center>
                    
               <table   class="table table-bordered table-hover table-striped">
                	<tr>
                        <td> <?php echo ('اختـــار الكلية');?></td>
                        <td><?php echo ('اختــار القســـم');?></td>
                        <td><?php echo ('اختـــار المســتوى');?></td>
                        <td><?php echo ('اختــار الفصل الدراسي');?></td>
                        <td><?php echo ('اختــار المادة');?></td>
                         
                	</tr>     
                    
                    <tbody>
                    
                    
              <form  action=" " method="post" >
                  
               
                	 
                	<tr>
                        <!-- اختيار الكلية -->
                        <td>
                             
                        <select name="col_id" id="col_id" class="form-control">
                            
                            <?php  error_reporting(E_ALL ^ E_NOTICE);
                            if(isset($_POST['submit'])||isset($_POST['submit'])){?>
                                 <option value=""> اختــر الكلية</option>
                            <?php
               $uf=mysqli_query($conn,"SELECT * FROM colia order by col_name ASC  ");
                while ($unf=mysqli_fetch_array($uf)){
              echo('<option value="'.$unf['col_id'].'"'.($name==$unf['col_id']?'selected':'').'>'.$unf['col_name'].'</option> ');

                 }}else{
              ?>
                            
                  <option value="">اختـــار الكلية</option>
                  <?php 
                    
                     
                     $query= "select * from colia order by col_name ASC";
                     $result= mysqli_query($conn,$query);
                     while ($row= mysqli_fetch_array($result)) { ?>
                  <option value="<?php echo $row['col_id']; ?>"><?php echo $row['col_name'] ?></option>
                  <?php } }?>
               </select>
                        </td>
                     
                        
                          <!-- اختيار الأقسام -->
                          <td>
                              
                              
                          <select name="dept_id" class="form-control" id="dept_id">
                              <?php  error_reporting(E_ALL ^ E_NOTICE);
                            if(isset($_POST['submit'])||isset($_POST['submit'])){?>
                                 <option value=""> اختــر القسم</option>
                            <?php
               $uf=mysqli_query($conn,"SELECT * FROM dept  where col_id='".$name."'  ");
                while ($unf=mysqli_fetch_array($uf)){
              echo('<option value="'.$unf['dept_id'].'"'.($title1==$unf['dept_id']?'selected':'').'>'.$unf['dept_name'].'</option> ');

                 }}else{
              ?>
                  <option value="">اختــار القسم</option>
                              
                              <?php } ?>
               </select>
                        </td>
 <!-- اختيار المستوى -->
                        
 <td>
 <select name="classid" class="form-control" id="classid">
     <?php  
                            if(isset($_POST['submit'])||isset($_POST['submit'])){?>
                                 <option value=""> اختــر المستوى</option>
                            <?php
               $uf=mysqli_query($conn,"select * FROM `levl_dept`ld , dept d ,class c  where c.classid=ld.classid AND d.dept_id=ld.dept_id AND  ld.`dept_id` ='".$title1."'  ");
                while ($unf=mysqli_fetch_array($uf)){
              echo('<option value="'.$unf['classid'].'"'.($gender1==$unf['classid']?'selected':'').'>'.$unf['ClassName'].'</option> ');

                 }}else{
              ?>
                  <option value="">اختــار المستوى</option><?php } ?>
 
               </select>
                        </td>
                        <!-- اختيار الفصل الدراسي -->
 <td>
 <select name="termid" class="form-control" id="TermS_id">
     
     <?php  error_reporting(E_ALL ^ E_NOTICE);
                            if(isset($_POST['submit'])||isset($_POST['submit'])){?>
                                 <option value=""> اختــر الفصل الدراسي</option>
                            <?php
               $uf=mysqli_query($conn,"SELECT * FROM `term_study` WHERE `classid`='".$gender1."'  ");
                while ($unf=mysqli_fetch_array($uf)){
              echo('<option value="'.$unf['TermS_id'].'"'.($loc_brith1==$unf['TermS_id']?'selected':'').'>'.$unf['Term_name'].'</option> ');

                 }}else{
              ?>
                  <option value="">اختــار الفصل الدراسي</option><?php } ?>
               </select>
                        </td>
                                       <!-- اختيار المادة -->
 <td>
 <select name="subject" class="form-control" id="subject_id">
     <?php 
             if(isset($_POST['submit'])||isset($_POST['submit'])){?>
               <option value=""> اختــر المادة</option>
                            <?php
               $uf=mysqli_query($conn,"select * from  study_plan sp , subject sub,term_study ts
WHERE sp.`subject_id` = sub.subject_id
AND sp.`TermS_id` = ts.`TermS_id`
 AND sp.TermS_id='".$loc_brith1."'
 AND sp.`dept_id` ='".$title1."' ");
                while ($unf=mysqli_fetch_array($uf)){
              echo('<option value="'.$unf['subject_id'].'"'.($subject_id==$unf['subject_id']?'selected':'').'>'.$unf['SubjectName'].'</option> ');

                 }}else{
              ?>
                  <option value="">اختــار المادة</option> <?php } ?>
               </select>
                        </td>
                        
                        
                                            
                	</tr>
                    </tbody>
                </table>
                   
                    
                  
               <div id="stu_id"  >
                   <?php
                          $result1=mysqli_query($conn,"SELECT * FROM `study_plan` sp, reg_yearstudy ry,student st,dept d   WHERE 
sp.`TermS_id`=ry.`TermS_id`
AND ry.stu_id = st.stu_id
AND ry.classid = sp.`classid`
and d.dept_id = ry.dept_id
and sp.dept_id = ry.dept_id
AND ry.dept_id ='".$title1."'
and sp.`subject_id`='".$average."'
and ry.year_id=(select max(year_id) from reg_yearstudy )  ");

                   while ($row= mysqli_fetch_array($result1)) {?>
     <?php //echo $row['stud_name']?>
       <form   action=" " method="post">
           
      <table class="table table-bordered table-hover table-striped" >
              <?php 
                               $result3=mysqli_query($conn,"SELECT * FROM degry where stu_id='".$row['stu_id']."'and subject_id='".$row['subject_id']."' ");

                   while ($row3= mysqli_fetch_array($result3)) {?>
                    <thead>
                        <tr>
                            <td><?php echo ('اسـم الطــالب');?></td>
                            
                            <td><?php echo ('درجة الحضور');?>(out of 10)</td>
                            <td><?php echo ('درجة المشاركة');?> (out of 10)      </td>
                            <td><?php echo ('درجة الاختبار النصفي');?>  (out of 20)</td>
                            <td><?php echo ('درجة العملي');?>   (out of 20)</td>
                             <td><?php echo ('درجة النظري النهائي');?>   (out of 40)</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>

                                                    <input type="hidden"  name="su" value="" />

                        
							<tr>
                             <input type="hidden"  name="ss" value="<?php echo $row3['stu_id']; ?>" />
                            <input type="hidden"  name="subject_id" value="<?php echo $row3['subject_id']; ?>" />
                            <input type="hidden"  name="col_id" value="<?php echo $row3['col_id']; ?>" />
                            <input type="hidden"  name="classid" value="<?php echo $row3['classid']; ?>" />
                           <input type="hidden"  name="dept_id" value="<?php echo $row3['dept_id']; ?>" />  
                            <input type="hidden"  name="TermS_id" value="<?php echo $row3['TermS_id']; ?>" />
                                 
                                <td>
									<?php echo  $row['stud_name'];?>
</td>          
            <td><input type="number" value="<?php echo $row3['deg_perseverance'];?>" name="deg_perseverance" class="form-control"  /></td>
            <td><input type="number" value="<?php echo $row3['deg_nashat'];?>" name="deg_nashat" class="form-control"  /> </td>
            <td><input type="number" value="<?php echo $row3['deg_half'];?>" name="deg_half" class="form-control"  /></td>
            <td> <input type="number" value="<?php echo $row3['deg_duties'];?>" name="deg_duties" class="form-control"  /></td>
            <td><input type="number" value="<?php echo $row3['deg_final'];?>" name="deg_final" class="form-control"  /></td>
            <td>
                                	<!--<input type="text" name="mark_id" value="<?php echo $row2['mark_id'];?>" />
                                    
                                	<input type="text" name="exam_id" value="<?php echo $exam_id;?>" />
                                	<input type="text" name="class_id" value="<?php echo $class_id;?>" />
                                	<input type="text" name="subject_id" value="<?php echo $subject_id;?>" />
                                     
                <p data-placement="top" data-toggle="tooltip" title="Delete"><a href="MangamenrUser.php?delete=<?php echo $un['stu_id']?>" name="del" class="btn btn-danger btn-xs" ><span class="glyphicon glyphicon-trash"></span></a></p> -->
                
                                	 <input type="submit"  class="btn btn-primary"   name="submit"  value="حفــظ النتيجــة" /> 
                                </td>
							 </tr>
                     
                        
                        
                          
                     </tbody>
                          <?php } ?>
                  </table> 
                            </form>  
    
      <?php  }
      
                   
                   ?>
                  </div>

                  
                </form>
                    
                   
                  <p >       
                        
                                
                        
                        
                  <!--
                    <td> <input type="button" onclick="a()" value="fg" /></td>
                  
                    <script type="text/javascript">
                    function a(){
                        alert("hdj");
                        
                       <?php 
                         
                       // include ("tt.php");
                        
                        ?>
                        
                        
                    }
                    -->
                    
                                                <!-- اختيارالطالب  -->
 
     <!--        <select name="student"  >
    
   
  
      <table id="mytable" class="table table-bordred table-striped"  >
 

        
 <tr>
     <td> :اسم الطالب   
     
    
    
    <div class="form-group">
    <label  >درجة النشاط:</label>
    <input type="text" class="form-control" name="useradmin">
  </div>
  <div class="form-group">
    <label  >درجة المواظبة:</label>
    <input type="namber" class="form-control" name="passadmin">
  </div>
    
     </td> 
     
      
  
    </tr>
     
 
 <input type="submit" name="submit12" class="btn btn-primary btn-info-full " value="Submit"/> 
  
           
            
                    </form> 
        <p id="stu_id">-->
 
            
                </center>
 
        
           
            
            <script src="jquery.main.js" type="text/javascript"></script>
        
        
         <script>
                    
                    
                    
                    
    $(document).ready(function(){

    $("#col_id").change(function(){
      var col_id = this.value;
       
      $.ajax({
      url: "reg.php",
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
       
          
         <script>
                  
   $(document).ready(function(){

    $("#dept_id").change(function(){ 
      var dept_id = this.value;
      $.ajax({
      url: "samester.php",
      type: "POST",
      data: {
      	dept_id : dept_id
      },
      cache: false,
      success: function(data){
        $("#classid").html(data);

      }
      });
    });
     });
            
</script>
       <script src="jquery.main.js" type="text/javascript"></script>      
         <script>           
                    
   $(document).ready(function(){
 
    $("#classid").change(function(){
      var classid= this.value;
      $.ajax({
      url: "temp.php",
      type: "POST",
      data: {
      classid : classid
      },
      cache: false,
      success: function(data){     
        $("#TermS_id").html(data);
      }
      });    
    });   
     });
             
         
</script>
        
      <script>           
                    
   $(document).ready(function(){
 
    $("#TermS_id").change(function(){
      var dept_id= $("#dept_id").val();  
      var TermS_id= this.value;
      $.ajax({
      url: "sub.php",
     method: "POST",
      data: {
      dept_id:dept_id,  
      TermS_id : TermS_id
      },
      cache: false,
      success: function(data){     
        $("#subject_id").html(data);
      }
      });    
    });   
     });
             
         
</script>
        
          <script>           
                    
   $(document).ready(function(){
 
    $("#subject_id").change(function(){
     var col_id= $("#col_id").val();
     var dept_id= $("#dept_id").val();
     var classid= $("#classid").val();
     var TermS_id= $("#TermS_id").val();
      var subject_id= this.value;
      $.ajax({
      url: "row-student.php",
      method: "POST",
      data: {
          col_id:col_id,
          classid:classid,
          TermS_id:TermS_id,
        dept_id:dept_id,  
      subject_id : subject_id
          
      },
      cache: false,
      success: function(data){     
        $("#stu_id").html(data);
      }
      });    
    });   
     });
             
         
</script>

               
    <?php
                    
  include("footermo.php");
}else {
    redirect("index.php");
}
    ?>
 