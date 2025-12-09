const crypto = require('crypto');
const Session = require('../models/session');

const ALLOWED_MESSAGES = [1, 2, 3, 4, 5];

const createSession = async (req, res, next) => {
  try {
    const { from, to, message, lang } = req.body;

    if (!from || !to || typeof message === 'undefined') {
      return res.status(400).json({
        message: 'from、to、message 為必填參數',
      });
    }

    const numericMessage = Number(message);
    if (!ALLOWED_MESSAGES.includes(numericMessage)) {
      return res.status(400).json({
        message: 'message 僅能為 1、2、3、4、5 其中之一',
      });
    }

    const sessionId = crypto.randomUUID().replace(/-/g, '');
    const sessionLang = lang || 'zh';
    const domain = process.env.DOMAIN || 'http://localhost:3000';
    const shareUrl = `${domain}/?session_id=${sessionId}`;

    const session = await Session.create({
      sessionId,
      from,
      to,
      message: numericMessage,
      lang: sessionLang,
    });

    return res.status(201).json({
      session_id: session.sessionId,
      share_url: shareUrl,
      lang: session.lang,
      from: session.from,
      to: session.to,
    });
  } catch (error) {
    return next(error);
  }
};

const markSessionSent = async (req, res, next) => {
  try {
    const { session_id: sessionId } = req.body;
    if (!sessionId) {
      return res.status(400).json({ message: 'session_id 為必填參數' });
    }

    const session = await Session.findOne({ sessionId });
    if (!session) {
      return res.status(404).json({ message: '找不到對應 session' });
    }

    if (session.sentFlag === 1) {
      return res.status(200).json({
        session_id: session.sessionId,
        sent: session.sentFlag,
        used: session.usedFlag,
        message: 'session 已經被標記為已發送',
      });
    }

    session.sentFlag = 1;
    await session.save();

    return res.status(200).json({
      session_id: session.sessionId,
      sent: session.sentFlag,
      used: session.usedFlag,
    });
  } catch (error) {
    return next(error);
  }
};

const markSessionUsed = async (req, res, next) => {
  try {
    const { session_id: sessionId } = req.query;
    if (!sessionId) {
      return res.status(400).json({ message: 'session_id 為必填 query 參數' });
    }

    const session = await Session.findOne({ sessionId });
    if (!session) {
      return res.status(404).json({ message: '找不到對應 session' });
    }

    if (session.usedFlag === 1) {
      return res.status(200).json({
        from: session.from,
        to: session.to,
        message: session.message,
        lang: session.lang,
        sent: session.sentFlag,
        used: session.usedFlag,
      });
    }

    session.usedFlag = 1;
    await session.save();

    return res.status(200).json({
      from: session.from,
      to: session.to,
      message: session.message,
      lang: session.lang,
      sent: session.sentFlag,
      used: session.usedFlag,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createSession,
  markSessionSent,
  markSessionUsed,
};

