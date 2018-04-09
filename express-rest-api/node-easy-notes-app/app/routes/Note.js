module.exports = (app) => {
    const note = require('../controllers/Note.js');

    // create a new note
    app.post('/notes', note.create);

    // retrieve all notes
    app.get('/notes', note.findAll);

    // retrieve a single note by id
    app.get('/notes/:id', note.findOne);

    // update a note by note id
    app.put('/notes/:id', note.update);

    // delete a note by id
    app.delete('/notes/:id', note.delete);
}