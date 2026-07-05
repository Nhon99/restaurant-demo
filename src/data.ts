import { MenuItem, LocationDetails, RestaurantEvent, CareerOpportunity, GuestReview } from './types';

export const TRANSLATIONS = {
  en: {
    heroTitle: 'A Béo',
    heroSubtitle: 'Vietnamese traditional cozy kitchen and fine sushi masterworks in the heart of Hannover. Fresh ingredients prepared with love and mindfulness.',
    exploreMenu: 'Explore Menu',
    bookTable: 'Book a Table',
    buildBowl: 'Build Your Bowl',
    askAi: 'Ask AI Chef',
    ourLocations: 'Our Locations',
    categories: 'Categories',
    all: 'All',
    starters: 'Vorspeisen',
    soups: 'Salat & Suppe',
    wok: 'Hauptgerichte',
    sushi: 'Sushi & Bowls',
    drinks: 'Getränke',
    desserts: 'Desserts',
    vegTag: 'Vegan',
    spicyTag: 'Spicy',
    gfTag: 'Gluten-Free',
    bestTag: 'Bestseller',
    customizable: 'Customizable',
    addToCart: 'Add to Cart',
    customized: 'Customized',
    customizeDish: 'Customize Your Dish',
    protein: 'Choose Protein / Variation',
    spiciness: 'Select Spiciness',
    spicinessMild: 'Mild (Vietnamese style)',
    spicinessMedium: 'Medium (Slight kick)',
    spicinessHot: 'Hot (Authentic street heat)',
    none: 'None',
    extraToppings: 'Extra Toppings',
    chicken: 'Tender Chicken (+ €1.00)',
    beef: 'Sautéed Beef (+ €3.00)',
    prawns: 'King Prawns (+ €4.00)',
    tofu: 'Organic Crispy Tofu (+ €0.00)',
    duck: 'Crispy Duck (+ €3.00)',
    veggiesOnly: 'Vegetables Only (+ €0.00)',
    orderNotes: 'Special Instructions (Allergies, etc.)',
    notesPlaceholder: 'E.g., No cilantro, extra peanuts...',
    confirm: 'Confirm',
    cancel: 'Cancel',
    cart: 'Your Basket',
    emptyCart: 'Your basket is empty. Add some delicious specialties to get started!',
    subtotal: 'Subtotal',
    deliveryFee: 'Delivery Fee',
    total: 'Total',
    checkout: 'Proceed to Checkout',
    delivery: 'Delivery',
    pickup: 'Store Pickup',
    fullName: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    address: 'Delivery Address',
    postalCode: 'Postal Code (Hannover only)',
    selectTime: 'Select Time Slot',
    deliveryType: 'Order Type',
    placeOrder: 'Place Order & Pay',
    orderPlaced: 'Order Placed Successfully!',
    orderReceivedMsg: 'Thank you! Your order has been received and is being prepared in our wok kitchen.',
    orderTracker: 'Live Order Tracker',
    stepReceived: 'Order Received',
    stepPrep: 'Searing In Action',
    stepDelivery: 'Out for Delivery',
    stepArrived: 'Arrived! Enjoy!',
    tableReservation: 'Table Reservation',
    resSubtitle: 'Enjoy authentic Vietnamese dishes and sushi in our cozy, stylish space.',
    resName: 'Your Name',
    resGuests: 'Number of Guests',
    resDate: 'Date',
    resTime: 'Time',
    resLocation: 'Select Location',
    resNotes: 'Special Requests',
    bookNow: 'Confirm Reservation',
    resSuccess: 'Reservation Confirmed!',
    resSuccessMsg: 'We have reserved a table for you. A confirmation code has been generated.',
    resCode: 'Reservation Code',
    resDetails: 'Your Reservation Details',
    guests: 'guests',
    bowlBuilder: 'DIY Wok Bowl Builder',
    bowlSubtitle: 'Become the wok chef! Layer by layer, build your custom dream noodle or rice bowl.',
    bowlStep1: '1. Select Your Base',
    bowlStep2: '2. Select Your Protein',
    bowlStep3: '3. Select Your Sauce',
    bowlStep4: '4. Select Vegetables (Max 3)',
    bowlStep5: '5. Select Crunchy Toppings',
    bowlVisualizer: 'Live Bowl Layer Visualizer',
    addBowlToCart: 'Add Custom Bowl to Basket',
    aiAssistant: 'Gemini AI Dish Advisor',
    aiSubtitle: 'Need recommendations? Ask our AI Chef about your cravings, dietary needs, allergens, or the perfect sushi-drink pairing.',
    aiPlaceholder: 'Type what you feel like eating (e.g., "I am vegan and love spicy noodles" or "suggest a light gluten-free dinner")...',
    aiSending: 'AI Chef is tasting...',
    aiGreeting: 'Chào bạn! I am your A Béo AI Chef. Tell me what cravings or dietary preferences you have today, and I will recommend the perfect authentic dishes from our menu!',
    locationsTitle: 'Our Hannover Spots',
    hours: 'Opening Hours',
    statusOpen: 'OPEN NOW',
    statusClosed: 'CLOSED',
    getDirections: 'Get Directions',
    footerText: '© 2026 A Béo Vietnamesische Küche & Sushi. Developed with Vietnamese-German culinary passion.',
    language: 'Language',
    eventsTitle: 'Events & Specials',
    eventsSubtitle: 'Join us for unique cultural activities, seasonal buffets, and live masterclasses.',
    careersTitle: 'Careers / Jobs',
    careersSubtitle: 'Want to join our energetic culinary family in Hannover? Explore open vacancies below.',
    reviewsTitle: 'Guest Book & Reviews',
    reviewsSubtitle: 'Read what our guests say about us, or leave your own review.',
    writeReview: 'Leave a Review',
    yourName: 'Your Name',
    rating: 'Rating',
    comment: 'Comment',
    submitReview: 'Submit Review',
    reviewSuccess: 'Review Submitted!',
    reviewSuccessMsg: 'Thank you for your feedback! Your review will be displayed after staff moderation.',
    replyFromOwner: 'Reply from Chef / Team',
    applyNow: 'Apply Now',
    applyFormTitle: 'Quick Job Application',
    applySuccess: 'Application Sent!',
    applySuccessMsg: 'Thank you for applying! Our team will contact you shortly via email/phone.',
    requirements: 'Requirements',
    salary: 'Salary',
    jobType: 'Job Type',
    noReviewsYet: 'No reviews left yet. Be the first to share your experience!',
  },
  vi: {
    heroTitle: 'A Béo',
    heroSubtitle: 'Không gian ấm cúng phục vụ ẩm thực Việt Nam truyền thống cùng những tác phẩm sushi tinh xảo giữa lòng Hannover. Nguyên liệu tươi lành gói ghém cả tình yêu.',
    exploreMenu: 'Xem Thực Đơn',
    bookTable: 'Đặt Bàn',
    buildBowl: 'Tự Sáng Tạo Tô Wok',
    askAi: 'Hỏi Bếp Trưởng AI',
    ourLocations: 'Hệ Thống Nhà Hàng',
    categories: 'Danh Mục',
    all: 'Tất cả',
    starters: 'Món Khai Vị',
    soups: 'Salat & Súp',
    wok: 'Món Chính',
    sushi: 'Sushi & Bowls',
    drinks: 'Thức Uống',
    desserts: 'Tráng Miệng',
    vegTag: 'Chay',
    spicyTag: 'Cay',
    gfTag: 'Không Gluten',
    bestTag: 'Bán Chạy',
    customizable: 'Có Thể Tự Chọn',
    addToCart: 'Thêm Vào Giỏ',
    customized: 'Đã Chọn Option',
    customizeDish: 'Tùy Chỉnh Món Ăn',
    protein: 'Chọn Thịt/Nguồn Đạm',
    spiciness: 'Chọn Mức Độ Cay',
    spicinessMild: 'Cay Nhẹ (Kiểu Việt)',
    spicinessMedium: 'Cay Vừa',
    spicinessHot: 'Siêu Cay (Đường Phố Đích Thực)',
    none: 'Không Cay',
    extraToppings: 'Topping Thêm',
    chicken: 'Thịt Gà Tươi (+ €1.00)',
    beef: 'Thịt Bò Xào (+ €3.00)',
    prawns: 'Tôm Sú (+ €4.00)',
    tofu: 'Đậu Hũ Chiên Giòn (+ €0.00)',
    duck: 'Vịt Quay Giòn (+ €3.00)',
    veggiesOnly: 'Chỉ Lấy Rau Củ (+ €0.00)',
    orderNotes: 'Ghi Chú Đặc Biệt (Dị ứng, v.v.)',
    notesPlaceholder: 'Ví dụ: Không hành ngò, thêm đậu phộng...',
    confirm: 'Xác Nhận',
    cancel: 'Hủy Bỏ',
    cart: 'Giỏ Hàng Của Bạn',
    emptyCart: 'Giỏ hàng trống. Hãy chọn vài món ăn thơm ngon để bắt đầu!',
    subtotal: 'Tạm Tính',
    deliveryFee: 'Phí Giao Hàng',
    total: 'Tổng Cộng',
    checkout: 'Tiến Hành Đặt Hàng',
    delivery: 'Giao Hàng Tận Nơi',
    pickup: 'Tự Đến Nhận Món',
    fullName: 'Họ và Tên',
    email: 'Địa Chỉ Email',
    phone: 'Số Điện Thoại',
    address: 'Địa Chỉ Giao Hàng',
    postalCode: 'Mã Bưu Chính (Chỉ ở Hannover)',
    selectTime: 'Chọn Khung Giờ',
    deliveryType: 'Phương Thức Nhận',
    placeOrder: 'Đặt Hàng & Thanh Toán',
    orderPlaced: 'Đặt Hàng Thành Công!',
    orderReceivedMsg: 'Cảm ơn bạn! Đơn hàng đã được ghi nhận và đang được đầu bếp đảo chảo nóng hổi.',
    orderTracker: 'Theo Dõi Đơn Hàng Trực Tiếp',
    stepReceived: 'Đã Nhận Đơn',
    stepPrep: 'Bếp Đang Đỏ Lửa',
    stepDelivery: 'Shipper Đang Giao',
    stepArrived: 'Đã Giao Tới! Chúc Bạn Ngon Miệng!',
    tableReservation: 'Đặt Bàn Trước',
    resSubtitle: 'Thưởng thức ẩm thực Việt Nam và sushi ấm cúng cùng bạn bè và gia đình.',
    resName: 'Tên của Bạn',
    resGuests: 'Số Lượng Khách',
    resDate: 'Ngày',
    resTime: 'Giờ Đặt',
    resLocation: 'Chọn Chi Nhánh',
    resNotes: 'Yêu Cầu Đặc Biệt',
    bookNow: 'Xác Nhận Đặt Bàn',
    resSuccess: 'Đặt Bàn Thành Công!',
    resSuccessMsg: 'Chúng tôi đã giữ bàn cho bạn. Mã đặt bàn của bạn đã được tạo.',
    resCode: 'Mã Đặt Bàn',
    resDetails: 'Thông Tin Đặt Bàn',
    guests: 'khách',
    bowlBuilder: 'Tự Thiết Kế Tô Wok',
    bowlSubtitle: 'Trở thành bếp trưởng wok! Tự phối hợp nguyên liệu từng lớp một cho tô mì/cơm trong mơ.',
    bowlStep1: '1. Chọn Đế (Tinh Bột)',
    bowlStep2: '2. Chọn Nguồn Đạm (Protein)',
    bowlStep3: '3. Chọn Sốt Độc Quyền',
    bowlStep4: '4. Chọn Rau Củ (Tối đa 3 loại)',
    bowlStep5: '5. Chọn Topping Giòn',
    bowlVisualizer: 'Mô Phỏng Tô Wok Của Bạn',
    addBowlToCart: 'Thêm Tô Wok Tự Chế Vào Giỏ',
    aiAssistant: 'Trợ Lý Ẩm Thực Gemini AI',
    aiSubtitle: 'Cần gợi ý? Hãy hỏi Bếp Trưởng AI về sở thích, chế độ ăn kiêng, dị ứng, hoặc thức uống kết hợp sushi hoàn hảo.',
    aiPlaceholder: 'Nhập thèm muốn của bạn (Ví dụ: "Tôi muốn ăn mì sợi cay có vịt giòn" hoặc "gợi ý món chay nhẹ không gluten")...',
    aiSending: 'Bếp trưởng AI đang nếm thử...',
    aiGreeting: 'Chào bạn! Tôi là Bếp Trưởng AI của A Béo. Hãy chia sẻ sở thích ăn uống của bạn hôm nay, tôi sẽ tìm ra món ăn hoàn hảo nhất cho bạn!',
    locationsTitle: 'Các Chi Nhánh Tại Hannover',
    hours: 'Giờ Mở Cửa',
    statusOpen: 'ĐANG MỞ CỬA',
    statusClosed: 'ĐÃ ĐÓNG CỬA',
    getDirections: 'Chỉ Đường',
    footerText: '© 2026 A Béo Vietnamesische Küche & Sushi. Được phát triển với niềm đam mê ẩm thực Việt-Đức.',
    language: 'Ngôn Ngữ',
    eventsTitle: 'Sự Kiện & Ưu Đãi',
    eventsSubtitle: 'Tham gia các hoạt động văn hóa đặc sắc, tiệc buffet theo mùa và khóa học làm sushi trực tiếp.',
    careersTitle: 'Cơ Hội Nghề Nghiệp',
    careersSubtitle: 'Bạn muốn gia nhập gia đình ẩm thực tràn đầy năng lượng tại Hannover? Khám phá các vị trí đang tuyển dụng.',
    reviewsTitle: 'Lưu Bút & Đánh Giá',
    reviewsSubtitle: 'Đọc chia sẻ của khách hàng hoặc gửi lời nhận xét chân thành của riêng bạn.',
    writeReview: 'Viết Đánh Giá',
    yourName: 'Tên của bạn',
    rating: 'Đánh giá sao',
    comment: 'Nội dung nhận xét',
    submitReview: 'Gửi Đánh Giá',
    reviewSuccess: 'Gửi Đánh Giá Thành Công!',
    reviewSuccessMsg: 'Cảm ơn phản hồi của bạn! Đánh giá sẽ được hiển thị ngay sau khi nhân viên duyệt nội dung.',
    replyFromOwner: 'Phản hồi từ Bếp Trưởng / Quản lý',
    applyNow: 'Ứng Tuyển Ngay',
    applyFormTitle: 'Đơn Ứng Tuyển Nhanh',
    applySuccess: 'Nộp Đơn Thành Công!',
    applySuccessMsg: 'Cảm ơn bạn đã ứng tuyển! Bộ phận nhân sự của A Béo sẽ liên hệ với bạn sớm nhất.',
    requirements: 'Yêu cầu công việc',
    salary: 'Mức lương',
    jobType: 'Hình thức',
    noReviewsYet: 'Chưa có đánh giá nào. Hãy là người đầu tiên chia sẻ cảm nghĩ của bạn!',
  },
  de: {
    heroTitle: 'A Béo',
    heroSubtitle: 'Traditionelle vietnamesische Küche und feine Sushi-Spezialitäten im Herzen von Hannover. Frische Zutaten, mit viel Liebe zubereitet.',
    exploreMenu: 'Speisekarte',
    bookTable: 'Tisch reservieren',
    buildBowl: 'Bowl zusammenstellen',
    askAi: 'AI-Küchenchef fragen',
    ourLocations: 'Unsere Standorte',
    categories: 'Kategorien',
    all: 'Alle',
    starters: 'Vorspeisen',
    soups: 'Salat & Suppe',
    wok: 'Hauptgerichte',
    sushi: 'Sushi & Bowls',
    drinks: 'Getränke',
    desserts: 'Desserts',
    vegTag: 'Vegan',
    spicyTag: 'Scharf',
    gfTag: 'Glutenfrei',
    bestTag: 'Bestseller',
    customizable: 'Anpassbar',
    addToCart: 'In den Warenkorb',
    customized: 'Angepasst',
    customizeDish: 'Gericht anpassen',
    protein: 'Protein / Variation wählen',
    spiciness: 'Schärfegrad',
    spicinessMild: 'Mild (vietnamesischer Stil)',
    spicinessMedium: 'Mittel (Leicht scharf)',
    spicinessHot: 'Scharf (Echte Schärfe)',
    none: 'Keine Schärfe',
    extraToppings: 'Zusätzliche Toppings',
    chicken: 'Zartes Hähnchen (+ €1.00)',
    beef: 'Gebratenes Rindfleisch (+ €3.00)',
    prawns: 'Riesengarnelen (+ €4.00)',
    tofu: 'Bio-Knuspertofu (+ €0.00)',
    duck: 'Knusprige Ente (+ €3.00)',
    veggiesOnly: 'Nur Gemüse (+ €0.00)',
    orderNotes: 'Spezielle Anweisungen (Allergien usw.)',
    notesPlaceholder: 'Z.B. Kein Koriander, extra Erdnüsse...',
    confirm: 'Bestätigen',
    cancel: 'Abbrechen',
    cart: 'Ihr Warenkorb',
    emptyCart: 'Ihr Warenkorb ist leer. Fügen Sie leckere Spezialitäten hinzu!',
    subtotal: 'Zwischensumme',
    deliveryFee: 'Liefergebühr',
    total: 'Gesamt',
    checkout: 'Zur Kasse gehen',
    delivery: 'Lieferung',
    pickup: 'Selbstabholung',
    fullName: 'Vollständiger Name',
    email: 'E-Mail-Adresse',
    phone: 'Telefonnummer',
    address: 'Lieferadresse',
    postalCode: 'Postleitzahl (Nur Hannover)',
    selectTime: 'Uhrzeit wählen',
    deliveryType: 'Bestellart',
    placeOrder: 'Kostenpflichtig bestellen',
    orderPlaced: 'Bestellung erfolgreich abgeschickt!',
    orderReceivedMsg: 'Vielen Dank! Ihre Bestellung ist eingegangen und wird in unserer Küche frisch zubereitet.',
    orderTracker: 'Live-Bestellstatus',
    stepReceived: 'Bestellung eingegangen',
    stepPrep: 'Küche kocht',
    stepDelivery: 'In Zustellung',
    stepArrived: 'Geliefert! Guten Appetit!',
    tableReservation: 'Tischreservierung',
    resSubtitle: 'Genießen Sie traditionelle Gerichte und Sushi in unserem gemütlichen Ambiente.',
    resName: 'Ihr Name',
    resGuests: 'Anzahl der Personen',
    resDate: 'Datum',
    resTime: 'Uhrzeit',
    resLocation: 'Standort wählen',
    resNotes: 'Besondere Wünsche',
    bookNow: 'Reservierung bestätigen',
    resSuccess: 'Reservierung bestätigt!',
    resSuccessMsg: 'Wir haben einen Tisch für Sie reserviert. Ein Bestätigungscode wurde generiert.',
    resCode: 'Reservierungscode',
    resDetails: 'Ihre Reservierungsdetails',
    guests: 'Personen',
    bowlBuilder: 'DIY Wok-Bowl-Builder',
    bowlSubtitle: 'Werden Sie selbst zum Wok-Chef! Stellen Sie Schicht für Schicht Ihre Traum-Bowl zusammen.',
    bowlStep1: '1. Wählen Sie Ihre Basis',
    bowlStep2: '2. Wählen Sie Ihre Proteinquelle',
    bowlStep3: '3. Wählen Sie Ihre Sauce',
    bowlStep4: '4. Wählen Sie Gemüse (Max. 3)',
    bowlStep5: '5. Wählen Sie knusprige Toppings',
    bowlVisualizer: 'Live-Bowl-Visualisierung',
    addBowlToCart: 'Eigene Bowl in den Warenkorb',
    aiAssistant: 'Gemini AI-Gerichteberater',
    aiSubtitle: 'Suchen Sie Empfehlungen? Fragen Sie unseren AI-Küchenchef nach Gerichten, Diätwünschen, Allergenen oder der besten Sushi-Getränke-Kombination.',
    aiPlaceholder: 'Geben Sie Ihre Wünsche ein (Z.B. „Ich lebe vegan und mag scharfe Nudeln“ oder „Empfiehl mir ein leichtes, glutenfreies Abendessen“)...',
    aiSending: 'AI-Küchenchef schmeckt ab...',
    aiGreeting: 'Chào bạn! Ich bin Ihr A Béo AI-Küchenchef. Erzählen Sie mir von Ihren Gelüsten oder Vorlieben, und ich empfehle Ihnen die perfekten Gerichte!',
    locationsTitle: 'Unsere Spots in Hannover',
    hours: 'Öffnungszeiten',
    statusOpen: 'JETZT GEÖFFNET',
    statusClosed: 'GESCHLOSSEN',
    getDirections: 'Route berechnen',
    footerText: '© 2026 A Béo Vietnamesische Küche & Sushi. Mit vietnamesisch-deutscher Leidenschaft gekocht.',
    language: 'Sprache',
    eventsTitle: 'Events & Specials',
    eventsSubtitle: 'Erleben Sie einzigartige kulturelle Aktivitäten, saisonale Buffets und Live-Meisterkurse.',
    careersTitle: 'Karriere bei A Béo',
    careersSubtitle: 'Möchten Sie Teil unserer dynamischen kulinarischen Familie in Hannover werden? Finden Sie offene Stellen.',
    reviewsTitle: 'Gästebuch & Bewertungen',
    reviewsSubtitle: 'Lesen Sie, was unsere Gäste sagen, oder hinterlassen Sie Ihre eigene Bewertung.',
    writeReview: 'Bewertung abgeben',
    yourName: 'Ihr Name',
    rating: 'Bewertung',
    comment: 'Kommentar',
    submitReview: 'Bewertung abschicken',
    reviewSuccess: 'Bewertung gesendet!',
    reviewSuccessMsg: 'Vielen Dank für Ihr Feedback! Ihre Bewertung wird nach einer kurzen Freigabe angezeigt.',
    replyFromOwner: 'Antwort des Küchenchefs / Teams',
    applyNow: 'Jetzt bewerben',
    applyFormTitle: 'Schnellbewerbung',
    applySuccess: 'Bewerbung gesendet!',
    applySuccessMsg: 'Vielen Dank! Unser Team wird sich in Kürze mit Ihnen in Verbindung setzen.',
    requirements: 'Anforderungen',
    salary: 'Gehalt',
    jobType: 'Beschäftigung',
    noReviewsYet: 'Noch keine Bewertungen vorhanden. Seien Sie der Erste!',
  }
};

export const MENU_ITEMS: MenuItem[] = [
  // Vorspeisen (Category: starters)
  {
    id: '1',
    name: {
      en: '1 - Mini Frühlingsrollen (6St)',
      vi: '1 - Chả giò chay mini (6 cái)',
      de: '1 - Mini Frühlingsrollen (6 Stk.)'
    },
    description: {
      en: 'Crispy mini spring rolls with vegetables, served with sweet chili sauce.',
      vi: 'Chả giò mini chay chiên giòn, dùng kèm sốt tương ớt chua ngọt.',
      de: 'Knusprige Mini-Frühlingsrollen mit Gemüse gefüllt, serviert mit Süß-Sauer-Dipp.'
    },
    price: 2.90,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    tags: ['vegan'],
    customizable: false
  },
  {
    id: '2',
    name: {
      en: '2 - vietnamesische Frühlingsrollen',
      vi: '2 - Nem rán truyền thống Việt Nam',
      de: '2 - vietnamesische Frühlingsrollen'
    },
    description: {
      en: 'Rice paper rolls stuffed with chicken, glass noodles, wood-ear mushrooms, carrots, served with sweet-sour chili dipping sauce.',
      vi: 'Bánh tráng cuốn nhân thịt gà, miến, nấm mèo, cà rốt chiên giòn, kèm nước mắm chua ngọt.',
      de: 'Reispapier gefüllt mit Hühnerfleisch, Möhren, Grünen Bohnen, Nudeln, Pilzen, serviert mit Chili-Sauce.'
    },
    price: 6.50,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    tags: [],
    customizable: false
  },
  {
    id: '3',
    name: {
      en: '3 - Hausgemachter Kimchi',
      vi: '3 - Kim chi cải thảo nhà làm',
      de: '3 - Hausgemachter Kimchi'
    },
    description: {
      en: 'Fermented napa cabbage with carrots, radish, ginger, garlic and spicy heat.',
      vi: 'Cải thảo muối lên men tự nhiên cùng cà rốt, củ cải, gừng, tỏi với vị cay nồng đậm đà.',
      de: 'Fermentierter Chinakohl, Möhren, Rettich, Ingwer, Knoblauch mit würziger Schärfe.'
    },
    price: 5.50,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1583224964978-2257b960c3d3?auto=format&fit=crop&w=600&q=80',
    tags: ['spicy'],
    customizable: false
  },
  {
    id: '4',
    name: {
      en: '4 - Khoai Lang chiên',
      vi: '4 - Khoai lang chiên giòn',
      de: '4 - Khoai Lang chiên'
    },
    description: {
      en: 'Crispy sweet potato fries served with creamy spicy mayonnaise dip.',
      vi: 'Khoai lang nướng thái sợi chiên giòn rụm dùng kèm xốt bơ trứng cay.',
      de: 'Süßkartoffelpommes, dazu Spicy Mayo-Dip.'
    },
    price: 5.50,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1580976906716-0cc3193ef0f6?auto=format&fit=crop&w=600&q=80',
    tags: ['vegan'],
    customizable: false
  },
  {
    id: '5',
    name: {
      en: '5 - Gỏi cuốn (Sommerrollen)',
      vi: '5 - Gỏi cuốn tươi mát Sommerrollen',
      de: '5 - Gỏi cuốn (Sommerrollen)'
    },
    description: {
      en: 'Two rice paper rolls filled with rice noodles, cucumber, fresh salad, basil, carrots, served with lime-herb dip. Choose your favorite variation!',
      vi: 'Hai cuốn bánh tráng tôm thịt/chay với bún tươi, dưa leo, rau xà lách, rau thơm, cà rốt và xốt chấm chanh tỏi thảo mộc.',
      de: 'Je 2St Reispapierrollen gefüllt mit Reisnudeln, Gurke, Salat, Basilikum, Möhren, serviert mit Limetten-Kräuter-Dip.'
    },
    price: 5.50,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    tags: ['gluten-free', 'customizable'],
    customizable: true
  },
  {
    id: '6',
    name: {
      en: '6 - Edamame',
      vi: '6 - Đậu nành Nhật hấp muối biển',
      de: '6 - Edamame'
    },
    description: {
      en: 'Gently steamed green soybeans in pods, dusted with premium coarse sea salt grains.',
      vi: 'Đậu nành Nhật nguyên quả hấp nóng hổi, rắc hạt muối biển lớn tinh khiết.',
      de: 'Unreif geerntete Sojabohnen mit Meersalz zubereitet.'
    },
    price: 5.50,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    tags: ['vegan', 'gluten-free'],
    customizable: false
  },
  {
    id: '7',
    name: {
      en: '7 - Gyoza (5 Stück)',
      vi: '7 - Bánh xếp Gyoza áp chảo (5 cái)',
      de: '7 - Gyoza (5 Stück)'
    },
    description: {
      en: 'Fried Japanese vegetable gyoza served with sweet soy dipping sauce.',
      vi: 'Sủi cảo chay kiểu Nhật áp chảo giòn mặt dưới nhân rau củ, dùng kèm tương gừng ngọt.',
      de: 'Vegetarische Gyoza mit Gemüse gefüllt.'
    },
    price: 6.50,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    tags: ['vegan'],
    customizable: false
  },
  {
    id: '8',
    name: {
      en: '8 - Garnelen-Dumplings',
      vi: '8 - Há cảo tôm hấp Teriyaki',
      de: '8 - Garnelen-Dumplings'
    },
    description: {
      en: 'Steamed delicate dumplings filled with seasoned prawns, drizzled with sweet teriyaki sauce.',
      vi: 'Há cảo nhân tôm mọng nước hấp xửng tre truyền thống, dùng kèm sốt teriyaki đậm vị.',
      de: 'Gedämpfte Teigtaschen mit Garnelenfüllung, serviert mit Teriyaki-Sauce.'
    },
    price: 7.50,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    tags: [],
    customizable: false
  },
  {
    id: '9',
    name: {
      en: '9 - Tôm chiên cốm (3St)',
      vi: '9 - Tôm chiên cốm xanh Hà Nội (3 con)',
      de: '9 - Tôm chiên cốm (3St)'
    },
    description: {
      en: 'Crispy deep-fried prawns coated in fragrant green rice flakes, served with sweet-chili dip.',
      vi: 'Tôm sú cuộn cốm tươi Hà Nội chiên giòn xù rực rỡ, kèm xốt ngọt dịu cay nhẹ.',
      de: 'Knuspr. Garnelen ummantelt in Reisflocken, dazu Sweet Chili-Dip.'
    },
    price: 6.50,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80',
    tags: ['bestseller'],
    customizable: false
  },
  {
    id: '10',
    name: {
      en: '10 - Hawaii Style Bowl',
      vi: '10 - Bát trộn Hawaii Style tươi lành',
      de: '10 - Hawaii Style Bowl'
    },
    description: {
      en: 'Fresh salad with premium raw fish slices, avocado, edamame, wakame seaweed, cucumber, mango and sesame sauce dressing.',
      vi: 'Xà lách trộn dưa leo, bơ sáp, đậu nành Nhật, rong biển wakame, mango rưới sốt mè rang.',
      de: 'Salat mit Avocado, Edamame, Wama Wakame, Gurke, Mago und Sesamsoße.'
    },
    price: 9.20,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    tags: ['customizable'],
    customizable: true
  },
  {
    id: '11',
    name: {
      en: '11 - Asia Genussplatte für 2 Per',
      vi: '11 - Mâm ẩm thực khai vị châu Á cho 2 người',
      de: '11 - Asia Genussplatte für 2 Per'
    },
    description: {
      en: 'A shared appetizer board for two with edamame, meat spring rolls, summer rolls, crispy prawns and fries.',
      vi: 'Mâm khai vị thịnh soạn cho hai người gồm đậu nành, chả giò nhân thịt, gỏi cuốn tôm thịt, tôm tẩm cốm chiên giòn và khoai tây.',
      de: 'Edamame, Frühlingsrolle mit Fleisch, Sommerrolle, knuspr. Garnelen und Pommes.'
    },
    price: 15.90,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    tags: ['bestseller'],
    customizable: false
  },

  // Suppen & Salat (Category: soups)
  {
    id: '20',
    name: {
      en: '20 - Seetangsalat',
      vi: '20 - Gỏi rong biển wakame vừng',
      de: '20 - Seetangsalat'
    },
    description: {
      en: 'Wakame seaweed salad marinated in rich sesame oil and spices.',
      vi: 'Rau rong biển Wakame giòn dai trộn dầu mè, hạt vừng rang dậy mùi thơm đặc sắc.',
      de: 'mit Sesam in würziger Marinade und Sesamöl.'
    },
    price: 5.50,
    category: 'soups',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    tags: ['vegan'],
    customizable: false
  },
  {
    id: '21',
    name: {
      en: '21 - Nộm xoài',
      vi: '21 - Nộm xoài xanh hạt điều',
      de: '21 - Nộm xoài'
    },
    description: {
      en: 'Fresh mango salad with carrots, red onions, roasted peanuts, shallots and fresh mint herbs.',
      vi: 'Gỏi xoài xanh giòn ngọt chua dịu, trộn cà rốt, hành tím Tây, lạc rang hành phi giòn tan và lá bạc hà thảo mộc.',
      de: 'Frischer Mango-Salat, Möhren, roten Zwiebeln, Röstzwiebeln, Erdnüssen und frischer Minze.'
    },
    price: 9.50,
    category: 'soups',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    tags: ['vegan', 'bestseller'],
    customizable: false
  },
  {
    id: '22',
    name: {
      en: '22 - Nộm xoài bò',
      vi: '22 - Nộm xoài xanh thịt bò',
      de: '22 - Nộm xoài bò'
    },
    description: {
      en: 'Tender beef slices over fresh mango juliennes, carrots, roasted shallots, and fresh mint.',
      vi: 'Gỏi xoài giòn phối trộn thịt bò áp chảo mềm mại thơm ngọt tỏi, hành phi và ngò gai bạc hà.',
      de: 'Frischer Mango-Salat mit zartem Rindfleisch, Möhren, roten Zwiebeln, Röstzwiebeln, Erdnüssen und frischer Minze.'
    },
    price: 7.50,
    category: 'soups',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    tags: [],
    customizable: false
  },
  {
    id: '30',
    name: {
      en: '30 - Miso-Suppe',
      vi: '30 - Súp tương rong biển Miso Nhật',
      de: '30 - Miso-Suppe'
    },
    description: {
      en: 'Traditional Japanese soybean paste soup with tofu, seaweed, and green onions.',
      vi: 'Súp tương đậu nành Nhật thanh nhẹ sưởi ấm, đậu hũ lụa, rong biển và hành hoa tươi.',
      de: 'Tofu, Seetang, Frühlingszwiebeln.'
    },
    price: 5.50,
    category: 'soups',
    image: 'https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&w=600&q=80',
    tags: ['vegan', 'gluten-free'],
    customizable: false
  },
  {
    id: '31',
    name: {
      en: '31 - A Béo Suppe',
      vi: '31 - Súp sệt lòng đỏ trứng A Béo',
      de: '31 - A Béo Suppe'
    },
    description: {
      en: 'Boutique warm soup with sweet corn, egg whites, mushrooms, tofu, and diced carrots.',
      vi: 'Món súp gia truyền đặc trưng sánh sệt thơm bùi hạt ngô ngọt, vân trứng gà tươi, nấm hương nấm mỡ và đậu hũ.',
      de: 'Mais, Ei, Champignons, Tofu, Karotten.'
    },
    price: 5.00,
    category: 'soups',
    image: 'https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&w=600&q=80',
    tags: ['bestseller'],
    customizable: false
  },
  {
    id: '32',
    name: {
      en: '32 - A Béo Hähnchensuppe',
      vi: '32 - Súp gà ngô nấm A Béo',
      de: '32 - A Béo Hähnchensuppe'
    },
    description: {
      en: 'Boutique warm chicken soup with sweet corn, mushrooms, tofu, and egg.',
      vi: 'Súp gà gia truyền bổ dưỡng với thịt ức gà xé sợi, ngô ngọt bùi, nấm Champignon xắt nhỏ và đậu hũ lụa.',
      de: 'Mais, Ei, Champignons, Tofu, Karotten, Hähnchenfleisch.'
    },
    price: 6.00,
    category: 'soups',
    image: 'https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&w=600&q=80',
    tags: [],
    customizable: false
  },

  // Hauptgericht (Category: wok)
  {
    id: '40',
    name: {
      en: '40 - Fliegende Nudeln',
      vi: '40 - Mì bay A Béo siêu đặc biệt',
      de: '40 - Fliegende Nudeln'
    },
    description: {
      en: 'Visual spectacular flying noodles suspended above fresh salad, veggies. Choose your preferred variety!',
      vi: 'Mì trứng bay treo lơ lửng đầy nghệ thuật trên mâm xà lách, rau củ giòn, rưới sốt hấp dẫn.',
      de: 'Hausgemachte Eiernudeln mit verschiedenen Gemüse, dazu Salat, wahlweise mit Kokos-Curry Soße oder Curry-Erdnuss-Soße.'
    },
    price: 14.90,
    category: 'wok',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=600&q=80',
    tags: ['customizable', 'bestseller'],
    customizable: true
  },
  {
    id: '41',
    name: {
      en: '41 - Phở Đặc Biệt',
      vi: '41 - Phở bò/chay gia truyền thố đá',
      de: '41 - Phở'
    },
    description: {
      en: 'Traditional 12-hour slow-simmered broth infused with star anise, cinnamon. Flat rice noodles with beef, chicken, or organic tofu.',
      vi: 'Phở nước dùng ninh cực kì tinh khiết, rực hương hoa hồi quế. Bánh phở dẻo mềm kèm lát béo bùi.',
      de: 'Eine traditionelle Reisbandnudelsuppe der vietnamesischen Küche. Sie enthält eine besonders lang eingekochte Brühe.'
    },
    price: 12.90,
    category: 'wok',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80',
    tags: ['gluten-free', 'customizable'],
    customizable: true
  },
  {
    id: '42',
    name: {
      en: '42 - Bún bò Huế',
      vi: '42 - Bún bò Huế chân giò chả cua',
      de: '42 - Bún bò Huế'
    },
    description: {
      en: 'Famous central Vietnamese noodle soup in lemongrass-chili broth, beef shank slices, pork hock bone, and Vietnamese ham.',
      vi: 'Bún bò Huế cay nồng thơm lựng sả tươi từ cố đô, kèm thịt bò thăn mềm, móng giò sần sật, viên chả cua nồng ấm.',
      de: 'Würzige Reisnudelsuppe aus Zentralvietnam mit aromatischer Zitronengras-Chili-Brühe, zartem Rindfleisch, geschmorter Schweinehaxe, Rindfleischbällchen und frischen Kräutern.'
    },
    price: 15.50,
    category: 'wok',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80',
    tags: ['spicy'],
    customizable: false
  },
  {
    id: '43',
    name: {
      en: '43 - Bún thịt nướng',
      vi: '43 - Bún thịt nướng sả chanh',
      de: '43 - Bún thịt nướng'
    },
    description: {
      en: 'Grilled pork lemongrass-marinated skewers over rice vermicelli, cucumber, herbs, pickled salad and sweet-sour garlic fish sauce.',
      vi: 'Bún thịt nướng than hoa sực nức sả chanh tươi, dùng kèm giá đỗ dưa leo bào sợi, hành phi vàng rộm và nước mắm chua ngọt sệt.',
      de: 'Gegrilltes Schweinefleisch nach traditioneller vietnamesischer Art mit Reisnudeln, Koriander, Gurke, Möhren, Salat, dazu hausgemachter Limetten-Kräuter-Dip.'
    },
    price: 15.50,
    category: 'wok',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
    tags: [],
    customizable: false
  },
  {
    id: '44',
    name: {
      en: '44 - Bún Nem',
      vi: '44 - Bún chả giò nem rán đặc sản',
      de: '44 - Bún Nem'
    },
    description: {
      en: 'Rice vermicelli noodles with crispy golden meat spring rolls, fresh herbs and custom dipping fish sauce.',
      vi: 'Bún tươi ăn kèm chả giò nhân tôm thịt rán vàng giòn rau sống xắt nhỏ rưới mắm ngọt.',
      de: 'Reisnudeln mit knusprigen vietnamesischen Frühlingsrollen, frischen Kräutern und Limetten-Kräuter-Dip.'
    },
    price: 15.90,
    category: 'wok',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
    tags: [],
    customizable: false
  },
  {
    id: '45',
    name: {
      en: '45 - Bún bò Nam Bộ',
      vi: '45 - Bún bò Nam Bộ xào tỏi hành phi',
      de: '45 - Bún bò Nam Bộ'
    },
    description: {
      en: 'Southern Vietnamese stir-fried garlic beef over warm vermicelli, bean sprouts, crushed peanuts, fried shallots, and herbs.',
      vi: 'Bún bò Nam Bộ xào lăn tỏi sả thơm rực rỡ, kèm đậu phộng rang hành phi bùi bùi giòn rụm, rau sống.',
      de: 'Reisnudeln mit gebratenem Rindfleisch, frischem Salat, Gurke, Röstzwiebeln und Erdnüssen, serviert mit Limetten-Kräuter-Dip.'
    },
    price: 15.90,
    category: 'wok',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
    tags: ['bestseller'],
    customizable: false
  },
  {
    id: '46',
    name: {
      en: '46 - Nem Lụi Huế',
      vi: '46 - Nem lụi nướng sả Huế cổ truyền',
      de: '46 - Nem Lụi'
    },
    description: {
      en: 'Grilled pork skewers molded on fresh lemongrass stalks, served with fresh veggies and peanut dipping sauce.',
      vi: 'Nem lụi quấn sả nướng trên than hoa sực nức miền Trung, ăn kèm dưa muối chua ngọt, bún tươi hoặc xôi nếp cốt dừa thơm phức.',
      de: 'Vietnamesische gegrillte Schweinefleischspieße mit frischem Salat, Gurke, hausgemachtem eingelegtem Gemüse und aromatischem Limetten-Kräuter-Dip. Wahlweise mit Reisnudeln oder Klebreis.'
    },
    price: 15.90,
    category: 'wok',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
    tags: ['customizable'],
    customizable: true
  },
  {
    id: '50',
    name: {
      en: '50 - Asiatische Knusperente',
      vi: '50 - Vịt chiên giòn phong vị Á Đông',
      de: '50 - Asiatische Knusperente'
    },
    description: {
      en: 'Crispy deep-fried duck on a bed of savoy cabbage, accompanied by aromatic savory soy sauce glaze. Choose your favorite side!',
      vi: 'Vịt chiên giòn nguyên bản da bóng rụm vàng óng ả, phủ trên cải bắp thảo ngọt mềm, kèm nước xốt xì dầu sánh thơm đặc trưng.',
      de: '1/2 Knusprig gebratene Ente mit saftigem Fleisch, serviert auf Chinakohl und begleitet von aromatischer Soja-Sauce. Wahlweise mit Reis, Pommes frites oder Süßkartoffelpommes.'
    },
    price: 23.90,
    category: 'wok',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
    tags: ['customizable', 'bestseller'],
    customizable: true
  },
  {
    id: '60',
    name: {
      en: '60 - Cơm rang A Béo',
      vi: '60 - Cơm chiên chảo hạt tơi giòn',
      de: '60 - Cơm rang'
    },
    description: {
      en: 'Stir-fried jasmine rice with assorted fresh vegetables, eggs, garlic, with various customizable options.',
      vi: 'Cơm rang hạt gạo dẻo ráo tơi bọc vân trứng mỏng đảo nhiệt độ cao tỏa hương đồng nội, kèm dưa leo cà rốt.',
      de: 'Gebr. Reis mit verschiedenes Gemüse und Ei. Wahlweise mit Tofu, Hähnchen, Ente, Rind oder Garnelen.'
    },
    price: 12.90,
    category: 'wok',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
    tags: ['customizable'],
    customizable: true
  },
  {
    id: '61',
    name: {
      en: '61 - Mì Xào',
      vi: '61 - Mì trứng xào chảo Wok xém lửa',
      de: '61 - Mì Xào'
    },
    description: {
      en: 'Stir-fried egg noodles with vegetables, egg, savory garlic oyster sauce glaze. Highly customizable!',
      vi: 'Mì trứng dẻo thơm đảo chảo wok cháy cạnh sực nức hương tỏi dầu hào xào rau cải, nấm hương ngọt ngào.',
      de: 'Hausgemachte Eiernudeln, gebraten mit verschiedenes Gemüse und Ei. Wahlweise mit Tofu, Hähnchen, Ente, Rind oder Garnelen.'
    },
    price: 12.90,
    category: 'wok',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=600&q=80',
    tags: ['customizable'],
    customizable: true
  },
  {
    id: '70',
    name: {
      en: '70 - Red Thai Curry',
      vi: '70 - Cà ri đỏ cốt dừa Thái cay nồng',
      de: '70 - Red Thai Curry'
    },
    description: {
      en: 'Spicy, rich red curry with coconut cream, sweet basil, bamboo, bell peppers, zucchini, served with jasmine rice.',
      vi: 'Cà ri đỏ đậm đà kiểu Thái sánh dẻo cốt dừa béo ngậy ớt đỏ bắp non măng tre rực rỡ, kèm bát cơm nhài dẻo thơm nức.',
      de: 'Verschiedenes Gemüse in einer cremigen roten Kokos-Curry-Soße serviert mit Reis.'
    },
    price: 12.90,
    category: 'wok',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80',
    tags: ['spicy', 'customizable'],
    customizable: true
  },
  {
    id: '71',
    name: {
      en: '71 - Saigon Erdnuss - Curry',
      vi: '71 - Cà ri bơ đậu phộng Sài Gòn béo ngậy',
      de: '71 - Saigon Erdnuss - Curry'
    },
    description: {
      en: 'Velvety smooth peanut curry sauce cooked with seasonal vegetables, sweet potato cubes, basil, served with rice.',
      vi: 'Sốt cà ri bơ lạc mịn mượt như lụa nhúng đẫm rau củ, củ sen măng củ chiên sơ quyến rũ nức mũi, kèm bát cơm dẻo.',
      de: 'Verschiedenes Gemüse in einer cremigen Erdnuss-Curry-Soße, serviert mit Reis.'
    },
    price: 12.90,
    category: 'wok',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
    tags: ['customizable'],
    customizable: true
  },
  {
    id: '80',
    name: {
      en: '80 - Zisch Kitchen Feuerplatte',
      vi: '80 - Thiết bản xèo xèo Zisch Kitchen nóng hổi',
      de: '80 - Zisch Kitchen'
    },
    description: {
      en: 'Sizzling hot cast iron plate with bambus, bell peppers, mushrooms, leek and aromatic ginger.',
      vi: 'Chảo gang nóng hổi bốc khói xèo xèo thơm rực rỡ từ sả gừng tươi, ớt ngọt măng non, tỏi đen và dầu hào sánh sệt quyến rũ.',
      de: 'Gebratene Bambus, Paprik, Chamignons, Porree und Ingwer auf heißer Platte serviert (keine Feuer am Tisch). Beilage: Reis, Pommes, Süßkartoffeln.'
    },
    price: 16.50,
    category: 'wok',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
    tags: ['customizable', 'bestseller'],
    customizable: true
  },

  // Sushi & Bowls (Category: sushi)
  {
    id: '90',
    name: {
      en: '90 - Sake Bowl',
      vi: '90 - Bát trộn cơm Sushi cá hồi Sake Bowl',
      de: '90 - Sake Bolw'
    },
    description: {
      en: 'Atlantic raw salmon slices over seasoned sushi rice with avocado, cucumber, tomato, edamame, corn, sesame and sauce.',
      vi: 'Phi lê cá hồi tươi Na Uy xếp trên cơm trộn giấm sushi dẻo thơm, dưa leo bơ sáp măng tây ngô ngọt rưới nước xốt tự chọn.',
      de: 'Bowl mit Gurke, Avocado, Tomaten, Edamame, Mais, Sesam auf Sushi Reis, mit frischem Lachs und Soße nach Wahl.'
    },
    price: 16.00,
    category: 'sushi',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
    tags: ['bestseller'],
    customizable: false
  },
  {
    id: '91',
    name: {
      en: '91 - Tuna Bowl',
      vi: '91 - Bát trộn cơm Sushi cá ngừ Tuna Bowl',
      de: '91 - Tuna Bolw'
    },
    description: {
      en: 'Premium raw tuna slices over seasoned sushi rice, with cucumber, edamame, corn, and house sauces.',
      vi: 'Lát thịt cá ngừ đại dương tươi hồng xếp trên cơm dẻo chua dịu dưa leo bơ sáp béo bùi rưới xốt teriyaki gừng.',
      de: 'Bowl mit Gurke, Avocado, Tomaten, Edamame, Mais, Sesam auf Sushi Reis, mit frischem Thunfische.'
    },
    price: 17.00,
    category: 'sushi',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
    tags: [],
    customizable: false
  },
  {
    id: '93',
    name: {
      en: '93 - Buddha Bowl (Vegan)',
      vi: '93 - Bát chay Phật Pháp thanh tịnh',
      de: '93 - Buddha Bolw'
    },
    description: {
      en: 'Deep fried organic crispy tofu with sesame, avocado, seaweed, edamame over sushi rice, drizzled with sweet soy.',
      vi: 'Đậu hũ non lăn bột chiên vàng óng dưa leo bơ sáp rong biển mè rang thơm lừng thanh mát sảng khoái.',
      de: 'Bowl mit Gurke, Avocado, Tomaten, Edamame, Mais, Sesam auf Sushi Reis, mit frittiertem Tofu.'
    },
    price: 15.50,
    category: 'sushi',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    tags: ['vegan'],
    customizable: false
  },
  {
    id: '100',
    name: {
      en: '100 - Gurke Maki (6 pcs)',
      vi: '100 - Sushi cuộn dưa leo Maki thanh mát (6 viên)',
      de: '100 - Gurke Maki (6 Stk.)'
    },
    description: {
      en: 'Six bite-sized seaweed rolls stuffed with crisp, refreshing cucumber strips and seasoned sushi rice.',
      vi: 'Sáu cuộn cơm rong biển nhỏ dưa leo xanh giòn chấm kèm xì dầu gừng hồng wasabi cay nồng.',
      de: 'Maki-Klassiker mit frischer Gurke gefüllt.'
    },
    price: 4.50,
    category: 'sushi',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
    tags: ['vegan', 'gluten-free'],
    customizable: false
  },
  {
    id: '102',
    name: {
      en: '102 - Lachs Maki (6 pcs)',
      vi: '102 - Sushi cuộn cá hồi Maki (6 viên)',
      de: '102 - Lachs Maki (6 Stk.)'
    },
    description: {
      en: 'Premium fresh Atlantic salmon in seaweed sushi rolls, served with pickled ginger.',
      vi: 'Cá hồi Na Uy béo bùi đỏ hồng rực rỡ cuộn rong biển dẻo ngon đậm đà.',
      de: 'Klassisches Maki gefüllt mit feinem Wildlachs.'
    },
    price: 5.00,
    category: 'sushi',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
    tags: ['gluten-free', 'bestseller'],
    customizable: false
  },
  {
    id: '112',
    name: {
      en: '112 - Lachs Nigiri (2 pcs)',
      vi: '112 - Sushi nạm cá hồi nướng tái Nigiri (2 viên)',
      de: '112 - Lachs Nigiri (2 Stk.)'
    },
    description: {
      en: 'Premium sliced fresh Atlantic salmon over seasoned pressed sushi rice balls.',
      vi: 'Hai búp cơm giấm nạm miếng phi lê cá hồi đại dương căng mọng tươi mềm.',
      de: 'Feine Lachsscheiben auf mundgerecht gepresstem Sushi-Reis.'
    },
    price: 5.00,
    category: 'sushi',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
    tags: ['gluten-free'],
    customizable: false
  },
  {
    id: '130',
    name: {
      en: '130 - Avocado Inside-Out Roll (8 pcs)',
      vi: '130 - Sushi lộn ngược bọc bơ vừng (8 viên)',
      de: '130 - Avocado Roll (8 Stk.)'
    },
    description: {
      en: 'Creamy avocado and roasted sesame seeds, on the outside of rice rolls, with wasabi.',
      vi: 'Tám viên cơm cuộn dưa leo xốt bơ trứng lộn ngược bọc lớp vừng rang rắc quanh dẻo ngon bùi.',
      de: 'Gurke und Avocado innen, außen gerösteter Sesam.'
    },
    price: 8.00,
    category: 'sushi',
    image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80',
    tags: ['vegan'],
    customizable: false
  },
  {
    id: '140',
    name: {
      en: '140 - Green Dragon Roll (8 pcs)',
      vi: '140 - Cuộn rồng xanh Green Dragon đặc quyền (8 viên)',
      de: '140 - Green Dragon Roll (8 Stk.)'
    },
    description: {
      en: 'Crispy ebi tempura prawn, cucumber wrapped on the outside with ripe avocado sheets, masago and mayo.',
      vi: 'Nhân tôm sú tempura chiên giòn, dưa leo bọc kín bằng lá bơ chín sáp dẻo thơm rưới mayonnaise lấp lánh trứng cá chuồn.',
      de: 'Tempura-Garnele, Gurke, ummantelt mit Avocado, Mayonnaise und Masago.'
    },
    price: 16.50,
    category: 'sushi',
    image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80',
    tags: ['bestseller'],
    customizable: false
  },
  {
    id: '151',
    name: {
      en: '151 - Crunchy Mini Salmon Roll (8 pcs)',
      vi: '151 - Sushi cá hồi chiên xù giòn tan (8 viên)',
      de: '151 - Crunchy Mini Salmon Roll'
    },
    description: {
      en: 'Crispy deep-fried mini sushi rolls stuffed with salmon, creamy mayo and sesame.',
      vi: 'Cơm cuộn cá hồi Na Uy nhúng bột panko chiên vàng óng rụm rưới xốt mayo trứng béo ngậy cực thích.',
      de: 'Lachs, Mayonnaise-Sauce, Sesam. Goldgelb kross frittiert.'
    },
    price: 7.00,
    category: 'sushi',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80',
    tags: ['bestseller'],
    customizable: false
  },
  {
    id: '170',
    name: {
      en: '170 - Sushi Schiff für 2-3 Personen',
      vi: '170 - Thuyền ẩm thực Sushi lộng lẫy (2-3 người)',
      de: '170 - Für 2-3 Personen (Sushi Schiff)'
    },
    description: {
      en: 'Gigantic traditional wooden boat loaded with assortments: Ebi Tempura, 12 Maki, Sake Roll, Golden Tempura, Crunchy Veggi, and 4 Nigiri.',
      vi: 'Thuyền gỗ đại tiệc sushi hoành tráng gồm tôm tempura chiên giòn, 12 viên maki cá hồi dưa leo, cuộn lươn đặc biệt, cuộn chiên giòn rụm và 4 búp Nigiri.',
      de: '2 Ebi Tempura, 12 Maki, Sake Roll, Golden Tempura, Crunch Veggi, 4 Nigiri.'
    },
    price: 55.00,
    category: 'sushi',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
    tags: ['bestseller'],
    customizable: false
  },

  // Getränke (Category: drinks)
  {
    id: '205',
    name: {
      en: '205 - Drachenfrucht-Eistee',
      vi: '205 - Trà đá thanh long đỏ tươi mát',
      de: '205 - Drachenfrucht - Eistee'
    },
    description: {
      en: 'Refreshing chilled tea brewed with sweet red dragon fruit extract, sugarcane, and real fruit pulp slices.',
      vi: 'Trà thảo mộc ướp lạnh lắc đều cùng dịch mật quả thanh long đỏ rực rỡ, ngọt lịm bổ dưỡng thanh mát.',
      de: 'Hausgemachter erfrischender Eistee mit frischer Drachenfrucht zubereitet.'
    },
    price: 5.50,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    tags: ['vegan', 'gluten-free', 'bestseller'],
    customizable: false
  },
  {
    id: '209',
    name: {
      en: '209 - Mango Lassi',
      vi: '209 - Sữa chua lắc xoài chín lassi',
      de: '209 - Mango Lassi'
    },
    description: {
      en: 'Creamy cold beverage blended with sweet honey mangoes, yogurt, and cardamom seed spice.',
      vi: 'Thức uống dẻo mịn từ sữa chua không đường ủ ấm xay nhuyễn xoài cát chín thơm rắc xíu bột thảo quả.',
      de: 'Frische Mango, Mango-Fruchtmark, Natur-Joghurt, Milch.'
    },
    price: 6.00,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80',
    tags: ['gluten-free'],
    customizable: false
  },
  {
    id: '247',
    name: {
      en: '247 - Saigon Bier 0,33l',
      vi: '247 - Bia Sài Gòn xuất khẩu lạnh 0.33l',
      de: '247 - Saigon Bier 0,33l'
    },
    description: {
      en: 'Authentic imported Vietnamese lager beer, light, crisp, and refreshing.',
      vi: 'Chai bia sài gòn đỏ nhập khẩu mát lạnh thích hợp nhất khi dùng kèm phở mì xào.',
      de: 'Asiatisches vietnamesisches Bier, erfrischend und spritzig.'
    },
    price: 4.50,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1600788886242-5c96aabe3757?auto=format&fit=crop&w=600&q=80',
    tags: [],
    customizable: false
  },

  // Desserts (Category: desserts)
  {
    id: '180',
    name: {
      en: '180 - Chè dừa dầm Hải Phòng',
      vi: '180 - Chè dừa dầm Hải Phòng cốt dừa béo',
      de: '180 - Chè dừa dầm'
    },
    description: {
      en: 'Famous Vietnamese dessert with fresh coconut slices, jelly, sago pearls and creamy coconut milk.',
      vi: 'Món tráng miệng nổi tiếng đất cảng với cùi dừa non bào mỏng gòn sần sật, thạch dừa giòn, trân châu dai mềm ngập cốt dừa.',
      de: 'hausgemachtes Kokos-Dessert: frische Kokosnuss, aromatische getrocknete Kokosraspeln, cremige Kokosmilch und Tapioka.'
    },
    price: 6.50,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    tags: ['vegan', 'gluten-free', 'bestseller'],
    customizable: false
  },
  {
    id: '181',
    name: {
      en: '181 - Xôi kem',
      vi: '181 - Xôi kem lá nếp dừa sấy',
      de: '181 - Xôi kem'
    },
    description: {
      en: 'Steamed fragrant pandan sticky rice topped with coconut ice cream scoop, toasted coconut flakes and wafer.',
      vi: 'Hạt xôi dẻo dính xanh mướt mùi lá nếp thơm nức bốc khói nhẹ rải kem sữa dừa đông đặc mát rượi và dừa khô giòn.',
      de: 'Gedämpfter grüner Klebreis mit cremigem Kokoseis, Kokosraspeln, knusprigen Kokoschips und Waffelrolle.'
    },
    price: 6.50,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    tags: ['gluten-free'],
    customizable: false
  }
];

export const LOCATIONS: LocationDetails[] = [
  {
    id: 'loc1',
    name: 'A Béo Linden-Süd',
    address: 'Lister Meile 45, 30161 Hannover',
    phone: '+49 (0) 511 889 2314',
    hours: {
      en: 'Täglich: 11:30 - 22:00',
      vi: 'Hàng ngày: 11:30 - 22:00',
      de: 'Täglich: 11:30 - 22:00'
    },
    gmapsLink: 'https://maps.google.com/?q=Lister+Meile+45+Hannover'
  },
  {
    id: 'loc2',
    name: 'A Béo Mitte',
    address: 'Georgstraße 34, 30159 Hannover',
    phone: '+49 (0) 511 772 5689',
    hours: {
      en: 'Täglich: 11:30 - 22:00',
      vi: 'Hàng ngày: 11:30 - 22:00',
      de: 'Täglich: 11:30 - 22:00'
    },
    gmapsLink: 'https://maps.google.com/?q=Georgstraße+34+Hannover'
  }
];

export const INITIAL_EVENTS: RestaurantEvent[] = [
  {
    id: 'evt1',
    title: {
      en: 'Vietnamese Mid-Autumn Lantern Festival Buffet',
      vi: 'Đại Tiệc Buffet Trung Thu Phố Cổ',
      de: 'Vietnamesisches Mondfest & Laternen-Buffet'
    },
    description: {
      en: 'Experience a magical night with hand-crafted lanterns, traditional dragon dance, and a lavish buffet featuring traditional mooncakes and street food delights.',
      vi: 'Trải nghiệm đêm hội trăng rằm lung linh đèn lồng cổ kính, múa lân sư rồng truyền thống, cùng thực đơn đại tiệc tinh hoa ẩm thực Việt và bánh trung thu gia truyền tự làm.',
      de: 'Erleben Sie eine magische Nacht mit handgefertigten Lampions, traditionellem Drachentanz und einem reichhaltigen Buffet mit vietnamesischen Mondkuchen und Street-Food-Spezialitäten.'
    },
    date: '2026-09-18',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80',
    active: true
  },
  {
    id: 'evt2',
    title: {
      en: 'Live Sushi Masterclass with Chef Quang',
      vi: 'Khóa Học Làm Sushi Trực Tiếp Cùng Bếp Trưởng Quang',
      de: 'Live Sushi-Meisterkurs mit Meister Quang'
    },
    description: {
      en: 'Learn the sacred art of rolling perfect sushi from our master chef. Includes ingredients, sake pairing, and a certificate of completion.',
      vi: 'Học hỏi nghệ thuật cuốn sushi đỉnh cao trực tiếp từ chuyên gia của chúng tôi. Đã bao gồm nguyên liệu tươi Na Uy, rượu sake hảo hạng và chứng nhận tốt nghiệp lớp học.',
      de: 'Lernen Sie die Kunst des perfekten Sushi-Rollens von unserem Chefkoch. Inklusive frischer Zutaten, Sake-Verkostung und einem Abschlusszertifikat.'
    },
    date: '2026-07-28',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
    active: true
  },
  {
    id: 'evt3',
    title: {
      en: 'Summer Street Food Night Market',
      vi: 'Chợ Đêm Ẩm Thực Đường Phố Hè',
      de: 'Sommer-Street-Food-Nachtmarkt'
    },
    description: {
      en: 'Transforming Lister Meile into a vibrant Vietnamese night market. Enjoy live street food cooking stalls, fresh iced sugarcane juices, and traditional folk music.',
      vi: 'Biến chi nhánh Lister Meile thành một khu chợ đêm rực rỡ mang hơi thở Sài Gòn. Thưởng thức nước mía đá tươi xiên nướng than hoa rực lửa cùng giai điệu dân gian du dương.',
      de: 'Wir verwandeln die Lister Meile in einen pulsierenden vietnamesischen Nachtmarkt. Genießen Sie Live-Kochstationen, frischen Zuckerrohrsaft und traditionelle akustische Musik.'
    },
    date: '2026-08-10',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    active: true
  }
];

export const INITIAL_CAREERS: CareerOpportunity[] = [
  {
    id: 'car1',
    title: {
      en: 'Sushi Chef / Master Sushi Maker',
      vi: 'Đầu Bếp Sushi / Nghệ Nhân Cuốn Sushi',
      de: 'Sushi-Chef / Sushi-Koch'
    },
    type: {
      en: 'Full-time',
      vi: 'Toàn thời gian',
      de: 'Vollzeit'
    },
    salary: {
      en: '€3,200 - €4,000 / month',
      vi: '€3.200 - €4.000 / tháng',
      de: '3.200 € - 4.000 € / Monat'
    },
    requirements: {
      en: ['At least 2 years of professional sushi making experience', 'Deep knowledge of fish safety and hygiene regulations', 'Ability to work fast under high pressure during peak hours'],
      vi: ['Tối thiểu 2 năm kinh nghiệm làm bếp Sushi chuyên nghiệp', 'Hiểu biết sâu sắc về kiểm soát vệ sinh an toàn thực phẩm tươi sống', 'Tốc độ thao tác nhanh, chịu được áp lực cao giờ cao điểm'],
      de: ['Mindestens 2 Jahre Erfahrung in der professionellen Sushi-Zubereitung', 'Kenntnisse der Fischhygiene und Sicherheitsvorschriften', 'Belastbarkeit und Schnelligkeit während der Stoßzeiten']
    },
    description: {
      en: 'We are looking for a dedicated Sushi Maker to prepare our signature rolls, nigiri, and sashimi platters with precision and aesthetic perfection at our central Hannover location.',
      vi: 'Chúng tôi tìm kiếm đồng đội làm bếp Sushi tận tâm, chịu trách nhiệm chuẩn bị các cuộn maki đặc quyền, nigiri và thuyền sashimi tinh xảo với độ chuẩn xác và tính thẩm mỹ cao.',
      de: 'Wir suchen einen engagierten Sushi-Koch zur Zubereitung unserer Signature-Rolls, Nigiri und Sashimi-Platten mit Präzision und Ästhetik an unserem Standort in Hannover.'
    },
    active: true
  },
  {
    id: 'car2',
    title: {
      en: 'Service Crew & Guest Welcomer',
      vi: 'Nhân Viên Phục Vụ & Đón Tiếp Khách',
      de: 'Servicekraft / Kellner(in)'
    },
    type: {
      en: 'Part-time / Mini-job',
      vi: 'Bán thời gian / Mini-job',
      de: 'Teilzeit / Mini-Job'
    },
    salary: {
      en: '€14.50 - €16.50 / hour + Tips',
      vi: '€14.50 - €16.50 / giờ + Tiền boa dồi dào',
      de: '14,50 € - 16,50 € / Std. + gutes Trinkgeld'
    },
    requirements: {
      en: ['Fluent German, conversational English or Vietnamese is a plus', 'Friendly, smiling attitude and passion for Asian gastronomy', 'Previous service experience is preferred but not required'],
      vi: ['Giao tiếp tiếng Đức tốt, biết tiếng Anh hoặc tiếng Việt là lợi thế lớn', 'Thái độ vui vẻ, hiếu khách, đam mê ẩm thực Á Đông', 'Chấp nhận đào tạo từ đầu nếu chưa có kinh nghiệm phục vụ'],
      de: ['Fließend Deutsch, Englisch- oder Vietnamesischkenntnisse von Vorteil', 'Freundliches, lächelndes Auftreten und Leidenschaft für asiatische Gastronomie', 'Vorerfahrung im Service erwünscht, aber kein Muss']
    },
    description: {
      en: 'Become the warm face of A Béo. You will welcome guests, take table reservations, recommend dishes, and ensure everyone leaves with a happy stomach and a smile.',
      vi: 'Trở thành gương mặt nụ cười của A Béo. Bạn sẽ chào đón thực khách, nhận đặt bàn, gợi ý thực đơn thích hợp và đem lại không gian ẩm thực ấm áp hạnh phúc nhất.',
      de: 'Werden Sie das freundliche Gesicht von A Béo. Sie begrüßen Gäste, nehmen Bestellungen auf, empfehlen Gerichte und sorgen für eine herzliche Wohlfühlatmosphäre.'
    },
    active: true
  }
];

export const INITIAL_REVIEWS: GuestReview[] = [
  {
    id: 'rev1',
    name: 'Sarah Lehmann',
    rating: 5,
    comment: 'Die Fliegenden Nudeln hier sind einfach der Wahnsinn! Das Auge isst definitiv mit. Sehr gemütliche Stimmung und super nettes Team!',
    date: '2026-06-28',
    reply: 'Vielen Dank für das tolle Lob, Sarah! Wir freuen uns sehr auf deinen nächsten Besuch!',
    status: 'approved'
  },
  {
    id: 'rev2',
    name: 'Trần Minh Hoàng',
    rating: 5,
    comment: 'Phở bò thố đá siêu đỉnh! Nước dùng thanh ngọt từ xương bò ninh lâu, bốc khói nghi ngút giữ nóng đến thìa cuối cùng. Chuẩn vị Hà Nội xưa tại Hannover.',
    date: '2026-06-30',
    reply: 'Cảm ơn anh Hoàng nhiều ạ! Bếp trưởng luôn ninh xương chuẩn 18 tiếng để giữ đúng hương vị quê nhà đó anh.',
    status: 'approved'
  },
  {
    id: 'rev3',
    name: 'Michael K.',
    rating: 4,
    comment: 'Super frisches Sushi und sehr schickes Ambiente. Abends sollte man auf jeden Fall reservieren, da es sehr voll wird.',
    date: '2026-06-25',
    reply: 'Danke Michael! Ein guter Hinweis, am Wochenende ist eine Reservierung über unsere Website tatsächlich sehr empfehlenswert.',
    status: 'approved'
  }
];

