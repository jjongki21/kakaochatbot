const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

// 카카오에서 오는 JSON 파싱
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Kakao ChatGPT bot server is running!');
});

// 카카오 웹훅
const axios = require('axios');

app.post('/kakao/webhook', async (req, res) => {
  const body = req.body;
  const utterance = body?.userRequest?.utterance?.trim() || '';

  console.log('User utterance:', utterance);

  let replyText = '잠시 후 다시 시도해 주세요.';

  try {
    const openaiRes = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: '너는 카카오톡 채널에서 한국어 경산/영주의 관광에 대해 알려주는 도우미 챗봇이야.대답은 친근하고 정중하되 짧게 대답해줘.' },
          { role: 'user', content: utterance }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    replyText = openaiRes.data.choices[0].message.content.trim();
  } catch (err) {
    console.error('OpenAI error:', err.response?.data || err.message);
    replyText = 'AI 응답 중 오류가 발생했어요. 나중에 다시 시도해 주세요.';
  }

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

  res.json(kakaoResponse);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is listening on port ${PORT}`);
});
