var Masterwishlistview = {
    variables: {
        File: 'WishList.Js',
    },
    Bindwishlist: function () {

        $(".loadingtrinity").show();
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_WISHLIST_GET",
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    $("#wishlistdata").html("");
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.totalrecords > 0) {
                            $("#wishlistdata").show();
                            $("#emptywishlist").hide();
                            if (JsonObject.serviceresponse.detailslist != undefined) {
                                $("#wishlistdata").append($("#Databindwishlist").render(JsonObject.serviceresponse.detailslist.details));

                                $(".relateddesignprice").each(function () {
                                    var id = $(this).attr('id');
                                    var Rowid = id.split("relateddesignprice");
                                    var totalp = $("#iprrel" + Rowid[1]).val();
                                    var convertint = parseFloat(totalp).toLocaleString(getCurrencyLang(), {
                                        style: 'currency', currency: getCurrencyCode(),
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    });
                                    $("#" + id).html(convertint);
                                });
                                $(".relateddesignpricedis").each(function () {
                                    var id1 = $(this).attr('id');
                                    var Rowid1 = id1.split("relateddesignpricedis");
                                    var totalp1 = $("#disiprrel" + Rowid1[1]).val();
                                    var convertint1 = parseFloat(totalp1).toLocaleString(getCurrencyLang(), {
                                        style: 'currency', currency: getCurrencyCode(),
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    });
                                    $("#" + id1).html(convertint1);
                                });

                            }
                        }
                        else {
                            $("#wishlistdata").hide();
                            $("#emptywishlist").show();
                        }
                        $(".loadingtrinity").hide();
                    }
                    else {
                        $(".loadingtrinity").hide();
                        InvalidResponseCode(data);
                    }
                } catch (e) {
                    $(".loadingtrinity").hide();
                    ErrorDetails(e, Masterwishlistview.variables.File);
                }
            },
            error: OnError,
        });
    },

}
function daletetowishlist(id) {
    var data = {
        "DESIGNNO": $("#designno" + id).html(),
    }
    $.ajax({
        url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_WISHLIST_CRUD",
        data: data,
        async: true,
        cache: false,
        type: 'POST',
        success: function (data) {
            try {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    //CartWishlistCount();
                    Masterwishlistview.Bindwishlist();
                }
                else {
                    InvalidResponseCode(data);
                }
            } catch (e) {
                $(".loadingtrinity").hide();
                ErrorDetails(e, Masterwishlistview.variables.File);
            }
        },
        error: OnError,
    });
}
function showproductdetail(id) {
    try {
        window.location.href = getDomain() + "/Product/ProductDetail?id=" + id;
    } catch (e) {
        $(".loadingtrinity").hide();
        ErrorDetails(e, Masterwishlistview.variables.File);
    }
}
function addtocartfromwishlist(id) {
    var data = {
        "oper": "add",
        "DESIGNNO": $("#designno" + id).html(),
        "ISCUSTOMIZE": "0",
        "QUANTITY": "1",
        "ISTOADDFROMWISHLIST": 1
    }
    $.ajax({
        url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_CART_CRUD",
        data: data,
        async: true,
        cache: false,
        type: 'POST',
        success: function (data) {
            try {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    CartWishlistCount();
                    Masterwishlistview.Bindwishlist();
                }
                else {
                    InvalidResponseCode(data);
                }
            } catch (e) {
                $(".loadingtrinity").hide();
                ErrorDetails(e, Masterwishlistview.variables.File);
            }
        },

        error: OnError,
    });
}
$(document).ready(function () {
    Masterwishlistview.Bindwishlist();
});