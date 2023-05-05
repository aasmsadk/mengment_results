<?php session_start(); ?>
<?php 
  include_once("headermo.php");
  include_once('cnnectdb.php');
  include_once('functions.php');
   include_once('session.php');
 //include_once('navbar.php'); 
 

    $errormsg= '';
if (isset($_POST["submit"])) {
           error_reporting(E_ALL ^ E_NOTICE);
           $username =  htmlentities($_POST["username"]) ;
	       $pass =  htmlentities($_POST["password"] ) ;

          $sql1 = mysqli_query($conn,"SELECT * FROM  accuont WHERE   username='$username' AND password='$pass' ");
          $num = mysqli_num_rows($sql1);
    if($num<1){
        $errormsg="  
              <div class='alert alert-danger alert-autocloseable-danger '>
        			<h4 style='text-align: center;'>اسم المستخدم او كلمة المرور غير صحيح </h4>
				</div>
                
                 ";
        
    }
    $sql = mysqli_query($conn,"SELECT * FROM  accuont a, type_users tu WHERE  a.IdType_user=tu.IdType_user  AND username='$username' AND password='$pass' ");
          
       while ($login_check= mysqli_fetch_array($sql)){
  
		     $ids = $login_check['account_id'];
             
          if($login_check['type_user']=="student"){

         $_SESSION['admin_id'] = $login_check['account_id'];
		 $_SESSION['admin_username'] = $login_check['username'];
         $_SESSION['admin_password'] = $login_check['password'];
         $_SESSION['type_user'] = $login_check['type_user'];        
          redirect ("hom-student.php");
          
          } 
           if($login_check['type_user']=="Admin" || $login_check['type_user']=="employee"){

            	$_SESSION['admin_id'] = $login_check['account_id'];
		$_SESSION['admin_username'] = $login_check['username'];
        $_SESSION['admin_password'] = $login_check['password'];
        $_SESSION['msg']=login_success_msg();
        $_SESSION['type_user'] = $login_check['type_user'];
              redirect ("adminpanal.php");
          }else{ 
              redirect("index.php");
           
              
                }
          }
             
             /* if($login_check['type_user']=="employee"){

         $_SESSION['admin_id'] = $login_check['account_id'];
		$_SESSION['admin_username'] = $login_check['username'];
        $_SESSION['admin_password'] = $login_check['password'];
        $_SESSION['msg']=login_success_msg();
        $_SESSION['type_user'] = $login_check['type_user'];          
              redirect ("adminpanal.php");
          }*/


 
  }



?>


<script src="js/jquery-3.2.1.js"></script>
<script>

$(document).ready(function () {
			$('.alert-autocloseable-success').delay(2000).fadeOut( "slow", function() {
				// Animation complete.
				$('#autoclosable-btn-success').prop("disabled", false);
			});
     $('.alert-autocloseable-danger').delay(2000).fadeOut( "slow", function() {
				// Animation complete.
				$('#alert-autocloseable-danger').prop("disabled", false);
			});

  		
});


</script>
      <style>
      /* NOTE: The styles were added inline because Prefixfree needs access to your styles and they must be inlined if they are on local disk! */
      * {
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

body {
   background:#333;
  font: 100%/1 "Helvetica Neue", Arial, sans-serif;
}

.login {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -10rem 0 0 -10rem;
  width: 20rem;
  height: 20rem;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
}
.login:hover > .login-header, .login.focused > .login-header {
  width: 2rem;
}
.login:hover > .login-header > .text, .login.focused > .login-header > .text {
  font-size: 1rem;
  transform: rotate(-90deg);
}
.login.loading > .login-header {
  width: 20rem;
}
.login.loading > .login-header > .text {
  display: none;
}
.login.loading > .login-header > .loader {
  display: block;
}

.login-header {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  width: 20rem;
  height: 20rem;
  background: orange;
  transition: width 0.5s ease-in-out;
}
.login-header > .text {
  display: block;
  width: 100%;
  height: 100%;
  font-size: 5rem;
  text-align: center;
  line-height: 20rem;
  color: #fff;
  transition: all 0.5s ease-in-out;
}
.login-header > .loader {
  display: none;
  position: absolute;
  left: 5rem;
  top: 5rem;
  width: 10rem;
  height: 10rem;
  border: 2px solid #fff;
  border-radius: 50%;
  animation: loading 2s linear infinite;
}
.login-header > .loader:after {
  content: "";
  position: absolute;
  left: 4.5rem;
  top: -0.5rem;
  width: 1rem;
  height: 1rem;
  background: #fff;
  border-radius: 50%;
  border-right: 2px solid orange;
}
.login-header > .loader:before {
  content: "";
  position: absolute;
  left: 4rem;
  top: -0.5rem;
  width: 0;
  height: 0;
  border-right: 1rem solid #fff;
  border-top: 0.5rem solid transparent;
  border-bottom: 0.5rem solid transparent;
}

@keyframes loading {
  50% {
    opacity: 0.5;
  }
  100% {
    transform: rotate(360deg);
  }
}
.login-form {
  margin: 0 0 0 2rem;
  padding: 0.5rem;
}

.login-input {
  display: block;
  width: 100%;
  font-size: 2rem;
  padding: 0.5rem 1rem;
  box-shadow: none;
  border-color: #ccc;
  border-width: 0 0 2px 0;
}
.login-input + .login-input {
  margin: 10px 0 0;
}
.login-input:focus {
  outline: none;
  border-bottom-color: orange;
}

.login-btn {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  width: 5rem;
  height: 5rem;
  border: none;
  background: orange;
  border-radius: 50%;
  font-size: 0;
  border: 0.6rem solid transparent;
  transition: all 0.3s ease-in-out;
}
.login-btn:after {
  content: "";
  position: absolute;
  left: 1rem;
  top: 0.8rem;
  width: 0;
  height: 0;
  border-left: 2.4rem solid #fff;
  border-top: 1.2rem solid transparent;
  border-bottom: 1.2rem solid transparent;
  transition: border 0.3s ease-in-out 0s;
}
.login-btn:hover, .login-btn:focus, .login-btn:active {
  background: #fff;
  border-color: orange;
  outline: none;
}
.login-btn:hover:after, .login-btn:focus:after, .login-btn:active:after {
  border-left-color: orange;
}

    </style>
 


<body>
  
   
    
  
 <div class="container">
  <div class="row">
    <div class="col-sm-2">
    
    
</div>
    <div class="col-sm-10" style="margin-top: 20px;">
<?php  // echo   msg(); ?> 
<?php // $errors = err(); ?> 
<?php // error_function($errors); ?> 
      
        
    
      <?php echo $errormsg; ?>
</div>
</div>
</div> 
  
  <div class="col-md-12 col-sm-12 clearfix" style="text-align:center;margin-top:120px;color:#eeee;background-colo:#eee;">
		<h1 style="font-weight:200; margin:0px;">  نـــظــام ادارة شــــــؤون الطــــــلاب</h1>
    </div>
<div class="login">

  <header class="login-header"><span class="text">LOGIN</span><span class="loader"></span></header>
  <form class="login-form" method="post" action=''>
    <input class="login-input" type="text" name="username" placeholder="اسـم المستخـدم"/>
    <input class="login-input" type="password" name="password"placeholder="كلـمـة المــرور"/>
    <button class="login-btn" type="submit" name="submit">login</button>
  </form>
</div>
  
    <script src="js/index.js"></script>

</body>
</html>
  <?php
 include("footermo.php");
?>