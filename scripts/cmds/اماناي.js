module.exports.config = {
                        name: "اماناي",
            		version: "1.3",
	            	author: "محمد تانجيرو",
            		countDown: 5,
            		role: 0,
            		description: { ar: "إرسال صور أماناي من أنمي جوجوتسو كايسن" },
            		category: "pictures",
	            	guide: { ar: "{pn}" }
                         };

module.exports.onStart = async function({api,event,args,threadsData,usersData}) => {
const axios = require["axios"];
const request = require["request"];
const fs = require["fs-extra"];
  var link = [
     "https://i.imgur.com/cuMzlKg.jpg",
     "https://i.imgur.com/2f52Onh.jpg",
     "https://i.imgur.com/B9zE4DA.jpg",
     "https://i.imgur.com/EZa7R9C.jpg",
     "https://i.imgur.com/j5FfpWE.jpg",
     "https://i.imgur.com/Wd3456M.jpg",
     "https://i.imgur.com/4LohdyV.jpg",
     "https://i.imgur.com/H1yVPWV.jpg",
     "https://i.imgur.com/go75jjw.jpg",
     "https://i.imgur.com/3m0cEQs.jpg",
     "https://i.imgur.com/UVA3ixP.jpg",
     "https://i.imgur.com/in3Llrr.jpg",
     "https://i.imgur.com/YLDQjiS.jpg",
     "https://i.imgur.com/RoFtJSp.jpg",
     "https://i.imgur.com/dNDy1NV.jpg",
     "https://i.imgur.com/Hj32WtH.jpg",
     "https://i.imgur.com/kHIloid.jpg",
     "https://i.imgur.com/9ZcAkgT.jpg",
     "https://i.imgur.com/bK1mhER.jpg",
     "https://i.imgur.com/3JmZ1qt.jpg",
     "https://i.imgur.com/5s2Vp0a.jpg",
     "https://i.imgur.com/3sOAC6j.jpg",
     "https://i.imgur.com/fzNkEfk.jpg",
     "https://i.imgur.com/fhHIzTV.jpg",
     "https://i.imgur.com/1WNPmFD.jpg",
  ];
  var max = Math.floor(Math.random() * 6);  
  var min = Math.floor(Math.random() * 2);
  const { senderID } = event;
  var data = await usersData.get(senderID);
  var exp =  usersData.exp;
  var money = usersData.money
      if(money < 100) api.sendMessage("تحتاج: 100$ لرؤية صور أماناي 🙄",event.threadID,event.messageID)
          else {
   usersData.set(senderID, options = {money: money - 100})
   var callback = () => api.sendMessage({body: `✨        صور أماناي        💙\nمن أنمي جوجوتسو كايسن✨\n    🌹 عدد الصور : ${link.length} 🌹\n         -----------------------\n               -100$ !`,attachment: fs.createReadStream(__dirname + "/cache/1.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.jpg"), event.messageID); 
      return await(encodeURI(link[Math.floor(Math.random() * link.length)] + (max - min))).pipe(fs.createWriteStream(__dirname+"/cache/1.jpg")).on("close",() => callback());
     }
   };
