//修改商务首页
export const changeBusiHomeList = (state, obj) => {
    state.busiHomeList = obj;
};

//修改租赁首页
export const changeRentHomeList = (state, obj) => {
    state.rentHomeList = obj;
};

//修改招商首页
export const changePolicyHomeList = (state, obj) => {
    state.policyHomeList = obj;
};

//修改详细列表-覆盖
export const changeBusiList = (state, obj) => {
    state.detailList = obj;
};

//修改详细列表-新增
export const addBusiList = (state, obj) => {
    state.detailList.push(obj);
};

