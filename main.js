import { getLocal } from "./scripts/helpers.js";
import { ele, renderUserInfo, renderTimeline, renderLoader } from "./scripts/ui.js";
import API from "./scripts/api.js";

// local'den kullanıcı bilgilerini al
const user = getLocal("user");


// sayfa yüklenince kullanıcının bilgilerini ekrana bas
document.addEventListener("DOMContentLoaded", ()=>{
    if(user){
        // kullanıcı oturum açtıysa bilgilerini ekrana bas
        renderUserInfo(user);
    }else{
        // oturum açmadıysa login sayfasına yönlendir (authorization)
        location = "/auth.html";
    }

    // 1) ekrana yükleniyor bas
    renderLoader(ele.tweetsArea);

    // 2) kullanıcının tweetlerini al
    API.getData(`/timeline.php?screenname=${user.profile}`)
    // 3) tweetleri ekrana bas
    .then((data) => renderTimeline(data, ele.tweetsArea));
});

//çıkış butonuna tıklanınca oturumu kapat
ele.logoutBtn.addEventListener("click", () => {
    // kulanıcı bilgilerini local'den kaldır
    localStorage.removeItem("user");

    // login sayfasına yönlendir
    location = "/auth.html";
})