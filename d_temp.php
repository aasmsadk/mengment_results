
<?php
 include_once("headermo.php");
  include_once('cnnectdb.php');


	//$sel = mysqli_query($conn,"SELECT * FROM student ");
	//while($row=mysqli_fetch_assoc($sel)){
			//$data[] = array('<input type="checkbox" name="subj_id" id="subj_id" value='.$row['stu_id'].'>');
    //    echo "<input type='input' name='subj_id' id='subj_id' value='".$row['stu_id']."'>";
	
    //}



?>

 <form   action=" " method="get">
<?php $i=1;
$result1=mysqli_query($conn,"SELECT * FROM `study_plan` sp, reg_yearstudy ry,student st,dept d   WHERE 
sp.`TermS_id`=ry.`TermS_id`
AND ry.stu_id = st.stu_id
AND ry.classid = sp.`classid`
and d.dept_id = ry.dept_id
AND ry.dept_id =6
and sp.`subject_id`=59");
     

                   while ($row= mysqli_fetch_array($result1)) {
                       
     
     ?>
      <table class="table table-bordered table-hover table-striped" >
              <?php 
                             $result3=mysqli_query($conn,"SELECT * FROM degry where stu_id='".$row['stu_id']."'and subject_id='".$row['subject_id']."' ");

                   while ($row3= mysqli_fetch_array($result3)) {
          ?>
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

                        
                        
							<tr>
                               <input type="hidden"  name="ss<?php echo $i; ?>" value="<?php echo $row['stu_id']; ?>" />
                          <input type="hidden"  name="ne<?php echo $i; ?>" value="<?php echo $row['stud_name']; ?>" />
                                
								<td>
									<?php $i++;
                                                                
                                                                echo  $row['stud_name'];?>
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
                
                                	
                                </td>
							 </tr>
                     
                        
                        
                          
                     </tbody>
                          <?php } ?>
                  </table> 
    <?php 
    }?>
                <input type="submit"  class="btn btn-primary"   name="submit1"  value="حفــظ النتيجــة" /> 
     
                            </form>  

<?php 
if($_GET['submit1']){
	for($ie=1;$ie<$i;$ie++){
		$S="ss".$ie;	
        //$data[] = array('<input type="checkbox" name="subj_id" id="subj_id" value='.$row['stu_id'].'>');
     echo "<input type='input' name='subj_id' id='subj_id' value='".$_GET["ss".$ie]."'>
     <input type='input' name='subj_id' id='subj_id' value='".$_GET["ne".$ie]."'>";
	
        $SQ="INSERT INTO `te`(`id`, `name`) VALUES('".$_GET["ss".$ie]."','".$_GET["ne".$ie]."' )";
         $result2= mysqli_query($conn,$SQ);
    }}
?>

