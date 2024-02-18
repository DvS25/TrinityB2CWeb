using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TrinityB2CWeb.Startup))]
namespace TrinityB2CWeb
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
