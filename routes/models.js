var mongoose=require('mongoose');   //an object oriented document handler for mongodb

const ObjectId = mongoose.Schema.Types.ObjectId;     //to include ObjectId-an hash primary key

const Mixed = mongoose.Schema.Types.Mixed;      //to include datatype mixed for mixed type of data

var Schema=mongoose.Schema;     //for describing the schema of the models

var mongooseTypes = require("mongoose-types");      //special mongoose types

mongooseTypes.loadTypes(mongoose, "email");     //loading a special datatype which stores email

var Email = mongoose.SchemaTypes.Email;     //declaring email type

// any user can ask or reply to problems


let UserSchema=Schema(
	{
	firstname:{type:String},// to store name of the user
	lastname:{type:String},// to store name of the user
	username:{type:String},
	googleId:{type:String},	  
	password:{type:String}, // to store the password of the user
	email:{type:Email},   //to store the email of the user
    phoneNumber:String, //to store the phone number of the user
    joinDate:{type:Date,default:Date.now},  //to store the join date of the user
	lastSeen:{type:Date},// to record the date when user was last seen
	//aspirant:Boolean,// to know whether engineering exam aspirant or not.
    tutor:Boolean,// to save whether the user is a tutor or not
    rating:Number,// to store the rating of the tutor
    //ongoingChapters:[{type:ObjectId ,ref:'Chapter'}],// to store the chapters user is interested in
	//completedChapters:[{type: ObjectId, ref:'Chapter'}],// to store the chapters which a user is expert in
	notifications:[Mixed],
	//coachingInstitute:[String],
	college:String,
	//class:Number,
    profileImage:String,
	points:Number,
	description:String,
	following:[{type:ObjectId,ref:'Question'}],
	branch:{type:ObjectId,ref:'Branch'},
	_id: // primary key
		{ 
		type: ObjectId, 
		default: function() 
			{ 
		  	return new mongoose.Types.ObjectId() 
			} 
		},

	});

let SubjectSchema=Schema({
	_id:{
		type:ObjectId,
		default:function(){
			return new mongoose.Types.ObjectId()
		}
	},
	name:String,
	qnumber:Number
	//subjects:[{tpe:ObjectId,ref:'Subject'}]
})
let BranchSchema=Schema({
	_id:{
		type:ObjectId,
		default:function(){
			return new mongoose.Types.ObjectId()
		}
	},
	name:String,
	subjects:[{type:ObjectId,ref:'Subject'}]
})


/*
let ChapterSchema=Schema(
	{
		_id:
		{
			type:ObjectId,
			default:function()
			{
				return new mongoose.Types.ObjectId()
			}
		},
		name:String,
		subject:String,
	}
);
*/
/*
let TopicSchema=Schema(
	{
		_id:
		{
			type:ObjectId,
			default:function()
			{
				return new mongoose.Types.ObjectId()
			}
		},
		name:String,
		chapter:{type:ObjectId, ref:'Chapter'}
	}
);
*/
 
let QuestionSchema=Schema(
    {
    	_id: // primary key
		{ 
		type: ObjectId, 
		default: function() 
			{ 
		  	return new mongoose.Types.ObjectId() 
			} 
		},
		questionHeading:String,
		questionDescription:String,
		points:Number,
		views:Number,
		followers:Number,
		numAnswers:Number,
		attachments:[String],
		//topic:{type:ObjectId, ref:'Topic'},
        askedBy:{type: ObjectId, ref: 'User'},
		subject:{type: ObjectId, ref: 'Subject'},
		//chapter:{type:ObjectId,ref:'Chapter'},
		date:{type:Date,default:Date.now},
		datestring:String,
		isFollowed:{type:Boolean,default:false},
    }
);

QuestionSchema.index({
	questionDescription:'text',
	questionHeading:'text'
},{
	weights:{
		questionDescription:2,
		questionHeading:5,
	}
})
 
let AnswerSchema=Schema(
    {
    	_id: // primary key
		{ 
		type: ObjectId, 
		default: function() 
			{ 
		  	return new mongoose.Types.ObjectId() 
			} 
        },
        answer:String,
        givenBy:{type: ObjectId, ref: 'User'},
        upvotes:Number,
		downvotes:Number,
		attachments:[String],
		questionId:{type: ObjectId, ref: 'Question'},
		embededlinks:[String],
		date:{type:Date,default:Date.now},
		datestring:String,
    }
);

let ResetPasswordSchema = Schema({
    userId: String,
    status: Number,
	resetPasswordToken: String,
});


const User=mongoose.model('User',UserSchema);
const Answer=mongoose.model('Answer',AnswerSchema);
const Branch=mongoose.model('Branch',BranchSchema);
const Subject=mongoose.model('Subject',SubjectSchema);
const Question=mongoose.model('Question',QuestionSchema);
//const Chapter=mongoose.model('Chapter',ChapterSchema);
//const Topic=mongoose.model('Topic',TopicSchema);
const ResetPassword=mongoose.model('ResetPassword',ResetPasswordSchema)

module.exports.User=User;
module.exports.Answer=Answer;
module.exports.Question=Question;
module.exports.Branch=Branch;
module.exports.Subject=Subject;
module.exports.ResetPassword=ResetPassword;
