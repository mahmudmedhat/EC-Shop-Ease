var closCart = document.getElementById("closCart");
var bodyCart = document.getElementById("bodyCart");
var CartPage = document.getElementById("CartPage");
var count = 0;
let orders;
var countOfCart;

var navBar = document.getElementById("navBar");

async function getNavBar() {
  var navbar = await fetch("../navBarPage/navBar.html");
  var respons = await navbar.text();
  navBar.innerHTML = respons;

  const cartPage = document.getElementById("cartPage");


    // اول متفتج الصفحه ودوست علي الكارت بيعرضلك منتجاتك السابقه
    countOfCart = document.getElementById("countOfCart");
    if (localStorage.getItem("orders")  == null) {
      orders = "";
      countOfCart.innerHTML = `${orders.length}`;
    } else {
      orders = JSON.parse(localStorage.getItem("orders"));
      countOfCart.innerHTML = `${orders.length}`;
  
  

    }
  
  if (cartPage) {
    cartPage.addEventListener("click", function (e) {
      e.preventDefault();

      CartPage.style.display = "flex";
    });
  } else {
  }
  //  اخفاء الكارت

  closCart.addEventListener("click", function () {
    CartPage.style.display = "none";
  });

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
  adminName.style.display = "block";
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



function displayinAdmin() {
   orders = JSON.parse(localStorage.getItem("orders")) || [];
  const bodyCart = document.getElementById("bodyCart");
  let carton = "";

  for (let i = 0; i < orders.length; i++) {
    let order = orders[i];

    // عرض كل المنتجات داخل الأوردر

    for (let item of order.items) {
      carton += `

  <div class="container my-5">
  <div class="row">
    <!-- المنتجات -->
    <div class="col-md-7 col-sm-6">
      <div class="row posiItem">
        <div class="col-12">
          <div class="item d-flex align-items-center border rounded p-2 mb-2 shadow-sm bg-light">
            <img class="img-w rounded-4 me-2" src="${item.Image}" alt="" style="width: 70px; height: 70px; object-fit: cover;">
            <div class="info">
              <h6 class="text-secondary mb-1">${item.Name}</h6>
              <div class="d-flex flex-wrap">
                <h6 class="mb-0 text-dark">${item.Price}$</h6>
                <h6 class="mb-0 text-info ps-3">Q: ${item.Quantity}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- الطلب -->
   

      `;
    }

    carton += `
   <div class="col-md-5 col-sm-12">
      <div class="border rounded p-3 bg-white shadow-sm">
        <h6 class="mb-2"><strong>Order No:</strong> ${order.id}</h6>
        <p class="mb-3">Status: <strong class="text-warning">${order.status}</strong></p>

        <div class="d-flex justify-content-between">
          <button class="btn btn-sm btn-primary" onclick="acceptOrder(${order.id})">Accept</button>
          <button class="btn btn-sm btn-danger" onclick="rejectOrder(${order.id})">Reject</button>
        </div>
      </div>
    </div>
  </div>
</div>

    `;
  }

  // إضافة زر إغلاق
  carton += `
    <div class="text-end">
      <i id="closCart" class="fas fa-close fs-1 text-danger cursor-pointer"></i>
    </div>
  `;

  bodyCart.innerHTML = carton;

  const closCart = document.getElementById("closCart");
  if (closCart) {
    closCart.addEventListener("click", function () {
      CartPage.style.display = "none";
    });
  }
}


function acceptOrder(orderId) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let index = orders.findIndex(order => order.id === orderId);
  if (index !== -1) {
    orders[index].status = "accepted";
    localStorage.setItem("orders", JSON.stringify(orders));
    alert("تم قبول الطلب ✅");
    displayinAdmin(); // تحديث العرض
  }
}

function rejectOrder(orderId) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let index = orders.findIndex(order => order.id === orderId);
  if (index !== -1) {
    orders[index].status = "rejected";
    localStorage.setItem("orders", JSON.stringify(orders));
    alert("تم رفض الطلب ❌");
    displayinAdmin(); // تحديث العرض
  }
}
displayinAdmin();
// crud عمليات

var productID = document.getElementById("productID");
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productTax = document.getElementById("productTax");
var productQuantity = document.getElementById("productQuantity");
var productdCategory = document.getElementById("productdCategory");
var productDescription = document.getElementById("productDescription");
var aDdProduct = document.getElementById("addProduct");
var updatProduct = document.getElementById("updatProduct");
var realTimeSearch = document.getElementById("realTimeSearch");
var deletAllP = document.getElementById("deletAllP");
var coutOfproduc = document.getElementById("coutOfproduc");
var productImg = document.getElementById("productImg");


var productContainer ;
if(    localStorage.getItem('products') ==null)
{
  productContainer=[]
  coutOfproduc.innerHTML=`(${productContainer.length})`
}
else{
  
  productContainer=JSON.parse(localStorage.getItem('products'))
  coutOfproduc.innerHTML=`(${productContainer.length})`

  dispalyproduct()
}





function addProduct() {
  var product = {
    Image: `../adminPage/image/${productImg.files[0]?.name}`,
    ID: productID.value,
    Name: productName.value,
    Price: productPrice.value,

    Quantity: productQuantity.value,
    Category: productdCategory.value,
    Description: productDescription.value,
    // calculatProduct: function() {
    //   return this.Price * this.Quantity;
    // },
    // getTotal: function() {
    //   const basePrice = this.calculatProduct(); 
    //   const total = basePrice + (basePrice * this.tax / 100);  
    //   return total;
    // }
  };
 
    productContainer.push(product);


      coutOfproduc.innerHTML=`(${productContainer.length})`
    localStorage.setItem("products",JSON.stringify(productContainer));

    dispalyproduct()

}

//حذف المنتجات كلها
function deletALLProduct() {
  localStorage.removeItem("products");   
  productContainer = [];                 
  coutOfproduc.innerHTML = "(0)";        
  document.getElementById("productItem").innerHTML = "";
}





function dispalyproduct() {
  var productList = "";
  for (var i = 0; i < productContainer.length; i++) {

    // var product = productContainer[i];
    // var totalPrice = product.getTotal(); 
    productList += `

                      <div class="col-lg-3 col-sm-6">

                <div class="product-card">
                    <img src="${productContainer[i].Image}" class="product-img" alt="Product Image">
                    <div class="product-body">
                     <div class="d-flex justify-content-between align-items-center">
                      <h2>${productContainer[i].Name}</h2>
                    <button class="favorite-btn">
                       <i class="fa fa-heart"></i> 
                     </button>
                      <h3 class="product-id">ID: <span class="text-warning">${productContainer[i].ID}</span></h3>
                     </div>
                      <div class="product-info">
                      
                       <div class="d-flex align-items-center">
           
                          <p class="product-category">${productContainer[i].Category}</p>
                          <h3 class="product-price ms-3">Price: <span class="text-secondary">${productContainer[i].Price} $</span></h3>
                          
                       </div>
                       <hr>
                    <div class="d-flex align-items-center justify-content-between">
                        <p class="product-description ">${productContainer[i].Description}</p>
                        <button onclick="deletProduct(${i})" class="btn btn-danger btn-size">delete</button>
                    </div>
                        <h4 class="product-quantity"> ${productContainer[i].Quantity}</h4>
                      </div>
                      <button class="add-to-cart-btn">
                          <i class="fas fa-cart-plus"></i> 
                        </button>
                        <button onclick="setProduct(${i})" class="updat-btn">
                        <i class="fas fa-sync-alt"></i> 
                          </button>
                    </div>
                  </div>


                  </div>
                  
        
        `;
      



        
  }
  document.getElementById("productItem").innerHTML = productList;

  localStorage.setItem("products",JSON.stringify(productContainer));
}



function deletProduct(index){
if(index !=cruntIndex)
{
  productContainer.splice(index,1)
  localStorage.setItem("products",JSON.stringify(productContainer));
  dispalyproduct();
  coutOfproduc.innerHTML = `(${productContainer.length})`; 

}
}

var cruntIndex;
function setProduct(index) {
  cruntIndex=index
  productID.value =productContainer[index].ID;
  productName.value =productContainer[index].Name;
  productdCategory.value =productContainer[index].Category;
  productDescription.value =productContainer[index].Description;
  productQuantity.value =productContainer[index].Quantity;
  productPrice.value =productContainer[index].Price;
 productImg.src=productContainer[index].Image

aDdProduct.classList.add('d-none')
updatProduct.classList.remove('d-none')


  document.body.scrollTop=0;
  document.documentElement.scrollTop = 0;

}


function updataProduct()
{
  var product = {
    Image: `../adminPage/image/${productImg.files[0]?.name}`,
    ID: productID.value,
    Name: productName.value,
    Price: productPrice.value,
    Quantity: productQuantity.value,
    Category: productdCategory.value,
    Description: productDescription.value,
  };
  productContainer.splice(cruntIndex,1,product)

  aDdProduct.classList.remove('d-none')
  updatProduct.classList.add('d-none')
  localStorage.setItem("products",JSON.stringify(productContainer));

  dispalyproduct();
}

function searchProduct()
{
var aLLProduct=''
  for(var i=0;i<productContainer.length;i++)
  {
    if(productContainer[i].Name.toLowerCase().includes(realTimeSearch.value.toLowerCase())==true)
    {
      aLLProduct+=`          <div class="col-lg-3 col-sm-6">

                <div class="product-card">
                    <img src="${productContainer[i].Image}" class="product-img" alt="Product Image">
                    <div class="product-body">
                     <div class="d-flex justify-content-between align-items-center">
                      <h2>${productContainer[i].Name}</h2>
                    <button class="favorite-btn">
                       <i class="fa fa-heart"></i> 
                     </button>
                      <h3 class="product-id">ID: <span class="text-warning">${productContainer[i].ID}</span></h3>
                     </div>
                      <div class="product-info">
                      
                       <div class="d-flex align-items-center">
           
                          <p class="product-category">${productContainer[i].Category}</p>
                          <h3 class="product-price ms-3">Price: <span class="text-secondary">${productContainer[i].Price} $</span></h3>

                       </div>
                       <hr>
                    <div class="d-flex align-items-center justify-content-between">
                        <p class="product-description ">${productContainer[i].Description}</p>
                        <button onclick="deletProduct(${i})" class="btn btn-danger btn-size">delete</button>
                    </div>
                        <h4 class="product-quantity"> ${productContainer[i].Quantity}</h4>
                      </div>
                      <button class="add-to-cart-btn">
                          <i class="fas fa-cart-plus"></i> 
                        </button>
                        <button onclick="setProduct(${i})" class="updat-btn">
                        <i class="fas fa-sync-alt"></i> 
                          </button>
                    </div>
                  </div>


                  </div>
                  `
    }
  }
  localStorage.setItem("products",JSON.stringify(productContainer));
  document.getElementById("productItem").innerHTML = aLLProduct;
}




// ده لو حد حب يشغل دماغه ويلعب في اللينك وهو مش مسجل
document.addEventListener("DOMContentLoaded", function() {
  var currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
      window.location.href = "../loginPage/login.html";
  }
});