var yourEmail=document.getElementById('userEmail')
var yourPassword=document.getElementById('userPassword')
var yourEmailErr=document.getElementById('yourEmailErr')
var yourPassErr=document.getElementById('yourPassErr')
var alertSuccess=document.getElementById('alertSuccess')
var navBar=document.getElementById('navBar')

var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
var passRegex = /[0-9]{6,10}/;


//جعل النف بار موجد في الصفحات
async function getNavBar() {
  var navbar = await fetch("../navBarPage/navBar.html");
  var respons = await navbar.text();
  navBar.innerHTML = respons;


  var wishlstPage = document.getElementById("wishlstPage");
  wishlstPage.style.display = "none";

  var countOfwishlist = document.getElementById("countOfwishlist");
  countOfwishlist.style.display = "none";
  var countOfCart = document.getElementById("countOfCart");
  countOfCart.style.display = "none";
  var cartPage = document.getElementById("cartPage");
  cartPage.style.display = "none";
  // بخفي ده علشان خلاص انا سجلت 

  var adminName = document.getElementById("adminName");
  adminName.style.display = "none";
  
  // بخفي ده علشان خلاص انا سجلت 
  var logoutPage=document.getElementById('logoutPage')
    logoutPage.style.display='none'
    
  var homePage=document.getElementById('homePage')
  // بخفي ده علشان خلاص انا سجلت 
  homePage.style.display='none'


  
//حط لون علي الزرار لو روحت لي الصفحة تبعه
  const path = window.location.pathname;
  if (path.includes("login")) {
    document.getElementById("loginPage")?.classList.add("active");
    document.getElementById("signUpPage")?.classList.remove("active");
  } 



  }

getNavBar();
// بقوله لو المدخلات صحيحه شيل الايررور
yourEmail.addEventListener("keyup", function () {
    if (emailRegex.test(yourEmail.value)) {
        yourEmailErr.style.display = "none";
    }
  });
  yourPassword.addEventListener("keyup", function () {
    if (passRegex.test(yourPassword.value)) {
        yourPassErr.style.display = "none";
    }
  });
  function singIn() {
    var loader = document.getElementById('loader');
    loader.style.display = 'flex'; 

    var loginData = {
      email: yourEmail.value,
      password: yourPassword.value,
    };
  
    if (!yourEmail.value) {
      yourEmailErr.style.display = "flex";
      yourEmailErr.innerHTML = "Please enter your email";
      loader.style.display = 'none'; 
    
      return;
    }
    if (!emailRegex.test(yourEmail.value)) {
      yourEmailErr.style.display = "flex";
      yourEmailErr.innerHTML = "Email is invalid";
      loader.style.display = 'none'; 
      return;
    }
  
    if (!yourPassword.value) {
      yourPassErr.style.display = "flex";
      yourPassErr.innerHTML = "Please enter your password";
      loader.style.display = 'none'; 
      return;
    }
    if (!passRegex.test(yourPassword.value)) {
      yourPassErr.style.display = "flex";
      yourPassErr.innerHTML = "Password must be 6-10 digits";
      loader.style.display = 'none'; 
      return;
    }

    var allUsers = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUser = allUsers.find(user => user.yEmail === loginData.email && user.yPass === loginData.password);
  
    if (loggedInUser) {
      localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
  
      // التحقق من البريد الإلكتروني إذا كان يحتوي على "admin"
      if (loggedInUser.yEmail.includes("admin")) {

        // إذا كان البريد يحتوي على "admin" توجيه المستخدم إلى صفحة الإدارة
        alertSuccess.style.left = '25%';
        alertSuccess.style.color = '#155724';
        alertSuccess.style.backgroundColor = '#d4edda';
        alertSuccess.innerHTML = `Welcome ${loggedInUser.yName}`;
        setTimeout(() => {
          loader.style.display = 'none';
          location.href = "../adminPage/admin.html";
        }, 2000);
        return;
      } else {
   
        // إذا لم يحتوي البريد على "admin" توجيه المستخدم إلى صفحة العميل
        alertSuccess.style.left = '25%';
        alertSuccess.style.color = '#155724';
        alertSuccess.style.backgroundColor = '#d4edda';
        alertSuccess.innerHTML = `Welcome ${loggedInUser.yName}`;
        setTimeout(() => {
          location.href = "../customerPage/home.html";
        }, 2000);
        return;
      }
    } else {
      setTimeout(() => {
      loader.style.display = 'none'
        alertSuccess.style.left = '25%';
        alertSuccess.style.color = '#a94442';
        alertSuccess.style.border = 'none';
        alertSuccess.style.backgroundColor = '#f2dede';
        alertSuccess.innerHTML = 'Incorrect email or password, Please try again';
        setTimeout(() => {
          alertSuccess.style.left = '-50%';
        }, 2000);
      }, 1000);
      return;
    }
  }
  

