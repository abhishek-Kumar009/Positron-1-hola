module.exports=(element,req) => 
{
    if(req.user)
    {
        if(req.user.following.includes(element._id))
            element.isFollowed=true;
        else 
            element.isFollowed=false;
    }
    return element;
}
