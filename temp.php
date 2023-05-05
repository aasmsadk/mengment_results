 
<?php   error_reporting(E_ALL ^ E_NOTICE);

include_once('cnnectdb.php');
              //add dept student
                    $class_id=$_POST['classid'];?>
                        <option  selected="selected"> selected....</option>     
                 <?php  $result= mysqli_query($conn,"SELECT * FROM `term_study` WHERE `classid`='".$class_id."'  ");
                   while ($row= mysqli_fetch_array($result)) {
                   ?>
  
                 <option value="<?php echo $row["TermS_id"] ?>"><?php echo $row["Term_name"] ;}?></option>
 
                  
 