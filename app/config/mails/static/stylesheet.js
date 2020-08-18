module.exports = () => {
    return `
        html {
\twidth:100%
}
::-moz-selection {
background:#fd4326;
color:#fff;
text-shadow:1px 1px 0 #f22b0e
}
::selection {
background:#fd4326;
color:#fff;
text-shadow:1px 1px 0 #f22b0e
}
body {
\tbackground-color:#fff;
\tmargin:0;
\tpadding:0
}
.ReadMsgBody {
\twidth:100%;
\tbackground-color:#fff
}
.ExternalClass {
\twidth:100%;
\tbackground-color:#fff
}
a {
\tcolor:#fd4326;
\ttext-decoration:none;
\tfont-weight:400;
\tfont-style:normal
}
a:hover {
\tcolor:#262626;
\ttext-decoration:none;
\tfont-weight:400;
\tfont-style:normal
}
p, div {
\tmargin:0!important
}
table {
\tborder-collapse:collapse
}
@media only screen and (max-width:640px) {
body {
width:auto!important
}
table table {
width:100%!important
}
td[class=full_width] {
width:100%!important
}
td[class=spacer] {
width:30px!important
}
td[class=spacer_spec] {
display:none!important
}
div[class=div_scale] {
width:440px!important;
margin:0 auto!important
}
table[class=table_scale] {
width:440px!important;
margin:0 auto!important
}
td[class=td_scale] {
width:440px!important;
margin:0 auto!important
}
img[class=img_scale] {
width:100%!important;
height:auto!important
}
img[class=divider] {
width:100%!important;
height:2px!important
}
td[class=divider] {
width:100%!important;
display:block!important;
float:left;
text-align:inherit!important
}
}
@media only screen and (max-width:479px) {
body {
width:auto!important
}
table table {
width:100%!important
}
td[class=full_width] {
width:100%!important
}
div[class=div_scale] {
width:280px!important;
margin:0 auto!important
}
table[class=table_scale] {
width:280px!important;
margin:0 auto!important
}
td[class=td_scale] {
width:280px!important;
margin:0 auto!important
}
img[class=img_scale] {
width:100%!important;
height:auto!important
}
img[class=divider] {
width:100%!important;
height:2px!important
}
td[class=spacer] {
display:none!important
}
td[class=spacer_spec] {
display:none!important
}
td[class=divider] {
width:100%!important;
display:block!important;
float:left;
text-align:inherit!important
}
td[class=center] {
text-align:center!important
}
td[class=subject_line] {
float:left;
width:240px;
display:block!important;
text-align:left!important;
padding:15px 20px!important
}
td[class=contact] {
float:left;
width:240px;
display:block!important;
text-align:left!important;
padding:0 20px 15px!important;
padding-bottom:20px!important
}
td[class=social_left] {
float:left;
width:240px;
display:block!important;
text-align:center!important;
padding:20px 20px 0!important
}
td[class=social_right] {
float:left;
width:240px;
display:block!important;
text-align:center!important;
padding:0 20px!important
}
td[class=one_one] {
width:240px!important;
display:block!important;
float:left;
padding-left:20px!important;
padding-right:20px!important;
text-align:inherit!important
}
td[class=one_half] {
width:240px!important;
padding-bottom:0!important;
display:block!important;
float:left;
padding-left:20px!important;
text-align:inherit!important
}
td[class=one_half_last] {
width:240px!important;
margin-top:40px!important;
display:block!important;
float:left;
padding-left:20px!important;
text-align:inherit!important;
padding-top:0!important
}
td[class=one_third_fed] {
width:240px!important;
display:block!important;
float:left;
padding-left:20px!important;
text-align:inherit!important
}
td[class=one_third_fed_sec] {
width:240px!important;
margin-top:20px!important;
display:block!important;
float:left;
padding-left:20px!important;
text-align:inherit!important
}
td[class=one_third_fed_last] {
width:240px!important;
margin-top:20px!important;
display:block!important;
float:left;
padding-left:20px!important;
text-align:inherit!important
}
td[class=one_third] {
width:240px!important;
display:block!important;
float:left;
padding-left:20px!important;
text-align:inherit!important
}
td[class=one_third_sec] {
width:240px!important;
margin-top:40px!important;
display:block!important;
float:left;
padding-left:20px!important;
text-align:inherit!important
}
td[class=two_third_last] {
width:240px!important;
margin-top:40px!important;
display:block!important;
float:left;
padding-left:20px!important;
text-align:inherit!important
}
td[class=two_third] {
width:240px!important;
display:block!important;
float:left;
margin-left:20px!important;
text-align:inherit!important
}
td[class=one_third_last] {
width:240px!important;
margin-top:40px!important;
display:block!important;
float:left;
margin-left:20px!important;
text-align:inherit!important
}
td[class=one_fourth] {
width:110px!important;
display:block!important;
float:left;
margin-left:20px!important;
text-align:inherit!important
}
td[class=one_fourth_last] {
width:110px!important;
margin-top:20px!important;
display:block!important;
float:left;
margin-left:20px!important;
text-align:inherit!important
}
}
    
    `
}