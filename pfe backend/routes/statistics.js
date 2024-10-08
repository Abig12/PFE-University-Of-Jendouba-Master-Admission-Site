const express = require("express");
const Joi = require("joi");
const connection = require("../connection");
const router = express.Router();
require("dotenv").config();

router.get("/nbagentetab/:etablissement", (req, res) => {
  const etablissement = req.params.etablissement;
  let query =
    "SELECT  COUNT(u.email) AS nb FROM users u INNER JOIN agents e ON u.user_id = e.user_id Where u.role='agentees' and etablissement=?;";
  connection.query(query, [etablissement], (err, results) => {
    if (!err) {
      if (results.length > 0) {
        {
          res.status(200).json(results[0]);
        }
      } else {
        res.status(404).json({ message: "agent not found" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/getmas/:etablissement", (req, res) => {
  const etablissement = req.params.etablissement;
  let query =
    "SELECT  COUNT(cm_id) AS nb FROM cours_master Where etablissement=?;";
  connection.query(query, [etablissement], (err, results) => {
    if (!err) {
      if (results.length > 0) {
        {
          res.status(200).json(results[0]);
        }
      } else {
        res.status(404).json({ message: "masters not found" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/cand/:etablissement", (req, res) => {
  const etablissement = req.params.etablissement;
  let query =
    "SELECT  COUNT(u.nom) AS nb FROM cours_master c INNER JOIN cand_usermas m ON c.cm_id = m.cm_id INNER JOIN cand_file f ON m.file_id = f.file_id INNER JOIN users u ON f.user_id = u.user_id WHERE c.etablissement=? ";
  connection.query(query, [etablissement], (err, results) => {
    if (!err) {
      if (results.length === 0) {
        return res.status(404).json({ message: "cand not found" });
      } else {
        res.status(200).json(results[0]);
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/admis/:etablissement", (req, res) => {
  const etablissement = req.params.etablissement;
  let query =
    "SELECT  COUNT(u.nom) AS nb FROM cours_master c INNER JOIN cand_usermas m ON c.cm_id = m.cm_id INNER JOIN cand_file f ON m.file_id = f.file_id INNER JOIN users u ON f.user_id = u.user_id WHERE c.etablissement=? and m.statut='Accepté'";
  connection.query(query, [etablissement], (err, results) => {
    if (!err) {
      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json(results[0]);
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/chartees/:etablissement", (req, res) => {
  const etablissement = req.params.etablissement;
  let query =
    "SELECT  COUNT(u.nom) AS nb, c.cm_id FROM cours_master c INNER JOIN cand_usermas m ON c.cm_id = m.cm_id INNER JOIN cand_file f ON m.file_id = f.file_id INNER JOIN users u ON f.user_id = u.user_id WHERE c.etablissement=? GROUP BY c.cm_id";
  connection.query(query, [etablissement], (err, results) => {
    if (!err) {
      if (results.length === 0) {
        return res.status(404).json({ message: "cand not found" });
      } else {
        res.status(200).json(results);
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/masidnom/:etablissement", (req, res) => {
  const etablissement = req.params.etablissement;
  let query =
    "SELECT  c.cm_id,c.nom_m FROM cours_master c INNER JOIN cand_usermas m ON c.cm_id = m.cm_id INNER JOIN cand_file f ON m.file_id = f.file_id INNER JOIN users u ON f.user_id = u.user_id WHERE c.etablissement=? GROUP BY c.cm_id";
  connection.query(query, [etablissement], (err, results) => {
    if (!err) {
      if (results.length === 0) {
        return res.status(404).json({ message: "mas not found" });
      } else {
        res.status(200).json(results);
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

//------------------------- agentuj--------------------------------------------------------------------------------------------------------------------------------------
router.get("/nb_ag_et_aguj", (req, res) => {
  let query =
    "SELECT  COUNT(u.email) AS nb FROM users u INNER JOIN agents e ON u.user_id = e.user_id Where u.role='agentees'";
  connection.query(query, (err, results) => {
    if (!err) {
      if (results.length > 0) {
        {
          res.status(200).json(results[0]);
        }
      } else {
        res.status(404).json({ message: "agent not found" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/nbetab", (req, res) => {
  let query = "SELECT COUNT(etab_id) AS nb FROM etablissement";
  connection.query(query, (err, results) => {
    if (!err) {
      if (results.length > 0) {
        {
          res.status(200).json(results[0]);
        }
      } else {
        res.status(404).json({ message: "etab not found" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/nbcand", (req, res) => {
  let query = "SELECT  COUNT(email) AS nb FROM users Where role='user'";
  connection.query(query, (err, results) => {
    if (!err) {
      if (results.length > 0) {
        {
          res.status(200).json(results[0]);
        }
      } else {
        res.status(404).json({ message: "agent not found" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/nbmas", (req, res) => {
  let query = "SELECT COUNT(cm_id)AS nb  FROM cours_master ";
  connection.query(query, (err, results) => {
    if (!err) {
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({ message: "masters not found" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/chartuj", (req, res) => {
  let query =
    "SELECT COUNT(c.cm_id)AS nb,e.etab_id  FROM cours_master c INNER JOIN etablissement e ON c.etablissement = e.nom_etab GROUP BY e.nom_etab ORDER BY e.etab_id";
  connection.query(query, (err, results) => {
    if (!err) {
      if (results.length === 0) {
        return res.status(404).json({ message: "etab not found" });
      } else {
        res.status(200).json(results);
      }
    } else {
      return res.status(500).json(err);
    }
  });
});
router.get("/idetabnom", (req, res) => {
  let query = "SELECT etab_id,nom_etab FROM etablissement ORDER BY etab_id";
  connection.query(query, (err, results) => {
    if (!err) {
      if (results.length > 0) {
        {
          res.status(200).json(results);
        }
      } else {
        res.status(404).json({ message: "etab not found" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
