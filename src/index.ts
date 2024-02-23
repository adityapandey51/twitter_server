import {serverInit} from "./app/index";

const init=async ()=>{
    const app= await serverInit();

    app.listen(8080,()=>{
        console.log("server tarted on port 8080")
    })
}

init();