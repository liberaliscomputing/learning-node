const Note = require('../models/Note.js');

// create and save a new note
exports.create = (req, res) => {
	// validate request
    if(req.body.content === undefined) {
        return res.status(400).send({
            message: 'Note content can not be empty.'
        });
    }

    // create a new note
    const { title, content } = req.body;
    const note = new Note({
        title, 
        content
    });

    // save the new note
    note.save()
    .then((data) => {
	    res.status(200).send({
	    	message: `Note ${note.title} saved successfully.`
	    });
	}).catch((err) => {
	    return res.status(500).send({
	        message: err.message
	    });
	});
};

// retrieve all notes
exports.findAll = (req, res) => {
    Note.find()
    .then((notes) => {
    	if (!notes.length) {
    		return res.status(404).send({
    			message: 'Not found.'
    		})
    	}

        res.status(200).send(notes);
    }).catch((err) => {
        return res.status(500).send({
            message: err.message
        });
    });
};

// find a single note by id
exports.findOne = (req, res) => {
	const id = req.params.id
    Note.findById(id)
    .then((note) => {
        if (note === null) {
            return res.status(404).send({
                message: `Note ${id} not found.`
            });            
        }
        res.status(200).send(note);
    }).catch((err) => {
        return res.status(500).send({
            message: err.message
        });
    });
};

// update a single note by id
exports.update = (req, res) => {
	const id = req.params.id;
	const { title, content } = req.body;

	// validate Request
    if (content === undefined) {
        return res.status(400).send({
            message: 'Note content can not be empty.'
        });
    }

    // find and updater a note 
    Note.findByIdAndUpdate(id, {
        title,
        content
    }, {new: true})
    .then((note) => {
        if(note === null) {
            return res.status(404).send({
                message: `Note ${id} not found.`
            });
        }

        res.status(200).send(note);
    }).catch((err) => {
        return res.status(500).send({
            message: err.message
        });
    });
};

// delete a single note by id
exports.delete = (req, res) => {
	const id = req.params.id
    Note.findByIdAndRemove(req.params.id)
    .then((note) => {
        if(note === null) {
            return res.status(404).send({
                message: `Note ${id} not found.`
            });
        }
        
        res.status(200).send({
        	message: `Note ${id} deleted successfully.`
        });
    }).catch((err) => {
        return res.status(500).send({
            message: err.message
        });
    });
};