import jwt from "jsonwebtoken";
import { VehicleType } from "../models/vehicletype.model.js";

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

        // Create a VehicleType
        const vehicletype = new VehicleType({
            id: req.body.id, // Assuming you have an id field in your request
            typename: req.body.typename,
            year: req.body.year,
            img: req.body.img
        });

        // Save VehicleType in the database
        VehicleType.create(vehicletype, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the VehicleType."
                });
            } else {
                res.status(201).json(data);
            }
        });
    });
};

const findAll = (req, res) => {
    // const token = req.cookies.access_token;
    const {authorization} = req.headers;
    if (!authorization) return res.status(401).json("Not authenticated!");
      const token = authorization.replace("Bearer ", "");
      
      if (!token) return res.status(401).json("Not authenticated!");
  
      jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const typename = req.params.typename || "";
        const year = req.params.year || "";
        VehicleType.getAll(typename, year,(err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving VehicleTypes."
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

        VehicleType.findById(req.params.id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found VehicleType with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error retrieving VehicleType with id " + req.params.id
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

        VehicleType.updateById(
            req.params.id,
            new VehicleType(req.body),
            (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Not found VehicleType with id ${req.params.id}.`
                        });
                    } else {
                        res.status(500).send({
                            message: "Error updating VehicleType with id " + req.params.id
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

        VehicleType.remove(req.params.id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found VehicleType with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Could not delete VehicleType with id " + req.params.id
                    });
                }
            } else {
                res.status(200).send({ message: true });
            }
        });
    });
};

export { create, findAll, findOne, update, remove };
