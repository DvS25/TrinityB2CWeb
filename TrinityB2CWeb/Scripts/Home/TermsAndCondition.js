var MainTermsview = {
    variable: {
        File: 'TermsAndCondition.Js'
    },
    BindTerms: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_TERMSANDCONDITION_GET",
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    $("#bindtermsdata").html("");
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.termslist != undefined) {
                            $("#bindtermsdata").append($("#Datatermsdata").render(JsonObject.serviceresponse.termslist.termsdetails));
                            $("#bindtermsdata .card:first-child .collapsefirstchild").addClass("show");
                            $(".termsheader").each(function () {
                                var id = $(this).attr('id');
                                var Rowid = id.split("termsheader");
                                var totalp = $("#ipr" + Rowid[1]).val();
                                var convert = totalp.replace('&amp;', '&');

                                $("#" + id).html(convert);
                            });
                        }
                    }
                    else {
                        InvalidResponseCode(data, MainTermsview.variable.File);
                    }
                } catch (e) {
                    ErrorDetails(e, MainTermsview.variable.File);
                }
            },
            error: OnError
        });
    },
}
$(document).ready(function () {
    MainTermsview.BindTerms();
});