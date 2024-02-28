export async function POST(request : Request){
    const file = await request.blob()
    console.log(file)
}