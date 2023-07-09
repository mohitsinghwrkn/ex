async function weather(){
    let weather_one = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("20 degree")
        }, 2000)
    })

    let weather_two = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("25 degree")
        }, 5000)
    })

    await weather_one.then((x)=>{
        console.log(`this is ${x} in weather one`)
    })

    await weather_two.then((x)=>{
        console.log(`this is ${x} in weather two`)
    })

    console.log("this line should seen after the weather information")
}

const final = async ()=>{
    await weather()
    console.log("This Line Is Waiting For Execution Because It's Inside And After A Async Await Function")
}

final()

console.log("THIS LINE IS AT THE VERY END BUT WILL EXECUTED FIRST OF ALL")
