export interface ProductModelServer {
    masp: number;
    tensp: String;
    dongia: number;
    soluong: number;
    hinh: String;
    mota: String;
    hinhlsp: String;
    malsp: number;
    tenlsp: String;
  }
  
  export interface serverResponse  {
    count: number;
    products: ProductModelServer[];
  };
  
  
  
  