
function transl() {
    document.getElementById("nav_0").innerHTML = opt.nav_0;
    document.getElementById("nav_1").innerHTML = opt.nav_1;
    document.getElementById("nav_2").innerHTML = opt.nav_2;
    document.getElementById("start1").innerHTML = opt.start1;

    document.getElementById("banner_1").innerHTML = opt.banner_1;
    document.getElementById("banner_2").innerHTML = opt.banner_2;

    document.getElementById("special_1").innerHTML = opt.special_1;
    document.getElementById("detail_1").innerHTML = opt.detail_1;
    document.getElementById("special_2").innerHTML = opt.special_2;
    document.getElementById("detail_2").innerHTML = opt.detail_2;
    document.getElementById("special_3").innerHTML = opt.special_3;
    document.getElementById("detail_3").innerHTML = opt.detail_3;
    document.getElementById("special_4").innerHTML = opt.special_4;
    document.getElementById("detail_4").innerHTML = opt.detail_4;

    document.getElementById("download_0").innerHTML = opt.download_0;
    document.getElementById("download_1").innerHTML = opt.download_1;
    document.getElementById("download_s1").innerHTML = opt.download_s1;
    document.getElementById("download_2").innerHTML = opt.download_2;
    document.getElementById("download_s2").innerHTML = opt.download_s2;

    document.getElementById("like").innerHTML = opt.like;
    document.getElementById("like_1").innerHTML = opt.like_1;
    document.getElementById("like_2").innerHTML = opt.like_2;
    document.getElementById("like_3").innerHTML = opt.like_3;

    document.getElementById("yearly").innerHTML = opt.yearly;
    document.getElementById("buy").innerHTML = opt.buy;
    document.getElementById("buy_1").innerHTML = opt.buy_1;
    //document.getElementById("buy_2").innerHTML = opt.buy_2;
    //document.getElementById("buy_3").innerHTML = opt.buy_3;

    document.getElementById("git").innerHTML = opt.git;

};

function _change(lang) {
    if (lang == "") {
        location.href = "./index.html";
    }
    else {
        location.href = "./index.html?lang=" + lang;
    }
}

function shownav() {
    var nav = document.querySelector('.navbar-collapse');
    if (nav.style.display == 'block') {
        nav.style.display = 'none';
    }
    else {
        nav.style.display = 'block';
    }

    nav = document.querySelector('.dropdown-menu');
    nav.style.display = 'none';
}

function showmwnu() {
    var nav = document.querySelector('.dropdown-menu');
    if (nav.style.display == 'block') {
        nav.style.display = 'none';
    }
    else {
        nav.style.display = 'block';
    }
}

function orderCode(ty) {
    var orderCode = ty + new Date().getTime() + Math.floor(Math.random() * 10);
    console.log(orderCode)
    return orderCode;
}


function mail3(ty) {
    try {
       var xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
        xhr.open("GET", "https://www.photonest.io/api/visit?item_name=" + ty, true);
		xhr.send();
    } catch (e) { }
}


function mydownload1() {
    setTimeout(function () { _ischk1 = true; }, 9000);

    if (_ischk1) {
        _ischk1 = false;
        mail3("nest1");
        document.getElementById("nest1").click();
    }
}

function mydownload2() {
    setTimeout(function () { _ischk2 = true; }, 9000);

    if (_ischk2) {
        _ischk2 = false;
        mail3("nest2");
        document.getElementById("nest2").click();
    }
}

function on_change() {

    var ty = document.querySelector('[name="lic_type"]:checked').value;

    if (ty === "1") {
        document.getElementById("item_name").value = "photonest (1-year license)";
        document.getElementById("amount").value = "45.49";

    }
    else if (ty === "2") {
        document.getElementById("item_name").value = "photonest (2-year license)";
        document.getElementById("amount").value = "79.46";

    }
    else if (ty === "3") {
        document.getElementById("item_name").value = "photonest (perpetual license)";
        document.getElementById("amount").value = "97.16";
    }

    document.getElementById("item_number").value = orderCode(ty);

}

function init() {
    new WOW().init();
    tns({
        container: '.testimonial-active',
        autoplay: false,
        autoplayTimeout: 5000, autoplayButtonOutput: false, mouseDrag: true, gutter: 0, nav: false,
        navPosition: "bottom", controls: true,
        controlsText: ['<i class="lni lni-chevron-left"></i>', '<i class="lni lni-chevron-right"></i>',], items: 1,
    });
}

window.onload = function () {
    document.getElementById("item_number").value = orderCode("1");

    var nav = document.querySelector('.dropdown-menu');
    nav.style.display = 'none';

    nav = document.querySelector('.navbar-collapse');
    nav.style.display = 'none';

    var lang = "";
    if (location.href.indexOf("cn") > 0) {
        lang = "cn";
    }

    if (lang != "") {
        var c = document.getElementById("i18n");
        if (c) {
            c.remove();
        }

        var o = document.createElement("script");
        o.src = "assets/js/nest-" + lang + ".js";
        o.id = "i18n";
        o.onload = function () {
            transl();

            var nav = document.querySelector('.dropdown-menu');
            nav.style.display = 'none';

            nav = document.querySelector('.navbar-collapse');
            nav.style.display = 'none';

            init();
        };
        document.body.appendChild(o);
    }
    else {
        init();
    }

    document.onmouseup = function (e) {
        if (!e.target.classList.contains("dropdown-toggle")) {
            var nav = document.querySelector('.dropdown-menu');
            nav.style.display = 'none';
        }
    };

};
