import jwt from "jsonwebtoken";
import { Review } from "../models/review.model.js";

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

        // Create a Review
        const review = new Review({
            userid: req.body.userid,
            bookingid: req.body.bookingid,
            comments: req.body.comments,
            stars: req.body.stars
        });

        // Save Review in the database
        Review.create(review, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Review."
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
    const token = authorization.replace("Bearer ", "");
    
    
    if (!authorization || !token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_KEY, (err) => {
        if (err) return res.status(403).json("Token is not valid!"+ err);

        //Fetching by foreign key
    // Extract the vehicletype parameter from the request
    const userid = req.params.userid || "";
    const bookingid = req.params.bookingid || "";
        Review.getAll(userid, bookingid, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving Reviews."
                });
            } else {
                res.json(data);
            }
        });
    }
    );
};

const findOne = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_KEY, (err) => {
        if (err) return res.status(403).json("Token is not valid!");

        Review.findById(req.params.id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Review with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error retrieving Review with id " + req.params.id
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

        Review.updateById(
            req.params.id,
            new Review(req.body),
            (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Not found Review with id ${req.params.id}.`
                        });
                    } else {
                        res.status(500).send({
                            message: "Error updating Review with id " + req.params.id
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

    jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        Review.remove(req.params.id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Review with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Could not delete Review with id " + req.params.id
                    });
                }
            } else {
                res.status(200).send({ message: true });
            }
        });
    });
};

export { create, findAll, findOne, update, remove };
