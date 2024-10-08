const express = require("express");
const Joi = require("joi");
const connection = require("../connection");
const router = express.Router();
require("dotenv").config();

router.get("/getallmas", (req, res) => {
  let query = "SELECT * FROM cours_master ORDER BY etablissement;";
  connection.query(query, (err, results) => {
    if (!err) {
      res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/getmas/:cm_id", (req, res) => {
  const cm_id = req.params.cm_id;
  let query = "SELECT nom_m FROM cours_master Where cm_id=?;";
  connection.query(query, [cm_id], (err, results) => {
    if (!err) {
      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res.status(404).json({ message: "masters not found" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
