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
      uprightImage: "assets/tarot/the-fool-upright.png",
      reversedImage: "assets/tarot/the-fool-reversed.jpg",
      uprightText: "這是愚者牌的正位。代表新的開始、冒險與無限可能。",
      reversedText: "這是愚者牌的逆位。代表魯莽、冒險可能帶來的風險。"
    },
    {
      id: "the-magician",
      name: "THE MAGICIAN",
      number: "I",
      uprightImage: "assets/tarot/the-magician-upright.png",
      reversedImage: "assets/tarot/the-magician-reversed.svg", // Fallback until provided
      uprightText: "這是魔術師牌的正位。代表創造力、意志力與顯化。",
      reversedText: "這是魔術師牌的逆位。代表潛能未發揮、意志薄弱。"
    },
    {
      id: "the-high-priestess",
      name: "THE HIGH PRIESTESS",
      number: "II",
      uprightImage: "assets/tarot/the-high-priestess-upright.png",
      reversedImage: "assets/tarot/the-high-priestess-reversed.jpg",
      uprightText: "這是女祭司牌的正位。代表直覺、潛意識與內在智慧。",
      reversedText: "這是女祭司牌的逆位。代表忽視直覺、隱藏的秘密。"
    }
  ]
};
