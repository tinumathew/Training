var i = 0, totalAmount = 0, currentItem = 0;
var images = ["../assets/dress.jpg", "../assets/footwear.jpeg", "../assets/handbags.JPG", "../assets/laptop.jpg", "../assets/ornaments.jpg", "../assets/teddy.jpg", "../assets/orange.jpg", "../assets/chocolate.jpg", "../assets/wheat.jpg"];
var item = ["Frock", "Men's Shoes", "Leather Handbag", "Lenovo Laptop", "Red Ruby Jewellery", "Teddy Bear", "Oranges", "Diary Milk", "Cream Wheat Cinnabon"];
var price = [850, 1200, 450, 25500, 150000, 500, 50, 10, 275];
var count = [5, 12, 3, 10, 2, 8, 20, 30, 35];
var cartItem = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var itemObj = [];
function displayItems(i) {
    "use strict";
    $("#caption").html("Item Details");
    $("#iname").html("Item Name:" + itemObj[i].item);
    $("#iprice").html("Item Price:" + itemObj[i].price);
    $("#icount").html("Item Count:" + itemObj[i].count);
    $("#itotal").html("Total Amount:" + totalAmount);
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
ProductChild.prototype = new Product();
for (i = 0; i < 9; i += 1) {
    itemObj[i] = new ProductChild(item[i], price[i], count[i], images[i]);
}
function start() {
    "use strict";
    for (i = 0; i < 9; i += 1) {
        var division = $("<div></div>"), t = $("<img>");
        division.attr("id", i);
        $("#tile").append(division);
        $(t).attr({src: images[i], alt: "Image", id: i}).addClass("imag");
        $("#" + i).append(t);
    }
}
$(document).ready(function () {
    "use strict";
    $("#tile").mouseenter(function () {
        $(".imag").bind("click", function (e) {
            displayItems(e.currentTarget.id);
        });
    });
    
    $("#add , #cancel").focusin(function () {
        $(this).css("background-color", "white");
        $(this).css("color", "blue");
    });
    $("#add , #cancel").focusout(function () {
        $(this).css("background-color", "blue");
        $(this).css("color", "white");
    });
});
$("#add").click(itemObj[currentItem].addToCart);
$("#cancel").click(itemObj[currentItem].cancelFromCart);
