/**
 * Created by BRUNO COSTA on 20/04/18.
 */


var general = {};
general.searchStrInArrayObj = function(str_search, arr, col, flg_is_exact){
    flg_is_exact = (typeof flg_is_exact == "undefined")? true : flg_is_exact;
    var result = {status : false, key : [], arr_obj : []};
    if(typeof arr === 'object'){
        $.each(arr, function(key, obj){
            if(flg_is_exact){
                if(obj[col] === str_search){
                    result.status = true;
                    result.key.splice(result.key.length, 0, key);
                    result.arr_obj.splice(result.arr_obj.length, 0, obj);
                }
            }else{
                if(obj[col].indexOf(str_search) !== -1){
                    result.status = true;
                    result.key.splice(result.key.length, 0, key);
                    result.arr_obj.splice(result.arr_obj.length, 0, obj);
                }
            }
        });
    }
    return result;
}
general.getObjByColumnKey = function(key, arr, col){
    var result = this.searchStrInArrayObj(key, arr, col, true);
    var obj_return = null;
    if(result.status){
        obj_return = result.arr_obj[0];
    }
    return obj_return;
}


general.setFieldEditList = function(component, obj){
    if(typeof component == "object" && typeof obj == "object"){
        $.each(obj, function(label, value){
            if(typeof component[label] !== "undefined"){
                switch(typeof component[label]){
                    case "function" :
                            component[label](value);
                        break;
                    default :
                            component[label] = value;
                        break;
                }
            }
        });
    }
}
general.indexingId = function(arr, attr_name){
    let indexCount = 1;
    $.each(arr, function(key, obj){
        arr[key][attr_name] = indexCount;
        indexCount++;
    });
}
general.setAttrTouchedFields = function(el, flg){
    if(typeof flg === 'undefined'){
        flg = true;
    }else{
        flg = (flg)? true : false;
    }
    $(el).attr('attr-touched',flg);
}
general.isset = function ()
{
    var a = arguments,
        l = a.length,
        i = 0,
        undef;
    if (l === 0)
    {
        throw new Error('Empty isset');
    }
    while (i !== l)
    {
        if (a[i] === undef || a[i] === null)
        {
            return false;
        }
        i++;
    }
    return true;
}

//FORMAT DATE
general.date_format = function(strDate, format, locale){
    let dat = null;
    let result = null;
    if(strDate !== null){
        if(typeof strDate === "string"){
            let strDateAux = strDate.split(" ");
            if(typeof locale === "undefined"){
                locale = "PT";
            }
            let arrDate = [];
            switch(locale){
                case "PT" :
                    arrDate = strDateAux[0].split("/");
                    break;
                case "EN" :
                    arrDate = strDateAux[0].split("-").reverse();
                    break;
            }
            let strDateYearsMouthDay = null;
            if(arrDate.length > 2){
                let time = (strDateAux[1] !== undefined)? " " + strDateAux[1] : " 00:01:00";
                let strDateYearsMouthDay = arrDate[2] + "-" + arrDate[1] + "-" + arrDate[0] + time;
                //console.log(strDateYearsMouthDay);
                dat = new Date(strDateYearsMouthDay);
            }
        }else if(typeof strDate === "object"){
            if(strDate.constructor === Date){
                dat = strDate;
            }
        }
        //console.log(dat);
        if(dat !== null){
            let day = ("0" + dat.getDate()).slice(-2);
            let month = ("0" + (dat.getMonth() + 1)).slice(-2);
            let year = dat.getUTCFullYear();
            let hours = ("0" + dat.getHours()).slice(-2);
            let minutes = ("0" + dat.getMinutes()).slice(-2);
            let seconds = ("0" + dat.getSeconds()).slice(-2);
            switch(format){
                case "YYYY-mm-dd" :
                        result = year + "-" + month + "-" + day;
                    break;
                case "YYYY-mm-dd hh:mm:ss" :
                    result = year + "-" + month + "-" + day + " " + hours +":"+ minutes +":"+ seconds;
                    break;
                case "dd/mm/YYYY" :
                        result = day + "/" + month + "/" + year;
                    break;
                case "dd/mm/YYYY hh:mm" :
                        result = day + "/" + month + "/" + year + " " + hours + ":" + minutes;
                    break;
                default :
                        result = year + "-" + month + "-" + day;
                    break;
            }
        }
    }
    
    return result;
}
