function Information_security() {

    // discord側で作成したボットのウェブフックURL
    const discordWebHookURL = "discordWebHookURL";
  
    const apiKey = ScriptProperties.getProperty('APIKEY');
  
    //ChatGPTのAPIのエンドポイントを設定
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
  
    //ChatGPTに投げるメッセージを定義(ユーザーロールの投稿文のみ)
    const messages = [{'role': 'user', 'content': '最新の情報セキュリティの話題を要約し、参照したリンクを送って'}];
  
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
  