const mongoose=require("mongoose");
const OperationSchema= new mongoose.Schema({
    username:{
        type:String
    },
    name:{
        type:String,
        
    },
    teaching_level: {
        type: 'string',
        required: true,
        enum: ['Pre-Primary', 'Primary', 'Lower Secondary', 'Secondary'],
    },
    subject_teaching: {
        type: 'string',
        required: true,
        enum: ['English', 'Maths', 'Science', 'Social', 'Account', 'Economics', 'Nepali'],
    },
    extra_course_teaching: {
        type: 'string',
        required:true,
        enum: ['Pre-Primary', 'Primary', 'Lower Secondary', 'Secondary', 'None'],
        default:"None"
    },
    monthly_salary: {
        type: 'number',
        required: true,
    },
    
    salary_send_per_month: {
        type: 'number',
        required: true,
    },
    extra_period: {
        type: 'number',
    },

    extra_period_salary:{
        type: 'number',
        required: true,
    },

    date:{
        type:'date',
        require:true
    },
    government_tax: {
        type: 'number',
    },
    social_welfare: {
        type: 'number',
    },
    allowance_received: {
        type: 'number',
    },
    allowance_deduction: {
        type: 'number',
    },
    insurance: {
        type: 'number',
    },
    total_salary_received: {
        type: 'number',
        readOnly: true,
    },
    bonus:{
        type:'number'
    }
    



   
})



const Operation=new mongoose.model("operation",OperationSchema);
module.exports=Operation;




