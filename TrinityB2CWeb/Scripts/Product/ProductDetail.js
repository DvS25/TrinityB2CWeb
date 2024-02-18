var ProductDetail = {
    variables: {
        File: 'ProductDetail.Js',
        SelectDcolor: "",
        SelectDpurity: "",
        SelectGcolor: "",
        CartString: '',
        SelectGpurity: "",
        SelectDesignsize: "",
        SelectSize: "",
        addtocart: "0",
        activediv: "",
        activetab: "",
        Isgotocart: 0,
        Personilizenotes: "",
        Isfirstcart: "",
        setsomediamond: 0,
    },
    Bindproductdetaildata: function () {
        $(".loadingtrinity").show();
        var myfilter, url;
        myfilter = { rules: [] };
        if ($("#hideiscutomizefromcartid").val() != "" && $("#hideiscutomize").val() == "") {

            ProductDetail.variables.SelectGpurity = $("#hidegoldpurity").val();
            ProductDetail.variables.SelectGcolor = $("#hidegoldcolor").val();
            ProductDetail.variables.SelectDcolor = $("#hidediamondcolor").val();
            ProductDetail.variables.SelectDpurity = $("#hidediamondpurity").val();
            ProductDetail.variables.SelectSize = $("#hidedesignsize").val();
            ProductDetail.variables.Personilizenotes = $("#hidecutomizenotes").val();
            $("#hideiscutomize").val($("#hideisfromcartcutomize").val());
            ProductDetail.variables.Personilizenotes = "1";
        }
        myfilter.rules.push({ field: "DESIGNNO", op: "eq", data: $("#hidedesignno").val() });
        myfilter.rules.push({ field: "GOLDPURITY", op: "eq", data: ProductDetail.variables.SelectGpurity });
        myfilter.rules.push({ field: "GOLDCOLOR", op: "eq", data: ProductDetail.variables.SelectGcolor });
        myfilter.rules.push({ field: "DIAMONDCOLOR", op: "eq", data: ProductDetail.variables.SelectDcolor });
        myfilter.rules.push({ field: "DIAMONDPURITY", op: "eq", data: ProductDetail.variables.SelectDpurity });
        url = "/Common/BindMastersDetails?ServiceName=B2C_PRODUCT_DESIGN_DETAIL_GET&ColumnRequested=ALL&sord=asc&sidx=DESIGNNO&myfilters=" + JSON.stringify(myfilter);
        $.ajax({
            url: getDomain() + url,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    ProductDetail.Clearvalue();
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.detailslist != undefined) {
                            $("#subcategoryname").val(JsonObject.serviceresponse.detailslist.details.category);
                            $("#headerdesignno").html(JsonObject.serviceresponse.detailslist.details.designno);

                            $("#breadsubcategoryname").html(JsonObject.serviceresponse.detailslist.details.subcategory);
                            $("#breadheaderdesignno").html(JsonObject.serviceresponse.detailslist.details.category);

                            if (JsonObject.serviceresponse.detailslist.details.oldprice == JsonObject.serviceresponse.detailslist.details.price) {
                                $("#actualprice").html(JsonObject.serviceresponse.detailslist.details.price.toLocaleString(getCurrencyLang(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                            }
                            else {
                                $("#oldprice").html(JsonObject.serviceresponse.detailslist.details.oldprice.toLocaleString(getCurrencyLang(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                                $("#actualprice").html(JsonObject.serviceresponse.detailslist.details.price.toLocaleString(getCurrencyLang(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                            }

                            $("#ratstardiv").css("width", JsonObject.serviceresponse.detailslist.details.rateingstar + "%");
                            ProductDetail.variables.SelectDcolor = JsonObject.serviceresponse.detailslist.details.maxdiamondcolour;
                            ProductDetail.variables.SelectDpurity = JsonObject.serviceresponse.detailslist.details.maxdiamondpurity;


                            if (ProductDetail.variables.SelectSize == "") {
                                ProductDetail.variables.SelectSize = JsonObject.serviceresponse.detailslist.details.psize;
                            }

                            //$("#productimagecontent").append($("#Dataproductdetail").render(JsonObject.serviceresponse.detailslist.details));
                            $("#topdatabind").append($("#Datatoplength").render(JsonObject.serviceresponse.detailslist.details));
                            $("#maintotalp").html(JsonObject.serviceresponse.detailslist.details.price.toLocaleString(getCurrencyLang(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                            $("#makincharges").append($("#Datamakincharges").render(JsonObject.serviceresponse.detailslist.details));
                            $("#pricebreakup").append($("#Datapricebreakup").render(JsonObject.serviceresponse.detailslist.details));
                            /*Price Breakup*/
                            $("#breakupgoldprice").html(parseFloat($("#breakupgoldprice").html()).toLocaleString(getCurrencyLang(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                            $("#prbreakmakeingchrg").html(parseFloat($("#prbreakmakeingchrg").html()).toLocaleString(getCurrencyLang(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                            $("#pricebreakupdiamondprice").html(parseFloat($("#pricebreakupdiamondprice").html()).toLocaleString(getCurrencyLang(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                            $("#pricebreakuptotalprice").html(parseFloat($("#pricebreakuptotalprice").html()).toLocaleString(getCurrencyLang(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));

                            /*Labour*/
                            $("#labour_makeing_rate").html(parseFloat($("#labour_makeing_rate").html()).toLocaleString(getCurrencyLang(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                            $("#labour_makeing_charges").html(parseFloat($("#labour_makeing_charges").html()).toLocaleString(getCurrencyLang(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));


                            if (JsonObject.serviceresponse.detailslist.details.iswish == "1") {
                                $("#toggle-heartdetail").prop("checked", true);
                            }
                            else {
                                $("#toggle-heartdetail").prop("checked", false);
                            }
                            if (JsonObject.serviceresponse.detailslist.details.iscart == "1") {
                                $("#addtocartdiv").hide();
                                $("#gotocartdiv").show();
                            }
                            else {
                                $("#addtocartdiv").show();
                                $("#gotocartdiv").hide();
                            }
                            //$("#wishlistcart").append($("#Datawishlistcart").render(JsonObject.serviceresponse.detailslist.details));
                            $(".rateyo").each(function () {
                                var id = $(this).attr('id');
                                var Rowid = id.split("rating");
                                var total = $("#star" + Rowid[1]).val();
                                $("#" + id).rateYo({
                                    readOnly: true,
                                    rating: total,
                                    numStars: 5,
                                    precision: 2,
                                    minValue: 1,
                                    maxValue: 5,
                                    starWidth: "20px",
                                    spacing: "3px",
                                    normalFill: "#A0A0A0",
                                    ratedFill: "#F39C12 ",
                                    halfStar: true
                                });
                            });

                        }
                        if (JsonObject.serviceresponse.detailslist.details.golddetail != undefined) {
                            $("#golddetails").append($("#Datagolddetails").render(JsonObject.serviceresponse.detailslist.details.golddetail.golden));
                            $("#goldprice").html(parseFloat($("#goldprice").html()).toLocaleString(getCurrencyLang(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                            $("#cur_gold_rate").html(parseFloat($("#cur_gold_rate").html()).toLocaleString(getCurrencyLang(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                            $("#netweight").html((JsonObject.serviceresponse.detailslist.details.golddetail.golden.goldweight) + " gm");
                            $("#headergoldpurity").html((JsonObject.serviceresponse.detailslist.details.golddetail.golden.goldpurity) + " " + (JsonObject.serviceresponse.detailslist.details.golddetail.golden.metaltype))
                            ProductDetail.variables.SelectGcolor = JsonObject.serviceresponse.detailslist.details.golddetail.golden.goldcolor;
                            ProductDetail.variables.SelectGpurity = JsonObject.serviceresponse.detailslist.details.golddetail.golden.goldpurity;
                        }
                        if (JsonObject.serviceresponse.detailslist.details.diamonddetail != undefined) {
                            $("#diamonddetails").append($("#Datadiamonddetails").render(JsonObject.serviceresponse.detailslist.details.diamonddetail.diamond));
                            //$("#diamondprice").html(parseFloat($("#diamondprice").html()).toLocaleString(getCurrencyLang(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                            ProductDetail.variables.setsomediamond = 0;
                            $(".diamondprice").each(function () {
                                var id = $(this).attr('id');
                                var Rowid = id.split("diamondprice");
                                var totalp = $("#ipr" + Rowid[1]).val();
                                if (totalp == "0") {
                                    ProductDetail.variables.setsomediamond = 1;
                                }
                                var convertint = parseFloat(totalp).toLocaleString(getCurrencyLang(), {
                                    style: 'currency', currency: getCurrencyCode(),
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                });
                                $("#" + id).html(convertint);
                            });

                        }
                        if (JsonObject.serviceresponse.detailslist.details.colorstonedetail != undefined) {
                            $("#colostonedetails").show();
                            $("#colorstonelable").show();
                            $("#colostonedetails").append($("#Datacolostonedetails").render(JsonObject.serviceresponse.detailslist.details.colorstonedetail.colorstone));
                            $("#colostonewight").html((JsonObject.serviceresponse.detailslist.details.colorstonedetail.colorstone.stoneweight) + " cts")
                            //$("#color_amount").html(parseFloat($("#color_amount").html()).toLocaleString(getCurrencyLang(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                            $(".color_amount").each(function () {
                                var id = $(this).attr('id');
                                var Rowid = id.split("color_amount");
                                var totalp = $("#color_amountipr" + Rowid[1]).val();
                                var convertint = parseFloat(totalp).toLocaleString(getCurrencyLang(), {
                                    style: 'currency', currency: getCurrencyCode(),
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                });
                                $("#" + id).html(convertint);
                            });
                        }
                        else {
                            $("#colostonedetails").hide();
                        }
                        if (JsonObject.serviceresponse.detailslist.details.imagelist != undefined && ($("#hideiscutomize").val() != "1" || (ProductDetail.variables.Personilizenotes == "1"))) {
                            $("#imagelistdetails_rose").html($("#Dataimagelistdetails_rose").render(JsonObject.serviceresponse.detailslist.details.imagelist.designimage));
                            $("#imagesecondlistdetails_rose").html($("#Dataimagesecondlistdetails_rose").render(JsonObject.serviceresponse.detailslist.details.imagelist.designimage));
                            $("#imagelistdetails_yellow").html($("#Dataimagelistdetails_yellow").render(JsonObject.serviceresponse.detailslist.details.imagelist.designimage));
                            $("#imagesecondlistdetails_yellow").html($("#Dataimagesecondlistdetails_yellow").render(JsonObject.serviceresponse.detailslist.details.imagelist.designimage));
                            $("#imagelistdetails_white").html($("#Dataimagelistdetails_white").render(JsonObject.serviceresponse.detailslist.details.imagelist.designimage));
                            $("#imagesecondlistdetails_white").html($("#Dataimagesecondlistdetails_white").render(JsonObject.serviceresponse.detailslist.details.imagelist.designimage));
                            ProductDetail.variables.Personilizenotes = "";
                        }

                        if (JsonObject.serviceresponse.stockdetailslist != undefined) {
                            $("#lireadyship").show();
                            $("#readymetaldiv").hide();
                            $("#readytoshipowlcrousel").append($("#Datareadytoship").render(JsonObject.serviceresponse.stockdetailslist.stockdetails));
                            //$("#readytoshipprice").html(parseFloat($("#readytoshipprice").html()).toLocaleString(getCurrencyLang(), { style: 'currency', currency: getCurrencyCode(), minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                            $('#readytoshipowlcrousel').owlCarousel('destroy');
                            $('#readytoshipowlcrousel').data('owlCarousel').reinit();
                            $('#readytoshipowlcrousel').owlCarousel({
                                items: 1,
                                autoplay: true,
                                pagination: false,
                                navigation: true,
                                navigationText: ["<i class='fal fa-chevron-circle-left owlprenext' style='display:block!important'></i>", "<i class='fal fa-chevron-circle-right owlprenext'></i>"]
                            });
                            $(".owl-item").addClass('width-100');
                            $(".owl-wrapper").addClass('width-100');

                        }
                        else {
                            $("#limetal").addClass("btn-color");
                            $("#lireadyship").hide();
                            $("#readymetaldiv").show();
                        }
                        if (JsonObject.serviceresponse.detailslist.details.designpairlist != undefined) {
                            $("#showhiderelated").show();
                            $("#related_product").append($("#Datarelated_product").render(JsonObject.serviceresponse.detailslist.details.designpairlist.designpairdetail));

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
                            //$("#related_product").owlCarousel({
                            //    slideSpeed: 500,
                            //    items: 4,
                            //    itemsDesktop: [1199, 4],
                            //    itemsDesktopSmall: [979, 3],
                            //    itemsTablet: [992, 3],
                            //    itemsMobile: [767, 2],
                            //    itemsMobileSmall: [480, 1],
                            //    autoWidth: true,
                            //    loop: true,
                            //    pagination: false,
                            //    navigation: true,
                            //    navigationText: [
                            //        "<i class='fa fa-caret-left'></i>",
                            //        "<i class='fa fa-caret-right'></i>"
                            //    ],
                            //    stopOnHover: true
                            //});
                        }
                        else {
                            $("#showhiderelated").hide();
                        }
                        //if ($("#hideiscutomize").val() == "1") {
                        //    Clearvalue();
                        //    $("#" + ProductDetail.variables.activediv).show();

                        //    $("#" + ProductDetail.variables.activetab).addClass("btn-color");
                        //}
                        //$("#atzoom").elevateZoom({
                        //    gallery: "additional-images",
                        //    galleryActiveClass: "active",
                        //    zoomWindowWidth: 620,
                        //    zoomWindowHeight: 515,

                        //});
                        if (ProductDetail.variables.setsomediamond == 1) {
                            $("#addtocartdiv").hide();
                            $("#gotocartdiv").hide();
                            $("#actualprice").hide();
                            $("#oldprice").hide();
                            $("#prineerrordiv").show();
                            $("#pricebreakuptotalprice").html('---');
                        }
                        else {
                            $("#actualprice").show();
                            $("#oldprice").show();
                            $("#prineerrordiv").hide();
                        }
                        $(".loadingtrinity").hide();
                    }
                    else {
                        $(".loadingtrinity").hide();
                        InvalidResponseCode(data);
                    }
                } catch (e) {
                    ErrorDetails(e, ProductDetail.variables.File);
                }
            },
            error: OnError
        });
    },
    Clearvalue: function () {
        $("#subcategoryname").val("");
        $("#headerdesignno").html("");
        $("#readytoshipowlcrousel").html("");
        $("#oldprice").html("");
        $("#actualprice").html("");
        $("#topdatabind").html("");
        $("#maintotalp").html("");
        $("#makincharges").html("");
        $("#pricebreakup").html("");
        $("#breakupgoldprice").html("");
        $("#prbreakmakeingchrg").html("");
        $("#pricebreakupdiamondprice").html("");
        $("#pricebreakuptotalprice").html("");
        $("#labour_makeing_rate").html("");
        $("#labour_makeing_charges").html("");
        $("#diamonddetails").html("");
        $("#diamondprice").html("");
        $("#colostonedetails").html("");
        $("#colostonewight").html("");
        $("#color_amount").html("");
        $("#related_product").html("");
        $("#golddetails").html("");
        $("#goldprice").html("");
        $("#cur_gold_rate").html("");
        $("#netweight").html("");
        $("#headergoldpurity").html("");
    },
    Bindcustomizedata: function () {
        var myfilter, url;
        myfilter = { rules: [] };
        myfilter.rules.push({ field: "CATEGORY", op: "eq", data: $("#subcategoryname").val() });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_CUSTOMIZE_MASTER_GET&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    $("#txtdiamoncolor").html("");
                    $("#txtgoldpurity").html("");
                    $("#txtdiamonclarity").html("");
                    $("#txtdesignsize").html("");
                    $("#txtgoldcolor").html("");
                    $("#cutomizesize").hide();

                    $("#goldcolorbind").html("");
                    $("#goldpuritybind").html("");
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        //if (JsonObject.serviceresponse.goldcolorktlist != undefined) {
                        //    $("#metalowlcrousel").append($("#Datagoldcolorpurity").render(JsonObject.serviceresponse.goldcolorktlist.gold));
                        //    $("#goldcolorputity" + ProductDetail.variables.SelectGpurity + "-" + ProductDetail.variables.SelectGcolor).addClass("selectedbackgnd");
                        //    $("#goldcolorputity" + ProductDetail.variables.SelectGpurity + "-" + ProductDetail.variables.SelectGcolor + " span i").addClass("selectedbackgnd");
                        //}
                        if (JsonObject.serviceresponse.goldcolorlist != undefined) {
                            $("#goldcolorbind").append($("#Datagoldcolor").render(JsonObject.serviceresponse.goldcolorlist.goldcolor));
                            $("#goldcolor" + ProductDetail.variables.SelectGcolor).addClass("selectcutomize");
                        }
                        if (JsonObject.serviceresponse.goldlist != undefined) {
                            $("#goldpuritybind").append($("#Datagoldpurity").render(JsonObject.serviceresponse.goldlist.gold));
                            $("#goldpurity" + ProductDetail.variables.SelectGpurity).prop("checked", true);
                        }

                        if (JsonObject.serviceresponse.diamondqualitylist != undefined) {
                            //$("#diamondowlcrousel").append($("#Datatxtdiamonclarity").render(JsonObject.serviceresponse.diamondqualitylist.diamondquality));
                            //$("#diamondpurity" + ProductDetail.variables.SelectDpurity).addClass("selectedbackgnd");
                            //$("#diamondpurity" + ProductDetail.variables.SelectDpurity + " span i").addClass("selectedbackgnd");
                            $("#diamondowlcrousel").append($("#Datatxtdiamonclarity").render(JsonObject.serviceresponse.diamondqualitylist.diamondquality));
                            $("#diamondpurity" + ProductDetail.variables.SelectDpurity).addClass("selectcutomize");

                        }
                        if (JsonObject.serviceresponse.jsizelist != undefined) {
                            $("#lisize").show();
                            $("#osizewlcrousel").append($("#Datatxtdesignsize").render(JsonObject.serviceresponse.jsizelist.jsize));
                            //$("#sizeval" + ProductDetail.variables.SelectSize).addClass("selectedbackgnd");
                            //$("#sizeval" + ProductDetail.variables.SelectSize + " span i").addClass("selectedbackgnd");
                            $("#osizewlcrousel").val(ProductDetail.variables.SelectSize);

                        }
                        else {
                            $("#lisize").hide();
                        }
                        $("#jewellerysize").html(ProductDetail.variables.SelectSize);
                        if (JsonObject.serviceresponse.diamondcolorlist != undefined) {
                            $("#diamondcolorowlcrousel").append($("#Datadiamondcolor").render(JsonObject.serviceresponse.diamondcolorlist.diamondcolor));
                            $("#diamondcolor" + ProductDetail.variables.SelectDcolor).addClass("selectcutomize");
                            //$("#diamondcolor" + ProductDetail.variables.SelectDcolor).addClass("selectedbackgnd");
                            //$("#diamondcolor" + ProductDetail.variables.SelectDcolor + " span i").addClass("selectedbackgnd");
                        }
                        $(".loadingtrinity").hide();
                    }
                    else {
                        $(".loadingtrinity").hide();
                        InvalidResponseCode(data);
                    }
                } catch (e) {
                    ErrorDetails(e, ProductDetail.variables.File);
                }
            },
            error: OnError
        });
    },
    ClickCustomize: function (type, val, id) {
        try {
            if (type == 'GoldColor') {
                $(".gcolorlable").removeClass("selectcutomize");
                $("#goldcolor" + val).addClass("selectcutomize");
                //if (ProductDetail.variables.CartColor != val) {

                //    ProductDetail.variables.Isgotocart = 0;
                //}
                //else {
                //    ProductDetail.variables.Isgotocart = 1;

                //}

                ProductDetail.variables.SelectGcolor = val;
                $("#hideiscutomize").val("1");
                ProductDetail.Bindproductdetaildata();
                if (ProductDetail.variables.setsomediamond == 0) {
                    $("#addtocartdiv").show();
                    $("#gotocartdiv").hide();
                }

                ProductDetail.HideShowImagesDiv(ProductDetail.variables.SelectGcolor);
            }
            else if (type == 'GoldPurity') {

                $("#goldpurity" + val).prop("checked", true);
                //if (ProductDetail.variables.Cartpurity != val) {

                //    ProductDetail.variables.Isgotocart = 0;
                //}
                //else {
                //    ProductDetail.variables.Isgotocart = 1;

                //}
                ProductDetail.variables.SelectGpurity = val;
                $("#hideiscutomize").val("1");
                ProductDetail.Bindproductdetaildata();
                if (ProductDetail.variables.setsomediamond == 0) {
                    $("#addtocartdiv").show();
                    $("#gotocartdiv").hide();
                }
            }
            else if (type == 'Diamondcolor') {
                $(".dcolorcss").removeClass("selectcutomize");
                $("#diamondcolor" + val).addClass("selectcutomize");
                //if (ProductDetail.variables.CartDcolor != val) {

                //    ProductDetail.variables.Isgotocart = 0;
                //}
                //else {
                //    ProductDetail.variables.Isgotocart = 1;

                //}

                ProductDetail.variables.SelectDcolor = val;
                $("#hideiscutomize").val("1");
                ProductDetail.Bindproductdetaildata();
                if (ProductDetail.variables.setsomediamond == 0) {
                    $("#addtocartdiv").show();
                    $("#gotocartdiv").hide();
                }
            }
            else if (type == 'Diamondpurity') {
                $(".dputitycss").removeClass("selectcutomize");
                $("#diamondpurity" + val).addClass("selectcutomize");
                //if (ProductDetail.variables.CartDcolor != val) {

                //    ProductDetail.variables.Isgotocart = 0;
                //}
                //else {
                //    ProductDetail.variables.Isgotocart = 1;

                //}
                ProductDetail.variables.SelectDpurity = val;
                ProductDetail.ChangePurityColorBind();
                $("#hideiscutomize").val("1");
                ProductDetail.Bindproductdetaildata();

            }
            else if (type == 'Size') {
                var val = $("#osizewlcrousel").val();
                //if (ProductDetail.variables.Cartsize != val) {
                //    ProductDetail.variables.Isgotocart = 0;
                //}
                ProductDetail.variables.SelectSize = val;
                $("#jewellerysize").html(val);
                $("#hideiscutomize").val("1");
            }
            if (ProductDetail.variables.setsomediamond == 0) {
                var string = $(".gcolorlable.selectcutomize").html() + '-' +
                             $("input[name='radio']:checked").val() + '-' +
                             $(".dcolorcss.selectcutomize").html() + '-' +
                             $(".dputitycss.selectcutomize").html() + '-' +
                             $("#jewellerysize").html();
                if (ProductDetail.variables.CartString == string) {
                    $("#addtocartdiv").hide();
                    $("#gotocartdiv").show();
                }
                else {
                    $("#addtocartdiv").show();
                    $("#gotocartdiv").hide();
                }
                //if (ProductDetail.variables.Isgotocart == 1) {
                //    $("#addtocartdiv").hide();
                //    $("#gotocartdiv").show();
                //}
                //else {
                //    $("#addtocartdiv").show();
                //    $("#gotocartdiv").hide();
                //}
            }

        } catch (e) {
            ErrorDetails(e, ProductDetail.variables.File);
        }
    },
    ChangePurityColorBind: function () {
        try {
            var myfilter, url;
            myfilter = { rules: [] };
            myfilter.rules.push({ field: "DIAMONDPURITY", op: "eq", data: ProductDetail.variables.SelectDpurity });
            $.ajax({
                url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_CUSTOMIZE_MASTER_GET&myfilters=" + JSON.stringify(myfilter),
                async: false,
                cache: false,
                type: 'POST',
                success: function (data) {
                    try {
                        $("#diamondcolorowlcrousel").html("");
                        $("#cutomizesize").hide();
                        if ($(data).find('RESPONSECODE').text() == "0") {
                            var JsonObject = xml2json.parser(data);
                            if (JsonObject.serviceresponse.diamondcolorlist != undefined) {
                                $("#diamondcolorowlcrousel").append($("#Datadiamondcolor").render(JsonObject.serviceresponse.diamondcolorlist.diamondcolor));
                                if ($("#diamondcolor" + ProductDetail.variables.SelectDcolor).length > 0) {
                                    $("#diamondcolor" + ProductDetail.variables.SelectDcolor).addClass("selectcutomize");
                                } else {
                                    $("#" + $("#diamondcolorowlcrousel lable:first").attr('id')).addClass("selectcutomize");
                                    ProductDetail.variables.SelectDcolor = $("#" + $("#diamondcolorowlcrousel lable:first").attr('id')).html();
                                }
                            }
                            $(".loadingtrinity").hide();
                        }
                        else {
                            $(".loadingtrinity").hide();
                            InvalidResponseCode(data);
                        }
                    } catch (e) {
                        ErrorDetails(e, ProductDetail.variables.File);
                    }
                },
                error: OnError
            });
        } catch (e) {
            ErrorDetails(e, ProductDetail.variables.File);
        }
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
                        $("#layoutlogin").hide();
                        $("#layoutfullnamediv").show();
                        CartWishlistCount();
                    }
                } catch (e) {
                    ErrorDetails(e, ProductDetail.variables.File);
                }
            },
            error: OnError,
        });
    },
    Bindcartlist: function () {
        var data;

        if ($("#hideiscutomizefromcartid").val() != "") {
            data = {
                "oper": "editItem",
                "ISCUSTOMIZE": $("#hideiscutomize").val() || 0,
                "DESIGNNO": $("#hidedesignno").val(),
                "QUANTITY": "1",
                "PERSONALIZEMSG": ProductDetail.variables.Personilizenotes,
                "SIZE": ProductDetail.variables.SelectSize,
                "WHERE_EQ_GOLDPURITY": ProductDetail.variables.SelectGpurity,
                "WHERE_EQ_GOLDCOLOR": ProductDetail.variables.SelectGcolor,
                "WHERE_EQ_DIAMONDCOLOR": ProductDetail.variables.SelectDcolor,
                "WHERE_EQ_DIAMONDPURITY": ProductDetail.variables.SelectDpurity,
                "CARTID": $("#hideiscutomizefromcartid").val(),
            }
        }
        else {
            data = {
                "oper": "add",
                "ISCUSTOMIZE": $("#hideiscutomize").val() || 0,
                "DESIGNNO": $("#hidedesignno").val(),
                "QUANTITY": "1",
                "PERSONALIZEMSG": ProductDetail.variables.Personilizenotes || "",
                "SIZE": ProductDetail.variables.SelectSize,
                "WHERE_EQ_GOLDPURITY": ProductDetail.variables.SelectGpurity,
                "WHERE_EQ_GOLDCOLOR": ProductDetail.variables.SelectGcolor,
                "WHERE_EQ_DIAMONDCOLOR": ProductDetail.variables.SelectDcolor,
                "WHERE_EQ_DIAMONDPURITY": ProductDetail.variables.SelectDpurity,
            }
        }
        ProductDetail.saveAddtocart(data);
    },
    saveAddtocart: function (data) {
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
                        ProductDetail.variables.CartString = ProductDetail.variables.SelectGcolor + '-' +
                                                            ProductDetail.variables.SelectGpurity + '-' +
                                                            ProductDetail.variables.SelectDcolor + '-' +
                                                            ProductDetail.variables.SelectDpurity + '-' +
                                                            ProductDetail.variables.SelectSize;
                        //ProductDetail.variables.CartDcolor = ProductDetail.variables.SelectDcolor;
                        //ProductDetail.variables.CartDpurity = ProductDetail.variables.SelectDpurity;
                        //ProductDetail.variables.Cartsize = ProductDetail.variables.SelectSize;
                        $("#addtocartdiv").hide();
                        $("#gotocartdiv").show();
                    }
                } catch (e) {
                    ErrorDetails(e, ProductDetail.variables.File);
                }
            },
            error: OnError,
        });
    },
    AutosuggestCitySearch: function () {
        try {
            $('#findcity').autocomplete({
                source: function (request, response) {
                    var url = getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_CITY_GET&_search=true&searchField=CITYNAME&searchOper=cn&searchString=" + request.term;
                    $.ajax({
                        url: url,
                        type: "POST",
                        async: false,
                        cache: false,
                        success: function (data) {
                            if ($(data).find('RESPONSECODE').text() == "0") {
                                var JsonObject = xml2json.parser(data);
                                if (JsonObject.serviceresponse.detailslist != undefined) {
                                    var List;
                                    if (JsonObject.serviceresponse.detailslist.details.length > 1)
                                        List = JsonObject.serviceresponse.detailslist.details;
                                    else
                                        List = JsonObject.serviceresponse.detailslist;

                                    response(
                                        $.map(List, function (item) {
                                            return {
                                                label: item.cityname,
                                                value: item.cityname,
                                                id: item.cityid,
                                            }
                                        }))
                                    $(".ui-menu-item-wrapper").css("text-transform", "capitalize");
                                }
                            }
                        }
                    })
                },
                messages: {
                    noResults: "No Results Found"
                },
                select: function (event, ui) {
                    ShowEastimatedate(ui.item.id);
                    $(".ui-menu-item-wrapper").css("text-transform", "capitalize");
                },
                change: function (event, ui) {
                    if (!ui.item) {
                    }
                },
                focus: function (event, ui) {
                    //  $("#txtdebitName").val('');

                },
                minLength: 1
            });
        } catch (e) {
            ErrorDetails(e, ProductDetail.variables.File);
        }
    },
    ReadutoshipCustomize: function (gp, gc, dp, dc, size) {
        try {


            ProductDetail.variables.SelectGcolor = gc;
            ProductDetail.variables.SelectGpurity = gp;
            ProductDetail.variables.SelectDpurity = dp;
            ProductDetail.variables.SelectDcolor = dc;
            ProductDetail.variables.SelectSize = size;
            $("#hideiscutomize").val("1");
            ProductDetail.Bindproductdetaildata();
            $(".gcolorlable").removeClass("selectcutomize");
            $("#goldcolor" + gc).addClass("selectcutomize");

            $("#goldpurity" + gp).prop("checked", true);

            $(".dputitycss").removeClass("selectcutomize");
            $("#diamondpurity" + dp).addClass("selectcutomize");

            $(".dcolorcss").removeClass("selectcutomize");
            $("#diamondcolor" + dc).addClass("selectcutomize");

            $("#jewellerysize").html(size);
            if (ProductDetail.variables.setsomediamond == 0) {
                var string = $(".gcolorlable.selectcutomize").html() + '-' +
                              $("input[name='radio']:checked").val() + '-' +
                              $(".dcolorcss.selectcutomize").html() + '-' +
                              $(".dputitycss.selectcutomize").html() + '-' +
                              $("#jewellerysize").html();
                if (ProductDetail.variables.CartString == string) {
                    $("#addtocartdiv").hide();
                    $("#gotocartdiv").show();
                }
                else {
                    $("#addtocartdiv").show();
                    $("#gotocartdiv").hide();
                }
            }
        } catch (e) {
            ErrorDetails(e, ProductDetail.variables.File);
        }
    },

    HideShowImagesDiv: function (color) {
        if (color == "ROSE") {
            $("#imagediv_rose").show();
            $("#imagediv_yellow").hide();
            $("#imagediv_white").hide();

            $("#zoom_rose").show();
            $("#zoom_yellow").hide();
            $("#zoom_white").hide();
        }
        else if (color == "WHITE") {
            $("#imagediv_rose").hide();
            $("#imagediv_yellow").hide();
            $("#imagediv_white").show();

            $("#zoom_rose").hide();
            $("#zoom_yellow").hide();
            $("#zoom_white").show();
        }
        else {
            $("#imagediv_rose").hide();
            $("#imagediv_yellow").show();
            $("#imagediv_white").hide();

            $("#zoom_rose").hide();
            $("#zoom_yellow").show();
            $("#zoom_white").hide();
        }

    }
}
function Showcartlist() {
    window.location.assign(getDomain() + "/Product/CartList");
}
function addtowishlist() {
    var login, design;
    if ($("#hiddenloginid").val() == undefined) {
        login = "";
    }
    else {
        login = $("#hiddenloginid").val();
    }
    if (Loginview.variable.IsLogin == "1" || login != "") {
        design = $("#headerdesignno").html();
        ProductDetail.Bindwishlist(design);
    }
    else {
        //$("#LoginModal").modal('show');
        //$("#LoginModal").addClass('show');
        //$("#LoginModal").css("background-color", "#00000059");
        //$("body").addClass("ovrf-y");
        $("#LoginModal").modal("show");
        $("#LoginModal").addClass("backcolorcancel");
    }
}
function addtocartlist() {
    var login;
    if ($("#hiddenloginid").val() == undefined) {
        login = "";
    }
    else {
        login = $("#hiddenloginid").val();
    }
    if (Loginview.variable.IsLogin == "1" || login != "") {
        ProductDetail.Bindcartlist();
    }
    else {
        //$("#LoginModal").modal('show');
        //$("#LoginModal").addClass('show');
        //$("#LoginModal").css("background-color", "#00000059");
        //$("body").addClass("ovrf-y");
        $("#LoginModal").modal("show");
        $("#LoginModal").addClass("backcolorcancel");
    }
}
function ShowEastimatedate(id) {
    var myfilter, url;
    myfilter = { rules: [] };
    myfilter.rules.push({ field: "DESIGNNO", op: "eq", data: $("#headerdesignno").html() });
    myfilter.rules.push({ field: "CITYID", op: "eq", data: id });

    url = "/Common/BindMastersDetails?ServiceName=B2C_NEARESTOUTLET_GET&myfilters=" + JSON.stringify(myfilter);
    $.ajax({
        url: getDomain() + url,
        async: false,
        cache: false,
        type: 'POST',
        success: function (data) {
            try {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.deliverydays != undefined) {
                        $("#expecteddivtime").show();
                        $("#deliveryday").html(JsonObject.serviceresponse.deliverydays.days);
                        $("#deliverydate").html(JsonObject.serviceresponse.deliverydays.date);
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            } catch (e) {
                ErrorDetails(e, ProductDetail.variables.File);
            }
        },
        error: OnError
    });
}
function imageadditionalouter(thiscal) {
    var smallImage = $(thiscal).attr('data-image');
    var largeImage = $(thiscal).attr('data-zoom-image');

    if (ProductDetail.variables.SelectGcolor == "ROSE") {
        var ez = $($("#imagediv_rose #atzoom")[0]).data('elevateZoom');
        $($("#imagediv_rose #atzoom")[0]).attr("data-zoom-image", largeImage);
        ez.swaptheimage(smallImage, largeImage);
        $('#imagediv_rose .thumbnails').magnificPopup('close', 1);
    }
    else if (ProductDetail.variables.SelectGcolor == "WHITE") {
        var ez = $($("#imagediv_white #atzoom")[0]).data('elevateZoom');
        $($("#imagediv_white #atzoom")[0]).attr("data-zoom-image", largeImage);
        ez.swaptheimage(smallImage, largeImage);
        $('#imagediv_white .thumbnails').magnificPopup('close', 1);
    }
    else {
        var ez = $($("#imagediv_yellow #atzoom")[0]).data('elevateZoom');
        $($("#imagediv_yellow #atzoom")[0]).attr("data-zoom-image", largeImage);
        ez.swaptheimage(smallImage, largeImage);
        $('#imagediv_yellow .thumbnails').magnificPopup('close', 1);
    }

    setTimeout(function () {
        if (ProductDetail.variables.SelectGcolor == "ROSE") {
            if ($("#imagelistdetails_rose .slick-active video").length > 0) {
                $("#zoom_rose").hide();
            }
            else {
                $("#zoom_rose").show();
            }
        }
        else if (ProductDetail.variables.SelectGcolor == "YELLOW") {
            if ($("#imagelistdetails_yellow .slick-active video").length > 0) {
                $("#zoom_yellow").hide();
            }
            else {
                $("#zoom_yellow").show();
            }
        }
        else {
            if ($("#imagelistdetails_white .slick-active video").length > 0) {
                $("#zoom_white").hide();
            }
            else {
                $("#zoom_white").show();
            }
        }
    }, 200);

    return false;
}
function Clearvalue() {
    //$("#readyshipdiv").hide();
    //$("#readymetaldiv").hide();
    //$("#readydiamonddiv").hide();
    //$("#readysizediv").hide();
    //$(".btncustome li").removeClass("btn-color");
    //$("#custumeul li a").css("color", "#b5b5b5");
}
function Productdetail(id) {
    window.open(getDomain() + "/Product/ProductDetail?id=" + id, '_blank');
}
$(document).ready(function () {
    try {
        ProductDetail.Bindproductdetaildata();
        ProductDetail.Bindcustomizedata();
        ProductDetail.ChangePurityColorBind();

        $($("#imagediv_rose #atzoom")[0]).elevateZoom({
            gallery: "additional-images",
            galleryActiveClass: "active",
            scrollZoom: true,
            zoomWindowWidth: 600,
            zoomWindowHeight: 405,
            id:"zoom_rose"
        });
        $($("#imagediv_yellow #atzoom")[0]).elevateZoom({
            gallery: "additional-images",
            galleryActiveClass: "active",
            scrollZoom: true,
            zoomWindowWidth: 600,
            zoomWindowHeight: 405,
            id: "zoom_yellow"
        });
        $($("#imagediv_white #atzoom")[0]).elevateZoom({
            gallery: "additional-images",
            galleryActiveClass: "active",
            scrollZoom: true,
            zoomWindowWidth: 600,
            zoomWindowHeight: 405,
            id: "zoom_white"
        });

        $(".zoomWindow").css("top", "-100px!important;")

        setTimeout(function () {
            ProductDetail.HideShowImagesDiv(ProductDetail.variables.SelectGcolor);
        }, 3000);


        //BindCityDropdown("findcity", "Ddlfindcity", "/Common/BindMastersDetails?ServiceName=B2C_CITY_GET", "select city");
        $("#btnloginmodalclose").click(function () {
            $("#toggle-heartdetail").prop("checked", false);
        });

        //$('#metalowlcrousel').owlCarousel({
        //    items: 4,
        //    autoplay: true,
        //    pagination: false,
        //    navigation: true,
        //    navigationText: ["<i class='fal fa-chevron-circle-left owlprenext'></i>", "<i class='fal fa-chevron-circle-right owlprenext'></i>"]
        //});
        //$('#diamondowlcrousel').owlCarousel({
        //    items: 4,
        //    autoplay: true,
        //    pagination: false,
        //    navigation: true,
        //    navigationText: ["<i class='fal fa-chevron-circle-left owlprenext'></i>", "<i class='fal fa-chevron-circle-right owlprenext'></i>"]
        //});
        //$('#diamondcolorowlcrousel').owlCarousel({
        //    items: 4,
        //    autoplay: true,
        //    pagination: false,
        //    navigation: true,
        //    navigationText: ["<i class='fal fa-chevron-circle-left owlprenext'></i>", "<i class='fal fa-chevron-circle-right owlprenext'></i>"]
        //});
        //$("#related_product").owlCarousel({
        //    slideSpeed: 500,
        //    items: 4,
        //    itemsDesktop: [1199, 4],
        //    itemsDesktopSmall: [979, 3],
        //    itemsTablet: [992, 3],
        //    itemsMobile: [767, 2],
        //    itemsMobileSmall: [480, 1],
        //    autoWidth: true,
        //    loop: true,
        //    pagination: false,
        //    navigation: true,
        //    navigationText: [
        //        "<i class='fa fa-caret-left'></i>",
        //        "<i class='fa fa-caret-right'></i>"
        //    ],
        //    stopOnHover: true
        //});
        //$('#osizewlcrousel').owlCarousel({
        //    items: 4,
        //    autoplay: true,
        //    pagination: false,
        //    navigation: true,
        //    navigationText: ["<i class='fal fa-chevron-circle-left owlprenext'></i>", "<i class='fal fa-chevron-circle-right owlprenext'></i>"]
        //});
        $("#lireadyship").hover(function () {
            //Clearvalue();
            $("#lireadyship").addClass("btn-color");
            $("#lireadyship a").css("color", "#fff");
            $("#readyshipdiv").show();
        });
        //$("#limetal").hover(function () {
        //    Clearvalue();
        //    $("#limetal").addClass("btn-color");
        //    $("#limetal a").css("color", "#fff");
        //    $("#readymetaldiv").show();
        //});
        //$("#lidiamond").hover(function () {
        //    Clearvalue();
        //    $("#lidiamond").addClass("btn-color");
        //    $("#lidiamond a").css("color", "#fff");
        //    $("#readydiamonddiv").show();
        //});
        //$("#lisize").hover(function () {
        //    Clearvalue();
        //    //$("#lisize").addClass("btn-color");
        //    $("#lisize a").css("color", "#fff");
        //    $("#readysizediv").show();
        //});

        $("#lbl_JewelletSize").attr("src", $("#Selected_CurrencyImg").attr("src"));

    }
    catch (e) {
        ErrorDetails(e, ProductDetail.variables.File);
    }
});