
<?php   error_reporting(E_ALL ^ E_NOTICE);
include_once('cnnectdb.php');
              //add dept student
                   $col_ide=$_POST['col_id'];
  
?>
                        <option  selected="selected"> selected &nbsp;<?php echo  $col_ide['col_id'];?></option>     
                 <?php
                         
                         
                  
                   $result= mysqli_query($conn,"select * from dept where col_id='".$col_ide."'  ");
                   while ($row= mysqli_fetch_array($result)) {
                   ?>
                 <option value="<?php echo $row["dept_id"] ?>"><?php echo $row["dept_name"] ;}?></option>
 