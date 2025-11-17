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
  console.log('Kakao request body:', req.body);
  // TODO: 여기서 ChatGPT 호출하고 카카오 응답 포맷 맞춰서 보내기
  res.sendStatus(200);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is listening on port ${PORT}`);
});
