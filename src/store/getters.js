const getters = {
    // sidebar: state => state.app.sidebar,
    // device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    roles: state => state.user.roles,
    email: state => state.user.email,
    uid: state => state.user.uid,
    mobile: state => state.user.mobile,
    isLogin: state => state.user.isLogin,
    login_email: state => state.user.login_email,
    exchange: state => state.user.exchange,
    langpack: state => state.user.langpack,
    lang: state => state.user.lang,
    langType: state => state.user.langType,
    symbolData: state => state.user.symbolData,
    symbolType: state => state.user.symbolType,
    sellSymbol: state => state.user.sellSymbol,
    buySymbol: state => state.user.buySymbol,
    assetsList: state => state.user.assetsList,
    recommend: state => state.coin.recommend,
    initCoin: state => state.coin.initCoin
}
export default getters
