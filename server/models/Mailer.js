var nodemailer = require('nodemailer');
var EmailTemplate = require('email-templates').EmailTemplate;

var sender = 'smtps://yassine.sta%40esprit.tn'   // The emailto use in sending the email
//(Change the @ symbol to %40 or do a url encoding )
var password = 'azertysta'  // password of the email to use

var transporter = nodemailer.createTransport(sender + ':' + password + '@smtp.gmail.com');


var sendResetPasswordLink = transporter.templateSender(
    new EmailTemplate('../templates/registration'), {
        from: 'yassine.sta@esprit.tn',
});

exports.sendPasswordReset = function (email, username, name, tokenUrl) {
    // transporter.template
    sendResetPasswordLink({
        to: email,
        subject: 'Password Reset - Transporters.com'
    }, {
        name: name,
        username: username,
        token: tokenUrl
    }, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('Link sent\n'+ JSON.stringify(info));
        }
    });
};