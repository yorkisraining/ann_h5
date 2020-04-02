//修改home中的数据
export const changeToken = (state, obj) => {
    console.log(obj)
    state.token = obj;
};