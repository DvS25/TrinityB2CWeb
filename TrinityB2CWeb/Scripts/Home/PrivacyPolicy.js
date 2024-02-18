var MainPrivacypolicy = {
    variable: {
        File: 'PrivacyPolicy.Js'
    },
    Bindprivacy: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_PRIVACYPOLICY_GET",
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    $("#bindprivacydata").html("");
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.policylist != undefined) {
                            $("#bindprivacydata").append($("#Dataprivacydata").render(JsonObject.serviceresponse.policylist.policydetails));
                            $("#bindprivacydata .card:first-child .collapsefirstchild").addClass("show");
                            $(".privacyheader").each(function () {
                                var id = $(this).attr('id');
                                var Rowid = id.split("privacyheader");
                                var totalp = $("#ipr" + Rowid[1]).val();
                                var convert = totalp.replace('&amp;', '&');
                                $("#" + id).html(convert);
                            });
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