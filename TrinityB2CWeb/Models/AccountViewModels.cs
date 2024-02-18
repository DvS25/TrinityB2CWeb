using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TrinityB2CWeb.Models
{
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class ExternalLoginListViewModel
    {
        public string ReturnUrl { get; set; }
    }

    public class SendCodeViewModel
    {
        public string SelectedProvider { get; set; }
        public ICollection<System.Web.Mvc.SelectListItem> Providers { get; set; }
        public string ReturnUrl { get; set; }
        public bool RememberMe { get; set; }
    }

    public class VerifyCodeViewModel
    {
        [Required]
        public string Provider { get; set; }

        [Required]
        [Display(Name = "Code")]
        public string Code { get; set; }
        public string ReturnUrl { get; set; }

        [Display(Name = "Remember this browser?")]
        public bool RememberBrowser { get; set; }

        public bool RememberMe { get; set; }
    }

    public class ForgotViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class LoginViewModel
    {
        [Required]
        [Display(Name = "Email")]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }
    public class UserDetails
    {
        public int LOGINID { get; set; }
        public string TOKEN { get; set; }
        public string FIRSTNAME { get; set; }
        public string LASTNAME { get; set; }
        public string FULLNAME { get; set; }
        
        public string PASSWORD { get; set; }
        public string EMAILID { get; set; }
        public string MOBILENO { get; set; }
        public string GENDER { get; set; }
        public string BRITHDATE { get; set; }
        public string ANNIVERSARYDATE { get; set; }
        public string COUNTRYNAME { get; set; }
        public string ACTIVITYID { get; set; }
        public string ISSOCIALLOGIN { get; set; }
}
    public class Product
    {

        public string PRODUCTNAME { get; set; }
        public string CATEGORYIMAGE { get; set; }
        public int DISPLAYORDER { get; set; }
        public string CATEGORY { get; set; }

    }
    public class MensProduct
    {

        public string PRODUCTNAME { get; set; }
        public string CATEGORYIMAGE { get; set; }
        public int DISPLAYORDER { get; set; }
        public string CATEGORY { get; set; }

    }
    public class WomansProduct
    {

        public string PRODUCTNAME { get; set; }
        public string CATEGORYIMAGE { get; set; }
        public int DISPLAYORDER { get; set; }
        public string CATEGORY { get; set; }

    }
    public class CartDetails
    {
        public string GPURITY { get; set; }
        public string GCOLOR { get; set; }
        public string DPURITY { get; set; }
        public string DCOLOR { get; set; }
        public string DSIZE { get; set; }
        public string CUSTUMIZENOTES { get; set; }
        public string ISCUSTOMIZE { get; set; }
        public string CARTID { get; set; }
        public string CARTTOPRODUCT { get; set; }


    }
    public class RegisterViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }

    public class ResetPasswordViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        public string Code { get; set; }
    }

    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }
}
