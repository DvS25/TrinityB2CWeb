using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TrinityB2CWeb.Models;
using TrinityB2CWeb.CommonClasses;
using System.Web.Mvc;
using System.Xml;
using System.Web.Routing;
using TrinityB2CWeb.Controllers;

namespace TrinityB2CWeb.Filters
{
    public class SessionExpireFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            string controller = string.Empty;
            string action = string.Empty;

            // Getting controller, action name from HttpRequest
            FormPermissionHelper.GetControllerAction(filterContext.HttpContext, ref controller, ref action);

            if (SessionFacade.UserSession == null)
            {
                if (HttpContext.Current.Request.Cookies["LOGINID"] != null && (HttpContext.Current.Request.Cookies["TOKEN"] != null || HttpContext.Current.Request.Cookies["ISSOCIAL"] != null))
                {
                    if (HttpContext.Current.Request.Cookies["LOGINID"].Value != "" && (HttpContext.Current.Request.Cookies["TOKEN"].Value != "" || HttpContext.Current.Request.Cookies["ISSOCIAL"].Value != ""))
                    {
                        //SetUserSession.DoLogin();
                        SetUserSession.DoLogin();
                        filterContext.Result = new RedirectResult("~/" + controller + "/" + action + "");
                        return;
                    }
                }
                
            }

            if (SessionFacade.UserSession == null)
            {
                if (HttpContext.Current.Request.Cookies["LOGINID"] == null && (HttpContext.Current.Request.Cookies["TOKEN"] == null || HttpContext.Current.Request.Cookies["ISSOCIAL"] == null))
                {
                    if (DefaultAccessMethodlist.CheckIsDefaultAccess(controller, action) == false)
                    {
                        if (filterContext.HttpContext.Request.IsAjaxRequest())
                        {
                            filterContext.Result = new FormPermissionHelper.JsonStringResult("<SERVICERESPONSE>" +
                                                                        "<RESPONSECODE>-405</RESPONSECODE>" +
                                                                        "<RESPONSEMESSAGE>YOUR SESSION TIMEOUT. PLEASE RE-LOGIN.</RESPONSEMESSAGE>" +
                                                                        "</SERVICERESPONSE>");
                        }
                        else
                        {
                            filterContext.Result = new RedirectResult("~/Home/Index");
                            return;
                        }
                    }
                }
                else
                {

                    SetUserSession.DoLogin();
                }
            }

            base.OnActionExecuting(filterContext);
        }
    }

}