using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TrinityB2CWeb.Filters;

namespace TrinityB2CWeb.Controllers
{
    [SessionExpireFilterAttribute]
    public class OrderController : Controller
    {
        // GET: Order
        public ActionResult OrderTracking(string id)
        {
            try
            {
                ViewBag.Ordertrackid = id;
                return View();
            }
            catch (Exception ex)
            {
                string Msg = ex.StackTrace.ToString();
                CommonController common = new CommonController();
                common.ErrorDetail(ex);
                return RedirectToAction("Index", "Home");
            }
        }
        public ActionResult OrderHistory()
        {
            try
            {
                return View();
            }
            catch (Exception ex)
            {
                string Msg = ex.StackTrace.ToString();
                CommonController common = new CommonController();
                common.ErrorDetail(ex);
                return RedirectToAction("Index", "Home");
            }
        }
    }
}