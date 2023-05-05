
<?php   error_reporting(E_ALL ^ E_NOTICE);
include_once('cnnectdb.php');
              //add dept student
                   $sub_id=$_POST['TermS_id'];
                   $t_dept_id=$_POST['dept_id'];
  

?>
                        <option  selected="selected"> selected....</option>     
                 <?php
                     
                   $result= mysqli_query($conn,"select * from  study_plan sp , subject sub,term_study ts
WHERE sp.`subject_id` = sub.subject_id
AND sp.`TermS_id` = ts.`TermS_id`
 AND sp.TermS_id='".$sub_id."'
 AND sp.`dept_id` ='".$t_dept_id."' ");
                   while ($row= mysqli_fetch_array($result)) {
                  
                       ?>
  <option value="<?php echo $row["subject_id"] ?>"><?php echo $row["SubjectName"] ;}?> </option>


 