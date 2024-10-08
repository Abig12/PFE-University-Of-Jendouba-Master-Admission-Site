const express = require("express");
const Joi = require("joi");
const connection = require("../connection");
const router = express.Router();
require("dotenv").config();

router.get("/getagentetab/:user_id", (req, res) => {
  let query =
    "SELECT e.etablissement FROM users u INNER JOIN agents e ON u.user_id = e.user_id WHERE u.user_id=? AND u.role='agentees';";
  connection.query(query, [req.params.user_id], (err, results) => {
    if (!err) {
      res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

const schema = Joi.object({
  nom_m: Joi.string().min(4).required().messages({
    "string.base": "Nom doit être une chaîne de caractères",
    "string.empty": "Nom ne peut pas être vide",
    "string.min": "Nom doit contenir au moins {#limit} caractères",
    "any.required": "Nom est requis",
  }),
  date_o: Joi.date().required().messages({
    "date.base": "Date doit être une date valide",
    "any.required": "Date est requise",
  }),
  date_f: Joi.date().required().messages({
    "date.base": "Date doit être une date valide",
    "any.required": "Date est requise",
  }),

  details: Joi.string().required().messages({
    "string.base": "Détails doivent être une chaîne de caractères",
    "any.required": "details est requis",
  }),
});

router.post("/addmastercours/:etablissement", (req, res) => {
  const etablissement = req.params.etablissement;
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { nom_m, date_o, date_f, details } = value;

  let query = "SELECT  nom_m FROM cours_master WHERE nom_m=? ;";
  connection.query(query, [nom_m], (error, results) => {
    if (!error) {
      if (results.length <= 0) {
        query =
          "INSERT INTO cours_master ( etablissement, nom_m, date_o, date_f, details) VALUES (?, ?, ?, ?, ?)";
        connection.query(
          query,
          [etablissement, nom_m, date_o, date_f, details],
          (error, results) => {
            if (!error) {
              return res
                .status(200)
                .json({ message: "master cours inserted successfully." });
            } else {
              res.status(500).json(error);
            }
          }
        );
      } else {
        return res.status(402).json({ message: "nom_m exists." });
      }
    } else {
      res.status(500).json(error);
    }
  });
});

router.get("/getmas/:etablissement", (req, res) => {
  const etablissement = req.params.etablissement;
  let query =
    "SELECT cm_id, nom_m, DATE_FORMAT(date_o,'%Y-%m-%d') as date_o, DATE_FORMAT(date_f,'%Y-%m-%d') as date_f, etablissement, details FROM cours_master WHERE etablissement = ?;";
  connection.query(query, [etablissement], (err, results) => {
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

const schema1 = Joi.object({
  nom_m: Joi.string().min(4).required().messages({
    "string.base": "Nom doit être une chaîne de caractères",
    "string.empty": "Nom ne peut pas être vide",
    "string.min": "Nom doit contenir au moins {#limit} caractères",
    "any.required": "Nom est requis",
  }),
  date_o: Joi.date().required().messages({
    "date.base": "Date doit être une date valide",
    "any.required": "Date est requise",
  }),
  date_f: Joi.date().required().messages({
    "date.base": "Date doit être une date valide",
    "any.required": "Date est requise",
  }),

  details: Joi.string().required().messages({
    "string.base": "Détails doivent être une chaîne de caractères",
    "any.required": "details est requis",
  }),
});

router.patch("/updatemas/:cm_id", (req, res) => {
  const cm_id = req.params.cm_id; // <-- use params.etablissement here
  const { error, value } = schema1.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { nom_m, date_o, date_f, details } = value;
  const query = `UPDATE cours_master 
                        SET nom_m=?, date_o=?, date_f=?, details=? 
                        WHERE cm_id=? `;

  connection.query(
    query,
    [nom_m, date_o, date_f, details, cm_id], // <-- pass etablissement as a parameter here
    (err, results) => {
      if (!err) {
        if (results.affectedRows > 0) {
          res.status(200).json({ message: "master updated successfully" });
        } else {
          res.status(404).json({ message: "master not found" });
        }
      } else {
        res.status(500).json(err);
      }
    }
  );
});

router.delete("/deletemas/:cm_id", (req, res) => {
  const cm_id = req.params.cm_id;
  const query = "DELETE FROM cours_master  WHERE cm_id = ?";

  connection.query(query, [cm_id], (err, results) => {
    if (!err) {
      if (results.affectedRows > 0) {
        res.status(200).json({ message: "master deleted successfully" });
      } else {
        res.status(404).json({ message: "master not found" });
      }
    } else {
      res.status(500).json(err);
    }
  });
});

module.exports = router;
