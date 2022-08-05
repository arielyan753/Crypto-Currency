"use strict";

function displayCoins(coins) {
    //this empty the container of the coins and returns only 100 coins to the function that renders them
    $("#container").empty();

    if(!coins) return;
    for(let i = 0; i < 100; i++) {
        displayOneCoin(coins[i]);
    }
}

function displayOneCoin(coin) {
    //this function renders each coin of the array of coins and passes the symbol,name and id of each coin
    const card = `
        <div class="coin">
            <div class = 'symbol'>
                Symbol: ${coin.symbol} 
            </div>
            <div class = 'name'>
                <u>Name:</u> ${coin.name}
            </div>
            <button class="btn-more-info btn" style="background: linear-gradient(
                49deg, rgb(23 48 42) 0%, rgb(81 163 155) 73%, rgb(0 255 222) 100%); border: 1px solid black;color: rgb(164 240 255);
                font-family: 'Fredoka One', cursive;" data-coin-id="${coin.id}">More Info <i class="fas fa-coins"></i></button>
            <div id="${coin.id}" class="more-info"></div>
            <label class="switch">
            <input type="checkbox" class="toggleCoin" id="swichCheck" inputCoinSymbol=${coin.symbol} >
            <span class="slider round"></span>
        </label> 
        </div>
    `;
    $("#container").append(card);
}

function displayMoreInfo(coinInfo) {
    //this renders the info money value of the coin chosen by clicking "more info" btn and the img icon of the coin
    $(`#${coinInfo.id}`).html(`
        <span>${coinInfo.market_data.current_price.usd.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}$</span>
        <br>
        <span>${coinInfo.market_data.current_price.eur.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}€</span>
        <br>
        <span>${coinInfo.market_data.current_price.ils.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}₪</span>
        <br>
        <img src="${coinInfo.image.small}">
    `);
}

function showProgress() {
    //changes visibility to visible css loading bar
    $("#loading").css("visibility", "visible");
}

function hideProgress() {
    //changes visibility to hidden css loading bar
    $("#loading").css("visibility", "hidden");
}



function about() {
    //changes container div with the about_card div
    console.log('hey')
    $("#container").fadeOut(400)
    $("#about_card").css("visibility", "visible").fadeIn();
}



