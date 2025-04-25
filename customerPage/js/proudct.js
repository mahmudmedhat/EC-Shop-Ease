



var navBar = document.getElementById("navBar");

async function getNavBar() {
  var navbar = await fetch("../navBarPage/navBar.html");
  var respons = await navbar.text();
  navBar.innerHTML = respons;


  var cartPage = document.getElementById("cartPage");
  cartPage.style.display = "none";
  
  var countOfCart = document.getElementById("countOfCart");
  countOfCart.style.display = "none";
  //  اخفاء الكارت


  var homePage = document.getElementById("homePage");
  //بخفيهم لم اعمل تسجيل دخول
  homePage.style.display = "none";

  
  var wishlstPage = document.getElementById("wishlstPage");
  var countOfwishlist = document.getElementById("countOfwishlist");

  wishlstPage.style.display = "none";
  countOfwishlist.style.display = "none";


  //بخفيهم لم اعمل تسجيل دخول
  var loginPage = document.getElementById("loginPage");
  loginPage.style.display = "none";
  //بخفيهم لم اعمل تسجيل دخول
  var signUpPage = document.getElementById("signUpPage");
  signUpPage.style.display = "none";

  // بظهر  ده علشان خلاص انا سجلت
  var adminName = document.getElementById("adminName");
  adminName.style.display = "none";
  const logoutPage = document.getElementById("logoutPage");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (logoutPage) {
    if (currentUser) {
      adminName.innerHTML = currentUser.yName;
      logoutPage.style.display = "block";
      logoutPage.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("currentUser");
        window.location.href = "../loginPage/login.html";
      });
    } else {
      logoutPage.style.display = "none";
    }
  }
}
getNavBar();



// function setProductData(name, price, image,descrption) {
//       const product = {
//       name: name,
//       price: price,
//       image: image,
//       descrption:descrption
//     };
//     localStorage.setItem("selectedProduct", JSON.stringify(product));
//   }


// const product = JSON.parse(localStorage.getItem("selectedProduct"));
//      console.log(product);
         
//         window.addEventListener("DOMContentLoaded", () => {
//          const product = JSON.parse(localStorage.getItem("selectedProduct"));

//     if (product) {
//       document.querySelector("#proudct-name").textContent = product.name;
//       document.querySelector("#proudct-price").textContent = "$" + product.price;
//       document.getElementById("MainImage").src = product.image;
//       document.getElementById("descrption").textContent=product.descrption;
//     }
//         });









///////////////////////////////////////////////////////////
// get id from url
const prams=new URLSearchParams(window.location.search);
const productId =prams.get("id");

// get all proudct from local storage
const allproudcts=JSON.parse(localStorage.getItem('products'));
const proudct=allproudcts.find(pro=> pro.ID===productId);

if(proudct){
  document.querySelector("#pro-name").textContent = proudct.Name;
  document.querySelector("#proudct-name").textContent = proudct.Name;
  document.querySelector("#proudct-price").textContent = "$" + proudct.Price;
  document.getElementById("MainImage").src = proudct.Image;
  document.getElementById("descrption").textContent=proudct.Description;
  console.log( proudct.name ,proudct.Image );
  
}

















// ده لو حد حب يشغل دماغه ويلعب في اللينك وهو مش مسجل
document.addEventListener("DOMContentLoaded", function() {
  var currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
      window.location.href = "../loginPage/login.html";
  }
});