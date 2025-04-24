var yourName=document.getElementById('userName')
var yourEmail=document.getElementById('userEmail')
var yourPassword=document.getElementById('userPassword')
var confirmPassword=document.getElementById('Confirmpassword')
var userType=document.getElementById('userType')
var submitData=document.getElementById('submitData')
var yournameErr=document.getElementById('yourNameErr')
var yourEmailErr=document.getElementById('yourEmailErr')
var yourPassErr=document.getElementById('yourPassErr')
var yourConfPassErr=document.getElementById('yourConfPassErr')
var youruserTypeErr=document.getElementById('youruserTypeErr')
var alertSuccess=document.getElementById('alertSuccess')



var navBar=document.getElementById('navBar')




var regxEmail=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
var regxPass=/[0-9]{6,10}/;
var regxuserType=/^(admin|customer)$/;


//جعل النف بار موجد في الصفحات
async function getNavBar() {
  var navbar = await fetch("../navBarPage/navBar.html");
  var respons = await navbar.text();
  navBar.innerHTML = respons;



  var wishlstPage = document.getElementById("wishlstPage");
  var countOfwishlist = document.getElementById("countOfwishlist");
  countOfwishlist.style.display = "none";
  wishlstPage.style.display = "none";
  var countOfCart = document.getElementById("countOfCart");
  countOfCart.style.display = "none";
  var cartPage = document.getElementById("cartPage");
  cartPage.style.display = "none";
  // بخفي ده علشان خلاص انا سجلت 

    // بخفي ده علشان خلاص انا سجلت 
    var adminName = document.getElementById("adminName");
    adminName.style.display = "none";
        // بخفي ده علشان خلاص انا سجلت 
  var logoutPage=document.getElementById('logoutPage')
    logoutPage.style.display='none'
        // بخفي ده علشان خلاص انا سجلت 
  var homePage=document.getElementById('homePage')
  homePage.style.display='none'


  
//حط لون علي الزرار لو روحت لي الصفحة تبعه
  const path = window.location.pathname
  if (path.includes("signUp")) {
    document.getElementById("signUpPage")?.classList.add("active");
    document.getElementById("loginPage")?.classList.remove("active");
  }
}
getNavBar();
var allUsers=[]
// الكود ده ليه ؟ علشان انا اول مدخل مستخدم جديد بيعمل اوفر ريت علي القديم وده مينفعش
if(localStorage.getItem("users")==null)
    {
        allUsers=[];
    }
    else{
        allUsers =JSON.parse( localStorage.getItem("users"));
      
    }
    submitData.disabled = true;

// دالة كنت لازم اعمله علشان افحص الداتا وهي داخله ولازم تكون الداتا صح والدالة دي بنادي عليه في كل انبوت 

function validateAllData(inputName, condaition, errName, msgName) {
  if (condaition) {
    inputName.classList.add("is-invalid");
    inputName.classList.remove("is-valid");
    errName.style.display = "flex";
    errName.innerHTML = msgName;
  } else {
    inputName.classList.add("is-valid");
    inputName.classList.remove("is-invalid");
    errName.style.display = "none";
  }

  checkInputs();
  return
}
// انبت الاسم
yourName.addEventListener("keyup", () => {
  validateAllData(
    yourName,
    yourName.value.trim().length <= 3,
    yournameErr,
    "Name must be at least 3 characters"
  );
});
// انبت الايميل


yourEmail.addEventListener("keyup", () => {
  validateAllData(
    yourEmail,
    regxEmail.test(yourEmail.value) == false,
    yourEmailErr,
    "email is req & such a example@gmail.com"
  );
});
// انبت الباسورد

yourPassword.addEventListener("keyup", () => {
  validateAllData(
    yourPassword,
    regxPass.test(yourPassword.value) == false,
    yourPassErr,
    "pass must start at lest 6 num"
  );
});
// انبت اعادة كتابة الباسورد
confirmPassword.addEventListener("keyup", () => {
  validateAllData(
    confirmPassword,
    yourPassword.value !== confirmPassword.value,
    yourConfPassErr,
    "rePassword must match"
  );
});

// انبت اختيار اليوزر


function checkInputs() {
    if (
      yourName.classList.contains("is-valid") &&
      yourEmail.classList.contains("is-valid") &&
      yourPassword.classList.contains("is-valid") &&
      confirmPassword.classList.contains("is-valid")
  
      
    )
     {
      submitData.disabled = false; // تفعيل الزر
    } else {
      submitData.disabled = true; // إبقاء الزر معطل
    }
  }
  
  
    // اضافة مستخدم جديد
    function addUser() {
      var loader = document.getElementById('loader');
      loader.style.display = 'flex'; // إظهار اللودر
    
      var signUp = {
        yName: yourName.value,
        yEmail: yourEmail.value,
        yPass: yourPassword.value,
        yConfPass: confirmPassword.value,
      };
    
      var allUsers = JSON.parse(localStorage.getItem('users')) || [];
    
      const isEmailExists = allUsers.find(user => user.yEmail === signUp.yEmail);
    
      if (isEmailExists) {
        setTimeout(() => {
          loader.style.display = 'none'; // إخفاء اللودر
    
          alertSuccess.style.left = '5%';
          alertSuccess.style.color = '#a94442';
          alertSuccess.style.border = '1px solid #a94442';
          alertSuccess.style.backgroundColor = '#f8d7da';
          alertSuccess.innerHTML = 'Account is already Exists ';
          setTimeout(() => {
            alertSuccess.style.left = '-50%';
          }, 2000);
        }, 1000);
        return;
      }
    
      allUsers.push(signUp);
      localStorage.setItem('users', JSON.stringify(allUsers));
      console.log(allUsers);
    
      setTimeout(() => {
        loader.style.display = 'none'; // إخفاء اللودر
    
        alertSuccess.style.left = '5%';
        alertSuccess.style.color = '#155724';
        alertSuccess.style.border = 'none';
        alertSuccess.style.backgroundColor = '#d4edda';
        alertSuccess.innerHTML = 'Registration completed successfully';
        setTimeout(() => {
          location.href = "../loginPage/login.html";
        }, 2000);
      }, 1000);
    }
