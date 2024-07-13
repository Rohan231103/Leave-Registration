const express = require('express');
const moment = require('moment');
const Leave = require('../model/LeaveModel');
const leaveValidate = require('../validation/Leave.validation');


exports.leaveReg = async (req, res) => {
    try {
        const { error, value } = leaveValidate.leaveValidationSchema.validate(req.body);

        if (error) {
            return res.status(422).json({
                error: error.details[0].message
            })
        }

        const { CurrentDate, title, Description, LeaveDate } = value;

        const userId = req.userData.userId;
    
        const startDate = moment(CurrentDate).startOf('day').toDate();
        const endDate = moment(LeaveDate).endOf('day').toDate();

        const Record = await Leave.findOne({
            userId: userId,
            $or: [
                { CurrentDate: { $lte: endDate, $gte: startDate } },
                { LeaveDate: { $lte: endDate, $gte: startDate } },
                { CurrentDate: { $lte: startDate }, LeaveDate: { $gte: endDate } }
            ] 
        })
        if (Record) {
            return res.status(422).json({
                error: "You already have leave scheduled for this date range."
            });
        }

        const leaveDateIST = moment(LeaveDate).format('YYYY-MM-DD');
        const data = await Leave.create({
            CurrentDate,
            title,
            Description,
            LeaveDate,
            status: "Active",
            userId: userId
        });
     
        res.status(201).json({
            message: "Leave record saved successfully",
            data
        })
    } catch (error) {
        res.status(500).json({
            error: "Server Error",
            message: error.message
        })
    }
}


exports.UpdateLeave = async (req, res) => {
    try {
        const { error, value } = leaveValidate.UpdateValidationSchema.validate(req.body);
        if (error) {
            console.log(error)
            return res.status(422).json({
                error: error.details[0].message
            })
        }

        const { title, Description, LeaveDate } = value;

        const leaveId = req.params.id;
        console.log(leaveId);
        const leave = await Leave.findById(leaveId);

        if (!leave) {
            return res.status(404).json({
                error: "Leave Not Found"
            })
        }

        const leaveUpdate = await Leave.findByIdAndUpdate(
            leaveId,
            { ...value },
            { new: true }
        )
        console.log(leaveUpdate);
        return res.status(200).json({
            message: "Leave Updated !"
        })
    } catch (error) {
        res.status(500).json({
            error: "server error",
            message: error.message
        })
    }
}

exports.getLeave = async (req, res) => {
    try {
        const leaveId = req.params._id;
        const data = await Leave.find(leaveId);

        res.status(200).json({
            data
        })
    } catch (error) {
        res.status(500).json({
            error: "server error",
            message: error.message
        })
    }
}

exports.cancleLeave = async (req, res) => {
    try {
        const leaveId = req.params.id;

        const data = await Leave.findById(leaveId);
        
        if (!data) {
            res.status(404).json({
                error: "Leave Not Found"
            })
        }

        const leaveCancle = await Leave.findByIdAndUpdate(leaveId, {
            status: "Decline"
        })
        console.log(leaveCancle)
        res.status(200).json({
            leaveCancle
        })
    } catch (error) {
        res.status(500).json({
            error: "server error",
            message: error.message
        })
    }
}