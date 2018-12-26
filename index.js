const hotOrCold = document.getElementById('js-hot');
const waitForMicrobit = document.getElementById('js-wait-for-it');

hotOrCold.addEventListener('click', () => {
    navigator.bluetooth.requestDevice({
        filters: [
            { namePrefix: 'BBC micro:bit' } 
        ],
        optionalServices: ['e95d6100-251d-470a-a062-fa1922dfa9a8'] // temperature service
    })
    .then(device => {
        console.log(device);
        return device.gatt.connect()
    })
    .then(server => {
        console.log(server);
        return server.getPrimaryService('e95d6100-251d-470a-a062-fa1922dfa9a8');
    })
    .then(service => {
        console.log(service);
        return service.getCharacteristic('e95d9250-251d-470a-a062-fa1922dfa9a8');
    })
    .then(characteristic => {
        console.log(characteristic)
        return characteristic.readValue();
    })
    .then(value => {
        console.log(`The temperature is ` + value.getUint8(0) + ` degrees`);
    })
    .catch(error => {
        console.error(error);
    })
});

waitForMicrobit.addEventListener('click', () => {
    navigator.bluetooth.requestDevice({
        filters: [
            { namePrefix: 'BBC micro:bit' } 
        ],
        optionalServices: ['e95d9882-251d-470a-a062-fa1922dfa9a8'] // button service
    })
    .then(device => {
        console.log(device);
        return device.gatt.connect()
    })
    .then(server => {
        console.log(server);
        return server.getPrimaryService('e95d9882-251d-470a-a062-fa1922dfa9a8');
    })
    .then(service => {
        console.log(service);
        return service.getCharacteristic('e95dda90-251d-470a-a062-fa1922dfa9a8');
    })
    .then(characteristic => characteristic.startNotifications())
    .then(characteristic => {
        console.log(characteristic);
        characteristic.addEventListener('characteristicvaluechanged', waitForButtonA)
    })
    .catch(error => {
        console.error(error);
    })
})

function waitForButtonA() {
    console.log('Button A pressed and released');
}