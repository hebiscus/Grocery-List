#! /usr/bin/env node

  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Product = require("./models/product")
  const ProductCategory = require("./models/productCategory")
  const Store = require("./models/store")
  
  const products = [];
  const productCategories = [];
  const stores = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false); // Prepare for Mongoose 7
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createProductCategories();
    await createProducts();
    await createStores();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  async function productCreate(index, name, description, category, price) {
    const productDetail = {
      name: name, 
      category: category,
      price: price, 
    };
    if (description != false) productDetail.description = description;

    const product = new Product(productDetail);
    await product.save();
    products[index] = product;
    console.log(`Added new product: ${name}`);
  }

  async function productCategoryCreate(index, name, description) {
    const productCategoryDetail = { name: name };
    if (description != false) productCategoryDetail.description = description;

    const productCategory = new ProductCategory(productCategoryDetail);
    await productCategory.save();
    productCategories[index] = productCategory;
    console.log(`Added new category ${name}`)
  }

  async function storeCreate(index, name, description, products) {
    const storeDetail = { name: name };
    if (description != false) storeDetail.description = description;
    if (products != false) storeDetail.products = products;

    const store = new Store(storeDetail);
    await store.save();
    stores[index] = store;
    console.log(`Added new store ${name}`)
  }

  async function createProducts() {
    await Promise.all([
      productCreate(0, "Carrot", 
      `The carrot (Daucus carota subsp. sativus) is a root vegetable, typically orange in color, though purple, black, red, white, 
      and yellow cultivars exist, all of which are domesticated forms of the wild carrot, Daucus carota, native to Europe and Southwestern Asia. 
      The plant probably originated in Persia and was originally cultivated for its leaves and seeds. The most commonly eaten part of the plant is the taproot, 
      although the stems and leaves are also eaten.`,
      productCategories[0], 5.59,),
      productCreate(1, "Tomato",
      `The tomato is an edible berry of the plant Solanum lycopersicum, commonly known as the tomato plant.
      Tomatoes are a significant source of umami flavor. They are consumed in diverse ways: raw or cooked, and in many dishes, sauces, salads, and drinks.`,
      productCategories[1], 3.36),
      productCreate(2, "Greek yoghurt",
      `Strained yogurt, Greek yogurt, yogurt cheese, sack yogurt, or kerned yogurt is an Arab yogurt that has been strained to remove most of its whey, 
      resulting in a thicker consistency than normal unstrained yogurt, while still preserving the distinctive sour taste of yogurt. Like many types, 
      strained yogurt is often made from milk enriched by boiling off some water content, or by adding extra butterfat and powdered milk.`,
      productCategories[2], 4.50),
      productCreate(3, "Onion",
      `An onion, also known as the bulb onion or common onion, is a vegetable that is the most widely 
      cultivated species of the genus Allium. The shallot is a botanical variety of the onion which was classified as a separate species until 2011.
      Its close relatives include garlic, scallion, leek, and chive.`,
      productCategories[0], 0.99),
      productCreate(4, "Raspberry",
      `A raspberry is an aggregate fruit, developing from the numerous distinct carpels of a single flower. What distinguishes the raspberry from its 
      blackberry relatives is whether or not the torus (receptacle or stem) "picks with" (i.e., stays with) the fruit. When picking a blackberry fruit, 
      the torus stays with the fruit. With a raspberry, the torus remains on the plant, leaving a hollow core in the raspberry fruit.`,
      productCategories[1], 8.89),
    ]);
  }

  async function createProductCategories() {
    await Promise.all([
      productCategoryCreate(0, "Vegetables", 
      `Vegetables are parts of plants that are consumed by humans or other animals as food. 
      The original meaning is still commonly used and is applied to plants collectively to refer to all edible plant matter, 
      including the flowers, fruits, stems, leaves, roots, and seeds. An alternative definition of the term is applied somewhat arbitrarily, 
      often by culinary and cultural tradition. It may exclude foods derived from some plants that are fruits, flowers, nuts, and cereal grains, 
      but include savoury fruits such as tomatoes and courgettes, flowers such as broccoli, and seeds such as pulses.`),
      productCategoryCreate(1, "Fruits", 
      `Fruits are the means by which flowering plants (also known as angiosperms) disseminate their seeds. 
      Edible fruits in particular have long propagated using the movements of humans and animals in a symbiotic relationship that is the means 
      for seed dispersal for the one group and nutrition for the other; in fact, humans and many animals have become dependent on fruits as a 
      source of food. Consequently, fruits account for a substantial fraction of the world's agricultural output, and some (such as the apple 
      and the pomegranate) have acquired extensive cultural and symbolic meanings.`),
      productCategoryCreate(2, "Dairy", 
      `The attributive dairy describes milk-based products, derivatives and processes, and the animals and workers involved in their production, 
      for example dairyman, dairymaid, dairy cattle or dairy goat. A dairy farm produces milk and a dairy factory processes it into a variety 
      of dairy products. These establishments constitute the global dairy industry, part of the food industry.`),
    ])
  }

  async function createStores() {
    await Promise.all([
      storeCreate(0, "Tesco", 
      `Tesco plc is a British multinational groceries and general merchandise retailer headquartered in Welwyn Garden City, 
      England. In 2011 it was the third-largest retailer in the world measured by gross revenues and the ninth-largest in the 
      world measured by revenues. It has shops in Ireland, the United Kingdom, the Czech Republic, Hungary, and Slovakia.`,
      [products[0], products[1], products[4]]),
      storeCreate(1, "Lidl",
      `Lidl Stiftung & Co. KG is a German international discount retailer chain that operates over 12,000 stores across 
      Europe and the United States. Headquartered in Neckarsulm, Baden-Württemberg, the company belongs to the Schwarz Group, 
      which also operates the hypermarket chain Kaufland. There are Lidl stores in every member state of the European Union 
      as well as in Serbia, Switzerland, the United Kingdom and the United States.`,
      [products[3]]),
      storeCreate(2, "Carrefour",
      `Carrefour is a French multinational retail and wholesaling corporation headquartered 
      in Massy, France. The eighth-largest retailer in the world by revenue, it operates a chain of hypermarkets, groceries stores 
      and convenience stores, which as of December 2021, comprises 13,894 stores in over 30 countries.`,
      [products[0], products[1], products[2], products[3], products[4],]),
    ])
  }

  
  