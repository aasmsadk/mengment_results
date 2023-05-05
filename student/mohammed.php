

    <!-- BOOTSTRAP STYLES-->
    <link href="../static/cssrs/bootstrap.css" rel="stylesheet" />
    <!-- FONTAWESOME STYLES-->
    <link href="../css/font-awesome.css" rel="stylesheet" />
       <!--CUSTOM BASIC STYLES-->
    <link href="../static/cssrs/basic.css" rel="stylesheet" />
    <!--CUSTOM MAIN STYLES-->
    <link href="../static/cssrs/custom.css" rel="stylesheet" />
    <!-- GOOGLE FONTS-->
    <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css' />
  <script src="../js/jsrs/jquery-1.10.2.js"></script>	
    <!-- BOOTSTRAP SCRIPTS -->
    <script src="../js/jsrs/bootstrap.js"></script>
    <!-- METISMENU SCRIPTS -->
    <script src="../js/jsrs/jquery.metisMenu.js"></script>
       <!-- CUSTOM SCRIPTS -->
    <script src="../js/jsrs/custom1.js"></script>
    


<body>
    <div id="wrapper">
        <nav class="navbar navbar-default navbar-cls-top " role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
                    <span class="sr-only">القائمة</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.php">نظام ادارة رسوم المدارس</a>
            </div>

        </nav>
        <!-- /. NAV TOP  -->
        <nav class="navbar-default navbar-side" role="navigation">
            <div class="sidebar-collapse">
                <ul class="nav" id="main-menu">
                    <li>
                        <div class="user-img-div text-center">
                            <img src="img/admin-p.png" class="img" />
                            <h5 style="color:white;"> </h5>
                        </div>

                    </li>


                    <li>
                        <a class=" " href="index.php"><i class="fa fa-dashboard "></i>الرئيسية</a>
                    </li>
					
					 <li>
                        <a class=" " href="student.php"><i class="fa fa-users "></i>ادارة الطلاب</a>
                    </li>

                    <li>
                        <a class=" " href="inactivestd.php"><i class="fa fa-toggle-off "></i>الطلاب الغير نشطين</a>
                    </li>

                    <li>
                        <a class=" " href="grade.php"><i class="fa fa-th-large"></i>المراحل الدراسية </a>
                    </li>
                    
					<li>
                        <a class=" " href="fees.php"><i class="fa fa-money "></i>ادارة الرسوم</a>
                    </li>
					 <li>
                        <a class=" " href="report.php"><i class="fa fa-file-pdf-o "></i>التقارير</a>
                    </li>
					
				
                    <!--
					<li>
                        <a class=" " href="setting.php"><i class="fa fa-cogs "></i>Account Setting</a>
                    </li>
                   !-->
					
					 <li>
                        <a href="logout.php"><i class="fa fa-power-off "></i>تسجيل الخروج</a>
                    </li>
					
			
                </ul>

            </div>

        </nav>
        <!-- /. NAV SIDE  -->