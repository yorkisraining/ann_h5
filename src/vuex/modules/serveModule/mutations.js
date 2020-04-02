//修改ServeList中的数据
export const changeServeList = (state, obj) => {
    state.serveList.chooseServeList = obj.list;
    state.serveList.totalPrice = obj.total;
};

//修改Serve可用优惠价格
export const changeServeReduce = (state, obj) => {
    state.serveList.reduce = obj;
};

//初始化数据
export const initServeList = (state, obj) => {
    state.serveList.chooseServeList = [];
    state.serveList.totalPrice = 0;
    state.serveList.reduce = 0;
};