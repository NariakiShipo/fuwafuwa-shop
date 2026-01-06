export type Language = 'zh' | 'en';

export interface Translations {
  // Navigation
  nav: {
    home: string;
    cart: string;
    title: string;
  };
  
  // Home Page
  home: {
    shopTitle: string;
  };
  
  // Pet Room
  petRoom: {
    interactions: {
      brush: string;
      play: string;
      feed: string;
    };
  };
  
  // Product
  product: {
    categories: {
      all: string;
      food: string;
      toy: string;
      accessory: string;
      brush: string;
      favorites: string;
    };
    categoryDescriptions: {
      all: string;
      food: string;
      toy: string;
      accessory: string;
      brush: string;
      favorites: string;
    };
    addToCart: string;
    stock: string;
    outOfStock: string;
    quantity: string;
    description: string;
    back: string;
  };
  
  // Cart
  cart: {
    title: string;
    empty: string;
    subtotal: string;
    checkout: string;
    remove: string;
    items: string;
  };
  
  // Reactions
  reactions: {
    hungry: string;
    excited: string;
    happy: string;
    curious: string;
    neutral: string;
  };
  
  // Sample Products
  sampleProducts: {
    dogFood: {
      name: string;
      description: string;
    };
    ball: {
      name: string;
      description: string;
    };
    bow: {
      name: string;
      description: string;
    };
    brush: {
      name: string;
      description: string;
    };
    collar: {
      name: string;
      description: string;
    };
    hat: {
      name: string;
      description: string;
    };
  };
  
  // Messages
  messages: {
    addedToCart: string;
    addToCartFailed: string;
    thankYou: string;
  };

  // Login
  login: {
    title: string;
    subtitle: string;
    username: string;
    usernamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    rememberMe: string;
    forgotPassword: string;
    loginButton: string;
    loggingIn: string;
    or: string;
    loginWithGoogle: string;
    loginWithFacebook: string;
    noAccount: string;
    signUp: string;
    backToHome: string;
    welcome: string;
    logout: string;
    logoutSuccess: string;
    logoutError: string;
    loginRequired: string;
    errors?: {
      invalidEmail: string;
      userDisabled: string;
      userNotFound: string;
      wrongPassword: string;
      invalidCredential: string;
      popupClosed: string;
      default: string;
    };
  };
}

export const translations: Record<Language, Translations> = {
  zh: {
    nav: {
      home: '首頁',
      cart: '購物車',
      title: 'FUWA FUWA 寵物商店',
    },
    home: {
      shopTitle: '商店',
    },
    petRoom: {
      interactions: {
        brush: '梳毛',
        play: '玩耍',
        feed: '餵食',
      },
    },
    product: {
      categories: {
        all: 'All.png',
        food: 'can.png',
        toy: 'ball.png',
        accessory: 'collar.png',
        brush: 'brush.png',
        favorites: 'dog_heart_press_2.png',
      },
      categoryDescriptions: {
        all: '所有商品',
        food: '寵物食品',
        toy: '寵物玩具',
        accessory: '寵物配件',
        brush: '寵物美容用品',
        favorites: '我的最愛',
      },
      addToCart: '加入購物車',
      stock: '庫存',
      outOfStock: '已售完',
      quantity: '數量',
      description: '商品說明',
      back: '← 返回',
    },
    cart: {
      title: '購物車',
      empty: '購物車是空的',
      subtotal: '小計',
      checkout: '結帳',
      remove: '刪除',
      items: '件商品',
    },
    reactions: {
      hungry: '好餓啊！',
      excited: '好想玩！',
      happy: '好開心！',
      curious: '好好奇！',
      neutral: '真不錯！',
    },
    sampleProducts: {
      dogFood: {
        name: '優質狗糧',
        description: '營養豐富的美味狗糧。支持愛犬的健康。',
      },
      ball: {
        name: 'FUWA FUWA 球',
        description: '柔軟又好玩的球。一起玩耍吧！',
      },
      bow: {
        name: '可愛蝴蝶結',
        description: '時尚的蝴蝶結讓寵物更可愛！',
      },
      brush: {
        name: '美容刷',
        description: '保持柔軟毛髮的刷子。',
      },
      collar: {
        name: '時尚項圈',
        description: '時尚又可愛的項圈。',
      },
      hat: {
        name: '時尚帽子',
        description: '讓寵物看起來更時尚的帽子。',
      },
    },
    messages: {
      addedToCart: '已加入購物車！',      addToCartFailed: '加入購物車失敗，請稍後再試',      thankYou: '感謝您的購買！',
    },
    login: {
      title: '會員登入',
      subtitle: '歡迎回到 FUWA FUWA 寵物商店',
      username: '使用者名稱',
      usernamePlaceholder: '請輸入使用者名稱或電子信箱',
      email: '電子信箱',
      emailPlaceholder: '請輸入您的電子信箱',
      password: '密碼',
      passwordPlaceholder: '請輸入您的密碼',
      rememberMe: '記住我',
      forgotPassword: '忘記密碼？',
      loginButton: '登入',
      loggingIn: '登入中...',
      or: '或',
      loginWithGoogle: '使用 Google 登入',
      loginWithFacebook: '使用 Facebook 登入',
      noAccount: '還沒有帳號嗎？',
      signUp: '立即註冊',
      backToHome: '← 返回首頁',
      welcome: '歡迎回來',
      logout: '登出',
      logoutSuccess: '登出成功',
      logoutError: '登出失敗',
      loginRequired: '請先登入才能加入購物車',
      errors: {
        invalidEmail: '電子郵件格式無效',
        userDisabled: '此帳號已被停用',
        userNotFound: '找不到此用戶',
        wrongPassword: '密碼錯誤',
        invalidCredential: '帳號或密碼錯誤',
        popupClosed: '登入視窗已關閉',
        default: '登入失敗，請稍後再試',
      },
    },
  },
  en: {
    nav: {
      home: 'Home',
      cart: 'Cart',
      title: 'FUWA FUWA Pet Shop',
    },
    home: {
      shopTitle: 'SHOP',
    },
    petRoom: {
      interactions: {
        brush: 'Brush',
        play: 'Play',
        feed: 'Feed',
      },
    },
    product: {
      categories: {
        all: 'All.png',
        food: 'can.png',
        toy: 'ball.png',
        accessory: 'collar.png',
        brush: 'brush.png',
        favorites: 'dog_heart_press_2.png',
      },
      categoryDescriptions: {
        all: 'All Products',
        food: 'Pet Food',
        toy: 'Pet Toys',
        accessory: 'Pet Accessories',
        brush: 'Pet Cosmetic Tools',
        favorites: 'My Favorites',
      },
      addToCart: 'Add to Cart',
      stock: 'Stock',
      outOfStock: 'Out of Stock',
      quantity: 'Quantity',
      description: 'Description',
      back: '← Back',
    },
    cart: {
      title: 'Shopping Cart',
      empty: 'Your cart is empty',
      subtotal: 'Subtotal',
      checkout: 'Checkout',
      remove: 'Remove',
      items: 'items',
    },
    reactions: {
      hungry: "I'm hungry!",
      excited: "Let's play!",
      happy: "I'm happy!",
      curious: "I'm curious!",
      neutral: 'Nice!',
    },
    sampleProducts: {
      dogFood: {
        name: 'Premium Dog Food',
        description: 'Nutritious and delicious dog food. Supports your beloved dog\'s health.',
      },
      ball: {
        name: 'FUWA FUWA Ball',
        description: 'Soft and fun ball. Let\'s play together!',
      },
      bow: {
        name: 'Cute Ribbon',
        description: 'Stylish ribbon makes your pet even cuter!',
      },
      brush: {
        name: 'Grooming Brush',
        description: 'Brush to maintain soft fur.',
      },
      collar: {
        name: 'Stylish Collar',
        description: 'Stylish and cute collar.',
      },
      hat: {
        name: 'Fashion Hat',
        description: 'Hat that makes your pet look more fashionable.',
      },
    },
    messages: {
      addedToCart: 'Added to cart!',      addToCartFailed: 'Failed to add to cart, please try again later',      thankYou: 'Thank you for your purchase!',
    },
    login: {
      title: 'Member Login',
      subtitle: 'Welcome back to FUWA FUWA Pet Shop',
      username: 'Username',
      usernamePlaceholder: 'Enter your username or email',
      email: 'Email',
      emailPlaceholder: 'Enter your email',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      loginButton: 'Login',
      loggingIn: 'Logging in...',
      or: 'OR',
      loginWithGoogle: 'Login with Google',
      loginWithFacebook: 'Login with Facebook',
      noAccount: "Don't have an account?",
      signUp: 'Sign up now',
      backToHome: '← Back to Home',
      welcome: 'Welcome back',
      logout: 'Logout',
      logoutSuccess: 'Logged out successfully',
      logoutError: 'Logout failed',
      loginRequired: 'Please login to add items to cart',
      errors: {
        invalidEmail: 'Invalid email format',
        userDisabled: 'This account has been disabled',
        userNotFound: 'User not found',
        wrongPassword: 'Incorrect password',
        invalidCredential: 'Invalid email or password',
        popupClosed: 'Login window was closed',
        default: 'Login failed, please try again later',
      },
    },
  },
};
