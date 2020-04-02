//修改foodsList中的数据
export const changeFoodsList = (state, obj) => {
    state.foodsList.chooseFoodsList = obj.list;
    state.foodsList.totalPrice = obj.total;
};

//修改三品王可用优惠价格
export const changeFoodsReduce = (state, obj) => {
    state.foodsList.reduce = obj;
};

//重置三品王信息
export const resetSPW = (state) => {
    state.foodsList =  {
        chooseFoodsList: [], //已选择的三品王
        totalPrice: 0, //总价
        reduce: 0 //优惠
    }
}

//======================================================

//修改CoffeList中的数据
export const changeCoffeeList = (state, obj) => {
    state.coffeeList.chooseCoffeeList = obj.list;
    state.coffeeList.totalPrice = obj.total;
};

//修改Coffe可用优惠价格
export const changeCoffeeReduce = (state, obj) => {
    state.coffeeList.reduce = obj;
};

//重置Coffe信息
export const resetCoffee = (state) => {
    state.coffeeList = {
        chooseCoffeeList: [], //已选择的咖啡
        totalPrice: 0, //总价
        reduce: 0 //优惠
    }
}