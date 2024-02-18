using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TrinityB2CWeb.Models;
using System.Web.Mvc;
using System.Text;
using TrinityB2CWeb.Filters;
using TrinityB2CWeb.CommonClasses;
using TrinityB2CWeb.ServiceReference1;
using System.Xml;

namespace TrinityB2CWeb.Controllers
{
   [SessionExpireFilterAttribute]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            try
            {
                //BindMenu();
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
        public ActionResult ContactUs()
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

        public ActionResult AboutUs()
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
        public ActionResult StoreLocator()
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
                return RedirectToAction("index", "Home");
            }
        }
        public ActionResult MyAccount()
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
        public ActionResult TermsAndCondition()
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
        public ActionResult PrivacyPolicy()
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
        public ActionResult FAQ()
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
        public ActionResult Guidline()
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
        public ActionResult DownloadApp()
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