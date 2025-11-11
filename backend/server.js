import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 マルッコ風チャット固定セリフ
const marukkoReplaes =[
    { keyword: "こんにちは", reply: "おや、学生さん。今日も交渉かい？" },
    { keyword: "取引", reply: "取引？それは興味深い話だねぇ……聞かせてもらおうか。" },
    { keyword: "値下げ", reply: "値下げ交渉？商売の基本だが、簡単にはいかないよ。" },
    { keyword: "さようなら", reply: "またの商談を楽しみにしているよ。" },
]

app.post("/api/chat",(req,res) =>{
    const {message} =req.body;
    let reply = ".....ふむ、それはどういう意味かな？";

    for(const r of marukkoReplaes){
        if(message.includes(r.keyword)){
            reply = r.reply;
            break;
        }
    }

    res.json({reply})
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
