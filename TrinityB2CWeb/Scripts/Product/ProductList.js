var Masterproductlistview = {
    variables: {
        File: 'ProductList.Js',
        designo: "",
        IsLogin: "",
        Isgrid: "1",
        Applyfilter: 0,
        designno: "",
        goldpurity: "",
        goldcolor: "",
        diamondshape: "",
        diamondweight: "",
        goldweight: "",
        price: "",
        wishbtnid: "",
    },
    Bindproductlist: function (sortorder, sortcolumn) {
        var totalrecords, shownrecords, remainingorders;
        $(".loadingtrinity").show();
        var myfilter, url;
        myfilter = { rules: [] };
        if (Masterproductlistview.variables.Applyfilter == 1) {
            if (Masterproductlistview.variables.diamondweight != "") {
                myfilter.rules.push({ field: "DIAMONDWEIGHT", op: "eq", data: Masterproductlistview.variables.diamondweight });
            }
            if (Masterproductlistview.variables.goldweight != "") {
                myfilter.rules.push({ field: "GOLDWEIGHT", op: "eq", data: Masterproductlistview.variables.goldweight });
            }
            if (Masterproductlistview.variables.price != "") {
                myfilter.rules.push({ field: "PRICE", op: "eq", data: Masterproductlistview.variables.price });
            }
            if (Masterproductlistview.variables.goldpurity != "") {
                myfilter.rules.push({ field: "GPURITY", op: "eq", data: Masterproductlistview.variables.goldpurity });
            }
            if (Masterproductlistview.variables.goldcolor != "") {
                myfilter.rules.push({ field: "GCOLOR", op: "eq", data: Masterproductlistview.variables.goldcolor });
            }
            if (Masterproductlistview.variables.diamondshape != "") {
                myfilter.rules.push({ field: "SHAP", op: "eq", data: Masterproductlistview.variables.diamondshape });
            }
            //myfilter.rules.push({ field: "SHAP", op: "eq", data: $("#hidenshapename").val() });
            //myfilter.rules.push({ field: "SIZERANGE", op: "eq", data: Masterproductlistview.variables.diamondselectsize });
            //myfilter.rules.push({ field: "CHARNIRANGE", op: "eq", data: Masterproductlistview.variables.diamondselectcharni });
            //myfilter.rules.push({ field: "GPURITY", op: "eq", data: Masterproductlistview.variables.goldpurity });
            //myfilter.rules.push({ field: "GCOLOR", op: "eq", data: Masterproductlistview.variables.goldcolor });
            //myfilter.rules.push({ field: "DESIGNNORANGE", op: "eq", data: Masterproductlistview.variables.designno });
        }
        if ($("#typeofcategory").val() == "category") {
            myfilter.rules.push({ field: "CATEGORY", op: "eq", data: $("#productsubname").val() });
        }
        else if ($("#typeofcategory").val() == "search") {
            myfilter.rules.push({ field: "KEYWORD", op: "eq", data: $("#productsubname").val() });
        }
        else if ($("#typeofcategory").val() == "collection") {
            myfilter.rules.push({ field: "COLLECTIONKEYWORD", op: "eq", data: $("#hiddencollectionkeyword").val() });
            myfilter.rules.push({ field: "DESIGNNORANGE", op: "eq", data: $("#hiddencollectiondesignno").val() });
            myfilter.rules.push({ field: "SUBCATEGORY", op: "eq", data: $("#productsubname").val() });
            myfilter.rules.push({ field: "SEARCHCOLLECTIONKEYWORD", op: "eq", data: 'SearchCollection' });
        }
        else if ($("#typeofcategory").val() == "Festivalcollection") {
            myfilter.rules.push({ field: "DESIGNNORANGE", op: "eq", data: $("#hiddencollectiondesignno").val() });
            myfilter.rules.push({ field: "SUBCATEGORY", op: "eq", data: $("#productsubname").val() });
            myfilter.rules.push({ field: "SEARCHCOLLECTIONKEYWORD", op: "eq", data: 'SearchCollection' });
        }
        else {
            myfilter.rules.push({ field: "SUBCATEGORY", op: "eq", data: $("#productsubname").val() });
        }
        url = "/Common/BindMastersDetails?ServiceName=B2C_PRODUCT_DESIGN_MASTER_GET&page=1&rows=32&ColumnRequested=RATESTAR,PRICE,OLDPRICE,STOCKTYPEOUT,DISCOUNT,NEWDESIGN,DESIGNNO,IMAGEPATH,ISWISH,NOTPRICEINDIAMOND&sord=" + sortorder + "&sidx=" + sortcolumn + "&myfilters=" + JSON.stringify(myfilter);
        $.ajax({
            url: getDomain() + url,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        $("#productlistdata").html("");
                        $("#productlistdata").css("margin-top", "0px");
                        $("#breadcategory").html(JsonObject.serviceresponse.category);
                        if ($("#typeofcategory").val() == "collection") {
                            $("#breadcategory").html('COLLECTION');
                        }
                        if (JsonObject.serviceresponse.totalrecords > 0) {
                            $("#nodatadiv").hide();
                            $("#recordcount").show();
                            $(".recordcount").show();
                            if (JsonObject.serviceresponse.detailslist != undefined) {
                                $("#productlistdata").html("");
                                //$("#listviewdetaildiv").html("");
                                $("#productlistdata").append($("#Dataproductlist").render(JsonObject.serviceresponse.detailslist.details));
                                //$("#listviewdetaildiv").append($("#ProductListviewdata").render(JsonObject.serviceresponse.detailslist.details));

                                $(".indianprice").each(function () {
                                    var id = $(this).attr('id');
                                    var Rowid = id.split("indianprice");
                                    var totalp = $("#ipr" + Rowid[1]).val();
                                    var convertint = parseFloat(totalp).toLocaleString(getCurrencyLang(), {
                                        style: 'currency', currency: getCurrencyCode(),
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    });
                                    $("#" + id).html(convertint);
                                });
                                $(".indianoldprice").each(function () {
                                    var id = $(this).attr('id');
                                    var Rowid = id.split("indianoldprice");
                                    var totalp = $("#iprold" + Rowid[1]).val();
                                    var convertint = parseFloat(totalp).toLocaleString(getCurrencyLang(), {
                                        style: 'currency', currency: getCurrencyCode(),
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    });
                                    $("#" + id).html(convertint);
                                });

                                //$(".indianlistprice").each(function () {
                                //    var id = $(this).attr('id');
                                //    var Rowid = id.split("indianlistprice");
                                //    var totalp = $("#iprlist" + Rowid[1]).val();
                                //    var convertint = parseFloat(totalp).toLocaleString(getCurrencyLang(), {
                                //        style: 'currency', currency: getCurrencyCode(),
                                //        minimumFractionDigits: 2,
                                //        maximumFractionDigits: 2,
                                //    });
                                //    $("#" + id).html(convertint);
                                //});
                                //$(".indianoldlistprice").each(function () {
                                //    var id = $(this).attr('id');
                                //    var Rowid = id.split("indianoldlistprice");
                                //    var totalp = $("#iproldlist" + Rowid[1]).val();
                                //    var convertint = parseFloat(totalp).toLocaleString(getCurrencyLang(), {
                                //        style: 'currency', currency: getCurrencyCode(),
                                //        minimumFractionDigits: 2,
                                //        maximumFractionDigits: 2,
                                //    });
                                //    $("#" + id).html(convertint);
                                //});

                                $("#design_row_no").val("2");
                                totalrecords = parseInt(JsonObject.serviceresponse.totalrecords);
                                shownrecords = parseInt($("#productlistdata .orderrow").length);
                                $(".recordcount").html(shownrecords + " of " + totalrecords + " Designs");
                                $("#recordcount").html(shownrecords + " of " + totalrecords + " Designs");

                                if (totalrecords > 30) {
                                    $("#viewmordesign").show();
                                }
                                else {
                                    $("#viewmordesign").hide();
                                }
                                //if (Masterproductlistview.variables.Isgrid == "1")
                                //{
                                //    $("#design_row_no").val("2");
                                //    totalrecords = parseInt(JsonObject.serviceresponse.totalrecords);
                                //    shownrecords = parseInt($("#productlistdata .orderrow").length);
                                //    $("#recordcount").html(shownrecords + " of " + totalrecords + " Designs");
                                //    if (totalrecords > 30) {
                                //        $("#viewmordesign").show();
                                //    }
                                //    else {
                                //        $("#viewmordesign").hide();
                                //    }
                                //}
                                //else {
                                //    $("#design_row_nolistview").val("2");
                                //    totalrecords1 = parseInt(JsonObject.serviceresponse.totalrecords);
                                //    shownrecords1 = parseInt($("#listviewdetaildiv .orderrow").length);
                                //    $("#recordcountlistview").html(shownrecords1 + " of " + totalrecords1 + " Designs");
                                //    if (totalrecords1 > 30) {
                                //        $("#viewmordesignlist").show();
                                //    }
                                //    else {
                                //        $("#viewmordesignlist").hide();
                                //    }
                                //}


                            }
                        }
                        else {
                            $("#nodatadiv").show();
                            $("#recordcount").hide();
                            $(".recordcount").hide();
                            $("#viewmordesign").hide();
                        }
                        $(".loadingtrinity").hide();
                    }
                    else {
                        $(".loadingtrinity").hide();
                        InvalidResponseCode(data);
                    }
                } catch (e) {
                    ErrorDetails(e, Masterproductlistview.variables.File);
                }
            },
            error: OnError,
            complete: function (xhr, errorType) {
                $(".loadingtrinity").hide();
            }
        });
    },
    BindFirsttimeproductlist: function (sortorder, sortcolumn) {
        var totalrecords, shownrecords, remainingorders;
        $(".loadingtrinity").show();
        var myfilter, url;
        myfilter = { rules: [] };
        if (Masterproductlistview.variables.Applyfilter == 1) {
            if (Masterproductlistview.variables.diamondweight != "") {
                myfilter.rules.push({ field: "DIAMONDWEIGHT", op: "eq", data: Masterproductlistview.variables.diamondweight });
            }
            if (Masterproductlistview.variables.goldweight != "") {
                myfilter.rules.push({ field: "GOLDWEIGHT", op: "eq", data: Masterproductlistview.variables.goldweight });
            }
            if (Masterproductlistview.variables.price != "") {
                myfilter.rules.push({ field: "PRICE", op: "eq", data: Masterproductlistview.variables.price });
            }
            if (Masterproductlistview.variables.goldpurity != "") {
                myfilter.rules.push({ field: "GPURITY", op: "eq", data: Masterproductlistview.variables.goldpurity });
            }
            if (Masterproductlistview.variables.goldcolor != "") {
                myfilter.rules.push({ field: "GCOLOR", op: "eq", data: Masterproductlistview.variables.goldcolor });
            }
            if (Masterproductlistview.variables.diamondshape != "") {
                myfilter.rules.push({ field: "SHAP", op: "eq", data: Masterproductlistview.variables.diamondshape });
            }
        }
        if ($("#typeofcategory").val() == "category") {
            myfilter.rules.push({ field: "CATEGORY", op: "eq", data: $("#productsubname").val() });
        }
        else if ($("#typeofcategory").val() == "search") {
            myfilter.rules.push({ field: "KEYWORD", op: "eq", data: $("#productsubname").val() });
        }
        else if ($("#typeofcategory").val() == "collection") {
            myfilter.rules.push({ field: "COLLECTIONKEYWORD", op: "eq", data: $("#hiddencollectionkeyword").val() });
            myfilter.rules.push({ field: "DESIGNNORANGE", op: "eq", data: $("#hiddencollectiondesignno").val() });
            myfilter.rules.push({ field: "SUBCATEGORY", op: "eq", data: $("#productsubname").val() });
            myfilter.rules.push({ field: "SEARCHCOLLECTIONKEYWORD", op: "eq", data: 'SearchCollection' });
        }
        else if ($("#typeofcategory").val() == "Festivalcollection") {
            myfilter.rules.push({ field: "DESIGNNORANGE", op: "eq", data: $("#hiddencollectiondesignno").val() });
            myfilter.rules.push({ field: "SUBCATEGORY", op: "eq", data: $("#productsubname").val() });
            myfilter.rules.push({ field: "SEARCHCOLLECTIONKEYWORD", op: "eq", data: 'SearchCollection' });
        }
        else {
            myfilter.rules.push({ field: "SUBCATEGORY", op: "eq", data: $("#productsubname").val() });
        }
        url = "/Common/BindMastersDetails?ServiceName=B2C_PRODUCT_DESIGN_MASTER_GET&page=1&rows=32&ColumnRequested=RATESTAR,PRICE,OLDPRICE,STOCKTYPEOUT,DISCOUNT,NEWDESIGN,DESIGNNO,IMAGEPATH,ISWISH,NOTPRICEINDIAMOND&sord=" + sortorder + "&sidx=" + sortcolumn + "&myfilters=" + JSON.stringify(myfilter);
        $.ajax({
            url: getDomain() + url,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        $("#productlistdata").html("");
                        $("#productlistdata").css("margin-top", "0px");
                        $("#breadcategory").html(JsonObject.serviceresponse.category);
                        if ($("#typeofcategory").val() == "collection") {
                            $("#breadcategory").html('COLLECTION');
                        }
                        if (JsonObject.serviceresponse.totalrecords > 0) {
                            $("#productmaindivlist").show();
                            $("#emptyproductdatalist").hide();
                            $("#nodatadiv").hide();
                            $("#recordcount").show();
                            $(".recordcount").show();
                            if (JsonObject.serviceresponse.detailslist != undefined) {
                                $("#productlistdata").html("");
                                //$("#listviewdetaildiv").html("");
                                $("#productlistdata").append($("#Dataproductlist").render(JsonObject.serviceresponse.detailslist.details));
                                //$("#listviewdetaildiv").append($("#ProductListviewdata").render(JsonObject.serviceresponse.detailslist.details));

                                $(".indianprice").each(function () {
                                    var id = $(this).attr('id');
                                    var Rowid = id.split("indianprice");
                                    var totalp = $("#ipr" + Rowid[1]).val();
                                    var convertint = parseFloat(totalp).toLocaleString(getCurrencyLang(), {
                                        style: 'currency', currency: getCurrencyCode(),
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    });
                                    $("#" + id).html(convertint);
                                });
                                $(".indianoldprice").each(function () {
                                    var id = $(this).attr('id');
                                    var Rowid = id.split("indianoldprice");
                                    var totalp = $("#iprold" + Rowid[1]).val();
                                    var convertint = parseFloat(totalp).toLocaleString(getCurrencyLang(), {
                                        style: 'currency', currency: getCurrencyCode(),
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    });
                                    $("#" + id).html(convertint);
                                });

                                $("#design_row_no").val("2");
                                totalrecords = parseInt(JsonObject.serviceresponse.totalrecords);
                                shownrecords = parseInt($("#productlistdata .orderrow").length);
                                $(".recordcount").html(shownrecords + " of " + totalrecords + " Designs");
                                $("#recordcount").html(shownrecords + " of " + totalrecords + " Designs");

                                if (totalrecords > 32) {
                                    $("#viewmordesign").show();
                                }
                                else {
                                    $("#viewmordesign").hide();
                                }
                            }
                            Masterproductlistview.Filterdata();
                        }
                        else {
                            $("#productmaindivlist").hide();
                            $("#emptyproductdatalist").show();
                            $("#nodatadiv").show();
                            $("#recordcount").hide();
                            $(".recordcount").hide();
                            $("#viewmordesign").hide();
                        }
                        $(".loadingtrinity").hide();
                    }
                    else {
                        $(".loadingtrinity").hide();
                        InvalidResponseCode(data);
                    }
                } catch (e) {
                    ErrorDetails(e, Masterproductlistview.variables.File);
                }
            },
            error: OnError,
            complete: function (xhr, errorType) {
                $(".loadingtrinity").hide();
            }
        });
    },
    LoadMore: function (sortorder, sortcolumn) {
        var totalrecords, shownrecords, remainingorders;
        $(".loadingtrinity").show();
        var val = $("#design_row_no").val();
        var myfilter, url;
        myfilter = { rules: [] };
        if ($("#typeofcategory").val() == "category") {
            myfilter.rules.push({ field: "CATEGORY", op: "eq", data: $("#productsubname").val() });
        }
        else if ($("#typeofcategory").val() == "search") {
            myfilter.rules.push({ field: "KEYWORD", op: "eq", data: $("#productsubname").val() });
        }
        else if ($("#typeofcategory").val() == "collection") {
            myfilter.rules.push({ field: "COLLECTIONKEYWORD", op: "eq", data: $("#hiddencollectionkeyword").val() });
            myfilter.rules.push({ field: "DESIGNNORANGE", op: "eq", data: $("#hiddencollectiondesignno").val() });
            myfilter.rules.push({ field: "SUBCATEGORY", op: "eq", data: $("#productsubname").val() });
        }
        else {
            myfilter.rules.push({ field: "SUBCATEGORY", op: "eq", data: $("#productsubname").val() });
        }
        url = "/Common/BindMastersDetails?ServiceName=B2C_PRODUCT_DESIGN_MASTER_GET&page=" + val + "&rows=32&ColumnRequested=RATESTAR,PRICE,OLDPRICE,STOCKTYPEOUT,DISCOUNT,NEWDESIGN,DESIGNNO,IMAGEPATH,ISWISH,NOTPRICEINDIAMOND&sord=" + sortorder + "&sidx=" + sortcolumn + "&myfilters=" + JSON.stringify(myfilter);
        $.ajax({
            url: getDomain() + url,
            data: "",
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.totalrecords > 0) {
                            if (JsonObject.serviceresponse.detailslist != undefined) {
                                var windowscroll = $(document).scrollTop();
                                $("#productlistdata").append($("#Dataproductlist").render(JsonObject.serviceresponse.detailslist.details));
                                $(document).scrollTop(windowscroll);
                                //$("#listviewdetaildiv").append($("#ProductListviewdata").render(JsonObject.serviceresponse.detailslist.details));
                                $(".indianprice").each(function () {
                                    var id = $(this).attr('id');
                                    var Rowid = id.split("indianprice");
                                    var totalp = $("#ipr" + Rowid[1]).val();
                                    var convertint = parseFloat(totalp).toLocaleString(getCurrencyLang(), {
                                        style: 'currency', currency: getCurrencyCode(),
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    });
                                    $("#" + id).html(convertint);
                                });
                                $(".indianoldprice").each(function () {
                                    var id = $(this).attr('id');
                                    var Rowid = id.split("indianoldprice");
                                    var totalp = $("#iprold" + Rowid[1]).val();
                                    var convertint = parseFloat(totalp).toLocaleString(getCurrencyLang(), {
                                        style: 'currency', currency: getCurrencyCode(),
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    });
                                    $("#" + id).html(convertint);
                                });

                                //$(".indianlistprice").each(function () {
                                //    var id = $(this).attr('id');
                                //    var Rowid = id.split("indianlistprice");
                                //    var totalp = $("#iprlist" + Rowid[1]).val();
                                //    var convertint = parseFloat(totalp).toLocaleString(getCurrencyLang(), {
                                //        style: 'currency', currency: getCurrencyCode(),
                                //        minimumFractionDigits: 2,
                                //        maximumFractionDigits: 2,
                                //    });
                                //    $("#" + id).html(convertint);
                                //});
                                //$(".indianoldlistprice").each(function () {
                                //    var id = $(this).attr('id');
                                //    var Rowid = id.split("indianoldlistprice");
                                //    var totalp = $("#iproldlist" + Rowid[1]).val();
                                //    var convertint = parseFloat(totalp).toLocaleString(getCurrencyLang(), {
                                //        style: 'currency', currency: getCurrencyCode(),
                                //        minimumFractionDigits: 2,
                                //        maximumFractionDigits: 2,
                                //    });
                                //    $("#" + id).html(convertint);
                                //});

                                $("#design_row_no").val(Number(val) + 1);
                                totalrecords = parseInt(JsonObject.serviceresponse.totalrecords);
                                shownrecords = parseInt($("#productlistdata .orderrow").length);
                                $("#recordcount").html(shownrecords + " of " + totalrecords + " Designs");
                                $(".recordcount").html(shownrecords + " of " + totalrecords + " Designs");
                                remainingorders = totalrecords - shownrecords;
                                if (remainingorders == 0) {
                                    $("#viewmordesign").hide();
                                }
                            }
                        }
                        $(".loadingtrinity").hide();
                    }
                    else {
                        $(".loadingtrinity").hide();
                        InvalidResponseCode(data);
                    }
                } catch (e) {
                    ErrorDetails(e, Masterproductlistview.variables.File);
                }
            },
        });
    },
    Bindwishlist: function (design) {
        var data = {
            "DESIGNNO": design,
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
                        $("#wish" + design).addClass('wishaftereffect');
                        $("#wishlistview" + design).addClass('wishaftereffect');
                        CartWishlistCount();
                        //if ($(".heart" + design).hasClass('clrgray')) {
                        //    $(".heart" + design).removeClass('clrgray');
                        //    $(".heart" + design).addClass('colorred');
                        //    //OperationMessage("", "Product is added to wishlist", "success");
                        //}
                        //else {
                        //    $(".heart" + design).removeClass('colorred');
                        //    $(".heart" + design).addClass('clrgray');
                        //   // OperationMessage("", "Product is removed to wishlist", "success");
                        //}
                        // CartWishlistCount();
                    }
                } catch (e) {
                    ErrorDetails(e, Masterproductlistview.variables.File);
                }
            },
            error: OnError,
        });
    },
    Filterdata: function () {
        try {
            $.ajax({
                url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_FILTER_GET",
                async: false,
                cache: false,
                type: 'POST',
                success: function (data) {
                    $("#divprice").html("");
                    $("#divmetalweight").html("");
                    $("#divmetalpurity").html("");
                    $("#divmetalcolor").html("");
                    $("#divdiamondshape").html("");
                    $("#divdiamondweight").html("");

                    //*************Mobile Start***************
                    $("#Mobiledivprice").html("");
                    $("#Mobiledivmetalweight").html("");
                    $("#Mobiledivmetalpurity").html("");
                    $("#Mobiledivmetalcolor").html("");
                    $("#Mobiledivdiamondshape").html("");
                    $("#Mobiledivdiamondweight").html("");
                    //*************Mobile End***************

                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.pricelist != undefined) {
                            $("#divprice").append($("#Databindprice").render(JsonObject.serviceresponse.pricelist.price));
                            $(".divprice").append($("#Databindprice").render(JsonObject.serviceresponse.pricelist.price));
                            $(".pricediv").each(function () {
                                //$(this).html($(this).html().replace(/\?/g, '₹ '));
                                $(this).html($(this).html().replace(/\?/g, Number().toLocaleString(undefined, { style: "currency", currency: getCurrencyCode() }).slice(0, 1)));
                            });

                            $("#Mobiledivprice").append($("#MobileDatabindprice").render(JsonObject.serviceresponse.pricelist.price));
                            $(".Mobiledivprice").append($("#MobileDatabindprice").render(JsonObject.serviceresponse.pricelist.price));
                            $(".Mobilepricediv").each(function () {
                                //$(this).html($(this).html().replace(/\?/g, '₹ '));
                                $(this).html($(this).html().replace(/\?/g, Number().toLocaleString(undefined, { style: "currency", currency: getCurrencyCode() }).slice(0, 1)));
                            });

                        }
                        if (JsonObject.serviceresponse.metalweightlist != undefined) {
                            $("#divmetalweight").append($("#Datametalweight").render(JsonObject.serviceresponse.metalweightlist.metalweight));
                            $(".divmetalweight").append($("#Datametalweight").render(JsonObject.serviceresponse.metalweightlist.metalweight));

                            $("#Mobiledivmetalweight").append($("#MobileDatametalweight").render(JsonObject.serviceresponse.metalweightlist.metalweight));
                            $(".Mobiledivmetalweight").append($("#MobileDatametalweight").render(JsonObject.serviceresponse.metalweightlist.metalweight));
                        }
                        if (JsonObject.serviceresponse.metalpuritylist != undefined) {
                            $("#divmetalpurity").append($("#Datametalpurity").render(JsonObject.serviceresponse.metalpuritylist.metalpurity));
                            $(".divmetalpurity").append($("#Datametalpurity").render(JsonObject.serviceresponse.metalpuritylist.metalpurity));

                            $("#Mobiledivmetalpurity").append($("#MobileDatametalpurity").render(JsonObject.serviceresponse.metalpuritylist.metalpurity));
                            $(".Mobiledivmetalpurity").append($("#MobileDatametalpurity").render(JsonObject.serviceresponse.metalpuritylist.metalpurity));

                        }
                        if (JsonObject.serviceresponse.goldcolorlist != undefined) {
                            $("#divmetalcolor").append($("#Datametalcolor").render(JsonObject.serviceresponse.goldcolorlist.goldcolor));
                            $(".divmetalcolor").append($("#Datametalcolor").render(JsonObject.serviceresponse.goldcolorlist.goldcolor));

                            $("#Mobiledivmetalcolor").append($("#MobileDatametalcolor").render(JsonObject.serviceresponse.goldcolorlist.goldcolor));
                            $(".Mobiledivmetalcolor").append($("#MobileDatametalcolor").render(JsonObject.serviceresponse.goldcolorlist.goldcolor));
                        }
                        if (JsonObject.serviceresponse.diamondshapelist != undefined) {
                            $("#divdiamondshape").append($("#Datadiamondshape").render(JsonObject.serviceresponse.diamondshapelist.diamondshape));
                            $(".divdiamondshape").append($("#Datadiamondshape").render(JsonObject.serviceresponse.diamondshapelist.diamondshape));

                            $("#Mobiledivdiamondshape").append($("#MobileDatadiamondshape").render(JsonObject.serviceresponse.diamondshapelist.diamondshape));
                            $(".Mobiledivdiamondshape").append($("#MobileDatadiamondshape").render(JsonObject.serviceresponse.diamondshapelist.diamondshape));
                        }
                        if (JsonObject.serviceresponse.diamondweightlist != undefined) {
                            $("#divdiamondweight").append($("#Datadiamondweight").render(JsonObject.serviceresponse.diamondweightlist.diamondweight));
                            $(".divdiamondweight").append($("#Datadiamondweight").render(JsonObject.serviceresponse.diamondweightlist.diamondweight));

                            $("#Mobiledivdiamondweight").append($("#MobileDatadiamondweight").render(JsonObject.serviceresponse.diamondweightlist.diamondweight));
                            $(".Mobiledivdiamondweight").append($("#MobileDatadiamondweight").render(JsonObject.serviceresponse.diamondweightlist.diamondweight));
                        }
                    }
                    else {
                        InvalidResponseCode(data);
                    }
                },
                error: OnError
            });
        } catch (e) {
            ErrorDetails(e, Masterproductlistview.variables.File);
        }
    },
}
function Productdetail(id) {
    window.open(getDomain() + "/Product/ProductDetail?id=" + id, '_blank');
}
function ApplyFilterData(check, filtName) {
    try {
        Masterproductlistview.variables.Applyfilter = "1";
        var sortorder, sortcolumn;
        sortorder = 'desc';
        sortcolumn = 'DESIGNNO';
        if (filtName == 'Price') {
            if ($("#price" + check).prop("checked") == true) {
                $("#listfiltertag").append('<li id="tagprice' + check + '">' + $("#lableprice" + check).html() + '<span id="dltprice' + check + '" onclick="Removetag(' + check + ',' + "'" + 'Price' + "'" + ')">X</span></li>');
            }
            else if ($("#price" + check).prop("checked") == false) {
                $("#tagprice" + check).remove();
            }
            var pricearray = [], priceid = [];
            $('[name="pricecheck"]:checked').each(function (i, e) {
                pricearray.push(e.value.replace(/\?/g, ''));
                priceid.push(e.id.replace(/\?/g, ''));
            });
            pricearray = pricearray.join(',');
            priceid = priceid.join(',');

            Masterproductlistview.variables.price = pricearray;
            StorfilterCookies(filtName, priceid);
            addclearbutton()
            Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
        }
        else if (filtName == 'MetalWeight') {
            if ($("#metalwtg" + check).prop("checked") == true) {
                $("#listfiltertag").append('<li id="tagmetalweight' + check + '">' + $("#lablemetalweight" + check).html() + '<span id="dltmetalwtg' + check + '" onclick="Removetag(' + check + ',' + "'" + 'MetalWeight' + "'" + ')">X</span></li>');
            }
            else if ($("#metalwtg" + check).prop("checked") == false) {
                $("#tagmetalweight" + check).remove();
            }

            var metalwtgarray = [], metalid = [];
            $('[name="metalweightcheck"]:checked').each(function (i, e) {
                metalwtgarray.push(e.value.replace('gm', ''));
                metalid.push(e.id.replace('gm', ''));
            });
            metalwtgarray = metalwtgarray.join(',');
            metalid = metalid.join(',');
            Masterproductlistview.variables.goldweight = metalwtgarray;
            StorfilterCookies(filtName, metalid);
            addclearbutton();
            Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
        }
        else if (filtName == 'DiamondWeight') {
            if ($("#diamdwtg" + check).prop("checked") == true) {
                $("#listfiltertag").append('<li id="tagdiamondweight' + check + '">' + $("#lablediamondweight" + check).html() + '<span id="dltdiamondwtg' + check + '" onclick="Removetag(' + check + ',' + "'" + 'DiamondWeight' + "'" + ')">X</span></li>');
            }
            else if ($("#diamdwtg" + check).prop("checked") == false) {
                $("#tagdiamondweight" + check).remove();
            }
            var diamondwtgarray = [], dwid = [];
            $('[name="diamondweightcheck"]:checked').each(function (i, e) {
                diamondwtgarray.push(e.value.replace('cts', ''));
                dwid.push(e.id.replace('cts', ''));
            });
            diamondwtgarray = diamondwtgarray.join(',');
            dwid = dwid.join(',');
            Masterproductlistview.variables.diamondweight = diamondwtgarray;
            StorfilterCookies(filtName, dwid);
            addclearbutton();
            Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
        }
        else if (filtName == 'MetalPurity') {
            if ($("#metalpurity" + check).hasClass('btn-color')) {
                $("#metalpurity" + check).removeClass('btn-color');
                $("#metalpurityatag" + check).removeClass('gpurity');
                $("#taggoldpurity" + check).remove();
            }
            else {
                var mpcheck = "'" + check + "'";
                $("#metalpurity" + check).addClass('btn-color');
                $("#metalpuritytag" + check).addClass('gpurity');
                $("#listfiltertag").append('<li id="taggoldpurity' + check + '">' + $("#metalpurityatag" + check).html() + '<span id="dltgoldpurity' + check + '" onclick="Removetag(' + mpcheck + ',' + "'" + 'MetalPurity' + "'" + ')">X</span></li>');
            }
            var goldpurityarray = [], goldp = [];
            $('.metalpurity').each(function (i, e) {
                if ($(e).hasClass('btn-color')) {
                    goldpurityarray.push(e.value + "KT");
                }
            });
            goldpurityarray = goldpurityarray.join(',');
            Masterproductlistview.variables.goldpurity = goldpurityarray;
            StorfilterCookies(filtName, goldpurityarray);
            addclearbutton();
            Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
        }
        else if (filtName == 'MetalColor') {
            if ($("#metalcolor" + check).hasClass('btn-color')) {
                $("#metalcolor" + check).removeClass('btn-color');
                $("#metalcoloratag" + check).removeClass('gpurity');
                $("#taggoldcolor" + check).remove();
            }
            else {
                var checkval = "'" + check + "'";
                $("#metalcolor" + check).addClass('btn-color');
                $("#metalcolortag" + check).addClass('gpurity');
                $("#listfiltertag").append('<li id="taggoldcolor' + check + '">' + $("#metalcoloratag" + check).html() + '<span id="dltgoldpurity' + check + '" onclick="Removetag(' + checkval + ',' + "'" + 'MetalColor' + "'" + ')">X</span></li>');
            }
            var goldcolorarray = [];
            $('.metalcolor').each(function (i, e) {
                if ($(e).hasClass('btn-color')) {
                    goldcolorarray.push(e.attributes[2].value);
                }
            });
            goldcolorarray = goldcolorarray.join(',');
            Masterproductlistview.variables.goldcolor = goldcolorarray;
            StorfilterCookies(filtName, goldcolorarray);
            addclearbutton();
            Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
        }
        else if (filtName == 'Shape') {
            if ($("#divshape" + check).hasClass('shapeactive')) {
                $("#divshape" + check).removeClass('shapeactive');
                $("#tagshape" + check).remove();
            }
            else {
                var checkval = "'" + check + "'";
                var shapname = $("#shapename" + check).html();
                $("#divshape" + check).addClass('shapeactive');
                $("#listfiltertag").append('<li id="tagshape' + check + '">' + shapname + '<span id="dltshape' + check + '" onclick="Removetag(' + checkval + ',' + "'" + 'Shape' + "'" + ')">X</span></li>');
            }
            var shapearray = [];
            $('.dvshape').each(function (i, e) {
                if ($(e).hasClass('shapeactive')) {
                    shapearray.push(e.attributes[2].value);
                }
            });
            shapearray = shapearray.join(',');
            Masterproductlistview.variables.diamondshape = shapearray;
            StorfilterCookies(filtName, shapearray);
            addclearbutton();
            Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
        }
        addclearbutton();
    } catch (e) {
        ErrorDetails(e, Masterproductlistview.variables.File);
    }
}
function MobileApplyFilterData(check, filtName) {
    try {
        Masterproductlistview.variables.Applyfilter = "1";
        var sortorder, sortcolumn;
        sortorder = 'desc';
        sortcolumn = 'DESIGNNO';
        if (filtName == 'Price') {
            if ($("#Mobileprice" + check).prop("checked") == true) {
                $("#Mobilelistfiltertag").append('<li id="Mobiletagprice' + check + '">' + $("#Mobilelableprice" + check).html() + '<span id="Mobiledltprice' + check + '" onclick="MobileRemovetag(' + check + ',' + "'" + 'Price' + "'" + ')">X</span></li>');
            }
            else if ($("#Mobileprice" + check).prop("checked") == false) {
                $("#Mobiletagprice" + check).remove();
            }
            var pricearray = [], priceid = [];
            $('[name="Mobilepricecheck"]:checked').each(function (i, e) {
                pricearray.push(e.value.replace(/\?/g, ''));
                priceid.push(e.id.replace(/\?/g, ''));
            });
            pricearray = pricearray.join(',');
            priceid = priceid.join(',');

            Masterproductlistview.variables.price = pricearray;
            MobileStorfilterCookies(filtName, priceid);
            Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
        }
        else if (filtName == 'MetalWeight') {
            if ($("#Mobilemetalwtg" + check).prop("checked") == true) {
                $("#Mobilelistfiltertag").append('<li id="Mobiletagmetalweight' + check + '">' + $("#Mobilelablemetalweight" + check).html() + '<span id="Mobiledltmetalwtg' + check + '" onclick="MobileRemovetag(' + check + ',' + "'" + 'MetalWeight' + "'" + ')">X</span></li>');
            }
            else if ($("#Mobilemetalwtg" + check).prop("checked") == false) {
                $("#Mobiletagmetalweight" + check).remove();
            }

            var metalwtgarray = [], metalid = [];
            $('[name="Mobilemetalweightcheck"]:checked').each(function (i, e) {
                metalwtgarray.push(e.value.replace('gm', ''));
                metalid.push(e.id.replace('gm', ''));
            });
            metalwtgarray = metalwtgarray.join(',');
            metalid = metalid.join(',');
            Masterproductlistview.variables.goldweight = metalwtgarray;
            MobileStorfilterCookies(filtName, metalid);
            Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
        }
        else if (filtName == 'DiamondWeight') {
            if ($("#Mobilediamdwtg" + check).prop("checked") == true) {
                $("#Mobilelistfiltertag").append('<li id="Mobiletagdiamondweight' + check + '">' + $("#Mobilelablediamondweight" + check).html() + '<span id="Mobiledltdiamondwtg' + check + '" onclick="MobileRemovetag(' + check + ',' + "'" + 'DiamondWeight' + "'" + ')">X</span></li>');
            }
            else if ($("#Mobilediamdwtg" + check).prop("checked") == false) {
                $("#Mobiletagdiamondweight" + check).remove();
            }
            var diamondwtgarray = [], dwid = [];
            $('[name="Mobilediamondweightcheck"]:checked').each(function (i, e) {
                diamondwtgarray.push(e.value.replace('cts', ''));
                dwid.push(e.id.replace('cts', ''));
            });
            diamondwtgarray = diamondwtgarray.join(',');
            dwid = dwid.join(',');
            Masterproductlistview.variables.diamondweight = diamondwtgarray;
            MobileStorfilterCookies(filtName, dwid);
            Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
        }
        else if (filtName == 'MetalPurity') {
            if ($("#Mobilemetalpurity" + check).hasClass('btn-color')) {
                $("#Mobilemetalpurity" + check).removeClass('btn-color');
                $("#Mobilemetalpurityatag" + check).removeClass('gpurity');
                $("#Mobiletaggoldpurity" + check).remove();
            }
            else {
                var mpcheck = "'" + check + "'";
                $("#Mobilemetalpurity" + check).addClass('btn-color');
                $("#Mobilemetalpurityatag" + check).addClass('gpurity');
                $("#Mobilelistfiltertag").append('<li id="Mobiletaggoldpurity' + check + '">' + $("#Mobilemetalpurityatag" + check).html() + '<span id="Mobiledltgoldpurity' + check + '" onclick="MobileRemovetag(' + mpcheck + ',' + "'" + 'MetalPurity' + "'" + ')">X</span></li>');
            }
            var goldpurityarray = [], goldp = [];
            $('.Mobilemetalpurity').each(function (i, e) {
                if ($(e).hasClass('btn-color')) {
                    goldpurityarray.push(e.value + "KT");
                }
            });
            goldpurityarray = goldpurityarray.join(',');
            Masterproductlistview.variables.goldpurity = goldpurityarray;
            MobileStorfilterCookies(filtName, goldpurityarray);
            Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
        }
        else if (filtName == 'MetalColor') {
            if ($("#Mobilemetalcolor" + check).hasClass('btn-color')) {
                $("#Mobilemetalcolor" + check).removeClass('btn-color');
                $("#Mobilemetalcoloratag" + check).removeClass('gpurity');
                $("#Mobiletaggoldcolor" + check).remove();
            }
            else {
                var checkval = "'" + check + "'";
                $("#Mobilemetalcolor" + check).addClass('btn-color');
                $("#Mobilemetalcolortag" + check).addClass('gpurity');
                $("#Mobilelistfiltertag").append('<li id="Mobiletaggoldcolor' + check + '">' + $("#Mobilemetalcoloratag" + check).html() + '<span id="Mobiledltgoldpurity' + check + '" onclick="MobileRemovetag(' + checkval + ',' + "'" + 'MetalColor' + "'" + ')">X</span></li>');
            }
            var goldcolorarray = [];
            $('.Mobilemetalcolor').each(function (i, e) {
                if ($(e).hasClass('btn-color')) {
                    goldcolorarray.push(e.attributes[2].value);
                }
            });
            goldcolorarray = goldcolorarray.join(',');
            Masterproductlistview.variables.goldcolor = goldcolorarray;
            MobileStorfilterCookies(filtName, goldcolorarray);
            Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
        }
        else if (filtName == 'Shape') {
            if ($("#Mobiledivshape" + check).hasClass('shapeactive')) {
                $("#Mobiledivshape" + check).removeClass('shapeactive');
                $("#Mobiletagshape" + check).remove();
            }
            else {
                var checkval = "'" + check + "'";
                var shapname = $("#Mobileshapename" + check).html();
                $("#Mobiledivshape" + check).addClass('shapeactive');
                $("#Mobilelistfiltertag").append('<li id="Mobiletagshape' + check + '">' + shapname + '<span id="Mobiledltshape' + check + '" onclick="MobileRemovetag(' + checkval + ',' + "'" + 'Shape' + "'" + ')">X</span></li>');
            }
            var shapearray = [];
            $('.Mobiledvshape').each(function (i, e) {
                if ($(e).hasClass('shapeactive')) {
                    shapearray.push(e.attributes[2].value);
                }
            });
            shapearray = shapearray.join(',');
            Masterproductlistview.variables.diamondshape = shapearray;
            MobileStorfilterCookies(filtName, shapearray);
            Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
        }
        Mobileaddclearbutton();
    } catch (e) {
        ErrorDetails(e, Masterproductlistview.variables.File);
    }
}
function Removetag(dltbtn, filtName) {
    try {
        var sortorder, sortcolumn;
        sortorder = 'desc';
        sortcolumn = 'DESIGNNO';
        if (filtName == 'Price') {
            $("#tagprice" + dltbtn).remove();
            $("#price" + dltbtn).prop("checked", false);

            var pricearray = [], priceid = [];
            $('[name="pricecheck"]:checked').each(function (i, e) {
                pricearray.push(e.value.replace(/\?/g, ''));
                priceid.push(e.id.replace(/\?/g, ''));
            });
            pricearray = pricearray.join(',');
            priceid = priceid.join(',');

            Masterproductlistview.variables.price = pricearray;
            StorfilterCookies(filtName, priceid);
            addclearbutton();
            Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
        }
        else if (filtName == 'MetalWeight') {
            $("#tagmetalweight" + dltbtn).remove();
            $("#dltmetalwtg" + dltbtn).prop("checked", false);

            var metalwtgarray = [], metalid = [];
            $('[name="metalweightcheck"]:checked').each(function (i, e) {
                metalwtgarray.push(e.value.replace('gm', ''));
                metalid.push(e.id.replace('gm', ''));
            });
            metalwtgarray = metalwtgarray.join(',');
            metalid = metalid.join(',');
            Masterproductlistview.variables.goldweight = metalwtgarray;
            StorfilterCookies(filtName, metalid);
            addclearbutton();
            Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
        }
        else if (filtName == 'DiamondWeight') {
            $("#tagdiamondweight" + dltbtn).remove();
            $("#diamdwtg" + dltbtn).prop("checked", false);

            var diamondwtgarray = [], dwid = [];
            $('[name="diamondweightcheck"]:checked').each(function (i, e) {
                diamondwtgarray.push(e.value.replace('cts', ''));
                dwid.push(e.id.replace('cts', ''));
            });
            diamondwtgarray = diamondwtgarray.join(',');
            dwid = dwid.join(',');
            Masterproductlistview.variables.diamondweight = diamondwtgarray;
            StorfilterCookies(filtName, dwid);
            addclearbutton();
            Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
        }
        else if (filtName == 'MetalPurity') {
            $("#taggoldpurity" + dltbtn).remove();
            $("#metalpurity" + dltbtn).removeClass('btn-color');
            $("#metalpurityatag" + dltbtn).removeClass('gpurity');

            var goldpurityarray = [], goldp = [];
            $('.metalpurity').each(function (i, e) {
                if ($(e).hasClass('btn-color')) {
                    goldpurityarray.push(e.value + "KT");
                }
            });
            goldpurityarray = goldpurityarray.join(',');
            Masterproductlistview.variables.goldpurity = goldpurityarray;
            StorfilterCookies(filtName, goldpurityarray);
            addclearbutton();
            Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
        }
        else if (filtName == 'MetalColor') {
            $("#taggoldcolor" + dltbtn).remove();
            $("#metalcolor" + dltbtn).removeClass('btn-color');
            $("#metalcoloratag" + dltbtn).removeClass('gpurity');

            var goldcolorarray = [];
            $('.metalcolor').each(function (i, e) {
                if ($(e).hasClass('btn-color')) {
                    goldcolorarray.push(e.attributes[2].value);
                }
            });
            goldcolorarray = goldcolorarray.join(',');
            Masterproductlistview.variables.goldcolor = goldcolorarray;
            StorfilterCookies(filtName, goldcolorarray);
            addclearbutton();
            Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
        }
        else if (filtName == 'Shape') {
            $("#tagshape" + dltbtn).remove();
            $("#divshape" + dltbtn).removeClass('shapeactive');
            var shapearray = [];
            $('.dvshape').each(function (i, e) {
                if ($(e).hasClass('shapeactive')) {
                    shapearray.push(e.attributes[2].value);
                }
            });

            shapearray = shapearray.join(',');
            Masterproductlistview.variables.diamondshape = shapearray;
            StorfilterCookies(filtName, shapearray);
            addclearbutton();
            Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
        }
        addclearbutton();
    } catch (e) {
        ErrorDetails(e, Masterproductlistview.variables.File);
    }
}
function MobileRemovetag(dltbtn, filtName) {
    try {
        var sortorder, sortcolumn;
        sortorder = 'desc';
        sortcolumn = 'DESIGNNO';
        if (filtName == 'Price') {
            $("#Mobiletagprice" + dltbtn).remove();
            $("#Mobileprice" + dltbtn).prop("checked", false);

            var pricearray = [], priceid = [];
            $('[name="Mobilepricecheck"]:checked').each(function (i, e) {
                pricearray.push(e.value.replace(/\?/g, ''));
                priceid.push(e.id.replace(/\?/g, ''));
            });
            pricearray = pricearray.join(',');
            priceid = priceid.join(',');

            Masterproductlistview.variables.price = pricearray;
            MobileStorfilterCookies(filtName, priceid);
            Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
        }
        else if (filtName == 'MetalWeight') {
            $("#Mobiletagmetalweight" + dltbtn).remove();
            $("#Mobiledltmetalwtg" + dltbtn).prop("checked", false);

            var metalwtgarray = [], metalid = [];
            $('[name="Mobilemetalweightcheck"]:checked').each(function (i, e) {
                metalwtgarray.push(e.value.replace('gm', ''));
                metalid.push(e.id.replace('gm', ''));
            });
            metalwtgarray = metalwtgarray.join(',');
            metalid = metalid.join(',');
            Masterproductlistview.variables.goldweight = metalwtgarray;
            MobileStorfilterCookies(filtName, metalid);
            Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
        }
        else if (filtName == 'DiamondWeight') {
            $("#Mobiletagdiamondweight" + dltbtn).remove();
            $("#Mobilediamdwtg" + dltbtn).prop("checked", false);

            var diamondwtgarray = [], dwid = [];
            $('[name="Mobilediamondweightcheck"]:checked').each(function (i, e) {
                diamondwtgarray.push(e.value.replace('cts', ''));
                dwid.push(e.id.replace('cts', ''));
            });
            diamondwtgarray = diamondwtgarray.join(',');
            dwid = dwid.join(',');
            Masterproductlistview.variables.diamondweight = diamondwtgarray;
            MobileStorfilterCookies(filtName, dwid);
            Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
        }
        else if (filtName == 'MetalPurity') {
            $("#Mobiletaggoldpurity" + dltbtn).remove();
            $("#Mobilemetalpurity" + dltbtn).removeClass('btn-color');
            $("#Mobilemetalpurityatag" + dltbtn).removeClass('gpurity');

            var goldpurityarray = [], goldp = [];
            $('.Mobilemetalpurity').each(function (i, e) {
                if ($(e).hasClass('btn-color')) {
                    goldpurityarray.push(e.value + "KT");
                }
            });
            goldpurityarray = goldpurityarray.join(',');
            Masterproductlistview.variables.goldpurity = goldpurityarray;
            MobileStorfilterCookies(filtName, goldpurityarray);
            Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
        }
        else if (filtName == 'MetalColor') {
            $("#Mobiletaggoldcolor" + dltbtn).remove();
            $("#Mobilemetalcolor" + dltbtn).removeClass('btn-color');
            $("#Mobilemetalcoloratag" + dltbtn).removeClass('gpurity');

            var goldcolorarray = [];
            $('.Mobilemetalcolor').each(function (i, e) {
                if ($(e).hasClass('btn-color')) {
                    goldcolorarray.push(e.attributes[2].value);
                }
            });
            goldcolorarray = goldcolorarray.join(',');
            Masterproductlistview.variables.goldcolor = goldcolorarray;
            MobileStorfilterCookies(filtName, goldcolorarray);
            Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
        }
        else if (filtName == 'Shape') {
            $("#Mobiletagshape" + dltbtn).remove();
            $("#Mobiledivshape" + dltbtn).removeClass('shapeactive');
            var shapearray = [];
            $('.Mobiledvshape').each(function (i, e) {
                if ($(e).hasClass('shapeactive')) {
                    shapearray.push(e.attributes[2].value);
                }
            });

            shapearray = shapearray.join(',');
            Masterproductlistview.variables.diamondshape = shapearray;
            MobileStorfilterCookies(filtName, shapearray);
            Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
        }
        Mobileaddclearbutton();
    } catch (e) {
        ErrorDetails(e, Masterproductlistview.variables.File);
    }
}
function Dropdownfilter() {
    if ($("#dropdownfilter option:selected").val() == 'Default') {
        sortorder = 'desc';
        sortcolumn = 'DESIGNNO';
    }
    else if ($("#dropdownfilter option:selected").val() == 'designno') {
        sortorder = 'desc';
        sortcolumn = 'DESIGNNO';
    }
    else if ($("#dropdownfilter option:selected").val() == 'whatisnew') {
        sortorder = 'desc';
        sortcolumn = 'NEWDESIGN';
    }
    else if ($("#dropdownfilter option:selected").val() == 'popular') {
        sortorder = 'desc';
        sortcolumn = 'RATESTAR';
    }
    else if ($("#dropdownfilter option:selected").val() == 'pricelowtohigh') {
        sortorder = 'asc';
        sortcolumn = 'PRICE';
    }
    else if ($("#dropdownfilter option:selected").val() == 'ratehightolow') {
        sortorder = 'desc';
        sortcolumn = 'PRICE';
    }
    Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
}
function MobileDropdownfilter() {
    if ($("#Mobiledropdownfilter option:selected").val() == 'Default') {
        sortorder = 'desc';
        sortcolumn = 'DESIGNNO';
    }
    else if ($("#Mobiledropdownfilter option:selected").val() == 'designno') {
        sortorder = 'desc';
        sortcolumn = 'DESIGNNO';
    }
    else if ($("#Mobiledropdownfilter option:selected").val() == 'whatisnew') {
        sortorder = 'desc';
        sortcolumn = 'NEWDESIGN';
    }
    else if ($("#Mobiledropdownfilter option:selected").val() == 'popular') {
        sortorder = 'desc';
        sortcolumn = 'RATESTAR';
    }
    else if ($("#Mobiledropdownfilter option:selected").val() == 'pricelowtohigh') {
        sortorder = 'asc';
        sortcolumn = 'PRICE';
    }
    else if ($("#Mobiledropdownfilter option:selected").val() == 'ratehightolow') {
        sortorder = 'desc';
        sortcolumn = 'PRICE';
    }
    Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
    closeNav();

}
function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
function StorfilterCookies(FilterName, Value) {
    try {
        var hidenulli = escape($("#listfiltertag").html());
        $.ajax({
            url: getDomain() + '/Product/ProductFilter',
            data: JSON.stringify({
                FilterName: FilterName,
                Value: Value,
                Tagvalue: hidenulli
            }),
            async: true,
            type: 'POST',
            cache: false,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data = "success") {

                }

            },
            error: OnError,
        });
    } catch (e) {
        ErrorDetails(e, Masterproductlistview.variables.File);
    }
}
function Clearfilterfunction() {
    try {
        $.ajax({
            url: getDomain() + '/Login/ClearFilter',
            async: true,
            cache: false,
            success: function (data) {
                if (data = "success") {
                    var sortorder, sortcolumn;
                    sortorder = 'desc';
                    sortcolumn = 'DESIGNNO';
                    Masterproductlistview.variables.Applyfilter = "0";
                    Masterproductlistview.variables.diamondshape = "";
                    Masterproductlistview.variables.goldcolor = "";
                    Masterproductlistview.variables.goldpurity = "";
                    Masterproductlistview.variables.diamondweight = "";
                    Masterproductlistview.variables.goldweight = "";
                    Masterproductlistview.variables.price = "";
                    $(".dvshape").removeClass('shapeactive');
                    $('.metalcolor').removeClass('btn-color');
                    $('.metalpurity').removeClass('btn-color');
                    $('[name="diamondweightcheck"]').prop("checked", false);
                    $('[name="metalweightcheck"]').prop("checked", false);
                    $('[name="pricecheck"]').prop("checked", false);
                    $("#listfiltertag").html("");
                    $("#clerfilterid").hide();
                    $("#hiddenfiltervalue").val("");
                    Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
                }
            }
        });
    } catch (e) {
        ErrorDetails(e, Masterproductlistview.variables.File);
    }
}
function MobileStorfilterCookies(FilterName, Value) {
    try {
        var hidenulli = escape($("#Mobilelistfiltertag").html());
        $.ajax({
            url: getDomain() + '/Product/ProductFilter',
            data: JSON.stringify({
                FilterName: FilterName,
                Value: Value,
                Tagvalue: hidenulli
            }),
            async: true,
            type: 'POST',
            cache: false,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data = "success") {

                }

            },
            error: OnError,
        });
    } catch (e) {
        ErrorDetails(e, Masterproductlistview.variables.File);
    }
}
function MobileClearfilterfunction() {
    try {
        $.ajax({
            url: getDomain() + '/Login/ClearFilter',
            async: true,
            cache: false,
            success: function (data) {
                if (data = "success") {
                    var sortorder, sortcolumn;
                    sortorder = 'desc';
                    sortcolumn = 'DESIGNNO';
                    Masterproductlistview.variables.Applyfilter = "0";
                    Masterproductlistview.variables.diamondshape = "";
                    Masterproductlistview.variables.goldcolor = "";
                    Masterproductlistview.variables.goldpurity = "";
                    Masterproductlistview.variables.diamondweight = "";
                    Masterproductlistview.variables.goldweight = "";
                    Masterproductlistview.variables.price = "";
                    $(".Mobiledvshape").removeClass('shapeactive');
                    $('.Mobilemetalcolor').removeClass('btn-color');
                    $('.Mobilemetalpurity').removeClass('btn-color');
                    $('[name="Mobilediamondweightcheck"]').prop("checked", false);
                    $('[name="Mobilemetalweightcheck"]').prop("checked", false);
                    $('[name="Mobilepricecheck"]').prop("checked", false);
                    $("#Mobilelistfiltertag").html("");
                    $("#Mobileclerfilterid").hide();
                    $("#Mobilehiddenfiltervalue").val("");
                    Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
                }
            }
        });
    } catch (e) {
        ErrorDetails(e, Masterproductlistview.variables.File);
    }
}
$(document).ready(function () {

    //Scroll start
    window.onscroll = function () { myFunction() };

    var header = document.getElementById("myHeader");
    function myFunction() {
        if (window.pageYOffset >= 150) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }
    //Scroll end

    //------------Bind Main Product List Data------------------------

    var sortorder, sortcolumn;
    sortorder = 'desc';
    sortcolumn = 'DESIGNNO';

    if ($("#hiddenfiltervalue").val() == "1" || $("#Mobilehiddenfiltervalue").val() == "1") {
        var hdp = $("#hiddenPricefilter").val();
        var hdnval = $("#" + hdp).val();
        var hdmetalwtgid = $("#hiddenMetalWeightfilter").val();
        var hdndiamondwtg = $("#hiddenDiamondWeightfilter").val();
        Masterproductlistview.Filterdata();

        if ($("#hiddenPricefilter").val() != "") {
            var pricearray = [];
            $((hdp).split(",")).each(function (i, item) {
                $("input[id=" + $.trim(item) + "]").prop('checked', true);
                pricearray.push($("#" + $.trim(item)).val().replace(/\?/g, ''));
            });
            pricearray = pricearray.join(',');
            Masterproductlistview.variables.price = pricearray;
        }

        if ($("#hiddenMetalWeightfilter").val() != "") {
            var metalwtgarray = [];
            $((hdmetalwtgid).split(",")).each(function (i, item) {
                $("input[id=" + $.trim(item) + "]").prop('checked', true);
                metalwtgarray.push($("#" + $.trim(item)).val().replace(/\?/g, ''));
            });
            metalwtgarray = metalwtgarray.join(',');
            Masterproductlistview.variables.goldweight = metalwtgarray;
        }

        if ($("#hiddenDiamondWeightfilter").val() != "") {
            var dimdwtgarray = [];
            $((hdndiamondwtg).split(",")).each(function (i, item) {
                $("input[id=" + $.trim(item) + "]").prop('checked', true);
                dimdwtgarray.push($("#" + $.trim(item)).val().replace(/\?/g, ''));
            });
            dimdwtgarray = dimdwtgarray.join(',');
            Masterproductlistview.variables.diamondweight = dimdwtgarray;
        }
        if ($("#hiddenMetalPurityfilter").val() != "" && $("#hiddenfiltervalue").val() == "1") {
            var goldprtarray = [];
            $(($("#hiddenMetalPurityfilter").val()).split(",")).each(function (i, item) {
                $("#metalpurity" + $.trim(item)).addClass('btn-color')
                goldprtarray.push($("#metalpurity" + item).val() + "KT");

                $("#Mobilemetalpurity" + $.trim(item)).addClass('btn-color')
                goldprtarray.push($("#Mobilemetalpurity" + item).val() + "KT");
            });
            goldprtarray = goldprtarray.join(',');
            Masterproductlistview.variables.goldpurity = goldprtarray;
        }

        if ($("#hiddenMetalColorfilter").val() != "" && $("#hiddenfiltervalue").val() == "1") {
            var goldprtclr = [];
            $(($("#hiddenMetalColorfilter").val()).split(",")).each(function (i, item) {
                $("#metalcolor" + $.trim(item)).addClass('btn-color')
                goldprtclr.push($("#metalcolor" + item).attr('value'));

                $("#Mobilemetalcolor" + $.trim(item)).addClass('btn-color')
                goldprtclr.push($("#Mobilemetalcolor" + item).attr('value'));
            });
            goldprtclr = goldprtclr.join(',');
            Masterproductlistview.variables.goldcolor = goldprtclr;
        }
        if ($("#hiddenShapefilter").val() != "" && $("#hiddenfiltervalue").val() == "1") {
            var diashape = [];
            $(($("#hiddenShapefilter").val()).split(",")).each(function (i, item) {
                $("#divshape" + item).addClass('shapeactive');
                $("#metalcolor" + $.trim(item)).addClass('btn-color');

                $("#Mobiledivshape" + item).addClass('shapeactive');
                $("#Mobilemetalcolor" + $.trim(item)).addClass('btn-color')
                diashape.push(item);
            });
            diashape = diashape.join(',');
            Masterproductlistview.variables.diamondshape = diashape;
        }
        Masterproductlistview.variables.Applyfilter = "1";
        if ($("#hiddentagvaluefilter").val() != "" && $("#hiddenfiltervalue").val() != "") {
            $("#listfiltertag").html(unescape($("#hiddentagvaluefilter").val()));
            $("#clerfilterid").show();
        }
        if ($("Mobilehiddenfiltervalue").val() != "" && $("#hiddentagvaluefilter").val() != "") {
            $("#Mobilelistfiltertag").html(unescape($("#hiddentagvaluefilter").val()));
            $("#Mobileclerfilterid").show();
        }
        Masterproductlistview.Bindproductlist(sortorder, sortcolumn);
    }
    else {
        Masterproductlistview.BindFirsttimeproductlist(sortorder, sortcolumn);
        //Masterproductlistview.Filterdata();
    }
    $(".dvshape").hover(function () {
        $(".dvshape img").addClass('imgshapehover');
        $(".dvshape span").addClass('shapspan');
    });
    $(".Mobiledvshape").hover(function () {
        $(".Mobiledvshape img").addClass('imgshapehover');
        $(".Mobiledvshape span").addClass('shapspan');
    });
    $('#LoginModal').on('hide.bs.modal', function () {
        var login;
        if ($("#hiddenloginid").val() == undefined) {
            login = "";
        }
        else {
            login = $("#hiddenloginid").val();
        }
        if (Loginview.variable.IsLogin == "1" || login != "") {
            addtowishlist(Masterproductlistview.variables.designo);
            $("#LoginModal").removeClass('show')
            $("#layoutlogin").hide();
            $("#layoutfullnamediv").show();
        }
        $("body").removeClass("ovrf-y");
    });
    $("#btnloginmodalclose").click(function () {
        $("#toggle-heart" + Masterproductlistview.variables.wishbtnid).prop("checked", false);
        Masterproductlistview.variables.wishbtnid = "";
    })
    $("#viewmordesign").click(function () {
        if ($("#dropdownfilter option:selected").val() == 'Default') {
            sortorder = 'desc';
            sortcolumn = 'DESIGNNO';
        }
        else if ($("#dropdownfilter option:selected").val() == 'designno') {
            sortorder = 'desc';
            sortcolumn = 'DESIGNNO';
        }
        else if ($("#dropdownfilter option:selected").val() == 'whatisnew') {
            sortorder = 'desc';
            sortcolumn = 'WHATISNEW';
        }
        else if ($("#dropdownfilter option:selected").val() == 'popular') {
            sortorder = 'desc';
            sortcolumn = 'RATESTAR';
        }
        else if ($("#dropdownfilter option:selected").val() == 'pricelowtohigh') {
            sortorder = 'asc';
            sortcolumn = 'PRICE';
        }
        else if ($("#dropdownfilter option:selected").val() == 'ratehightolow') {
            sortorder = 'desc';
            sortcolumn = 'PRICE';
        }
        Masterproductlistview.LoadMore(sortorder, sortcolumn);
    });
});
function addtowishlist(design) {
    var login;
    Masterproductlistview.variables.designo = design;
    Masterproductlistview.variables.wishbtnid = design;
    if ($("#hiddenloginid").val() == undefined) {
        login = "";
    }
    else {
        login = $("#hiddenloginid").val();
    }
    if (Loginview.variable.IsLogin == "1" || login != "") {
        Masterproductlistview.Bindwishlist(design);
    }
    else {
        //$("#LoginModal").modal('show');
        //$("#LoginModal").addClass('show');
        //$("#LoginModal").css("background-color", "#00000059!important");
        //$("body").addClass("ovrf-y");
        $("#LoginModal").modal("show");
        $("#LoginModal").addClass("backcolorcancel");
    }
}
function showlistdetail() {
    Masterproductlistview.variables.Isgrid = '0';
    $("#listviewdetaildiv").show();
    $("#productlistdata").hide();
    $("#viewmordesignlist").show();
}
function showgriddetail() {
    Masterproductlistview.variables.Isgrid = '1';
    $("#productlistdata").show();
    $("#listviewdetaildiv").hide();
    $("#viewmordesignlist").hide();
}
function addclearbutton() {
    if ($("#listfiltertag li").length > 0) {
        $("#clerfilterid").show();
    }
    else {
        $("#clerfilterid").hide();
    }
}
function Mobileaddclearbutton() {
    if ($("#Mobilelistfiltertag li").length > 0) {
        $("#Mobileclerfilterid").show();
    }
    else {
        $("#Mobileclerfilterid").hide();
    }
}