

"use strict";


function getJSON(url) {
    return new Promise((resolve, reject) => {
        //get the data from the API and has the "url" as a parameter 
        $.ajax({
            method: "GET",
            url: url,
            success: data => {
                resolve(data);
            },
            error: err => {
                reject(err);
            }
        });
    });
}

