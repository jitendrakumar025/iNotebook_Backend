const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const NotesController = require("../controllers/NotesController");


//ROUTE:1 GET ALL THE NOTES FROM THE DATABASE ,GET "/api/notes/fetchnotes"
router.get("/fetchnotes", fetchuser,NotesController.getNotes);

//ROUTE:2 ADD NEW NOTE USING :GET "/api/notes/addnotes"
router.post("/addnotes", fetchuser,NotesController.addNotes );

//ROUTE:3 UPDATE NOTE USING :PUT "/api/notes/updatenotes"
router.put("/updatenotes/:id", fetchuser, NotesController.updateNotes);

//ROUTE:4 DELETE NOTE USING :DELETE "/api/notes/deletenotes"
router.delete("/deletenotes/", fetchuser,NotesController.deleteNotes);

module.exports = router;
