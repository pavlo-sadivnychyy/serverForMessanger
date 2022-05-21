const { Router } = require('express');
const router = Router();

router.get('/:fileName', async (req, res) => {
  try{
    res.download(`./uploads/${req.params.fileName}`)
  }catch (err){
    res.status(404)
  }

});

module.exports = router;
