using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TrinityB2CWeb.Models;
#pragma warning disable CS0105 // The using directive for 'System.Collections.Generic' appeared previously in this namespace
using System.Collections.Generic;
#pragma warning restore CS0105 // The using directive for 'System.Collections.Generic' appeared previously in this namespace
using System.Web.Mvc;
using System.Text;
using TrinityB2CWeb.CommonClasses;
using TrinityB2CWeb.ServiceReference1;
using System.Xml;

namespace TrinityB2CWeb.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Login(String msg)
        {
            try
            {
                ViewBag.Message = msg;
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
        public string LoginDetails()
        {
            try
            {
                string Customerdetails = string.Empty; 
                if (Request.Cookies["WebUserName"] != null && Request.Cookies["WebPassword"] != null && Request.Cookies["WebRemember"] != null)
                {
                   Customerdetails = Request.Cookies["WebUserName"].Value + ',' + Request.Cookies["WebPassword"].Value + ',' + Convert.ToBoolean(Request.Cookies["WebRemember"].Value);
                }
                return Customerdetails;
            }
            catch (Exception ex)
            {
                string Msg = ex.StackTrace.ToString();
                CommonController common = new CommonController();
                common.ErrorDetail(ex);
                return "";
            }
        }
        public string SocialMedia(int Customerid,string Username, string Securekey, string Fullname, string Emailid, string MobileNo,string Gender,string Activityid,string Issociallogin)
        {
            Response.Cookies["LOGINID"].Value = Username;
            Response.Cookies["TOKEN"].Value = "";
            Response.Cookies["ACTIVITYID"].Value = Activityid;
            Response.Cookies["ISSOCIAL"].Value = "1";
            UserDetails objUser = new UserDetails();

            objUser.LOGINID = Customerid;
            objUser.TOKEN = Securekey;
            objUser.FULLNAME = Fullname;
            objUser.EMAILID = Emailid;
            objUser.MOBILENO = MobileNo;
            objUser.GENDER = Gender;
            objUser.ACTIVITYID = Activityid;
            objUser.ISSOCIALLOGIN = Issociallogin;
            ViewBag.LOGINID = objUser.LOGINID;
            ViewBag.FULLNAME = objUser.FULLNAME;
            SessionFacade.UserSession = objUser;
            string returnvalue = ViewBag.LOGINID + ":" + ViewBag.FULLNAME;
            return returnvalue;
        }
        public string SetUsename()
        {
            try
            {
                if (SessionFacade.UserSession != null)
                {
                    ViewBag.LOGINID = SessionFacade.UserSession.LOGINID;
                    ViewBag.FULLNAME = SessionFacade.UserSession.FULLNAME;
                }
                string setreturnvalue = ViewBag.LOGINID + ":" + ViewBag.FULLNAME;
                return setreturnvalue;
            }
            catch (Exception ex)
            {
                string Msg = ex.StackTrace.ToString();
                CommonController common = new CommonController();
                common.ErrorDetail(ex);
                return "";
            }
        }
        public ActionResult Logout(String msg)
        {
            try
            {
                SessionFacade.UserSession = null;
                Response.Cookies["LOGINID"].Value = "";
                Response.Cookies["TOKEN"].Value = "";
                Response.Cookies["ISSOCIAL"].Value = "";
                Response.Cookies["ACTIVITYID"].Value = "";


                if (Response.Cookies["LOGINID"] != null)
                    Response.Cookies["LOGINID"].Expires = DateTime.Now.AddDays(-1);
                if (Response.Cookies["TOKEN"] != null)
                    Response.Cookies["TOKEN"].Expires = DateTime.Now.AddDays(-1);
                if (Response.Cookies["ACTIVITYID"] != null)
                    Response.Cookies["ACTIVITYID"].Expires = DateTime.Now.AddDays(-1);
                if (Response.Cookies["ISSOCIAL"] != null)
                    Response.Cookies["ISSOCIAL"].Expires = DateTime.Now.AddDays(-1);
                return RedirectToAction("Index", "Home");
            }
            catch (Exception ex)
            {
                string Msg = ex.StackTrace.ToString();
                CommonController common = new CommonController();
                common.ErrorDetail(ex);
                return RedirectToAction("Index", "Home");
            }

        }
        public ActionResult Register()
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
        [HttpPost, ValidateInput(false)]
        public string DoLogin(string Usename,string Password,Boolean Remember)
        {
            try
            {
                string XMLValue = string.Empty;
                string XMLMenuValue = string.Empty;
                string XMLCollectionValue = string.Empty;
                string DecryptPass = string.Empty;
                string ActivityId = Guid.NewGuid().ToString();

                Response.Cookies["LOGINID"].Value = Usename;
                Response.Cookies["TOKEN"].Value = Password;
                Response.Cookies["ACTIVITYID"].Value = ActivityId;
                Response.Cookies["ISSOCIAL"].Value = "";

                if (Request.Cookies["LOGINID"] != null)
                    Response.Cookies["LOGINID"].Expires = DateTime.Now.AddDays(7);
                if (Request.Cookies["TOKEN"] != null)
                    Response.Cookies["TOKEN"].Expires = DateTime.Now.AddDays(7);
                if (Request.Cookies["ACTIVITYID"] != null)
                    Response.Cookies["ACTIVITYID"].Expires = DateTime.Now.AddDays(7);
                if (Request.Cookies["ISSOCIAL"] != null)
                    Response.Cookies["ISSOCIAL"].Expires = DateTime.Now.AddDays(7);

                if (Remember == true)
                {
                    Response.Cookies["WebUserName"].Value = Usename;
                    Response.Cookies["WebUserName"].Expires = DateTime.Now.AddDays(7);
                    Response.Cookies["WebPassword"].Value = Password;
                    Response.Cookies["WebPassword"].Expires = DateTime.Now.AddDays(7);
                    Response.Cookies["WebRemember"].Value = "True";
                    Response.Cookies["WebRemember"].Expires = DateTime.Now.AddDays(7);
                }
                else
                {
                    Response.Cookies["WebUserName"].Value = "";
                    Response.Cookies["WebPassword"].Value = "";
                    Response.Cookies["WebRemember"].Value = "False";
                }
                PerformCrudOperations performOper = new PerformCrudOperations();
                XMLValue = "<SERVICEREQUEST><SERVICENAME>B2C_LOGIN_AUTHENTICATION</SERVICENAME>" +
                            "<USERNAME>" + Usename + "</USERNAME>" +
                            "<PASSWORD>" + Password + "</PASSWORD>" +
                            "<ACTIVITYID>" + ActivityId + "</ACTIVITYID>" +
                            "</SERVICEREQUEST>";

                ContactBook_InterfaceClient proxy = new ContactBook_InterfaceClient();
                XMLValue = proxy.PERFORM_ACTIONS(XMLValue);

                // CODE TO READ RESPONCE 
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(XMLValue);

                if (doc.SelectSingleNode("SERVICERESPONSE//RESPONSECODE").InnerText == "0") // USER AUTHENTICATION OK
                {

                    UserDetails objUser = new UserDetails();

                    objUser.LOGINID = Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//CUSTOMERID").InnerText);
                    objUser.TOKEN = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//SECUREKEY").InnerText;
                    objUser.FIRSTNAME = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//FIRSTNAME").InnerText;
                    objUser.LASTNAME = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//LASTNAME").InnerText;
                    objUser.FULLNAME = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//FIRSTNAME").InnerText + " " + doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//LASTNAME").InnerText;
                    objUser.PASSWORD = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//PASSWORD").InnerText;
                    objUser.EMAILID = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//EMAILID").InnerText;
                    objUser.MOBILENO = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//MOBILENO").InnerText;
                    objUser.GENDER = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//GENDER").InnerText;
                    objUser.ACTIVITYID = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//WEBACTIVITYID").InnerText;
                    //objUser.BRITHDATE = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//BRITHDATE").InnerText;
                    //objUser.ANNIVERSARYDATE = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//ANNIVERSARYDATE").InnerText;
                    //objUser.COUNTRYNAME = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//COUNTRYNAME").InnerText;
                    ViewBag.LOGINID = objUser.LOGINID;
                    ViewBag.FULLNAME = objUser.FULLNAME;
                    SessionFacade.UserSession = objUser;
                    string returnvalue =  ViewBag.LOGINID + ":" + ViewBag.FULLNAME;
                    return returnvalue;
                    //return RedirectToAction("Index", "Home");
                }
                else // AUTHENTICATION FAILED
                {
                    string Msg = doc.SelectSingleNode("SERVICERESPONSE//RESPONSEMESSAGE").InnerText + ":" + "error";
                    return Msg;
                }
            }
            catch (Exception ex)
            {
                string Msg = ex.StackTrace.ToString();
                CommonController common = new CommonController();
                common.ErrorDetail(ex);
                return Msg;
            }
        }
        public string ClearFilter()
        {
            try
            {
                SessionFacade.CartSession = null;
                ViewBag.filter = "0";
                ViewBag.Pricefilter = "";
                ViewBag.MetalWeightfilter = "";
                ViewBag.DiamondWeightfilter = "";
                ViewBag.MetalPurityfilter = "";
                ViewBag.MetalColorfilter = "";
                ViewBag.Shapefilter = "";
                ViewBag.Tagvalue = "";
                if (Response.Cookies["Pricefilter"] != null)
                    Response.Cookies["Pricefilter"].Expires = DateTime.Now.AddDays(-1);
                if (Response.Cookies["MetalWeightfilter"] != null)
                    Response.Cookies["MetalWeightfilter"].Expires = DateTime.Now.AddDays(-1);
                if (Response.Cookies["DiamondWeightfilter"] != null)
                    Response.Cookies["DiamondWeightfilter"].Expires = DateTime.Now.AddDays(-1);
                if (Response.Cookies["MetalPurityfilter"] != null)
                    Response.Cookies["MetalPurityfilter"].Expires = DateTime.Now.AddDays(-1);
                if (Response.Cookies["MetalColorfilter"] != null)
                    Response.Cookies["MetalColorfilter"].Expires = DateTime.Now.AddDays(-1);
                if (Response.Cookies["Shapefilter"] != null)
                    Response.Cookies["Shapefilter"].Expires = DateTime.Now.AddDays(-1);
                if (Response.Cookies["Tagvalue"] != null)
                    Response.Cookies["Tagvalue"].Expires = DateTime.Now.AddDays(-1);
                //Response.Cookies["Pricefilter"].Value = "";
                //Response.Cookies["MetalWeightfilter"].Value = "";
                //Response.Cookies["DiamondWeightfilter"].Value = "";
                //Response.Cookies["MetalPurityfilter"].Value = "";
                //Response.Cookies["MetalColorfilter"].Value = "";
                //Response.Cookies["Shapefilter"].Value = "";
                //Response.Cookies["Tagvalue"].Value = "";
                return "success";
            }
            catch (Exception ex)
            {
                string Msg = ex.StackTrace.ToString();
                CommonController common = new CommonController();
                common.ErrorDetail(ex);
                return "";
            }
        }

    }
}