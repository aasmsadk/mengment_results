 <?php
 
define("HOSTNAME" , "localhost");
define("HOST_USER" , "root");
define("HOST_PASS" , "");
define("DB_NAME" , "mohammed");


 
$conn = mysqli_connect(HOSTNAME, HOST_USER, HOST_PASS, DB_NAME);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error() .  "Error NO: " . mysqli_connect_errno());
}else{
	 // echo "Connected";
}
?>








