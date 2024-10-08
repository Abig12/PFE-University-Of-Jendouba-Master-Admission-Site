const express = require("express");
const connection = require("../connection");
const router = express.Router();
const fs = require("fs");
const mime = require("mime");
require("dotenv").config();

router.get("/getusername/:cm_id", (req, res) => {
  const cm_id = req.params.cm_id;
  let query =
    "SELECT u.user_id, u.nom, u.prenom, u.passport_cin,m.statut FROM cours_master c INNER JOIN cand_usermas m ON c.cm_id = m.cm_id INNER JOIN cand_file f ON m.file_id = f.file_id INNER JOIN users u ON f.user_id = u.user_id WHERE c.cm_id=?;";
  connection.query(query, [cm_id], (err, results) => {
    if (!err) {
      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res.status(404).json({ message: "user not found" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/getuserdata/:user_id", (req, res) => {
  const user_id = req.params.user_id;

  let query =
    "SELECT u.user_id,u.nom,u.prenom,u.email,u.telephone,u.passport_cin,u.sexe,c.naissance,c.ville_naissance,c.gouvernorat,c.pays ,f.file_id, f.ann_bac, f.spec_bac, f.dip_univ, f.spec, f.ann_dip, f.redo_1ere, f.moy_1ere, f.session_1ere, f.credit_1ere, f.file_1ere, f.redo_2eme, f.moy_2eme, f.session_2eme, f.credit_2eme, f.file_2eme, f.redo_3eme, f.moy_3eme, f.session_3eme, f.credit_3eme, f.file_3eme,m.usermas_id,m.statut FROM users u INNER JOIN condidats c ON u.user_id = c.user_id INNER JOIN cand_file f ON u.user_id = f.user_id INNER JOIN cand_usermas m ON f.file_id = m.file_id WHERE u.user_id = ?";
  connection.query(query, [user_id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    const data = {
      user_id: results[0].user_id,
      nom: results[0].nom,
      prenom: results[0].prenom,
      email: results[0].email,
      telephone: results[0].telephone,
      passport_cin: results[0].passport_cin,
      sexe: results[0].sexe,
      naissance: results[0].naissance,
      ville_naissance: results[0].ville_naissance,
      gouvernorat: results[0].gouvernorat,
      pays: results[0].pays,
      file_id: results[0].file_id,
      ann_bac: results[0].ann_bac,
      spec_bac: results[0].spec_bac,
      dip_univ: results[0].dip_univ,
      spec: results[0].spec,
      ann_dip: results[0].ann_dip,
      redo_1ere: results[0].redo_1ere,
      moy_1ere: results[0].moy_1ere,
      session_1ere: results[0].session_1ere,
      credit_1ere: results[0].credit_1ere,
      file_1ere: getFileDataURL(results[0].file_1ere),
      redo_2eme: results[0].redo_2eme,
      moy_2eme: results[0].moy_2eme,
      session_2eme: results[0].session_2eme,
      credit_2eme: results[0].credit_2eme,
      file_2eme: getFileDataURL(results[0].file_2eme),
      redo_3eme: results[0].redo_3eme,
      moy_3eme: results[0].moy_3eme,
      session_3eme: results[0].session_3eme,
      credit_3eme: results[0].credit_3eme,
      file_3eme: getFileDataURL(results[0].file_3eme),
      usermas_id: results[0].usermas_id,
      statut: results[0].statut,
    };

    return res.status(200).json(data);
  });
});

function getFileDataURL(filePath) {
  const fileData = fs.readFileSync(filePath);
  const mimeType = mime.lookup(filePath);
  const base64Data = fileData.toString("base64");
  return `data:${mimeType};base64,${base64Data}`;
}

router.patch("/updatef1/:file_id", (req, res) => {
  const file_id = req.params.file_id;
  const data = {
    moy_1ere: req.body.moy_1ere,
    session_1ere: req.body.session_1ere,
    credit_1ere: req.body.credit_1ere,
  };

  let query =
    "UPDATE cand_file SET moy_1ere = ?, session_1ere = ?, credit_1ere = ? WHERE file_id = ?";

  connection.query(
    query,
    [data.moy_1ere, data.session_1ere, data.credit_1ere, file_id],
    (err, results) => {
      if (!err) {
        if (results.affectedRows > 0) {
          res.status(200).json({ message: "file1 updated successfully" });
        } else {
          res.status(404).json({ message: "file1 not found" });
        }
      } else {
        res.status(500).json(err);
      }
    }
  );
});

router.patch("/updatef2/:file_id", (req, res) => {
  const file_id = req.params.file_id;
  const data = {
    moy_2eme: req.body.moy_2eme,
    session_2eme: req.body.session_2eme,
    credit_2eme: req.body.credit_2eme,
  };

  let query =
    "UPDATE cand_file SET moy_2eme = ?, session_2eme = ?, credit_2eme = ? WHERE file_id = ?";

  connection.query(
    query,
    [data.moy_2eme, data.session_2eme, data.credit_2eme, file_id],
    (err, results) => {
      if (!err) {
        if (results.affectedRows > 0) {
          res.status(200).json({ message: "file2 updated successfully" });
        } else {
          res.status(404).json({ message: "file2 not found" });
        }
      } else {
        res.status(500).json(err);
      }
    }
  );
});

router.patch("/updatef3/:file_id", (req, res) => {
  const file_id = req.params.file_id;
  const data = {
    moy_3eme: req.body.moy_3eme,
    session_3eme: req.body.session_3eme,
    credit_3eme: req.body.credit_3eme,
  };

  let query =
    "UPDATE cand_file SET moy_3eme = ?, session_3eme = ?, credit_3eme = ? WHERE file_id = ?";

  connection.query(
    query,
    [data.moy_3eme, data.session_3eme, data.credit_3eme, file_id],
    (err, results) => {
      if (!err) {
        if (results.affectedRows > 0) {
          res.status(200).json({ message: "file3 updated successfully" });
        } else {
          res.status(404).json({ message: "file3 not found" });
        }
      } else {
        res.status(500).json(err);
      }
    }
  );
});

router.patch("/updatestatus/:usermas_id", (req, res) => {
  const usermas_id = req.params.usermas_id;
  const data = {
    statut: req.body.statut,
  };

  let query = "UPDATE cand_usermas SET statut = ? WHERE usermas_id = ?";

  connection.query(query, [data.statut, usermas_id], (err, results) => {
    if (!err) {
      if (results.affectedRows > 0) {
        res.status(200).json({ message: "statut updated successfully" });
      } else {
        res.status(404).json({ message: "statut not found" });
      }
    } else {
      res.status(500).json(err);
    }
  });
});

module.exports = router;
