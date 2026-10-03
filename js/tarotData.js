/**
 * ============================================
 *  TAROT CARD DATA
 * ============================================
 *  所有塔羅牌資料集中管理於此。
 *  如需新增 / 修改牌卡，只需編輯此檔案。
 * ============================================
 */

var TarotData = {
  cards: [
    {
      id: "the-fool",
      name: "THE FOOL",
      number: "0",
      uprightImage: "https://images.plurk.com/5sx9kaPdoyQo2QA3LudLeL.png  ",
      reversedImage: "https://images.plurk.com/30Q6g9MnCEwh7vKs83KKST.png ",
      text: "<span style=\"display: block; margin-bottom: 8px;\">𝑀𝑎𝑦 𝑡ℎ𝑒 𝑢𝑛𝑘𝑛𝑜𝑤𝑛 𝑙𝑒𝑎𝑣𝑒 𝑟𝑜𝑜𝑚 𝑓𝑜𝑟 𝑤ℎ𝑜 𝑦𝑜𝑢 𝑎𝑟𝑒.</span>「願茫茫未知，為真我留一席之地。」<br /><br />身後的退路已被濃霧吞沒。你將行囊換到另一側肩膀，循著微弱的燈火，踏入尚未看清的長廊。那時的你單純地相信，只要一直往前走，總會遇見更好的自己。於是，你笑著，將自己毫無保留地交給了未知。",
      uprightAuthor: "── 正位｜Upright ──<br />🎨：Yungu烏鴉",
      reversedAuthor: "── 逆位｜Reversed ──<br />🎨：山羊"
    },
    {
      id: "the-magician",
      name: "THE MAGICIAN",
      number: "I",
      uprightImage: "https://images.plurk.com/6hdjWInOPvFoRzE5tfHz7f.png",
      reversedImage: "assets/tarot/placeholder-reversed.svg", // Fallback until provided
      text: "<span style=\"display: block; margin-bottom: 8px;\">𝐴 𝑚𝑖𝑟𝑎𝑐𝑙𝑒 𝑏𝑒𝑔𝑖𝑛𝑠 𝑤ℎ𝑒𝑟𝑒 𝑡ℎ𝑒 𝑤𝑖𝑡𝑛𝑒𝑠𝑠 𝑓𝑜𝑟𝑔𝑒𝑡𝑠 𝑡𝑜 𝑑𝑜𝑢𝑏𝑡.</span>「當見證者遺忘了懷疑，奇蹟便悄然綻放。」<br /><br />你將空杯高舉過頭，要求他們先說出酒的滋味。當最後一雙質疑的眼眸閉上，杯底終於傳來水聲。從那一刻起，人們相信你能使無成為有。",
      uprightAuthor: "── 正位｜Upright ──<br />🎨：流水",
      reversedAuthor: "── 逆位｜Reversed ──<br />🎨：",
    },
    {
      id: "the-high-priestess",
      name: "THE HIGH PRIESTESS",
      number: "II",
      uprightImage: "https://images.plurk.com/4lrASQ8zFTkeiWrL79XMsa.png",
      reversedImage: "https://images.plurk.com/IAQv73a7MIbosJR7XLwMy.png",
      uprightText: "這是女祭司牌的正位。代表直覺、潛意識與內在智慧。",
      reversedText: "這是女祭司牌的逆位。代表忽視直覺、隱藏的秘密。"
    },
    { 
      id: "the-empress", 
      name: "THE EMPRESS", 
      number: "III", 
      uprightImage: "https://images.plurk.com/YrfAFmAVzDCgcTV8uPK7J.png", 
      reversedImage: "https://images.plurk.com/7DKHbVA6x9ubULEH9AfVYW.png", 
      uprightText: "皇后正位說明。請在此處填入您的作品說明。", 
      reversedText: "皇后逆位說明。請在此處填入您的作品說明。" 
    },
    { 
      id: "the-emperor", 
      name: "THE EMPEROR", 
      number: "IV", 
      uprightImage: "https://images.plurk.com/50oWEFJm8LxMYdjbhK0IPT.png ", 
      reversedImage: "https://images.plurk.com/yukTJ9dIMsx5qQ41cNKzB.png ", 
      uprightText: "皇帝正位說明。請在此處填入您的作品說明。", 
      reversedText: "皇帝逆位說明。請在此處填入您的作品說明。" 
    },
    { 
      id: "the-hierophant", 
      name: "THE HIEROPHANT", 
      number: "V", 
      uprightImage: "https://images.plurk.com/JtiE4Q6bLV06vEzNNpF51.png", 
      reversedImage: "assets/tarot/placeholder-reversed.svg", 
      uprightText: "教皇正位說明。請在此處填入您的作品說明。", 
      reversedText: "教皇逆位說明。請在此處填入您的作品說明。" 
    },
    { 
      id: "the-lovers", 
      name: "THE LOVERS", number: "VI", 
      uprightImage: "assets/tarot/placeholder-upright.svg", 
      reversedImage: "assets/tarot/placeholder-reversed.svg", 
      uprightText: "戀人正位說明。請在此處填入您的作品說明。", 
      reversedText: "戀人逆位說明。請在此處填入您的作品說明。" 
    },
    { 
      id: "the-chariot", 
      name: "THE CHARIOT", 
      number: "VII", uprightImage: "assets/tarot/placeholder-upright.svg", 
      reversedImage: "https://images.plurk.com/Tj1aQPIhtBo7R518hQRQx.png", 
      uprightText: "戰車正位說明。請在此處填入您的作品說明。", 
      reversedText: "戰車逆位說明。請在此處填入您的作品說明。" 
    },
    { 
      id: "strength", 
      name: "STRENGTH", 
      number: "VIII", 
      uprightImage: "assets/tarot/placeholder-upright.svg", 
      reversedImage: "assets/tarot/placeholder-reversed.svg", 
      uprightText: "力量正位說明。請在此處填入您的作品說明。", 
      reversedText: "力量逆位說明。請在此處填入您的作品說明。" 
    },
    { 
      id: "the-hermit", 
      name: "THE HERMIT", 
      number: "IX", 
      uprightImage: "assets/tarot/placeholder-upright.svg", 
      reversedImage: "assets/tarot/placeholder-reversed.svg", 
      uprightText: "隱者正位說明。請在此處填入您的作品說明。", 
      reversedText: "隱者逆位說明。請在此處填入您的作品說明。" 
    },
    { 
      id: "wheel-of-fortune", 
      name: "WHEEL OF FORTUNE", 
      number: "X", 
      uprightImage: "assets/tarot/placeholder-upright.svg", 
      reversedImage: "assets/tarot/placeholder-reversed.svg", 
      uprightText: "命運之輪正位說明。請在此處填入您的作品說明。", 
      reversedText: "命運之輪逆位說明。請在此處填入您的作品說明。" 
    },
    { 
      id: "justice", 
      name: "JUSTICE", 
      number: "XI", 
      uprightImage: "assets/tarot/placeholder-upright.svg", 
      reversedImage: "assets/tarot/placeholder-reversed.svg", 
      uprightText: "正義正位說明。請在此處填入您的作品說明。", 
      reversedText: "正義逆位說明。請在此處填入您的作品說明。" 
    },
    { 
      id: "the-hanged-man", 
      name: "THE HANGED MAN", 
      number: "XII", 
      uprightImage: "assets/tarot/placeholder-upright.svg", 
      reversedImage: "assets/tarot/placeholder-reversed.svg", 
      uprightText: "倒吊人正位說明。請在此處填入您的作品說明。", 
      reversedText: "倒吊人逆位說明。請在此處填入您的作品說明。" 
    },
    { 
      id: "death", 
      name: "DEATH",
      number: "XIII", 
      uprightImage: "assets/tarot/placeholder-upright.svg", 
      reversedImage: "assets/tarot/placeholder-reversed.svg", 
      uprightText: "死神正位說明。請在此處填入您的作品說明。", 
      reversedText: "死神逆位說明。請在此處填入您的作品說明。" 
    },
    { 
      id: "temperance", 
      name: "TEMPERANCE", 
      number: "XIV", 
      uprightImage: "assets/tarot/placeholder-upright.svg", 
      reversedImage: "assets/tarot/placeholder-reversed.svg", 
      uprightText: "節制正位說明。請在此處填入您的作品說明。", 
      reversedText: "節制逆位說明。請在此處填入您的作品說明。" 
    },
    { 
      id: "the-devil", 
      name: "THE DEVIL", 
      number: "XV", 
      uprightImage: "assets/tarot/placeholder-upright.svg", 
      reversedImage: "assets/tarot/placeholder-reversed.svg", 
      uprightText: "惡魔正位說明。請在此處填入您的作品說明。", 
      reversedText: "惡魔逆位說明。請在此處填入您的作品說明。" 
    },
    { 
      id: "the-tower", 
      name: "THE TOWER", 
      number: "XVI", 
      uprightImage: "assets/tarot/placeholder-upright.svg", 
      reversedImage: "assets/tarot/placeholder-reversed.svg", 
      uprightText: "高塔正位說明。請在此處填入您的作品說明。", 
      reversedText: "高塔逆位說明。請在此處填入您的作品說明。" 
    },
    { 
      id: "the-star", 
      name: "THE STAR", 
      number: "XVII", 
      uprightImage: "assets/tarot/placeholder-upright.svg", 
      reversedImage: "assets/tarot/placeholder-reversed.svg", 
      uprightText: "星星正位說明。請在此處填入您的作品說明。", 
      reversedText: "星星逆位說明。請在此處填入您的作品說明。" 
    },
    { 
      id: "the-moon", 
      name: "THE MOON", 
      number: "XVIII", 
      uprightImage: "assets/tarot/placeholder-upright.svg", 
      reversedImage: "assets/tarot/placeholder-reversed.svg", 
      uprightText: "月亮正位說明。請在此處填入您的作品說明。", 
      reversedText: "月亮逆位說明。請在此處填入您的作品說明。" 
    },
    { 
      id: "the-sun", 
      name: "THE SUN", 
      number: "XIX", 
      uprightImage: "assets/tarot/placeholder-upright.svg", 
      reversedImage: "assets/tarot/placeholder-reversed.svg", 
      uprightText: "太陽正位說明。請在此處填入您的作品說明。", 
      reversedText: "太陽逆位說明。請在此處填入您的作品說明。" 
    },
    { id: "judgement", 
      name: "JUDGEMENT", 
      number: "XX", 
      uprightImage: "assets/tarot/placeholder-upright.svg", 
      reversedImage: "assets/tarot/placeholder-reversed.svg", 
      uprightText: "審判正位說明。請在此處填入您的作品說明。", 
      reversedText: "審判逆位說明。請在此處填入您的作品說明。" 
    },
    { 
      id: "the-world", 
      name: "THE WORLD", 
      number: "XXI", 
      uprightImage: "assets/tarot/placeholder-upright.svg", 
      reversedImage: "assets/tarot/placeholder-reversed.svg", 
      uprightText: "世界正位說明。請在此處填入您的作品說明。", 
      reversedText: "世界逆位說明。請在此處填入您的作品說明。" 
    }
  ]
};
