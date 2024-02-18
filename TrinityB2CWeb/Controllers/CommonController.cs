using System;
using TrinityB2CWeb.CommonClasses;
using System.Linq;
using TrinityB2CWeb.ServiceReference1;
using System.Web;
using System.Web.Mvc;
using System.IO;

namespace TrinityB2CWeb.Controllers
{
    public class CommonController : Controller
    {
        public string BindMastersDetails()
        {
            try
            {
                string XMLValue = string.Empty;
                CommonGridParams parms = new CommonGridParams();
                parms.PageIndex = Convert.ToString(Request.QueryString["page"]);
                parms.PageSize = Convert.ToString(Request.QueryString["rows"]);
                parms.SortColumn = Convert.ToString(Request.QueryString["sidx"]);
                parms.SortOrder = Convert.ToString(Request.QueryString["sord"]);
                parms.ColumnRequested = Request.QueryString["ColumnRequested"];
                parms.ServiceName = Request.QueryString["ServiceName"];
                parms.Countrydropdown = Request.QueryString["Contrydropdown"];

                if (Request.Form["XMLPARAM"] != null)
                    parms.XmlParam = Request.Form["XMLPARAM"];

                if (Request.QueryString["IsRecordAll"] != null && Request.QueryString["IsRecordAll"] != "")
                {
                    parms.IsRecordAll = Convert.ToString(Request.QueryString["IsRecordAll"]);
                }

                if (Request.QueryString["IsActive"] != null && Request.QueryString["IsActive"] != "")
                {
                    parms.IsActive = Convert.ToString(Request.QueryString["IsActive"]);
                }

                if (Request.QueryString["_search"] != null && Request.QueryString["_search"] != "")
                {
                    bool search = Convert.ToBoolean(Request.QueryString["_search"].ToString());
                    if (search == true)
                    {
                        if (Request.QueryString["searchString"] != null)
                        {
                            string searchString = Request.QueryString["searchString"].ToString();
                            searchString = searchString.Replace("<", "&lt;");
                            searchString = searchString.Replace("&", "&amp;");
                            parms.SearchKeyword = searchString;
                        }

                        if (Request.QueryString["searchField"] != null)
                            parms.SearchColumn = Request.QueryString["searchField"].ToString();

                        if (Request.QueryString["searchOper"] != null)
                            parms.SearchOper = Request.QueryString["searchOper"].ToString();

                        if (Request.QueryString["filters"] != null)
                            parms.Filters = Request.QueryString["filters"].ToString();
                    }
                }


                if (Request.QueryString["_gridsearch"] != null && Request.QueryString["_gridsearch"] != "")
                {
                    bool search = Convert.ToBoolean(Request.QueryString["_gridsearch"].ToString());
                    if (search == true)
                    {
                        if (Request.QueryString["searchString"] != null)
                            parms.SearchKeyword = Request.QueryString["searchString"].ToString();

                        if (Request.QueryString["searchField"] != null)
                            parms.SearchColumn = Request.QueryString["searchField"].ToString();

                        if (Request.QueryString["searchOper"] != null)
                            parms.SearchOper = Request.QueryString["searchOper"].ToString();

                        if (Request.QueryString["filters"] != null)
                            parms.Filters = Request.QueryString["filters"].ToString();
                    }
                }

                if (Request.QueryString["myfilters"] != null)
                    parms.MyFilters = Request.QueryString["myfilters"].ToString();

                GenerateXml xmlGenerator = new GenerateXml();
                string ChildNodes = xmlGenerator.GenerateCommonRequestNodes(parms);
                string RequestNodes = xmlGenerator.FinalXml("SERVICEREQUEST", ChildNodes);

                ContactBook_InterfaceClient client = new ContactBook_InterfaceClient();
                XMLValue = client.PERFORM_ACTIONS(RequestNodes);
                client.Close();
                return XMLValue;
            }
            catch (Exception ex)
            {
                string Msg = ex.StackTrace.ToString();
                ErrorDetail(ex);
                return GenerateXml.GetExceptionXMLResponse(ex);
            }
        }

        [HttpPost]
        [ValidateInput(false)]
        public string OpeartionsOnMaster(string ServiceName)
        {
            try
            {
                string XMLValue = string.Empty;

                System.Collections.Specialized.NameValueCollection forms = new System.Collections.Specialized.NameValueCollection();

                forms.Add(Request.Unvalidated.Form);

                PerformCrudOperations performOper = new PerformCrudOperations();
                XMLValue = performOper.PerformOpeartions(forms, "SERVICEREQUEST", ServiceName);

                return XMLValue;
            }
            catch (Exception ex)
            {
                string Msg = ex.StackTrace.ToString();
                ErrorDetail(ex);
                return GenerateXml.GetExceptionXMLResponse(ex);
            }
        }
        public JsonResult SaveSingleImage(string originalfile, string newfile, string oper, bool isResize, string module)
        {
            string VirtualDirectory = System.Configuration.ConfigurationManager.AppSettings["domainPath"];
            if (VirtualDirectory != "")
            {
                if (!string.IsNullOrEmpty(originalfile))
                { originalfile = originalfile.Replace(VirtualDirectory, ""); }

                if (!string.IsNullOrEmpty(newfile))
                { newfile = newfile.Replace(VirtualDirectory, ""); }
            }

            string newfilePath = Server.MapPath("~" + newfile);
            string originalfilePath = Server.MapPath("~" + originalfile);

            if (newfile != null && newfile.Contains("/UploadFiles/") && (oper == "Add" || oper == "Delete" || oper == "Edit"))
            {
                string destFile = "/UploadFiles/" + module + "/"; // /" + SessionFacade.Client + "
                string destServerpath = Server.MapPath("~" + destFile);
                try
                {
                    if (!Directory.Exists(destServerpath))
                    {
                        Directory.CreateDirectory(destServerpath);
                    }
                    if (System.IO.File.Exists(newfilePath))
                    {
                        if ((oper != "Delete" && oper != "Edit") || (oper == "Edit" && newfilePath != originalfilePath))
                            System.IO.File.Copy(newfilePath, destServerpath + Path.GetFileName(newfile));

                        if (isResize) { }

                        if (oper == "Delete" || (oper == "Edit" && newfilePath != originalfilePath) || oper == "Add")
                        {
                            System.IO.File.Delete(newfilePath); // delete Temp file
                            if (System.IO.File.Exists(originalfilePath)) // delete old file
                                System.IO.File.Delete(originalfilePath);
                            string deleteFile = Path.GetDirectoryName(originalfilePath) + "\\Resize\\" + Path.GetFileName(originalfile);
                            if (System.IO.File.Exists(deleteFile)) // delete resized file
                                System.IO.File.Delete(deleteFile);
                        }
                    }
                }
                catch (Exception ex)
                {
                    string Msg = ex.StackTrace.ToString();
                    ErrorDetail(ex);
                    return Json("error", JsonRequestBehavior.AllowGet);
                }
                return Json(System.IO.Path.GetFileName(newfile), JsonRequestBehavior.AllowGet);
            }
            else
            {
                if (newfile == null)
                    newfile = "";
                return Json(System.IO.Path.GetFileName(newfile), JsonRequestBehavior.AllowGet);
            }
        }
        public void ErrorDetail(Exception error)
        {
            string XMLValue = string.Empty;
            string Msg = error.Message;
            string errprmsg = error.StackTrace;
            string msgline = string.Empty;
            int index = errprmsg.IndexOf("\\Controllers\\");
            if (index > 0)
                msgline = errprmsg.Substring(index);

            PerformCrudOperations performOper = new PerformCrudOperations();
            XMLValue = "<SERVICEREQUEST><SERVICENAME>B2C_ERROR_CRUD</SERVICENAME>" +
                        "<ERRORLINE>" + msgline + "</ERRORLINE>" +
                        "<ERRORMESSAGE>" + Msg + "</ERRORMESSAGE>" +
                        "<ERRORTYPE>CS</ERRORTYPE>" +
                        "</SERVICEREQUEST>";

            ContactBook_InterfaceClient proxy = new ContactBook_InterfaceClient();
            XMLValue = proxy.PERFORM_ACTIONS(XMLValue);

        }

        public void SetCookies()
        {
            string CookieName = Request.QueryString["CookieName"];
            string CookieValue = Request.QueryString["CookieValue"];

            Response.Cookies[CookieName].Value = CookieValue;
        }
        public string GetCookies()
        {
            string CookieName = Request.QueryString["CookieName"];

            if (Request.Cookies[CookieName] != null)
                return Request.Cookies[CookieName].Value;
            else
                return "";
        }
    }
}