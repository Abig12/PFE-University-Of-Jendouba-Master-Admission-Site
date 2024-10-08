const express = require("express");
const multer = require("multer");
const path = require("path");
const Joi = require("joi");
const connection = require("../connection");
const fs = require("fs");
const mime = require("mime");

const router = express.Router();
require("dotenv").config();

router.get("/getcand/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  let query = "SELECT file_id FROM cand_file Where user_id=?;";
  connection.query(query, [user_id], (err, results) => {
    if (!err) {
      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res.status(404).json({ message: "file_id not found" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.post("/addcand", (req, res) => {
  const { file_id, cm_id } = req.body;
  const querySelect =
    "SELECT * FROM cand_usermas WHERE file_id = ? AND cm_id = ?";
  const queryInsert =
    "INSERT INTO cand_usermas (file_id,cm_id,statut) VALUES (?,?,'Attendez');";

  connection.query(querySelect, [file_id, cm_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      if (results.length > 0) {
        return res
          .status(409)
          .json({ error: "User has already added this master course" });
      } else {
        connection.query(queryInsert, [file_id, cm_id], (err, results) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.status(201).json({ message: "candidacy inserted successfully." });
        });
      }
    }
  });
});

var store = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload cond files");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: store,
  fileFilter: (req, file, callback) => {
    // check if file type is valid
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      callback(null, true);
    } else {
      callback("Error: Invalid file type.");
    }
  },
}).fields([
  { name: "file_1ere", maxCount: 1 },
  { name: "file_2eme", maxCount: 1 },
  { name: "file_3eme", maxCount: 1 },
]);

router.post("/addfile/:user_id", upload, (req, res) => {
  const user_id = req.params.user_id;
  const data = {
    cm_id: req.body.cm_id,
    ann_bac: req.body.ann_bac,
    spec_bac: req.body.spec_bac,
    dip_univ: req.body.dip_univ,
    spec: req.body.spec,
    ann_dip: req.body.ann_dip,
    redo_1ere: req.body.redo_1ere,
    moy_1ere: req.body.moy_1ere,
    session_1ere: req.body.session_1ere,
    credit_1ere: req.body.credit_1ere,
    file_1ere: req.files.file_1ere[0].path,
    redo_2eme: req.body.redo_2eme,
    moy_2eme: req.body.moy_2eme,
    session_2eme: req.body.session_2eme,
    credit_2eme: req.body.credit_2eme,
    file_2eme: req.files.file_2eme[0].path,
    redo_3eme: req.body.redo_3eme,
    moy_3eme: req.body.moy_3eme,
    session_3eme: req.body.session_3eme,
    credit_3eme: req.body.credit_3eme,
    file_3eme: req.files.file_3eme[0].path,
  };
  let query =
    "INSERT INTO cand_file (ann_bac, spec_bac, dip_univ, spec, ann_dip, redo_1ere, moy_1ere, session_1ere, credit_1ere, file_1ere,redo_2eme, moy_2eme, session_2eme, credit_2eme, file_2eme,redo_3eme, moy_3eme, session_3eme, credit_3eme, file_3eme, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  connection.query(
    query,

    [
      data.ann_bac,
      data.spec_bac,
      data.dip_univ,
      data.spec,
      data.ann_dip,
      data.redo_1ere,
      data.moy_1ere,
      data.session_1ere,
      data.credit_1ere,
      data.file_1ere,
      data.redo_2eme,
      data.moy_2eme,
      data.session_2eme,
      data.credit_2eme,
      data.file_2eme,
      data.redo_3eme,
      data.moy_3eme,
      data.session_3eme,
      data.credit_3eme,
      data.file_3eme,
      user_id,
    ],
    (error, results) => {
      if (!error) {
        const file_id = results.insertId;
        let query2 =
          "INSERT INTO cand_usermas (file_id,cm_id,statut) VALUES (?,?,'En Attente');";
        connection.query(query2, [file_id, data.cm_id], (error, response) => {
          if (!error) {
            return res.status(200).json({ message: "success" });
          } else {
            res.status(500).json(error);
          }
        });
      } else {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  );
});

router.get("/userinfo/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  let query =
    "SELECT  u.nom,u.prenom,u.email,u.telephone,u.passport_cin,u.sexe,c.naissance,c.ville_naissance,c.gouvernorat,c.pays FROM users u INNER JOIN condidats c ON u.user_id = c.user_id WHERE u.user_id=?";
  connection.query(query, [user_id], (err, results) => {
    if (!err) {
      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(results[0]);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.patch("/updatefile/:file_id", upload, (req, res) => {
  const file_id = req.params.file_id;
  const data = {
    ann_bac: req.body.ann_bac,
    spec_bac: req.body.spec_bac,
    dip_univ: req.body.dip_univ,
    spec: req.body.spec,
    ann_dip: req.body.ann_dip,
    redo_1ere: req.body.redo_1ere,
    moy_1ere: req.body.moy_1ere,
    session_1ere: req.body.session_1ere,
    credit_1ere: req.body.credit_1ere,
    file_1ere: null,
    redo_2eme: req.body.redo_2eme,
    moy_2eme: req.body.moy_2eme,
    session_2eme: req.body.session_2eme,
    credit_2eme: req.body.credit_2eme,
    file_2eme: null,
    redo_3eme: req.body.redo_3eme,
    moy_3eme: req.body.moy_3eme,
    session_3eme: req.body.session_3eme,
    credit_3eme: req.body.credit_3eme,
    file_3eme: null,
  };

  if (req.files) {
    if (req.files.file_1ere) {
      data.file_1ere = req.files.file_1ere[0].path;
    }
    if (req.files.file_2eme) {
      data.file_2eme = req.files.file_2eme[0].path;
    }
    if (req.files.file_3eme) {
      data.file_3eme = req.files.file_3eme[0].path;
    }
  }

  let query =
    "UPDATE cand_file SET ann_bac = ?, spec_bac = ?, dip_univ = ?, spec = ?, ann_dip = ?, redo_1ere = ?, moy_1ere = ?, session_1ere = ?, credit_1ere = ?, redo_2eme = ?, moy_2eme = ?, session_2eme = ?, credit_2eme = ?, redo_3eme = ?, moy_3eme = ?, session_3eme = ?, credit_3eme = ?, file_1ere = IFNULL(?, file_1ere), file_2eme = IFNULL(?, file_2eme), file_3eme = IFNULL(?, file_3eme) WHERE file_id = ?";

  connection.query(
    query,
    [
      data.ann_bac,
      data.spec_bac,
      data.dip_univ,
      data.spec,
      data.ann_dip,
      data.redo_1ere,
      data.moy_1ere,
      data.session_1ere,
      data.credit_1ere,
      data.redo_2eme,
      data.moy_2eme,
      data.session_2eme,
      data.credit_2eme,
      data.redo_3eme,
      data.moy_3eme,
      data.session_3eme,
      data.credit_3eme,
      data.file_1ere,
      data.file_2eme,
      data.file_3eme,
      file_id,
    ],
    (err, results) => {
      if (!err) {
        if (results.affectedRows > 0) {
          res.status(200).json({ message: "file updated successfully" });
        } else {
          res.status(404).json({ message: "file not found" });
        }
      } else {
        res.status(500).json(err);
      }
    }
  );
});

router.get("/getfile/:user_id", (req, res) => {
  const user_id = req.params.user_id;

  let query = "SELECT * FROM cand_file WHERE user_id = ?";
  connection.query(query, [user_id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    const data = {
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

router.get("/usermas/:file_id", (req, res) => {
  const file_id = req.params.file_id;
  let query =
    "SELECT m.usermas_id, c.nom_m, m.statut FROM cand_file f INNER JOIN cand_usermas m ON f.file_id = m.file_id INNER JOIN cours_master c ON m.cm_id = c.cm_id WHERE f.file_id=?";
  connection.query(query, [file_id], (err, results) => {
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

router.delete("/delusermas/:usermas_id", (req, res) => {
  const usermas_id = req.params.usermas_id;
  const query = "DELETE FROM cand_usermas  WHERE usermas_id = ?";

  connection.query(query, [usermas_id], (err, results) => {
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
