const registerModel = require("../Model/RegisterSchema");
const operationModel = require("../Model/OperationSchema");
const { ObjectId } = require('mongoose').Types;


const calculateSalary = async (req, res) => {
    try {

        let {
            username,
            name,
            teaching_level,
            subject_teaching,
            extra_course_teaching,
            extra_period,
            salary_send_per_month,
            date
        } = req.body;


        const dateObject = new Date(date);

      
        date = new Date();
        date.setHours(0, 0, 0, 0);
        
        if (dateObject.setHours(0, 0, 0, 0) !== date.setHours(0, 0, 0, 0)) {
            return res.status(400).json({
                status: 400,
                message: "Invalid date. Operation not allowed. Date must be set to today.",
            });
        }

        if (salary_send_per_month <= 0 || extra_period < 0) {
            return res.status(400).json({
                status: 400,
                message: "Salary send per month and extra period must be greater than 0.",
            });
        }
        let bonus = 0;


        if (dateObject instanceof Date && !isNaN(dateObject) && dateObject.getMonth() === 5) {
            bonus = 15000;
        }


        let monthly_salary = 0;
        let allowance_received = 0;
        let allowance_deduction = 0;


        switch (teaching_level) {
            case "Pre-Primary":
                monthly_salary = 20000;
                break;
            case "Primary":
                monthly_salary = 35000;
                break;
            case "Lower Secondary":
                monthly_salary = 40000;
                break;
            case "Secondary":
                monthly_salary = 45000;
                break;
            // default: return res.status(400).json({
            //     status: 400,
            //     message: "Something is wrong with teaching level"
            // })


        }


        switch (extra_course_teaching) {
            case "Pre-Primary":
                extra_period_salary = (20000 / 30) * extra_period;
                break;
            case "Primary":
                extra_period_salary = (35000 / 30) * extra_period;
                break;
            case "Lower Secondary":
                extra_period_salary = (40000 / 30) * extra_period;
                break;
            case "Secondary":
                extra_period_salary = (45000 / 30) * extra_period;
                break;
            default:
                extra_period_salary = 0;

        }


        if (
            teaching_level === "Secondary" &&
            ["English", "Maths", "Science"].includes(subject_teaching)
        ) {
            allowance_received = 13500;
            allowance_deduction = allowance_received * 0.15;




            monthly_salary += allowance_received;
            monthly_salary -= allowance_deduction;

            monthly_salary = 45000;
        }

        if (teaching_level === 'Secondary') {
            total_salary_received =
                (monthly_salary * salary_send_per_month) -
                (monthly_salary * salary_send_per_month * 0.10) -  // government_tax
                (monthly_salary * salary_send_per_month * 0.01) -  // social_welfare
                (monthly_salary * salary_send_per_month * 0.01) -  // insurance
                allowance_deduction + allowance_received + (extra_period_salary * salary_send_per_month) + bonus;
        } else {

            total_salary_received =
                (monthly_salary * salary_send_per_month) -
                (monthly_salary * salary_send_per_month * 0.10) -  // government_tax
                (monthly_salary * salary_send_per_month * 0.01) -  // social_welfare
                (monthly_salary * salary_send_per_month * 0.01) +   // insurance
                (extra_period_salary * salary_send_per_month) + bonus;

        }

        const User = await registerModel.findOne({ username });
        if (User) {
            const operationResult = new operationModel({
                username,
                name,
                date,
                teaching_level,
                subject_teaching,
                salary_send_per_month,
                monthly_salary: monthly_salary * salary_send_per_month,
                government_tax: monthly_salary * salary_send_per_month * 0.10,
                social_welfare: monthly_salary * salary_send_per_month * 0.01,
                extra_period_salary,
                extra_period,
                bonus,
                extra_course_teaching,
                allowance_received,
                allowance_deduction,
                insurance: monthly_salary * salary_send_per_month * 0.01,
                total_salary_received,
            });
            console.log(User);
            

            await operationResult.save();
        } else {
            return res.status(400).json({ error: "you are not registered" })
        }


        return res.status(200).json({
            status: 200,
            message: "User exists",
            data: {

                monthly_salary: monthly_salary * salary_send_per_month,
                government_tax: monthly_salary * salary_send_per_month * 0.10,
                social_welfare: monthly_salary * salary_send_per_month * 0.01,
                allowance_received,
                bonus,
                allowance_deduction,
                extra_period_salary: extra_period_salary * extra_period,
                insurance: monthly_salary * salary_send_per_month * 0.01,
                total_salary_received,
            },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


const getAllSalaries = async (req, res) => {
    try {
        const { username} = req.params;
        const allUsers = await operationModel.find({ username });

        return res.status(200).json({ status: 200, data: allUsers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};








//for Pie chart

const getSalariesByLevel = async (req, res) => {
    try {
        const salaries = await operationModel.aggregate([
            {
                $group: {
                    _id: {
                        username: '$username',
                        teaching_level: '$teaching_level'
                    }
                }
            },
            {
                $group: {
                    _id: '$_id.teaching_level',
                    count: { $sum: 1 }
                }
            }
        ]);

        if (!salaries || salaries.length === 0) {
            return res.status(404).json({ message: 'Salaries not found for the provided criteria' });
        }

        const pieChartData = salaries.map(salary => ({
            label: salary._id,
            value: salary.count
        }));

        res.status(200).json({ status: 200, data: pieChartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};








// GET method to retrieve an individual record
const getSalaryByName = async (req, res) => {
    try {
        const { username, name, objectId } = req.params;

        if (!ObjectId.isValid(objectId)) {
            return res.status(400).json({ status: 400, message: "Invalid objectId format" });
        }

        const salary = await operationModel.findOne({
            _id: new ObjectId(objectId),
            username: username,
            name: name
        });

        if (!salary) {
            return res.status(404).json({ status: 404, message: "Salary not found" });
        }

        res.status(200).json({ status: 200, data: salary });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



// PATCH method to update an individual record
const updateSalary = async (req, res) => {
    try {
        let {

            teaching_level,
            subject_teaching,
            salary_send_per_month,
            extra_course_teaching,
            extra_period,
            date,
            extra_period_salary,
        } = req.body;

        const { username, name, objectId } = req.params;

        //const operationObjectId = new ObjectId(objectId);

        if (salary_send_per_month <= 0 || extra_period < 0) {
            return res.status(400).json({
                status: 400,
                message: "Salary send per month and extra period must be greater than 0.",
            });
        }

        let monthly_salary = 0;
        let allowance_received = 0;
        let allowance_deduction = 0;
        let total_salary_received = 0;
        let bonus = 0;


        const dateObject = new Date(date);

        if (dateObject instanceof Date && !isNaN(dateObject) && dateObject.getMonth() === 5) {
            bonus = 15000;
        }

        switch (teaching_level) {
            case "Pre-Primary":
                monthly_salary = 20000;
                break;
            case "Primary":
                monthly_salary = 35000;
                break;
            case "Lower Secondary":
                monthly_salary = 40000;
                break;
            case "Secondary":
                monthly_salary = 45000;
                break;


        }

        switch (extra_course_teaching) {
            case "Pre-Primary":
                extra_period_salary = (20000 / 30) * extra_period;
                break;
            case "Primary":
                extra_period_salary = (35000 / 30) * extra_period;
                break;
            case "Lower Secondary":
                extra_period_salary = (40000 / 30) * extra_period;
                break;
            case "Secondary":
                extra_period_salary = (45000 / 30) * extra_period;
                break;
            default:
                extra_period_salary = 0;

        }

        if (
            teaching_level === "Secondary" &&
            ["English", "Maths", "Science"].includes(subject_teaching)
        ) {
            allowance_received = 13500;
            allowance_deduction = allowance_received * 0.15;




            monthly_salary += allowance_received;
            monthly_salary -= allowance_deduction;

            monthly_salary = 45000;
        }


        if (teaching_level === 'Secondary') {
            total_salary_received =
                (monthly_salary * salary_send_per_month) -
                (monthly_salary * salary_send_per_month * 0.10) -  // government_tax
                (monthly_salary * salary_send_per_month * 0.01) -  // social_welfare
                (monthly_salary * salary_send_per_month * 0.01) -  // insurance
                allowance_deduction + allowance_received + (extra_period_salary * salary_send_per_month) + bonus;
        } else {

            total_salary_received =
                (monthly_salary * salary_send_per_month) -
                (monthly_salary * salary_send_per_month * 0.10) -  // government_tax
                (monthly_salary * salary_send_per_month * 0.01) -  // social_welfare
                (monthly_salary * salary_send_per_month * 0.01) +   // insurance
                (extra_period_salary * salary_send_per_month) + bonus;

        }

        const User = await registerModel.findOne({ username });
        if (User) {
            const operationResult = await operationModel.findOneAndUpdate(
                { _id: new ObjectId(objectId), username },
                {
                    username,
                    name,
                    date,
                    teaching_level,
                    subject_teaching,
                    salary_send_per_month,
                    monthly_salary: monthly_salary * salary_send_per_month,
                    government_tax: monthly_salary * salary_send_per_month * 0.10,
                    social_welfare: monthly_salary * salary_send_per_month * 0.01,
                    extra_period_salary,
                    extra_period,
                    bonus,
                    extra_course_teaching,
                    allowance_received,
                    allowance_deduction,
                    insurance: monthly_salary * salary_send_per_month * 0.01,
                    total_salary_received,
                },

                { new: true }

            );

            if (!operationResult) {
                return res.status(404).json({ error: "Operation not found" });
            }
        } else {
            return res.status(400).json({ error: "You are not registered" });
        }

        return res.status(200).json({
            status: 200,
            message: "Operation updated successfully",
            data: {
                monthly_salary: monthly_salary * salary_send_per_month,
                government_tax: monthly_salary * salary_send_per_month * 0.10,
                social_welfare: monthly_salary * salary_send_per_month * 0.01,
                allowance_received,
                allowance_deduction,
                extra_period_salary: extra_period_salary * extra_period,
                bonus,
                insurance: monthly_salary * salary_send_per_month * 0.01,
                total_salary_received,
            },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    calculateSalary,
    getAllSalaries,
    getSalaryByName,
    getSalariesByLevel,
    updateSalary
};



