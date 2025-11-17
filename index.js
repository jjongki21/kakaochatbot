const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

// 카카오에서 오는 JSON 파싱
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Kakao ChatGPT bot server is running!');
});

// 카카오 웹훅
app.post('/kakao/webhook', (req, res) => {
  const body = req.body;

  const utterance = body?.userRequest?.utterance?.trim() || '';

  console.log('Kakao request body:', JSON.stringify(body, null, 2));
  console.log('User utterance:', utterance);

  const replyText = `You says: ${utterance}`;

  const kakaoResponse = {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: replyText
          }
        }
      ]
    }
  };

  // 4. JSON 응답 전송
  res.json(kakaoResponse);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is listening on port ${PORT}`);
});
