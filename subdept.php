<?php session_start();
  include_once('cnnectdb.php');
 include_once('functions.php');
   login_check(); 


$classid=$_POST['classid'];
$query= "select * from term_study where classid='".$classid."'  ";
$result= mysqli_query($conn,$query);

while ($row= mysqli_fetch_array($result)) {
    ?>

    <option value='<?php echo $row['TermS_id'] ?>'>   <?php echo $row['Term_name'] ?></option>
<?php } 
 ?>