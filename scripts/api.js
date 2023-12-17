// API'a zorunlu olarak göndermemize gereken ve api-key ini içeren obje
const options = {
	method: 'GET',
	headers: {
		// 'X-RapidAPI-Key': 'gizli kalacak',
		'X-RapidAPI-Host': 'twitter-api45.p.rapidapi.com'
	}
};
export default class API {
    // KULLANICI İSMİNDEN HESAP BİLGİLERİNE ERİŞİR
    static async getUser(username){
        // 1) verileri al
        const res = await fetch(`https://twitter-api45.p.rapidapi.com/screenname.php?screenname=${username}`,options);

        // 2) json verisini javascript verisine çevir
        const data = await res.json();

        // 3) veriyi fonksiyonun çağrıldığı yere gönder
        return data;
    }

    // tweetleri alır
    static getTweets() {}
}
API.getUser();