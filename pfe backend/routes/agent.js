const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const connection = require("../connection");
const router = express.Router();
require("dotenv").config();

const schema = Joi.object({
  nom: Joi.string().min(2).required().messages({
    "string.base": "Le nom doit être une chaîne de caractères.",
    "string.empty": "Le nom ne doit pas être vide.",
    "string.min": "Le nom doit avoir au moins {#limit} caractères.",
    "any.required": "Le nom est obligatoire.",
  }),
  prenom: Joi.string().min(2).required().messages({
    "string.base": "Le prénom doit être une chaîne de caractères.",
    "string.empty": "Le prénom ne doit pas être vide.",
    "string.min": "Le prénom doit avoir au moins {#limit} caractères.",
    "any.required": "Le prénom est obligatoire.",
  }),
  email: Joi.string()
    .email()
    .required()
    .regex(/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/)
    .messages({
      "string.base": "L'adresse email doit être une chaîne de caractères.",
      "string.empty": "L'adresse email ne doit pas être vide.",
      "string.email": "L'adresse email doit être valide.",
      "string.pattern.base": "L'adresse email doit être valide.",
      "any.required": "L'adresse email est obligatoire.",
    }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Le mot de passe doit être une chaîne de caractères.",
    "string.empty": "Le mot de passe ne doit pas être vide.",
    "string.min": "Le mot de passe doit avoir au moins {#limit} caractères.",
    "any.required": "Le mot de passe est obligatoire.",
  }),
  telephone: Joi.number().min(8).required().messages({
    "number.base": "Le numéro de téléphone doit être un nombre.",
    "number.empty": "Le numéro de téléphone ne doit pas être vide.",
    "number.min":
      "Le numéro de téléphone doit avoir au moins {#limit} chiffres.",
    "any.required": "Le numéro de téléphone est obligatoire.",
  }),
  passport_cin: Joi.number().min(8).required().messages({
    "number.base": "Le passeport/CIN doit être une chaîne de nombre.",
    "number.empty": "Le passeport/CIN ne doit pas être vide.",
    "number.min": "Le passeport/CIN doit avoir au moins {#limit} chiffres.",
    "any.required": "Le passeport/CIN est obligatoire.",
  }),
  sexe: Joi.string().required().messages({
    "string.base": "Le sexe doit être une chaîne de caractères.",
    "string.empty": "Le sexe ne doit pas être vide.",
    "any.required": "Le sexe est obligatoire.",
  }),
  etablissement: Joi.string().required().messages({
    "string.empty": "L'etablissement ne doit pas être vide.",
    "any.required": "L'etablissement est obligatoire.",
  }),
});

router.post("/addagent", (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  } else {
    let query = "SELECT email, password FROM users WHERE email=?";
    connection.query(query, [value.email], (error, results) => {
      if (!error) {
        if (results.length <= 0) {
          // Check if passport_cin already exists in the database
          query = "SELECT passport_cin FROM users WHERE passport_cin=?";
          connection.query(query, [value.passport_cin], (error, results) => {
            if (!error) {
              if (results.length <= 0) {
                bcrypt.hash(value.password, 10, (error, hashedPassword) => {
                  if (error) {
                    res.status(500).json(error);
                  } else {
                    query =
                      "INSERT INTO users(nom, prenom, email, password, telephone, passport_cin, sexe, role) VALUES (?, ?, ?, ?, ?, ?, ?, 'agentees')";
                    connection.query(
                      query,
                      [
                        value.nom,
                        value.prenom,
                        value.email,
                        hashedPassword,
                        value.telephone,
                        value.passport_cin,
                        value.sexe,
                      ],
                      (error, results) => {
                        if (!error) {
                          const user_id = results.insertId;
                          query =
                            "INSERT INTO agents(etablissement, user_id) VALUES ( ?, ?)";
                          connection.query(
                            query,
                            [value.etablissement, user_id],
                            (error, results) => {
                              if (!error) {
                                return res
                                  .status(200)
                                  .json({ message: "success" });
                              } else {
                                res.status(500).json(error);
                              }
                            }
                          );
                        } else {
                          res.status(500).json(error);
                        }
                      }
                    );
                  }
                });
              } else {
                return res.status(401).json({ message: "CIN Exist." });
              }
            } else {
              res.status(500).json(error);
            }
          });
        } else {
          return res.status(402).json({ message: "Email Exist." });
        }
      } else {
        res.status(500).json(error);
      }
    });
  }
});

router.get("/getagent", (req, res) => {
  let query =
    "SELECT  u.user_id,u.nom,u.prenom,u.email,u.telephone,u.passport_cin,u.sexe,e.etablissement FROM users u INNER JOIN agents e ON u.user_id = e.user_id Where u.role='agentees';";
  connection.query(query, (err, results) => {
    if (!err) {
      res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

const schema1 = Joi.object({
  nom: Joi.string().min(2).required(),
  prenom: Joi.string().min(2).required(),
  email: Joi.string()
    .email()
    .required()
    .regex(/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/),
  telephone: Joi.number().min(8).required(),
  passport_cin: Joi.string().min(8).required(),
  sexe: Joi.string().required(),
  etablissement: Joi.string().required(),
});

router.patch("/updateagent/:user_id", (req, res) => {
  const user_id = req.params.user_id; // <-- use params.user_id here
  const { error } = schema1.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { nom, prenom, email, telephone, passport_cin, sexe, etablissement } =
    req.body;
  const query = `UPDATE users 
                      INNER JOIN agents ON users.user_id = agents.user_id 
                      SET nom=?, prenom=?, email=?, telephone=?, passport_cin=?, sexe=?, etablissement=? 
                      WHERE agents.user_id=? AND users.role='agentees'`;

  connection.query(
    query,
    [nom, prenom, email, telephone, passport_cin, sexe, etablissement, user_id], // <-- pass user_id as a parameter here
    (err, results) => {
      if (!err) {
        if (results.affectedRows > 0) {
          res.status(200).json({ message: "Agent updated successfully" });
        } else {
          res.status(404).json({ message: "Agent not found" });
        }
      } else {
        res.status(500).json(err);
      }
    }
  );
});

router.delete("/deleteagent/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  const query =
    "DELETE users, agents FROM users INNER JOIN agents ON users.user_id = agents.user_id WHERE users.user_id = ? AND users.role = 'agentees'";

  connection.query(query, [user_id], (err, results) => {
    if (!err) {
      if (results.affectedRows > 0) {
        res.status(200).json({ message: "Agent deleted successfully" });
      } else {
        res.status(404).json({ message: "Agent not found" });
      }
    } else {
      res.status(500).json(err);
    }
  });
});

module.exports = router;
