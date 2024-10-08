const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const connection = require("../connection");
const router = express.Router();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
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
  naissance: Joi.date().required().messages({
    "date.base": "La date de naissance doit être une date.",
    "date.empty": "La date de naissance ne doit pas être vide.",
    "any.required": "La date de naissance est obligatoire.",
  }),

  ville_naissance: Joi.string().required().messages({
    "string.base": "La ville de naissance doit être une chaîne de caractères.",
    "string.empty": "La ville de naissance ne doit pas être vide.",
    "any.required": "La ville de naissance est obligatoire.",
  }),
  gouvernorat: Joi.string().required().messages({
    "string.base": "Le gouvernorat doit être une chaîne de caractères.",
    "string.empty": "Le gouvernorat ne doit pas être vide.",
    "any.required": "Le gouvernorat est obligatoire.",
  }),
  pays: Joi.string().required().messages({
    "string.base": "Le pays doit être une chaîne de caractères.",
    "string.empty": "Le pays ne doit pas être vide.",
    "any.required": "Le pays est obligatoire.",
  }),
});

router.post("/signup", (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  } else {
    let query = "SELECT email, password, role FROM users WHERE email=?";
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
                      "INSERT INTO users(nom, prenom, email, password, telephone, passport_cin, sexe, role) VALUES (?, ?, ?, ?, ?, ?, ?, 'user')";
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
                            "INSERT INTO condidats(naissance, ville_naissance, gouvernorat, pays, user_id) VALUES (?, ?, ?, ?, ?)";
                          connection.query(
                            query,
                            [
                              value.naissance,
                              value.ville_naissance,
                              value.gouvernorat,
                              value.pays,
                              user_id,
                            ],
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
const schema2 = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .regex(/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/),
});

router.post("/getuser", (req, res) => {
  const { error, value } = schema2.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { email } = value;
  let query =
    "SELECT u.nom,u.prenom,u.email,u.telephone,u.passport_cin,u.sexe,c.naissance,c.ville_naissance,c.gouvernorat,c.pays FROM users u INNER JOIN condidats c ON u.user_id = c.user_id Where u.email=?;";
  connection.query(query, [email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        return res.status(404).json({ message: "User not found" });
      }
      const user = results[0];
      res.status(200).json({ user });
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/getusername/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  let query = "SELECT nom,prenom  FROM users WHERE user_id=?";
  connection.query(query, [user_id], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(results[0]);
    } else {
      return res.status(500).json(err);
    }
  });
});

const schemalg = Joi.object({
  passport_cin: Joi.number().required(),
  password: Joi.string().min(6).required(),
});

router.post("/login", (req, res) => {
  const { error, value } = schemalg.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { passport_cin, password } = value;
  let query =
    "SELECT  passport_cin, password,role ,user_id FROM users WHERE passport_cin=?";
  connection.query(query, [passport_cin], (err, results) => {
    if (!err) {
      if (
        results.length <= 0 ||
        !bcrypt.compareSync(password, results[0].password)
      ) {
        return res
          .status(401)
          .json({ message: "Incorrect passport/cin or password" });
      }
      const payload = {
        passport_cin: results[0].passport_cin,
        role: results[0].role,
        user_id: results[0].user_id,
      };
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
        expiresIn: "8h",
      });
      res.status(200).json({ token: accessToken });
    } else {
      return res.status(500).json(err);
    }
  });
});

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

router.post("/forgotpassword", (req, res) => {
  const { error, value } = schema2.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { email } = value;
  let query = "select email from users where email=?";
  connection.query(query, [email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        return res.status(200).json({
          message:
            "Lien pour changer le mot de passe à envoyé avec succès à votre email",
        });
      } else {
        var mailOptions = {
          form: process.env.EMAIL,
          to: results[0].email,
          subject: "Email by université de jendouba",
          html:
            "<p><b>Lien pour changer le mot de passe </b><br> <b>Cet e-mail a été envoyé à: </b>" +
            results[0].email +
            "<br><b>Cliquez sur le lien si vous voulez changer votre mot de passe: </b> <a href=' http://localhost:4200/changepass'>changer le mot de passe </a></p>",
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent " + info.response);
          }
        });
        return res.status(200).json({
          message:
            "Lien pour changer de mot de passe à envoyé avec succès à votre email",
        });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
