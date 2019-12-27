function addDateString(list)
{

    //console.log("List before editing",list);
    list.forEach(element => {
        //console.log(element);
        element.datestring=Math.ceil((Date.now()-element.date)/ (1000 * 3600 * 24))+' day before';
        //console.log(element);
    });
    //console.log("list after editing",list);
    return list;
}
module.exports=addDateString;