var Loginview = {
    variable: {
        username: '',
        userid: '0',
        File: 'Login.js',
        IsLogin: '',
    },
    validator: $("#registerformid").validate({
        errorPlacement: function (error, element) {
            if ($(element).attr('id') == 'txtfirstname') {
                error.insertAfter($("#txtfirstname"));
            }
            else if ($(element).attr('id') == 'txtlastname') {
                error.insertAfter($("#txtlastname"));
            }
            else if ($(element).attr('id') == 'txt_email') {
                error.insertAfter($("#txt_email"));
            }
            else if ($(element).attr('id') == 'txtmobile') {
                error.insertAfter($("#txtmobile"));
            }
            else if ($(element).attr('id') == 'txt_confrompassword') {
                error.insertAfter($("#txt_confrompassword"));
            }
            else if ($(element).attr('id') == 'txt_password') {
                error.insertAfter($("#txt_password"));
            }
            else if ($(element).attr('id') == 'txtloginusername') {
                error.insertAfter($("#txtloginusername"));
            }
            else if ($(element).attr('id') == 'txtloginpassword') {
                error.insertAfter($("#txtloginpassword"));
            }
            else if ($(element).attr('id') == 'signupfindcountry') {
                error.insertAfter($("#signupfindcountry").parent());
                $("#signupfindcountry-error").css("margin-top", "10px");
            }
            else if ($(element).attr('id') == 'signupfindstate') {
                error.insertAfter($("#signupfindstate").parent());
                $("#signupfindstate-error").css("margin-top", "10px");
            }
            else if ($(element).attr('id') == 'signupfindcity') {
                error.insertAfter($("#signupfindcity").parent());
                $("#signupfindcity-error").css("margin-top", "10px");
            }
            else {
                element.after(error); // default error placement
            }
        }
    }),
    validator1: $("#loginformid").validate({
        errorPlacement: function (error, element) {
            if ($(element).attr('id') == 'txtloginusername') {
                error.insertAfter($("#txtloginusername"));
            }
            else if ($(element).attr('id') == 'txtloginpassword') {
                error.insertAfter($("#txtloginpassword"));
            }
            else {
                element.after(error); // default error placement
            }
        }
    }),
    validator2: $("#enternewpassformid").validate({
        errorPlacement: function (error, element) {
            if ($(element).attr('id') == 'addnewpassword') {
                error.insertAfter($("#addnewpassword"));
            }
            else if ($(element).attr('id') == 'addnewconformpassword') {
                error.insertAfter($("#addnewconformpassword"));
            }
            else {
                element.after(error); // default error placement
            }
        }
    }),
    validator3: $("#registerforgotid").validate({
        errorPlacement: function (error, element) {
            if ($(element).attr('id') == 'forgotusername') {
                error.insertAfter($("#forgotusername"));
            }
            else {
                element.after(error); // default error placement
            }
        }
    }),
    Signupcountrychange: function () {
        try {
            var myfilter, url;
            myfilter = { rules: [] };
            myfilter.rules.push({ field: "CONTRYSTATECITY", op: "eq", data: 'State' });
            myfilter.rules.push({ field: "COUNTRYID", op: "eq", data: $("#signupfindcountry").val() });

            BindDropdown("signupfindstate", "Ddlsignupfindstate", "/Common/BindMastersDetails?ServiceName=APP_CONTRY_STATE_CITY_GET&myfilters=" + JSON.stringify(myfilter), "select state");
        } catch (e) {
            ErrorDetails(e, Loginview.variable.File);
        }
    },
    Signupstatechange: function () {
        try {
            var myfilter, url;
            myfilter = { rules: [] };
            myfilter.rules.push({ field: "CONTRYSTATECITY", op: "eq", data: 'City' });
            myfilter.rules.push({ field: "STATEID", op: "eq", data: $("#signupfindstate").val() });

            BindDropdown("signupfindcity", "Ddlsignupfindcity", "/Common/BindMastersDetails?ServiceName=APP_CONTRY_STATE_CITY_GET&myfilters=" + JSON.stringify(myfilter), "select city");
        } catch (e) {
            ErrorDetails(e, Loginview.variable.File);
        }
    },
    btnMasterSubmit: function () {
        var isValid = $("#registerformid").valid();
        if (!isValid)
            return;
        var data = {
            "oper": "add",
            "LOGINREQUIRD": "0",
            "FIRSTNAME": $("#txtfirstname").val(),
            "LASTNAME": $("#txtlastname").val(),
            "EMAILID": $("#txt_email").val(),
            "MOBILENO": $("#txtmobile").val(),
            "PASSWORD": $("#txt_password").val(),
            "BRITHDATE": $("#txtbirthdate").val(),
            "ANNIVERSARYDATE": $("#txtanniversary").val(),
            "CITY": $("#signupfindcity").val(),
            "STATE": $("#signupfindstate").val(),
            "COUNTRY": $("#signupfindcountry").val(),
            "GENDER": $("input[name='genderradio']:checked").val(),
        }
        Loginview.savedata(data);
    },
    savedata: function (data) {
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_CUSTOMERDETAILS_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: Loginview.btnMasterSubmitOnSuccess,
            error: OnError,
        });
    },
    btnMasterSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            //OperationMessage("", 'Your Registration was successful!', 'success');
            if ($(data).find('ACTION').text() == 'SocialMedia') {
                Loginview.SocialMedialLogin(data);
            }
            Loginview.ClearValues();
        }
        else if ($(data).find('RESPONSECODE').text() == "-11") {
            $(".loadingtrinity").hide();
            $("#errorexistemail").html($(data).find('RESPONSEMESSAGE').text());
            $("#errorexistemail").show();
            $("#errorexistmobile").hide();
        }
        else if ($(data).find('RESPONSECODE').text() == "-12") {
            $(".loadingtrinity").hide();
            $("#errorexistmobile").html($(data).find('RESPONSEMESSAGE').text());
            $("#errorexistmobile").show();
            $("#errorexistemail").hide();

        }
        else {
            InvalidResponseCode(data, Loginview.variable.File);
        }
    },
    SocialMedialLogin: function (data) {
        var username;
        if ($(data).find('EMAILID').text() == '') {
            username = $(data).find('MOBILENO').text();
        }
        else if ($(data).find('MOBILENO').text() == '') {
            username = $(data).find('EMAILID').text();
        }
        else {
            username = $(data).find('EMAILID').text();
        }
        $.ajax({
            url: getDomain() + "/Login/SocialMedia",
            data: {
                Customerid: $(data).find('CUSTOMERID').text(),
                Username: username,
                Securekey: $(data).find('SECUREKEY').text(),
                Fullname: $(data).find('DISPLAYNAME').text(),
                Emailid: $(data).find('EMAILID').text(),
                MobileNo: $(data).find('MOBILENO').text(),
                Gender: $(data).find('GENDER').text(),
                Activityid: $(data).find('ACTIVITYID').text(),
                Issociallogin: $(data).find('ISSOCIALLOGIN').text(),
            },
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    Loginview.AfterLoginProcess(data);
                } catch (e) {
                    ErrorDetails(e, Loginview.variable.File);
                }
            },
            error: OnError,
        });
    },
    ClearValues: function () {
        $("#registerformid").validate().resetForm();
        $(".brk-form-wrap").removeClass("brk-form-wrap-active");
        $("#radiomale").prop('checked', true);
        $("#errorexistemail").hide();
        $("#errorexistmobile").hide();
        $("#txtfirstname").val("");
        $("#txtlastname").val("");
        $("#txt_email").val("");
        $("#txtmobile").val("");
        $("#txt_confrompassword").val("");
        $("#txt_password").val("");
        $("#signupfindcity").val(""),
        $("#signupfindstate").val(""),
        $("#signupfindcountry").val(""),
        $(".loginmaincontainer").slideDown("slow");
        $(".registermaincontainer").slideUp("slow");
    },
    btnforgotSubmit: function (otp) {
        var isValid = $("#registerforgotid").valid();
        if (!isValid)
            return;
        Loginview.variable.username = $("#forgotusername").val();
        var data = {
            "USERNAME": Loginview.variable.username,
            "ACTION": "ForgetPassword"
        }
        Loginview.saveforgotdata(data);
    },
    saveforgotdata: function (data) {
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_SECURITY_USER_FORGOTPASSWORD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: Loginview.btnMasterforgotSubmitOnSuccess,
            error: OnError,
        });
    },
    btnMasterforgotSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            $("#errorusernotregister").hide();
            $("#errormsgforforgotpass").html("");
            $("#showforgotpassdiv").hide();
            $("#Otpvarificationdiv").show();
            Loginview.variable.userid = $(data).find('RESPONSECUSROMERID').text();
            $("#forgotusername").val("");
            $("#btnclickreset").attr("disabled", true);
            $("#btnclickreset").css("cursor", "no-drop");
            $("#timer").html("00:00");
            var now = new Date();
            timeup = now.setSeconds(now.getSeconds() + 300);
            counter = setInterval(timer, 1000);
            timer();
        }
        else if ($(data).find('RESPONSECODE').text() == "-1") {
            $("#errorusernotregister").show();
            $("#errormsgforforgotpass").html($(data).find('RESPONSEMESSAGE').text());
        }
    },
    btnresendSubmit: function () {
        var data = {
            "USERNAME": Loginview.variable.username,
            "ACTION": "ForgetPassword"
        }
        Loginview.saveforresendgotdata(data);
    },
    saveforresendgotdata: function (data) {
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_SECURITY_USER_FORGOTPASSWORD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: Loginview.btnMasterresendforgotSubmitOnSuccess,
            error: OnError,
        });
    },
    btnMasterresendforgotSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            $("#showforgotpassdiv").hide();
            $("#Otpvarificationdiv").show();
            Loginview.variable.userid = $(data).find('RESPONSECUSROMERID').text();
            $("#forgotusername").val("");
            $("#btnclickreset").attr("disabled", true);
            $("#btnclickreset").css("cursor", "no-drop");
            $("#timer").html("00:00");
            var now = new Date();
            timeup = now.setSeconds(now.getSeconds() + 300);
            counter = setInterval(timer, 1000);
            timer();
        }
    },
    verifyotpSubmit: function () {
        var data = {
            "USERNAME": Loginview.variable.username,
            "ACTION": "VerifyToken",
            "TOKEN": $("#partitioned").val()
        }
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_SECURITY_USER_FORGOTPASSWORD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: Loginview.btnMasterverifySubmitOnSuccess,
            error: OnError,
        });
    },
    btnMasterverifySubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            $("#errorotptxt").show("");
            $("#errorotptxt").html("");
            $("#Otpvarificationdiv").hide();
            $("#OldNewPassworddiv").show();
        }
        else {
            $("#errorotptxt").show();
            $("#errorotptxt").html($(data).find('RESPONSEMESSAGE').text());
        }
    },
    Enternewpassword: function () {
        var isValid = $("#enternewpassformid").valid();
        if (!isValid)
            return;

        var data = {
            "CUSTOMERID": Loginview.variable.userid,
            "PASSWORD": $("#addnewpassword").val(),
            "ACTION": "ResetPassword",
            "LOGINREQUIRD": "0",
        }
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_CUSTOMERDETAILS_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: Loginview.btnMasterloginSubmitOnSuccess,
            error: OnError,
        });

    },
    btnMasterloginSubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            $("#timer").html("00:00");
            $("#addnewpassword").val("");
            $("#addnewconformpassword").val("");
            $("#logindiv").show();
            $("#OldNewPassworddiv").hide();
        }
    },
    AutosuggestSearch: function () {
        try {
            var myfilter;
            myfilter = { rules: [] };
            myfilter.rules.push({ field: "SEARCHKEYWORDHISTORY", op: "eq", data: $('#mainsearchbox').val() });

            $('#mainsearchbox').autocomplete({
                source: function (request, response) {
                    var url = getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_SEARCHHISTORY_GET&myfilters=" + JSON.stringify(myfilter);
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
                                                label: item.searchname,
                                                value: item.searchname,

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
                    $(".ui-menu-item-wrapper").css("text-transform", "capitalize");
                    // $("#txtdebitName").val(ui.item.label);

                },
                change: function (event, ui) {
                    if (!ui.item) {
                        // $("#txtdebitName").val('');

                    }
                },
                focus: function (event, ui) {
                    //  $("#txtdebitName").val('');

                },
                minLength: 1
            });
        } catch (e) {
            ErrorDetails(e, Loginview.variable.File);
        }
    },
    Searchfocusout: function () {
        //$("#mainsearchbox").val("");
        if ($("#mainsearchbox").val() != "") {
            window.location.assign(getDomain() + "/Product/ProductList?category=" + $("#mainsearchbox").val() + "&type=search");
        }
    },
    AfterLoginProcess: function (data) {
        var array = data.split(':');
        if (array[1] == "error") {
            $(".loadingtrinity").hide();
            $("#errorlogindiv").show();
            $("#errormsg").html(array[0]);
        }
        else {
            $("#errorlogindiv").hide();
            $("#errormsg").html("");
            $("body").removeClass("ovrf-y");
            $("#LoginModal").css("background-color", "none");
            Loginview.variable.IsLogin = "1";
            $("#LoginModal").modal('hide');
            $(".loadingtrinity").hide();
            $("#btnloginmodalclose").click();
            CartWishlistCount();
            NotificationCount();

            $("#hiddenloginid").val(array[0]);
            $("#userfullnametxt").html(array[1]);

            if ($("#hiddenloginid").val() != "") {
                $("#layoutlogin").hide();
                $("#layoutfullnamediv").show();
            }
            else {
                $("#layoutlogin").show();
                $("#layoutfullnamediv").hide();
            }
            $("#txtloginusername").val("");
            $("#txtloginpassword").val("");
            $("#remeberchecked").prop("checked", false);
        }
    },
}
$(document).ready(function () {
    try {
        BindMenuList();
        CartWishlistCount();
        //NotificationCount();

        //Bindcarttopthreedata();
        Setusername();
        $("#divofnotifiy").hover(function () {
            NotificationCount();
        })
        $('#mainsearchbox').keypress(function (e) {
            var key = e.which;
            if (key == 13)  // the enter key code
            {
                Loginview.Searchfocusout();
            }
        });
        $("#layoutlogin").click(function () {
            $.ajax({
                url: getDomain() + "/Login/LoginDetails",
                async: true,
                cache: false,
                type: 'POST',
                success: function (data) {
                    try {
                        if (data != null) {
                            var array = data.split(',');
                            $("#txtloginusername").val(array[0]);
                            $("#txtloginpassword").val(array[1]);
                            if (array[2] == "True") {
                                $("#remeberchecked").prop("checked", true);
                            }
                            else {
                                $("#remeberchecked").prop("checked", false);
                            }
                            $("#LoginModal").modal("show");
                            $("#LoginModal").addClass("backcolorcancel");
                        }
                    } catch (e) {
                        ErrorDetails(e, Loginview.variable.File);
                    }
                },
                error: OnError,
            });

        })
        $('#txtbirthdate').datepicker({ format: 'dd M yyyy' });
        $('#txtbirthdate').on('change', function () {
            $('.datepicker').hide();
        });
        $('#txtanniversary').datepicker({ format: 'dd M yyyy' });
        $('#txtanniversary').on('change', function () {
            $('.datepicker').hide();
        });
        $('#txtmobile').keypress(function (event) {
            return numbersOnlytype(this, event, false, false);
        });
        $("#btnredister").click(function () {
            $("#registerformid").validate().resetForm();
            $(".registermaincontainer").slideDown("slow");
            $(".loginmaincontainer").slideUp("slow");
            var myfilter, url;
            myfilter = { rules: [] };
            myfilter.rules.push({ field: "CONTRYSTATECITY", op: "eq", data: 'Country' });
            BindDropdown("signupfindcountry", "Ddlsignupfindcountry", "/Common/BindMastersDetails?ServiceName=APP_CONTRY_STATE_CITY_GET&myfilters=" + JSON.stringify(myfilter), "select country");
            $(".jq-selectbox select").css("opacity", "1");
        });
        $("#btnlogin").click(function () {
            $(".loginmaincontainer").slideDown("slow");
            $(".registermaincontainer").slideUp("slow");
        });
        $('#partitioned').keypress(function (event) {
            return numbersOnlytype(this, event, false, false);
        });
        $("#btnclicksignup").click(function () {
            try {
                Loginview.btnMasterSubmit();
            } catch (e) {
                ErrorDetails(e, Loginview.variable.File);
            }
        });
        $("#btnloginmodalclose").click(function () {
            $("body").removeClass("ovrf-y");
        });
        $("#gmailsignin-button").on('click', function () {
            gapi.auth2.getAuthInstance().signIn().then(
		       function (success) {
		           makeApiCall();
		       },
		       function (error) {
		           OperationMessage('', 'Please Clear browser cache and open new tab', 'warning');
		       }
	        );

        });
    } catch (e) {
        ErrorDetails(e, Loginview.variable.File);
    }
});
function Setusername() {
    try {
        $.ajax({
            url: getDomain() + "/Login/SetUsename",
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    if (data != null) {
                        var array = data.split(':');
                        var array = data.split(':');
                        $("#hiddenloginid").val(array[0]);
                        $("#userfullnametxt").html(array[1]);

                        if ($("#hiddenloginid").val() != "") {
                            $("#layoutlogin").hide();
                            $("#layoutfullnamediv").show();
                        }
                        else {
                            $("#layoutlogin").show();
                            $("#layoutfullnamediv").hide();
                        }
                    }
                } catch (e) {
                    ErrorDetails(e, Loginview.variable.File);
                }
            },
            error: OnError,
        });
    } catch (e) {
        ErrorDetails(e, Loginview.variable.File);
    }
}
function BindMenuList() {
    try {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_MENULIST",
            async: false,
            cache: false,
            success: function (data) {
                try {
                  
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        $("#Menulistul").html("");
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.menulist != undefined) {
                            var container = '';
                            if (JsonObject.serviceresponse.menulist != undefined) {
                                container += "<ul class='brk-nav__menu'>";
                                $.each(JsonObject.serviceresponse.menulist.menudetail, function (key, innerjsonDetails) {
                                    var cnt = 1;
                                    container += "<li class='brk-nav__children brk-nav__full-width brk-nav__drop-down-effect'>" +
                                      "<a href = \"javascript: void(0)\" class='clearfix'><span>" + innerjsonDetails.mainmenuname + "</span></a>";

                                    container += "<div class='brk-nav__mega-menu brk-nav-drop-down' style='left:250px;right:250px;'>" +
                                              "<div class='bg-white'>" +
                                              "<div class='row no-gutters'>";
                                    for (var i = 0; i < innerjsonDetails.details.length; i++) {
                                        if (cnt == 1) {
                                            if (innerjsonDetails.mainmenuname != "COLLECTIONS")
                                                container += "<div class='col-xl-3 col-md-3 col-6'><div class='brk-header_border-right pb-60 pt-20'>";
                                            else
                                                container += "<div class='col-lg-6 col-md-6 col-6 padd'><div class='mt-30 text-center divcollection'>";
                                        }

                                        if (innerjsonDetails.mainmenuname != "COLLECTIONS") {
                                            container += "<ul class='brk-header-list font__family-montserrat'>" +
                                                   "<li class='dd-effect'>" +
                                                   "<a href = \"javascript:void(0)\" class=\"fw-6 txttr-cap\" onclick=\"ClickOnCategory('" + innerjsonDetails.details[i].categoryname + "')\">" +
                                                    "<span class='brk-header-list__icon'>" +
                                                    "<img src=\"" + innerjsonDetails.details[i].categoryimage + "\" />" +
                                                   "</span>" + innerjsonDetails.details[i].categoryname + "</a>";
                                        }
                                        else {
                                            container += "<input type='hidden' value='" + innerjsonDetails.details[i].subcategoryname + "' id='inputcollectionsub" + innerjsonDetails.details[i].woman_collection_id + "'/>" +
                                                  "<input type='hidden' value='" + innerjsonDetails.details[i].collectionkeyword + "' id='inputcollectionkeyword" + innerjsonDetails.details[i].woman_collection_id + "'/>" +
                                                  "<input type='hidden' value='" + innerjsonDetails.details[i].designcode + "' id='inputcollectiondesign" + innerjsonDetails.details[i].woman_collection_id + "'/>" +
                                                  //"<a href = 'javascript: void(0)' class='main-menu capitalize'>" + catogarynode["CATEGORYNAME"].InnerText.ToLower() + "</a>");
                                                  "<div class='link'>" +
                                                  "<a href=\"javascript:void(0)\" onclick=\"ClickOnCollection('" + innerjsonDetails.details[i].woman_collection_id + "')\"> " +
                                                  "<img class='lazyload mb-10' src=\"" + innerjsonDetails.details[i].categoryimage + "\" alt=\"" + innerjsonDetails.details[i].categoryname + "\" style=\"width:100%;\">" +
                                                  "</a>" +
                                                  "</div>";

                                        }
                                        if (innerjsonDetails.mainmenuname != "COLLECTIONS") {
                                            var unlenght;
                                            if (innerjsonDetails.details[i].subcategorylist.subcategory.length == undefined) {
                                                unlenght = 1;
                                            } else {
                                                unlenght = innerjsonDetails.details[i].subcategorylist.subcategory.length;
                                            }
                                            container += "<ul class='subcateul'>";
                                            for (var j = 0 ; j < unlenght ; j++) {
                                                if (innerjsonDetails.details[i].subcategorylist.subcategory.length == undefined) {
                                                    container +=
                                                    "<li class='menueffect'>" +
                                                    "<a href=\"javascript:void(0)\" onclick=\"SubCategoryClick('" + innerjsonDetails.details[i].subcategorylist.subcategory.subcategoryname + "')\" class=\"capitalize subcategory txttr-cap\">" + innerjsonDetails.details[i].subcategorylist.subcategory.subcategoryname + "</a>" +
                                                     "</li>";
                                                } else {
                                                    container +=
                                                    "<li class='menueffect'>" +
                                                    "<a href=\"javascript:void(0)\" onclick=\"SubCategoryClick('" + innerjsonDetails.details[i].subcategorylist.subcategory[j].subcategoryname + "')\" class=\"capitalize subcategory txttr-cap\">" + innerjsonDetails.details[i].subcategorylist.subcategory[j].subcategoryname + "</a>" +
                                                     "</li>";
                                                }

                                            }

                                            container += "</ul>";
                                            container += "</li></ul>";
                                        }


                                        if (cnt == 3) {
                                            container += "</div></div>";
                                            cnt = 1;
                                        }
                                        else {
                                            cnt++;
                                        }
                                        if (cnt == (innerjsonDetails.details.length) - 1) {
                                            container += "</div></div>";
                                            cnt = 1;
                                        }
                                    }

                                    container += "</div></div></div>";
                                });
                                container += "</li>";
                                container += "<li class=\"brk-nav__full-width\"><a href='/Home/AboutUs' class=\"clearfix\"><span>ABOUT US</span></a></li>";
                                container += "<li class=\"brk-nav__full-width\"><a href='/Home/StoreLocator' class=\"clearfix\"><span>STORE LOCATOR</span></a></li>";
                                container += "</ul>";
                            }

                            $("#Menulistul").append(container);
                        }
                    }
                } catch (e) {
                    ErrorDetails(e, Loginview.variable.File);
                }
            },
            error: OnError
        });
    } catch (e) {
        ErrorDetails(e, Loginview.variable.File);
    }
}
function ClickOnCategory(category) {
    try {
        $.ajax({
            url: getDomain() + '/Login/ClearFilter',
            async: true,
            cache: false,
            success: function (data) {
                if (data = "success") {
                    window.location.assign(getDomain() + "/Product/ProductList?category=" + category + "&type=category");
                }
            },
            error: OnError
        });

    } catch (e) {
        ErrorDetails(e, Loginview.variable.File);
    }
}
function SubCategoryClick(subcategory) {
    try {
        $.ajax({
            url: getDomain() + '/Login/ClearFilter',
            async: true,
            cache: false,
            success: function (data) {
                try {
                    if (data = "success") {
                        window.location.assign(getDomain() + "/Product/ProductList?category=" + subcategory + "&type=subcategory");
                    }
                } catch (e) {
                    ErrorDetails(e, Loginview.variable.File);
                }
            },
            error: OnError
        });
        //$.ajax({
        //    url: getDomain() + '/Product/ClearFilter',
        //    async: true,
        //    cache: false,
        //    success: function (data) {
        //        if (data = "success") {
        //            window.location.assign(getDomain() + "/Product/ProductList?category=" + subcategory + "&type=subcategory");
        //        }
        //    },
        //    error: OnError
        //});

    } catch (e) {
        ErrorDetails(e, Loginview.variable.File);
    }
}
function ClickOnCollection(id) {
    try {
        $.ajax({
            url: getDomain() + '/Login/ClearFilter',
            async: true,
            cache: false,
            success: function (data) {
                if (data = "success") {
                    var collectionkeyword, collectionsubcategory, designrange;
                    collectionkeyword = $("#inputcollectionkeyword" + id).val();
                    collectionsubcategory = $("#inputcollectionsub" + id).val().slice(0, -1);
                    designrange = $("#inputcollectiondesign" + id).val();
                    window.location.assign(getDomain() + "/Product/ProductList?category=" + collectionsubcategory + "&type=collection&searchkeyword=" + collectionkeyword + "&designno=" + designrange);
                }
            },
            error: OnError
        });

    } catch (e) {
        ErrorDetails(e, Loginview.variable.File);
    }
}
function timer() {
    now = new Date();
    count = Math.round((timeup - now) / 1000);
    if (now > timeup) {
        $("#btnclickreset").attr("disabled", false);
        $("#btnclickreset").css("cursor", "pointer");
        clearInterval(counter);
        $("#timer").html("00:00");
        return;
    }
    var seconds = Math.floor((count % 60));
    if (seconds == "0") {
        var sec = seconds + "0";
    }
    else {
        var sec = seconds;
    }
    var minutes = Math.floor((count / 60) % 60);
    $("#timer").html("0" + minutes + ":" + sec);
}
function lostpassword() {
    $("#showforgotpassdiv").show();
    $("#logindiv").hide();
}
function BtnResendOtp() {
    try {
        Loginview.btnresendSubmit();
    } catch (e) {
        ErrorDetails(e, Loginview.variable.File);
    }
}
function Nextbtnresetpass() {
    try {
        Loginview.btnforgotSubmit();
    } catch (e) {
        ErrorDetails(e, Loginview.variable.File);
    }
}
function BtnVerifyOtp() {
    try {
        Loginview.verifyotpSubmit();
    } catch (e) {
        ErrorDetails(e, Loginview.variable.File);
    }
}
function SubmitNewPassword() {
    try {
        Loginview.Enternewpassword();
    } catch (e) {
        ErrorDetails(e, Loginview.variable.File);
    }
}
function BtnDoLogin() {
    var isValid = $("#loginformid").valid();
    if (!isValid)
        return;

    var username, password, remember, Ischecked
    if ($('#remeberchecked').is(':checked') == false) {
        Ischecked = false;
    }
    else {
        Ischecked = true;
    }
    username = $("#txtloginusername").val();
    password = $("#txtloginpassword").val();
    $.ajax({
        url: getDomain() + "/Login/DoLogin",
        data: {
            Usename: username,
            Password: password,
            Remember: Ischecked,
        },
        async: true,
        cache: false,
        type: 'POST',
        success: function (data) {
            try {
                if (data != null) {
                    Loginview.AfterLoginProcess(data);

                }
            } catch (e) {
                ErrorDetails(e, Loginview.variable.File);
            }
        },
        error: OnError,
    });
}
function CartWishlistCount() {
    try {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_CART_WISH_COUNT_GET",
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        $("#cart-total").html($(data).find('CARTCOUNT').text());
                        $("#wishlist-total").html($(data).find('WISHLISTCOUNT').text());
                        $("#notification-total").html($(data).find('NOTIFICATIONCOUNT').text());
                        $("#wishlistmorecount").html("(" + $("#wishlist-total").html() + ")");
                        Bindcarttopthreedata();
                    }
                } catch (e) {
                    ErrorDetails(e, Loginview.variable.File);
                }
            },
            error: OnError,
        });
    } catch (e) {
        ErrorDetails(e, Loginview.variable.File);
    }
}
function Bindcarttopthreedata() {
    $.ajax({
        url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_CART_GET&rows=3&page=1",
        data: "",
        async: true,
        cache: false,
        type: 'POST',
        success: function (data) {
            if ($(data).find('RESPONSECODE').text() == "0") {
                $("#datatopthreecart").html("");
                var JsonObject = xml2json.parser(data);
                if (JsonObject.serviceresponse.detailslist != undefined) {
                    $("#btncartprocessdiv").show();
                    $("#datatopthreecart").append($("#bindtopthreecart").render(JsonObject.serviceresponse.detailslist.details));
                    $(".designtopprice").each(function () {
                        var id = $(this).attr('id');
                        var Rowid = id.split("designtopprice");
                        var totalp = $("#iprreltop" + Rowid[1]).val();
                        var convertint = parseFloat(totalp).toLocaleString(getCurrencyLang(), {
                            style: 'currency', currency: getCurrencyCode(),
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        });
                        $("#" + id).html(convertint);
                    });
                    $(".designpricedistop").each(function () {
                        var id1 = $(this).attr('id');
                        var Rowid1 = id1.split("designpricedistop");
                        var totalp1 = $("#disiprreltop" + Rowid1[1]).val();
                        var convertint1 = parseFloat(totalp1).toLocaleString(getCurrencyLang(), {
                            style: 'currency', currency: getCurrencyCode(),
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        });
                        $("#" + id1).html(convertint1);
                    });
                }
                else {
                    $("#btncartprocessdiv").hide();
                    $("#datatopthreecart").html("Your Cart Is Empty!!!");
                    $("#datatopthreecart").css("text-align", "center");
                    $("#datatopthreecart").css("padding", "16px");
                }


            }
            else {

                $("#defalutcartloader").hide();
                InvalidResponseCode(data);
            }
        },
        error: OnError,
    });
}
function topIncreasequantity(id) {
    try {
        $("#topquantitytotal" + id).html(parseFloat($("#topquantitytotal" + id).html()) + 1);
        Quantityvalue(id);
    } catch (e) {
        ErrorDetails(e, Loginview.variable.File);
    }
}
function topDecreasequantity(id) {
    try {
        if ($("#topquantitytotal" + id).html() > 1) {
            $("#topquantitytotal" + id).html(parseFloat($("#topquantitytotal" + id).html()) - 1);
            Quantityvalue(id);
        }
    } catch (e) {
        ErrorDetails(e, Loginview.variable.File);
    }
}
function Openwishlist() {
    try {
        var login, design;
        if ($("#hiddenloginid").val() == undefined) {
            login = "";
        }
        else {
            login = $("#hiddenloginid").val();
        }
        if (Loginview.variable.IsLogin == "1" || login != "") {
            window.location.assign(getDomain() + "/Product/WishList");
        }
        else {
            //$("#LoginModal").modal('show');
            //$("#LoginModal").addClass('show');
            //$("#LoginModal").css("background-color", "#00000059");
            //$("body").addClass("ovrf-y");
            $("#LoginModal").modal("show");
            $("#LoginModal").addClass("backcolorcancel");
        }
    } catch (e) {
        ErrorDetails(e, Loginview.variable.File);
    }
}
function Quantityvalue(id) {
    try {
        var data = {
            "oper": "edit",
            "CARTID": id,
            "QUANTITY": $("#topquantitytotal" + id).html(),
        }
        Cartcrud(data);
    } catch (e) {
        ErrorDetails(e, Loginview.variable.File);
    }
}
function Cartcrud(data) {
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
                }
                else {
                    InvalidResponseCode(data);
                }
            } catch (e) {
                ErrorDetails(e, Loginview.variable.File);
            }
        },
        error: OnError,
    });
}
function Deletecartlist(cartid) {
    try {
        var movewish = "";
        var data = {
            "oper": "delete",
            "CARTID": cartid,
            "WHERE_EQ_DELETETYPE": movewish,
        }
        Cartcrud(data);
    } catch (e) {
        ErrorDetails(e, Loginview.variable.File);
    }
}
var socialmediavar = {
    variables: {
        loginauthid: '',
        loginplatform: '',
        fullname: '',
        fname: '',
        lname: '',
        email: '',
        gender: '',
        dateofbirth: '',
        hometown: '',
        location: '',
        imageurl: '',
    },
}
function fb_login() {
    try {
        FB.login(function (response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                console.log(response); // dump complete info
                access_token = response.authResponse.accessToken; //get access token
                user_id = response.authResponse.userID; //get FB UID

                FB.api('/me', 'GET', { "fields": "id,name,birthday,context,email,cover,picture{height,url,width},first_name,last_name,gender,location,hometown" },
                   function (response) {
                       socialmediavar.variables.loginauthid = response.id;
                       socialmediavar.variables.loginplatform = "Facebook";
                       socialmediavar.variables.fullname = response.name;
                       socialmediavar.variables.fname = response.first_name;
                       socialmediavar.variables.lname = response.last_name;
                       socialmediavar.variables.email = response.email;
                       if (response.gender == "male") {
                           socialmediavar.variables.gender = 1;
                       }
                       else if (response.gender == "female") {
                           socialmediavar.variables.gender = 2;
                       }
                       else {
                           socialmediavar.variables.gender = "";
                       }
                       if (response.birthday == undefined) {
                           socialmediavar.variables.dateofbirth = "";
                       }
                       else {
                           socialmediavar.variables.dateofbirth = response.birthday;
                       }
                       var guid
                       guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();

                       FB.api('/me/picture?type=large', function (response) {
                           socialmediavar.variables.imageurl = response.data.url;
                           var data = {
                               "ACTION": "SocialMedia",
                               "LOGINAUTHID": socialmediavar.variables.loginauthid,
                               "FIRSTNAME": socialmediavar.variables.fname,
                               "LASTNAME": socialmediavar.variables.lname,
                               "EMAILID": socialmediavar.variables.email,
                               "BRITHDATE": socialmediavar.variables.dateofbirth,
                               "LOGINPLATFORM": socialmediavar.variables.loginplatform,
                               "GENDER": socialmediavar.variables.gender,
                               "ACTIVITYID": guid
                           }
                           Loginview.savedata(data);
                       });
                   }
                 );
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {
            scope: 'public_profile,email'
        });
    } catch (e) {
        ErrorDetails(e, Loginview.variable.File);
    }
}
(function () {
    var e = document.createElement('script');
    e.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.11&appId=451762468600038';
    e.async = true;
    document.getElementById('fb-root').appendChild(e);
}());

/*=========Login With Google+=========================================================*/
var clientId = '21690037518-1n8d3bvd3plap5944s2j4rsc1k7psi1i.apps.googleusercontent.com';
var apiKey = 'AIzaSyBzAFS608AZWIdndq1Fe0pfStsoJH96rzo';

//var clientId = '951153446092-jgsnomrf96qacr0g8p8s7ljmk7p849bb.apps.googleusercontent.com';
//var apiKey = 'AIzaSyDdtOtss2I7ki87ppLInqErtL0UGNV5QCE';
var scopes = 'profile email';
//https://www.googleapis.com/auth/drive.readonly
//var signoutButton = document.getElementById('signout-button');
function handleClientLoad() {
    try {
        gapi.load('client:auth2', initAuth);
    } catch (e) {
        ErrorDetails(e, Loginview.variable.File);
    }
}
function isMobile() {
    try {
        if (sessionStorage.desktop) // desktop storage 
            return false;
        else if (localStorage.mobile) // mobile storage
            return true;

        // alternative
        mobile = ['iphone', 'ipad', 'android', 'blackberry', 'nokia', 'opera mini', 'windows mobile', 'windows phone', 'iemobile'];
        for (var i in mobile) if (navigator.userAgent.toLowerCase().indexOf(mobile[i].toLowerCase()) > 0) return true;

        return false;
    } catch (e) {
        ErrorDetails(e, Loginview.variable.File);
    }
}

var IsMobileDevice;
function initAuth() {
    try {
        //  gapi.client.setApiKey(apiKey);
        gapi.client.init({
            apiKey: apiKey,
            clientId: clientId,
            scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/plus.me'
        });
    } catch (e) {
        ErrorDetails(e, Loginview.variable.File);
    }

}
function makeApiCall() {
    $(".loadingtrinity").show();
    try {
        gapi.client.load('people', 'v1', function () {
            var request = gapi.client.people.people.get({
                resourceName: 'people/me', 'requestMask.includeField': 'person.names,person.photos,person.email_addresses,person.birthdays,person.genders,person.metadata',
                //requestMask:{'includeField':'person.email_addresses'},
            });
            request.execute(function (resp) {
                try {
                    socialmediavar.variables.loginauthid = resp.metadata.sources[0].id;
                    socialmediavar.variables.fullname = resp.names[0].displayName;
                    socialmediavar.variables.fname = resp.names[0].givenName;
                    socialmediavar.variables.lname = resp.names[0].familyName;
                    socialmediavar.variables.email = resp.emailAddresses[0].value;
                    socialmediavar.variables.imageurl = resp.photos[0].url;
                    if (resp.genders) {
                        socialmediavar.variables.gender = resp.genders[0].formattedValue;
                    }
                    socialmediavar.variables.dateofbirth = "";
                    socialmediavar.variables.hometown = "";
                    socialmediavar.variables.location = "";
                    socialmediavar.variables.loginplatform = "Google";


                    var guid
                    guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();

                    var data = {
                        "ACTION": "SocialMedia",
                        "LOGINAUTHID": socialmediavar.variables.loginauthid,
                        "FIRSTNAME": socialmediavar.variables.fname,
                        "LASTNAME": socialmediavar.variables.lname,
                        "EMAILID": socialmediavar.variables.email,
                        "BRITHDATE": socialmediavar.variables.dateofbirth,
                        "LOGINPLATFORM": socialmediavar.variables.loginplatform,
                        "GENDER": socialmediavar.variables.gender,
                        "ACTIVITYID": guid
                    }
                    Loginview.savedata(data);
                } catch (e) {
                    $(".loadingtrinity").hide();
                    ErrorDetails(e, Loginview.variable.File);
                }
            });
        });
    } catch (e) {
        $(".loadingtrinity").hide();
        ErrorDetails(e, Loginview.variable.File);
    }
}
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function NotificationCount() {
    try {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_NOTIFICATION_GET&page=1&rows=5&sord=desc&sidx=NOTIFICATIONID",
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    $("#datanotificationhere").html("");
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.totalrecords > 0) {

                            if (JsonObject.serviceresponse.detailslist != undefined) {
                                $("#datanotificationhere").append($("#Binddatanotificationhere").render(JsonObject.serviceresponse.detailslist.details));
                                $("#hiddennoti_row_no").val("2");
                                CartWishlistCount();
                                NotificationCountCrud()
                            }
                            else {
                                $("#btnviewmorenotificationdiv").hide();
                                $("#datanotificationhere").html("Your Notification Is Empty!!!");
                                $("#datanotificationhere").css("text-align", "center");
                                $("#datanotificationhere").css("padding", "16px");
                            }
                        }
                        if (JsonObject.serviceresponse.totalrecords > 5) {
                            $("#btnviewmorenotificationdiv").show();
                        }
                        else {
                            $("#btnviewmorenotificationdiv").hide();
                        }
                        $(".loadingtrinity").hide();
                    }
                    else {
                        $(".loadingtrinity").hide();
                        InvalidResponseCode(data);
                    }
                } catch (e) {
                    ErrorDetails(e, Loginview.variable.File);
                }
            },
            error: OnError,
        });
    } catch (e) {
        ErrorDetails(e, Loginview.variable.File);
    }
}
function NotificationCountCrud() {
    try {
        var data = {
            "ACTION": "ViewNotification"
        }
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_NOTIFICATION_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            error: OnError,
        });
    } catch (e) {
        ErrorDetails(e, Loginview.variable.File);
    }
}
function Viewmorenotification() {
    try {
        var val = $("#hiddennoti_row_no").val();
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_NOTIFICATION_GET&page=" + val + "&rows=5&sord=desc&sidx=NOTIFICATIONID",
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.totalrecords > 0) {

                            if (JsonObject.serviceresponse.detailslist != undefined) {
                                $("#datanotificationhere").append($("#Binddatanotificationhere").render(JsonObject.serviceresponse.detailslist.details));
                                $("#hiddennoti_row_no").val(Number(val) + 1);
                            }
                            else {
                                $("#btnviewmorenotificationdiv").hide();
                                $("#datanotificationhere").html("Your Notification Is Empty!!!");
                                $("#datanotificationhere").css("text-align", "center");
                                $("#datanotificationhere").css("padding", "16px");
                            }
                        }
                        if (JsonObject.serviceresponse.totalrecords > 5) {
                            $("#btnviewmorenotificationdiv").show();
                        }
                        else {
                            $("#btnviewmorenotificationdiv").hide();
                        }
                        $(".loadingtrinity").hide();
                    }
                    else {
                        $(".loadingtrinity").hide();
                        InvalidResponseCode(data);
                    }
                } catch (e) {
                    ErrorDetails(e, Loginview.variable.File);
                }
            },
            error: OnError,
        });
    } catch (e) {
        ErrorDetails(e, Loginview.variable.File);
    }
}