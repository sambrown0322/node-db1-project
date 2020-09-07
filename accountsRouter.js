const express = require("express");

const db = require("./data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then((accounts) => res.status(200).json({ data: accounts }))
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("accounts")
    .where({ id: id })
    .then((account) => res.status(200).json({ data: account }))
    .catch((err) => {
      console.log(err);
    });
});

router.post("/", (req, res) => {
  const postData = req.body;
  db("accounts")
    .insert(postData)
    .then((id) => {
      res.status(201).json({ data: id });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("accounts")
    .where({ id: id })
    .update(changes)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ data: count });
      } else {
        res.status(404).json({ message: "There was no record to delete" });
      }
    })

    .catch((err) => {
      console.log(err);
    });
});

router.delete(":/id", (req, res) => {
  const { id } = req.params;

  db("accounts")
    .where({ id: id })
    .delete()
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ data: count });
      } else {
        res.status(404).json({ message: "There was no record to delete" });
      }
    })

    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
