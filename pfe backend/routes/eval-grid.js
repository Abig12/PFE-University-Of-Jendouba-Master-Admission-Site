const express = require("express");
const Joi = require("joi");
const connection = require("../connection");
const router = express.Router();
require("dotenv").config();

router.get("/geteval/:etablissement", (req, res) => {
  let query =
    "SELECT eval_id,malus_redoublement,malus_controle,bonus_1,bonus_2,bonus_3,etablissement FROM eval_grid WHERE etablissement=? ;";
  connection.query(query, [req.params.etablissement], (err, results) => {
    if (!err) {
      res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

const schema = Joi.object({
  malus_redoublement: Joi.number().required(),
  malus_controle: Joi.number().required(),
  bonus_1: Joi.number().required(),
  bonus_2: Joi.number().required(),
  bonus_3: Joi.number().required(),
});

router.post("/addeval/:etablissement", (req, res) => {
  const etablissement = req.params.etablissement;
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { malus_redoublement, malus_controle, bonus_1, bonus_2, bonus_3 } =
    req.body;

  const query =
    "INSERT INTO eval_grid ( etablissement,malus_redoublement, malus_controle, bonus_1, bonus_2, bonus_3) VALUES (?,?, ?, ?, ?, ?)";

  connection.query(
    query,
    [
      etablissement,
      malus_redoublement,
      malus_controle,
      bonus_1,
      bonus_2,
      bonus_3,
    ],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res
        .status(201)
        .json({ message: "evaluation grid inserted successfully." });
    }
  );
});

router.patch("/updateval/:eval_id", (req, res) => {
  const eval_id = req.params.eval_id; // <-- use params.etablissement here
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { malus_redoublement, malus_controle, bonus_1, bonus_2, bonus_3 } =
    req.body;

  const query = `UPDATE eval_grid 
                          SET malus_redoublement=?, malus_controle=?, bonus_1=?, bonus_2=?, bonus_3=?
                          WHERE eval_id=? `;

  connection.query(
    query,
    [malus_redoublement, malus_controle, bonus_1, bonus_2, bonus_3, eval_id], // <-- pass etablissement as a parameter here
    (err, results) => {
      if (!err) {
        if (results.affectedRows > 0) {
          res
            .status(200)
            .json({ message: "evaluation grid updated successfully" });
        } else {
          res.status(404).json({ message: "evaluation grid not found" });
        }
      } else {
        res.status(500).json(err);
      }
    }
  );
});

router.delete("/deleteeval/:eval_id", (req, res) => {
  const eval_id = req.params.eval_id;
  const query = "DELETE FROM eval_grid  WHERE eval_id = ?";

  connection.query(query, [eval_id], (err, results) => {
    if (!err) {
      if (results.affectedRows > 0) {
        res
          .status(200)
          .json({ message: "evaluation grid deleted successfully" });
      } else {
        res.status(404).json({ message: "evaluation grid not found" });
      }
    } else {
      res.status(500).json(err);
    }
  });
});

module.exports = router;
