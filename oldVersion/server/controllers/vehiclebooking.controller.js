import jwt from "jsonwebtoken";
import { VehicleBooking } from "../models/vehiclebooking.model.js";

const create = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_KEY, (err) => {
        if (err) return res.status(403).json("Token is not valid!");

        // Validate request
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        // Create a VehicleBooking
        const vehicleBooking = new VehicleBooking({
            userid: req.body.userid,
            vehicleid: req.body.vehicleid,
            startdate: req.body.startdate,
            enddate: req.body.enddate,
            bookingdate: req.body.bookingdate,
            cost: req.body.cost
        });

        // Save VehicleBooking in the database
        VehicleBooking.create(vehicleBooking, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the VehicleBooking."
                });
            } else {
                res.status(201).json(data);
            }
        });
    });
};

const findAll = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_KEY, (err) => {
        if (err) return res.status(403).json("Token is not valid!");

        // Extract the userid and bookingid parameters from the request
        const userid = req.params.userid || "";
        const vehicleid = req.params.vehicleid || "";

        VehicleBooking.getAll(userid, vehicleid, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving VehicleBookings."
                });
            } else {
                res.json(data);
            }
        });
    });
};

const findOne = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_KEY, (err) => {
        if (err) return res.status(403).json("Token is not valid!");

        VehicleBooking.findById(req.params.id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found VehicleBooking with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error retrieving VehicleBooking with id " + req.params.id
                    });
                }
            } else {
                res.status(200).json(data);
            }
        });
    });
};

const update = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_KEY, (err) => {
        if (err) return res.status(403).json("Token is not valid!");

        // Validate Request
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        VehicleBooking.updateById(
            req.params.id,
            new VehicleBooking(req.body),
            (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Not found VehicleBooking with id ${req.params.id}.`
                        });
                    } else {
                        res.status(500).send({
                            message: "Error updating VehicleBooking with id " + req.params.id
                        });
                    }
                } else {
                    res.status(200).send({ message: true });
                }
            }
        );
    });
};

const remove = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_KEY, (err) => {
        if (err) return res.status(403).json("Token is not valid!");

        VehicleBooking.remove(req.params.id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found VehicleBooking with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Could not delete VehicleBooking with id " + req.params.id
                    });
                }
            } else {
                res.status(200).send({ message: true });
            }
        });
    });
};

export { create, findAll, findOne, update, remove };
