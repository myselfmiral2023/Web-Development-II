import jwt from "jsonwebtoken";
import { Vehicle } from "../models/vehicle.model.js";

const create = (req, res) => {
    const {authorization} = req.headers;
  if (!authorization) return res.status(401).json("Not authenticated!");
    const token = authorization.replace("Bearer ", "");
    
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

        // Validate request
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        // Create a Vehicle
        const vehicle = new Vehicle({
            name: req.body.name,
            company: req.body.company,           
            perdayrent: req.body.perdayrent,
            vehicletypeid: req.body.vehicletypeid,
            createdAt: new Date()
        });

        // Save Vehicle in the database
        Vehicle.create(vehicle, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Vehicle."
                });
            } else {
                res.status(201).json(data);
            }
        });
    });
};

const findAll = (req, res) => {
    
const {authorization} = req.headers;
if (!authorization) return res.status(401).json("Not authenticated!");
const token = authorization.replace("Bearer ", "");

if (!token) return res.status(401).json("Not authenticated!");

jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
  if (err) return res.status(403).json("Token is not valid!");

        // Extract the vehicletype parameter from the request
        const vehicletype = req.params.vehicletype || "";
        Vehicle.getAll(vehicletype, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving Vehicles."
                });
            } else {
                res.json(data);
            }
        });
    });
};

const findAllAvailable = (req, res) => {
    const {authorization} = req.headers;
    if (!authorization) return res.status(401).json("Not authenticated!");
      const token = authorization.replace("Bearer ", "");
      
      if (!token) return res.status(401).json("Not authenticated!");
  
      jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        // Extract the vehicletype parameter from the request
        const startDate = req.params.startDate; // Access startDate from the route path
        const endDate = req.params.endDate; 
        Vehicle.getAllAvailable(startDate, endDate, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.error || "Some error occurred while retrieving available Vehicles."
                });
            } else {
                res.json(data);
            }
        });
    });
};
export const findOneAvailable = (req, res) => {
    console.log("find one available reached")
    const {authorization} = req.headers;
    if (!authorization) return res.status(401).json("Not authenticated!");
      const token = authorization.replace("Bearer ", "");
      
      if (!token) return res.status(401).json("Not authenticated!");
  
      jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        // Extract the vehicletype parameter from the request
        const startDate = req.params.startDate; // Access startDate from the route path
        const endDate = req.params.endDate; 
        const id = req.params.id
        Vehicle.findOneAvailable(startDate, endDate, id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.error || "Some error occurred while retrieving vehicle availability."
                });
            } else {
                res.json(data);
            }
        });
    });
};

const findOne = (req, res) => {
    const {authorization} = req.headers;
    if (!authorization) return res.status(401).json("Not authenticated!");
    const token = authorization.replace("Bearer ", "");
    
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

        Vehicle.findById(req.params.id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Vehicle with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error retrieving Vehicle with id " + req.params.id
                    });
                }
            } else {
                res.status(200).json(data);
            }
        });
    });
};

const update = (req, res) => {

   

    const {authorization} = req.headers;
  if (!authorization) return res.status(401).json("Not authenticated!");
    const token = authorization.replace("Bearer ", "");
    
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

        // Validate Request
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        Vehicle.updateById(
            req.params.id,
            new Vehicle(req.body),
            (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Not found Vehicle with id ${req.params.id}.`
                        });
                    } else {
                        res.status(500).send({
                            message: "Error updating Vehicle with id " + req.params.id
                        });
                    }
                } else {
                    res.status(200).send({ message: "Vehicle profile has been updated" });
                }
            }
        );
    });
};

const remove = (req, res) => {
    
    const {authorization} = req.headers;
    if (!authorization) return res.status(401).json("Not authenticated!");
    const token = authorization.replace("Bearer ", "");
    
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

        Vehicle.remove(req.params.id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Vehicle with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Could not delete Vehicle with id " + req.params.id
                    });
                }
            } else {
                res.status(200).send({ message: "vehicle has been deleted" });
            }
        });
    });
};

export { create, findAll, findOne, update, remove, findAllAvailable };
