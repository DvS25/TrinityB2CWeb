var OrderTrackingView = {
    variables: {
        File: 'OrderTracking.Js',
        orderid: "",

    },
    BindOrdertracking: function () {
        $(".loadingtrinity").show();
        var myfilter, url;
        myfilter = { rules: [] };
        myfilter.rules.push({ field: "CANCEL", op: "eq", data: $("#hiddenfullordercancel").val() });
        myfilter.rules.push({ field: "ORDERID", op: "eq", data: $("#hiddenorderid").val() });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_ORDER_HISTORY_DETAIL_GET&myfilters=" + JSON.stringify(myfilter),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    $("#bindorderitems").html("");
                    $("#cancelorderitemsbind").html("");
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);

                        if (JsonObject.serviceresponse.detailslist != undefined) {
                            
                            $("#headerorderid").html(JsonObject.serviceresponse.detailslist.details.orderid);
                            $("#headerplaceddate").html(JsonObject.serviceresponse.detailslist.details.orderdate);
                            if (JsonObject.serviceresponse.detailslist.details.orderlist != undefined) {
                                $("#orderitemdiv").show();
                                $("#bindorderitems").append($("#Dataorderitems").render(JsonObject.serviceresponse.detailslist.details.orderlist.orderdetails));
                                $(".designprice").each(function (key,obj) {
                                    var id = $(this).attr('id');
                                    var Rowid = id.split("designprice");
                                    var totalp = $("#iprrel" + Rowid[1]).val();
                                    var convertint = parseFloat(totalp).toLocaleString(getCurrencyLang(), {
                                        style: 'currency', currency: $(obj).attr("data-currency") || "INR",
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    });
                                    $("#" + id).html(convertint);
                                });
                            }
                            else {
                                $("#orderitemdiv").hide();
                            }
                        }
                      
                        if (JsonObject.serviceresponse.shippinglist != undefined) {
                            $("#addresspersonname").html(JsonObject.serviceresponse.shippinglist.shippingdetails.contactpersonname);
                            $("#addresspersondetail").html(JsonObject.serviceresponse.shippinglist.shippingdetails.fulladdress);
                            $("#addressmobileno").html(JsonObject.serviceresponse.shippinglist.shippingdetails.mobileno);
                        }
                        if (JsonObject.serviceresponse.paymentdetail != undefined) {
                            var currency_type = JsonObject.serviceresponse.paymentdetail.currencytype || "INR";
                            $("#paytotalprice").html(JsonObject.serviceresponse.paymentdetail.amount.toLocaleString(getCurrencyLang(), { style: 'currency', currency: currency_type, minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                            $("#paydeliverycharge").html(JsonObject.serviceresponse.paymentdetail.deliverycharge.toLocaleString(getCurrencyLang(), { style: 'currency', currency: currency_type, minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                            $("#paypaidamount").html(JsonObject.serviceresponse.paymentdetail.finalamount.toLocaleString(getCurrencyLang(), { style: 'currency', currency: currency_type, minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                            if (JsonObject.serviceresponse.paymentdetail.giftwrapperamt != undefined) {
                                $("#giftchargediv").show();
                                $("#paygiftamount").html(JsonObject.serviceresponse.paymentdetail.giftwrapperamt.toLocaleString(getCurrencyLang(), { style: 'currency', currency: currency_type, minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                            }
                            else {
                                $("#giftchargediv").hide();
                            }
                        }
                        if (JsonObject.serviceresponse.detailscancel != undefined) {
                            $("#cancelorderitemsbind").show();
                            $("#cancelorderitemsbind").append($("#Datacancelorderitems").render(JsonObject.serviceresponse.detailscancel.details));
                            $("#finalcanceldesignprice").html(JsonObject.serviceresponse.detailscancel.details.refundamount.toLocaleString(getCurrencyLang(), { style: 'currency', currency: JsonObject.serviceresponse.detailscancel.details.currencytype || "INR", minimumFractionDigits: 2, maximumFractionDigits: 2 }));

                            $(".canceldesignprice").each(function (key,obj) {
                                var id = $(this).attr('id');
                                var Rowid = id.split("canceldesignprice");
                                var totalp = $("#iprrelcancel" + Rowid[1]).val();
                                var convertint = parseFloat(totalp).toLocaleString(getCurrencyLang(), {
                                    style: 'currency', currency: $(obj).attr("data-currency") || "INR",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                });
                                $("#" + id).html(convertint);
                            });
                        }
                        else {
                            $("#cancelorderitemsbind").hide();
                        }
                        if (JsonObject.serviceresponse.detailsreturn != undefined) {
                            $("#returnorderitemsbind").show();
                            $("#returnorderitemsbind").append($("#Datareturnorderitems").render(JsonObject.serviceresponse.detailsreturn.details));
                            $("#finalreturndesignprice").html(JsonObject.serviceresponse.detailsreturn.details.refundamount.toLocaleString(getCurrencyLang(), { style: 'currency', currency: JsonObject.serviceresponse.detailsreturn.details.currencytype || "INR", minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                            $("#finalreturndesigncharge").html(JsonObject.serviceresponse.detailsreturn.details.returncharge.toLocaleString(getCurrencyLang(), { style: 'currency', currency: JsonObject.serviceresponse.detailsreturn.details.currencytype || "INR", minimumFractionDigits: 2, maximumFractionDigits: 2 }));

                            $(".returndesignprice").each(function (key,obj) {
                                var id = $(this).attr('id');
                                var Rowid = id.split("returndesignprice");
                                var totalp = $("#iprrelreturn" + Rowid[1]).val();
                                var convertint = parseFloat(totalp).toLocaleString(getCurrencyLang(), {
                                    style: 'currency', currency: $(obj).attr("data-currency") || "INR",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                });
                                $("#" + id).html(convertint);
                            });
                        }
                        else {
                            $("#returnorderitemsbind").hide();
                        }
                        if (JsonObject.serviceresponse.tracklist != undefined) {
                            $("#ordertracking").append($("#DDLordertracking").render(JsonObject.serviceresponse.tracklist.trackdetails));
                        }
                      
                        $(".loadingtrinity").hide();
                    }
                    else {
                        $(".loadingtrinity").hide();
                        InvalidResponseCode(data);
                    }
                } catch (e) {
                    $(".loadingtrinity").hide();
                    ErrorDetails(e, OrderTrackingView.variables.File);
                }
            },
            error: OnError,
        });
    },
}

$(document).ready(function () {
    OrderTrackingView.BindOrdertracking();

});