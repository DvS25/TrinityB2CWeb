function numbersOnlytype(Sender, evt, isFloat, isNegative) {
    if (Sender.readOnly) return false;
    var key = evt.which || !window.event ? evt.which : event.keyCode;
    var value = Sender.value;

    if ((key == 46 || key == 44) && isFloat) {
        var selected = document.selection ? document.selection.createRange().text : "";
        if (selected.length == 0 && value.indexOf(".") == -1 && value.length > 0) Sender.value += ".";
        return false;
    }
    if (key == 45) { // minus sign '-'
        if (!isNegative) return false;
        if (value.indexOf('-') == -1) Sender.value = '-' + value; else Sender.value = value.substring(1);
        if (Sender.onchange != null) {
            if (Sender.fireEvent) {
                Sender.fireEvent('onchange');
            } else {
                var e = document.createEvent('HTMLEvents');
                e.initEvent('change', false, false);
                Sender.dispatchEvent(e);
            }
        }
        var begin = Sender.value.indexOf('-') > -1 ? 1 : 0;
        if (Sender.setSelectionRange) {
            Sender.setSelectionRange(begin, Sender.value.length);
        } else {
            var range = Sender.createTextRange();
            range.moveStart('character', begin);
            range.select();
        }

        return false;
    }
    if (key > 31 && (key < 48 || key > 57)) return false;
}
function BindDropdown(ddl, optionList, url, selectText) {
    $.ajax({
        url: getDomain() + url,
        async: false,
        cache: false,
        type: 'POST',
        success: function (data) {
            if ($(data).find('RESPONSECODE').text() == "0") {

                if (selectText != '')
                    $("#" + ddl).html("<option value='' selected disabled hidden >" + selectText + "</option>");
                else
                    $("#" + ddl).html("");
                var JsonObject = xml2json.parser(data);
                if (JsonObject.serviceresponse.detaillist != undefined) {
                    $("#" + ddl).append($("#" + optionList).render(JsonObject.serviceresponse.detaillist.detail));
                }
            }
            else {
                InvalidResponseCode(data);
            }
        },
        error: OnError
    });
}
function BindCityDropdown(ddl, optionList, url, selectText) {
    $.ajax({
        url: getDomain() + url,
        async: false,
        cache: false,
        type: 'POST',
        success: function (data) {
            if ($(data).find('RESPONSECODE').text() == "0") {

                if (selectText != '')
                    $("#" + ddl).html("<option value='' selected disabled hidden >" + selectText + "</option>");
                else
                    $("#" + ddl).html("");
                var JsonObject = xml2json.parser(data);
                if (JsonObject.serviceresponse.detailslist != undefined) {
                    $("#" + ddl).append($("#" + optionList).render(JsonObject.serviceresponse.detailslist.details));
                }
            }
            else {
                InvalidResponseCode(data);
            }
        },
        error: OnError
    });
}
var xmlvars = {};
Object.defineProperty(xmlvars, 'common_colmap', {
    get: function () {
        return 'DETAILSLIST>DETAILS>';
    },
});
Object.defineProperty(xmlvars, 'common_root', {
    get: function () {
        return 'DETAILSLIST';
    },
});
Object.defineProperty(xmlvars, 'common_row', {
    get: function () {
        return 'DETAILS';
    },
});
Object.defineProperty(xmlvars, 'common_response', {
    get: function () {
        return 'SERVICERESPONSE>';
    },
});
function OperationMessage(title, message, type) {
    var timeout = 3000;
    if (type == 'warning') {
        timeout = 4000;
    }
    else if (type == 'info') {
        timeout = 10000;
    }
    var positionClass = "toast-top-center";
    if (message.length > 50)
        positionClass = "toast-top-full-width";
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": positionClass,
        "onclick": null,
        "showDuration": "400",
        "hideDuration": "1000",
        "timeOut": timeout,
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr[type](message, title);
}
function InvalidResponseCode(data, ErrorType) {
    var code = $(data).find('RESPONSECODE').text();
    var msg = '';

    if (code == "-405") {
        window.location.href = getDomain() + "/Home/Index";
    }
    else if (code == "-406") {
        window.location.href = getDomain() + "/Home/Index";
    }
    else if (code != "0") {
        msg = "<div><b>Response Code:</b> " + code + "</div>";
        msg += "<div><br /><b>Response Message:</b> " + $(data).find('RESPONSEMESSAGE').text() + "</div>";

        OperationMessage('VALIDATION RESPONSECODE', msg, 'error');
    }
    ErrorCrud('', msg, ErrorType)
}

function ErrorDetails(Error, ErrorType) {
    var stack, ErrorLine, ErrorMsg;
    stack = Error.stack || '';
    stack = stack.split('\n').map(function (line) { return line.trim(); });
    ErrorLine = stack.splice(stack[0] == 'Error' ? 2 : 1);
    ErrorLine = ErrorLine[0];
    ErrorMsg = Error.message;
    ErrorCrud(ErrorLine, ErrorMsg, ErrorType);
}
function ErrorCrud(ErrorLine, ErrorMsg, ErrorType) {
    var data = {
        "ERRORLINE": ErrorLine,
        "ERRORMESSAGE": ErrorMsg,
        "ERRORTYPE": ErrorType
    }
    $.ajax({
        url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=B2C_ERROR_CRUD",
        data: data,
        async: true,
        cache: false,
        type: 'POST',
        success: function (data) {
            OperationMessage('There is some technical error, please try after sometime.', '', 'warning');
        }
    });
}
function OnError(xhr, errorType, exception) {
    var responseText;
    var ErrorDetail = "";
    try {
        responseText = jQuery.parseJSON(xhr.responseText);

        ErrorDetail = "<div><b>" + errorType + " " + exception + "</b></div>";
        ErrorDetail += "<div><b>Exception</b>: " + responseText.ExceptionType + "</div>";
        ErrorDetail += "<div><b>StackTrace</b>: " + responseText.StackTrace + "</div>";
        ErrorDetail += "<div><b>Message</b>: " + responseText.Message + "</div>";
    } catch (e) {
        ErrorDetail = "<div><b>Error Message</b>: " + xhr.responseText + "</div>";
        ErrorCrud('', ErrorDetail, 'JS');
    }

    if (ErrorDetail.indexOf('-405') > 0) {
        //window.location.href = getDomain() + "/Login/LogOut?code=-405";
    }
    else {
        OperationMessage('AJAX ERROR RESPONSE', ErrorDetail, 'error');
    }

    ErrorCrud('', ErrorDetail, 'JS');
}
function checkIsValidFile(accept, type) {
    var isValid = false;
    if (accept.indexOf('image/') > -1) {
        if (type.indexOf('image/') > -1) {
            isValid = true;
        }
    }
    if (accept.indexOf('text/') > -1) {
        if (type.indexOf('text/') > -1) {
            isValid = true;
        }
    }
    if (accept.indexOf('application/vnd.ms-xpsdocument') > -1) {
        if (type.indexOf('application/vnd.ms-xpsdocument') > -1) {
            isValid = true;
        }
    }
    if (accept.indexOf('application/pdf') > -1) {
        if (type.indexOf('application/pdf') > -1) {
            isValid = true;
        }
    }
    if (accept.indexOf('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') > -1) {
        if (type.indexOf('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') > -1) {
            isValid = true;
        }
    }
    if (accept.indexOf('application/vnd.ms-excel') > -1) {
        if (type.indexOf('application/vnd.ms-excel') > -1) {
            isValid = true;
        }
    }

    if (accept.indexOf('application/vnd.ms-excel.sheet.binary.macroEnabled.12') > -1) {
        if (type.indexOf('application/vnd.ms-excel.sheet.binary.macroEnabled.12') > -1) {
            isValid = true;
        }
    }

    if (accept.indexOf('csv/') > -1) {
        if (type.indexOf('csv/') > -1) {
            isValid = true;
        }
    }
    if (accept.indexOf('application/zip/') > -1) {
        if (type.indexOf('application/zip/') > -1) {
            isValid = true;
        }
    }

    if (accept.indexOf('application/x-zip-compressed') > -1) {
        if (type.indexOf('application/x-zip-compressed') > -1) {
            isValid = true;
        }
    }
    return isValid;
}
function RegisterFileUpload(btn, img, lblError) {
    $('#' + btn).fileupload({
        url: getDomain() + '/Helpers/Handler/FileUploadHandler.ashx',
        add: function (e, data) {
            if (checkIsValidFile(e.target.accept, data.files[0].type))
                data.submit();
            else
                OperationMessage('Invalid File', 'Please select only ' + e.target.accept + ' files', 'warning');
        },
        success: function (response, status) {

            $('#' + img).attr('src', response);
            if ($(lblError).length > 0) {
                $(lblError).hide();
                $(lblError).html("");
            }
        },
        error: OnError
    });
}

function getCookie(cname) {
    //var name = cname + "=";
    //var ca = document.cookie.split(';');
    //for (var i = 0; i < ca.length; i++) {
    //    var c = ca[i];
    //    while (c.charAt(0) == ' ') {
    //        c = c.substring(1);
    //    }
    //    if (c.indexOf(name) == 0) {
    //        return c.substring(name.length, c.length);
    //    }
    //}
    //return "";

    var value = "";
    $.ajax({
        url: getDomain() + "/Common/GetCookies?CookieName=" + cname,
        async: false,
        cache: false,
        type: 'POST',
        success: function (data) {
            value = data;
        },
        error: OnError
    });
    return value;
}
function setCookie(cname, value) {
    $.ajax({
        url: getDomain() + "/Common/SetCookies?CookieName=" + cname + "&CookieValue=" + value,
        async: false,
        cache: false,
        type: 'POST',
        success: function (data) {

        },
        error: OnError
    });
}

$(document).ready(function () {
    BindCityDropdown("ddl_currency ul", "render_currency", "/Common/BindMastersDetails?ServiceName=MASTER_COUNTRY_STATE_CITY_GET&ColumnRequested=CURR_DROPDOWN", "");
    $("#ddl_currency .dropdown-item").click(function () {
        //document.cookie = "TrinityCurrencyType=" + $(this).attr("data-value") + "; path="+getDomain()+";";
        //document.cookie = "TrinityCurrLang=" + $(this).attr("data-lang") + "; path=" + getDomain() + ";";
        setCookie("TrinityCurrencyType", $(this).attr("data-value"));
        setCookie("TrinityCurrLang", $(this).attr("data-lang"));
        setCookie("TrinityCountryName", $(this).attr("CountryName"));
        window.location.reload();
    });
    var Currency = getCookie("TrinityCurrencyType") || "INR";
    var CurrLang = getCookie("TrinityCurrLang") || "en-IN";
    var CountryName = getCookie("TrinityCountryName") || "India";
    $("#Selected_Currency").html(Currency);
    $("#Sel_CurrLang").val(CurrLang);
    $("#Selected_CurrencyImg").attr("src", $("#ddl_currency .dropdown-item[data-value='" + Currency + "']").find("img").attr("src"));

    /*--------Home Slider End-------*/
    var token = '11045000816.1677ed0.ba98f886cd0f494e8a3438956ce5c256',
    userid = 11045000816,
    num_photos = 9;
    $.ajax({
        url: 'https://api.instagram.com/v1/users/self/media/recent',
        dataType: 'jsonp',
        type: 'GET',
        data: {
            access_token: token,
            count: num_photos
        },
        success: function (data) {
            console.log(data);
            for (x in data.data) {
                $('#instgramdiv').append('<div class="widget-gallery__item"><a class="widget-gallery__img js-zoom-gallery__item" href="' + data.data[x].images.standard_resolution.url + '"><img src="' + data.data[x].images.thumbnail.url + '"></a></li>');
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
    //$(".js-zoom-gallery").length > 0 && $(".js-zoom-gallery").each(function () {
    //    $(this).magnificPopup({
    //        delegate: ".js-zoom-gallery__item",
    //        type: "image",
    //        gallery: {
    //            enabled: !0
    //        },
    //        mainClass: "mfp-with-zoom",
    //        zoom: {
    //            enabled: !0,
    //            duration: 300,
    //            easing: "ease-in-out",
    //            opener: function (e) {
    //                return e.is("img") ? e : e.find("img")
    //            }
    //        }
    //    })
    //}),
    //$(".js-zoom-images").length > 0 && $(".js-zoom-images").magnificPopup({
    //    type: "image",
    //    mainClass: "mfp-with-zoom",
    //    zoom: {
    //        enabled: !0,
    //        duration: 300,
    //        easing: "ease-in-out",
    //        opener: function (e) {
    //            return e.is("img") ? e : e.find("img")
    //        }
    //    }
    //})

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.11&appId=449929868734951';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
})