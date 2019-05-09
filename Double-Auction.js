// Author:Nima Afraz, The Provost, Fellows, Foundation Scholars & The Other Members Of Board Of The College Of The Holy & Undivided Trinity of Queen Elizabeth near Dublin

rand = function(min, max) {
    if (min==null && max==null)
      return 0;    
    
    if (max == null) {
        max = min;
        min = 0;
      }
      return min + Math.floor(Math.random() * (max - min + 1));
    };
  
  
function vno(vno_id, vno_name, balance, ask, bid, quantity, won_quantity){
    this.vno_id = vno_id;
    this.vno_name = vno_name;
    this.balance = balance;
    this.ask = ask;
    this.bid = bid;
    this.quantity = quantity;
    this.won_quantity = 0;
}

function split_seller_buyer(vnos){
    var sellers = [];
    var buyers = [];
    for (var vno of vnos){
        if (vno.ask == null){
            buyers.push(vno);
        }
        if (vno.bid == null){
            sellers.push(vno);
        }
    }
    return [sellers, buyers];
}


function printSB(sellers,buyers){
    //Debugign print
    // console.log("sellers");
    // console.log("sellers[i].ask,sellers[i].quantity,sellers[i].vno_name,buyers[i].balance,i");

    for (var i=0; i < sellers.length; i++) {
        // console.log(sellers[i].ask,sellers[i].quantity,sellers[i].vno_name,buyers[i].balance,i);
        }
        
    // console.log("Buyers");
    for (var i=0; i < buyers.length; i++) {
        // console.log(buyers[i].bid,buyers[i].quantity,buyers[i].vno_name,buyers[i].balance,i);
        }
}

function sortSB(sellers,buyers){
sellers.sort((a, b) => (a.ask > b.ask) ? 1 : -1);
buyers.sort((a, b) => (a.bid > b.bid) ? -1 : 1);
}

function mergeback(sellers,buyers){
newvnos = sellers.concat(buyers)
newvnos.sort((a, b) => (a.vno_id > b.vno_id) ? 1 : -1);
console.table(newvnos);
return newvnos;
}

function find_MC_point_price(sellers, buyers){
    for (var i=0; i < Math.max(sellers.length,buyers.length); i++){
        if (i>0 && sellers[i].ask >= buyers[i].bid){
            console.table(sellers);
            console.log('sellers[i-1].ask = ',i,i-1);
            console.log('sellers[i-1].ask = ',i,i-1,sellers[i-1].ask);
            console.log('==========RAN==============');

            if (sellers[i-1].ask < (sellers[i].ask + buyers[i].bid)/2 < buyers[i-1].bid){
                MC_point = i-1;
                sell_price = (sellers[i].ask + buyers[i].bid)/2;
                buy_price = (sellers[i].ask + buyers[i].bid)/2;
                
            }
            else{
                MC_point = i-2;
                sell_price = sellers[i-1].ask;
                buy_price = buyers[i-1].bid;

            }
            return [MC_point, sell_price, buy_price];
        }
    }
}

function find_MC_quantity(sellers,buyers,MC_point){
    var sum_toSell = 0;
    var sum_toBuy = 0;
    for (var i=0; i <= MC_point; i++){
        sum_toSell += sellers[i].quantity;
        sum_toBuy += buyers[i].quantity;
    }
    return Math.min(sum_toSell,sum_toBuy);
    }

function generate_vnos(){
    var vno1 = new vno(1, 'VNO1',10000,rand(1,100),null,rand(0,1000),null);
    var vno2 = new vno(2, 'VNO2',10000,rand(1,100),null,rand(0,1000),null);
    var vno3 = new vno(3, 'VNO3',10000,rand(1,100),null,rand(0,1000),null);
    var vno4 = new vno(4, 'VNO4',10000,rand(1,100),null,rand(0,1000),null);
    var vno5 = new vno(5, 'VNO5',10000,rand(1,100),null,rand(0,1000),null);
    var vno6 = new vno(6, 'VNO6',10000,null,rand(1,100),rand(0,1000),null);
    var vno7 = new vno(7, 'VNO7',10000,null,rand(1,100),rand(0,1000),null);
    var vno8 = new vno(8, 'VNO8',10000,null,rand(1,100),rand(0,1000),null);
    var vno9 = new vno(9, 'VNO9',10000,null,rand(1,100),rand(0,1000),null);
    var vno10 = new vno(10, 'VNO10',10000,null,rand(1,50),rand(0,1000),null);

    vnos = [vno1,vno2,vno3,vno4,vno5,vno6,vno7,vno8,vno9,vno10];
    return vnos;
}

function MC_settle(sellers,buyers,MC_point,MC_quantity){
    // const sellers_temp = sellers;

    // const buyers_temp = buyers;
    
    MC_quantity_b = MC_quantity;
    MC_quantity_s = MC_quantity;
    for (i=0; i <= MC_point && MC_quantity_b > 0; i++){
        if (buyers[i].quantity <= MC_quantity_b){
            MC_quantity_b -= buyers[i].quantity;
            buyers[i].quantity = 0;

        }
        else{
            buyers[i].quantity -= MC_quantity_b;
            MC_quantity_b =0;
        }
    }

    for (i=0; i <= MC_point && MC_quantity_s > 0; i++){
        if (sellers[i].quantity <= MC_quantity_s){
            MC_quantity_s -= sellers[i].quantity;
            sellers[i].quantity = 0;

        }
        else{
            // console.log("here");
            // console.log(sellers[i].quantity);
            sellers[i].quantity -= MC_quantity_s;
            // console.log(sellers[i].quantity);
            MC_quantity_s =0;
        }
    }

    
}

function copy_q(sellers,buyers,MC_point){
    sellers_temp_q = [];
    buyers_temp_q = [];
    for (i=0; i <= MC_point; i++){
        sellers_temp_q.push(sellers[i].quantity);
        buyers_temp_q.push(buyers[i].quantity);
        // console.log("sellers_temp_q,buyers_temp_q");    
        // console.log(sellers_temp_q,buyers_temp_q);
    }
}

function balance_settle(sellers,buyers,MC_point,sellers_temp_q,buyers_temp_q){
    // sellers_temp_q = [];
    // buyers_temp_q = [];
    // for (i=0; i <= MC_point; i++){
    //     sellers_temp_q.push(sellers[i].quantity);
    //     buyers_temp_q.push(buyers[i].quantity);
    //     console.log("sellers_temp_q,buyers_temp_q");    
    //     console.log(sellers_temp_q,buyers_temp_q);
    // }
    for (i=0; i <= MC_point; i++){
        // sellers_temp_q.push(sellers[i].quantity);
        // buyers_temp_q.push(buyers[i].quantity);
        // console.log("sellers_temp_q,buyers_temp_q");    
        // console.log(sellers_temp_q,buyers_temp_q);

        // console.log("sellers[i].balance");
        // console.log(sellers[i].balance);
        // console.log("sellers[i].balance,sellers_temp_q[i] , sellers[i].quantity,sell_price");
        // console.log(sellers[i].balance,sellers_temp_q[i] , sellers[i].quantity,sell_price);
        sellers[i].balance += (Math.abs(sellers_temp_q[i] - sellers[i].quantity) * sell_price);
        // console.log("buyers[i].balance");
        // console.log(buyers[i].balance);
        // console.log("buyers[i].quantity - buyers_temp_q[i]) * buy_price");
        buyers[i].balance -= (Math.abs(buyers[i].quantity - buyers_temp_q[i]) * buy_price);

        
        // console.log("sellers[i].balance,sellers_temp_q[i] , sellers[i].quantity,sell_price");
        // console.log(sellers[i].balance,sellers_temp_q[i] , sellers[i].quantity,sell_price);
    }
}
function auction(){

    vnos_org = generate_vnos();
    vnos = vnos_org;
    [sellers,buyers] = split_seller_buyer(vnos);


    sortSB(sellers,buyers);
    console.table(sellers);
    console.table(buyers);
    find_MC_point_price(sellers,buyers);
    console.log(MC_point);
    console.log(sell_price);
    console.log(buy_price);
    copy_q(sellers,buyers,MC_point);
    MC_quantity = find_MC_quantity(sellers,buyers,MC_point);
    console.log(MC_quantity);
    MC_settle(sellers,buyers,MC_point,MC_quantity,sell_price,buy_price);
    console.log(sellers[2].balance);

    printSB(sellers,buyers);
    balance_settle(sellers,buyers,MC_point,sellers_temp_q,buyers_temp_q);
    console.table(sellers);
    console.table(buyers);
    return mergeback(sellers,buyers);
}

function test_balance(sellers, buyers){
    t_b_bal = 0;
    t_s_bal = 0;
    for (var i=0; i < Math.max(sellers.length,buyers.length); i++){
        t_s_bal = t_s_bal + sellers[i].balance;
        t_b_bal = t_b_bal + buyers[i].balance;
    }
    if (t_s_bal - 50000 != 50000 - t_b_bal){
        // console.error("Balance does not match");
        throw Error('Balance does not match');

    }
        }



for (j = 0; j <100; j++){
console.log('=========================',j,'=======================');
    auction();
    test_balance(sellers, buyers);
// return mergeback(sellers,buyers);
}
