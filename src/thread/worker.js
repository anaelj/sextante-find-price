async function main (message) {
    const pid = process.id;
    console.log(`${pid} executado `, message.name)
}

process.once("message", main);