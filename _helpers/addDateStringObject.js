module.exports=(element)=>
{


    element.datestring=Math.ceil((Date.now()-element.date)/ (1000 * 3600 * 24))+' day before';
    return element;
}