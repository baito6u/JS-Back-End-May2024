const { getOne } = require("../services/dataService");

async function isDataOwner(req, res, next) {
  const data = await getOne(req.params.dataId).lean();

  if (data.owner != req.user?._id) {
    return res.redirect(`/details/${req.params.dataId}`);
  }

  req.data = data;
  
  next();
}

exports.isDataOwner = isDataOwner;
