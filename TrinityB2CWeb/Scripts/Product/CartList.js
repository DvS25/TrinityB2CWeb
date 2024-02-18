var Castlistview = {
    variables: {
        File: 'CartList.Js',
    },
    validator2: $("#addaddressform").validate({
        errorPlacement: function (error, element) {
            if ($(element).attr('id') == 'txtcontactperson') {
                error.insertAfter($("#txtcontactperson"));
            }
            else if ($(element).attr('id') == 'txtaddress') {
                error.insertAfter($("#txtaddress"));
            }
            else if ($(element).attr('id') == 'findcountry') {
                error.insertAfter($("#findcountry"));
            }
            else if ($(element).attr('id') == 'findstate') {
                error.insertAfter($("#findstate"));
            }
            else if ($(element).attr('id') == 'txtlandmark') {
                error.insertAfter($("#txtlandmark"));
            }
            else if ($(element).attr('id') == 'findcity') {
                error.insertAfter($("#findcity"));
            }
            else if ($(element).attr('id') == 'txtpincode') {
                error.insertAfter($("#txtpincode"));
            }
            else if ($(element).attr('id') == 'txtmobileno') {
                error.insertAfter($("#txtmobileno"));
            }
            else {
                element.after(error);
            }
        }
    }),
    Bindcartdata: function () {
        $(".loadingtrinity").show();
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_CART_GET",
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    $("#datacartdesigns").html("");
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.totalrecords > 0) {
                            $("#showcart").show();
                            $("#emptycartdiv").hide();
                            if (JsonObject.serviceresponse.detailslist != undefined) {
                                $("#datacartdesigns").append($("#cartdisgnsdata").render(JsonObject.serviceresponse.detailslist.details));
                                $(".designprice").each(function () {
                                    var id = $(this).attr('id');
                                    var Rowid = id.split("designprice");
                                    var totalp = $("#iprrel" + Rowid[1]).val();
                                    var convertint = parseFloat(totalp).toLocaleString(getCurrencyLang(), {
                                        style: 'currency', currency: getCurrencyCode(),
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    });
                                    $("#" + id).html(convertint);
                                });
                                $(".designpricedis").each(function () {
                                    var id1 = $(this).attr('id');
                                    var Rowid1 = id1.split("designpricedis");
                                    var totalp1 = $("#disiprrel" + Rowid1[1]).val();
                                    var convertint1 = parseFloat(totalp1).toLocaleString(getCurrencyLang(), {
                                        style: 'currency', currency: getCurrencyCode(),
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    });
                                    $("#" + id1).html(convertint1);
                                });

                            }
                            if (JsonObject.serviceresponse.totalpricelist != undefined) {
                                $("#totalcartamount").html(JsonObject.serviceresponse.totalpricelist.totalprice);
                                $("#totalcartamount").html(parseFloat($("#totalcartamount").html()).toLocaleString(getCurrencyLang(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));

                                $("#totaldeliveryamount").html(JsonObject.serviceresponse.totalpricelist.deliverycharge);
                                $("#totaldeliveryamount").html(parseFloat($("#totaldeliveryamount").html()).toLocaleString(getCurrencyLang(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));

                                if (JsonObject.serviceresponse.totalpricelist.totalgiftamt > 0) {
                                    $("#giftchargediv").show();
                                    $("#totalgiftchargeamount").html(JsonObject.serviceresponse.totalpricelist.totalgiftamt);
                                    $("#totalgiftchargeamount").html(parseFloat($("#totalgiftchargeamount").html()).toLocaleString(getCurrencyLang(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                                }
                                else {
                                    $("#totalgiftchargeamount").html("");
                                    $("#giftchargediv").hide();
                                }

                                $("#totalpayableamount").html(JsonObject.serviceresponse.totalpricelist.finalamount);
                                $("#totalpayableamount").html(parseFloat($("#totalpayableamount").html()).toLocaleString(getCurrencyLang(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                            }
                            $("#addresssignledetail").html("");
                            if (JsonObject.serviceresponse.customerdetail != undefined) {
                                $("#addresssignledetail").append($("#Dataaddressdetail").render(JsonObject.serviceresponse.customerdetail));
                            }
                        }
                        else {
                            $("#showcart").hide();
                            $("#emptycartdiv").show();
                        }
                        $(".loadingtrinity").hide();
                    }
                    else {
                        $(".loadingtrinity").hide();
                        InvalidResponseCode(data);
                    }
                } catch (e) {
                    ErrorDetails(e, Castlistview.variables.File);
                }
            },
            error: OnError,
        });
    },
    Quantityvalue: function (id) {
        try {
            var data = {
                "oper": "edit",
                "CARTID": id,
                "QUANTITY": $("#quantitytotal" + id).html(),
            }
            Castlistview.Cartcrud(data);
        } catch (e) {
            ErrorDetails(e, Castlistview.variables.File);
        }
    },
    Cartcrud: function (data) {
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_CART_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        Castlistview.Bindcartdata();
                    }
                    else {
                        InvalidResponseCode(data);
                    }
                } catch (e) {
                    ErrorDetails(e, Castlistview.variables.File);
                }
            },
            error: OnError,
        });
    },
    Deletecartaddwishlist: function (cartid) {
        try {
            var movewish = "MovetoWish";
            Castlistview.cartdltdata(cartid, movewish);
        } catch (e) {
            ErrorDetails(e, Castlistview.variables.File);
        }
    },
    Deletecartlist: function (cartid) {
        try {
            var movewish = "";
            Castlistview.cartdltdata(cartid, movewish);
        } catch (e) {
            ErrorDetails(e, Castlistview.variables.File);
        }
    },
    cartdltdata: function (cartid, movewish) {
        try {
            var data = {
                "oper": "delete",
                "CARTID": cartid,
                "WHERE_EQ_DELETETYPE": movewish,
            }
            Castlistview.saveoperation(data, cartid);
        } catch (e) {
            ErrorDetails(e, Castlistview.variables.File);
        }
    },
    saveoperation: function (data, cartid) {
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
                        Castlistview.Bindcartdata();
                    }
                    else {
                        InvalidResponseCode(data);
                    }
                } catch (e) {
                    ErrorDetails(e, Castlistview.variables.File);
                }
            },
            error: OnError,
        });
    },
    Dopayment: function () {
        var data = {
            "REMARK": $("#customerremark").val(),
        }
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_DOPAYMENT",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        //PaymentData = PaymentData.replace(/'/g, '"');
                        var options = xml2json.parser(data);
                        options = options.serviceresponse.paymentdetail;
                        options.modal = {
                            "ondismiss": function () {
                                var data = {
                                    "ORDERID": options.serviceresponse.paymentdetail.order_id,
                                }
                                $.ajax({
                                    url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=CANCELORDERDETAILS",
                                    async: true,
                                    data: data,
                                    cache: false,
                                    type: 'POST',
                                    success: function (data) {
                                        try{
                                        if ($(data).find('RESPONSECODE').text() == "0") {
                                        }
                                        else {
                                            OperationMessage('', $(data).find('RESPONSEMESSAGE').text(), 'Error');
                                        }
                                    } catch (e) {
                                    ErrorDetails(e, Castlistview.variables.File);
                                }
                                    },
                                    error: OnError
                                });
                            }
                        }
                        options.handler = function (response) {
                            var data = {
                                "PAYMENTID": response.razorpay_payment_id,
                                "REMARK": $("#customerremark").val(),
                            }
                            $.ajax({
                                url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=GETANDSAVEPAYMENTDETAIL",
                                async: true,
                                data: data,
                                cache: false,
                                type: 'POST',
                                success: function (data) {
                                    try{
                                    if ($(data).find('RESPONSECODE').text() == "0") {
                                        $("#paymentsucess").show();
                                        $("#showdivcheckout").hide();
                                        $("#showcart").hide();
                                        $("#payorderid").html($(data).find('ORDERID').text());
                                        $("#paydate").html($(data).find('ORDERDATE').text());
                                        CartWishlistCount();
                                        //window.open(getDomain() + "/Customer/OrderSummary?OrderKey=" + OrderKey, '_self');
                                    }
                                    else {
                                        OperationMessage('', $(data).find('RESPONSEMESSAGE').text(), 'Error');
                                    }
                                } catch (e) {
                                ErrorDetails(e, Castlistview.variables.File);
                            }
                                },
                                error: OnError
                            });
                        };
                        var rzp1 = new Razorpay(options);
                        rzp1.open();
                    }
                    else {
                        InvalidResponseCode(data);
                    }
                } catch (e) {
                    //ErrorDetails(e, Castlistview.variables.File);
                    OperationMessage('', $(data).find('RESPONSEMESSAGE').text(), 'Error');
                }
            },
            error: OnError,
        });
    },
    Clickonchangeaddress: function () {
        $("#singleaddress").hide();
        $("#showcart").hide();
        $("#addaddressform").hide();
        $("#editableaddress").show();
        $(".loadingtrinity").show();
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_SHIPPINGADDRESSDETAILS_GET",
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    $("#displaytwoaddress").html("");
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.totalrecords > 0) {
                            if (JsonObject.serviceresponse.detailslist != undefined) {
                                $("#displaytwoaddress").append($("#Datadisplaytwoaddress").render(JsonObject.serviceresponse.detailslist.details));
                                $("#displaytwoaddress>div:first-child").addClass("addfirstchild");
                                $("#displaytwoaddress>div:nth-child(2)").addClass("addsecondchild");
                            }
                        }
                        else {
                            $("#addaddressform").show();
                            $("#editableaddress").hide();
                            $("#showcart").hide();
                            $("#singleaddress").hide();
                        }
                        if (JsonObject.serviceresponse.totalrecords == 2) {
                            $("#addnewbutton").hide();
                        }
                        else {
                            $("#addnewbutton").show();
                        }

                        $(".loadingtrinity").hide();
                    }
                    else {
                        $(".loadingtrinity").hide();
                        InvalidResponseCode(data);
                    }
                } catch (e) {
                    ErrorDetails(e, Castlistview.variables.File);
                }
            },
            error: OnError,
        });

    },
    Setdefault: function (id) {
        var data = {
            "ACTION": 'Default',
            "DEFAUALTADDRESS": "1",
            "SHIPPINGADDRESSID": id
        }
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_SHIPPINGADDRESSDETAILS_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        Castlistview.Bindcartdata();
                        $("#clickonproceedtocheck").click();
                        $("#editableaddress").hide();
                    }
                    else {
                        InvalidResponseCode(data);
                    }
                } catch (e) {
                    ErrorDetails(e, Castlistview.variables.File);
                }
            },
            error: OnError,
        });
    },
    AddressEdit: function (id) {
        try {
            Castlistview.AddAddress();
            $("#shippingaddressid").val(id);
            $("#txtcontactperson").val($("#txtcontactpersonname" + id).html());
            $("#txtaddress").val($("#hiddenaddress" + id).val());
            $("#txtlandmark").val($("#hiddenlandmark" + id).val());
            $("#txtpincode").val($("#hiddenpincode" + id).val());
            $("#txtmobileno").val($("#hiddenmobileno" + id).val());
            $("#findcountry").val($("#hiddencountryid" + id).val());
            Castlistview.Changecountry();
            $("#findstate").val($("#hiddenstateid" + id).val());
            Castlistview.ChangeState();
            $("#findcity").val($("#hiddencityid" + id).val());
            $("#showcart").hide();
            $("#editableaddress").hide();
            $("#addaddressform").show();
        } catch (e) {
            ErrorDetails(e, Castlistview.variables.File);
        }
    },
    AddAddress: function () {
        try {
            var myfilter, url;
            myfilter = { rules: [] };
            myfilter.rules.push({ field: "CONTRYSTATECITY", op: "eq", data: 'Country' });
            BindDropdown("findcountry", "Ddlfindcountry", "/Common/BindMastersDetails?ServiceName=APP_CONTRY_STATE_CITY_GET&myfilters=" + JSON.stringify(myfilter), "select country");
        } catch (e) {
            ErrorDetails(e, Castlistview.variables.File);
        }
        //$.ajax({
        //    url: getDomain() + "/Common/BindMastersDetails?ServiceName=APP_CONTRY_STATE_CITY_GET&myfilters=" + JSON.stringify(myfilter),
        //    async: false,
        //    cache: false,
        //    type: 'POST',
        //    success: function (data) {
        //        if ($(data).find('RESPONSECODE').text() == "0") {
        //                $("#findcountry").html("");
        //            var JsonObject = xml2json.parser(data);
        //            if (JsonObject.serviceresponse.detaillist != undefined) {
        //                $("#findcountry").html("<option value='' selected disabled hidden >select country</option>");
        //                $("#findcountry").append($("#Ddlfindcountry").render(JsonObject.serviceresponse.detaillist.detail));
        //                //$(".jq-selectbox__dropdown ul").html($("#Ddlfindcountryli").render(JsonObject.serviceresponse.detaillist.detail));
        //            }
        //        }
        //        else {
        //            InvalidResponseCode(data);
        //        }
        //    },
        //    error: OnError
        //});
        //$("#findcountry .jq-selectbox__dropdown").css("top", "53px")
    },
    Changecountry: function () {
        try {
            var myfilter, url;
            myfilter = { rules: [] };
            myfilter.rules.push({ field: "CONTRYSTATECITY", op: "eq", data: 'State' });
            myfilter.rules.push({ field: "COUNTRYID", op: "eq", data: $("#findcountry").val() });

            BindDropdown("findstate", "Ddlfindstate", "/Common/BindMastersDetails?ServiceName=APP_CONTRY_STATE_CITY_GET&myfilters=" + JSON.stringify(myfilter), "select state");
        } catch (e) {
            ErrorDetails(e, Castlistview.variables.File);
        }
    },
    ChangeState: function () {
        try {
            var myfilter, url;
            myfilter = { rules: [] };
            myfilter.rules.push({ field: "CONTRYSTATECITY", op: "eq", data: 'City' });
            myfilter.rules.push({ field: "STATEID", op: "eq", data: $("#findstate").val() });

            BindDropdown("findcity", "Ddlfindcity", "/Common/BindMastersDetails?ServiceName=APP_CONTRY_STATE_CITY_GET&myfilters=" + JSON.stringify(myfilter), "select city");
        } catch (e) {
            ErrorDetails(e, Castlistview.variables.File);
        }
    },
    btnsubminaddress: function () {
        try {
            var oper;
            var isValid = $("#addaddressform").valid();

            if (!isValid)
                return;

            if ($("#shippingaddressid").val() != "") {
                oper = 'edit';
            }
            else {
                oper = 'add';
            }
            var data = {
                "oper": oper,
                "SHIPPINGADDRESSID": $("#shippingaddressid").val(),
                "ADDRESS": $("#txtaddress").val(),
                "LANDMARK": $("#txtlandmark").val(),
                "PINCODE": $("#txtpincode").val(),
                "MOBILENO": $("#txtmobileno").val(),
                "CITY": $("#findcity").val(),
                "STATE": $("#findstate").val(),
                "COUNTRY": $("#findcountry").val(),
                "CONTACTPERSONNAME": $("#txtcontactperson").val(),
            }
            Castlistview.Saveaddressbutton(data);
        } catch (e) {
            ErrorDetails(e, Castlistview.variables.File);
        }
    },
    Saveaddressbutton: function (data) {
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_SHIPPINGADDRESSDETAILS_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        $("#shippingaddressid").val("");
                        Castlistview.Clickonchangeaddress();
                    }
                    else {
                        InvalidResponseCode(data);
                    }
                } catch (e) {
                    ErrorDetails(e, Castlistview.variables.File);
                }
            },
            error: OnError,
        });
    },
    AddressDelete: function (id) {
        try {
            $.confirm({
                title: 'Delete Address',
                content: 'Are you sure you want to delete this address',
                buttons: {
                    ok: function () {
                        var data = {
                            "oper": 'delete',
                            "SHIPPINGADDRESSID": id
                        }
                        $.ajax({
                            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_SHIPPINGADDRESSDETAILS_CRUD",
                            data: data,
                            async: true,
                            cache: false,
                            type: 'POST',
                            success: function (data) {
                                try {
                                    if ($(data).find('RESPONSECODE').text() == "0") {
                                        Castlistview.Clickonchangeaddress();
                                    }
                                    else {
                                        InvalidResponseCode(data);
                                    }
                                } catch (e) {
                                    ErrorDetails(e, Castlistview.variables.File);
                                }
                            },
                            error: OnError,
                        });
                    },
                    cancel: function () {

                    },

                }
            });
        } catch (e) {
            ErrorDetails(e, Castlistview.variables.File);
        }
    },
}
function showdetail(id) {
    try {
        var Gcolor, Gpurity, Dcolor, Dpurity, Dsize, Customizenotes, dc, Iscustomize, Cartid, Designno;
        var dc = $("#dcolor" + id).html().split("/");
        Gcolor = $("#gcolor" + id).html();
        Gpurity = $("#gpurity" + id).html();
        Dcolor = dc[1];
        Dpurity = dc[0];
        Dsize = $("#designsize" + id).html();
        Customizenotes = $("#Customizenotes" + id).html() || null;
        Iscustomize = $("#iscutomize" + id).val();
        Cartid = $("#cart_id" + id).val();
        Designno = $("#design_number" + id).val(),
        $.ajax({
            url: getDomain() + "/Product/Customizedetail",
            data: {
                Gcolor: Gcolor,
                Gpurity: Gpurity,
                Dcolor: Dcolor,
                Dpurity: Dpurity,
                Dsize: Dsize,
                Customizenotes: Customizenotes,
                Iscustomize: Iscustomize,
                Cartid: Cartid,
            },
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    if (data == "success") {
                        window.location.href = getDomain() + "/Product/ProductDetail?id=" + Designno;
                    }
                    else {
                        OperationMessage("", data, 'error');
                    }
                } catch (e) {
                    ErrorDetails(e, Castlistview.variables.File);
                }
            },
            error: OnError,
        });
    } catch (e) {
        ErrorDetails(e, Castlistview.variables.File);
    }
}
function checkgift(id) {
    try {
        var Isgift;
        if ($("#isgift" + id).is(':checked') == true) {
            Isgift = 1;
        }
        else {
            Isgift = 0;
        }
        var data = {
            "oper": "AddGiftWrapper",
            "CARTID": id,
            "GIFTWRAPPER": Isgift,
        }
        Castlistview.Cartcrud(data);
    } catch (e) {
        ErrorDetails(e, Castlistview.variables.File);
    }
}
function Increasequantity(id) {
    try {
        $("#quantitytotal" + id).html(parseInt($("#quantitytotal" + id).html()) + 1);
        Castlistview.Quantityvalue(id);
    } catch (e) {
        ErrorDetails(e, Castlistview.variables.File);
    }
}
function Decreasequantity(id) {
    try {
        if ($("#quantitytotal" + id).html() > 1) {
            $("#quantitytotal" + id).html(parseInt($("#quantitytotal" + id).html()) - 1);
            Castlistview.Quantityvalue(id);
        }
    } catch (e) {
        ErrorDetails(e, Castlistview.variables.File);
    }
}
$(document).ready(function () {
    try {
        Castlistview.Bindcartdata();
        Castlistview.AddAddress();
        $("#clickonproceedtocheck").click(function () {
            $("#showdivcheckout").show();
            $("#showcart").hide();
            if ($("#addresssignledetail").html() != "") {
                $("#showdivcheckout").show();
                $("#singleaddress").show();
                $("#orderremarkdiv").show();
                $("#clickonproceedtopayment").show();
                $("#clickonproceedtocheck").hide();
                $("#showcart").show();
            }
            else {
                $("#showcart").hide();
                $("#showdivcheckout").show();
                $("#addaddressform").show();
                Castlistview.AddAddress();

            }
        });
        $("#clickonproceedtopayment").click(function () {
            Castlistview.Dopayment();
        });
        $("#continueshopping").click(function () {
            window.location.href = getDomain() + "/Home/Index";
        });
        $("#saveaddressdetail").click(function () {
            Castlistview.btnsubminaddress();
        });
        $("#addnewbutton").click(function () {
            Castlistview.AddAddress();
            $("#showcart").hide();
            $("#editableaddress").hide();
            $("#addaddressform").show();
        });
    } catch (e) {
        ErrorDetails(e, Castlistview.variables.File);
    }
});