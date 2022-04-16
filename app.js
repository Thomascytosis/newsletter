const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { options } = require("request");
// added mailchimp node code
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { format } = require("path");
const { nextTick } = require("process");
const res = require("express/lib/response");

mailchimp.setConfig({
  apiKey: {CHIMP_API},
  server: {CHIMP_SERV},
});
// node
const app = express();
// to serve static files for webpage folder "public"
app.use(express.static("public"));
// to collect input fields code
app.use(bodyParser.urlencoded({extended: true}));
// to input fields collection and send?
app.post("/", function(req,res){
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const emailX = req.body.email;

// code from mailchimp 03 2022
const listId = "e82f6569f1";
const subscribingUser = {
  firstName: fName,
  lastName: lName,
  email: emailX
};
var registered = 0;
async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }
    });

    console.log(
      `Successfully added contact as an audience member. The contact's id is ${
        response.id
      }.`
    );
    // registered = true;
    // callBack()
  };
  
run()
// function runVerify(){
//   run() {
//   registered += 1;
// }}
// runVerify()

// if (response.id) {
//   res.sendFile(__dirname + "/success.html");
// }
// else {
//   res.sendFile(__dirname + "/fail.html");
// }


// const form = document.getElementById('myform');

// form.addEventListener('submit', function handleSubmit(event) {
//   event.preventDefault();

//   // 👇️ Send data to server here
  
//   // 👇️ Reset form here
//   form.reset();
// });

// const btn = document.getElementById('btn');

// btn.addEventListener('click', function handleClick(event) {
//   // 👇️ if you are submitting a form
//   event.preventDefault();

//   const inputs = document.querySelectorAll('#firstName, #lastName, #email');

//   inputs.forEach(input => {
//     input.value = '';
//   });
// });
// $('#myform').get(0).reset(); 

// var clearForm = document.getElementById('myform');
// clearForm.target.reset();

    //Angelas legacy depracated code 
    // const data = {
    //     members:[
    //         {
    //             email_address: email,
    //             status: "subscribed",
    //             merge_fields: {
    //                 FNAME: firstName,
    //                 LNAME: lastName
    //             }
    //         }
    //     ]
    // };

    // const jsonData = JSON.stringify(data);

    // const url = "https://us14.api.mailchimp.com/3.0/lists/e82f6569f1";

    // const options = {
    //     method: "POST",
    //     auth: "tclarke: 2c6d3ea79083f749ff55adb03c546c55-us14"
    // }

    // const request = https.request(url,options,function(response){
    //     response.on("data",function(data){
    //         console.log(JSON.parse(data));
    //     })
    // })

    // request.write(jsonData);
    // request.end();

});

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/fail", function(req, res){
    res.redirect("/")
})
// Heroku port listen(process.env.PORT, ) add or (process.env.PORT || 3000)
app.listen(3000, function(){
    console.log("Now serving port 3000...");
})

// API KEY 
// 2c6d3ea79083f749ff55adb03c546c55-us14
// ChimpMAil List ID
// e82f6569f1