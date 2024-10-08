const express = require("express");
const Joi = require("joi");
const connection = require("../connection");
const router = express.Router();
require("dotenv").config();

const schema = Joi.object({
  nom_etab: Joi.string().min(2).required(),
  gouvernorat: Joi.string().required(),
});

router.post("/addetab", (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  let query = "SELECT nom_etab FROM etablissement WHERE nom_etab=?";
  connection.query(query, [value.nom_etab], (error, results) => {
    if (!error) {
      if (results.length <= 0) {
        query =
          "INSERT INTO etablissement(nom_etab, gouvernorat) VALUES (?, ?)";
        connection.query(
          query,
          [value.nom_etab, value.gouvernorat],
          (error, results) => {
            if (!error) {
              return res.status(200).json({ message: "success" });
            } else {
              res.status(500).json(error);
            }
          }
        );
      } else {
        return res.status(402).json({ message: "nom_etab exists." });
      }
    } else {
      res.status(500).json(error);
    }
  });
});

router.get("/getetab", (req, res) => {
  let query = "SELECT etab_id, nom_etab, gouvernorat FROM etablissement";
  connection.query(query, (err, results) => {
    if (!err) {
      res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

const schema1 = Joi.object({
  etab_id: Joi.number(),
  nom_etab: Joi.string().required(),
  gouvernorat: Joi.string().required(),
});

router.patch("/updateetab/:etab_id", (req, res) => {
  const etab_id = req.params.etab_id;
  const { error, value } = schema1.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  } else {
    const { nom_etab, gouvernorat } = value;
    let query =
      "UPDATE etablissement SET nom_etab=?, gouvernorat=? WHERE etab_id=?";
    connection.query(
      query,
      [nom_etab, gouvernorat, etab_id],
      (error, results) => {
        if (!error) {
          if (results.affectedRows > 0) {
            return res.status(200).json({ message: "success" });
          } else {
            return res.status(404).json({ message: "etab_id not found" });
          }
        } else {
          res.status(500).json(error);
        }
      }
    );
  }
});

router.delete("/deleteetab/:etab_id", (req, res) => {
  const etabId = req.params.etab_id;
  let query = "DELETE FROM etablissement WHERE etab_id=?";
  connection.query(query, [etabId], (error, results) => {
    if (!error) {
      if (results.affectedRows === 1) {
        return res.status(200).json({ message: "success" });
      } else {
        return res.status(404).json({ message: "etab_id not found" });
      }
    } else {
      res.status(500).json(error);
    }
  });
});

module.exports = router;
