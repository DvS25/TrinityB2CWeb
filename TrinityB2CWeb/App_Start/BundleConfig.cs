using System.Web;
using System.Web.Optimization;

namespace TrinityB2CWeb
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                      "~/Content/vendor/jquery/jquery-2.1.1.min.js",
                      "~/Content/vendor/jquery-confirm/jquery-confirm.js",
                      "~/Content/vendor/jquery-ui-2/jquery-ui.min.js",
                      "~/Content/elevatezoom/jquery.elevatezoom.min.js",
                      "~/Content/js/jquery.cookie.js",
                      "~/Content/vendor/bootstrap/js/bootstrap.min.js",
                      "~/Content/js/jquery.custom.min.js",
                      "~/Content/js/jquery.validate.min.js",
                      "~/Content/vendor/owl-carousel/owl.carousel.min.js",
                      "~/Content/vendor/JSRender/jsrender.min.js",
                      "~/Content/vendor/JSRender/Xml2Json.js",
                      "~/Content/vendor/filupload/jquery.fileupload.js",
                      "~/Content/vendor/RatingStar/jquery.rateyo.min.js",
                      "~/Content/vendor/Toster/toastr.min.js",
                      "~/Content/vendor/DatePicker/js/bootstrap-datepicker.min.js",
                      "~/Content/vendor/bootstrap-toggle/bootstrap-toggle.min.js",
                      "~/Content/vendor/so_page_builder/js/magnific-popup.js",
                      "~/Content/js/scripts.min.js",
                      "~/Content/vendor/Zoomeffect/jquery.elevatezoom.min.js",
                      "~/Scripts/Common.js"
                     ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                     "~/Content/css/Common.css",
                     "~/Content/css/assets/bootstrap.css",
                     "~/Content/vendor/jquery-ui-2/jquery-ui.css",
                     "~/Content/css/skins/brk-blue.css",
                     "~/Content/css/skins/brk-base-color.css",
                     "~/Content/css/assets/offsets.css",
                     "~/Content/css/assets/styles.min.css",
                     "~/Content/vendor/filupload/jquery.fileupload.css",
                     "~/Content/css/allfont.css",
                     "~/Content/vendor/revslider/css/settings.css",
                     "~/Content/vendor/RatingStar/jquery.rateyo.min.css",
                     "~/Content/vendor/DatePicker/css/datepicker.css",
                     "~/Content/vendor/bootstrap-toggle/bootstrap-toggle.min.css",
                     "~/Content/vendor/so_page_builder/css/magnific-popup.css",
                     "~/Content/vendor/Toster/toastr.min.css",
                     "~/Content/css/components/shop-components-cards.css",
                     "~/Content/css/Custom.css"
                     ));


            BundleTable.EnableOptimizations = false;
        }
    }
}
