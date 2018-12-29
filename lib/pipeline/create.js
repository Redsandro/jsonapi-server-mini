/**
 * @author Sander Steenhuis <info@redsandro.com> (https://www.Redsandro.com)
 * @author Stone Circle <info@stonecircle.ie> (https://www.stonecircle.ie)
 * @license MIT
 */
const serializer	= require('../helpers/serializer')
const getModelData	= require('../helpers/getModelData')

module.exports = (options) => async(req, res, next) => {
	console.log('Query: %j', req.query)
	console.log('Params: %j', req.params)
	console.log('Body: %j', req.body)

	if (!get(req, 'body.data')) return next(new Error('No valid JSON'))

	try {
		const dataType		= get(req, 'body.data.type')
		const modelType		= get(options, 'model.collection.name')
		const data			= getModelData(get(req, 'body.data'), {})
		const model			= new options.model(data)

		if (dataType !== modelType) return next(new Error(`Wrong type. '${modelType}' expected. '${dataType}' given.`))

		const result		= await model.save()
		res.status(201).json(serializer(result, options))

		return next()
	}
	catch (err) {
		return next(err)
	}
}