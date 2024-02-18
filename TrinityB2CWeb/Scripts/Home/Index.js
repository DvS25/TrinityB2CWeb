var MainPageview = {
    variable:{
        File:'Index.Js'
    },
    collection: function () {
            $.ajax({
                url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_COLLECTION_GET&sord=desc&sidx=DISPLAY_ORDER&searchOper=eq&searchField=ISACTIVE&searchString=1&_search=true&IsRecordAll=true",
                async: false,
                cache: false,
                type: 'POST',
                success: function (data) {
                    try{
                        $("#slideshow0").html("");
                        if ($(data).find('RESPONSECODE').text() == "0") {
                            var JsonObject = xml2json.parser(data);
                            if (JsonObject.serviceresponse.detailslist != undefined) {
                                $("#slideshow0").append($("#datacollectionslider").render(JsonObject.serviceresponse.detailslist.details));
                            }
                        }
                        else {
                            InvalidResponseCode(data, MainPageview.variable.File);
                        }
                    } catch (e) {
                        ErrorDetails(e,MainPageview.variable.File);
                    }
                },
                error: OnError
            });
    },
    BestSellingcategory: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_BESTSELLINGCATEGORY_GET",
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                try {
                    $("#bestsellingcategory").html("");
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.detailslist != undefined) {
                            $("#bestsellingcategory").append($("#Bindcollectionslider").render(JsonObject.serviceresponse.detailslist.details));
                        }
                    }
                    else {
                        InvalidResponseCode(data, MainPageview.variable.File);
                    }
                } catch (e) {
                    ErrorDetails(e, MainPageview.variable.File);
                }
            },
            error: OnError
        });
    },
    categorycollection: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=CATEGORY_GET",
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                try{
                    $("#categorydiv").html("");
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.detailslist != undefined) {
                            $("#categorydiv").append($("#dataallcategory").render(JsonObject.serviceresponse.detailslist.details));
                        }
                    }
                    else {
                        InvalidResponseCode(data, MainPageview.variable.File);
                    }
                } catch (e) {
                    ErrorDetails(e, MainPageview.variable.File);
                }
            },
            error: OnError
        });
    },
    festivalcollection: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_FESTIVALCOLLECTION_GET&searchOper=eq&searchField=ISACTIVE&searchString=1&_search=true&IsRecordAll=true",
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                try{
                    $("#festivalcollection").html("");
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.detailslist != undefined) {
                            $("#festivalcollection").append($("#datafestival").render(JsonObject.serviceresponse.detailslist.details));
                        }
                    }
                    else {
                        InvalidResponseCode(data, MainPageview.variable.File);
                    }
                } catch (e) {
                    ErrorDetails(e, MainPageview.variable.File);
                }
            },
            error: OnError
        });
    },
    Testimonial: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=B2C_TESTIMONIAL_GET&searchOper=eq&searchField=ISACTIVE&searchString=1&_search=true&IsRecordAll=true",
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                try{
                    $("#testimonialdata").html("");
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.detailslist != undefined) {
                            $("#ourreviewdiv").show();
                            $("#testimonialdata").append($("#Bindtestimonal").render(JsonObject.serviceresponse.detailslist.details));
                        }
                        else {
                            $("#ourreviewdiv").hide();
                        }
                    }
                    else {
                        InvalidResponseCode(data);
                    }
                } catch (e) {
                    ErrorDetails(e, MainPageview.variable.File);
                }
            },
            error: OnError
        });
    },
    ClickonCollection: function (id) {
        $.ajax({
            url: getDomain() + '/Login/ClearFilter',
            async: true,
            cache: false,
            success: function (data) {
                if (data = "success") {
                    var collectionkeyword, collectionsubcategory, designrange;
                    collectionkeyword = $("#txt_collectionkeyword" + id).val();
                    collectionsubcategory = $("#txt_subcategoryname" + id).val();
                    designrange = $("#txt_designorange" + id).val();
                    window.location.assign(getDomain() + "/Product/ProductList?category=" + collectionsubcategory + "&type=collection&searchkeyword=" + collectionkeyword + "&designno=" + designrange);
                }
            }
        });
      
    },
    ClickonFestivalCollection: function (id) {
        var collectionkeyword, designrange;
        collectionsubcategory = $("#txt_festsubcategoryname" + id).val();
        designrange = $("#txt_festdesignorange" + id).val();
        window.location.assign(getDomain() + "/Product/ProductList?category=" + collectionsubcategory + "&type=Festivalcollection&designno=" + designrange);
    },
    ShowProductDetailPage: function (id) {
        $.ajax({
            url: getDomain() + '/Login/ClearFilter',
            async: true,
            cache: false,
            success: function (data) {
                if (data = "success") {
                    window.open(getDomain() + "/Product/ProductDetail?id=" + id, '_blank');
                }
            }
        });
        
    },
}
function ClickOnSubcategory(subcategory) {
    //$.ajax({
    //    url: getDomain() + "/Product/ProductList?category=" + subcategory + "&type=subcategory",
    //    async: false,
    //    cache: false,
    //    type: 'POST',
    //    success: function (data) {
          
    //    },
    //    error: OnError
    //});
    $.ajax({
        url: getDomain() + '/Login/ClearFilter',
        async: true,
        cache: false,
        success: function (data) {
            if (data = "success") {
                window.location.assign(getDomain() + "/Product/ProductList?category=" + subcategory + "&type=subcategory");
            }
        }
    });
  
}
$(document).ready(function () {

    $("#owl-demo").owlCarousel({
        items: 6,
        lazyLoad: true,
        navigation: true,
        navigationText: ['<i class="fa fa-chevron-left fa-5x"></i>', '<i class="fa fa-chevron-right fa-5x"></i>']
    });

    MainPageview.collection();
    MainPageview.categorycollection();
    MainPageview.festivalcollection();
    MainPageview.BestSellingcategory();
    MainPageview.Testimonial();
    $("#dwnloadandroid").click(function () {
        $.cookie('noShowEducation', true);
        window.open("https://play.google.com/store/apps/details?id=com.Trinity.TrinityJewells");
    });
    $("#dwnloadios").click(function () {
        $.cookie('noShowEducation', true);
        window.open("https://itunes.apple.com/in/app/trinityjewells/id1417418121?mt=8");
    });
    var userAgent = navigator.userAgent || navigator.vendor;
    if ((/android/i.test(userAgent)) || (/phone/i.test(userAgent))) {
        $("#dwnloadandroid").show();
        $("#dwnloadios").hide();
        if ($.cookie('noShowEducation')) {
            $("#myappModal").hide();
        }
        else {
            $('#myappModal').show();
        }
    }
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        $("#dwnloadandroid").hide();
        $("#dwnloadios").show();

        if ($.cookie('noShowEducation'))
        {
            $("#myappModal").hide();
        }
        else {
            $('#myappModal').show();
           
        }
    }
    // If modal is displayed, store that in localStorage
   
    $("#closdownloadmodal").click(function () {
        $.cookie('noShowEducation', true);
        $("#dwnloadandroid").hide();
        $("#dwnloadios").hide();
        $("#myappModal").hide();
    })

   
    /*------------------------------*/
    var revapi34,
          tpj;
    (function () {
        if (!/loaded|interactive|complete/.test(document.readyState)) document.addEventListener("DOMContentLoaded", onLoad);
        else onLoad();

        function onLoad() {
            if (tpj === undefined) {
                tpj = jQuery;
                if ("off" == "on") tpj.noConflict();
            }
            if (tpj("#rev_slider_34_1").revolution == undefined) {
                revslider_showDoubleJqueryError("#rev_slider_34_1");
            } else {
                revapi34 = tpj("#rev_slider_34_1").show().revolution({
                    sliderType: "standard",
                    jsFileLocation: "Content/vendor/revslider/js/",
                    sliderLayout: "fullscreen",
                    dottedOverlay: "none",
                    delay: 6000,
                    navigation: {
                        keyboardNavigation: "off",
                        keyboard_direction: "horizontal",
                        mouseScrollNavigation: "off",
                        mouseScrollReverse: "default",
                        onHoverStop: "off",
                        thumbnails: {
                            style: "hesperiden",
                            enable: true,
                            width: 95,
                            height: 95,
                            min_width: 95,
                            wrapper_padding: 10,
                            wrapper_color: "rgb(255,255,255)",
                            tmp: '<span class="tp-thumb-image"></span><span class="tp-thumb-title">{{title}}</span>',
                            visibleAmount: 4,
                            hide_onmobile: true,
                            hide_under: 992,
                            hide_onleave: false,
                            direction: "horizontal",
                            span: false,
                            position: "inner",
                            space: 10,
                            h_align: "right",
                            v_align: "bottom",
                            h_offset: 390,
                            v_offset: 0
                        }
                    },
                    responsiveLevels: [1240, 1024, 778, 480],
                    visibilityLevels: [1240, 1024, 778, 480],
                    gridwidth: [1200, 992, 768, 576],
                    gridheight: [900, 768, 960, 720],
                    lazyType: "none",
                    parallax: {
                        type: "mouse",
                        origo: "enterpoint",
                        speed: 400,
                        speedbg: 0,
                        speedls: 0,
                        levels: [4, 6, 8, 10, 12, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 55],
                        disable_onmobile: "on"
                    },
                    shadow: 0,
                    spinner: "spinner2",
                    stopLoop: "off",
                    stopAfterLoops: -1,
                    stopAtSlide: -1,
                    shuffle: "off",
                    autoHeight: "off",
                    fullScreenAutoWidth: "on",
                    fullScreenAlignForce: "off",
                    fullScreenOffsetContainer: "",
                    fullScreenOffset: "",
                    disableProgressBar: "on",
                    hideThumbsOnMobile: "on",
                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    debugMode: false,
                    fallbacks: {
                        simplifyAll: "on",
                        nextSlideOnWindowFocus: "off",
                        disableFocusListener: false,
                    }
                });
            }; /* END OF revapi call */
        }; /* END OF ON LOAD FUNCTION */
    }()); /* END OF WRAPPING FUNCTION */
  
    
})