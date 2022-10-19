const socket = io.connect("http://localhost:3000")

//? id'lerle gelen bligileri yakalayacağız
const sender = document.getElementById("sender")
const message = document.getElementById("message")
const submitBtn = document.getElementById("submitBtn")
const output = document.getElementById("output")
const feedback = document.getElementById("feedback")
//? Butona tıklandığında
submitBtn.addEventListener("click", () => {
    //? Butona tıklandığında socket'in chat eventine mjs yayıldı
    socket.emit("chat", {
        message: message.value, //? value'ler yukarıdaki atamadan geliyor
        sender: sender.value
    })
})



//? Serverin yaydığı dataları htmle yazma
socket.on("chat", data => {
    //? yazıyor.. kısmını temizleyelim
    feedback.innerHTML = "";
    //? output etiketinini içine html ekleme işlemi
    output.innerHTML += "<p><strong>" + data.sender + ": </strong>" + data.message + "</p>"
    //? mesaj gönderildikten sonra mesaj kutusunu temizleme
    message.value = "";
})
//? ... Yazıyor.. işlemi
//? message inputunu dinliyoruz
//? Birisi msj yazıyorken bu fonk servere bilgi verecek
message.addEventListener("keypress", () => {
    socket.emit("yaziyor", sender.value)
})

//? Yazıyor işleminin tüm browserlara iletilmesi
socket.on("yaziyor", data => {
    feedback.innerHTML = "<p>" + data + " yazıyor..";

})