const stylesheet = require('../static/stylesheet')

module.exports = (receiverName, orderId, nominator) => {

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
                                <h1>Hey ${receiverName}</h1>
                             
                                <table border="0" cellpadding="0" cellspacing="0">
                                  <tbody>
                                    <tr>
                                      <td align="left">
                                        <table border="0" cellpadding="0" cellspacing="0">
                                          <tbody>
                                            <tr>
                                              <td>
                                               This email is to inform you that you've got a Nomination with ID ( ${orderId} ) by ${nominator}.
                                               <p>
                                               Thanks
</p> 
                                              </td>
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