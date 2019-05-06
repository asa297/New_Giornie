const { ValidateToken, ValidateRole } = require('../../middlewares/AuthMiddleware')
const { admin, accountant } = require('../../helpers/role')
const mongoose = require('mongoose')
const sellerModel = mongoose.model('sellers')

module.exports = server => {
  server.get('/api/org', ValidateToken, ValidateRole([admin, accountant]), async (req, res) => {
    const result = await sellerModel.find({})
    res.send(result)
  })

  server.get('/api/org/:id', ValidateToken, ValidateRole([admin, accountant]), async (req, res) => {
    const { id } = req.params
    if (!id) res.status(403).send({ message: 'Need Parameter' })

    const result = await sellerModel.findById(id)
    res.send(result)
  })

  server.post('/api/org', ValidateToken, ValidateRole([admin, accountant]), async (req, res) => {
    const { orgType, orgName, orgComA, orgComB, orgCode } = req.body
    const user = req.user
    const found = await sellerModel.findOne({ orgCode })
    if (found) return res.status(403).send({ message: 'Seller Code is Duplicate.' })

    await sellerModel({
      orgTypeId: orgType.id,
      orgTypeName: orgType.label,
      orgName,
      orgComA,
      orgComB,
      orgCode,
      RecordIdBy: user.name,
      RecordNameBy: user.nickname,
      RecordDate: Date.now(),
      LastModifyById: user.name,
      LastModifyByName: user.nickname,
      LastModifyDate: Date.now(),
    }).save()

    res.send({ message: 'Seller is already inserted.' })
  })

  server.delete('/api/org/:id', ValidateToken, ValidateRole([admin, accountant]), async (req, res) => {
    const { id } = req.params
    if (!id) res.status(403).send({ message: 'Need Parameter' })
    await sellerModel.findByIdAndDelete(id)
    res.send({ message: 'Seller is already deleted.' })
  })

  server.put('/api/org/:id', ValidateToken, ValidateRole([admin, accountant]), async (req, res) => {
    const { id } = req.params
    const { orgType, orgName, orgComA, orgComB, orgCode } = req.body
    const user = req.user

    if (!id) res.status(403).send({ message: 'Need Parameter' })
    const found = await sellerModel.findById(id)
    if (!found) res.status(403).send({ message: 'Seller is not found.' })

    await sellerModel
      .updateOne(
        { _id: id },
        {
          $set: {
            orgTypeId: orgType.id,
            orgTypeName: orgType.label,
            orgName,
            orgComA,
            orgComB,
            orgCode,
            LastModifyById: user.name,
            LastModifyByName: user.nickname,
            LastModifyDate: Date.now(),
          },
        },
      )
      .exec()

    res.send({ message: 'Seller is already updated.' })
  })
}
