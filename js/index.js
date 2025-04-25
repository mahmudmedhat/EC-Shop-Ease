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




  // إضافة سرعة تحكم في الحركة إذا أردت تغيير السرعة
const images = document.querySelectorAll('.train-image');
images.forEach((img, index) => {
  img.style.animationDuration = `${4 + index * 1}s`; // يختلف السرعة لكل صورة
});
