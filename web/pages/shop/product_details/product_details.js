/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var extension = "";
var productid = "";
$(document).ready(function () {
    productDetailsFunctions();
});

function productDetailsFunctions() {
    productDetailsBtnEvents();
    productDetailsPageFunctions();

}

function GetProductID() {
    return categoryid = localStorage.getItem("productid");
}

function productDetailsBtnEvents() {

}
function productDetailsPageFunctions() {
    productid = GetProductID();
    if (productid) {
        GetData("Products", "GetProductDetails", "LoadShopProductDetails", productid);
    } else {

    }

}


function DisplayShopProductDetails(data) {
    $(".shop-p-det-name").text(data.InfoDetails.name);
    $(".shop-p-det-desc").text(data.InfoDetails.description);
    $(".shop-p-det-selling-price").text(PriceFormat(data.PriceDetails.selling_price));
    $(".shop-p-det-cost-price").text(PriceFormat(data.PriceDetails.cost_price));
    $(".shop-p-det-root-category").text(data.RootCatName).click(function () {
        localStorage.setItem("categoryid", data.RootCatID);
        window.location = extension + "LinksServlet?type=Products";
    });
    $(".shop-p-det-ship-p-d").text(data.ShippingPackageDetails.package_depth + " CM");
    $(".shop-p-det-ship-p-h").text(data.ShippingPackageDetails.package_height + " CM");
    $(".shop-p-det-ship-p-w").text(data.ShippingPackageDetails.package_width + " CM");
    $(".shop-p-det-seller-name").text(data.SellerDetails.SellerUserName);
    $(".shop-p-det-ref-num").text(data.InfoDetails.reference_code);
    $(".shop-p-det-upc").text(data.InfoDetails.upc_barcode);

    $(".shop-p-det-unit-name").text(data.UnitDetails.UnitName);
    $(".shop-p-det-unit-value").text(data.UnitDetails.value);

    $(".shop-p-det-condition").text(data.CondionDetails.name);

    $(".shop-p-det-addtoWishList").click(function () {
        sessionid = verifyUser();
        var UserType = sessionid.split("#")[1];
        if (UserType === "G") {
            localStorage.setItem("page_redirect", "saveditems");
            window.location = extension + "LinksServlet?type=Login";
        } else {
            ProcessProductOption("SavedItems", data.ProductID, data.PriceDetails.selling_price, 1, "Increase");
        }
    });

    $(".shop-p-det-addtocart").click(function () {
        var quantity = $("#shop-p-det-quantity").val();
        ProcessProductOption("Cart", data.ProductID, data.PriceDetails.selling_price, quantity, "Increase");
    });


    if (data.FirstImage === "0" || data.FirstImage === 0) {
        var image_url = extension + "assets/images/brand/logo.png";
        $(".shop-p-det-image11").attr("src", image_url);
        $(".shop-p-det-image11").attr("data-image", image_url);
        $(".shop-p-det-image11").attr("data-zoom-image", image_url);
        $(".shop-p-det-image1").attr("src", image_url);
        $(".shop-p-det-image1").attr("data-zoom-image", image_url);
    } else if (data.FirstImage !== "0" || data.FirstImage !== 0) {
        $(".shop-p-det-image1").attr("src", "data:image/png;base64," + data.FirstImage);
        $(".shop-p-det-image1").attr("data-zoom-image", "data:image/png;base64," + data.FirstImage);
        $(".shop-p-det-image11").attr("data-image", "data:image/png;base64," + data.FirstImage);
        $(".shop-p-det-image11").attr("data-zoom-image", "data:image/png;base64," + data.FirstImage);
        $(".shop-p-det-image11").attr("src", "data:image/png;base64," + data.FirstImage);
        $(".zoomWindow").attr("src", "data:image/png;base64," + data.FirstImage);
    }
    if (data.SecondImage) {
        if (data.SecondImage === "0" || data.SecondImage === 0) {
            var image_url = extension + "assets/images/brand/logo.png";
            $(".shop-p-det-image12").attr("src", image_url);
            $(".shop-p-det-image12").attr("data-image", image_url);
            $(".shop-p-det-image12").attr("data-zoom-image", image_url);
        } else if (data.SecondImage !== "0" || data.SecondImage !== 0) {
            $(".shop-p-det-image12").attr("data-image", "data:image/png;base64," + data.SecondImage);
            $(".shop-p-det-image12").attr("data-zoom-image", "data:image/png;base64," + data.SecondImage);
            $(".shop-p-det-image12").attr("src", "data:image/png;base64," + data.SecondImage);
            $(".zoomWindow").attr("src", "data:image/png;base64," + data.SecondImage);
        }
    }
    if (data.ImageDetails.ImageText3) {
        $(".owl-carousel .s-p-det-img3").parent().addClass("owl-item").removeClass("d-none");
        if (data.ImageDetails.ImageText3 === "0" || data.ImageDetails.ImageText3 === 0) {
            var image_url = extension + "assets/images/brand/logo.png";
            $(".shop-p-det-image13").attr("data-image", image_url);
            $(".shop-p-det-image13").attr("data-zoom-image", image_url);
            $(".shop-p-det-image13").attr("src", image_url);
        } else if (data.ImageDetails.ImageText3 !== "0" || data.ImageDetails.ImageText3 !== 0) {
            $(".shop-p-det-image13").attr("data-image", "data:image/png;base64," + data.ImageDetails.ImageText3);
            $(".shop-p-det-image13").attr("data-zoom-image", "data:image/png;base64," + data.ImageDetails.ImageText3);
            $(".shop-p-det-image13").attr("src", "data:image/png;base64," + data.ImageDetails.ImageText3);
            $(".zoomWindow").attr("src", "data:image/png;base64," + data.ImageDetails.ImageText3);
        }
    } else {
        $(".owl-carousel .s-p-det-img3").parent().removeClass("owl-item cloned").addClass("d-none");
    }
    if (data.ImageDetails.ImageText4) {
        $(".owl-carousel .s-qv-p-img4").parent().addClass("owl-item").removeClass("d-none");
        if (data.ImageDetails.ImageText4 === "0" || data.ImageDetails.ImageText4 === 0) {
            var image_url = extension + "assets/images/brand/logo.png";
            $(".shop-p-det-image14").attr("data-image", image_url);
            $(".shop-p-det-image14").attr("data-zoom-image", image_url);
            $(".shop-p-det-image14").attr("src", image_url);
        } else if (data.ImageDetails.ImageText4 !== "0" || data.ImageDetails.ImageText4 !== 0) {
            $(".shop-p-det-image14").attr("data-image", "data:image/png;base64," + data.ImageDetails.ImageText4);
            $(".shop-p-det-image14").attr("data-zoom-image", "data:image/png;base64," + data.ImageDetails.ImageText4);
            $(".shop-p-det-image14").attr("src", "data:image/png;base64," + data.ImageDetails.ImageText4);
            $(".zoomWindow").attr("src", "data:image/png;base64," + data.ImageDetails.ImageText4);
        }
    } else {
        $(".owl-carousel .s-p-det-img4").parent().removeClass("owl-item cloned").addClass("d-none");
    }
//

    var propdata = data.PropertyDetails;
    console.log(data.PropertyDetails);
    var PropertyParent = $("#shop-p-det-prop-list");
    PropertyParent.find(".new-clone").remove();
    if (propdata === "none") {
        PropertyParent.text("No Result");
    } else {
        var childclone = PropertyParent.find(".shop-p-det-prop-clone");
        var count = 0;
        $.each(propdata, function (index, details) {
            var newchild = childclone.clone();
            count++;
            newchild.removeClass("shop-p-det-prop-clone");
            newchild.removeClass("d-none");
            newchild.addClass("new-clone");
            if (details["RootPropName"] !== details["name"]) {
                newchild.find(".shop-p-det-prop-name").text(details["RootPropName"]);
                newchild.find(".shop-p-det-prop-value").text(details["name"]);
            } else {
                newchild.addClass("d-none");
            }
            newchild.appendTo(PropertyParent).show();
        });
        childclone.hide();
    }

    var catdata = data.CategoryDetails;
    var catParent = $("#shop-p-det-cat-list");
    catParent.find(".new-clone").remove();
    if (catdata === "none") {
        catParent.text("No Result");
    } else {
        var childclone = catParent.find(".shop-p-det-cat-clone");
        var count = 0;
        $.each(catdata, function (index, details) {
            var newchild = childclone.clone();
            count++;
            newchild.removeClass("shop-p-det-cat-clone");
            newchild.removeClass("d-none");
            newchild.addClass("new-clone");
            newchild.find(".shop-p-det-cat-name").text(details["CategoryName"]).click(function () {
                localStorage.setItem("categoryid", details["categoryid"]);
                window.location = extension + "LinksServlet?type=Products";
            }).hover(function () {
                $(this).addClass("text-success");
            }, function () {
                $(this).removeClass("text-success");
            });
            newchild.appendTo(catParent).show();
        });
        childclone.hide();
    }

    var tagdata = data.TagDetails;
    var TagDetails = $("#shop-p-det-tag-list");
    if (data === "none") {
        TagDetails.text("No Result");
    } else {
        var childclone = TagDetails.find(".shop-p-det-tag-clone");
        var count = 0;
        $.each(tagdata, function (index, details) {
            var newchild = childclone.clone();
            count++;
            newchild.removeClass("shop-p-det-tag-clone");
            newchild.removeClass("d-none");
            newchild.find(".shop-p-det-tag-name").text(details["name"]);
            newchild.appendTo(TagDetails).show();
        });
        childclone.hide();
    }

}