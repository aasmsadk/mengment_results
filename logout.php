<?php session_start(); ?>
<?php 

include_once('session.php');
include_once('functions.php');
 


$_SESSION['admin_id'] = null;
$_SESSION['admin_username'] = null;

redirect("index.php");

?>