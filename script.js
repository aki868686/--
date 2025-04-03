// カメラの映像を取得する
const video = document.getElementById("camera");
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => {
        console.error("カメラを取得できませんでした: ", error);
    });

// 撮影ボタンの処理
document.getElementById("capture").addEventListener("click", function() {
    const canvas = document.getElementById("photoCanvas");
    const ctx = canvas.getContext("2d");
    
    // Canvasのサイズをビデオと同じにする
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Canvasにビデオの画像を描画
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // 撮影した画像をAI解析（この部分は後で追加）
    document.getElementById("result").innerText = "画像が撮影されました！健康チェック中...";

    const model = await tf.loadLayersModel("https://.../model.json"); // AIモデルのURL（後で追加）

    // 画像データを取得してAIに渡す
    const imageData = tf.browser.fromPixels(canvas).resizeNearestNeighbor([224, 224]).toFloat().expandDims();
    const prediction = model.predict(imageData);
    
    // 結果を表示
    const results = await prediction.data();
    if (results[0] > 0.5) {
        document.getElementById("result").innerText = "健康そうです！";
    } else {
        document.getElementById("result").innerText = "体調が悪そうです。注意してください。";
    }

});// エサ・おやつのアドバイスデータ
const foodSuggestions = {
    healthy: "栄養バランスの良いドライフードがおすすめです。",
    caution: "消化の良いウェットフードを試してください。",
    warning: "消化に優しい特別食（低脂肪フードなど）をおすすめします。"
};

// 撮影ボタンの処理
document.getElementById("capture").addEventListener("click", async function() {
    const canvas = document.getElementById("photoCanvas");
    const ctx = canvas.getContext("2d");

    // Canvasのサイズをビデオと同じにする
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Canvasにビデオの画像を描画
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // 健康チェック中の表示
    document.getElementById("result").innerText = "健康チェック中...";

    // AIモデルをロード
    const model = await tf.loadLayersModel("https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v2_100_224/model.json");

    // 画像データをAIに渡す
    const imageData = tf.browser.fromPixels(canvas).resizeNearestNeighbor([224, 224]).toFloat().expandDims();
    const prediction = model.predict(imageData);
    
    // 結果を取得
    const results = await prediction.data();
    
    let healthStatus = "";
    if (results[0] > 0.7) {
        healthStatus = "healthy";
        document.getElementById("result").innerText = "健康そうです！";
    } else if (results[0] > 0.4) {
        healthStatus = "caution";
        document.getElementById("result").innerText = "少し注意が必要です。";
    } else {
        healthStatus = "warning";
        document.getElementById("result").innerText = "体調が悪そうです。獣医師に相談してください。";
    }

    // エサ・おやつのアドバイスを表示
    document.getElementById("foodAdvice").innerText = foodSuggestions[healthStatus];
    // 撮影ボタンの動作
document.getElementById("cameraButton").addEventListener("click", function() {
    alert("カメラが起動します！（実際の処理は後で追加）");
});
});

