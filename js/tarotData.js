/**
 * ============================================
 *  TAROT CARD DATA
 * ============================================
 *  所有塔羅牌資料集中管理於此。
 *  如需新增 / 修改牌卡，只需編輯此檔案。
 *
 *  每張牌包含：
 *    id            — 唯一識別碼（英文小寫 + 連字號）
 *    name          — 顯示名稱（大寫英文）
 *    number        — 牌號（羅馬數字或阿拉伯數字）
 *    uprightImage  — 正位圖片路徑
 *    reversedImage — 逆位圖片路徑
 *    uprightText   — 正位展示文字
 *    reversedText  — 逆位展示文字
 * ============================================
 */

var TarotData = {
  cards: [
    {
      id: "the-fool",
      name: "THE FOOL",
      number: "0",
      uprightImage: "assets/tarot/the-fool-upright.svg",
      reversedImage: "assets/tarot/the-fool-reversed.svg",
      uprightText: "正位展示文字。請在此處填入您的作品說明。",
      reversedText: "逆位展示文字。請在此處填入您的作品說明。"
    },
    {
      id: "the-magician",
      name: "THE MAGICIAN",
      number: "I",
      uprightImage: "assets/tarot/the-magician-upright.svg",
      reversedImage: "assets/tarot/the-magician-reversed.svg",
      uprightText: "正位展示文字。請在此處填入您的作品說明。",
      reversedText: "逆位展示文字。請在此處填入您的作品說明。"
    },
    {
      id: "the-high-priestess",
      name: "THE HIGH PRIESTESS",
      number: "II",
      uprightImage: "assets/tarot/the-high-priestess-upright.svg",
      reversedImage: "assets/tarot/the-high-priestess-reversed.svg",
      uprightText: "正位展示文字。請在此處填入您的作品說明。",
      reversedText: "逆位展示文字。請在此處填入您的作品說明。"
    }
  ]
};
