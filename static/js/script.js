/// <reference path="../typings/globals/jquery/index.d.ts" />
$("#error-firstname").hide();
$("#error-secondname").hide();
$("#error-username").hide();
$("#error-email").hide();
$("#error-password").hide();
$("#error-retypePassword").hide();
$("#error-title").hide();
$("#error-description").hide();
$("#error-startdate").hide();
$("#error-enddate").hide();
$("#error-minbid").hide();
$("#error-maxbid").hide();

var error_fname = false;
var error_sname = false;
var error_uname = false;
var error_email = false;
var error_psd = false;
var error_re_psd = false;
var error_title = false;
var error_description = false;
var error_startdate = false;
var error_enddate = false;
var error_minbid = false;
var error_maxbid = false;

$("#form_uname").focusout(function(){
    check_uname();
});

$("#form_email").focusout(function() {
    check_email();
});

$("#form_psd").focusout(function() {
    check_psd();
});

$("#form_re_psd").focusout(function() {
    check_re_psd();
});

$("#form_title").focusout(function() {
    check_title();
});

$("#form_description").focusout(function() {
    check_description();
});

$("#form_min_bid").focusout(function() {
    check_form_min_bid();
});

$("#form_max_bid").focusout(function() {
    check_form_max_bid();
});

$("#form_start_date").focusout(function() {
    check_start_date();
});

$("#form_end_date").focusout(function() {
    check_end_date();
});

max_bid = 0;
min_bid = 0;

function check_form_min_bid() {
    var pattern = /^[0-9]+$/;
    min_bid = $("#form_min_bid").val();
    if(pattern.test(min_bid))
    {
        if(parseInt(min_bid) > max_bid)
        {
            $("#error-minbid").html("Should be less than max bid");
            $("#error-minbid").show();
            $("#form_min_bid").css("border-bottom","2px solid #F90A0A");
            error_minbid = true;
            $("#error-maxbid").html("Should be more than min bid");
            $("#error-maxbid").show();
            $("#form_max_bid").css("border-bottom","2px solid #F90A0A");
            error_maxbid = true;
        }
        else {
            $("#error-minbid").hide();
            $("#form_min_bid").css("border-bottom","2px solid #34F458");
            $("#error-maxbid").hide();
            $("#form_max_bid").css("border-bottom","2px solid #34F458");
        }
    }
}


function check_form_max_bid() {
    var pattern = /^[0-9]+$/;
    max_bid = $("#form_max_bid").val();
    if(pattern.test(max_bid))
    {
        if(parseInt(max_bid) < min_bid)
        {
            $("#error-maxbid").html("Should be more than min bid");
            $("#error-maxbid").show();
            $("#form_max_bid").css("border-bottom","2px solid #F90A0A");
            error_maxbid = true;
            $("#error-minbid").html("Should be less than max bid");
            $("#error-minbid").show();
            $("#form_min_bid").css("border-bottom","2px solid #F90A0A");
            error_minbid = true;
        }
        else {
            $("#error-minbid").hide();
            $("#form_min_bid").css("border-bottom","2px solid #34F458");
            $("#error-maxbid").hide();
            $("#form_max_bid").css("border-bottom","2px solid #34F458");
        }
    }
}

function check_uname(){

    var pattern = /^[a-zA-Z0-9_-]{3,20}$/;
    var uname = $("#form_uname").val();

    if(pattern.test(uname) && uname!=='')
    {
        $("#error-username").hide();
        $("#form_uname").css("border-bottom","2px solid #34F458")
    }
    else
    {
        $("#error-username").html("Should contain only Characters and Numbers");
        $("#error-username").show();
        $("#form_uname").css("border-bottom","2px solid #F90A0A");
        error_uname = true;
    }
    
}

function check_email(){

    var pattern = /^[\S]+@[\S]+\.[\S]+$/;
    var email = $("#form_email").val();

    if(pattern.test(email) && email!=='')
    {
        $("#error-email").hide();
        $("#form_email").css("border-bottom","2px solid #34F458")
    }
    else
    {
        $("#error-email").html("Please enter a valid email address");
        $("#error-email").show();
        $("#form_email").css("border-bottom","2px solid #F90A0A");
        error_email = true;
    }
}

function check_psd(){

    var pattern = /^.{3,20}$/;
    var password = $("#form_psd").val();
    var plen = $("#form_psd").val().length;

    if(!pattern.test(password) || password==='' || plen < 3)
    {
        $("#error-password").html("Password should contain atleast 3 characters");
        $("#error-password").show();
        $("#form_psd").css("border-bottom","2px solid #F90A0A");
        error_psd = true;
    }
    else
    {
        $("#error-password").hide();
        $("#form_psd").css("border-bottom","2px solid #34F458")
    }
}

function check_re_psd(){

    var password = $("#form_psd").val();
    var re_password = $("#form_re_psd").val();

    if(password !== re_password) {
        $("#error-retypePassword").html("Passwords Did not Matched");
        $("#error-retypePassword").show();
        $("#form_re_psd").css("border-bottom","2px solid #F90A0A");
        error_retype_password = true;
    } 
    else {
        $("#error-retypePassword").hide();
        $("#form_re_psd").css("border-bottom","2px solid #34F458");
    }
}

function check_title() {
    var title = $("#form_title").val();
    if(title !== '')
    {
        $("#error-title").hide();
        $("#form_title").css("border-bottom","2px solid #34F458")
    }
    else
    {
        $("#error-title").html("Please enter title");
        $("#error-title").show();
        $("#form_title").css("border-bottom","2px solid #F90A0A");
        error_title  = true;
    }
}

function check_description() {
    var description = $("#form_description").val();
    if(description !== '')
    {
        $("#error-description").hide();
        $("#form_description").css("border-bottom","2px solid #34F458")
    }
    else
    {
        $("#error-description").html("Please enter description");
        $("#error-description").show();
        $("#form_description").css("border-bottom","2px solid #F90A0A");
        error_title  = true;
    }
}

// function check_start_date() {
//
//     var date = $("#form_start_date").val();
//     Console.log(date)
//     if(date !== '')
//     {
//         $("#error-startdate").hide();
//         $("#form_start_date").css("border-bottom","2px solid #34F458")
//     }
//     else
//     {
//         $("#error-startdate").html("Please enter date");
//         $("#error-startdate").show();
//         $("#form_start_date").css("border-bottom","2px solid #F90A0A");
//         error_startdate  = true;
//     }
// }
//
// function check_end_date() {
//
//     var date = $("#form_end_date").val();
//     Console.log(date)
//     if(date !== '')
//     {
//         $("#error-enddate").hide();
//         $("#form_end_date").css("border-bottom","2px solid #34F458")
//     }
//     else
//     {
//         $("#error-enddate").html("Please enter date");
//         $("#error-enddate").show();
//         $("#form_end_date").css("border-bottom","2px solid #F90A0A");
//         error_enddate  = true;
//     }
// }
$(document).ready(function() {
    var date_input = $('input[name="start_date"]'); //our date input has the name "date"
    var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
    var options = {
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true
    };
    date_input.datepicker(options);
    $("#form_date").focusout(function() {
        check_start_date();
    });
});

$(document).ready(function() {
    var date_input = $('input[name="end_date"]'); //our date input has the name "date"
    var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
    var options = {
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true
    };
    date_input.datepicker(options);
    $("#form_date").focusout(function() {
        check_end_date();
    });
});


