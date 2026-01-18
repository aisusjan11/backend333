const express = require("express");
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook
} = require("../controllers/bookController");

const { validateBody } = require("../middleware/validateMiddleware");
const { createBookSchema, updateBookSchema } = require("../middleware/bookValidation");

const router = express.Router();

router.post("/", validateBody(createBookSchema), createBook);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.put("/:id", validateBody(updateBookSchema), updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
