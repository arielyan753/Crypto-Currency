/// <reference path="config.js" />

"use strict";

$(function () {

let coins = []; //an empty array to push the coins form the API into


    showCoins(); //runs the func showCoins so that the coins are brought from the API

    $(".home").click(() => {
        //on clicking the home btn it renders the coins and hides the about_card
        displayCoins(coins);
        $("#about_card").css("visibility", "hidden").fadeOut();
        $("#container").fadeIn()
    });

    $("#container").on("click", ".coin > button", function () {
        //on click the more info btn is passes the symbol of the coin on to the handleMoreInfo function
        const coinId = $(this).attr("data-coin-id");
        handleMoreInfo(coinId);
    });

    $("input[type='search']").keyup(function () {
        //passes the value of the input search to the showSearch function
        const text = $(this).val();
        showSearch(text);
    });

    function handleMoreInfo(coinId) {
        //shows the div that holds the info of the coin selected
        const display = $(`#${coinId}`).css("display");
        if (display === "none") {
            $(`#${coinId}`).fadeIn(500);
            showMoreInfo(coinId);
        }
        else {
            $(`#${coinId}`).fadeOut(500);
        }
    }

    async function showCoins() {
        //get the data from the API and puts it in an array and passes it to displayCoins to be rendered
        try {
            showProgress();
            coins = await getJSON(config.allCoins);
            displayCoins(coins);
            hideProgress();
        }
        catch (err) {
            alert(err)
        }
    }

    async function showMoreInfo(coinId) {
        //get the data from the API and puts it in to a variable and passes it to displayCoins to be rendered
        //and puts it in the local storage, if the data is already in the local storage and 2 min haven't passed then
        //it just takes it out of the local storage and renders it. 
        //if to min pass then it is removed from the local storage
        try {
            let coinInfo = JSON.parse(localStorage.getItem(coinId));
            if (coinInfo) {
                displayMoreInfo(coinInfo);
            }
            else {
                showProgress();
                coinInfo = await getJSON(config.oneCoin + coinId);
                displayMoreInfo(coinInfo);
                localStorage.setItem(coinId, JSON.stringify(coinInfo));
                setTimeout(() => localStorage.removeItem(coinId), 1000 * 60 * 2);
                hideProgress();
            }

        }
        catch (err) {
            alert(err)
        }
    }

    function showSearch(text) {
        //this filters out the coins which are in with the value text that is put in the input search and renders it
        const foundCoins = coins.filter(c => c.symbol.toLowerCase().includes(text.toLowerCase()));
        displayCoins(foundCoins);
    }


});
$(".about").click(() => {
    //on click about active func about
    about();
});


let checkedCoinsArr = [] //creates an empty array to push the checked coins in to

    $('#container').on('change', '#swichCheck', function() {
        // if the coin is checked push the symbol of the coin into the array "checkedCoinsArr" fi its lower then 5 length
        // if not make is unchecked and call func showCheckedCoins
        // if the coin is checked and changed to uncheck remove him from the array
        if ($(this).is(':checked')) {
            if (checkedCoinsArr.length < 5) {
                checkedCoinsArr.push($(this).attr('inputCoinSymbol'))
            } else {
                $(this).prop("checked", false);
                showCheckedCoins(checkedCoinsArr);
            }
        } else if (!$(this).is(':checked')) {
            const CoinRemove = checkedCoinsArr.indexOf($(this).attr('inputCoinSymbol'));
            if (CoinRemove > -1) {
                checkedCoinsArr.splice(CoinRemove, 1);
            }
        }
        console.log(checkedCoinsArr);
    })


    const showCheckedCoins = (checkedCoinsArr) => {
        //first empty the div incase it had older coins inside it
        //then renders the symbols in the array "checkedCoinsArr"
        //removes the hidden class
        $('.tooManyPicked').html('')
        for (let i = 0; i < checkedCoinsArr.length; i++) {
            let coinPushToRemovedArr = $(`
        <div class="symbolRemove">
            <li>${checkedCoinsArr[i]}</li><button id = "btn-remove-coin" type="button" class="btn btn-info" style="color: #000;
            background-color: #00b39b;
            border-color: #0dcaf0;
            font-weight: bolder;
            font-family: revert;" classCoinData = "${checkedCoinsArr[i]}">remove coin</button></div>
        
    `)
            $('.tooManyPicked').append(coinPushToRemovedArr)
        }
        removeHidden()
    }

    $('.closeRemoveBtn').on('click', () => {
        //this closes the div that shows the checked coins by adding hide class to it
        $('.tooManyCoins').addClass('hide')
    })

    $('.tooManyCoins').on('click', '#btn-remove-coin', function() {
        //on clicking the remove coin from the checkedCoins div it removes the symbol from the array 
        //and makes the coins with that symbol become unchecked
        //then it hides the div if the array is empty
        const CoinRemove = checkedCoinsArr.indexOf($(this).attr('classCoinData'));
        if (CoinRemove > -1) {
            checkedCoinsArr.splice(CoinRemove, 1);
            $(`input[inputCoinSymbol = ${$(this).attr('classCoinData')}]`).prop("checked", false);
        }
        showCheckedCoins(checkedCoinsArr)
        if (checkedCoinsArr.length === 0) {
            $('.tooManyCoins').addClass('hide')
        }
    })

    const removeHidden = () => {
        //removes the class hide to tooManyCoins div
        $('.tooManyCoins').removeClass('hide')
    }

    


