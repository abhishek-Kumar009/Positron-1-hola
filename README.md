# Positron

This is the main repository for our website as well as our app.

### Guidelines
* We have 2 main branches: master and production. 
* production will be used to host our final website while all commits will be made to master **through pull requests only**.
* To add a new feature, create a new branch, commit the relevant changes and make a pull request to master, the 
  request will be merged with master after approval / discussion. Click [here](https://guides.github.com/introduction/flow/) to know more.
* Please use a requirements file to specify the libraries used along with their versions

Please update this README with the instructions relevant to deploying and / or running your projects.


Documentation:

***************************************************************************************************
***************************************************************************************************

General points:

***************************************************************************************************

1. All the static html should be placed inside the views folder.
The static html file contains
i. The home page:- page after login
ii. The index page:- landing page
iii. The signup page:- page for new user signup
iv. The login page:- page for login where local login and google authentication would be present.
v. The forgot-password page:- for entering the new password
vi.The reset-password page:- for entering the email of which to reset password.
vii. The data of chapters and topics need to be fed into the system.
viii. Schema of the Questions,Answers etc must be refered to know the format of response. Only Userinfo restricts the fields.

****************************************************************************************************

DOCUMENTATION OF THE SIGNUP ROUTE
****************************************************************************************************

route: domainName/signup

get request to get the initial signup page

then post request on the same domain to pass to body of the form

firstname will be the name of field containing first name
lastname will be the name of field containing last name
username will be the name of field contaiing username
email will be the name of the field containing email
password will be the name of the field containing password
confirmation_password will be  the name of the field containing confirmation password.
aspirant value can be yes or no.

The api validated the various field entered and will return a list of errors as a response if there is an error.
It will check whether the password is minimum 8 characters or not.
Whether someone with same username is registered or not.
Whether the username field is empty or not
Email is valid email or not
First name and Lastname is empty or not.
username, firstname, lastname, email is Ascii or not

Then it will sanitize the data to prevent any attack
Like trimming unnecessary whitespaces
Escaping the suspicious characters.

Finally the user will be registered and redirected to chapter selection route itself based on whether aspirant or not.

********************************************************************************************************

API DOCUMENTATION TRENDING QUESTIONS

********************************************************************************************************
route: domainName/trending

will return list of 20 questions in same format as descibed in the schema containing:

    	_id: // primary key
		question:String,
		points:Number,
		views:Number,
		numAnswers:Number,
        askedBy:{type: ObjectId, ref: 'User'},
		subject:String,
		chapter:{type:ObjectId,ref:'Subject'},
    
these 20 questions are randomized and always chosen amongst the top 20% questions based on total views.

further update will have this top 20% chosen based on view of this week only.

each time this route will return a random set of questions when requested.

********************************************************************************************************

API DOCUMENTATION OF ADD QUESTION

************************************************************************************************************

route:domainName/add-question

The form submitted should be of of type multipart

attachments:- field name for attachments uploaded
questionHeading:- field name for the main heading of the question
questionDescription:- field name for the full description of the question.
topic:- field name for the topic id of the selected topic
subject:- field name for the subject name of the added question
chapter:- field name for the chapter id of the added question


validation for empty fields must be done on client side.

server side code just sanitizes the data entered.

The attachments would be stored on the server side within a folder named questionAttachments

if any error present will provide the necessary status and response

*********************************************************************************************************

API Documentation for addAnswer

********************************************************************************************************
route:domainName/post-answer/questionID
questionID:- ID of the question being answered.

answer:- field name for the answer given.
attachments:- field name for the attachments provided.
embededlinks:- array of embeded links in the request body.

The attachments would be stored on the server side within a folder named answerAttachments

validation done for answers field where answer must be non empty.

server side sanitation code present.

if any error present will provide the necessary status and response

********************************************************************************************************

API FOR QUESTIONS FOR WHICH ANSWERS ARE REQUESTED

*******************************************************************************************************

route: domainname/answer-requested

will return the questions for which the answers are requested.
the fields sent can be changed after integration.

*******************************************************************************************************

API TO GET THE ANSWERS FOR A QUESTION

********************************************************************************************************

route:- domainname/answer-of-question/:questionId

returns an object with question under question field name and list of answers under answers field name

****************************************************************************************************

API FOR ADDING ONGOING CHAPTERS

********************************************************************************************************

route: 'domainname/add-ongoing-chapters'

fieldname......what the contain.

mathematics.......ongoing chapter id of mathematics.
physics...........ongoing chapter id of physics.
chemistry...........ongoing chapter id of chemistry.

user must be logged in before adding ongoing chapters.

so after signup form post the user is autmatically logged in and sent to a page "add_ongoing_data.html" where you can post request to this route.

thus adding ongoing chapters would be the next step of signup.

**********************************************************************************************************

API FOR CHAPTERS

*********************************************************************************************************

route:- domainname/chapters/:subject_name
:subject name can be either

mathematics
physics
chemistry

returns an array of chapters with their corresponding names

************************************************************************************************************

API FOR TOPICS

******************************************************************************************************

route:- domainname/topics

returns an array fo topics with their corresponding names

*********************************************************************************************************

API FOR LOGIN

*********************************************************************************************************

route:- domainname/auth/login

username-field name for username
password-field name for password

get request to display the page

*********************************************************************************************************

API FOR LOGIN LOCAL

*********************************************************************************************************

route:- domainname/auth/local
content type:- application/{url-encoded data}

post request of the login form

**********************************************************************************************************

API  FOR GOOGLE AUTH

***********************************************************************************************************

route:- domainname/auth/google

**********************************************************************************************************

API FOR USERINFO

router:- domainname/userinfo/userid

to get basic information about a user whose userid is mentioned

                firstname,// to store name of the user
                lastname,
		        username,
                rating,
                points,
                profileImage,
                description

**********************************************************************************************************

API for adding data

**********************************************************************************************************

content-type is ure-encoded


route:- domainname/addChapter
to add Chapter

name:- name of chapter
subject_name:- field name containing the name of the subject to which the chapter belongs

route:- domainname/addTopic

name:- field name of the field containing name of topic
chapter_name:- field name containing the name of the topic to which the chapter belongs

**********************************************************************************************************

API FOR RESET PASSWORD

*********************************************************************************************************
 
 route:- reset-password
 request type:-post
 route for delivering the page taking email as input

 route:- reset-password
 request type:- post

 email:- fieldname containing the email of the user.

 if response status =200 
 the recovery mail sent
 else
 error

 route:- /reset/:userid/:token

 the link sent in the mail

 when user clicks it 

 a forgot-password.html file is delivered
 password field- for getting the new user password.
 it contains a submit button to post request on the same url

 post request content type:- urlencoded

 password when updated will route to login page.

********************************************************************************************************

API FOR SEARCHING QUESTION

**********************************************************************************************************

route: domainname/search?text=string entered here;

request type : get

returns 10 questions without topic,chapter name in the response.

********************************************************************************************************

API FOR UPVOTE

*********************************************************************************************************

route: domainname/upvote/answerid

request type get

returns error if any problem otherwise a string with status 200.

********************************************************************************************************

API FOR DOWNVOTE

*********************************************************************************************************

route: domainname/downvote/answerid

request type get

returns error if any problem otherwise a string with status 200.

*********************************************************************************************************

API FOR ADDING FOLLOWING

*********************************************************************************************************

route: domainname/add-following/question_id

request type: get

requires user to be logged in

adds the number of followers for the question and the question as to be followed by user

**********************************************************************************************************

API FOR CLEARING DATA

route: domainname/clear_questions
route: domainname/clear_users
route: domainname/clear_answers

request type : get


***********************************************************************************************************

API FOR UNFOLLOWING A QUESTION
*********************************************************************************************************

route: domainname/add-unfollowing/question_id

request type: get

requires user to be logged in

decrement the number of followers for the question and the question as to be unfollowed by user

**********************************************************************************************************

