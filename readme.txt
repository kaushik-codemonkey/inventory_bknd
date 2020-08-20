----------------------------------APIs for InventoryApp-----------------------------

APIDOC:
1) POST /api/user/register/
Body: {
  ‘name’: String (min 6,req),
  ‘email’: Email String (min 6,req),
  ‘password’: String (min 6, req)
}

2) POST /api/user/login/

Body:{
  ‘email’: Email String (min 6,req),
  ‘password’: String (min 6, req)
}

3) POST /api/user/logout/

Header:{
  “auth_token”:  JWT Token;
  }
Body:{}

4) GET /api/inventory/

Header:{
  “auth_token”:  JWT Token;
  }
Body:{}

5) POST /api/inventory/update/

Header:{
  “auth_token”:  JWT Token;
  }
Body:{
  items:[
    {
    name: String ,
    quantitiy: Number,
    priceforone: Number,
    checked: Bool,
    category:[string,…],
    dateofpurchase: Date(default: created_date),
    dateofcheckout:Date
    }
  ]
}





