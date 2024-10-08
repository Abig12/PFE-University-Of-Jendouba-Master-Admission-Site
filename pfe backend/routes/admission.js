const express = require("express");
const connection = require("../connection");
const router = express.Router();
require("dotenv").config();

router.get("/admis/:etablissement", (req, res) => {
  const etablissement = req.params.etablissement;
  let query =
    "SELECT  u.nom,u.prenom,u.email,u.telephone,u.passport_cin, m.statut , c.nom_m FROM cours_master c INNER JOIN cand_usermas m ON c.cm_id = m.cm_id INNER JOIN cand_file f ON m.file_id = f.file_id INNER JOIN users u ON f.user_id = u.user_id WHERE c.etablissement=? and m.statut='Accepté'";
  connection.query(query, [etablissement], (err, results) => {
    if (!err) {
      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
