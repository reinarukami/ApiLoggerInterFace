
// Declare the web3.js
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545/"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

var ContractAbi = web3.eth.contract([{"constant":true,"inputs":[],"name":"GetCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_thash","type":"string"}],"name":"LogTransactions","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_count","type":"uint256"}],"name":"GetTransactions","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_log","type":"string"},{"name":"_logdate","type":"uint256"}],"name":"Log","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"values","type":"string"},{"indexed":false,"name":"logdate","type":"uint256"}],"name":"LogEvent","type":"event"}]);

 var Contract = ContractAbi.at('0x6DEf212388Fa6b8805b7De92c0FaE912Dd6D604A');

var LogEvents = Contract.LogEvent();

 LogEvents.watch(function(error, result){
            if (!error)
                {
                     $('#logs').append('<tr><td>' + result.args.sender +'</td><td>' + result.args.values + '</td><td>' + result.args.logdate + '</td></tr>' );

                } else {

         }
});

var deviceID = {
    deviceID: '96D88A707C3CA2AB203348A64CC55CD41E800248'
}

$.ajax({
    url: "http://localhost:50272/Api/Logger/GetLogs",
    type: "GET",
    crossDomain: true,
    dataType: 'json',
    data: JSON.stringify(JSON.stringify(deviceID)),
    success: function(result){
            for(i=0; i<result.length; i++){
                $('#logs').append('<tr><td>' + result[i].sender +'</td><td>' + result[i].values + '</td><td>' + result[i].logdate + '</td></tr>' );

            }
    },

    error: function(result){
           console.log(result);
    }


});





