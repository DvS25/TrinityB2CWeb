using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TrinityB2CWeb.Filters
{
    public class DefaultAccessMethodlist
    {
        static Dictionary<string, bool> Allowlist;
#pragma warning disable CS0649 // Field 'DefaultAccessMethodlist.BeforeLoginMenulist' is never assigned to, and will always have its default value null
        static Dictionary<string, bool> BeforeLoginMenulist;
#pragma warning restore CS0649 // Field 'DefaultAccessMethodlist.BeforeLoginMenulist' is never assigned to, and will always have its default value null

        static DefaultAccessMethodlist()
        {
            Allowlist = new Dictionary<string, bool>();
            //Allowlist.Add("login_index", true);
            //Allowlist.Add("login_aboutus", true);
            //Allowlist.Add("login_contactus", true);
            //Allowlist.Add("login_login", true);
            Allowlist.Add("login_logindetails", true);
            Allowlist.Add("login_logout", true);
            Allowlist.Add("login_login", true);
            Allowlist.Add("login_register", true);
            Allowlist.Add("login_DoLogin", true);
            Allowlist.Add("login_SocialMedia", true);
            Allowlist.Add("common_bindmastersdetails", true);
            Allowlist.Add("common_opeartionsonmaster", true);
            Allowlist.Add("product_productdetail", true);
            Allowlist.Add("product_productlist", true);
            Allowlist.Add("product_clearfilter", true);
            Allowlist.Add("home_index", true);
            Allowlist.Add("home_aboutus", true);
            Allowlist.Add("home_contactUs", true);
            Allowlist.Add("home_termsandcondition", true);
            Allowlist.Add("home_privacypolicy", true);
            Allowlist.Add("home_faq", true);
            Allowlist.Add("home_guidline", true);
            Allowlist.Add("home_downloadapp", true);
            Allowlist.Add("home_storelocator", true);

        }

        public static bool CheckIsDefaultAccess(string controller, string action)
        {
            try
            {
                bool IsAllow = false;

                Allowlist.TryGetValue((controller + '_' + action).ToLower(), out IsAllow);
                return IsAllow;
            }
            catch
            {
                return false;
            }
        }

        public static bool CheckIsBeforeLoginAccess(string controller, string action)
        {
            try
            {
                bool IsAllow = false;

                BeforeLoginMenulist.TryGetValue((controller + '_' + action).ToLower(), out IsAllow);
                return IsAllow;
            }
            catch
            {
                return false;
            }
        }
    }
}