﻿
  <?php session_start();
   error_reporting(E_ALL ^ E_NOTICE);

  include_once("headermo.php");
  include_once('cnnectdb.php');
 include_once('navbar.php'); 
 include_once('functions.php');
login_check();
if($_SESSION['type_user']=="Admin"){





  if($_POST['submit']){


 $name=$_POST['subject_id'];
  $title1=$_POST['col_id'];
    $gender1=$_POST['dept_id'];
   $loc_brith1=$_POST['classid'];
    $date_brith1=$_POST['TermS_id'];

  
 $sq="INSERT INTO `mohammed`.`study_plan` (`dept_id` ,`classid` ,`TermS_id`,`col_id`,`subject_id`)
         VALUES (
         
          
           '$gender1',
           '$loc_brith1',
            '$date_brith1',
            '$title1',
             '$name'
             
             
              )";
             	$result= mysqli_query($conn,$sq);
                      }
 
?>
<style>
.wizard {
    margin: 20px auto;
    background: #fff;
}

    .wizard .nav-tabs {
        position: relative;
        margin: 40px auto;
        margin-bottom: 0;
        border-bottom-color: #e0e0e0;
    }

    .wizard > div.wizard-inner {
        position: relative;
    }

.connecting-line {
    height: 2px;
    background: #e0e0e0;
    position: absolute;
    width: 80%;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 50%;
    z-index: 1;
}

.wizard .nav-tabs > li.active > a, .wizard .nav-tabs > li.active > a:hover, .wizard .nav-tabs > li.active > a:focus {
    color: #555555;
    cursor: default;
    border: 0;
    border-bottom-color: transparent;
}

span.round-tab {
    width: 70px;
    height: 70px;
    line-height: 70px;
    display: inline-block;
    border-radius: 100px;
    background: #fff;
    border: 2px solid #e0e0e0;
    z-index: 2;
    position: absolute;
    left: 0;
    text-align: center;
    font-size: 25px;
}
span.round-tab i{
    color:#555555;
}
.wizard li.active span.round-tab {
    background: #fff;
    border: 2px solid #5bc0de;

}
.wizard li.active span.round-tab i{
    color: #5bc0de;
}

span.round-tab:hover {
    color: #333;
    border: 2px solid #333;
}

.wizard .nav-tabs > li {
    width: 25%;
}

.wizard li:after {
    content: " ";
    position: absolute;
    left: 46%;
    opacity: 0;
    margin: 0 auto;
    bottom: 0px;
    border: 5px solid transparent;
    border-bottom-color: #5bc0de;
    transition: 0.1s ease-in-out;
}

.wizard li.active:after {
    content: " ";
    position: absolute;
    left: 46%;
    opacity: 1;
    margin: 0 auto;
    bottom: 0px;
    border: 10px solid transparent;
    border-bottom-color: #5bc0de;
}

.wizard .nav-tabs > li a {
    width: 70px;
    height: 70px;
    margin: 20px auto;
    border-radius: 100%;
    padding: 0;
}

    .wizard .nav-tabs > li a:hover {
        background: transparent;
    }

.wizard .tab-pane {
    position: relative;
    padding-top: 50px;
}

.wizard h3 {
    margin-top: 0;
}
.step1 .row {
    margin-bottom:10px;
}
.step_21 {
    border :1px solid #eee;
    border-radius:5px;
    padding:10px;
}
.step33 {
    border:1px solid #ccc;
    border-radius:5px;
    padding-left:10px;
    margin-bottom:10px;
}
.dropselectsec {
    width: 68%;
    padding: 6px 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    color: #333;
    margin-left: 10px;
    outline: none;
    font-weight: normal;
}
.dropselectsec1 {
    width: 74%;
    padding: 6px 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    color: #333;
    margin-left: 10px;
    outline: none;
    font-weight: normal;
}
.mar_ned {
    margin-bottom:10px;
}
.wdth {
    width:25%;
}
.birthdrop {
    padding: 6px 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    color: #333;
    margin-left: 10px;
    width: 16%;
    outline: 0;
    font-weight: normal;
}


/* according menu */
#accordion-container {
    font-size:13px
}
.accordion-header {
    font-size:13px;
	background:#ebebeb;
	margin:5px 0 0;
	padding:7px 20px;
	cursor:pointer;
	color:#fff;
	font-weight:400;
	-moz-border-radius:5px;
	-webkit-border-radius:5px;
	border-radius:5px
}
.unselect_img{
	width:18px;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
.active-header {
	-moz-border-radius:5px 5px 0 0;
	-webkit-border-radius:5px 5px 0 0;
	border-radius:5px 5px 0 0;
	background:#F53B27;
}
.active-header:after {
	content:"\f068";
	font-family:'FontAwesome';
	float:right;
	margin:5px;
	font-weight:400
}
.inactive-header {
	background:#333;
}
.inactive-header:after {
	content:"\f067";
	font-family:'FontAwesome';
	float:right;
	margin:4px 5px;
	font-weight:400
}
.glyphicon {
    position: relative;
    top: 0px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.accordion-content {
	display:none;
	padding:20px;
	background:#fff;
	border:1px solid #ccc;
	border-top:0;
	-moz-border-radius:0 0 5px 5px;
	-webkit-border-radius:0 0 5px 5px;
	border-radius:0 0 5px 5px
}
.accordion-content a{
	text-decoration:none;
	color:#333;
}
.accordion-content td{
	border-bottom:1px solid #dcdcdc;
}



@media( max-width : 585px ) {

    .wizard {
        width: 90%;
        height: auto !important;
    }

    span.round-tab {
        font-size: 16px;
        width: 50px;
        height: 50px;
        line-height: 50px;
    }

    .wizard .nav-tabs > li a {
        width: 50px;
        height: 50px;
        line-height: 50px;
    }

    .wizard li.active:after {
        content: " ";
        position: absolute;
        left: 35%;
    }
}
 
</style>
<div class="container" style="margin-top:-30px" >
    <br> <br> 
    
            <h2>ادارة توزيــع مــواد الاقســام</h2>
           <br><br> 
    <div class="row">
    	<section>
             
  <p> </p>
           
            <form  action=" " method="post">
                <div class="tab-content">
                    <div class="tab-pane active" role="tabpanel" id="step1">

                    <div class="step1">

                   
                         <div class="row mar_ned">
                                <div class="col-md-12 col-xs-12">
                                    <p align="right"><stong>اسم المادة</stong></p>
                                </div>
                                <div class="col-md-12 col-xs-12">
                                    <select name="subject_id" id=" " class="dropselectsec">
                                    <option value="">Choose...</option>
                                           <?php  error_reporting(E_ALL ^ E_NOTICE);
 
              $uf=mysqli_query($conn,"SELECT * FROM `subject` order by SubjectName ASC");
              while ($unf=mysqli_fetch_assoc($uf)){
                ?>
                <option value="<?PHP echo $unf["subject_id"]; ?>"> <?PHP echo $unf["SubjectName"] ;} ?> </option>
               
                                    </select>
                                </div>
                            </div>
                         
                            <div class="row mar_ned">
                                <div class="col-md-12 col-xs-12">
                                    <p align="right"><stong>الكلية</stong></p>
                                </div>
                                <div class="col-md-12 col-xs-12">
                                    <select name="col_id" id="col_id" class="dropselectsec">
                                    <option value="">Choose...</option>
                                           <?php  error_reporting(E_ALL ^ E_NOTICE);
 
              $uf=mysqli_query($conn,"SELECT * FROM `colia` order by col_name ASC");
              while ($unf=mysqli_fetch_assoc($uf)){
                ?>
                <option value="<?PHP echo $unf["col_id"]; ?>"> <?PHP echo $unf["col_name"] ;} ?> </option>
               
                                    </select>
                                </div>
                            </div>
                         
                              <div class="row mar_ned">
                                <div class="col-md-12 col-xs-12">
                                    <p align="right"><stong>القسم--التخصص</stong></p>
                                </div>
                                <div class="col-md-12 col-xs-12">

                              <select name="dept_id"  id="dept_id" class="dropselectsec" >
                  <option value=""> Choose dept..</option>
                </select>
                   </div>
                     </div>
             <div class="row mar_ned">
                                <div class="col-md-12 col-xs-12">
                                    <p align="right"><stong>المستوى</stong></p>
                                </div>
                                <div class="col-md-12 col-xs-12">
                                    <select name="classid" id="classid" class="dropselectsec">
                                    <option value="">Choose...</option>
                                           <?php  error_reporting(E_ALL ^ E_NOTICE);
 
              $uf=mysqli_query($conn,"SELECT * FROM `class` ");
              while ($unf=mysqli_fetch_assoc($uf)){
                ?>
                <option value="<?PHP echo $unf["classid"]; ?>"> <?PHP echo $unf["ClassName"] ;} ?> </option>
               
                                    </select>
                                </div>
                            </div>
                         
                          <div class="row mar_ned">
                                <div class="col-md-12 col-xs-12">
                                    <p align="right"><stong>الفصل الدراسي</stong></p>
                                </div>
                                <div class="col-md-12 col-xs-12">
                                    <select name="TermS_id" id="TermS_id" class="dropselectsec">
                                    <option value="">Choose...</option>
                                         
                                    </select>
                                </div>
                            </div>
                         
                            <input type="submit" name="submit" class="btn btn-primary btn-info-full " value="حفظ البيانات"/>
                            
                        
                        
                        
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </form>
        
    </section>
   </div>
</div>

 





<?php
 if(!$_POST['submit']){ 
$classid=$_POST['classid'];
$query= "select * from term_study where classid='".$classid."'  ";
$result= mysqli_query($conn,$query);

while ($row= mysqli_fetch_array($result)) {
    ?>

    <option value='<?php echo $row['TermS_id'] ?>'>   <?php echo $row['Term_name'] ?></option>
<?php } }
 ?>
      
         <script>
                  
   $(document).ready(function(){

    $("#dept_id").change(function(){ 
      var dept_id = this.value;
      $.ajax({
      url: "samester.php",
      type: "POST",
      data: {
      	dept_id : dept_id
      },
      cache: false,
      success: function(data){
        $("#classid").html(data);

      }
      });
    });
     });
            
</script>
     
  <script src="jquery.main.js" type="text/javascript"></script>

<script>
   $(document).ready(function(){

    $("#classid").change(function(){
      var classid = this.value;
      $.ajax({
      url:"temp.php",
 type : "POST",
      data: {
      classid: classid
      },
      cache: false,
      success: function(data){
        $("#TermS_id").html(data);

      }
      });
    });
     });
</script>





<?php
 
  if(!$_POST['submit']){ 

   //add dept student
  $col_id=$_POST['col_id'];
$query= "select * from dept where col_id='".$col_id."'  ";
$result= mysqli_query($conn,$query);

while ($row= mysqli_fetch_array($result)) {
    ?>

    <option value='<?php echo $row['dept_id'] ?>'>   <?php echo $row['dept_name'] ?></option>
<?php }}
?>
  
  <script src="jquery.main.js" type="text/javascript"></script>

<script>
   $(document).ready(function(){

    $("#col_id").change(function(){
      var col_id = this.value;
      $.ajax({
      url: "reg.php",
     method : "POST",
      data: {
      col_id: col_id
      },
      cache: false,
      success: function(data){
        $("#dept_id").html(data);

      }
      });
    });
     });
</script>

 









  <?php
include("footermo.php");
}else {
    redirect("index.php");
}
?>
 