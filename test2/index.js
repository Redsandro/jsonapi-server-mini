const path = require('path')
const jserve = require('../')

jserve({
	routes: path.join(__dirname, '../test/fixtures/create')
})
