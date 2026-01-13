'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('products', [
      {
        name: 'Logitech G304 Lightspeed Wireless Gaming Mouse - Black',
        stock: 150,
        description: 'Mouse gaming wireless dengan sensor HERO yang presisi dan daya tahan baterai ultra-panjang hingga 250 jam.',
        price: '499000',
        image: 'https://resource.logitech.com/content/dam/gaming/en/products/g304/g304-black-gallery-1.png',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Apple iPhone 15 Pro 128GB - Natural Titanium',
        stock: 25,
        description: 'iPhone 15 Pro. Ditempa dari titanium. Dilengkapi chip A17 Pro game-changing.',
        price: '20999000',
        image: 'https://ibox.co.id/media/catalog/product/cache/197b10222f7413669149479630c90c7e/i/p/iphone_15_pro_natural_titanium_1_1.jpg',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Samsung Galaxy S24 Ultra 5G 12/256GB - Titanium Gray',
        stock: 15,
        description: 'Galaxy AI is here. Disertai S Pen, kamera 200MP, dan prosesor Snapdragon 8 Gen 3 for Galaxy.',
        price: '21999000',
        image: 'https://images.samsung.com/is/image/samsung/p6pim/id/s24-ultra-gray-mo/gallery/id-galaxy-s24-s928-sm-s928bzqcxid-539294522?$684_547_PNG$',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Xiaomi Redmi Note 13 Pro 5G 8/256GB - Midnight Black',
        stock: 80,
        description: 'Kamera ultra-jernih 200MP dengan OIS, Layar 1.5K 120Hz AMOLED, Pengisian daya turbo 67W.',
        price: '3999000',
        image: 'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1705912497.66952765!800x800!85.png',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
        stock: 10,
        description: 'Noise cancelling terbaik di industri dengan dua prosesor dan delapan mikrofon.',
        price: '5999000',
        image: 'https://www.sony.co.id/image/6145c1d32e6ac8e63a46c912ef8a7477?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Keychron K2 Pro QMK/VIA Wireless Mechanical Keyboard',
        stock: 45,
        description: 'Keyboard mekanikal wireless 75% layout dengan fitur hot-swappable, QMK/VIA support.',
        price: '1850000',
        image: 'https://cdn.shopify.com/s/files/1/0059/0630/1017/products/Keychron-K2-Pro-QMK-VIA-wireless-mechanical-keyboard-for-Mac-Windows-Linux-hot-swappable-RGB-backlight-aluminum-frame-PBT-keycaps_1800x1800.jpg',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Logitech MX Master 3S Performance Wireless Mouse',
        stock: 60,
        description: 'Mouse ikonik yang dibuat ulang. Rasakan setiap momen alur kerjamu dengan lebih presisi.',
        price: '1689000',
        image: 'https://resource.logitech.com/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Apple MacBook Air M2 13.6 Inch 8/256GB - Midnight',
        stock: 12,
        description: 'Desain ultra tipis, chip M2 bertenaga, layar Liquid Retina, dan masa pakai baterai hingga 18 jam.',
        price: '16999000',
        image: 'https://ibox.co.id/media/catalog/product/cache/197b10222f7413669149479630c90c7e/m/a/macbook_air_m2_midnight_1_1.jpg',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'ASUS TUF Gaming A15 FA507NU - Ryzen 7 RTX 4050',
        stock: 8,
        description: 'Laptop gaming tangguh standar militer dengan AMD Ryzen 7 7735HS, GPU RTX 4050.',
        price: '17499000',
        image: 'https://dlcdnwebimgs.asus.com/gain/49d03350-13b0-4592-9366-02e1b10705a3/',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Rexus Daxa Air IV Wireless Gaming Mouse Ultra Lightweight',
        stock: 120,
        description: 'Mouse gaming lokal kualitas premium, ultra ringan, sensor Pixart PMW3370.',
        price: '659000',
        image: 'https://pro.rexus.id/wp-content/uploads/2022/07/daxa-air-iv-wireless-black.jpg',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        name: 'Uniqlo AIRism Kaos Oversize Kerah Bulat',
        stock: 300,
        description: 'Tampilan katun dengan tekstur halus AIRism. Potongan oversize yang trendi.',
        price: '199000',
        image: 'https://image.uniqlo.com/UQ/ST3/id/imagesgoods/455359/item/idgoods_00_455359.jpg',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Erigo Coach Jacket Fujinkai Navy',
        stock: 200,
        description: 'Coach Jacket Erigo dengan material Soft Parasut yang nyaman, sablon berkualitas.',
        price: '185000',
        image: 'https://down-id.img.susercontent.com/file/id-11134207-7r98v-lskp0g7n27s454',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ventela Public High Black Natural',
        stock: 150,
        description: 'Sepatu lokal paling hits. Material kanvas 12oz berkualitas, insole ultralite foam.',
        price: '329800',
        image: 'https://www.ventela.com/img/products/1/1.jpg',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Levi\'s 501 Original Fit Jeans - Onewash',
        stock: 50,
        description: 'Blue jeans original sejak 1873. Potongan lurus ikonik dengan signature button fly.',
        price: '1199000',
        image: 'https://lsco.scene7.com/is/image/lsco/005010101-front-pdp-ld?fmt=jpeg&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=880&hei=880',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Adidas Stan Smith Shoes - White/Green',
        stock: 40,
        description: 'Sepatu tenis klasik yang menjadi ikon gaya jalanan.',
        price: '1400000',
        image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b47d77dd6f9c4716a5d4a9c600f727c6_9366/Stan_Smith_Shoes_White_M20324_01_standard.jpg',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Casio G-Shock GA-2100-1A1 "CasiOak" All Black',
        stock: 65,
        description: 'Struktur Carbon Core Guard yang tipis dan tangguh. Desain oktagonal analog-digital.',
        price: '1799000',
        image: 'https://www.casio.com/content/dam/casio/product-info/locales/id/id/timepiece/product/watch/G/GA/GA2/GA-2100-1A1/assets/GA-2100-1A1.png',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        name: 'Skintific 5X Ceramide Barrier Repair Moisture Gel 30g',
        stock: 500,
        description: 'Pelembab viral yang menggabungkan 3 kandungan aktif Ceramide, Hyaluronic Acid.',
        price: '139000',
        image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//89/MTA-27339797/skintific_skintific_5x_ceramide_barrier_repair_moisture_gel_moisturizer_30g_full01_e9675276.jpg',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Wardah UV Shield Essential Sunscreen Gel SPF 30',
        stock: 450,
        description: 'Sunscreen dengan Broad Spectrum Protection, 30x lebih optimal menjaga kulit.',
        price: '35000',
        image: 'https://www.wardahbeauty.com/medias/products/large/1623910825_UV_Shield_Essential_Sunscreen_Gel_SPF_30_PA+++.png',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Somethinc Niacinamide + Moisture Beet Serum 20ml',
        stock: 300,
        description: 'Serum sejuta umat untuk mencerahkan, menyamarkan noda hitam.',
        price: '115500',
        image: 'https://somethinc.com/storage/app/uploads/public/60c/713/0c4/60c7130c45152225883259.jpg',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Maybelline Superstay Matte Ink Liquid Lipstick - 210 Versatile',
        stock: 220,
        description: 'Lip cream matte yang tahan hingga 16 jam, transferproof.',
        price: '99000',
        image: 'https://www.maybelline.co.id/~/media/mny/id/lips/liquid-lipstick/super-stay-matte-ink/210-versatile/210-versatile-1.jpg',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Philips Air Fryer HD9200/90 - 4.1L',
        stock: 35,
        description: 'Menggoreng sehat dengan sedikit atau tanpa minyak. Teknologi Rapid Air.',
        price: '1199000',
        image: 'https://images.philips.com/is/image/PhilipsConsumer/HD9200_90-IMS-id_ID?$jpglarge$&wid=960',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Miyako MCM-508 SBC Magic Com 3in1',
        stock: 60,
        description: 'Rice cooker 1.8 liter dengan panci Nanoal yang anti lengket.',
        price: '275000',
        image: 'https://www.miyako.co.id/wp-content/uploads/2020/06/MCM-508-SBC.jpg',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'LocknLock Exclusive Water Bottle 2L',
        stock: 150,
        description: 'Botol minum kapasitas besar 2 Liter, BPA Free, dengan penanda waktu.',
        price: '89000',
        image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//104/MTA-10777977/lock_n_lock_locknlock_exclusive_water_bottle_2-1l_hap736_botol_minum_kulkas_2_liter_-_biru_full02_ik2u223o.jpg',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Logitech G102 Lightsync Gaming Mouse - White',
        stock: 200,
        description: 'Mouse gaming budget terbaik dengan sensor 8000 DPI dan pencahayaan RGB.',
        price: '269000',
        image: 'https://resource.logitech.com/content/dam/gaming/en/products/g102-lightsync/g102-lightsync-white-gallery-1.png',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Fantech Aria XD7 Wireless Gaming Mouse',
        stock: 55,
        description: 'Mouse gaming super ringan dengan desain egg shape, sensor Pixart 3395.',
        price: '749000',
        image: 'https://fantech.id/wp-content/uploads/2022/07/Aria-XD7-Black.png',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Scarlett Whitening Body Lotion - Jolly',
        stock: 400,
        description: 'Body lotion dengan wangi mewah seperti parfum YSL Black Opium.',
        price: '75000',
        image: 'https://scarlettwhitening.com/assets/img/product/jolly-body-lotion.png',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Xiaomi Smart Band 8 - Graphite Black',
        stock: 150,
        description: 'Gelang pintar dengan layar AMOLED 60Hz, berbagai mode olahraga.',
        price: '499000',
        image: 'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1694762584.22635950!800x800!85.png',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Robot RT180 Powerbank 10000mAh',
        stock: 250,
        description: 'Powerbank tipis dan ringan kapasitas real 10000mAh.',
        price: '125000',
        image: 'https://img.ws.mms.shopee.co.id/id-11134207-7r98x-llg1qg54n0v15e',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Indomie Goreng Special 85g (1 Dus)',
        stock: 500,
        description: 'Mie instan goreng paling legendaris. Satu dus isi 40 bungkus.',
        price: '115000',
        image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//88/MTA-2794326/indomie_indomie-goreng-special-mie-instan--85-g-_full02.jpg',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('products', null, {});

  }
};
