function Applied_Information_Technician() {
    var theme = getCellValue();
  
    // discord側で作成したボットのウェブフックURL
    const discordWebHookURL = "discordWebHookURL";
    const apiKey = ScriptProperties.getProperty('APIKEY');
  
    //ChatGPTのAPIのエンドポイントを設定
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
  
    //ChatGPTに投げるメッセージを定義(ユーザーロールの投稿文のみ)
    const messages = [{'role': 'user', 'content': '応用情報技術者試験の'+theme+'分野の分野名と問題例のリストと重要語句の説明を送って'}];
  
    //OpenAIのAPIリクエストに必要なヘッダー情報を設定
    const headers = {
      'Authorization':'Bearer '+ apiKey,
      'Content-type': 'application/json',
      'X-Slack-No-Retry': 1
    };
    
    //ChatGPTモデルやトークン上限、プロンプトをオプションに設定
    const options = {
      'muteHttpExceptions' : true,
      'headers': headers, 
      'method': 'POST',
      'payload': JSON.stringify({
        'model': 'gpt-3.5-turbo',
        'max_tokens' : 1024,
        'temperature' : 0.9,
        'messages': messages})
    };
    //OpenAIのChatGPTにAPIリクエストを送り、結果を変数に格納
    const response = JSON.parse(UrlFetchApp.fetch(apiUrl, options).getContentText());
  
    // 投稿するチャット内容と設定
    const message = {
      "content": response.choices[0].message.content, // チャット本文
      "tts": false  // ロボットによる読み上げ機能を無効化
    }
  
    const param = {
      "method": "POST",
      "headers": { 'Content-type': "application/json" },
      "payload": JSON.stringify(message)
    }
  
    UrlFetchApp.fetch(discordWebHookURL, param);
  }
  
  
  function getCellValue() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("応用情報技術者試験"); // シート名を指定してシートオブジェクトを取得する
  
    var cell = sheet.getRange("E2"); // セルの範囲を指定してRangeオブジェクトを取得する
    var value = cell.getValue(); // セルの値を取得する
    var newValue = value + 1; // セルの値を1増やす
  
    if(value >= 22){
      cell.setValue(1);
      value = 1;
    }
  
    else cell.setValue(newValue); // セルの値を更新する
  
    var index = newValue; // 取得したいセルのインデックスを指定する（例えば、5番目のセルを取得する場合）
    var cell = sheet.getRange(index, 1); // 指定されたインデックスのセルの範囲を取得する
    var value = cell.getValue(); // セルの値を取得する
  
    return value;
    
  }
  
  