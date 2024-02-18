var MyaccountView = {
    variable: {
        ratenum: 0,
        File: 'MyAccount.Js',
    },
    validator: $("#feedback-form").validate({
        errorPlacement: function (error, element) {
            if ($(element).attr('id') == 'inputtxtreview') {
                error.insertAfter($("#inputtxtreview"));
            }
            else {
                element.after(error);
            }
        }
    }),
    validator1: $("#change-password-form").validate({
        errorPlacement: function (error, element) {
            if ($(element).attr('id') == 'inputoldpassword') {
                error.insertAfter($("#inputoldpassword"));
            }
            else if ($(element).attr('id') == 'inputnewpassword') {
                error.insertAfter($("#inputnewpassword"));
            }
            else if ($(element).attr('id') == 'inputreenterpassword') {
                error.insertAfter($("#inputreenterpassword"));
            }
            else {
                element.after(error);
            }
        }
    }),
    validator2: $("#Editshipping-form").validate({
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
    validator3: $("#personaldetail-form").validate({
        errorPlacement: function (error, element) {
            if ($(element).attr('id') == 'personfirstname') {
                error.insertAfter($("#personfirstname"));
            }
            else if ($(element).attr('id') == 'personlastname') {
                error.insertAfter($("#personlastname"));
            }
            else if ($(element).attr('id') == 'birthdateaccount') {
                error.insertAfter($("#birthdateaccount"));
            }
            else if ($(element).attr('id') == 'personemailid') {
                error.insertAfter($("#personemailid"));
            }
            else if ($(element).attr('id') == 'personmobileno') {
                error.insertAfter($("#personmobileno"));
            }
            else if ($(element).attr('id') == 'personfindcountry') {
                error.insertAfter($("#personfindcountry"));
            }
            else if ($(element).attr('id') == 'personfindstate') {
                error.insertAfter($("#personfindstate"));
            }
            else if ($(element).attr('id') == 'personfindcity') {
                error.insertAfter($("#personfindcity"));
            }
            else {
                element.after(error);
            }
        }
    }),
    validator4: $("#change-setpassword-form").validate({
        errorPlacement: function (error, element) {
            if ($(element).attr('id') == 'inputsetnewpassword') {
                error.insertAfter($("#inputsetnewpassword"));
            }
            else if ($(element).attr('id') == 'setinputreenterpassword') {
                error.insertAfter($("#setinputreenterpassword"));
            }
            else {
                element.after(error);
            }
        }
    }),
    btnMasterSubmitFeedback: function () {
        var isValid = $("#feedback-form").valid();
        if (MyaccountView.variable.ratenum == 0) {
            $('#rateto-error').show();
            isValid = false;
        }
        else {
            $('#rateto-error').hide();
        }

        if (!isValid)
            return;
      
        $(".loadingtrinity").show();
        var data = {
            "oper": "add",
            "ISACTIVE": "1",
            "RATING": MyaccountView.variable.ratenum,
            "COMMENT": $("#inputtxtreview").val(),
        }
        MyaccountView.savefeedbackdata(data);
    },
    savefeedbackdata: function (data) {
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_TESTIMONIAL_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        MyaccountView.variable.ratenum = "";
                        $("#inputtxtreview").val("");
                        $("#rateYo").rateYo("option", "rating", 0);
                        $(".loadingtrinity").hide();
                    }
                    else {
                        $(".loadingtrinity").hide();
                        InvalidResponseCode(data);
                    }
                } catch (e) {
                    ErrorDetails(e, MyaccountView.variable.File);
                }
            },
            error: OnError,
        });
    },
    ClickonEditprofile: function () {
        $("#yourpersonaldetail-form").hide();
        $("#personaldetail-form").show();
        MyaccountView.PersonProfileEdit();
    },
    BacktoEdit: function () {
        $("#yourpersonaldetail-form").show();
        $("#personaldetail-form").hide();
    },
    BacktoShipping: function () {
        MyaccountView.Clearshipping();
        $("#Editshipping-form").hide();
        $("#shipping-form").show();
    },
    Clearshipping: function () {
        $("#Editshipping-form").validate().resetForm();
        $("#shippingaddressid").val("");
        $("#txtcontactperson").val("");
        $("#txtaddress").val("");
        $("#txtlandmark").val("");
        $("#txtpincode").val("");
        $("#txtmobileno").val("");
        $("#findcity").val("");
        $("#findstate").val("");
        $("#findcountry").val("");
    },
    AddressEdit: function (id) {
        try {
            MyaccountView.AddAddress();
            $("#shippingaddressid").val(id);
            $("#txtcontactperson").val($("#txtcontactpersonname" + id).html());
            $("#txtaddress").val($("#hiddenaddress" + id).val());
            $("#txtlandmark").val($("#hiddenlandmark" + id).val());
            $("#txtpincode").val($("#hiddenpincode" + id).val());
            $("#txtmobileno").val($("#hiddenmobileno" + id).val());
            $("#findcountry").val($("#hiddencountryid" + id).val());
            MyaccountView.Changecountry();
            $("#findstate").val($("#hiddenstateid" + id).val());
            MyaccountView.ChangeState();
            $("#findcity").val($("#hiddencityid" + id).val());
            $("#Editshipping-form").show();
            $("#shipping-form").hide();
        } catch (e) {
            ErrorDetails(e, MyaccountView.variable.File);
        }
    },
    PersonProfileEdit: function () {
        try {
            MyaccountView.Personcountry();
            var typename;
            typename = $("input[name=radio][value=" + $("#labelgender").html() + "]").prop('checked', true);

            $("#personegender").val(typename);

            $("#personfirstname").val($("#hiddpersonfirstname").val());
            $("#personlastname").val($("#hiddpersonlastname").val());
            $('#birthdateaccount').datepicker('setDate', $("#labelbirthdate").html());
            $('#anniversarydateaccount').datepicker('setDate', $("#labelanniversary").html());
            $('#ItemimgPreview').attr('src', $("#frontprofile").attr('src'));
            $('#ItemimgPreview').data('oldurl', $("#frontprofile").attr('src'));
            $("#personemailid").val($("#labelemailid").html());
            $("#personmobileno").val($("#labelmobileno").html());
            $("#personfindcountry").val($("#hiddpersoncountryid").val());
            
            MyaccountView.PersonChangecountry();
            $("#personfindstate").val($("#hiddpersonstateid").val());
            MyaccountView.PersonChangestate();
            $("#personfindcity").val($("#hiddpersoncityid").val());
        } catch (e) {
            ErrorDetails(e, MyaccountView.variable.File);
        }
    },
    PersonChangecountry: function () {
        try {
            var myfilter, url;
            myfilter = { rules: [] };
            myfilter.rules.push({ field: "CONTRYSTATECITY", op: "eq", data: 'State' });
            myfilter.rules.push({ field: "COUNTRYID", op: "eq", data: $("#personfindcountry").val() });

            BindDropdown("personfindstate", "Ddlpersonfindstate", "/Common/BindMastersDetails?ServiceName=APP_CONTRY_STATE_CITY_GET&myfilters=" + JSON.stringify(myfilter), "select state");
        } catch (e) {
            ErrorDetails(e, MyaccountView.variable.File);
        }
    },
    PersonChangestate: function () {
        try {
            var myfilter, url;
            myfilter = { rules: [] };
            myfilter.rules.push({ field: "CONTRYSTATECITY", op: "eq", data: 'City' });
            myfilter.rules.push({ field: "STATEID", op: "eq", data: $("#personfindstate").val() });

            BindDropdown("personfindcity", "Ddlpersonfindcity", "/Common/BindMastersDetails?ServiceName=APP_CONTRY_STATE_CITY_GET&myfilters=" + JSON.stringify(myfilter), "select city");
        } catch (e) {
            ErrorDetails(e, MyaccountView.variable.File);
        }
    },
    AddAddress: function () {
        try {
            var myfilter, url;
            myfilter = { rules: [] };
            myfilter.rules.push({ field: "CONTRYSTATECITY", op: "eq", data: 'Country' });
            BindDropdown("findcountry", "Ddlfindcountry", "/Common/BindMastersDetails?ServiceName=APP_CONTRY_STATE_CITY_GET&myfilters=" + JSON.stringify(myfilter), "select country");
        } catch (e) {
            ErrorDetails(e, MyaccountView.variable.File);
        }
    },
    Personcountry:function(){
        try {
            var myfilter, url;
            myfilter = { rules: [] };
            myfilter.rules.push({ field: "CONTRYSTATECITY", op: "eq", data: 'Country' });
            BindDropdown("personfindcountry", "Ddlpersonfindcountry", "/Common/BindMastersDetails?ServiceName=APP_CONTRY_STATE_CITY_GET&myfilters=" + JSON.stringify(myfilter), "select country");
        } catch (e) {
            ErrorDetails(e, MyaccountView.variable.File);
        }
    },
    Onchangepassword: function () {
        var isValid = $("#change-password-form").valid();
       
        if (!isValid)
            return;

        $(".loadingtrinity").show();
        var data = {
            "ACTION": "ChangePassword",
            "OLDPASSWORD": $("#inputoldpassword").val(),
            "NEWPASSWORD": $("#inputnewpassword").val(),
        }
        MyaccountView.savechangepassworddata(data);
    },
    savechangepassworddata: function (data) {
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_CUSTOMERDETAILS_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        $("#inputoldpassword").val("");
                        $("#inputnewpassword").val("");
                        $("#inputreenterpassword").val("");
                        $(".loadingtrinity").hide();
                        window.location.assign(getDomain() + "/Login/Logout");
                    }
                    else {
                        $(".loadingtrinity").hide();
                        OperationMessage('', $(data).find('RESPONSEMESSAGE').text(), 'warning');
                    }
                } catch (e) {
                    ErrorDetails(e, MyaccountView.variable.File);
                }
            },
            error: OnError,
        });
    },
    Bindaddress: function () {
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
                            }
                        }
                        if (JsonObject.serviceresponse.totalrecords == 2) {
                            $("#addnewbuttonaddress").hide();
                        }
                        else {
                            $("#addnewbuttonaddress").show();
                        }

                        $(".loadingtrinity").hide();
                    }
                    else {
                        $(".loadingtrinity").hide();
                        InvalidResponseCode(data);
                    }
                } catch (e) {
                    ErrorDetails(e, MyaccountView.variable.File);
                }
            },
            error: OnError,
        });

    },
    Changecountry: function () {
        try {
            var myfilter, url;
            myfilter = { rules: [] };
            myfilter.rules.push({ field: "CONTRYSTATECITY", op: "eq", data: 'State' });
            myfilter.rules.push({ field: "COUNTRYID", op: "eq", data: $("#findcountry").val() });

            BindDropdown("findstate", "Ddlfindstate", "/Common/BindMastersDetails?ServiceName=APP_CONTRY_STATE_CITY_GET&myfilters=" + JSON.stringify(myfilter), "select state");
        } catch (e) {
            ErrorDetails(e, MyaccountView.variable.File);
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
            ErrorDetails(e, MyaccountView.variable.File);
        }
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
                                        $("#lishippingaddress").click();
                                    }
                                    else {
                                        InvalidResponseCode(data);
                                    }
                                } catch (e) {
                                    ErrorDetails(e, MyaccountView.variable.File);
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
            ErrorDetails(e, MyaccountView.variable.File);
        }
    },
    SaveadddShipping: function () {
        try {
            var isValid = $("#Editshipping-form").valid();

            if (!isValid)
                return;
            var oper;
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
            MyaccountView.Saveaddaddressbutton(data);
        } catch (e) {
            ErrorDetails(e, MyaccountView.variable.File);
        }
    },
    ClearPersonDetail: function () {
        $("#personaldetail-form").validate().resetForm();
        $("#personfirstname").val("");
        $("#personlastname").val("");
        $("#birthdateaccount").val("");
        $("#anniversarydateaccount").val("");
        $("#personemailid").val("");
        $("#personmobileno").val("");
        $("#personfindcity").val("");
        $("#personfindstate").val("");
        $("#personfindcountry").val("");
    },
    SubmitPersonalProfile: function(){
        try {
            var isValid = $("#personaldetail-form").valid();
            if (!isValid)
                return;
            var data = {
                "oper": "edit",
                "FIRSTNAME": $("#personfirstname").val(),
                "LASTNAME": $("#personlastname").val(),
                "EMAILID": $("#personemailid").val(),
                "MOBILENO": $("#personmobileno").val(),
                "GENDER": $('input[name=radio]:checked').val(),
                "CITY": $("#personfindcity").val(),
                "STATE": $("#personfindstate").val(),
                "COUNTRY": $("#personfindcountry").val(),
                "BRITHDATE": $("#birthdateaccount").val(),
                "ANNIVERSARYDATE": $("#anniversarydateaccount").val(),
            }
            MyaccountView.Saveaddpersonprofile(data);
        } catch (e) {
            ErrorDetails(e, MyaccountView.variable.File);
        }
    },
    Saveaddpersonprofile:function(data){
      
        var originalweb = '';
        var newweb = '';
        var foldername = 'Profile';
        originalweb = $("#ItemimgPreview").data('oldurl');
        newweb = $("#ItemimgPreview").attr('src');
        $.ajax({
            type: 'POST',
            async: false,
            cache: false,
            url: getDomain() + "/Common/SaveSingleImage",
            data: { originalfile: originalweb, newfile: newweb, oper: "Edit", isResize: false, module: foldername },
            success: function (result) {
                data.PICTURE = result;
                $.ajax({
                    url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_CUSTOMERDETAILS_CRUD",
                    data: data,
                    async: true,
                    cache: false,
                    type: 'POST',
                    success: function (data) {
                        try {
                            if ($(data).find('RESPONSECODE').text() == "0") {
                                MyaccountView.ClearPersonDetail();
                                $("#mainphotodiv").click();
                            }
                            else {
                                InvalidResponseCode(data);
                            }
                        } catch (e) {
                            ErrorDetails(e, MyaccountView.variable.File);
                        }
                    },
                    error: OnError,
                });

            },
            error: OnError
        });
    },
    Saveaddaddressbutton: function (data) {
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
                        MyaccountView.Clearshipping();
                        $("#lishippingaddress").click();
                    }
                    else {
                        InvalidResponseCode(data);
                    }
                } catch (e) {
                    ErrorDetails(e, MyaccountView.variable.File);
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
                        $("#lishippingaddress").click();
                    }
                    else {
                        InvalidResponseCode(data);
                    }
                } catch (e) {
                    ErrorDetails(e, MyaccountView.variable.File);
                }
            },
            error: OnError,
        });
    },
    BindPersonProfile: function () {
        $(".loadingtrinity").show();
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_CUSTOMERDETAILS_GET&_search=true&searchField=CUSTOMERID&searchOper=eq&searchString=" + $("#myaccounthiddencustomervalue").val(),
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    $("#yourpersonaldetail-form").html("");
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.detailslist != undefined) {
                            $("#yourpersonaldetail-form").append($("#DataLabelprosonalinfo").render(JsonObject.serviceresponse.detailslist.details));
                            $("#spanpersonname").html($("#labelperosonnale").html());
                            $("#spanpersonemailid").html($("#labelemailid").html());
                            $("#spanpersonmobileno").html($("#labelmobileno").html());
                            if ($("#hiddenpictureimg").val() == "" || $("#hiddenpictureimg").val() == null)
                            {
                                $('#frontprofile').attr('src', getDomain() + "/Content/img/defaultuser.jpg");
                                $('#frontprofile').data('oldurl', getDomain() + "/Content/img/defaultuser.jpg");
                            }
                            else {
                                $('#frontprofile').attr('src', getDomain() + "/UploadFiles/Profile/" + $("#hiddenpictureimg").val());
                                $('#frontprofile').data('oldurl', getDomain() + "/UploadFiles/Profile/" + $("#hiddenpictureimg").val());
                            }
                        }
                        $(".loadingtrinity").hide();
                    }
                    else {
                        $(".loadingtrinity").hide();
                        InvalidResponseCode(data);
                    }
                } catch (e) {
                    ErrorDetails(e, MyaccountView.variable.File);
                }
            },
            error: OnError,
        });
    },
    OnSetpassword: function () {
        var isValid = $("#change-setpassword-form").valid();
        if (!isValid)
            return;
        $(".loadingtrinity").show();
        var data = {
            "ACTION": "SetSocialmediapassword",
            "PASSWORD": $("#inputsetnewpassword").val(),
        }
        MyaccountView.savesetpassworddata(data);
    },
    savesetpassworddata: function (data) {
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_CUSTOMERDETAILS_CRUD",
            data: data,
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        $("#inputsetnewpassword").val("");
                        $("#setinputreenterpassword").val("");
                        $(".loadingtrinity").hide();
                        window.location.assign(getDomain() + "/Login/Logout");
                    }
                    else {
                        $(".loadingtrinity").hide();
                        OperationMessage('', $(data).find('RESPONSEMESSAGE').text(), 'warning');
                    }
                } catch (e) {
                    ErrorDetails(e, MyaccountView.variable.File);
                }
            },
            error: OnError,
        });
    },
}
function Clearvalues() {
    $(".listli p").removeClass("selectedlicolor");
    $("#feedback-form").validate().resetForm();
    $("#change-password-form").validate().resetForm();
    $("#Editshipping-form").validate().resetForm();
    $("#address-form").hide();
    $("#shipping-form").hide();
    $("#change-password-form").hide();
    $("#change-setpassword-form").hide();
    $("#personaldetail-form").hide();
    $("#Editshipping-form").hide();
    $("#feedback-form").hide();
    $("#yourpersonaldetail-form").hide();
}
$(document).ready(function () {
    try {
        $("#rateYo").rateYo({
            normalFill: "#A0A0A0",
            ratedFill: "#F39C12 ",
            starWidth: "25px",
            numStars: 5,
            fullStar: true,
            onChange: function (rating, rateYoInstance) {
                MyaccountView.variable.ratenum = rating;
            }
        });
        if ($("#hiddensociallogin").val() == "1") {
            $("#liSetpassword").show();
            $("#lichangepassword").hide();
        }
        else {
            $("#lichangepassword").show();
            $("#liSetpassword").hide();
        }
        $('.numbersonly').keypress(function (event) {
            return numbersOnlytype(this, event, false, false);
        });
        MyaccountView.AddAddress();
        MyaccountView.BindPersonProfile();
        $('#birthdateaccount').datepicker({ format: 'dd M yyyy' });
        $('#birthdateaccount').on('change', function () {
            $('.datepicker').hide();
        });
        $('#anniversarydateaccount').datepicker({ format: 'dd M yyyy' });
        $('#anniversarydateaccount').on('change', function () {
            $('.datepicker').hide();
        });
        $("#addnewbuttonaddress").click(function () {
            MyaccountView.Clearshipping();
            $("#shipping-form").hide();
            $("#Editshipping-form").show();
        });
        $("#lishippingaddress").click(function () {
            Clearvalues();
            $("#lishippingaddress").addClass("selectedlicolor");
            $("#shipping-form").show();
            MyaccountView.Bindaddress();
            
        });
        $("#lichangepassword").click(function () {
            Clearvalues();
            $("#lichangepassword").addClass("selectedlicolor");
            $("#change-password-form").show();
        });
        $("#liSetpassword").click(function () {
            Clearvalues();
            $("#liSetpassword").addClass("selectedlicolor");
            $("#change-setpassword-form").show();
        });
        $("#mainphotodiv").click(function () {
            Clearvalues();
            MyaccountView.BindPersonProfile();
            $("#yourpersonaldetail-form").show();
        });
        $("#lisendfeedback").click(function () {
            Clearvalues();
            $("#feedback-form").show();
        });
        $("#lilogout").click(function () {
            window.location.assign(getDomain() + "/Login/Logout");
        });
        RegisterFileUpload('inputItemImage', 'ItemimgPreview', "");
    } catch (e) {
        ErrorDetails(e, MyaccountView.variable.File);
    }
});
