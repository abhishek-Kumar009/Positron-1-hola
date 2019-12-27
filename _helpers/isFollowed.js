module.exports=(list,req)=>{
    if(req.user)
    {
        list.forEach(element => {
            if(req.user.following.includes(element._id))
                element.isFollowed=true;
            else 
                element.isFollowed=false;
        });
    }
    return list;
}
