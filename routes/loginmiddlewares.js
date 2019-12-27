const authRequired=(req, res, next)=>
{
  if (!req.user) {
    return res.redirect('/auth/login');
  }
  next();
}
const addTemplateVariables=(req, res, next) =>
{
  res.locals.profile = req.user;
  res.locals.login = `/auth/login?return=${encodeURIComponent(req.originalUrl)}`;
  res.locals.logout = `/auth/logout?return=${encodeURIComponent(req.originalUrl)}`;
  next();
}

module.exports={
  addTemplate:addTemplateVariables,
  required:authRequired,
}
