$(document).ready(function () {
    function getData() {
        var shopee = $('#app-shopee-input').val() ? $('#app-shopee-input').val() : 0;
        var grab = $('#app-grab-input').val() ? $('#app-grab-input').val() : 0;
        var baemin = $('#app-baemin-input').val() ? $('#app-baemin-input').val() : 0;
        var vnPay = $('#vn-pay-input').val() ? $('#vn-pay-input').val() : 0;
        var ice = $('#ice-input').val() ? $('#ice-input').val() : 0;
        var other = $('#other-input').val() ? $('#other-input').val() : 0;
        var buyToping = $('#buy-toping-input').val() ? $('#buy-toping-input').val() : 0;
        var sellToping = $('#sell-toping-input').val() ? $('#sell-toping-input').val() : 0;
        var totalCups = $('#total-cup-input').val() ? $('#total-cup-input').val() : 0;
        var remainingCups = $('#remaining-input').val() ? $('#remaining-input').val() : 0;
        var redundancyCups = $('#redundancy-input').val() ? $('#redundancy-input').val() : 0;
        var missCups = $('#miss-input').val() ? $('#miss-input').val() : 0;
        var money = $('#money-input').val() ? $('#money-input').val() : 0;
        return [shopee,grab,baemin,vnPay,ice,other,buyToping,sellToping,totalCups,remainingCups,redundancyCups,missCups,money];
    }

    $("#cal-submit-button").on('click', function () {
        $('#notify-zone').removeClass('d-none');
        appCal()
        $('#statistical-submit-button').removeClass('d-none');
    });
    $("#statistical-submit-button").on('click', function () {
        statistical();
        $('#statistical').removeClass('d-none');
        setTimeout(function(){
            $('#statistical').addClass('d-none');
        }, 30000);
    });
    function statistical() {
        var today = new Date();
        var [shopee,grab,baemin,vnPay,ice,other,buyToping,sellToping,totalCups,remainingCups,redundancyCups,missCups,money] = getData();
        console.log(money);
        var s_shopee = Number(shopee) * 25;
        var s_grab = Number(grab) * 25;
        var s_baemin = Number(baemin) * 25;
        var s_money = (Number(totalCups) - Number(remainingCups) - Number(missCups) + Number(redundancyCups)) * 25;
        var s_sellCups = Number(totalCups) - Number(remainingCups) ;
        var date = 'Ngày: ' + today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
        
        $('#date').text(date);
        $('#id-s-shopee').text(s_shopee);
        $('#id-s-grab').text(s_grab);
        $('#id-s-baemin').text(s_baemin);
        $('#id-s-total-money').text(s_money);

        $('#id-s-vnpay').text(vnPay);
        $('#id-s-ice').text(ice);
        $('#id-s-other').text(other);
        $('#id-s-buy-toping').text(buyToping);
        $('#id-s-sell-toping').text(sellToping);

        $('#id-s-total-cups').text(totalCups);
        $('#id-s-remaining-cups').text(remainingCups);
        $('#id-s-sell-cups').text(s_sellCups);
        $('#id-s-redundancy-cups').text(redundancyCups);
        $('#id-s-miss-cups').text(missCups);

        $('#id-s-total-money').text(s_money);
        $('#id-s-box-money').text(money);
    }
    function appCal() {
        var [shopee,grab,baemin,vnPay,ice,other,buyToping,sellToping,totalCups,remainingCups,redundancyCups,missCups,money] = getData();
        var appOrder = (Number(shopee) + Number(grab) + Number(baemin)) * 25;
        var bank = Number(vnPay);
        var spend = Number(ice) + Number(other);
        var cupsSold = (Number(totalCups) - Number(remainingCups) + Number(redundancyCups) - Number(missCups)) * 25;
        var cash = cupsSold - (appOrder + bank + spend);
        var total = Number(money) - Number(cash) - Number(sellToping) + Number(buyToping);

        if (total > 0) {
            $('#notify').removeClass('text-danger');
            $('#notify').addClass('text-success');
            $('#emoji').attr("src", "images/frog/hoang-hot.png");
            $('#notify').text('Dư ' + total + 'k');
        } else if (total < 0) {
            total = Math.abs(total);
            $('#notify').text('Thiếu ' + total + 'k rồi. Ét ô ét');
            $('#emoji').attr("src", "images/frog/hoang-hot.png");
        } else {
            $('#notify').removeClass('text-danger');
            $('#notify').addClass('text-success');
            $('#emoji').attr("src", "images/frog/khoai-khoai.png");
            $('#notify').text('Đã đủ tiền!');
        }
    }
});
