using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TrinityB2CWeb.Filters;
using TrinityB2CWeb.CommonClasses;
using TrinityB2CWeb.Models;

namespace TrinityB2CWeb.Controllers
{
    [SessionExpireFilterAttribute]
    public class ProductController : Controller
    {
        // GET: Product
        public ActionResult CartList()
        {
           
            try
            {
                SessionFacade.CartSession = null;
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
        public ActionResult WishList()
        {
            try
            {
                SessionFacade.CartSession = null;
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
        public ActionResult ProductDetail(string id)
        {
            try
            {
                ViewBag.Designno = id;
                if (SessionFacade.CartSession != null)
                {
                    ViewBag.ISCUSTOMIZE = SessionFacade.CartSession.ISCUSTOMIZE;
                    ViewBag.GPURITY = SessionFacade.CartSession.GPURITY;
                    ViewBag.GCOLOR = SessionFacade.CartSession.GCOLOR;
                    ViewBag.DPURITY = SessionFacade.CartSession.DPURITY;
                    ViewBag.DCOLOR = SessionFacade.CartSession.DCOLOR;
                    ViewBag.DSIZE = SessionFacade.CartSession.DSIZE;
                    ViewBag.CUSTUMIZENOTES = SessionFacade.CartSession.CUSTUMIZENOTES;
                    ViewBag.CARTID = SessionFacade.CartSession.CARTID;
                    ViewBag.CARTTOPRODUCT = SessionFacade.CartSession.CARTTOPRODUCT;
                }
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
        public ActionResult ProductList(string category, string type, string searchkeyword, string designno)
        {
            try
            {
                SessionFacade.CartSession = null;
                ViewBag.Subcategoryname = category;
                ViewBag.CategoryType = type;
                ViewBag.Collectionkeyword = searchkeyword;
                ViewBag.Collectiondesignno = designno;
                ViewBag.filter = "0";
                if (Request.Cookies["Pricefilter"] != null)
                {
                    ViewBag.filter = "1";
                    ViewBag.Pricefilter = Request.Cookies["Pricefilter"].Value;
                }
                if (Request.Cookies["MetalWeightfilter"] != null)
                {
                    ViewBag.filter = "1";
                    ViewBag.MetalWeightfilter = Request.Cookies["MetalWeightfilter"].Value;
                }
                if (Request.Cookies["DiamondWeightfilter"] != null)
                {
                    ViewBag.filter = "1";
                    ViewBag.DiamondWeightfilter = Request.Cookies["DiamondWeightfilter"].Value;
                }
                if (Request.Cookies["MetalPurityfilter"] != null)
                {
                    ViewBag.filter = "1";
                    ViewBag.MetalPurityfilter = Request.Cookies["MetalPurityfilter"].Value;
                }
                if (Request.Cookies["MetalColorfilter"] != null)
                {
                    ViewBag.filter = "1";
                    ViewBag.MetalColorfilter = Request.Cookies["MetalColorfilter"].Value;
                }
                if (Request.Cookies["Shapefilter"] != null)
                {
                    ViewBag.filter = "1";
                    ViewBag.Shapefilter = Request.Cookies["Shapefilter"].Value;
                }
                if (Request.Cookies["Tagvalue"] != null)
                {
                    ViewBag.filter = "1";
                    ViewBag.Tagvalue = Request.Cookies["Tagvalue"].Value;
                }
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
        public JsonResult ProductFilter(string FilterName, string Value,string Tagvalue)
        {
            try
            {
                if (FilterName == "Price")
                {
                    Response.Cookies["Pricefilter"].Value = Value;
                    Response.Cookies["Pricefilter"].Expires = DateTime.Now.AddDays(1);
                }
                else if (FilterName == "MetalWeight")
                {
                    Response.Cookies["MetalWeightfilter"].Value = Value;
                    Response.Cookies["MetalWeightfilter"].Expires = DateTime.Now.AddDays(1);
                }
                else if (FilterName == "DiamondWeight")
                {
                    Response.Cookies["DiamondWeightfilter"].Value = Value;
                    Response.Cookies["DiamondWeightfilter"].Expires = DateTime.Now.AddDays(1);
                }
                else if (FilterName == "MetalPurity")
                {
                    Response.Cookies["MetalPurityfilter"].Value = Value;
                    Response.Cookies["MetalPurityfilter"].Expires = DateTime.Now.AddDays(1);
                }
                else if (FilterName == "MetalColor")
                {
                    Response.Cookies["MetalColorfilter"].Value = Value;
                    Response.Cookies["MetalColorfilter"].Expires = DateTime.Now.AddDays(1);
                }
                else if (FilterName == "Shape")
                {
                    Response.Cookies["Shapefilter"].Value = Value;
                    Response.Cookies["Shapefilter"].Expires = DateTime.Now.AddDays(1);
                }

                Response.Cookies["Tagvalue"].Value = Tagvalue;
                Response.Cookies["Tagvalue"].Expires = DateTime.Now.AddDays(1);
                //Response.Cookies["filtertag"].Value = Filttag;
                //Response.Cookies["filtertag"].Expires = DateTime.Now.AddDays(1);
                return Json("success", JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                string Msg = ex.StackTrace.ToString();
                CommonController common = new CommonController();
                common.ErrorDetail(ex);
                return Json("error", JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost, ValidateInput(false)]
        public string Customizedetail(string Gcolor, string Gpurity, string Dcolor, string Dpurity, string Dsize, string Customizenotes, string Iscustomize, string Cartid)
        {
            CartDetails Customizedetails = new CartDetails();

            Customizedetails.GPURITY = Gpurity;
            Customizedetails.GCOLOR = Gcolor;
            Customizedetails.DPURITY = Dpurity;
            Customizedetails.DCOLOR = Dcolor;
            Customizedetails.DSIZE = Dsize;
            Customizedetails.CUSTUMIZENOTES = Customizenotes;
            Customizedetails.ISCUSTOMIZE = Iscustomize;
            Customizedetails.CARTID = Cartid;
            Customizedetails.CARTTOPRODUCT = "1";

            SessionFacade.CartSession = Customizedetails;
            return "success";
        }
    }
}