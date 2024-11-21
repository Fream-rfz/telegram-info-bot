const TelegramBot = require('node-telegram-bot-api');

const token = '7584932803:AAF59ljav41VpJk-1C94ai8Q0SL2MceAcBw'; 

const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands([
  { command: '/start', description: 'Начальное приветствие' },
  { command: '/info', description: 'Полная информация о пользователе' },
  { command: '/time', description: 'Время отправки сообщения' },
  { command: '/checkpremium', description: 'Проверить статус Telegram Premium' } 
]);

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  const messageTime = new Date(msg.date * 1000);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const formattedTime = messageTime.toLocaleDateString('ru-RU', options);

  console.log(msg);

  if (text === '/start') {
    bot.sendMessage(chatId, `Здравствуй, ${msg.from.first_name}!`);
  } else if (text === '/info') {
    const fullName = `${msg.from.first_name} ${msg.from.last_name || ''}`;
    bot.sendMessage(chatId, `Тебя зовут ${fullName}.`);
  } else if (text === '/time') {
    bot.sendMessage(chatId, `Вы отправили сообщение ${formattedTime}`);
  } else if (text === '/checkpremium') {
    const userId = msg.from.id; // Get user ID from the message sender

    bot.getChat(userId).then(user => {
      if (user.is_premium) {
        bot.sendMessage(chatId, ' У вас есть Telegram Premium! ');
      } else {
        bot.sendMessage(chatId, ' У вас нет Telegram Premium. ');
      }
    }).catch(error => {
      console.error('Error getting user info:', error);
      bot.sendMessage(chatId, 'Произошла ошибка при проверке статуса.');
    });
  }
});

bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

