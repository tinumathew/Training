var i = 0, totalAmount = 0, currentItem = 0;
var images = ["assets/dress.jpg", "assets/footwear.jpeg", "assets/handbags.JPG", "assets/laptop.jpg", "assets/ornaments.jpg", "assets/teddy.jpg", "assets/orange.jpg", "assets/chocolate.jpg", "assets/wheat.jpg"];
var item = ["Frock", "Men's Shoes", "Leather Handbag", "Lenovo Laptop", "Red Ruby Jewellery", "Teddy Bear", "Oranges", "Diary Milk", "Cream Wheat Cinnabon"];
var price = [850, 1200, 450, 25500, 150000, 500, 50, 10, 275];
var count = [5, 12, 3, 10, 2, 8, 20, 30, 35];
var cartItem = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var itemObj = [];
function displayItems(i) {
    "use strict";
    document.getElementById("caption").innerHTML = "Item Details";
    document.getElementById("iname").innerHTML = "Item Name:" + itemObj[i].item;
    document.getElementById("iprice").innerHTML = "Item Price:" + itemObj[i].price;
    document.getElementById("icount").innerHTML = "Item Count:" + itemObj[i].count;
    document.getElementById("itotal").innerHTML = "Total Amount:" + totalAmount;
    currentItem = i;
}
function Product(item, price) {
    "use strict";
    this.item = item;
    this.price = price;
}
function ProductChild(name, price, count, images) {
    "use strict";
    this.count = count;
    this.images = images;
    Product.call(this, name, price);
    this.addToCart = function () {
        var avail = itemObj[currentItem].count;
        if (avail > 0) {
            avail = avail - 1;
            itemObj[currentItem].count = avail;
            totalAmount = totalAmount + itemObj[currentItem].price;
            cartItem[currentItem] = cartItem[currentItem] + 1;
            displayItems(currentItem);
        }
    }
    this.cancelFromCart = function () {
        var cancelavail = itemObj[currentItem].count;
        if (cartItem[currentItem] > 0) {
            cancelavail = cancelavail + 1;
            itemObj[currentItem].count = cancelavail;
            cartItem[currentItem] = cartItem[currentItem] - 1;
            totalAmount = totalAmount - itemObj[currentItem].price;
            displayItems(currentItem);
        }
    }
}
ProductChild.prototype = Object.create(Product.prototype);
ProductChild.prototype.constructor = ProductChild;
for (i = 0; i < 9; i += 1) {
    itemObj[i] = new ProductChild(item[i], price[i], count[i], images[i]);
}
function start() {
    "use strict";
    for (i = 0; i < 9; i += 1) {
        var division = document.createElement("div");
        var t = document.createElement("img");
        t.setAttribute("src", images[i]);
        t.setAttribute("height", "200");
        t.setAttribute("width", "200");
        t.setAttribute("alt", "Image");
        t.setAttribute("id", i);
        t.setAttribute("style", "float:left;padding:10px;");
        division.appendChild(t);
        document.getElementById("tile").appendChild(division);
        document.getElementById(i).addEventListener("click", function (it) {
            return function () {
                displayItems(it);
            }
        }
            (i));
    }
}
$(document).ready(function () {
    "use strict";
    $("#tile").mouseover(function () {
        $("img").mouseover(function (t) {
            var ele = t.currentTarget.id;
            $("#" + ele).css("opacity", "0.2");
        });
        $("img").mouseout(function (e) {
            var ele = e.currentTarget.id;
            $("#" + ele).css("opacity", "1");
        });
    });
});
$(document).ready(function () {
    "use strict";
    $("#add , #cancel").focusin(function () {
        $(this).css("background-color", "white");
        $(this).css("color", "blue");
    });
    $("#add , #cancel").focusout(function () {
        $(this).css("background-color", "blue");
        $(this).css("color", "white");
    });
});
document.getElementById("add").addEventListener("click", itemObj[currentItem].addToCart);
document.getElementById("cancel").addEventListener("click", itemObj[currentItem].cancelFromCart);
