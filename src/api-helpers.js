import axios from 'axios';

export const getFeaturedCollection = async() => {

    let res;

    try{
         res = await axios.get(`collection/featured`)
    }catch(err){
        console.log(err);
    }

    // console.log(res.data.collection) ;
    return res.data.collection;
};

export const getLatestCollection = async() => {

    let res;

    try{
         res = await axios.get(`collection/latest`)
    }catch(err){
        console.log(err);
    }

    // console.log(res.data) ;
    return res.data;
};

export const getBestCollection = async() => {

    let res;

    try{
         res = await axios.get(`collection/best`)
    }catch(err){
        console.log(err);
    }

    // console.log(res.data) ;
    return res.data;
};

export const getProductByCollection = async(collectionId) => {

    let res;
    // console.log(collectionId);

    try{
         res = await axios.get(`product/collection?id=${collectionId}`)
    }catch(err){
        console.log(err);
    }

    // console.log(res.data.products) ;
    return res.data.products;
};

export const getAllCollection = async() => {

    let res;

    try{
         res = await axios.get(`collection`)
    }catch(err){
        console.log(err);
    }

    // console.log(res.data.collections) ;
    return res?.data?.collections;
}

export const getAllCategories = async() => {

    let res;

    try{
         res = await axios.get(`product/category`)
    }catch(err){
        console.log(err);
    }

    // console.log(res.data.categories) ;
    return res.data.categories;
}

export const getProductById = async(id) => {

    let res;

    try{
         res = await axios.get(`product/?id=${id}`)
    }catch(err){
        console.log(err);
        
    }

    // console.log(res.data.product) ;
    return res.data.product;
}

export const getAllProducts = async() => {

    let res;

    try{
         res = await axios.get(`product/all`)
    }catch(err){
        console.log(err);
    }

    console.log(res.data) ;
    return res.data;
}

export const calculateOrder = async(order) => {
    let res;
    const parsedData = JSON.parse(order);
      
    const formattedData = {
      cart: parsedData?.map(item => ({
        id: item._id,
        size: item.size,
        color: item.color,
        quantity: item.quantity
      }))
    };

    console.log(formattedData);
    
    try{
         res = await axios.post(`order/calculate`, formattedData)
         
    }catch(err){
        console.log(err);
    }

    // console.log(res.data.order.total) ;
    return res.data.order.total;
}

export const confirmOrder = async(customerInfo, cartInfo) => {
    let res;
    const parsedOrder = JSON.parse(cartInfo);

    const formattedData = {
        name: customerInfo.name,
        phone: customerInfo.phone,
        email: customerInfo.email,
        inDhaka: customerInfo.inDhaka,
        district: customerInfo.district,
        thana: customerInfo.thana,
        road: customerInfo.road,
        building: customerInfo.building,
        transactionId: customerInfo.transactionId,
        otherDetails: customerInfo.otherDetails,
        cart: parsedOrder?.map(item => ({
            id: item._id,
            size: item.size,
            color: item.color,
            quantity: item.quantity
        }))
    }
    try{
         res = await axios.post(`order/confirm`, formattedData)
         
    }catch(err){
        console.log('potu');
        console.log(err);
    }

    // console.log(res.data) ;
    return res.data;
}

export const getProductWiseIncome = async() => {    
    let res;

    try{
        res = await axios.get(`admin/income/product`)
    }catch(err){
        console.log(err);
    }

    // console.log(res.data) ;
    return res.data;
}

export const getPendingOrders = async() => {
    let res;

    try{
        res = await axios.get(`admin/order/pending`)
    }catch(err){
        console.log(err);
    }

    // console.log(res.data.pendings) ;
    return res.data.pendings;
}

export const getPendingOrdersById = async(id) => {
    let res;

    try{
        res = await axios.get(`admin/order/pending/${id}`)
    }catch(err){
        console.log(err);
    }

    // console.log(res.data.pendings) ;
    return res.data.pending;
}

export const selectColor = async() => {
    let res;

    try{
        res = await axios.get(`admin/color`)
    }catch(err){
        console.log(err);
    }

    return res.data.colors;
}

export const addProduct = async(product) => {
    let res;

    try{
        res = await axios.post(`admin/product`, product)
    }catch(err){
        console.log(err);
    }

    // console.log(res.data);
    return res.data;
}

export const editProduct = async(id, product) => {
    let res;

    try{
        res = await axios.patch(`admin/product/${id}`, product)
    }catch(err){
        console.log(err);
    }

    // console.log(res.data);
    return res.data;
}

export const addCollection = async(collection) => {
    let res;

    try{
        res = await axios.post(`collection`, collection)
    }catch(err){
        console.log(err);
    }

    // console.log(res.data);
    return res.data;
}

export const deleteProduct = async(id) => {
    let res;

    try{
        res = await axios.delete(`admin/product/${id}`)
    }catch(err){
        console.log(err);
    }

    // console.log(res.data);
    return res.data;
}

export const deleteCollection = async(id) => {
    let res;

    try{
        res = await axios.delete(`collection/?id=${id}`)
    }catch(err){
        console.log(err);
    }

    // console.log(res.data);
    return res.data;
}

export const setFeaturedCollection = async(id) => {
    let res;

    try{
        res = await axios.patch(`collection/featured/${id}`)
    }catch(err){
        console.log(err);
    }

    // console.log(res.data);
    return res.data;
}

export const getCollectionById = async(id) => {
    let res;

    try{
        res = await axios.get(`collection/details/${id}`)
    }catch(err){
        console.log(err);
        console.log("potur");
    }

    // console.log(res.data.collection);
    return res.data.collection;
}

export const getProductByCategory = async(categoryId) => {
    let res;

    try{
        res = await axios.get(`product/category/${categoryId}`)
    }catch(err){
        console.log(err);
    }

    // console.log(res.data.products);
    return res.data.products;
}

export const login = async(user) => {
    let res;

    try{
        res = await axios.post(`admin/login`, user)
    }catch(err){
        console.log(err);
    }

    // console.log(res.data);
    return res.data;
}

export const editAccount = async(id, user) => {
    let res;

    try{
        res = await axios.patch(`admin/edit/${id}`, user)
    }catch(err){
        console.log(err);
    }

    // console.log(res.data);
    return res.data;
}

export const getHeaders = async() => {
    let res;

    try{
        res = await axios.get(`header`)
    }catch(err){
        console.log(err);
    }

    // console.log(res.data);
    return res.data;
}

export const setHeaders = async(headers) => {
    let res;

    try{
        res = await axios.patch(`header`, headers)
    }catch(err){
        console.log(err);
    }

    // console.log(res.data);
    return res.data;
}

export const confirmPendingOrder = async(id, date) => {
    let res;
    // console.log(date);

    try{
        res = await axios.patch(`admin/order/confirm/${id}`, date)
    }catch(err){
        console.log("potu");
        console.log(err);
    }

    // console.log(res.data);
    return res.data;
}

export const getDeliveryCharge = async() => {
    let res;

    try{
        res = await axios.get(`order/delivery`)
    }catch(err){
        console.log(err);
    }

    // console.log(res.data.deliveryCharge);
    return res.data.deliveryCharge;
}

export const editDeliveryCharge = async(id, charge) => {
    let res;

    try{
        res = await axios.patch(`order/delivery/?id=${id}`, charge)
    }catch(err){
        console.log(err);
    }

    // console.log(res.data);
    return res.data;
}

export const editCollection = async(id, collection) => {
    let res;

    try{
        res = await axios.patch(`collection/?id=${id}`, collection)
    }catch(err){
        console.log(err);
    }

    // console.log(res.data);
    return res.data;
}

export const getChart = async(category) => {
    let res;
    // console.log("potur");

    try{
        res = await axios.get(`chart/${category}`)
    }
    catch(err){
        console.log(err);
        console.log("potur");
    }

    // console.log(res.data);
    return res.data;
}

export const getFooter = async() => {
    let res;

    try{
        res = await axios.get(`footer`)
    }
    catch(err){
        console.log(err);
    }

    // console.log(res.data);
    return res?.data;
}

export const editFooter = async(footer) => {
    let res;

    try{
        res = await axios.patch(`footer`, footer)
    }
    catch(err){
        console.log(err);
    }

    // console.log(res.data);
    return res.data;
}

export const getColorByCategory = async(id) => {
    let res;

    try{
        res = await axios.get(`/product/colorcategory/${id}`)
    }
    catch(err){
        console.log(err);
    }

    // console.log(res.data.colors);
    return res.data.colors;
}

export const getProductByColor = async(filter) => {
    let res;
    // console.log(filter);

    try{
        res = await axios.post(`/product/filter`, filter)
    }
    catch(err){
        console.log(err);
    }

    // console.log(res.data.products);
    return res.data.products;
}

export const getColorByCollection = async(id) => {  
    let res;

    try{
        res = await axios.get(`/product/color/${id}`)
    }
    catch(err){
        console.log(err);
    }

    // console.log(res.data.colors);
    return res.data.colors;
}

export const getAllProductColors = async() => {
    let res;
    // console.log("potu");

    try{
        res = await axios.get(`product/all/color`)
        // console.log(res.data);
    }
    catch(err){
        console.log(err);
    }

    // console.log(res.data);
    return res.data.colors;
}

export const getSpecificProductByColor = async(type, id, filter) => {
    let res;
    // console.log(filter);

    try{
        res = await axios.post(`product/filter/${type}/${id}`, filter)
    }
    catch(err){
        console.log(err);
    }

    // console.log(res.data.products);
    return res.data.products;
}