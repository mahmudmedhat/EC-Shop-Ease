var navBar = document.getElementById("navBar");
var closCart = document.getElementById("closCart");
var closWish = document.getElementById("closWish");
var bodyCart = document.getElementById("bodyCart");
var CartPage = document.getElementById("CartPage");
var alertCart=document.getElementById('alertCart')
var wishlstpage = document.getElementById("wishlstpage");

var bodywishal = document.getElementById("bodywishal");
var count = 0;
var setInCart;
var setInWislist;
var countOfCart;
var countOfwishlist;

async function getNavBar() {
  var navbar = await fetch("../navBarPage/navBar.html");
  var respons = await navbar.text();
  navBar.innerHTML = respons;




  // اول متفتج الصفحه ودوست علي الكارت بيعرضلك منتجاتك السابقه
  countOfCart = document.getElementById("countOfCart");

  if (localStorage.getItem("productCart") == null) {
    setInCart = "";
    countOfCart.innerHTML = `${setInCart.length}`;
  } else {
    setInCart = JSON.parse(localStorage.getItem("productCart"));
    countOfCart.innerHTML = `${setInCart.length}`;


    displayinCart();
  }

  countOfwishlist = document.getElementById("countOfwishlist");
  if (localStorage.getItem("productWislist") == null) {
    setInWislist = "";
    countOfwishlist.innerHTML = `${setInWislist.length}`;
  } else {
    setInWislist = JSON.parse(localStorage.getItem("productWislist"));
    countOfwishlist.innerHTML = `${setInWislist.length}`;


    displayinWishlist();
  }

    //   عرص الكارت بيج وسلة الرغبات
    const cartPage = document.getElementById("cartPage");
    const wishlstPage = document.getElementById("wishlstPage");


  if (wishlstPage) {
    wishlstPage.addEventListener("click", function (e) {
      e.preventDefault();

      wishlstpage.style.display = "flex";
    });
  } 

  if (cartPage) {
    cartPage.addEventListener("click", function (e) {
      e.preventDefault();

      CartPage.style.display = "flex";
    });
  }
  //  اخفاء الكارت

  closWish.addEventListener("click", function () {
  

    wishlstpage.style.display = "none";
  });
//  اخفاء الرغبات
  closCart.addEventListener("click", function () {
    CartPage.style.display = "none";
  });
  // بخفي ده علشان خلاص انا سجلت
  var adminName = document.getElementById("adminName");
  adminName.style.display = "none";
  // بخفي ده علشان خلاص انا سجلت
  var loginPage = document.getElementById("loginPage");
  loginPage.style.display = "none";
  // بخفي ده علشان خلاص انا سجلت
  var signUpPage = document.getElementById("signUpPage");
  signUpPage.style.display = "none";

  //حط لون علي الزرار لو روحت لي الصفحة تبعه
  const path = window.location.pathname;
  if (path.includes("home")) {
    document.getElementById("homePage")?.classList.add("active");
  }

  const logoutPage = document.getElementById("logoutPage");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // لازم اسال زرار اللوجاوت اتحمل ولا لسه
  if (logoutPage) {
    if (currentUser) {
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

// بجيب الدتا من الادمن

var productItem = document.getElementById("productItem");
var selectCategroy = document.getElementById("categroy");

const productContainer = JSON.parse(localStorage.getItem("products"));

selectCategroy.addEventListener("change", function (e) {
  var target = e.target.value;

  var products = "";
  for (var i = 0; i < productContainer.length; i++) {
    if (
      target === "" ||
      target === "All Products" ||
      target === productContainer[i].Category
    ) {
      products += `
    <div class="col-lg-3 col-sm-6">

<div class="product-card">
  <img src="${productContainer[i].Image}" class="product-img" alt="Product Image">
  <div class="product-body">
   <div class="d-flex justify-content-between align-items-center">
    <h2>${productContainer[i].Name}</h2>
  <button onclick="readyToWishlist(${i})" class="favorite-btn">
     <i class="fa fa-heart"></i> 
   </button>
    <h3 class="product-id">ID: <span class="text-warning">${productContainer[i].ID}</span></h3>
   </div>
    <div class="product-info">
    
     <div class="d-flex align-items-center">

        <p class="product-category">${productContainer[i].Category}</p>
         <h4 class="product-price ms-3">Tax: <span class="text-info">${productContainer[i].tax} </span></h4>

        
     </div>
     <hr>
  <div class="d-flex align-items-center justify-content-between">
      <p class="product-description ">${productContainer[i].Description}</p>
                                <h3 class="product-price ms-3">Price: <span class="text-secondary">${productContainer[i].Price} $</span></h3>

  </div>
      <h4 class="product-quantity"> ${productContainer[i].Quantity}</h4>
    </div>
    <button onclick="readyToCart(${i})"  class="add-to-cart-btn">
        <i class="fas fa-cart-plus"></i> 
      </button>

  </div>
</div>


</div>
`;
    }
  }

  productItem.innerHTML = products;
});

// ده اللي بيشغل الكود أول ما الصفحة تفتح
selectCategroy.dispatchEvent(new Event("change"));

// عرض منتجات السله لي اليوزر
function displayinCart() {
  
  setInCart = JSON.parse(localStorage.getItem("productCart")) || [];

  var carton = "";
  for (var i = 0; i < setInCart.length; i++) {
    carton += `
    
             <div class="container mb-2">
                <div class="row">
                <div class="col-md-8 g-2">
                  <div class="row posiItem">
                    <div class="col-md-12 ">
                        <div class="item d-flex align-items-center">
                            <img class="img-w rounded-4 p-2" src="${setInCart[i].Image}" alt="">
                            <div class="info">
                                <h6 class="ms-2 text-secondary">${setInCart[i].Name}</h6>
                            <div class="d-flex">
                                <h3 >${setInCart[i].Price}$</h3>
                                       <h3 class="text-info ps-3" >Q:${setInCart[i].Quantity}</h3>
                            </div>
                            </div>
                      
                                 <div class="btnIncreDec">
                            <button class="decrement butom" onclick="decrement(${i})">-</button>
                                <h3 id="counter" > <span id="counter-${i}">${setInCart[i].Quantity}</span></h3>
                             <button class="increment butom" onclick="increment(${i})">+</button>


                                 </div>
                               <button onclick="deletItemFromCart(${i})" id="RemoveItme" class="btn btn-danger">Remove Itme</button>
                        </div>

                    </div>
                 
                  </div>
                  
                </div>
          
              
                </div>
                
             </div>
    
    
    `;
  }
  carton += `

  <div class="d-flex justify-content-between align-items-center">
  <div>
  <h2 class="d-flex align-items-start text-secondary">total cart:<span class="ps-2 text-black ">${setInCart.length}</span></h2>
  <p class="d-flex align-items-start text-success fs-2">total Price:<span class="ps-2 fw-bold">${ calculateTotalPrice()} $</span></p>
  </div>
     <button class="btn btn-primary" onclick="checkoutOrder()">Checkout</button>
    <button class="btn btn-secondary" onclick="checkOrderStatus()">Check order status</button>
  </div>
<i id="closCart" class="fas fs-1 fa-close"></i> 
  <button onclick="removeAllcart()" id="RemoveAll" class="btn btn-danger">Remove All</button>
  
`;
  bodyCart.innerHTML = carton;

  const closCart = document.getElementById("closCart");
  const CartPage = document.getElementById("CartPage");
  if (closCart) {
    closCart.addEventListener("click", function () {
      CartPage.style.display = "none";
    });
  }

}

function displayinWishlist() {
  
  setInWislist = JSON.parse(localStorage.getItem("productWislist")) || [];
  var carton = "";
  for (var i = 0; i < setInWislist.length; i++) {
    carton += `
    
             <div class="container mb-2">
                <div class="row">
                <div class="col-md-8 g-2">
                  <div class="row posiItem">
                    <div class="col-md-12 ">
                        <div class="item d-flex align-items-center">
                            <img class="img-w rounded-4 p-2" src="${setInWislist[i].Image}" alt="">
                            <div class="info">
                                <h6 class="ms-2 text-secondary">${setInWislist[i].Name}</h6>
                            <div class="d-flex">
                                <h3 >${setInWislist[i].Price}$</h3>
                                       <h3 class="text-info ps-3" >Q:${setInWislist[i].Quantity}</h3>
                            </div>
                            </div>
                      
                               <button onclick="deletItemFromWislist(${i})" id="RemoveItme" class="btn btn-danger">Remove Itme</button>
                        </div>

                    </div>
                 
                  </div>
                  
                </div>
          
              
                </div>
                
             </div>
    
    
    `;
  }
  carton += `

  <div class="d-flex justify-content-between align-items-center">
  <div>
  <h2 class="d-flex align-items-start text-secondary">total cart:<span class="ps-2 text-black ">${setInWislist.length}</span></h2>
  <p class="d-flex align-items-start text-success fs-2">total Price:<span class="ps-2 fw-bold">${ calculateTotalPriceW()} $</span></p>
  </div>
     
  </div>
 <i id="closWish" class="fas fs-1 fa-close"></i>
  <button onclick="removeAllWishlist()" id="RemoveAll" class="btn btn-danger">Remove All</button>
  
`;
bodywishal.innerHTML = carton;
var closWish = document.getElementById("closWish");
var wishlstpage = document.getElementById("wishlstpage");

  if (closWish) {
    closWish.addEventListener("click", function () {
      wishlstpage.style.display = "none";
    });
  }

}



// بجهز لي الكارت

function readyToCart(index) {
  let carts = JSON.parse(localStorage.getItem("productCart")) || [];

  const product = productContainer[index];
  const foundIndex = carts.findIndex(item => item.ID === product.ID);
  console.log(foundIndex)

  if (foundIndex !== -1) {
    // المنتج موجود بالفعل، زوّد الكمية
    carts[foundIndex].Quantity += 1;
    carts[foundIndex].Price *=carts[foundIndex].Quantity

    if (alertCart) {
      alertCart.style.display = 'block';
      setTimeout(() => {
        alertCart.style.display = 'none';
      }, 2000);
    }
  }
   else {
    // أول مرة يدخل المنتج للسلة
    product.Quantity = 1;
    carts.push(product);

    if (alertCart) {
      alertCart.style.display = 'block';
      setTimeout(() => {
        alertCart.style.display = 'none';
      }, 2000);
    }
  }

  localStorage.setItem("productCart", JSON.stringify(carts));
  if (countOfCart) {
    countOfCart.innerHTML = `${carts.length}`;
  }

  displayinCart();



}
// بجهز لي الرغبات


function readyToWishlist(index) {

  let wishlist = JSON.parse(localStorage.getItem("productWislist")) || [];

  const product = productContainer[index];
  const foundIndex = wishlist.findIndex(item => item.ID === product.ID);
  console.log(foundIndex)

  if (foundIndex !== -1) {
    // المنتج موجود بالفعل، زوّد الكمية
    wishlist[foundIndex].Quantity += 1;
    wishlist[foundIndex].Price *=wishlist[foundIndex].Quantity
  } else {
    // أول مرة يدخل المنتج للسلة
    product.Quantity = 1;
    wishlist.push(product);
 
  }

  localStorage.setItem("productWislist", JSON.stringify(wishlist));
  if (countOfwishlist) {
    countOfwishlist.innerHTML = `${wishlist.length}`;
   }

   
  displayinWishlist();





}
////get total price
function calculateTotalPrice() {
  let carts = JSON.parse(localStorage.getItem("productCart")) || [];
  let total = 0;

  carts.forEach(item => {
    total += item.Price * item.Quantity;
  });

  return total;
}


function calculateTotalPriceW() {
  let wishlist = JSON.parse(localStorage.getItem("productWislist")) || [];
  let total = 0;

  wishlist.forEach(item => {
    total += item.Price * item.Quantity;
  });

  return total;
}
//////////////مسح محتويات الكارت
function removeAllcart() {
  localStorage.removeItem("productCart");
  displayinCart(); 
  if (countOfCart) {
    countOfCart.innerHTML = "0"; 
  }
}

//////مسح محتوايات السله كله

function removeAllWishlist() {
  localStorage.removeItem("productWislist");
  displayinWishlist(); 
  if (countOfwishlist) {
    countOfwishlist.innerHTML = "0";
  }
}
////////////////////////////
function deletItemFromCart(index) {
  setInCart.splice(index, 1);
  localStorage.setItem("productCart", JSON.stringify(setInCart));
  countOfCart.innerHTML = `${setInCart.length}`;
  displayinCart();

  // let carts = JSON.parse(localStorage.getItem("productCart")) || [];
}

//// مسح عنصر من الرغبات
function deletItemFromWislist(index) {
  setInWislist.splice(index, 1);
  localStorage.setItem("productWislist", JSON.stringify(setInWislist));
  countOfwishlist.innerHTML = `${setInWislist.length}`;
  displayinWishlist();

  // let carts = JSON.parse(localStorage.getItem("productCart")) || [];
}
 ///////// checkoutOrder
 function checkoutOrder() {
  let cart = JSON.parse(localStorage.getItem("productCart")) || [];

  if (cart.length === 0) {
    alert("السلة فاضية!");
    return;
  }

  let newOrder = {
    id: Date.now(),        // رقم فريد لكل طلب
    items: cart,           // المنتجات اللي في السلة
    status: "pending"      // الحالة الافتراضية: قيد الانتظار
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders.push(newOrder); // أضف الطلب الجديد إلى كل الطلبات

  localStorage.setItem("orders", JSON.stringify(orders));  // خزنه

  localStorage.setItem("lastOrderId", newOrder.id);

  localStorage.removeItem("productCart");  // فضي السلة

  alert("✅ تم إرسال الطلب إلى الأدمن بنجاح");

  // تقدر تضيف هنا توجيه أو تحديث للواجهة
  if (countOfCart) {
    countOfCart.innerHTML = "0";
  }

  displayinCart(); // تحديث الواجهة لو حابب
}


function checkOrderStatus() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const lastOrderId = Number(localStorage.getItem("lastOrderId"));

  const order = orders.find(o => o.id === lastOrderId);

  if (!order) {
    alert("🚫 لا يوجد طلب بهذا الرقم");
    return;
  }

  console.log(order.status); // ✅ هيطبع الحالة

  if (order.status === "accepted") {
    alert("🎉 طلبك اتقبل!");
  } else if (order.status === "rejected") {
    alert("😢 طلبك اترفض");
  } else {
    alert("⏳ طلبك قيد المراجعة...");
  }
}


function increment(index) {
  let carts = JSON.parse(localStorage.getItem("productCart")) || [];

  // زود الكمية
  carts[index].Quantity += 1;
  carts[index].Price *=  carts[index].Quantity 

  localStorage.setItem("productCart", JSON.stringify(carts));

  displayinCart();


}

function decrement(index) {
  let carts = JSON.parse(localStorage.getItem("productCart")) || [];

  // إذا كانت الكمية أكبر من 1، قم بتقليص الكمية
  if (carts[index].Quantity > 1) {
    carts[index].Quantity -= 1;
    carts[index].Price = carts[index].Price - carts[index].Price / (carts[index].Quantity + 1);
    localStorage.setItem("productCart", JSON.stringify(carts));

    displayinCart();

  }
}
// ده لو حد حب يشغل دماغه ويلعب في اللينك وهو مش مسجل
document.addEventListener("DOMContentLoaded", function () {
  var currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    window.location.href = "../loginPage/login.html";
  }
});
