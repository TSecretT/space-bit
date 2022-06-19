import { myWallet } from "../utils"
import { addDocument, findDocuments, setDocument, updateDocument } from "./firebase"

export const addGameResult = async (wallet: string, score: number) => {
    return await addDocument('gameResults', { wallet, score, checked: false })
} 

export const myResults = async (wallet: string) => {
    return await findDocuments('gameResults', "wallet", wallet)
}

export const claimResults = async (wallet: string) => {
    const results: any[] = await myResults(wallet)
    .then((results) => results.filter((result: any) => !result.checked))

    for (const result of results){
        await updateDocument('gameResults', result.id, { checked: true })
    }
}