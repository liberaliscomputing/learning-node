const app = require('./app');
const port = process.env.PORT || 3000;

const server = app.listen(port, (err) => {
	if (err) {
		return err;
	}
	
	console.log(`Express server listening on port ${port}`);
});