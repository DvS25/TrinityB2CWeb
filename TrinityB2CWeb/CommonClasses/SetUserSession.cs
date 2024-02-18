using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TrinityB2CWeb.Models;
using System.Web.Mvc;
using System.Text;
using TrinityB2CWeb.CommonClasses;
using TrinityB2CWeb.ServiceReference1;
using System.Xml;
using TrinityB2CWeb.Controllers;

namespace TrinityB2CWeb.CommonClasses
{
    public class SetUserSession
    {
        public static void DoLogin()
        {
            try
            {
                string XMLValue = string.Empty;
                string CookieUserName = string.Empty;
                string XMLValue1 = string.Empty;
                string XMLMenuValue = string.Empty;
                string XMLCollectionValue = string.Empty;
                string DecryptPass = string.Empty;
                PerformCrudOperations performOper = new PerformCrudOperations();
                if (HttpContext.Current.Request.Cookies["ISSOCIAL"].Value == "1")
                {
                    XMLValue1 = "<SERVICEREQUEST><SERVICENAME>B2C_LOGIN_AUTHENTICATION</SERVICENAME>" +
                               "<USERNAME>" + HttpContext.Current.Request.Cookies["LOGINID"].Value + "</USERNAME>" +
                               "<ISSOCIAL>" + HttpContext.Current.Request.Cookies["ISSOCIAL"].Value + "</ISSOCIAL>" +
                               "<ACTIVITYID>" + HttpContext.Current.Request.Cookies["ACTIVITYID"].Value + "</ACTIVITYID>" +
                               "</SERVICEREQUEST>";

                    ContactBook_InterfaceClient proxy1 = new ContactBook_InterfaceClient();
                    XMLValue1 = proxy1.PERFORM_ACTIONS(XMLValue1);

                    // CODE TO READ RESPONCE 
                    XmlDocument doc1 = new XmlDocument();
                    doc1.LoadXml(XMLValue1);

                    if (doc1.SelectSingleNode("SERVICERESPONSE//RESPONSECODE").InnerText == "0") // USER AUTHENTICATION OK
                    {

                        UserDetails objUser = new UserDetails();

                        objUser.LOGINID = Convert.ToInt32(doc1.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//CUSTOMERID").InnerText);
                        objUser.TOKEN = doc1.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//SECUREKEY").InnerText;
                        objUser.FIRSTNAME = doc1.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//FIRSTNAME").InnerText;
                        objUser.LASTNAME = doc1.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//LASTNAME").InnerText;
                        objUser.FULLNAME = doc1.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//FIRSTNAME").InnerText + " " + doc1.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//LASTNAME").InnerText;
                        
                        if (doc1.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//EMAILID").InnerText != null)
                        {
                            objUser.EMAILID = doc1.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//EMAILID").InnerText;
                            CookieUserName =  objUser.EMAILID;
                        }
                        if (doc1.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//MOBILENO").InnerText != null)
                        {
                            objUser.MOBILENO = doc1.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//MOBILENO").InnerText;
                            CookieUserName = null;
                            CookieUserName = objUser.MOBILENO;
                        }
                        if (doc1.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//GENDER").InnerText != null)
                        {
                            objUser.GENDER = doc1.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//GENDER").InnerText;
                        }
                        objUser.ACTIVITYID = doc1.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//WEBACTIVITYID").InnerText;

                        SessionFacade.UserSession = objUser;

                        if (HttpContext.Current.Request.Cookies["LOGINID"] != null)
                            HttpContext.Current.Response.Cookies["LOGINID"].Expires = DateTime.Now.AddDays(7);
                            HttpContext.Current.Response.Cookies["LOGINID"].Value = CookieUserName;
                        if (HttpContext.Current.Request.Cookies["TOKEN"] != null)
                            HttpContext.Current.Response.Cookies["TOKEN"].Expires = DateTime.Now.AddDays(7);
                        if (HttpContext.Current.Request.Cookies["ACTIVITYID"] != null)
                            HttpContext.Current.Response.Cookies["ACTIVITYID"].Expires = DateTime.Now.AddDays(7);
                            HttpContext.Current.Response.Cookies["ACTIVITYID"].Value = objUser.ACTIVITYID;
                        if (HttpContext.Current.Request.Cookies["ISSOCIAL"] != null)
                            HttpContext.Current.Response.Cookies["ISSOCIAL"].Expires = DateTime.Now.AddDays(7);
                            HttpContext.Current.Response.Cookies["ISSOCIAL"].Value = "1";
                    }
                }
                else
                {

                    XMLValue = "<SERVICEREQUEST><SERVICENAME>B2C_LOGIN_AUTHENTICATION</SERVICENAME>" +
                                "<USERNAME>" + HttpContext.Current.Request.Cookies["LOGINID"].Value + "</USERNAME>" +
                                "<PASSWORD>" + HttpContext.Current.Request.Cookies["TOKEN"].Value + "</PASSWORD>" +
                                "<ACTIVITYID>" + HttpContext.Current.Request.Cookies["ACTIVITYID"].Value + "</ACTIVITYID>" +
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

                        SessionFacade.UserSession = objUser;
                        //return RedirectToAction("Index", "Home");
                        if (HttpContext.Current.Request.Cookies["LOGINID"] != null)
                            HttpContext.Current.Response.Cookies["LOGINID"].Expires = DateTime.Now.AddDays(7);
                            HttpContext.Current.Response.Cookies["LOGINID"].Value = objUser.EMAILID;
                        if (HttpContext.Current.Request.Cookies["TOKEN"] != null)
                            HttpContext.Current.Response.Cookies["TOKEN"].Expires = DateTime.Now.AddDays(7);
                            HttpContext.Current.Response.Cookies["TOKEN"].Value = objUser.PASSWORD;
                        if (HttpContext.Current.Request.Cookies["ACTIVITYID"] != null)
                            HttpContext.Current.Response.Cookies["ACTIVITYID"].Expires = DateTime.Now.AddDays(7);
                            HttpContext.Current.Response.Cookies["ACTIVITYID"].Value = objUser.ACTIVITYID;
                        if (HttpContext.Current.Request.Cookies["ISSOCIAL"] != null)
                            HttpContext.Current.Response.Cookies["ISSOCIAL"].Expires = DateTime.Now.AddDays(7);
                            HttpContext.Current.Response.Cookies["ISSOCIAL"].Value = "";
                    }
                }

            }

            catch (Exception ex)
            {
                if (HttpContext.Current.Request.Cookies["LOGINID"] != null)
                    HttpContext.Current.Response.Cookies["LOGINID"].Expires = DateTime.Now.AddDays(-1);
                HttpContext.Current.Response.Cookies["LOGINID"].Value = "";
                if (HttpContext.Current.Request.Cookies["TOKEN"] != null)
                    HttpContext.Current.Response.Cookies["TOKEN"].Expires = DateTime.Now.AddDays(-1);
                HttpContext.Current.Response.Cookies["TOKEN"].Value = "";
                if (HttpContext.Current.Request.Cookies["ACTIVITYID"] != null)
                    HttpContext.Current.Response.Cookies["ACTIVITYID"].Expires = DateTime.Now.AddDays(-1);
                HttpContext.Current.Response.Cookies["ACTIVITYID"].Value = "";
                if (HttpContext.Current.Request.Cookies["ISSOCIAL"] != null)
                    HttpContext.Current.Response.Cookies["ISSOCIAL"].Expires = DateTime.Now.AddDays(-1);
                HttpContext.Current.Response.Cookies["ISSOCIAL"].Value = "";

                string Msg = ex.StackTrace.ToString();
                CommonController common = new CommonController();
                common.ErrorDetail(ex);
            }
        }
    }
}