
const notFound = (req,res) => {
    res.status(404).send('resources not found')
}

module.exports = notFound