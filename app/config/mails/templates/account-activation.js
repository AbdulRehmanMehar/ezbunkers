const stylesheet = require('../static/stylesheet')

module.exports = (uid) => {

    return `
        <!doctype html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Simple Transactional Email</title>
            <style>${stylesheet()}</style>
          </head>
          
          <body class="">
            <table border="0" cellpadding="0" cellspacing="0" class="body">
              <tr>
                <td>&nbsp;</td>
                <td class="container">
                  <div class="content">
                    <span class="preheader">EzBunkers</span>
                    <table class="main">
        
                      <!-- START MAIN CONTENT AREA -->
                      <tr>
                        <td class="wrapper">
                          <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td>
                                <h1>Account Activation</h1>
                                <h2>Hooray, Admin just approved your account!</h2>
                                <table border="0" cellpadding="0" cellspacing="0">
                                  <tbody>
                                    <tr>
                                      <td align="left">
                                        <table border="0" cellpadding="0" cellspacing="0">
                                          <tbody>
                                            <tr>
                                              <td> <p> Use <code>${uid}</code> as User ID to login to the website. Once you try to login using the User ID, you'll be sent an email with OTP. You'll use the OTP to login and set password.</p> </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <p>If you received this email by mistake, simply delete it.</p>
              
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
        
                    <!-- END MAIN CONTENT AREA -->
                    </table>
        
                    <!-- START FOOTER -->
                    <div class="footer">
                      <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td class="content-block">
                            <span class="apple-link">EzBunkers</span>
                            <br> &nbsp; <a href="#">&nbsp;</a>.
                          </td>
                        </tr>
                        <tr>
                          <td class="content-block powered-by">
                            &nbsp;
                          </td>
                        </tr>
                      </table>
                    </div>
                    <!-- END FOOTER -->
                    
                  <!-- END CENTERED WHITE CONTAINER -->
                  </div>
                </td>
                <td>&nbsp;</td>
              </tr>
            </table>
          </body>
        </html>
    
    `

}