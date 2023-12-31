import { getLocal } from "./scripts/helpers.js";
import { ele, renderUserInfo, renderTimeline, renderLoader, renderDetailLoader, renderDetail, renderUser } from "./scripts/ui.js";
import API from "./scripts/api.js";

// local'den kullanıcı bilgilerini al
const user = getLocal("user");

// kullanıcının hangi sayfayı göreceğine karar veren fonksiyon yaz. ekranın orta kısmında yer alacak html kodunu belirler. 

const router = () => {
    // url'deki arama parametrelerine erişme
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    const query = params.get("q");

    // page'in değerine göre arayüze karar ver
    switch (page) {
        // tweet detay
        case 'status':
            // loadingi ekrana bas

            renderDetailLoader("Gönderi");

            // tweetin detaylarını api dan al
            API.getData(`/tweet.php?id=${query}`)
            // ekrana detay sayfasını bas
            .then((data) => renderDetail(data, user));
            break;

        // arama sayfası
        case 'search':
            renderDetailLoader(`${query} için sonuçlar`);

            API.getData(`/search.php?query=${query}&search_type=top`).then((data) => renderTimeline(data, ele.main, 'user_info'))
            break;

        // kullanıcı detay sayfası
        case 'user':
            // SAYFANIN yüklendiğini belirt
            renderDetailLoader(query);

            // kullanıcının bilgileri API'dan al
            API.getUser(query).then((user) => {
                // kullanıcının hesap bilgilerini ekrana bas
                renderUser(user)
                // tweetlerin geleceği yeri seçme
                const outlet = document.querySelector(".page-bottom")
                // kullanıcının attığı tweetleri al
                API.getData(`/timeline.php?screenname=${query}`).then((data) => renderTimeline(data, outlet, "author"))
            })
            break;
        
        // varsayılan olarak anasayfayı ekrana bas
        default: 
            // 1) ekrana yükleniyor bas
            renderLoader(ele.tweetsArea);

    // 2) kullanıcının tweetlerini al
    API.getData(`/timeline.php?screenname=${user.profile}`)
    // 3) tweetleri ekrana bas
    .then((data) => renderTimeline(data, ele.tweetsArea, "author"));
    }
};


// sayfa yüklenince kullanıcının bilgilerini ekrana bas
document.addEventListener("DOMContentLoaded", ()=>{
    if(user){
        // kullanıcı oturum açtıysa bilgilerini ekrana bas
        renderUserInfo(user);
    }else{
        // oturum açmadıysa login sayfasına yönlendir (authorization)
        location = "/auth.html";
    }

    
    // ekrana basılacak sayfayı belirle
    router();
});

//çıkış butonuna tıklanınca oturumu kapat
ele.logoutBtn.addEventListener("click", () => {
    // kulanıcı bilgilerini local'den kaldır
    localStorage.removeItem("user");

    // login sayfasına yönlendir
    location = "/auth.html";
})

// geri butonuna tıklanma olayını izle
ele.main.addEventListener("click",(e)=>{
    if(e.target.id === "back-btn"){
        // bir adım geriye git
        history.back();
    }
})

// arama formunun gönderilmesini izle
ele.searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    // formdaki veriye erişme
    const query = e.target[0].value;

    // sayfayı değiş
    location = `?page=search&q=${query}`;
})