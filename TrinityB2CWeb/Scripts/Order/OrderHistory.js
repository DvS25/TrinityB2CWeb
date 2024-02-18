var OrderHistoryView = {
    variables: {
        File: 'OrderHistory.Js',
        orderid: "",

    },
    BindOrderhistory: function () {
        $(".loadingtrinity").show();
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_ORDER_HISTORY_GET",
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    $("#orderdata").html("");
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.detailslist != undefined) {
                            $("#orderdata").append($("#Dataorderhistory").render(JsonObject.serviceresponse.detailslist.details));

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
                    ErrorDetails(e, OrderHistoryView.variables.File);
                }
            },
            error: OnError,
        });
    },
    Btncancelorder: function (id) {

        try {
            $(".checkboxdiv" + id).show();
            $("#btncancelyes" + id).show();
            $("#btncancelno" + id).show();
            $("#btncancelorder" + id).hide();
        } catch (e) {
            $(".loadingtrinity").hide();
            ErrorDetails(e, OrderHistoryView.variables.File);
        }
    },
    Btncancelorderno: function (id) {
        try {
            $("#btncancelyes" + id).hide();
            $("#btncancelno" + id).hide();
            $("#btncancelorder" + id).show();
            $(".checkboxdiv" + id).hide();
            $(".checktems" + id).prop("checked", false);
        } catch (e) {
            $(".loadingtrinity").hide();
            ErrorDetails(e, OrderHistoryView.variables.File);
        }
    },
    Btncancelorderyes: function (id) {
        try {
            OrderHistoryView.variables.orderid = id;
            if ($('.checktems' + id + ':checkbox:checked').length > 0) {
                $("#modalorderid").html($("#orderid" + id).html());
                $("#modalplacedondate").html($("#placedate" + id).html());

                $("#tableordercancelitems").html("");

                $(".mainitemdiv" + id).each(function (key, obj) {
                    if ($(obj).find('.checkselected').prop("checked") == true) {
                        $("#tableordercancelitems").append(
                            ' <tr>'
                            + '            <td style="width:30%;">'
                            + '                <img src="' + $(obj).find('.itemimage' + id).attr('src') + '" class="" alt="alt" style="padding: 10px;">'
                            + '            </td>'
                            + '            <td style="width:70%;padding: 10px 20px;">'
                            + '                <span class="font__weight-bold">' + $(obj).find(".itemdesignno" + id).html() + '</span><br>'
                            + '                <span class="designprice newp colorgray">' + $(obj).find(".designprice" + id).html() + '</span>'
                            + '            </td>'
                            + '        </tr>'
                            );
                        xmlsaveFiles += '<DETAILS>';
                        xmlsaveFiles += '<CUSTORDERITEMID><![CDATA[' + $(obj).find(".hiddenitemid" + id).val() + ']]></CUSTORDERITEMID>';
                        xmlsaveFiles += '</DETAILS>';
                    }
                });

                xmlsaveFiles += "</CANCELORDERITEM>";
                $("#Ordercancelmodal").modal("show");
                $("#Ordercancelmodal").addClass("backcolorcancel");
            }
            else {
                OperationMessage('Please select at least one item', '', 'warning');
            }
        } catch (e) {
            $(".loadingtrinity").hide();
            ErrorDetails(e, OrderHistoryView.variables.File);
        }
    },
    BindSubmitCancel: function () {
        if ($("#cancelreason").val() == "" || $("#cancelreason").val() == null) {
            $("#cancelreason-error").show();
        }
        else {
            $("#cancelreason-error").hide();

            dataP = {
                XMLPARAM: escape(xmlsaveFiles),
                "ORDERID": $("#modalorderid").html(),
                "CANCELREMARK": $("#remarkdescription").val(),
                "ORDERCANCELREASONID": $("#cancelreason").val(),
            };
            $.ajax({
                url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_ORDER_CANCEL_SUMMARY_CRUD",
                data: dataP,
                async: true,
                cache: false,
                type: 'POST',
                success: function () {
                    try {
                        OrderHistoryView.variables.orderid = "";
                        $("#modalorderid").html("");
                        $("#modalplacedondate").html("");
                        $("#tableordercancelitems").html("");
                        $("#remarkdescription").val("");
                        $("#cancelreason").html("");
                        $("#Ordercancelmodal").modal("hide");
                        $("#Ordercancelmodal").removeClass("backcolorcancel");
                        OrderHistoryView.BindOrderhistory();
                    } catch (e) {
                        $(".loadingtrinity").hide();
                        ErrorDetails(e, OrderHistoryView.variables.File);
                    }
                },
                error: OnError,
            });
        }
    },
    Btnreturnorder: function (id) {
        try {
            $(".checkboxdiv" + id).show();
            $("#btnreturnyes" + id).show();
            $("#btnreturnno" + id).show();
            $("#btnreturnorder" + id).hide();
        } catch (e) {
            $(".loadingtrinity").hide();
            ErrorDetails(e, OrderHistoryView.variables.File);
        }
    },
    Btnreturnorderno: function (id) {
        try {
            $("#btnreturnyes" + id).hide();
            $("#btnreturnno" + id).hide();
            $("#btnreturnorder" + id).show();
            $(".checkboxdiv" + id).hide();
            $(".checktems" + id).prop("checked", false);
        } catch (e) {
            $(".loadingtrinity").hide();
            ErrorDetails(e, OrderHistoryView.variables.File);
        }
    },
    Btnreturnorderyes: function (id) {
        try {
            OrderHistoryView.variables.orderid = id;
            if ($('.checktems' + id + ':checkbox:checked').length > 0) {
                $("#modalorderretunrid").html($("#orderid" + id).html());
                $("#modalplacedonretunrdate").html($("#placedate" + id).html());

                $("#tableorderreturnitems").html("");
                var returndiv = "";
                $(".mainitemdiv" + id).each(function (key, obj) {
                    if ($(obj).find('.checkselected').prop("checked") == true) {
                        returndiv +=
                            ' <tr>'
                            + '            <td style="width:30%;">'
                            + '                <img src="' + $(obj).find('.itemimage' + id).attr('src') + '" class="" alt="alt" style="padding: 10px;">'
                            + '                <input type="hidden" class="returnitemid" value="' + $(obj).find(".hiddenitemid" + id).val() + '">'
                            + '            </td>'
                            + '            <td style="width:70%;padding: 10px 20px;">'
                            + '                <span class="font__weight-bold">' + $(obj).find(".itemdesignno" + id).html() + '</span><br>'
                            + '                <span class="designprice newp colorgray">' + $(obj).find(".designprice" + id).html() + '</span>'
                            + '                <div id="">'
                            + '                    <label class="containercheck" style="font-size:12px;padding-left:22px;">Product tag is removed.'
                            + '                        <input type="checkbox" class="checktemsreturn" id="">'
                            + '                        <span class="checkmarkreturn"></span>'
                            + '                    </label>'
                            + '                </div>'
                            + '            </td>'
                            + '        </tr>'
                    }
                });
                $("#tableorderreturnitems").append(returndiv);
                $("#Orderreturnmodal").modal("show");
                $("#Orderreturnmodal").addClass("backcolorcancel");
            }
            else {
                OperationMessage('Please select at least one item', '', 'warning');
            }
        } catch (e) {
            $(".loadingtrinity").hide();
            ErrorDetails(e, OrderHistoryView.variables.File);
        }
    },
    BindSubmitReturn: function () {
        try {
            if ($("#returnreason").val() == "" || $("#returnreason").val() == null) {
                $("#returnreason-error").show();
            }
            else {
                var xmlsaveFilesReturn = "<RETURNORDERITEM>";
                $("#returnreason-error").hide();
                $("#tableorderreturnitems").find('tr').each(function (key, obj) {
                    var activetoggle;
                    if ($(obj).find('.checktemsreturn').prop("checked") == true) {
                        activetoggle = "1";
                    } else {
                        activetoggle = "0";
                    }
                    xmlsaveFilesReturn += '<DETAILS>';
                    xmlsaveFilesReturn += '<CUSTORDERITEMID><![CDATA[' + $.trim($(obj).find('.returnitemid').val()) + ']]></CUSTORDERITEMID>';
                    xmlsaveFilesReturn += '<ISTAGREMOVED><![CDATA[' + activetoggle + ']]></ISTAGREMOVED>';
                    xmlsaveFilesReturn += '</DETAILS>';
                });
                xmlsaveFilesReturn += "</RETURNORDERITEM>";

                dataP = {
                    XMLPARAM: escape(xmlsaveFilesReturn),
                    "ORDERID": $("#modalorderretunrid").html(),
                    "RETURNREMARK": $("#remarkreturndescription").val(),
                    "ORDERRETURNREASONID": $("#returnreason").val(),
                };
                $.ajax({
                    url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_ORDER_RETURN_SUMMARY_CRUD",
                    data: dataP,
                    async: true,
                    cache: false,
                    type: 'POST',
                    success: function () {
                        try {
                            OrderHistoryView.variables.orderid = "";
                            $("#modalorderretunrid").html("");
                            $("#modalplacedonretunrdate").html("");
                            $("#tableorderreturnitems").html("");
                            $("#remarkreturndescription").val("");
                            $("#returnreason").html("");
                            $("#Orderreturnmodal").modal("hide");
                            $("#Orderreturnmodal").removeClass("backcolorcancel");
                            OrderHistoryView.BindOrderhistory();
                        } catch (e) {
                            $(".loadingtrinity").hide();
                            ErrorDetails(e, OrderHistoryView.variables.File);
                        }
                    },
                    error: OnError,
                });
            }
        } catch (e) {
            $(".loadingtrinity").hide();
            ErrorDetails(e, OrderHistoryView.variables.File);
        }
    },
    Ordertacking: function (id) {
        window.open(getDomain() + "/Order/OrderTracking?id=" + id);
    }
}
var xmlsaveFiles = "<CANCELORDERITEM>";

$(document).ready(function () {
    OrderHistoryView.BindOrderhistory();
    try {
        BindCityDropdown("cancelreason", "DataCancalationreason", "/Common/BindMastersDetails?ServiceName=B2C_ORDER_CANCEL_REASON_GET", "Select Reason");
        BindCityDropdown("returnreason", "Datareturnationreason", "/Common/BindMastersDetails?ServiceName=B2C_ORDER_RETURN_REASON_GET", "Select Reason");
        $(".jq-selectbox__dropdown").css("width", "100%!important;");
    } catch (e) {
        $(".loadingtrinity").hide();
        ErrorDetails(e, OrderHistoryView.variables.File);
    }
});