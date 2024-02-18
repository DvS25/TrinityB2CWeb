var MainPrivacypolicy = {
    variable: {
        File: 'FAQ.Js'
    },
    Bindprivacy: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_FAQ_GET",
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    $("#bindFAQdata").html("");
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.faqlist != undefined) {
                            $("#bindFAQdata").append($("#DataFAQdata").render(JsonObject.serviceresponse.faqlist.faqdetail));
                            $("#bindFAQdata .card:first-child .collapsefirstchild").addClass("show");
                            //$(".privacyheader").each(function () {
                            //    var id = $(this).attr('id');
                            //    var Rowid = id.split("privacyheader");
                            //    var totalp = $("#ipr" + Rowid[1]).val();
                            //    var convert = totalp.replace('&amp;', '&');
                            //    $("#" + id).html(convert);
                            //});
                        }
                    }
                    else {
                        InvalidResponseCode(data, MainPrivacypolicy.variable.File);
                    }
                } catch (e) {
                    ErrorDetails(e, MainPrivacypolicy.variable.File);
                }
            },
            error: OnError
        });
    },
}
$(document).ready(function () {
    MainPrivacypolicy.Bindprivacy();
});