

<div id="stu_id">
  
                      <?php  error_reporting(E_ALL ^ E_NOTICE);
             include_once('cnnectdb.php');
    
     
                               
 $col_id=$_POST['col_id'];
 $classid=$_POST['classid'];
 $TermS_id=$_POST['TermS_id'];
 $sub_id=$_POST['subject_id'];
 $dept_id=$_POST['dept_id'];
    //////////////////////////////////////////////////////////

    
    /*
    SELECT * FROM (SELECT  `stu_id`, `TermS_id`,dept_id,   MAX(classid) as classid  FROM `reg_yearstudy` GROUP BY stu_id) ry, `study_plan` sp,student st,dept d   WHERE 
sp.`TermS_id`=ry.`TermS_id`
AND ry.stu_id = st.stu_id
AND ry.classid = sp.`classid`
and d.dept_id = ry.dept_id
and sp.dept_id = ry.dept_id
AND ry.dept_id ='".$dept_id."'
and sp.`subject_id`='".$sub_id."'"
    */
    
    
    
   $result1="SELECT * FROM `study_plan` sp, reg_yearstudy ry,student st,dept d   WHERE 
sp.`TermS_id`=ry.`TermS_id`
AND ry.stu_id = st.stu_id
AND ry.classid = sp.`classid`
and d.dept_id = ry.dept_id
and sp.dept_id = ry.dept_id
AND ry.dept_id ='".$dept_id."'
and sp.`subject_id`='".$sub_id."'
and ry.year_id=(select max(year_id) from reg_yearstudy )";
  
                    /* $sql1 = mysqli_query($conn,$result1);
    
		              if (mysqli_num_rows($sql1)< 1)
              
                    while ($row= mysqli_fetch_array($sql1)) {*/
             $sql1 = mysqli_query($conn,$result1);
               while ($row= mysqli_fetch_array($sql1)) {
                  $s1 = mysqli_query($conn,"select stu_id from degry where stu_id='".$row['stu_id']."' and subject_id='".$row['subject_id']."'  "); 
		          $login_check = mysqli_num_rows($s1);
                  if($login_check < 1){             
                 $verify_data="insert into degry (col_id,dept_id,classid,TermS_id,subject_id,stu_id)
                                                           values( 
                                                           '".$col_id."',
                                                           '".$dept_id."',
                                                           '".$classid."',
                                                           '".$TermS_id."',
                                                           '".$sub_id."',
                                                           '".$row['stu_id']."')";
                     
                            $rr=mysqli_query($conn,$verify_data);}}
    
    
    
                       //////////////////////////////////////////////////////////////////////
    
    
    

    $result1=mysqli_query($conn,"SELECT * FROM `study_plan` sp, reg_yearstudy ry,student st,dept d   WHERE 
sp.`TermS_id`=ry.`TermS_id`
AND ry.stu_id = st.stu_id
AND ry.classid = sp.`classid`
and d.dept_id = ry.dept_id
and sp.dept_id = ry.dept_id
AND ry.dept_id ='".$dept_id."'
and sp.`subject_id`='".$sub_id."'
and ry.year_id=(select max(year_id) from reg_yearstudy )");
   

                   while ($row= mysqli_fetch_array($result1)) {?>
     <?php //echo $row['stud_name']?>
    <form   action="degrym.php" method="post">
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

                        
                        
							<tr>
                               <input type="hidden"  name="ss" value="<?php echo $row3['stu_id']; ?>" />
                            <input type="hidden"  name="subject_id" value="<?php echo $sub_id; ?>" />
                            <input type="hidden"  name="col_id" value="<?php echo $row3['col_id']; ?>" />
                            <input type="hidden"  name="classid" value="<?php echo $row3['classid']; ?>" />
                           <input type="hidden"  name="dept_id" value="<?php echo $row3['dept_id']; ?>" />
                                
                                <input type="hidden"  name="TermS_id" value="<?php echo $row3['TermS_id']; ?>" />
                                  
								<td>
									<?php echo  $row['stud_name'];
                                   
                                    ?>
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
        
     <?php  }  ?>
    
<?php 
    /*
    $result1=mysqli_query($conn,"SELECT * FROM `study_plan` sp, reg_yearstudy ry,student st,dept d   WHERE 
sp.`TermS_id`=ry.`TermS_id`
AND ry.stu_id = st.stu_id
AND ry.classid = sp.`classid`
and d.dept_id = ry.dept_id
AND ry.dept_id ='".$s_dept_id."'
and sp.`subject_id`='".$sub_id."'");

                   while ($row= mysqli_fetch_array($result1)) {?>
    
      <table class="table table-bordered table-hover table-striped" >
      
        <form   action="degrym.php" method="post">
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
                        
           <?php 
     $result3=mysqli_query($conn,"SELECT * FROM degry where subject_id='".$sub_id."' and stu_id='".$row['stu_id']."' ");

                   while ($row3= mysqli_fetch_array($result3)) {?>
							<tr>
                              <input type="hidden"  name="ss1" value="<?php echo $row3['stu_id']; ?>" />
                                
								<td>
									<?php echo  $row['stud_name'];?>
								</td>
								<td>
									 <input type="number" value="<?php echo $row3['deg_perseverance'];?>" name="deg_perseverance" class="form-control"  />
												
								</td>
								 <td>
									 <input type="number" value="<?php echo $row3['deg_nashat'];?>" name="deg_nashat" class="form-control"  />
												
								</td>
                                <td>
									 <input type="number" value="<?php echo $row3['deg_half'];?>" name="deg_half" class="form-control"  />
												
								</td>
                                <td>
									 <input type="number" value="<?php echo $row3['deg_duties'];?>" name="deg_duties" class="form-control"  />
												
								</td>
                                <td>
									 <input type="number" value="<?php echo $row3['deg_final'];?>" name="deg_final" class="form-control"  />
												
								</td>
                                
                                 
                                <td>
                                	 <td>
                                	<input type="hidden" name="degry_id" value="120" />
                                    
                                	<input type="hidden" name="exam_id" value="<?php echo $sub_id;?>" />
                                	
                                	<input type="hidden" name="subject" value="<?php echo $sub_id;?>" />
                                         
                                     <p data-placement="top" data-toggle="tooltip" title="Delete"><a href="degrym.php?submit=<?php echo $row3['degry_id']?>" name="submi" class="btn btn-danger btn-xs" ><span class="glyphicon glyphicon-trash"></span></a></p> 
                
                                	 <input type="submit"  class="btn btn-primary"   name="submit"  value="حفــظ النتيجــة" /> 
                                </td>
							 </tr>
                           <?php } ?>
                           </form>  
                          
                     </tbody>
                  </table> 
    
      <?php  }  */?>
    

    




 
</div>
