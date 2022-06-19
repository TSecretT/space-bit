export const freeSkinRedeemed = () => {
    return localStorage.spacebit_redeemed ? true : false
}

export const myWallet = () => localStorage.spacebit_wallet

export const setToken = (token: string) => {
    localStorage.setItem('bitspace_token', token)
}

export const getListFromDocs = (docs: any) => {
    let items: any[] = [];
    docs.forEach((doc: any) => {
        items.push({...doc.data(), id: doc.id})
    });
    return items;
}